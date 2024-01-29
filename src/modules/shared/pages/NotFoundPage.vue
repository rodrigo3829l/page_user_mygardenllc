<template>
  <div class="error-container">
    <div class="error-content">
      <v-icon size="150" color="error">mdi-flower</v-icon>
      <h2 class="error-title display-3">Error 404: Oops!</h2>
      <p class="error-message subtitle-1">
        It seems you've reached a corner of our garden that doesn't exist. We invite you to explore our main pages.
      </p>
      <v-btn class="mt-6" color="error" dark @click="goBack">
        <v-icon left>mdi-arrow-left</v-icon>
        Back to the garden
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  data() {
    return {
      iconSrc: 'https://cdn-icons-png.flaticon.com/128/1761/1761536.png', // URL del ícono
    };
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
    font-size: 4rem;
    font-weight: 500;
    color: #e74c3c;
  }

  .error-message {
    font-size: 1.25rem;
    color: #333;
    margin-top: 10px;
  }
</style>
