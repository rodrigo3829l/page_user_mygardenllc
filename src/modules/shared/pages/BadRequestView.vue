<template>
  <div class="error-container">
    <div class="error-content">
      <v-icon size="150" color="error">mdi-alert-circle-outline</v-icon>
      <h2 class="error-title display-3">Error 400: ¡Oops!</h2>
      <p class="error-message subtitle-1">
        Oops! It looks like your garden request got a bit tangled. Please check
        that all the details in your form are blooming and try again.
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
};
</script>

<style scoped>
/* Agrega aquí estilos personalizados si es necesario */
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
