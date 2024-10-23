const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'x73ftn',
  e2e: {
    baseUrl: 'http://localhost:5173',
    defaultCommandTimeout: 10000, // 10 segundos de espera
    setupNodeEvents(on, config) {
      // Eventos si es necesario
    },
  },
});
