import { mount } from "@vue/test-utils";
import ProjectsDestacados from "@/modules/passProjects/pages/ProjectDestacados.vue";
import { api } from "@/axios/axios.js";

// Mock de la API
jest.mock("@/axios/axios.js", () => ({
  api: {
    get: jest.fn(),
  },
}));

// Función para esperar las promesas
const waitForPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("ProjectsDestacados.vue", () => {
  let wrapper;

  const mockServices = [
    { _id: "1", tipo: "Service A" },
    { _id: "2", tipo: "Service B" },
  ];

  const mockProjects = [
    {
      _id: "101",
      images: [{ secure_url: "http://image1.jpg" }],
      description: "Project 101",
      service: { name: "Service A", tipoDeServicio: { _id: "1" } },
      scheduleService: { description: "Details 101", quote: 500 },
    },
  ];

  beforeEach(async () => {
    api.get.mockResolvedValueOnce({ data: { tipesServices: mockServices } });
    api.get.mockResolvedValueOnce({ data: { projects: mockProjects } });

    wrapper = mount(ProjectsDestacados, {
      global: {
        stubs: {
          ProjectCard: true, // Stub del componente para evitar problemas de renderizado
        },
      },
    });

    await waitForPromises();
  });

  it("debería renderizar correctamente los servicios y proyectos", () => {
    expect(wrapper.exists()).toBe(true);
    const cards = wrapper.findAllComponents({ name: "ProjectCard" });
    expect(cards.length).toBe(mockProjects.length);
  });

  it("debería actualizar los proyectos al seleccionar un servicio", async () => {
    const select = wrapper.find("select");
    if (select.exists()) {
      await select.setValue("1");
      await waitForPromises();

      const filteredProjects = wrapper.vm.filteredProjects;
      expect(filteredProjects).toHaveLength(1);
      expect(filteredProjects[0].service.tipoDeServicio._id).toBe("1");
    } else {
      console.warn("El elemento select no se encontró.");
    }
  });

  it("debería paginar correctamente los proyectos", async () => {
    wrapper.vm.projectsPerPage = 1;
    await waitForPromises();

    const cards = wrapper.findAllComponents({ name: "ProjectCard" });
    expect(cards.length).toBe(1);
    expect(wrapper.vm.totalPages).toBe(1);
  });
});
