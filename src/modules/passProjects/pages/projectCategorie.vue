<template>
  <v-breadcrumbs :items="bread">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <div>
    <v-container>
      <h1>{{ $route.params.category.toLowerCase() }}</h1>
      <v-row>
        <v-col cols="12" md="4" v-for="i in 6" :key="i">
          <v-skeleton-loader
            v-if="!loaded"
            class="mx-auto border"
            max-width="400"
            max-height="400"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" v-for="proyecto in proyectos" :key="proyecto">
          <ProyectsCard
            v-if="proyecto.tipo === $route.params.category.toLowerCase()"
            :proyecto="proyecto"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  data() {
    return {
      bread: [
        {
          title: "Home",
          disabled: false,
          href: "/home/homeuser",
        },
        {
          title: "projects",
          disabled: false,
          href: "/proyects/destacados",
        },
        {
          title: "Information",
          disabled: false,
          href: "/categirue/id",
        },
      ],
      proyectos: [],
      loaded: false,
    };
  },
  async created() {
    await this.simularConsultaAsync();
    this.loaded = true;
  },
  methods: {
    async simularConsultaAsync() {
      // Simulación de una función asincrónica que tarda 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Resultado de la función
      this.proyectos = [
        {
          nombre: "ejemplo1",
          rating: 4,
          tipo: "gardening",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo2",
          rating: 4.3,
          tipo: "gardening",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo3",
          rating: 4.1,
          tipo: "gardening",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        // Otros proyectos de gardening...
        {
          nombre: "ejemplo4",
          rating: 4,
          tipo: "gardening",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo5",
          rating: 4.2,
          tipo: "gardening",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo6",
          rating: 4.5,
          tipo: "gardening",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },

        {
          nombre: "ejemplo1",
          rating: 4,
          tipo: "construccion",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo2",
          rating: 4.3,
          tipo: "construccion",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo3",
          rating: 4.1,
          tipo: "construccion",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        // Otros proyectos de gardening...
        {
          nombre: "ejemplo4",
          rating: 4,
          tipo: "construccion",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo5",
          rating: 4.2,
          tipo: "construccion",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo6",
          rating: 4.5,
          tipo: "construccion",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },

        {
          nombre: "ejemplo1",
          rating: 4,
          tipo: "limpieza",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo2",
          rating: 4.3,
          tipo: "limpieza",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo3",
          rating: 4.1,
          tipo: "limpieza",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        // Otros proyectos de gardening...
        {
          nombre: "ejemplo4",
          rating: 4,
          tipo: "limpieza",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo5",
          rating: 4.2,
          tipo: "limpieza",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo6",
          rating: 4.5,
          tipo: "limpieza",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },

        {
          nombre: "ejemplo1",
          rating: 4,
          tipo: "mantenimiento",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo2",
          rating: 4.3,
          tipo: "mantenimiento",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo3",
          rating: 4.1,
          tipo: "mantenimiento",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        // Otros proyectos de gardening...
        {
          nombre: "ejemplo4",
          rating: 4,
          tipo: "mantenimiento",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo5",
          rating: 4.2,
          tipo: "mantenimiento",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
        {
          nombre: "ejemplo6",
          rating: 4.5,
          tipo: "mantenimiento",
          img: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
          descripcion: "Lorem ipsum dolor sit amet.",
          type: "contruccion",
        },
      ];
    },
  },
  components: {
    ProyectsCard: defineAsyncComponent(
      () => import("@/modules/passProjects/components/projectPass.vue"),
    ),
  },
};
</script>

<style>
/* Estilos opcionales para esta pantalla */
</style>
