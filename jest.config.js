module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(vee-validate|vuetify|vue3-toastify|axios|swiper)/)', // No ignorar Swiper
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^axios$': '<rootDir>/__mocks__/axios.js',
    '^swiper/vue$': '<rootDir>/__mocks__/swiper/vue.js', // Asegura que se use el mock
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js', '<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'json', 'vue', 'mjs'],
};
