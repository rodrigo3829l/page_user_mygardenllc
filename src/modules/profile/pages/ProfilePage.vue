<template>
  <v-container>
    <v-row>
      <!-- Columna para el avatar y los botones de acción -->
      <v-col cols="12" md="4" class="text-center">
        <v-avatar size="120">
          <v-img :src="userInfo.img?.secure_url || 'https://cdn.vuetifyjs.com/images/john.jpg'" class="rounded-circle"></v-img>
        </v-avatar>
        <h2 class="mt-3">{{ userInfo.name }} {{ userInfo.apellidoP }} {{ userInfo.apellidoM }}</h2>
        <h4>{{ userInfo.email }}</h4>
        <v-btn block class="mt-3" color="white" @click="verServicios">View Services</v-btn>
        <v-btn block class="mt-3" color="white" :disabled="load" :loading="load" @click="cambiarContraseña">Change Password</v-btn>
        <v-btn block class="mt-3" color="green-darken-3" @click="editProfile">Edit Profile</v-btn>
        <v-btn block class="mt-3" color="red" @click="logOut">Logout</v-btn>
      </v-col>

      <!-- Espacio entre columnas -->
      <v-col cols="12" md="1"></v-col>

      <!-- Columna para la información del usuario -->
      <v-col cols="12" md="7">
        <!-- Primera fila: Información personal -->
        <v-card class="mb-4">
          <v-card-title>Personal Information</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="info-label">Full Name:</div>
                <div class="info-value">{{ userInfo.name }} {{ userInfo.apellidoP }} {{ userInfo.apellidoM }}</div>
              </v-col>
              <v-col cols="6">
                <div class="info-label">Date of Birth:</div>
                <div class="info-value">{{ formatDate(userInfo.fechaNacimiento) }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <div class="info-label">Phone:</div>
                <div class="info-value">+{{ userInfo.lade }} {{ userInfo.cellPhone }}</div>
              </v-col>
              <v-col cols="6">
                <div class="info-label">Gender:</div>
                <div class="info-value">{{ userInfo.genero }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <div class="info-label">Email:</div>
                <div class="info-value">{{ userInfo.email }}</div>
              </v-col>
              <v-col cols="6">
                <div class="info-label">User name:</div>
                <div class="info-value">{{ userInfo.userName }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Segunda fila: Información de seguridad -->
        <v-card>
          <v-card-title>Security Information</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="info-label">Last Login:</div>
                <div class="info-value">{{ formatDateTime(userInfo.lastLogin) }}</div>
              </v-col>
              <v-col cols="6">
                <div class="info-label">Creation Date:</div>
                <div class="info-value">{{ formatDateTime(userInfo.creation) }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <div class="info-label">Last Password Change:</div>
                <div class="info-value">{{ formatDateTime(userInfo.lastPassword) }}</div>
              </v-col>
              <v-col cols="6">
                <div class="info-label">Account Status:</div>
                <div class="info-value">{{ userInfo.userStatus }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog :model-value="showUpdate">
      <UpdateUser :userInfo="userInfo" @update:showUpdate="handleUpdate" @update:userInfo="userUpdate"></UpdateUser>
    </v-dialog>
  </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { api } from '@/axios/axios';
import { useUserStore } from '@/store/store';
const userStore = useUserStore();

export default {
  data() {
    return {
      userInfo: {},
      load: false,
      showUpdate: false
    };
  },
  methods: {
    userUpdate(newValue) {
      this.userInfo = newValue;
    },
    handleUpdate(newValue) {
      this.showUpdate = !newValue;
    },
    async cambiarContraseña() {
      this.load = true;
      try {
        const datos = {
          email: this.userInfo.email
        };
        const { data } = await api.post('/user/recover', datos);
        this.load = false;
        if (data.success) {
          localStorage.setItem('tokenData', data.token);
          localStorage.setItem('data', this.userInfo.email.slice(this.userInfo.email.indexOf('@') + 1));
          this.$router.push({ name: 'login-optconfirm' });
        }
      } catch (error) {
        this.load = false;
        console.log(error);
      }
    },
    async logOut() {
      await userStore.logout();
      this.$router.push('/');
    },
    editProfile() {
      this.$router.push({ name: 'profile-edit' });
    },
    verServicios() {
      this.$router.push({ name: 'profile-myservices' });
    },
    async getDataUser() {
      try {
        const token = localStorage.getItem('token');
        const { data } = await api({
          method: 'GET',
          url: '/user/protected',
          headers: {
            Authorization: 'Bearer ' + token,
            rol: userStore.rol
          }
        });
        console.log(data)
        this.userInfo = data.user;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    formatDateTime(dateTime) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateTime).toLocaleDateString('en-US', options);
    }
  },
  mounted() {
    this.getDataUser();
  },
  components: {
    UpdateUser: defineAsyncComponent(() => import('../components/UpdateUser.vue'))
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 16px;
}

.info-label {
  font-weight: bold;
  font-size: 18px;
}

.info-value {
  font-size: 16px;
  margin-bottom: 16px;
}
</style>
