<template>
    <div class="unverified-container">
      <div class="unverified-content">
        <v-icon size="150" color="warning">mdi-alert-octagon-outline</v-icon>
        <h2 class="unverified-title display-3">Account Not Verified!</h2>
        <p class="unverified-message subtitle-1">
          Oh dear! Your garden account needs a little sunshine to bloom. Please verify your account to explore the full beauty of our garden.
        </p>
        <v-btn class="mt-6" color="warning" dark @click="goToDashboard">
          <v-icon left>mdi-arrow-right</v-icon>
          Go to Home
        </v-btn>
      </div>
    </div>
  </template>
  
  <script>
    import {  useRouter } from 'vue-router';
    
    export default {
      setup() {
        const router = useRouter();
    
        const goToDashboard = () => {
          router.push({ name: 'home-home' }); // Asegúrate de que 'login-login' sea el nombre correcto de tu ruta
        };
    
        return {
          goToDashboard,
        };
      },
    };
    </script>
  
  <style scoped>
    /* Agrega aquí estilos personalizados si es necesario */
    .unverified-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70vh;
    }
  
    .unverified-content {
      text-align: center;
    }
  
    .unverified-title {
      font-size: 3rem;
      font-weight: 500;
      color: #f39c12; /* Color amarillo para representar advertencia/no verificado */
    }
  
    .unverified-message {
      font-size: 1.25rem;
      color: #333;
      margin-top: 10px;
    }
  </style>
  