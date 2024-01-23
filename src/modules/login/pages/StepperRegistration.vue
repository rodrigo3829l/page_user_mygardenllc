<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8" lg="16">
        <v-card class="elevation-12">
          <v-stepper 
            alt-labels
            v-model="step"
            :items="items"
            show-actions
          >
            <template v-slot:item.1>
              <h3 class="text-h6">Personal Information</h3>

              <br>
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
              
              <v-divider></v-divider>
              <h3 class="text-h6">Profile Picture</h3>

              <br>
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
            </template>

            <template v-slot:item.2>
              <h3 class="text-h6">Location details</h3>

              <br>
              <v-form>
                  <v-text-field
                    v-model="formData.city"
                    label="City"
                    color="green-darken-3"
                    required
                    variant="underlined"
                    placeholder="Enter your city"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.neighborhood"
                    label="Neighborhood"
                    required
                    variant="underlined"
                    placeholder="Enter your neighborhood"
                    type="email"
                    color="green-darken-3"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.street"
                    label="Street"
                    required
                    variant="underlined"
                    color="green-darken-3"
                    placeholder="Enter your street"
                    type="password"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.houseNumber"
                    label="House Number"
                    required
                    variant="underlined"
                    color="green-darken-3"
                    placeholder="Enter you house number"
                    type="password"
                  ></v-text-field>
                </v-form>
            </template>

            <template v-slot:item.3>
              <h3 class="text-h6">User data</h3>

              <br>
                <v-form>
                  <v-text-field
                    v-model="formData.userName"
                    label="Username"
                    color="green-darken-3"
                    required
                    variant="underlined"
                    placeholder="Enter your username"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.email"
                    label="Email"
                    required
                    variant="underlined"
                    placeholder="Enter your email"
                    type="email"
                    color="green-darken-3"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.password"
                    label="Password"
                    required
                    variant="underlined"
                    color="green-darken-3"
                    placeholder="Enter your password"
                    type="password"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.confirmPassword"
                    label="Confirm Password"
                    required
                    variant="underlined"
                    color="green-darken-3"
                    placeholder="Confirm your password"
                    type="password"
                  ></v-text-field>
                </v-form>
            </template>
          </v-stepper>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { api } from '@/axios/axios';
// import { defineAsyncComponent } from 'vue'
export default {
  // components: {
  //   UserData: defineAsyncComponent(() => import( '@/modules/login/components/UserData')),
  //   PersonalData: defineAsyncComponent(() => import('@/modules/login/components/PersonalData')),
  //   // LocationData: defineAsyncComponent(() => import( '@/modules/login/components/LocationData')),
  // },
  data() {
    return {
      formData: {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        sexo: 'masculino',
        imagen: null,

        userName: '',
        email: '',
        password: '',
        confirmPassword: '',


        houseNumber: '',
        street: '',
        neighborhood: '',
        city: '',


      },
      shipping: 0,
      step: 1,
      items: ['Personal Information', 'Location Details', 'User Data'],
      products: [
        {
          name: 'Product 1',
          price: 10,
          quantity: 2,
        },
        {
          name: 'Product 2',
          price: 15,
          quantity: 10,
        },
      ],
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
