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
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="Phone number"
                        v-model="formData.phone"
                        required
                        type="number"
                        variant="underlined"
                        color="green-darken-3"
                      ></v-text-field>
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
                  @click="step++"
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
                    <v-autocomplete
                      v-model="formData.city"
                      label="City"
                      color="green-darken-3"
                      required
                      variant="underlined"
                      :items="['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale', 'Tallahassee', 'St. Petersburg', 'Naples', 'Fort Myers', 'Key West', 'Pensacola', 'Sarasota']"
                    ></v-autocomplete>
    
                    <v-autocomplete
                      v-model="formData.neighborhood"
                      label="Neighborhood"
                      required
                      variant="underlined"
                      color="green-darken-3"
                      :items="['Buckhead', 'Midtown', 'Virginia-Highland', 'Inman Park', 'Old Fourth Ward', 'Grant Park', 'Cabbagetown', 'Poncey-Highland', 'Kirkwood', 'West End', 'East Atlanta Village', 'Little Five Points']"
                    ></v-autocomplete>
  
                    <v-autocomplete
                      v-model="formData.street"
                      label="Street"
                      required
                      variant="underlined"
                      color="green-darken-3"
                      :items="['Peachtree Street', 'Marietta Street', 'Decatur Street', 'Spring Street', 'Auburn Avenue', 'Monroe Drive', 'North Avenue', 'Boulevard', 'Ponce de Leon Avenue', 'Irwin Street', 'Edgewood Avenue', 'Mitchell Street']"
                    ></v-autocomplete>
    
                    <v-text-field
                      v-model="formData.houseNumber"
                      label="House Number"
                      required
                      variant="underlined"
                      color="green-darken-3"
                      placeholder="Enter you house number"
                      type="number"
                    ></v-text-field>
  
                    <v-autocomplete
                      v-model="formData.postalCode"
                      label="Postal Code"
                      required
                      variant="underlined"
                      color="green-darken-3"
                      :items="['30301', '30302', '30303', '30304', '30305', '30306', '30307', '30308', '30309', '30310', '30311', '30312', '30313', '30314', '30315', '30316', '30317', '30318', '30319', '30320']"
                    ></v-autocomplete>
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
                      @click="step++"
                      color="green-darken-3"
                      variant="text"
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
                  
                  <v-btn
                  v-if="step > 1"
                  @click="step--"
                  color="red-darken-4"
                  variant="text"
                >
                  Previous Step
                </v-btn>
                <v-btn
                  @click="signUp"
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
  </template>
  
  <!-- <script>
  import { api } from '@/axios/axios';
  import { useRouter } from 'vue-router';
  // import { defineAsyncComponent } from 'vue'
  export default {
    data() {
      return {
        formData: {
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          fechaNacimiento: '',
          sexo: '',
          phone: '',
          imagen: null,
          postalCode: '',
  
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
        routes: [
          {
            title: 'Home',
            disabled: false,
            href: '/home/homeuser',
          },
          {
            title: 'Register',
            disabled: false,
            href: '/login/reistration',
          },
          
        ],
        // Error messages for each field
        errors: {
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          fechaNacimiento: '',
          phone: '',
          city: '',
          neighborhood: '',
          street: '',
          houseNumber: '',
          userName: '',
          email: '',
        },
        validateInformation: () =>{
          console.log("validacion uno")
        },
        validateDirecion: () =>{
          console.log("validacion direccion")
        },
        validateUser: () =>{
          console.log("validacion User")
        },
        signUp: async () => {
          try {
            console.log("registro");
            
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
  
            console.log("Respuesta del servidor:", data);
            alert(data.msg)
  
            // Redirigir después de 2 segundos
            const router = useRouter();
            setTimeout(() => {
              router.push({ name: "home-home" });
            }, 2000);
            
          } catch (error) {
            console.error("Error al realizar el registro:", error);
            // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
          }
        }
  
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
  </script> -->
  
  
  <script>
  import { api } from '@/axios/axios';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        formData: {
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          fechaNacimiento: '',
          sexo: '',
          phone: '',
          imagen: null,
          postalCode: '',
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
          city: '',
          neighborhood: '',
          street: '',
          houseNumber: '',
          userName: '',
          email: '',
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
      validateInformation() {
        // Validation for Personal Information step
        this.errors.nombre = (this.formData.nombre.length < 3 || !/^[a-zA-Z]+$/.test(this.formData.nombre))
          ? 'Invalid first name'
          : '';
        this.errors.apellidoPaterno = (this.formData.apellidoPaterno.length < 4 || !/^[a-zA-Z]+$/.test(this.formData.apellidoPaterno))
          ? 'Invalid last name'
          : '';
        this.errors.apellidoMaterno = (this.formData.apellidoMaterno.length < 4 || !/^[a-zA-Z]+$/.test(this.formData.apellidoMaterno))
          ? 'Invalid middle name'
          : '';
        this.errors.fechaNacimiento = (new Date().getFullYear() - new Date(this.formData.fechaNacimiento).getFullYear() < 18)
          ? 'Invalid date of birth'
          : '';
        this.errors.phone = (this.formData.phone.length < 10 || !/^\d+$/.test(this.formData.phone))
          ? 'Invalid phone number'
          : '';
  
        if (Object.values(this.errors).some(error => error !== '')) {
          return;
        }
        this.step++;
      },
      validateDirecion() {
        // Validation for Location Details step
        this.errors.city = (!this.formData.city)
          ? 'City is required'
          : '';
        this.errors.neighborhood = (!this.formData.neighborhood)
          ? 'Neighborhood is required'
          : '';
        this.errors.street = (!this.formData.street)
          ? 'Street is required'
          : '';
        this.errors.houseNumber = (this.formData.houseNumber.length < 5 || !/^\d+$/.test(this.formData.houseNumber))
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
        this.errors.email = (!this.formData.email)
          ? 'Email is required'
          : '';
  
        if (Object.values(this.errors).some(error => error !== '')) {
          return;
        }
        this.signUp();
      },
      signUp: async () => {
        try {
          console.log("registro");
          
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
  
          console.log("Respuesta del servidor:", data);
          alert(data.msg)
  
          // Redirigir después de 2 segundos
          const router = useRouter();
          setTimeout(() => {
            router.push({ name: "home-home" });
          }, 2000);
          
        } catch (error) {
          console.error("Error al realizar el registro:", error);
          // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
        }
      },
      submitForm() {
        // ... (your existing submitForm function)
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
  