<template>
<v-container>
    <!-- Primera fila -->
    <v-row dense>
        <!-- Columna para la imagen del servicio -->
        <v-col cols="12" md="6" class="d-flex ">
            <v-img :src="service.img.secure_url" alt="Service Image" height="350" contain></v-img>
        </v-col>

        <!-- Columna para la información del servicio -->
        <v-col cols="12" md="6">
            <!-- Título del servicio -->
            <v-row dense>
                <v-col>
                    <h1>{{ service.name }}</h1>
                </v-col>
            </v-row>

            <!-- Calificación del servicio -->
            <v-row dense>
                <v-col>
                    <v-rating :model-value="service.Calificacion.total" color="amber" density="compact" half-increments readonly></v-rating>
                    {{ service.Calificacion.total }} ({{ service.Calificacion.totales }} reviews)
                </v-col>
            </v-row>

            <!-- Descripción del servicio -->
            <v-row dense>
                <v-col>
                    <p>{{ service.description }}</p>
                </v-col>
            </v-row>

            <!-- Formulario para agendar dentro de un v-card -->
            <v-row dense>
                <v-col>
                    <v-card>
                        <v-card-title>
                            Schedule Cleaning
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="scheduleForm">
                                <v-text-field v-model="scheduleDescription" label="Description" clearable></v-text-field>

                                <v-file-input v-model="scheduleImage" label="Select Image" clearable></v-file-input>

                                <v-text-field v-model="scheduleDate" label="Select Date" :active="calendar" :focus="calendar" id="calendar"></v-text-field>
                                <v-menu v-model="calendar" :close-on-content-click="calendar" activator="#calendar" transition="scale-transition">
                                    <v-list-item>
                                        <v-date-picker v-if="calendar" v-model="scheduleDate" :allowed-dates="allowedDates" :min="minDate" width="400" color="green-darken-3">
                                        </v-date-picker>
                                    </v-list-item>
                                    <!-- <v-list-item>
                                        <v-btn @click="showCalendar"  color="red">Close</v-btn>
                                    </v-list-item> -->
                                </v-menu>
                                <v-btn color="green-darken-3" @click="quote" block>
                                    Schedule
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>

    <v-row>
        <h1>Customer Reviews</h1>
        <v-col cols="12">
            <div v-if="!loaded">
                <Swiper :modules="modules" :breakpoints="breakpoints" :space-between="20" :loop="true" :navigation="navigationOptions" :pagination="paginationOptions">
                    <SwiperSlide v-for=" i in 6" :key="i">
                        <ComentsUserSkeleton></ComentsUserSkeleton>
                    </SwiperSlide>
                    <template v-slot:container-end>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-pagination"></div>
                    </template>
                </Swiper>
            </div>
            <div v-else>
                <Swiper :modules="modules" :breakpoints="breakpoints" :space-between="20" :loop="true" :navigation="navigationOptions" :pagination="paginationOptions">
                    <SwiperSlide v-for="(comentario, i) in comentarios" :key="i">
                        <div class="card-content">
                            <ComentsUserCard userAvatar="mdi-account" :userName="comentario.user.name + ' ' + comentario.user.apellidoP + ' ' + comentario.user.apellidoM" :commentText="comentario.comment" :rating="comentario.rating" :service="comentario.service.name" />
                        </div>
                    </SwiperSlide>
                    <template v-slot:container-end>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-pagination"></div>
                    </template>
                </Swiper>
            </div>
        </v-col>
    </v-row>

    <v-dialog v-model="scheduleDialog" max-width="600" persistent>
        <v-sheet elevation="12" max-width="600" rounded="lg" width="100%" class="pa-4 text-center mx-auto">
            <div>
                <v-icon class="mb-5" :color="color" :icon="icon" size="112"></v-icon>

                <h2 class="text-h5 mb-6">{{ tittle }}</h2>

                <p class="mb-4 text-medium-emphasis text-body-2">
                    {{ message }}
                </p>

                <v-divider class="mb-4"></v-divider>

                <div class="text-end">
                    <v-btn class="text-none" color="success" rounded variant="flat" width="90" @click="closeScheduleDialog">
                        {{ $t('service.pages.scheduleService.closeString') }}
                    </v-btn>
                </div>
            </div>
        </v-sheet>
    </v-dialog>

</v-container>
yarn
</template>

<script>
import { useUserStore } from '@/store/store';

const userStore = useUserStore();
import {
    api
} from '@/axios/axios.js';
import {
    defineAsyncComponent
} from 'vue';
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';
import {
    Navigation,
    Pagination
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
export default {
    components: {
        Swiper,
        SwiperSlide,
        ComentsUserCard: defineAsyncComponent(() => import( /* webpackChunkName: "Navbar" */ '@/modules/shared/components/ComentsUserCard.vue')),
        ComentsUserSkeleton: defineAsyncComponent(() => import( /* webpackChunkName: "Navbar" */ '@/modules/shared/components/CommentsUserSkeleton.vue')),
    },
    data() {
        return {
            userStore,
            comentarios: [],
            calendar: false,
            loaded: false,
            minDate: new Date(),
            modules: [Navigation, Pagination],
            navigationOptions: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            paginationOptions: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
            overlay: false,
            scheduleDialog: false,
            icon: '',
            tittle: '',
            message: '',
            color: '',
            service: {
                name: '',
                description: '',
                img: {
                    secure_url: ''
                },
                Calificacion: {
                    total: 0,
                    totales: 0
                }
            },
            scheduleDescription: '',
            scheduleImage: null,
            scheduleDate: null,
        };
    },
    methods: {
        async quote() {
            this.tittle = ''
            this.message = ''
            this.icon = ''
            this.color = ''
            this.closeScheduleDialog()
            this.overlay = true
            const date = new Date(this.scheduleDate).toISOString().split('T')[0];
            const actualDate = new Date().toISOString().split('T')[0];
            console.log(date)
            try {
                if (date === actualDate) {
                    this.tittle = this.$t('service.pages.scheduleService.script.busy')
                    this.message = this.$t('service.pages.scheduleService.script.busyMessage')
                    this.icon = 'mdi-alert-octagon-outline'
                    this.color = 'gred-darken-4'
                    this.openScheduleDialog()
                    return
                }
                const datos = {
                    user: this.userStore.token,
                    service: this.service._id,
                    description: this.scheduleDescription,
                    img: {
                        public_id: "aksdbaskdjas",
                        secure_url: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg"
                    },
                    typeReserve: "online",
                    scheduledTime: date
                }
                const {
                    data
                } = await api.post('/schedule/schedule', datos)
                if (data.success === false) {
                    this.tittle = this.$t('service.pages.scheduleService.script.error')
                    this.message = data.msg
                    this.icon = 'mdi-alert-octagon-outline'
                    this.color = 'red-darken-4'
                    this.openScheduleDialog()
                } else {
                    this.tittle = this.$t('service.pages.scheduleService.script.success')
                    this.message = data.msg
                    this.icon = 'mdi-check-circle'
                    this.color = 'green-darken-3'
                    this.openScheduleDialog()
                    setTimeout(() => {
                        this.$router.push({
                            name: 'profile-myservices'
                        });
                    }, 2000);
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.overlay = false
            }
        },
        openScheduleDialog() {
            this.scheduleDialog = true
        },
        closeScheduleDialog() {
            this.scheduleDialog = false
        },
        showCalendar() {
            this.calendar = !this.calendar
            console.log('vlick')
            if (this.scheduleDate) {
                this.scheduleDate = new Date(this.scheduleDate).toISOString().split('T')[0]
            }
        },
        allowedDates(val) {
            return !this.unavailableDates.includes(this.$vuetify.date.toISO(val))
        },
        async getDates() {
            try {
                const {
                    data
                } = await api.get('/dates/get')
                this.unavailableDates = data.dates.map(item => item.date.split('T')[0])
            } catch (error) {
                console.log(error)
            }
        },
        async fetchService() {
            try {
                this.overlay = true
                const {
                    data
                } = await api.get(`/services/getservice/${this.$route.params.id}`);
                this.service = data.service;
                console.log(this.service)
            } catch (error) {
                console.log(error)
            } finally {
                this.overlay = false
            }
        },
        async fetchComments() {
            try {
                const {
                    data
                } = await api.get(`/comment/get/${this.$route.params.id}`);
                this.comentarios = data.comments
            } catch (error) {
                console.log(error)
            } finally {
                this.loaded = true
            }
        },
        async scheduleService() {
            console.log(this.scheduleDate)
        },
    },
    created() {
        this.getDates()
        this.fetchService()
        this.fetchComments()
    },
};
</script>

<style scoped>
v-card {
    padding: 10px;
}

swiper-button-prev,
.swiper-button-next {
    color: #2E7D32;
}

.swiper-pagination {
    color: #2E7D32;
}
</style>
