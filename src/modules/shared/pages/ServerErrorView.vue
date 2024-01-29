<template>
    <v-container>
      <div class="error-container">
      <div class="error-content">
        <v-icon size="150" color="error">mdi-alert-octagon-outline</v-icon>
        <h2 class="error-title display-3">Error 500: Oops, Something Went Wrong!</h2>
        <p class="error-message subtitle-1">
          Oh no! Our garden seems to be going through a little maintenance. We're working hard to fix it. Please check back later and explore our blossoming garden.
        </p>
        <v-btn class="mt-6" color="error" dark @click="goBack">
          <v-icon left>mdi-arrow-left</v-icon>
          Back to the garden entrance
        </v-btn>
      </div>
    </div>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  
  <style scoped>
    /* Agrega aquí estilos personalizados si es necesario */
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70vh;
    }
  
    .error-content {
      text-align: center;
    }
  
    .error-title {
      font-size: 3rem;
      font-weight: 500;
      color: #e74c3c;
    }
  
    .error-message {
      font-size: 1.25rem;
      color: #333;
      margin-top: 10px;
    }
  </style>
  