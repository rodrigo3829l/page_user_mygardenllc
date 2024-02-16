import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import vuetify from './plugins/vuetify';
import { createPinia } from 'pinia';
import { loadFonts } from './plugins/webfontloader';
import { createI18n } from 'vue-i18n';

// Aquí puedes importar tus archivos de idioma
import es from './locales/es.json';
import en from './locales/en.json';

loadFonts();
const pinia = createPinia();
const i18n = createI18n({
  locale: 'en', // idioma inicial
  fallbackLocale: 'es', // idioma de reserva
  messages: { es, en }
});

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .use(i18n) // Agregar vue-i18n como plugin
  .mount('#app');
