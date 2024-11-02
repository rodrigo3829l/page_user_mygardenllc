import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import { loadFonts } from "./plugins/webfontloader";
import { createI18n } from "vue-i18n";
import router from "./router/router.js";
import { useUserStore } from "./store/store.js";
import { onMessageListener } from "../firebase.js";

import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Aquí puedes importar tus archivos de idioma
import es from "./locales/es.json";
import en from "./locales/en.json";

loadFonts();
const pinia = createPinia();

export const i18n = createI18n({
  locale: "en", // idioma inicial
  fallbackLocale: "es", // idioma de reserva
  messages: { es, en },
});

const app = createApp(App);

app
  .use(pinia)
  .use(router)
  .use(vuetify)
  .use(Vue3Toastify, {
    autoClose: 3000, // Configuraciones globales (opcional)
  })
  .use(i18n) // Agregar vue-i18n como plugin
  .mount("#app");

const userStore = useUserStore();
userStore.initializeStore();

onMessageListener()
  .then((payload) => {
    console.log("Notificación recibida en primer plano:", payload);
    if (Notification.permission === "granted") {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon || "../public/img/icons/192x192.png",
        requireInteraction: true,
        silent: false
      });
    } else {
      console.log("Permiso de notificación no concedido.");
    }
  })
  .catch((err) => console.log("Error al recibir el mensaje en primer plano:", err));

