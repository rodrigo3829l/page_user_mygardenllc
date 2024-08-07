<template>
  <v-container fluid style="background-color: #f0f0f0;">
    <!-- Buscador y Título -->
    <v-container>
      <v-row class="py-4">
        <v-col cols="12" md="6" class="text-left">
          <v-icon>mdi-leaf</v-icon>
          <h2>Gardening Services from My Garden LLC</h2>
        </v-col>

        <v-col cols="12" md="6" class="text-right">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            placeholder="Search service"
            variant="underlined"
            clearable
            @click:clear="handleClear"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
    <!-- Sección de Categorías y Servicios -->
    <v-container>
      <v-row class="py-4">
        <!-- Categorías -->
        <v-col cols="12" sm="4" md="3">
          <v-list dense>
            <v-list-item-title>Categories</v-list-item-title>
            <v-list-item
              @click="filterByCategory({ _id: 'all', tipo: 'all' })"
              class="clickable"
            >
              All
            </v-list-item>

            <v-list-item
              v-for="(category, i) in categories"
              :key="i"
              @click="filterByCategory(category)"
              class="clickable"
            >
              {{ category.tipo }}
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Cards de Servicios -->
        <v-col cols="12" sm="8" md="9">
          <v-row>
            <template v-if="loading">
              <v-col cols="12" sm="6" md="6" v-for="n in 2" :key="n">
                <SkeletonServices />
              </v-col>
            </template>
            <template v-else-if="paginatedServices.length === 0">
              <v-col cols="12" class="text-center">
                <v-alert color="green-darken-3" type="info" dismissible>
                  No service found
                </v-alert>
              </v-col>
            </template>
            <template v-else>
              <v-col
                v-for="(service, i) in paginatedServices"
                :key="i"
                cols="12"
                sm="6"
                md="6"
              >
                <ProyectsCard :service="service" />
              </v-col>
            </template>
          </v-row>

          <!-- Componente de Paginación -->
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
import { defineAsyncComponent } from 'vue';
import { api } from '@/axios/axios.js';

export default {
  name: 'ServicesPage',
  components: {
    ProyectsCard: defineAsyncComponent(() => import('@/modules/shared/components/ProyectsCard.vue')),
    SkeletonServices: defineAsyncComponent(() => import('@/modules/services/components/SkeletonServices.vue'))
  },
  data() {
    return {
      search: '',
      categories: [],
      services: [],
      currentCategory: 'all',
      currentPage: 1,
      servicesPerPage: 2, // Cantidad de servicios por página
      loading: false // Estado de carga
    };
  },
  computed: {
    filteredServices() {
      let filtered = this.services;

      if (this.currentCategory !== 'all') {
        filtered = filtered.filter(service => service.tipoDeServicio.tipo === this.currentCategory);
      }

      if (this.search.trim()) {
        filtered = filtered.filter(service =>
          service.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      return filtered;
    },
    totalPages() {
      // Calcula el número total de páginas
      return Math.ceil(this.filteredServices.length / this.servicesPerPage);
    },
    paginatedServices() {
      // Calcula el conjunto de servicios que deben mostrarse en la página actual
      const start = (this.currentPage - 1) * this.servicesPerPage;
      const end = start + this.servicesPerPage;
      return this.filteredServices.slice(start, end);
    },
  },
  methods: {
    async fetchServices() {
      this.loading = true; // Comienza a cargar
      const { data } = await api.get('/services/get');
      this.services = data.services;
      this.loading = false; // Finaliza la carga
    },
    async fetchCategories() {
      const { data } = await api.get('/typeservice/get');
      this.categories = [...data.tipesServices.filter(item => item.isUsable)];
    },
    filterByCategory(category) {
      this.currentCategory = category.tipo === 'all' ? 'all' : category.tipo;
      this.currentPage = 1; // Reinicia la página al cambiar de categoría
      this.fetchServices(); // Vuelve a cargar los servicios al cambiar de categoría
    },
    handleSearch() {
      this.currentPage = 1; // Reinicia la página al buscar
      this.fetchServices(); // Vuelve a cargar los servicios al buscar
    },
    handleClear() {
      this.currentCategory = 'all'; // Restablece la categoría a "all"
      this.fetchServices(); // Vuelve a cargar los servicios
    }
  },
  watch: {
    search() {
      this.handleSearch();
    }
  },
  created() {
    this.fetchServices();
    this.fetchCategories();
  },
};
</script>

<style scoped>
.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.clickable {
  cursor: pointer;
}

.py-4 {
  padding-top: 16px;
  padding-bottom: 16px;
}

.v-list-item {
  padding: 8px;
}

.text-center {
  text-align: center;
}
</style>
