<template>
<v-container fluid class="grey lighten-3">
    <v-container>
        <v-row justify="center">
            <v-col cols="12" class="text-center">
                <h2>What Our Clients Say</h2>
                <p>Discover the opinions of those who have trusted us.</p>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <div v-if="!loaded">
                    <Swiper :modules="modules" :breakpoints="breakpoints" :space-between="20" :loop="true" :navigation="navigationOptions" :pagination="paginationOptions">
                            <SwiperSlide  v-for=" i in 6" :key="i">
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
    </v-container>
</v-container>
</template>

<script>
    import {
        api
    } from '@/axios/axios.js';
    import {
        Swiper,
        SwiperSlide
    } from 'swiper/vue';
    import {
        defineAsyncComponent
    } from 'vue';
    import {
        Navigation,
        Pagination
    } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    export default {
        components: {
            Swiper,
            SwiperSlide,
            ComentsUserCard: defineAsyncComponent(() => import( /* webpackChunkName: "Navbar" */ '@/modules/shared/components/ComentsUserCard.vue')),
            ComentsUserSkeleton: defineAsyncComponent(() => import( /* webpackChunkName: "Navbar" */ '@/modules/shared/components/CommentsUserSkeleton.vue')),
        },
        data() {
            return {
                comentarios: [

                ],
                loaded : false,
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
            };
        },
        methods: {
            async getComments() {
                try {
                    const {
                        data
                    } = await api.get('/comment/rating')
                    this.comentarios = data.comments
                } catch (error) {
                    console.log(error)
                } finally {
                    this.loaded = (this.comentarios.length !== 0)
                }
            },
        },
        mounted () {
            this.getComments()
        }
    };
</script>

<style scoped>
    .grey {
        background-color: #f1f1f1;

    }


    .swiper-button-prev,
    .swiper-button-next {
        color: #2E7D32;
    }
    
    .swiper-pagination {
        color: #2E7D32;
    }
</style>
