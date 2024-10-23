import { config } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createApp } from 'vue'; // Importamos Vue explícitamente

// Instancia global de Vue para todas las pruebas
const app = createApp({});
const vuetify = createVuetify();

app.use(vuetify);

// Configura los plugins globalmente para que estén disponibles en los tests
config.global.plugins = [vuetify];
config.global.mocks = {
  $t: (msg) => msg, // Mock para vue-i18n (si lo usas)
};
