<template>
  <v-container fluid style="background-color: #f0f0f0; min-height: 10px">
    <v-container style="min-height: 10px">
      <!-- Primera Fila: Título, Selector de Categoría y Buscador -->
      <v-row class="my-5">
        <v-col cols="12" md="6" class="text-center">
          <h2>Your Personalized Service Recommendations</h2>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            :items="['All', ...categories.map((c) => c.tipo)]"
            v-model="currentCategory"
            label="Filter by Service Type"
            @change="filterByCategory"
            class="mx-2"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search services..."
            single-line
            hide-details
            class="mx-2"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
  <v-container>
    <!-- Segunda Fila: Mensaje Personalizado -->
    <v-row class="my-5 justify-center">
      <v-col cols="12" md="6">
        <v-alert color="grey-lighten-3" class="text-center" dense>
          These are the services based on your preferences.
        </v-alert>
      </v-col>
    </v-row>

    <!-- Tercera Fila: Servicios -->
    <v-row>
      <v-col
        v-for="(service, i) in paginatedServices"
        :key="i"
        cols="12"
        sm="6"
        md="4"
      >
        <ProyectsCard :service="service" />
      </v-col>
      <v-col v-if="paginatedServices.length === 0">
        <v-alert type="info" color="green-darken-3" class="text-center"
          >No recommendations for this type of service</v-alert
        >
      </v-col>
    </v-row>

    <!-- Cuarta Fila: Paginación -->
    <v-row>
      <v-col class="text-center">
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
import { defineAsyncComponent } from "vue";
import { api } from "@/axios/axios.js";
import { toast } from "vue3-toastify";
import axios from "axios";

export default {
  name: "ServicesPage",
  components: {
    ProyectsCard: defineAsyncComponent(
      () => import("@/modules/shared/components/ProyectsCard.vue"),
    ),
  },
  data() {
    return {
      search: "",
      categories: [],
      services: [],
      recommendedServices: [],
      currentCategory: "All",
      currentPage: 1,
      servicesPerPage: 3,
      user: {},
    };
  },
  computed: {
    filteredServices() {
      let filtered = this.recommendedServices;

      if (this.currentCategory !== "All") {
        filtered = filtered.filter(
          (service) => service.tipoDeServicio.tipo === this.currentCategory,
        );
      }

      if (this.search.trim()) {
        filtered = filtered.filter((service) =>
          service.name.toLowerCase().includes(this.search.toLowerCase()),
        );
      }

      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredServices.length / this.servicesPerPage);
    },
    paginatedServices() {
      const start = (this.currentPage - 1) * this.servicesPerPage;
      const end = start + this.servicesPerPage;
      return this.filteredServices.slice(start, end);
    },
  },
  methods: {
    async fetchServices() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "https://sentiments-and-recomendatios.onrender.com/predict/services",
          {
            user: token,
          },
        );

        const serviceIds = response.data.recommendations;

        if (serviceIds.length === 0) {
          toast.error(
            "Sorry, there is not enough data to recommend services for you",
          );
          return;
        }

        const { data: servicesData } = await api({
          method: "GET",
          url: "/services/get",
          headers: {
            Authorization: "Bearer " + token,
            rol: "client",
          },
        });

        this.services = servicesData.services;
        this.recommendedServices = this.services.filter((service) =>
          serviceIds.includes(service._id),
        );
      } catch (error) {
        toast.error("Error fetching services");
      }
    },
    async fetchCategories() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api({
          method: "GET",
          url: "/typeservice/get",
          headers: {
            Authorization: "Bearer " + token,
            rol: "client",
          },
        });
        this.categories = [
          ...data.tipesServices.filter((item) => item.isUsable),
        ];
      } catch (error) {
        toast.error("Error fetching categories");
      }
    },
    filterByCategory(category) {
      this.currentCategory = category;
      this.currentPage = 1; // Reinicia la página al cambiar de categoría
    },
  },
  created() {
    this.fetchServices();
    this.fetchCategories();
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.my-5 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
