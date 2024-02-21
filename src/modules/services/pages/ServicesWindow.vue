<template>
  <!-- Sección de Parallax con Buscador -->
  <v-parallax
    src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg"
    height="380"
  >
    <v-card
      class="mx-auto d-flex align-center justify-center" 
      color="grey-lighten-3"
      max-width="500"
    >
      <v-card-text>
        <v-text-field
          density="compact"
          variant="solo"
          :label="$t('services.searchString')"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-parallax>

  <v-container >

    <!-- Títulos con Iconos -->
    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 my-4">
          <v-icon large left>mdi-flower</v-icon>{{ $t('services.gardeningString') }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>

        <v-row v-if="!loaded">
          <v-col v-for="n in 4" :key="n">
            <v-skeleton-loader 
              class="mx-auto border"
              max-width="300"
              max-height="400"
              type="image, article"
            ></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-slide-group center-active>
          <v-slide-group-item v-for="(proyecto, i) in proyectos" :key="i">
            <div v-if="proyecto.tipo === 'jardineria'" style="max-width: 300px; margin-left: 10px; margin-right: 10px;">
              <ProyectsCard  :proyecto="proyecto" />
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 my-4">
          <v-icon large left>mdi-hammer-screwdriver</v-icon>
          {{ $t('services.ConstructionString') }}
        </h2>
      </v-col>
    </v-row>

    <v-row v-if="!loaded">
      <v-col v-for="n in 4" :key="n">
        <v-skeleton-loader 
          class="mx-auto border"
          max-width="300"
          max-height="400"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>


    <v-row>
      <v-col>
        <v-slide-group center-active>
          <v-slide-group-item v-for="(proyecto, i) in proyectos" :key="i">
            <div v-if="proyecto.tipo === 'construccion'" style="max-width: 400px; margin-left: 10px; margin-right: 10px;">
              <ProyectsCard  :proyecto="proyecto" />
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 my-4">
          <v-icon large left>mdi-broom</v-icon>
          {{ $t('services.CleaningString') }}
        </h2>
      </v-col>
    </v-row>

    <v-row v-if="!loaded">
      <v-col v-for="n in 4" :key="n">
        <v-skeleton-loader 
          class="mx-auto border"
          max-width="300"
          max-height="400"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>


    <v-row>
      <v-col>
        <v-slide-group center-active>
          <v-slide-group-item v-for="(proyecto, i) in proyectos" :key="i">
            <div v-if="proyecto.tipo === 'limpieza'" style="max-width: 400px; margin-left: 10px; margin-right: 10px;">
              <ProyectsCard  :proyecto="proyecto" />
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 my-4">
          <v-icon large left>mdi-wrench</v-icon>
          {{ $t('services.MaintenanceString') }}
        </h2>
      </v-col>
    </v-row>

    <v-row v-if="!loaded">
      <v-col v-for="n in 4" :key="n">
        <v-skeleton-loader 
          class="mx-auto border"
          max-width="300"
          max-height="400"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    
    <v-row>
      <v-col>
        <v-slide-group center-active>
          <v-slide-group-item v-for="(proyecto, i) in proyectos" :key="i">
            <div v-if="proyecto.tipo === 'mantenimiento'" style="max-width: 400px; margin-left: 10px; margin-right: 10px;">
              <ProyectsCard  :proyecto="proyecto" />
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  data() {
    return {
      proyectos: [],
      loaded : false,
      numberLoader : 4
    };
  },
  async created() {
    await this.simularConsultaAsync();
    this.loaded = true
  },
  methods: {
    async simularConsultaAsync() {
      // Simulación de una función asincrónica que tarda 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Resultado de la función
      this.proyectos = [
        { 
          nombre: 'ejemplo1', 
          rating: 4, 
          tipo: 'jardineria', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo2', 
          rating: 4.3, 
          tipo: 'jardineria', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo3', 
          rating: 4.1, 
          tipo: 'jardineria', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        // Otros proyectos de jardineria...
        { 
          nombre: 'ejemplo4', 
          rating: 4, 
          tipo: 'jardineria', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo5', 
          rating: 4.2, 
          tipo: 'jardineria', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo6', 
          rating: 4.5, 
          tipo: 'jardineria', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },




        { 
          nombre: 'ejemplo1', 
          rating: 4, 
          tipo: 'construccion', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo2', 
          rating: 4.3, 
          tipo: 'construccion', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo3', 
          rating: 4.1, 
          tipo: 'construccion', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        // Otros proyectos de jardineria...
        { 
          nombre: 'ejemplo4', 
          rating: 4, 
          tipo: 'construccion', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo5', 
          rating: 4.2, 
          tipo: 'construccion', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo6', 
          rating: 4.5, 
          tipo: 'construccion', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },


        { 
          nombre: 'ejemplo1', 
          rating: 4, 
          tipo: 'limpieza', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo2', 
          rating: 4.3, 
          tipo: 'limpieza', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo3', 
          rating: 4.1, 
          tipo: 'limpieza', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        // Otros proyectos de jardineria...
        { 
          nombre: 'ejemplo4', 
          rating: 4, 
          tipo: 'limpieza', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo5', 
          rating: 4.2, 
          tipo: 'limpieza', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo6', 
          rating: 4.5, 
          tipo: 'limpieza', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },




        { 
          nombre: 'ejemplo1', 
          rating: 4, 
          tipo: 'mantenimiento', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo2', 
          rating: 4.3, 
          tipo: 'mantenimiento', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo3', 
          rating: 4.1, 
          tipo: 'mantenimiento', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        // Otros proyectos de jardineria...
        { 
          nombre: 'ejemplo4', 
          rating: 4, 
          tipo: 'mantenimiento', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.' ,
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo5', 
          rating: 4.2, 
          tipo: 'mantenimiento', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },
        { 
          nombre: 'ejemplo6', 
          rating: 4.5, 
          tipo: 'mantenimiento', 
          img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', 
          descripcion: 'Lorem ipsum dolor sit amet.',
          type : 'contruccion' 
        },
        // Otros proyectos de construccion...
        // Repite para mantenimiento y limpieza...
      ];
    },
    
  },
  components: {
    ProyectsCard: defineAsyncComponent(() => import('@/modules/shared/components/ProyectsCard.vue')),
  },
};
</script>
