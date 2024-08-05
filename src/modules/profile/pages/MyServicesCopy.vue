<template>
<v-container fluid style="background-color: #f0f0f0;">
    <v-container>
        <!-- Primera fila -->
        <v-row class="py-4">
            <!-- Columna para el título -->
            <v-col cols="12" sm="6" md="2" class="text-left">
                <h2>Our Services</h2>
            </v-col>

            <!-- Columna para el campo de búsqueda -->
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="search" prepend-icon="mdi-magnify" variant="underlined" placeholder="Search service" clearable></v-text-field>
            </v-col>

            <!-- Columna para el selector de estados -->
            <v-col cols="12" sm="6" md="2">
                <v-select v-model="selectedStatus" :items="statuses" item-title="text" item-value="value" variant="underlined" label="Filter by status" clearable></v-select>
            </v-col>

            <!-- Columna para el ordenamiento -->
            <v-col cols="12" sm="6" md="2">
                <v-select v-model="selectedOrder" :items="orderingOptions" label="Sort by" item-title="text" variant="underlined" item-value="value" clearable></v-select>
            </v-col>
        </v-row>
    </v-container>
</v-container>
<v-container>
    <!-- Segunda fila con todos los cards -->
    <v-row>
        <v-col cols="12">
            <v-row>
                <template v-if="overlay">
                    <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
                        <SkeletonServices/>
                    </v-col>
                </template>
                <template v-else>
                    <template v-if="paginatedServices.length">
                        <v-col v-for="(service, index) in paginatedServices" :key="index" cols="12" sm="6" md="4">
                            <ServicesCard @updateData="updateData" @payService="payService" :service="service" />
                        </v-col>
                    </template>
                    <template v-else>
                        <v-col cols="12" class="text-center">
                            <v-alert color="green-darken-3" type="info" dismissible>
                                🌻 No services found. Try adjusting your search or filter criteria. 🌿
                            </v-alert>
                        </v-col>
                    </template>
                </template>
            </v-row>

            <!-- Paginación -->
            <v-pagination v-if="totalPages > 1" v-model="currentPage" :length="totalPages" :total-visible="7"></v-pagination>
        </v-col>
    </v-row>
</v-container>

<v-dialog v-model="rescheduleDialog" width="auto" persistent>
    <CalendarCard :date="idService.date" @updateData="updateData"></CalendarCard>
</v-dialog>
<v-dialog v-model="cancelDialog" width="auto" persistent>
    <v-card>
        <v-card-title>{{ $t('profile.pages.myServices.cancellationString') }}</v-card-title>
        <v-card-text>{{ $t('profile.pages.myServices.serviceString') }}</v-card-text>
        <v-card-actions class="justify-end">
            <v-btn color="primary" @click="closeCancel">No</v-btn>
            <v-btn color="error" @click="confirmCancel">{{ $t('profile.pages.myServices.yesString') }}</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
<!-- <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
</v-overlay> -->

<v-dialog v-model="paymentDialog" width="auto" persistent>
    <PaymentCard :monto="selectedService.quote" :pendingAmount="selectedService.pending" :serviceId="selectedService._id" @close="closePaymentDialog" @payment-success="handlePaymentSuccess"></PaymentCard>
</v-dialog>
</template>

  
<script>
import {
    toast
} from 'vue3-toastify';
import {
    useUserStore
} from '@/store/store';
import {
    defineAsyncComponent
} from 'vue';
import {
    api
} from '@/axios/axios.js';

const userStore = useUserStore();

export default {
    name: 'ServicesPage',
    components: {
        ServicesCard: defineAsyncComponent(() => import('../components/CardServiceUser.vue')),
        SkeletonServices: defineAsyncComponent(() => import('../components/SkeletonServices.vue')),
        CalendarCard: defineAsyncComponent(() => import('../components/CalendarCard.vue')),
        PaymentCard: defineAsyncComponent(() => import('@/modules/profile/components/PayComponent.vue')),
    },
    data() {
        return {
            userStore,
            search: '',
            services: [],
            cancelDialog: false,
            idService: '',
            overlay: false,
            loaded: false,
            paymentDialog: false,
            selectedService: {},
            rescheduleDialog: false,
            selectedStatus: '',
            statuses: [{
                    text: 'all',
                    value: 'all'
                },
                {
                    text: 'development',
                    value: 'development'
                },
                {
                    text: 'quoted',
                    value: 'quoted'
                },
                {
                    text: 'canceled',
                    value: 'canceled'
                },
                {
                    text: 'finish',
                    value: 'finish'
                },
                {
                    text: 'quoting',
                    value: 'quoting'
                },
            ],
            selectedOrder: '',
            orderingOptions: [{
                    text: 'Latest Dates',
                    value: 'latest_dates'
                },
                {
                    text: 'Oldest Dates',
                    value: 'oldest_dates'
                },
                {
                    text: 'A to Z',
                    value: 'a_to_z'
                },
                {
                    text: 'Z to A',
                    value: 'z_to_a'
                },
            ],
            currentPage: 1,
            servicesPerPage: 6,
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
        payService(service) {
            this.selectedService = service;
            this.paymentDialog = true;
        },
        closePaymentDialog() {
            this.paymentDialog = false;
        },
        handlePaymentSuccess() {
            this.fetchServices();
            this.closePaymentDialog();
        },
        updateData(id, action) {
            if (action === 'cancel') {
                this.cancelDialog = true;
                this.idService = id;
            } else if (action === 'reschedule') {
                this.rescheduleDialog = !this.rescheduleDialog;
                this.idService = id;
            } else {
                this.reschedule(id);
            }
        },
        async fetchServices() {
            this.overlay = true;
            const {
                data
            } = await api({
                method: 'GET',
                url: '/schedule/userservices',
                headers: {
                    Authorization: 'Bearer ' + userStore.token,
                    rol: 'client',
                },
            });
            this.services = data.services;
            this.overlay = false;
        },
        filterByCategory() {
            this.currentPage = 1;
        },
        async confirmCancel() {
            try {
                this.cancelDialog = false;
                this.overlay = true;
                const {
                    data
                } = await api.put(`/schedule/cancel/${this.idService}`);
                if (!data.success) {
                    toast.warning(data.msg);
                } else {
                    this.fetchServices();
                    toast.success(data.msg);
                }
                this.idService = '';
                this.overlay = false;
            } catch (error) {
                this.overlay = false;
                toast.error(this.$t('profile.pages.myServices.cancelServiceString'));
                console.log(error);
            }
        },
        async reschedule(date) {
            try {
                this.rescheduleDialog = false;
                this.overlay = true;
                const datos = {
                    newDate: date,
                };
                const {
                    data
                } = await api.put(`/schedule/rescheduleservice/${this.idService.id}`, datos);
                console.log(data);
                if (!data.success) {
                    toast.warning(data.msg);
                } else {
                    this.fetchServices();
                    toast.success(data.msg);
                }
                this.idService = '';
                this.overlay = false;
            } catch (error) {
                this.overlay = false;
                console.log(error);
            }
        },
        closeCancel() {
            this.cancelDialog = false;
            this.idService = '';
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
