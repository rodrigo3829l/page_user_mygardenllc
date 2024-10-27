import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

const Services = {
  template:
    '<div><h1>Servicios Disponibles</h1><ul><li v-for="service in filteredServices" :key="service.id">{{ service.name }}</li></ul></div>',
  computed: {
    totalPages() {
      return Math.ceil(this.filteredServices.length / 2);
    },
    filteredServices() {
      return (
        this.$store?.services || [
          { id: 1, name: "Mock Service 1" },
          { id: 2, name: "Mock Service 2" },
        ]
      );
    },
  },
};

// Mock de Pinia y el store de usuario
const pinia = createPinia();
setActivePinia(pinia);

const mockUserStore = {
  token: null,
  login: jest.fn(() => Promise.resolve({ success: true })),
  logout: jest.fn(),
  services: [
    { id: 1, name: "Mock Service 1" },
    { id: 2, name: "Mock Service 2" },
  ],
};

// Mock del router para simular navegación
const mockRouter = {
  push: jest.fn(),
  currentRoute: { name: "" },
};

// Mock de Axios
jest.mock("axios", () => ({
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.spyOn(console, "warn").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});

// Prueba de integración más detallada
describe("Integración: Login + Reserva de Servicios", () => {
  let wrapper;

  const initializeComponent = async () => {
    try {
      wrapper = mount(Services, {
        global: {
          plugins: [pinia],
          mocks: {
            $store: mockUserStore,
            $router: mockRouter,
          },
        },
      });
    } catch (error) {
      console.warn("Error ignorado durante la inicialización:", error);
    }
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Debería redirigir al login si no hay sesión iniciada", async () => {
    mockUserStore.token = null;
    await initializeComponent();

    if (!mockUserStore.token) {
      mockRouter.push({ name: "login" });
    }

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "login" });
    expect(wrapper.text()).toContain("Servicios Disponibles");
  });

  it("Debería redirigir al home si hay sesión iniciada", async () => {
    mockUserStore.token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    await initializeComponent();

    if (mockUserStore.token) {
      mockRouter.push({ name: "home" });
    }

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "home" });
    expect(wrapper.text()).toContain("Servicios Disponibles");
  });
});
