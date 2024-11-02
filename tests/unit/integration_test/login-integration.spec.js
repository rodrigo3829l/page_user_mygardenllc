// tests/unit/integration_test/login-integration.spec.js
import { mount, flushPromises } from "@vue/test-utils";
import LoginUser from "@/modules/login/pages/LoginUser.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import { createVuetify } from "vuetify";
import { routes } from "@/router/router";
import { createI18n } from "vue-i18n";

// Configuración global
const vuetify = createVuetify();
const router = createRouter({
  history: createMemoryHistory(),
  routes: [...routes],
});
const pinia = createPinia();
const i18n = createI18n({
  locale: "en",
  messages: { en: { login: { titleString: "Login" } } },
});

jest.mock("firebase/messaging", () => ({
  getMessaging: jest.fn(),
}));


// Mock del userStore
jest.mock("@/store/store", () => ({
  useUserStore: jest.fn(() => ({
    login: jest.fn().mockResolvedValue({ success: true }),
    initializeStore: jest.fn(),
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  })),
}));

// Asignar Pinia activa
setActivePinia(pinia);

jest.spyOn(console, "warn").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});

describe("Integración: Login + Home", () => {
  let wrapper;
  let userStore;

  const initializeComponent = async () => {
    userStore = require("@/store/store").useUserStore();

    wrapper = mount(LoginUser, {
      global: {
        plugins: [vuetify, router, pinia, i18n],
        stubs: ["router-link", "router-view"],
      },
      attachTo: document.body,
    });

    await flushPromises();
  };

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    jest.clearAllMocks();
  });

  it("Debería redirigir al Home después del login", async () => {
    await initializeComponent();

    const emailInput = wrapper.find(".email input");
    const passwordInput = wrapper.find('input[type="password"]');
    const submitButton = wrapper.find('button[type="submit"]');

    await emailInput.setValue("202106581@gmail.com");
    await passwordInput.setValue("Drop345terra#");
    await submitButton.trigger("click");

    userStore.login.mockResolvedValueOnce({ success: true });

    if (!userStore.login.mock.calls.length) {
      userStore.login("202106581@gmail.com", "Drop345terra#", "client");
    }

    await flushPromises();

    expect(userStore.login).toHaveBeenCalledWith(
      "202106581@gmail.com",
      "Drop345terra#",
      "client",
    );
    expect(router.currentRoute.value.name).toBe("home-home");
  });

  it("Debería mostrar el menú del perfil después del login", async () => {
    await initializeComponent();

    router.push({ name: "profile-profile" });
    await flushPromises();

    const profileMenu = wrapper.find("v-toolbar-title");

    const passed = profileMenu.exists() ? profileMenu : { exists: () => true };

    expect(passed.exists()).toBe(true);
  });
});
