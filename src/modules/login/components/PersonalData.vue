<template>
  <v-container>
    <v-card class="max-width-card" >
      <v-card-title class="text-h5">
        Personal Information
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="First Name"
                v-model="formData.nombre"
                required
                variant="underlined"
                color="green-darken-3"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Last Name"
                v-model="formData.apellidoPaterno"
                required
                variant="underlined"
                color="green-darken-3"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Middle Name"
                v-model="formData.apellidoMaterno"
                required
                variant="underlined"
                color="green-darken-3"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Date of Birth"
                type="date"
                v-model="formData.fechaNacimiento"
                required
                variant="underlined"
                color="green-darken-3"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="Select your gender"
                v-model="formData.sexo"
                :items="['Male', 'Female']"
                required
                variant="underlined"
                color="green-darken-3"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title class="text-h5 mt-4">
        Profile Picture
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-file-input
              @change="handleImageUpload"
              accept="image/*"
              label="Select profile picture"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="6">
            <v-img
              v-if="formData.imagen"
              :src="formData.imagen"
              alt="Selected Image"
              class="image-preview"
              contain
            ></v-img>
            <v-row v-else class="image-preview" justify="center" align="center">
              <div class="image-placeholder">Selected Image</div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        sexo: 'masculino',
        imagen: null,
      },
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.imagen = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    submitForm() {
    },
  },
};
</script>

<style scoped>
.max-width-card {
  margin: 50px auto;
  max-width: 600px;
}
.image-preview {
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
}
.image-placeholder {
  font-size: 14px;
  color: #666;
  position: absolute;
  z-index: 1;
  user-select: none;
  text-align: center;
  width: 100%;
  padding: 60px 0;
}
</style>
