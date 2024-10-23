module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^vuetify/(.*)$': 'vuetify/lib/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!vuetify|vue-router)', // Asegúrate de transformar estos módulos
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/setup.js'], // Cargamos setup.js antes de las pruebas
};
