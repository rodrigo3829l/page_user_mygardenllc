import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import { loadFonts } from "./plugins/webfontloader";
import { createI18n } from "vue-i18n";
import router from "./router/router.js";
import { useUserStore } from "./store/store.js";
// import { onMessageListener } from "../firebase.js";

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

// onMessageListener()
//   .then((payload) => {
//     console.log("Notificación recibida en primer plano:", payload);
//     if (Notification.permission === "granted") {
//       new Notification(payload.notification.title, {
//         body: payload.notification.body,
//         icon: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png",
//         requireInteraction: true,
//         silent: false
//       });
//     } else {
//       console.log("Permiso de notificación no concedido.");
//     }
//   })
//   .catch((err) => console.log("Error al recibir el mensaje en primer plano:", err));

// onMessageListener()
//   .then((payload) => {
//     console.log("Notificación recibida en primer plano:", payload);

//     if (Notification.permission === "granted") {
//       const notificationOptions = {
//         body: payload.notification.body,
//         icon: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png",
//         requireInteraction: true,
//         silent: false,
//       };

//       // Crear la notificación
//       const notification = new Notification(payload.notification.title, notificationOptions);

//       // Agregar evento para redirigir al hacer clic
//       notification.onclick = (event) => {
//         event.preventDefault(); // Previene la acción por defecto
//         const serviceId = payload.data.serviceId; // Asegúrate de que el payload tenga el ID del servicio
//         const url = `https://mygardenllcservices.com/profile/infomyservices/${serviceId}`;

//         // Abre la URL en la misma pestaña o en una nueva
//         window.open(url, "_blank"); // "_blank" abre en una nueva pestaña. Cambia a "_self" para la misma pestaña
//       };
//     } else {
//       console.log("Permiso de notificación no concedido.");
//     }
//   })
//   .catch((err) => console.log("Error al recibir el mensaje en primer plano:", err));
