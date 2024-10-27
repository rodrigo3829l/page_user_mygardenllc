<template>
  <div class="verified-container">
    <div class="verified-content">
      <v-icon size="150" color="success">mdi-check-circle-outline</v-icon>
      <h2 class="verified-title display-3">Account recover!</h2>
      <p class="verified-message subtitle-1">
        Congratulations! Your garden account is now recover and in full bloom.
        Explore and enjoy the beauty of our garden.
      </p>
      <v-btn class="mt-6" color="success" dark @click="goToDashboard">
        <v-icon left>mdi-arrow-right</v-icon>
        Go to Your Garden
      </v-btn>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const goToDashboard = () => {
      router.push({ name: "login-login" }); // Asegúrate de que 'login-login' sea el nombre correcto de tu ruta
    };

    return {
      goToDashboard,
    };
  },
};
</script>

<style scoped>
/* Agrega aquí estilos personalizados si es necesario */
.verified-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.verified-content {
  text-align: center;
}

.verified-title {
  font-size: 3rem;
  font-weight: 500;
  color: #2ecc71; /* Color verde para representar éxito/verificación */
}

.verified-message {
  font-size: 1.25rem;
  color: #333;
  margin-top: 10px;
}
</style>
