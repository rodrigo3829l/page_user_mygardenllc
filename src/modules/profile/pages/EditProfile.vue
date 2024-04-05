<template>
  <v-container>
    <v-card class="max-width-card shadow">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>{{ ($t('profile.pages.editProfile.editProfileString')) }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <!-- Profile Picture -->
        <v-row>
          <v-col cols="12" md="6">
            <v-file-input
              @change="handleImageUpload"
              accept="image/*"
              :error-messages="errors.image"
              :label="$t('profile.pages.editProfile.selectProfileString')"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="6">
            <v-img
              v-if="formData.image"
              :src="formData.image"
              alt="Selected Image"
              class="image-preview"
              contain
            ></v-img>
            <v-row v-else class="image-preview" justify="center" align="center">
              <div class="image-placeholder">{{ ($t('profile.pages.editProfile.selectedImageString')) }}</div>
            </v-row>
          </v-col>
        </v-row>

        <!-- Name and Surnames -->
        <v-row>
          <v-col>
            <v-text-field v-model="formData.firstName" label="First Name"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="formData.lastName" label="Last Name"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="formData.lastName" label="Last Name"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="formData.phone" label="Phone Number" type="tel"></v-text-field>
          </v-col>
        </v-row>

        <!-- Phone Number and Date of Birth -->
        <v-row>
          <v-col>
            <v-text-field v-model="formData.birthDate" label="Date of Birth" type="date"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="formData.gender" label="Gender"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="formData.city" label="City"></v-text-field>
          </v-col>
        </v-row>

        <!-- Neighborhood and Street -->
        <v-row>
          <v-col>
            <v-text-field v-model="formData.neighborhood" label="Neighborhood"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="formData.street" label="Street"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="formData.houseNumber" label="House Number"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <router-link :to="{name: 'profile-profile'}">
          <v-btn color="error">{{ ($t('profile.pages.editProfile.goBackString')) }}</v-btn>
        </router-link>
        <router-link :to="{name: 'profile-profile'}">
          <v-btn color="success">{{ ($t('profile.pages.editProfile.saveChangesString')) }}</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        image: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthDate: '',
        gender: '',
        city: '',
        neighborhood: '',
        street: '',
        houseNumber: '',
      },
      errors: {
        image: ''
      }
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];

      // Reset error message
      this.errors.image = '';

      if (file) {
        // Check the file size (in bytes)
        const maxSize = 4 * 1024 * 1024; // 4 megabytes
        if (file.size > maxSize) {
          this.errors.image = 'File size must be up to 4 megabytes.';
          return;
        }

        // Check if the file type is an image
        if (!file.type.startsWith('image/')) {
          this.errors.image = 'Please select a valid image file.';
          return;
        }

        // Read the image as a Blob object
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.image = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.errors.image = 'Please select an image file.';
      }
    },
  },
};
</script>

<style scoped>
.max-width-card {
  margin: 50px auto;
}
.image-preview {
  width: 50%;
  height: 100px;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
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
