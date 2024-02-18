<template>
  <v-breadcrumbs :items="routes">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8" lg="16">
        <v-card class="elevation-12">

          
          <v-stepper 
            alt-labels
            v-model="step"
            :items="items"
            hide-actions
            @click:step="handleStepClick"
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
                      :error-messages="errors.nombre"
                      variant="underlined"
                      color="green-darken-3"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Last Name"
                      v-model="formData.apellidoPaterno"
                      required
                      :error-messages="errors.apellidoPaterno"
                      variant="underlined"
                      color="green-darken-3"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Middle Name"
                      v-model="formData.apellidoMaterno"
                      required
                      :error-messages="errors.apellidoMaterno"
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
                      :error-messages="errors.fechaNacimiento"
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
                  <v-col cols="12" md="6">
                    <v-row align="center">
                      <v-col cols="4">
                        <v-select
                          v-model="formData.lada"
                          :items="['+1 (USA)', '+52 (Mexico)']"
                          label="Lada"
                          :error-messages="errors.lada"
                          variant="underlined"
                          color="green-darken-3"
                        ></v-select>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          label="Phone number"
                          v-model="formData.phone"
                          required
                          :error-messages="errors.phone"
                          type="number"
                          variant="underlined"
                          color="green-darken-3"
                          :prefix="formData.lada ? formData.lada.split(' ')[0] : ''"
                        ></v-text-field>
                      </v-col>
                    </v-row>
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
                    :error-messages="errors.image"
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
              <v-btn
                v-if="step > 1"
                @click="step--"
                color="red-darken-4"
                variant="text"
              >
                Previous Step
              </v-btn>
              <v-btn
                v-if="step !== items.length"
                @click="validateInformation"
                color="green-darken-3"
                variant="text"
              >
                Next Step
              </v-btn>

            </template>
            

            <template v-slot:item.2>
              <h3 class="text-h6">Location details</h3>

              <br>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col cols="8" sm="9">
                      <v-text-field
                        v-model="formData.postalCode"
                        label="Postal Code"
                        required
                        type="number"
                        :error-messages="errors.postalCode"
                        variant="underlined"
                        color="green-darken-3"
                        
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" sm="3">
                      <v-btn
                        @click="validatePostalCode"
                        color="green-darken-3"
                        class="ma-2"
                        small
                        :loading="loadBtn"
                        :disabled="loadBtn"
                      >
                        Validate
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-autocomplete
                    v-model="formData.city"
                    label="City"
                    color="green-darken-3"
                    required
                    :disabled="true"
                    :error-messages="errors.city"
                    variant="underlined"
                  ></v-autocomplete>
  
                  <v-select
                    v-model="formData.street"
                    label="Street"
                    required
                    :disabled="!cpValidate"
                    :error-messages="errors.street"
                    variant="underlined"
                    color="green-darken-3"
                    :items="['Peachtree Street',
                      'Marietta Street', 
                      'Decatur Street', 
                      'Spring Street', 
                      'Auburn Avenue', 
                      'Monroe Drive', 
                      'North Avenue', 
                      'Boulevard', 
                      'Ponce de Leon Avenue', 
                      'Irwin Street', 
                      'Edgewood Avenue', 
                      'Mitchell Street',
                      'Chicory Way',
                      'Churchill Heights',
                      'Clarinbridge Way',
                      'Cobblestone Way',
                      'Columbia Bay',
                      'Cranchester Way',
                      'Whittenham Clse'
                    ]"
                  ></v-select>

                  <v-text-field
                    v-model="formData.neighborhood"
                    label="Neighborhood"
                    required
                    :disabled="!cpValidate"
                    placeholder="Enter your neighborhood"
                    :error-messages="errors.neighborhood"
                    variant="underlined"
                    color="green-darken-3"
                  ></v-text-field>
  
                  <v-text-field
                    v-model="formData.houseNumber"
                    label="House Number"
                    required
                    :disabled="!cpValidate"
                    :error-messages="errors.houseNumber"
                    variant="underlined"
                    color="green-darken-3"
                    placeholder="Enter you house number"
                    type="number"
                  ></v-text-field>

                  
                    <v-btn
                    v-if="step > 1"
                    @click="step--"
                    color="red-darken-4"
                    variant="text"
                  >
                    Previous Step
                  </v-btn>
                  <v-btn
                    v-if="step !== items.length"
                    @click="validateDirecion"
                    color="green-darken-3"
                    variant="text"
                    :disabled="!cpValidate"
                  >
                    Next Step
                  </v-btn>
                </v-col>
              </v-row>
            </template>

            <template v-slot:item.3>
              <h3 class="text-h6">User data</h3>

              <br>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formData.userName"
                    label="Username"
                    color="green-darken-3"
                    required
                    :error-messages="errors.userName"
                    variant="underlined"
                    placeholder="Ex. UserName38"
                  ></v-text-field>
    
                  <v-text-field
                    v-model="formData.email"
                    label="Email"
                    required
                    :error-messages="errors.email"
                    variant="underlined"
                    placeholder="useremail@domain.com"
                    type="email"
                    color="green-darken-3"
                  ></v-text-field>
    
                  <v-text-field
                    v-model="formData.password"
                    label="Password"
                    required
                    :error-messages="errors.password"
                    variant="underlined"
                    color="green-darken-3"
                    placeholder="Hello12#"
                    :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passwordVisible ? 'text' : 'password'"
                    outlined
                    @click:append-inner="togglePasswordVisibility"
                    @input="checkStrength"
                  ></v-text-field>

                  <div v-if="formData.password.length > 0">
                    <span v-if="formData.passwordStrength === 'weak'" class="red--text">Weak password</span>
                    <span v-else-if="formData.passwordStrength === 'good'" class="orange--text">Good password</span>
                    <span v-else class="green--text">Excellent password</span>
                  </div>
    
                  <v-text-field
                    v-model="formData.confirmPassword"
                    label="Confirm Password"
                    required
                    :error-messages="errors.confirmPassword"
                    variant="underlined"
                    color="green-darken-3"
                    placeholder="Hello12#"
                    :append-inner-icon="passwordVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passwordVisibleConfirm ? 'text' : 'password'"
                    outlined
                    @click:append-inner="togglePasswordVisibilityConfirm"
                  ></v-text-field>

                  <v-checkbox
                    v-model="formData.agreeToTerms"
                    :required="true"
                    :error-messages="errors.agreeToTerms"
                    label="I accept the Terms and Conditions for signing up to this page."
                    color="green-darken-3"
                  ></v-checkbox>
                
                <v-btn
                  v-if="step > 1"
                  @click="step--"
                  color="red-darken-4"
                  variant="text"
                >
                  Previous Step
                </v-btn>
                <v-btn
                :disabled="!formData.agreeToTerms"
                  @click="validateUser"
                  color="green-darken-3"
                  variant="text"
                >
                  Sign Up
                </v-btn>
                
                </v-col>
              </v-row>
                
            </template>
          </v-stepper>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialogVisible" width="500">
    
    <template v-slot:default="{ dialog }" >
      
      <v-sheet
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-4 text-center mx-auto"
        
      >
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
          v-if="progress"
        ></v-progress-circular>
        <div v-if="!progress">
          <v-icon
            class="mb-5"
            :color="color"
            :icon="icon"
            size="112"
          ></v-icon>
  
          <h2 class="text-h5 mb-6">{{ tittle }}</h2>
  
          <p class="mb-4 text-medium-emphasis text-body-2">
            {{ message }}
          </p>
  
          <v-divider class="mb-4"></v-divider>
  
          <div class="text-end">
            <v-btn
              class="text-none"
              :color="color"
              rounded
              variant="flat"
              width="90"
              @click="dialogVisible = false"
            >
              okey
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </template>
  </v-dialog>
</template>

<script>
import { api } from '@/axios/axios';
import axios from 'axios';

export default {
  data() {
    return {

      formData: {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        sexo: '',
        lada: '',
        phone: '',
        imagen: null,
        postalCode: '',
        userName: '',
        email: '',
        password: '',
        passwordStrength: '',
        confirmPassword: '',
        houseNumber: '',
        street: '',
        neighborhood: '',
        city: '',
      },
      shipping: 0,
      step: 1,
      items: ['Personal Information', 'Location Details', 'User Data'],
      routes: [
        {
          title: 'Home',
          disabled: false,
          href: '/home/homeuser',
        },
        {
          title: 'Register',
          disabled: false,
          href: '/login/registration',
        },
      ],
      // Error messages for each field
      errors: {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        phone: '',
        lada: '',
        city: '',
        neighborhood: '',
        street: '',
        houseNumber: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: '',
        postalCode: ''
      },
      progress: true,
      dialogVisible: false,
      color: '',
      tittle: '',
      message: '',
      icon: '',
      passwordVisibleConfirm: false,
      passwordVisible: false,
      cpValidate : false,
      loadBtn : false
    };
  },
  methods: {

    checkStrength() {
      const patterns = {
        length: /.{6,}/,
        lowercase: /[a-z]+/,
        uppercase: /[A-Z]+/,
        number: /\d+/,
        special: /[@$!%*?&#^*]+/,
      };

      const checks = {
        length: patterns.length.test(this.formData.password),
        lowercase: patterns.lowercase.test(this.formData.password),
        uppercase: patterns.uppercase.test(this.formData.password),
        number: patterns.number.test(this.formData.password),
        special: patterns.special.test(this.formData.password),
      };

      const passedChecks = Object.values(checks).filter(Boolean).length;

      switch (passedChecks) {
        case 5:
          this.formData.passwordStrength = 'excellent';
          break;
        case 4:
          this.formData.passwordStrength = 'good';
          break;
        default:
          this.formData.passwordStrength = 'weak';
      }
    },
    async validatePostalCode() {
      this.loadBtn = true;

      // Verificación inicial del formato del código postal
      if (this.formData.postalCode.length !== 5 || !/^\d+$/.test(this.formData.postalCode)) {
        this.errors.postalCode = 'Invalid postal code';
        this.cpValidate = false; // Asume que la validación es falsa inicialmente
        this.loadBtn = false;
        return;
      }

      try {
        // Llamada a la API de Zippopotam para validar el código postal
        const response = await axios.get(`https://api.zippopotam.us/us/${this.formData.postalCode}`);
        const data = response.data;

        // Verifica si el lugar es Atlanta
        const placeName = data.places[0]['place name'];
        console.log(placeName)
        if (placeName.toLowerCase() === 'atlanta') {
          this.errors.postalCode = '';
          this.cpValidate = true;
          this.formData.city = placeName; // Asigna el nombre del lugar al campo de ciudad
        } else {
          this.errors.postalCode = 'Service is only offered in Atlanta'; // Mensaje de error si no es Atlanta
          this.cpValidate = false;
        }
      } catch (error) {
        console.error("Error fetching postal code info:", error);
        this.errors.postalCode = 'Invalid postal code';
        this.cpValidate = false;
      } finally {
        this.loadBtn = false;
      }
    },

    togglePasswordVisibility () {
      this.passwordVisible = !this.passwordVisible;
    },
    togglePasswordVisibilityConfirm () {
      this.passwordVisibleConfirm = !this.passwordVisibleConfirm;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];

      // Check if a file is selected
      this.errors.image = (!file) ? 'Please select an image file.' : '';

      // Check the file size (in bytes)
      const maxSize = 4 * 1024 * 1024; // 4 megabytes
      this.errors.image = (file.size > maxSize) ? 'File size must be up to 4 megabytes.' : '';

      // Read the image as a Blob object
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.imagen = e.target.result;
      };

      // Check if the file type is an image
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        this.errors.image = 'Please select a valid image file.';
      }
    },


    async validateInformation() {
      let lada = this.formData.lada.split(' ')[0]; // "+1"
      let number = lada.replace('+', ''); // "1"
      console.log(number); // Imprime: 1

      // Validation for Personal Information step
      this.errors.nombre = (this.formData.nombre.length < 3 || !/^[a-zA-ZüÜáéíóúÁÉÍÓÚñÑ' ]+$/.test(this.formData.nombre))
          ? 'Invalid first name'
          : '';

      this.errors.apellidoPaterno = (this.formData.apellidoPaterno.length < 4 || !/^[a-zA-ZüÜáéíóúÁÉÍÓÚñÑ' ]+$/.test(this.formData.apellidoPaterno))
          ? 'Invalid last name'
          : '';

      this.errors.apellidoMaterno = (this.formData.apellidoMaterno.length < 4 || !/^[a-zA-ZüÜáéíóúÁÉÍÓÚñÑ' ]+$/.test(this.formData.apellidoMaterno))
          ? 'Invalid middle name'
          : '';

      this.errors.fechaNacimiento = (new Date().getFullYear() - new Date(this.formData.fechaNacimiento).getFullYear() < 18)
        ? 'Invalid date of birth'
        : '';
      this.errors.lada = (!this.formData.lada)
        ? 'Lada is required'
        : '';

      // Validación del número de teléfono con la API
      try {
        const response = await axios.get(`https://api.apilayer.com/number_verification/validate?number=${number}${this.formData.phone}`, {
          headers: {
            'apikey': 'isWBK7I7wNGIiFCcBpYICqSUGrKgpdDw'
          }
        });
        console.log(response)
        if (response.data.valid) {
          this.errors.phone = '';
        } else {
          this.errors.phone = 'Invalid phone number';
        }
      } catch (error) {
        console.error(error);
        this.errors.phone = 'Error validating phone number';
      }



      if (Object.values(this.errors).some(error => error !== '')) {
        return;
      }
      console.log(this.formData.imagen)
      this.step++;
    },
    validateDirecion() {
      // Validation for Location Details step
      this.errors.city = (!this.formData.city)
        ? 'City is required'
        : '';
      
        // Define the regex pattern to match valid characters
        const validPattern = /^[a-zA-Z0-9\s'#]+$/;
        const hasInvalidChars = !validPattern.test(this.formData.neighborhood);
        if (!this.formData.neighborhood) {
            this.errors.neighborhood = 'Neighborhood is required';
        } 

        // Check for invalid characters
        else if (hasInvalidChars) {
            this.errors.neighborhood = 'Only letters, numbers, spaces, apostrophes, and "#" are allowed';
        }
        else{
          this.errors.neighborhood = ''
        }
            
      this.errors.street = (!this.formData.street)
        ? 'Street is required'
        : '';
      this.errors.houseNumber = (this.formData.houseNumber.length < 3 || !/^\d+$/.test(this.formData.houseNumber))
        ? 'Invalid house number'
        : '';

      if (Object.values(this.errors).some(error => error !== '')) {
        return;
      }
      this.step++;
    },
    validateUser() {
      // Validation for User Data step
      this.errors.userName = (!this.formData.userName || this.formData.userName.length < 6 || !/^[a-zA-Z0-9]+$/.test(this.formData.userName))
        ? 'Invalid username'
        : '';
        this.errors.email = (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(this.formData.email))
        ? ''
        : 'Must be a valid e-mail with a supported domain.';


      if (this.formData.password === this.formData.confirmPassword){
        this.errors.confirmPassword = ''
        this.errors.password = ''
      }
      if (this.formData.password < 6) {
        this.errors.password = 'Password must be at least 6 characters long.';
      }

      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(this.formData.password)) {
        this.errors.password =  'Password must contain at least one uppercase letter.';
      }

      // Check for at least one number
      if (!/\d/.test(this.formData.password)) {
        this.errors.password =  'Password must contain at least one number.';
      }

      // Check for only one special character
      const specialCharCount = (this.formData.password.match(/[^A-Za-z0-9]/g) || []).length;
      if (specialCharCount !== 1) {
        this.errors.password =  'Password must contain only one special character.';
      }


      if (this.formData.confirmPassword < 6) {
        this.errors.confirmPassword = 'Password must be at least 6 characters long.';
      }

      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(this.formData.confirmPassword)) {
        this.errors.confirmPassword =  'Password must contain at least one uppercase letter.';
      }

      // Check for at least one number
      if (!/\d/.test(this.formData.confirmPassword)) {
        this.errors.confirmPassword =  'Password must contain at least one number.';
      }

      // Check for only one special character
      const specialCharCountTwo = (this.formData.confirmPassword.match(/[^A-Za-z0-9]/g) || []).length;
      if (specialCharCountTwo !== 1) {
        this.errors.confirmPassword =  'Password must contain only one special character.';
      }

      if(this.formData.password !== this.formData.confirmPassword){
        this.errors.confirmPassword = 'Passwords do not match.'
        this.errors.password = 'Passwords do not match.'
      }
      

      if (Object.values(this.errors).some(error => error !== '')) {
        return;
      }
      this.signUp();
    },
    signUp: async function () {
      this.tittle = ''
      this.message = ""
      this.icon = ''
      this.color = ''
      this.dialogVisible = true
      this.progress = true
      try {
        
        const direccion = {
          estado: this.formData.neighborhood,
          numCasa: this.formData.houseNumber,
          postalCode: this.formData.postalCode,
          ciudad: this.formData.city,
          calle: this.formData.street,
        };
        
        const datos = {
          name: this.formData.nombre,
          apellidoP: this.formData.apellidoPaterno,
          apellidoM: this.formData.apellidoMaterno,
          fechaNacimiento: this.formData.fechaNacimiento,
          genero: this.formData.sexo,
          cellPhone: this.formData.phone,
          imagen: this.formData.imagen,
          direccion: direccion,
          userName: this.formData.userName,
          email: this.formData.email,
          password: this.formData.password,
        };

        console.log("Datos:", datos);

        // Usar async/await ya que api.post devuelve una Promise
        const {data} = await api.post('/user/signup', datos);
        
        if(data.success === false){
          this.tittle = 'Something went wrong while registering your gardening account! 🌿🚨'
          this.message = data.msg
          this.icon = 'mdi-alert-octagon-outline'
          this.color = 'red-darken-4'
          this.progress = false
        }else{
          this.tittle = 'Successful gardening account registration! 🌟🌻'
          this.message = "Kindly check your inbox; we've sent you a verification code. Happy cultivating! 🪴📬"
          this.icon = 'mdi-check-circle'
          this.color = 'green-darken-3'
          this.progress = false
          setTimeout(() => {
            this.$router.push({ name: "home-home" });
          }, 2000);
        }
      } catch (error) {
        this.$router.push({ name: "serverError" });
        // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
      }
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
.red--text {
    color: red;
  }
  
  .orange--text {
    color: orange;
  }
  
  .green--text {
    color: green;
  }
</style>
