<!-- <template>
  <div class="container mt-4">
    <h1 class="text-center">Proyectos</h1>
    <h2 class="text-center mb-4">Jardinería</h2>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <Swiper :options="swiperOptions">
          <SwiperSlide v-for="proyecto in proyectos" :key="proyecto.id" style="max-width: 400px;">
            <router-link :to="{name:'proyects-info'}">
              <ProyectsCard :proyecto="proyecto" />
            </router-link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <h2 class="text-center mb-2">Poda de arboles</h2>

    <div class="swiper-container">
      <div class="swiper-wrapper">

        <Swiper :options="swiperOptions">
          <SwiperSlide v-for="proyecto in proyectos" :key="proyecto.id" style="max-width: 400px;">
            <router-link :to="{name:'proyects-info'}">
              <ProyectsCard :proyecto="proyecto" />
            </router-link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

import {Swiper, SwiperSlide} from 'swiper/vue'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import "swiper/css"

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default {
  data() {
    return {
      proyectos: [
        {
          id: 1,
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
          descripcion: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur fugit, architecto illum harum accusamus velit modi perferendis similique libero',
        },
        {
          id: 2,
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
          descripcion: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur fugit, architecto illum harum accusamus velit modi perferendis similique libero',
        },
        {
          id: 3,
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
          descripcion: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur fugit, architecto illum harum accusamus velit modi perferendis similique libero',
        },
        {
          id: 4,
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
          descripcion: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur fugit, architecto illum harum accusamus velit modi perferendis similique libero',
        },
        {
          id: 5,
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
          descripcion: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur fugit, architecto illum harum accusamus velit modi perferendis similique libero',
        },
      ],
      swiperOptions: {
        slidesPerView: 2, 
        loop: true,
        spaceBetween: 20, // Espacio entre los slides
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          clickable: true,
        },
        autoplay: {
          delay: 5000,
        },
      },
    };
  },
  components: {
    ProyectsCard: defineAsyncComponent(() =>
      import('@/modules/shared/components/ProyectsCard')
    ),
    Swiper,
    SwiperSlide,
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 500px;
}
.swiper-wrapper {
  display: flex;
  transition: transform 0.3s; /* Agrega una transición suave al desplazamiento */
}
.swiper-slide {
  flex: 0 0 auto; /* Ajusta este valor para evitar el desborde horizontal */
  max-width: 400px; /* Establece el ancho máximo de cada elemento del carrusel */
  margin: auto; /* Añade un margen entre los elementos para una apariencia espaciada */
}
a {
  text-decoration: none;
  color: black;
}

/* Ajustes de estilo específicos para Swiper pueden personalizarse aquí si es necesario */
</style> -->

<template>
  <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-container>
    <v-card>
    <v-tabs
      v-model="tab"
      color="green-darken-3"
      align-tabs="center"
    >
      <v-tab :value="1">Landscape</v-tab>
      <v-tab :value="2">City</v-tab>
      <v-tab :value="3">Abstract</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="i in 6"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
  </v-container>
</template>


<script>
  export default {
    data: () => ({
      items: [
        {
          title: 'Home',
          disabled: false,
          href: '/home/homeuser',
        },
        {
          title: 'Projects',
          disabled: false,
          href: '/proyects/destacados',
        },
      ],
      tab: null,
    }),
  }
</script>