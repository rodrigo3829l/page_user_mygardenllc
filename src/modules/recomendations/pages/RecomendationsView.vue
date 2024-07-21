<template>
<v-container fluid style="background-color: #f0f0f0;">
    <!-- Buscador y Título -->
    <v-container>
        <v-row class="py-4">
            <v-icon>mdi-leaf</v-icon>
            <h2>Hola {{ user.name }} te recomendamos estos servicios en base a tu historial</h2>
        </v-row>
    </v-container>
    <!-- Sección de Categorías y Servicios -->
    <v-container>
        <v-row class="py-4">
            <!-- Categorías -->
            <v-col cols="12" sm="4" md="3">
                <v-list dense>
                    <v-list-item-title>Categories</v-list-item-title>
                    <v-list-item @click="filterByCategory({ _id: 'all', tipo: 'all' })" class="clickable">
                        All
                    </v-list-item>
                    <v-list-item v-for="(category, i) in categories" :key="i" @click="filterByCategory(category)" class="clickable">
                        {{ category.tipo }}
                    </v-list-item>
                </v-list>
            </v-col>
            <!-- Cards de Servicios -->
            <v-col cols="12" sm="8" md="9">
                <v-row>
                    <v-col v-for="(service, i) in paginatedServices" :key="i" cols="12" sm="6" md="6">
                        <ProyectsCard :service="service" />
                    </v-col>
                </v-row>
                <!-- Componente de Paginación -->
                <v-pagination v-if="totalPages > 1" v-model="currentPage" :length="totalPages" :total-visible="7"></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</v-container>
</template>

<script>
import {
    defineAsyncComponent
} from 'vue';
import {
    api
} from '@/axios/axios.js';
import {
    toast
} from 'vue3-toastify';
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
            servicesPerPage: 2, // Cantidad de servicios por página
            user : {}
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
            try {
                const token = localStorage.getItem('token')
                const {
                    data
                } = await api({
                    method: 'GET',
                    url: '/user/getId',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        rol: 'client',
                    },
                });

                this.user = data.user

                const response = await axios.post('http://127.0.0.1:5000/predict/services', {
                    user: data.user._id
                });
                console.log(`id del usuario ${data.idUser}`)
                
                const serviceIds = response.data.recommendations;
                console.log(response.data)
                console.log(``)

                if (serviceIds.length === 0) {
                    toast.error('Lo siento, no hay suficientes datos para poder recomendarte servicios');
                    return;
                }

                const {
                    data: servicesData
                } = await api({
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
                const token = localStorage.getItem('token')
                const {
                    data
                } = await api({
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
