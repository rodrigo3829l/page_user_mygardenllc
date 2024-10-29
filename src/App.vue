<template>
  <v-app>
    <v-main>
      <!-- Barra de navegacion -->
      <NavBar></NavBar>

      <!-- Mostrar el Splash Screen primero -->
      <!-- <SplashScreen v-if="showSplash" /> -->

      <!-- Home Screen -->
      <router-view></router-view>

      <!-- <router-view></router-view> -->
      <FooterComponent></FooterComponent>

      <!-- Snackbar para el estado de conexión -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        top
        variant="tonal"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.message }}
        <template v-slot:actions>
          <v-btn text @click="snackbar.show = false">Cerrar</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { csp } from "./plugins/csp";

export default {
  metaInfo() {
    return {
      meta: [
        {
          "http-equiv": "Content-Security-Policy",
          content: csp,
        },
      ],
    };
  },
  data() {
    return {
      showSplash: true,
      snackbar: {
        show: false,
        message: "",
        color: "",
        timeout: 2000,
      },
    };
  },
  components: {
    NavBar: defineAsyncComponent(
      () => import("@/modules/shared/components/NavBar.vue"),
    ),
    FooterComponent: defineAsyncComponent(
      () => import("@/modules/shared/components/FooterComponent.vue"),
    ),
    // SplashScreen: defineAsyncComponent(
    //   () => import("@/modules/shared/components/SplashScreen.vue"),
    // ),
    // AccessibilityButtons: defineAsyncComponent(() => import('@/modules/shared/components/AccessibilityButtons.vue')),
  },
  mounted() {
    // Verifica el estado de conexión al cargar el componente
    this.checkOnlineStatus();

    // Suscribirse al evento de conexión en línea
    window.addEventListener("online", this.checkOnlineStatus);

    // Suscribirse al evento de conexión sin conexión
    window.addEventListener("offline", this.checkOnlineStatus);

    setTimeout(() => {
      this.showSplash = false;
    }, 2000);
  },
  methods: {
    checkOnlineStatus() {
      // Verifica si el navegador está en línea
      if (navigator.onLine) {
        this.snackbar.show = true;
        this.snackbar.message = "Se ha restaurado la conexion";
        this.snackbar.color = "success";
      } else {
        this.snackbar.show = true;
        this.snackbar.message = "Estas sin conexion";
        this.snackbar.color = "error";
      }
    },
  },
  // beforeDestroy() {
  //   // Asegúrate de eliminar los event listeners al destruir el componente
  //   window.removeEventListener('online', this.checkOnlineStatus);
  //   window.removeEventListener('offline', this.checkOnlineStatus);
  // }
};
</script>

<style>
a {
  text-decoration: none;
  /* Quita el subrayado */
  color: inherit;
  /* Usa el color heredado (mismo color que el texto circundante) */
  cursor: pointer;
  /* Establece el cursor a pointer para indicar que es interactivo */
}

.toastify.toastify-success {
  background-color: #2e7d32;
}

/* Estilo para notificaciones de error */
.toastify.toastify-error {
  background-color: #d50000;
}

/* Estilo para notificaciones de advertencia */
.toastify.toastify-warning {
  background-color: #ffd600;
}
</style>
