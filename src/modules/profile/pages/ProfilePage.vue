<template>
  <v-container>
    <!-- Primera fila -->
    <v-row class="mb-4">
      <v-col cols="12" md="6" class="d-flex align-center">
        <!-- Avatar del usuario -->
        <v-avatar size="56">
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-avatar>
        <h2 class="ml-3 subtitle-1">{{ ($t('profile.pages.ProfilePage.helloString')) }} {{ userInfo.name }}, {{($t('profile.pages.ProfilePage.welcomeString'))}}</h2>
      </v-col>
      <v-col cols="12" md="6">
        <v-row class="d-flex flex-column flex-sm-row">
          <v-col cols="12" class="d-flex justify-space-between justify-md-end flex-column flex-sm-row">
            <!-- Botones de acción con espaciado adicional -->
            <v-btn text @click="$router.push({ name: 'profile-myservices' })" class="mx-2 py-1">{{($t('profile.pages.ProfilePage.seeServiceString'))}}</v-btn>
            <v-btn :disabled="load" :loading="load" text @click="cambiarContraseña" class="mx-2 py-1">{{($t('profile.pages.ProfilePage.changeString'))}}</v-btn>
            <v-btn text color="red" @click="logOut" class="mx-2 py-1">{{($t('profile.pages.ProfilePage.closeString'))}}</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Segunda fila -->
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-form>
          <h2 for="">{{($t('profile.pages.ProfilePage.accountDataString'))}}</h2>
          <!-- Formulario de información del usuario con tamaño ajustado -->
          <v-text-field
            disabled
            color="green-darken-3"
            :label="$t('profile.pages.ProfilePage.nameString')"
            variant="underlined"
            v-model="userInfo.name"
          ></v-text-field>
          <v-text-field
            disabled
            color="green-darken-3"
            :label="$t('profile.pages.ProfilePage.emailString')"
            variant="underlined"
            v-model="userInfo.email"
          ></v-text-field>
          <v-text-field
            disabled
            color="green-darken-3"
            :label="$t('profile.pages.ProfilePage.numberString')"
            variant="underlined"
            v-model="userInfo.phone"
          ></v-text-field>
          <v-text-field
            disabled
            olor="green-darken-3"
            :label="$t('profile.pages.ProfilePage.userString')"
            variant="underlined"
            v-model="userInfo.username"
          ></v-text-field>
          <v-btn color="green-darken-3" block class="mt-3" @click="cambiarDatos">{{($t('profile.pages.ProfilePage.dateString'))}}</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog :model-value="showUpdate" >
    <UpdateUser :userInfo="userInfo" @update:showUpdate="handleUpdate" @update:userInfo="userUpdate"></UpdateUser>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { api } from '@/axios/axios';
import { useUserStore } from '@/store/store';
const userStore = useUserStore()

export default {
  data() {
    return {
      userInfo: {},
      load :  false,
      showUpdate : false
    };
  },
  methods: {
    userUpdate(newValue) {
      this.userInfo = newValue
    },
    handleUpdate(newValue) {
      this.showUpdate = !newValue;
    },
    verServicios() {
      console.log('Ver servicios');
    },
    async cambiarContraseña() {
      this.load = true
      try {
        const datos = {
          email: this.userInfo.email
        }
        const { data } = await api.post('/user/recover', datos )
        this.load = false
        if(data.success){
            localStorage.setItem('tokenData', data.token);
            localStorage.setItem('data', this.userInfo.email.slice(this.userInfo.email.indexOf('@') + 1));
            this.$router.push({ name: 'login-optconfirm' });
          }
        console.log('Cambiar contraseña');
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },

    async logOut() {
      await userStore.logout();
      this.$router.push('/');
    },

    cambiarDatos() {
      this.showUpdate = true
    },
    async getDataUser (){
      try {
        const token = localStorage.getItem('token')
        const {data} = await api({
          method: 'GET',
          url : '/user/protected',
          headers: {
            'Authorization' : 'Bearer ' + token,
            'rol' : userStore.rol
          },
        })
        console.log(data)
        this.userInfo = data.user
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getDataUser()
  },
  components : {
    UpdateUser : defineAsyncComponent(() => import('../components/UpdateUser.vue'))
  }
};
</script>
