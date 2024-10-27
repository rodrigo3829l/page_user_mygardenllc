<template>
  <v-container>
    <div class="verified-container">
      <div class="verified-content">
        <v-icon size="150" color="error">mdi-alert-circle-outline</v-icon>
        <h2 class="verified-title display-3" style="color: red">
          Verification Code Expired
        </h2>
        <p class="verified-message subtitle-1">
          Oops! Your verification code for the garden account has wilted and
          expired. Don't worry, a new seed has been planted, and another code is
          blossoming into your email. Please check your inbox to continue
          nurturing your garden journey.
        </p>
        <v-btn class="mt-6" color="error" dark @click="goToDashboard">
          Go to the page
        </v-btn>
      </div>
    </div>
  </v-container>
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
  color: red; /* Color rojo para representar error */
}

.verified-message {
  font-size: 1.25rem;
  color: #333;
  margin-top: 10px;
}
</style>
