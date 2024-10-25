// // Styles
// import '@mdi/font/css/materialdesignicons.css';
// import 'vuetify/styles';

// // Vuetify
// import { createVuetify } from 'vuetify';

// export default createVuetify();

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/lib/styles/main.sass'; // Asegúrate de usar esta ruta

// Vuetify
import { createVuetify } from 'vuetify/lib/framework.mjs'; // Importación desde el framework completo
import * as components from 'vuetify/lib/components/index.mjs';
import * as directives from 'vuetify/lib/directives/index.mjs';

export default createVuetify({
  components,
  directives,
});
