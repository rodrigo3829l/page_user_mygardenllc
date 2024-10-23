import { mount } from '@vue/test-utils';
import NavigationPage from '../../../../../src/modules/accesibility/pages/navegationPage.vue';
import { createVuetify } from 'vuetify';
import { createRouter, createWebHistory } from 'vue-router';
import 'vuetify/styles'; // Importa los estilos

const vuetify = createVuetify();
const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('NavigationPage.vue', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(NavigationPage, {
      global: {
        plugins: [vuetify, router],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
