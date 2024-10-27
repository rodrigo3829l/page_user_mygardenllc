<template>
  <v-container fluid style="background-color: #f0f0f0">
    <v-container>
      <!-- Primera fila -->
      <v-row class="py-4">
        <!-- Columna para el título -->
        <v-col cols="12" sm="6" md="6" class="text-left">
          <h2>Featured Projects</h2>
        </v-col>

        <!-- Columna para el selector de servicios -->
        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="selectedService"
            :items="services"
            item-title="tipo"
            item-value="_id"
            variant="underlined"
            label="All Services"
            clearable
          >
            <template #prepend-item>
              <v-list-item @click="selectedService = 'all'" value="all">
                <v-list-item-title>All</v-list-item-title>
              </v-list-item>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <v-container>
    <!-- Segunda fila con todos los cards -->
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="(project, index) in paginatedProjects"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <ProjectCard :project="project"> </ProjectCard>
          </v-col>
        </v-row>

        <!-- Paginación -->
        <v-pagination
          v-if="totalPages > 1"
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { api } from "@/axios/axios.js";
import { defineAsyncComponent } from "vue";
export default {
  components: {
    ProjectCard: defineAsyncComponent(
      () => import("@/modules/passProjects/components/projectPass.vue"),
    ),
  },
  data() {
    return {
      services: [],
      projects: [],
      selectedService: "all",
      currentPage: 1,
      projectsPerPage: 6, // Máximo de proyectos por página
    };
  },
  computed: {
    filteredProjects() {
      if (this.selectedService === "all") {
        return this.projects;
      }
      return this.projects.filter(
        (project) =>
          project.service.tipoDeServicio._id === this.selectedService,
      );
    },
    totalPages() {
      return Math.ceil(this.filteredProjects.length / this.projectsPerPage);
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.projectsPerPage;
      const end = start + this.projectsPerPage;
      return this.filteredProjects.slice(start, end);
    },
  },
  methods: {
    async fetchServices() {
      try {
        const response = await api.get("/typeservice/get");
        this.services = response.data.tipesServices;
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    async fetchProjects() {
      try {
        const response = await api.get("/feature/get");
        this.projects = response.data.projects;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
  },
  mounted() {
    this.fetchServices();
    this.fetchProjects();
  },
};
</script>
