<template>
<v-container fluid style="background-color: #f0f0f0;">
  <v-container >
     <!-- Primera fila -->
     <v-row class="py-4">
      <!-- Columna para el título -->
      <v-col cols="12" sm="6" md="2" class="text-left">
        <h2>Our Services</h2>
      </v-col>

      <!-- Columna para el campo de búsqueda -->
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          variant="underlined"
          placeholder="Search service"
          clearable
        ></v-text-field>
      </v-col>

      <!-- Columna para el selector de estados -->
      <v-col cols="12" sm="6" md="2">
        <v-select
          v-model="selectedStatus"
          :items="statuses"
          item-title="text"
          item-value="value"
          variant="underlined"
          label="Filter by status"
          clearable
        ></v-select>
      </v-col>

      <!-- Columna para el ordenamiento -->
      <v-col cols="12" sm="6" md="2">
        <v-select
          v-model="selectedOrder"
          :items="orderingOptions"
          label="Sort by"
          item-title="text"
          variant="underlined"
          item-value="value"
          clearable
        ></v-select>
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
            v-for="(service, index) in paginatedServices"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <ServicesCard :service="service" />
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
import { defineAsyncComponent } from 'vue';
import { api } from '@/axios/axios.js';
import { useUserStore } from '@/store/store';

export default {
  name: 'ServicesPage',
  components: {
    ServicesCard: defineAsyncComponent(() => import('../components/CardServiceUser.vue')),
  },
  data() {
    return {
      search: '',
      services: [],
      selectedStatus: '',
      // statuses: ['all', 'development', 'quoted', 'canceled', 'finish', 'quoting'],
      statuses: [
        {text : 'all', value : 'all'},
        {text : 'development', value : 'development'},
        {text : 'quoted', value : 'quoted'},
        {text : 'canceled', value : 'canceled'},
        {text : 'finish', value : 'finish'},
        {text : 'quoting', value : 'quoting'},
      ],
      selectedOrder: '',
      orderingOptions: [
        { text: 'Latest Dates', value: 'latest_dates' },
        { text: 'Oldest Dates', value: 'oldest_dates' },
        { text: 'A to Z', value: 'a_to_z' },
        { text: 'Z to A', value: 'z_to_a' },
      ],
      currentPage: 1,
      servicesPerPage: 6, // Máximo de servicios por página
    };
  },
  computed: {
    filteredServices() {
      let filtered = this.services;

      if (this.selectedStatus && this.selectedStatus !== 'all') {
        filtered = filtered.filter(service => service.status === this.selectedStatus);
      }

      if (this.search.trim()) {
        filtered = filtered.filter(service =>
          service.description.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      return filtered;
    },
    orderedServices() {
      let ordered = this.filteredServices;

      if (this.selectedOrder === 'latest_dates') {
        ordered = ordered.sort((a, b) => new Date(b.dates.reserved) - new Date(a.dates.reserved));
      } else if (this.selectedOrder === 'oldest_dates') {
        ordered = ordered.sort((a, b) => new Date(a.dates.reserved) - new Date(b.dates.reserved));
      } else if (this.selectedOrder === 'a_to_z') {
        ordered = ordered.sort((a, b) => a.description.localeCompare(b.description));
      } else if (this.selectedOrder === 'z_to_a') {
        ordered = ordered.sort((a, b) => b.description.localeCompare(a.description));
      }

      return ordered;
    },
    totalPages() {
      return Math.ceil(this.orderedServices.length / this.servicesPerPage);
    },
    paginatedServices() {
      const start = (this.currentPage - 1) * this.servicesPerPage;
      const end = start + this.servicesPerPage;
      return this.orderedServices.slice(start, end);
    },
  },
  methods: {
    async fetchServices() {
      const userStore = useUserStore();
      const { data } = await api({
        method: 'GET',
        url: '/schedule/userservices',
        headers: {
          Authorization: 'Bearer ' + userStore.token,
          rol: 'client',
        },
      });
      this.services = data.services;
    },
    filterByCategory() {
      this.currentPage = 1;
    },
  },
  created() {
    this.fetchServices();
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
</style>
