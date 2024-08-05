<template>
  <v-container>
    <v-row>
      <!-- Columna para información personal -->
      <v-col cols="12" md="6">
        <h3>Personal Information</h3>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="user.name" label="First Name" variant="underlined" color="green-darken-3" :rules="[rules.required]" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="user.apellidoP" label="Last Name (Paternal)" variant="underlined" color="green-darken-3" :rules="[rules.required]" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="user.apellidoM" label="Last Name (Maternal)" variant="underlined" color="green-darken-3" :rules="[rules.required]" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-select v-model="user.lade" :items="ladas" label="Area Code" variant="underlined" color="green-darken-3" :rules="[rules.required]" required></v-select>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field v-model="user.cellPhone" label="Phone Number" variant="underlined" color="green-darken-3" :rules="[rules.required, rules.phone]" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select v-model="user.genero" :items="['Male', 'Female']" label="Gender" variant="underlined" color="green-darken-3" :rules="[rules.required]" required></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="user.fechaNacimiento" label="Date of Birth" variant="underlined" color="green-darken-3" type="date" :rules="[rules.required]" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Columna para detalles de la cuenta -->
      <v-col cols="12" md="6">
        <h3>Account Information</h3>
        <v-container>
          <v-text-field v-model="user.email" label="Email" variant="underlined" color="green-darken-3" :rules="[rules.required, rules.email]" required></v-text-field>
          <v-text-field v-model="user.userName" label="Username" variant="underlined" color="green-darken-3" :rules="[rules.required]" required></v-text-field>
          <v-row dense>
            <v-col cols="6" class="d-flex align-center">
              <v-file-input v-model="scheduleImage" variant="underlined" color="green-darken-3" label="Select Image" clearable @change="handleImageUpload"></v-file-input>
            </v-col>

            <v-col cols="6" class="d-flex align-center justify-center">
              <v-row v-if="!scheduleImagePreview" class="image-preview" justify="center" align="center">
                <div class="image-placeholder">Selected Image</div>
              </v-row>

              <v-col v-else class="image-container">
                <v-img :src="scheduleImagePreview" alt="Selected Image" max-width="200" height="150" class="my-3"></v-img>
                <v-icon small class="delete-icon" @click="clearImage">mdi-trash-can</v-icon>
              </v-col>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="primary" block @click="updateUserInfo">Update</v-btn>
      </v-col>
    </v-row>

  </v-container>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
  </v-overlay>
</template>

<script>
import {
  useUserStore
} from '@/store/store';
import {
  api
} from '@/axios/axios.js';
import {
  toast
} from 'vue3-toastify';

const userStore = useUserStore();

export default {
  name: 'EditUserInfo',
  data() {
    return {
      valid: false,
      user: {},
      scheduleImage: null,
      scheduleImagePreview: null,
      originalImagePublicId: null,
      overlay: false,
      errors: {
        image: '',
      },
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return pattern.test(value) || 'Invalid email.';
        },
        phone: value => {
          const pattern = /^[0-9]{10}$/;
          return pattern.test(value) || 'Invalid phone number.';
        },
      },
      ladas: [52, 1],
    };
  },
  methods: {
    async fetchUserInfo() {
      try {
        const {
          data
        } = await api({
          method: 'GET',
          url: '/user/protected',
          headers: {
            Authorization: 'Bearer ' + userStore.token,
            rol: userStore.rol,
          },
        });
        this.user = data.user;
        if (data.user.img && data.user.img.secure_url) {
          this.scheduleImagePreview = data.user.img.secure_url;
          this.originalImagePublicId = data.user.img.public_id;
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];

      // Check if a file is selected
      this.errors.image = !file ? 'Please select an image file.' : '';

      // Check the file size (in bytes)
      const maxSize = 4 * 1024 * 1024; // 4 megabytes
      this.errors.image = file.size > maxSize ? 'File size exceeds 4MB.' : '';

      // Read the image as a Blob object
      const reader = new FileReader();
      reader.onload = e => {
        this.scheduleImagePreview = e.target.result;
      };

      // Check if the file type is an image
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        this.errors.image = 'Please select a valid image file.';
      }
    },
    clearImage() {
      this.scheduleImage = null;
      this.scheduleImagePreview = null;
      this.originalImagePublicId = null;
    },
    async updateUserInfo() {
      try {
        this.overlay = true;
        const updateData = {
          name: this.user.name,
          apellidoP: this.user.apellidoP,
          apellidoM: this.user.apellidoM,
          fechaNacimiento: this.user.fechaNacimiento,
          genero: this.user.genero,
          cellPhone: this.user.cellPhone,
          lade: this.user.lade,
          email: this.user.email,
          userName: this.user.userName
        };

        if (this.scheduleImagePreview && this.scheduleImagePreview !== this.user.img?.secure_url) {
          updateData.img = this.scheduleImagePreview;
          if (this.originalImagePublicId) {
            updateData.public_id = this.originalImagePublicId;
          }
        }
        console.log(updateData);
        const {
          data
        } = await api({
          method: 'PUT',
          url: '/user/update',
          headers: {
            Authorization: 'Bearer ' + userStore.token,
            rol: userStore.rol,
          },
          data: updateData
        });

        if (data.success) {
          toast.success('User information updated successfully!');
        } else {
          toast.error(data.msg);
        }
        this.overlay = false;
      } catch (error) {
        console.error(error);
        toast.error('Failed to update user information.');
        this.overlay = false;
      }
    },
  },
  mounted() {
    this.fetchUserInfo();
  },
};
</script>

<style scoped>
.image-preview {
  width: 80%;
  height: 150px;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  margin: 10px;
}

.image-placeholder {
  font-size: 14px;
  color: #666;
  position: absolute;
  z-index: 1;
  user-select: none;
  text-align: center;
  width: 80%;
  padding: 60px 0;
}

.image-container {
  position: relative;
}

.delete-icon {
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: red;
  background: white;
  border-radius: 50%;
  padding: 5px;
}
</style>
