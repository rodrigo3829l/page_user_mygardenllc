<template>
    <v-container fluid>
      <!-- Navbar Predeterminado -->
  
      <!-- Header -->
      <v-container class="text-center my-5">
        <h1>Welcome to Service Recommendations</h1>
        <p>Find the best service providers for your needs. Filter by service type, price, rating, and location.</p>
      </v-container>
  
      <!-- Categorías -->
      <v-container>
        <v-row justify="center">
          <v-btn v-for="(category, i) in categories" :key="i" @click="filterByCategory(category)" class="mx-2">
            {{ category.tipo }}
          </v-btn>
          <v-btn @click="filterByCategory({ _id: 'all', tipo: 'all' })" class="mx-2">All</v-btn>
        </v-row>
      </v-container>
  
      <!-- Buscador -->
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search services..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Servicios -->
      <v-container>
        <v-row>
          <v-col v-for="(service, i) in paginatedServices" :key="i" cols="12" sm="6" md="4">
            <ProyectsCard :service="service" />
          </v-col>
        </v-row>
        <v-row v-if="paginatedServices.length === 0">
          <v-col>
            <v-alert type="info" class="text-center">No recommendations for this type of service</v-alert>
          </v-col>
        </v-row>
        <!-- Paginación -->
        <v-row>
          <v-col class="text-center">
            <v-pagination v-if="totalPages > 1" v-model="currentPage" :length="totalPages" :total-visible="7"></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </template>
  
  <script>
  import { defineAsyncComponent } from 'vue';
  import { api } from '@/axios/axios.js';
  import { toast } from 'vue3-toastify';
  import axios from 'axios';  
  export default {
    name: 'ServicesPage',
    components: {
      ProyectsCard: defineAsyncComponent(() => import('@/modules/shared/components/ProyectsCard.vue')),
      
    },
    data() {
      return {
        search: '',
        categories: [],
        services: [],
        recommendedServices: [],
        currentCategory: 'all',
        currentPage: 1,
        servicesPerPage: 3, // Cantidad de servicios por página
        user: {}
      };
    },
    computed: {
      filteredServices() {
        let filtered = this.recommendedServices;
  
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
          const token = localStorage.getItem('token');
          const { data } = await api({
            method: 'GET',
            url: '/user/getId',
            headers: {
              Authorization: 'Bearer ' + token,
              rol: 'client',
            },
          });
  
          this.user = data.user;
  
          const response = await axios.post('http://127.0.0.1:5000/predict/services', {
            user: data.user._id
          });
  
          const serviceIds = response.data.recommendations;
  
          if (serviceIds.length === 0) {
            toast.error('Lo siento, no hay suficientes datos para poder recomendarte servicios');
            return;
          }
  
          const { data: servicesData } = await api({
            method: 'GET',
            url: '/services/get',
            headers: {
              Authorization: 'Bearer ' + token,
              rol: 'client',
            },
          });
  
          this.services = servicesData.services;
          this.recommendedServices = this.services.filter(service =>
            serviceIds.includes(service._id)
          );
        } catch (error) {
          toast.error('Error al obtener los servicios');
        }
      },
      async fetchCategories() {
        try {
          const token = localStorage.getItem('token');
          const { data } = await api({
            method: 'GET',
            url: '/typeservice/get',
            headers: {
              Authorization: 'Bearer ' + token,
              rol: 'client',
            },
          });
          this.categories = [...data.tipesServices.filter(item => item.isUsable)];
        } catch (error) {
          toast.error('Error al obtener las categorías');
        }
      },
      filterByCategory(category) {
        this.currentCategory = category.tipo === 'all' ? 'all' : category.tipo;
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
  .v-container {
    margin-top: 20px;
  }
  
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
  