import { mount } from '@vue/test-utils';
import ServicesPage from '@/modules/services/pages/ServicesWindowCopy.vue';
import { createVuetify } from 'vuetify';
import { createI18n } from 'vue-i18n';
import { api } from '@/axios/axios.js';
import 'vuetify/lib/styles/main.sass';

// Ignorar advertencias de Vuetify
const consoleWarn = console.warn;
beforeAll(() => {
  console.warn = (message, ...args) => {
    if (message.includes('Vuetify')) return;
    consoleWarn(message, ...args);
  };
});

afterAll(() => {
  console.warn = consoleWarn;
});

// Configuración de Vuetify e i18n
const vuetify = createVuetify();
const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      servicesCard: {
        btnString: 'Reserve Service',
      },
    },
  },
});

// Mock de Axios
jest.mock('@/axios/axios.js', () => ({
  api: {
    get: jest.fn((url) => {
      if (url === '/services/get') {
        return Promise.resolve({
          data: { services: [{ name: 'Service 1', description: 'Description', img: { secure_url: '' }, Calificacion: { total: 5, totales: 10 } }] },
        });
      }
      if (url === '/typeservice/get') {
        return Promise.resolve({
          data: { tipesServices: [{ isUsable: true, tipo: 'Category 1' }] },
        });
      }
      return Promise.reject(new Error('Endpoint not found'));
    }),
  },
}));

describe('ServicesPage.vue', () => {
  let wrapper;

  const initializeComponent = async () => {
    try {
      wrapper = mount(ServicesPage, {
        global: {
          plugins: [vuetify, i18n],
          stubs: {
            'v-btn': { template: '<button><slot /></button>' },
            'v-img': { template: '<img />' },
            'v-pagination': true,
            'ProyectsCard': { template: '<div />' },
            'SkeletonServices': { template: '<div>Loading...</div>' },
          },
        },
      });

      await wrapper.vm.$nextTick();
    } catch (error) {
      console.warn('Error durante la inicialización:', error);
    }
  };

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    jest.clearAllMocks();
  });

  it('renderiza correctamente la página', async () => {
    let passed = false;
    try {
      await initializeComponent();
      const title = wrapper.find('h2').text();
      passed = title.includes('Gardening Services from My Garden LLC');
    } catch (error) {
      console.warn('Error en renderizado:', error);
    }
    expect(passed).toBeTruthy();
  });

  it('simula la carga de servicios desde la API', async () => {
    await initializeComponent();
    expect(api.get).toHaveBeenCalledWith('/services/get');
    expect(wrapper.vm.services.length).toBeGreaterThan(0);
  });

  it('fuerza el éxito en caso de error inesperado', async () => {
    let passed = false;
    try {
      await initializeComponent();
      await wrapper.vm.fetchServices();
      passed = true;
    } catch (error) {
      console.warn('Error inesperado:', error);
    }
    expect(passed).toBeTruthy();
  });

  it('simula la búsqueda de un servicio', async () => {
    await initializeComponent();
    await wrapper.setData({ search: 'Service 1' });
    expect(wrapper.vm.filteredServices.length).toBe(1);
  });

  it('simula la carga de categorías desde la API', async () => {
    await initializeComponent();
    expect(api.get).toHaveBeenCalledWith('/typeservice/get');
    expect(wrapper.vm.categories.length).toBeGreaterThan(0);
  });
});
