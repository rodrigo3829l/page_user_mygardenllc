<!-- 
<template>
  <v-carousel cycle height="500" hide-delimiter-background show-arrows="hover"> 
    <v-carousel-item v-for="(image, i) in images" :key="i" :src="image" cover>
        <v-row class="fill-height" align="center" justify="center">
          <v-col class="text-center">
            <div class="display-2 white--text texto">{{ $t('home.tittleString') }}</div>
            <p class="title white--text texto">{{ $t('home.subtitleString') }}</p><br>
            <router-link :to="{name: 'services-services'}">
              <v-btn color="green-darken-3">{{ $t('home.button') }}</v-btn>
            </router-link>
          </v-col>
        </v-row>
    </v-carousel-item>
  </v-carousel>

  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card-title class="display-2 text-center text">{{ $t('home.CompanyString') }}</v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-card-title class="display-1">{{ $t('home.aboutTitleString') }}</v-card-title>
        <v-card-text>
          {{ $t('home.aboutDescriptionString') }}
        </v-card-text>
      </v-col>

      <v-col md="6">
        <v-card color="green-darken-3" class="mb-6">
          <v-row no-gutters>
            <v-col cols="2" class="d-flex justify-center align-center">
              <v-icon class="white--text" size="40">mdi-phone</v-icon>
            </v-col>
            <v-col cols="10" class="my-4">
              <v-card-title class="white--text mb-4">{{ $t('home.telephoneString') }}</v-card-title>
              <v-card-text class="white--text text">+001 (470) 234-1526</v-card-text>
            </v-col>
          </v-row>
        </v-card>

        <v-card color="#666">
          <v-row no-gutters>
            <v-col cols="2" class="d-flex justify-center align-center">
              <v-icon class="white--text" size="40">mdi-email</v-icon>
            </v-col>
            <v-col cols="10" class="my-4">
              <v-card-title class="white--text mb-4">{{ $t('home.emailString') }}</v-card-title>
              <v-card-text class="white--text text">mygarden1526@gmail.com</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col md="6">
        <v-card-title class="display-1 text-center">{{ $t('home.missionTitleString') }}</v-card-title>
      </v-col>
      <v-col md="6">
        <v-card-text>
          {{ $t('home.missionDescriptionString') }}
        </v-card-text>
      </v-col>
    </v-row>
  

    <h2>{{ $t('home.proyectSring') }}</h2>
    <v-row v-if="!loaded">
    <v-col v-for="n in 4" :key="n" cols="12" md="3">
      <v-skeleton-loader 
        class="mx-auto border"
        max-width="300"
        max-height="500"
        type="image, article"
      ></v-skeleton-loader>
    </v-col>
  </v-row>

    <v-row>
      <v-col>
        <v-slide-group center-active>
          <v-slide-group-item v-for="(service, i) in services" :key="i">
            <div style="max-width: 400px; margin-left: 10px; margin-right: 10px;">
              <ProyectsCard  :service="service" />
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>

    <h2>{{ $t('home.commentsString') }}</h2>
      <v-slide-group center-active>
        <v-slide-group-item v-for="(comentario, i) in Comentarios" :key="i">
          <div style="max-width: 440px ; margin-left: 10px; margin-right: 10px;">
            <ComentsUserCard
              userAvatar="mdi-account"
              :userName="comentario.user.name + ' ' + comentario.user.apellidoP + ' ' + comentario.user.apellidoM"
              :commentText="comentario.comment"
              :rating="comentario.rating"
              :service = "comentario.service.name"
            />
          </div>
        </v-slide-group-item>
      </v-slide-group>
  </v-container><br>
</template>

<script>
  import { api } from '@/axios/axios.js';
  import { defineAsyncComponent } from 'vue'
  export default {
    data() {
      return {
        services: [],
        loaded : false,
        loadedComments : false,
        Comentarios : [
          
        ],
        images: [
          "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990267/logos/nhqsptfuorp4dkmutlcm.jpg",
          "https://png.pngtree.com/background/20230611/original/pngtree-picturesque-garden-in-a-lawn-with-trees-and-flowers-picture-image_3160419.jpg",
          "https://img.freepik.com/foto-gratis/foto-banco-blanco-parque_181624-48161.jpg?t=st=1709034581~exp=1709035181~hmac=35d9b81bf3f82969cf1cfc4a1f063871cfec03ead125adb4531bd5ce226d291a",
          "https://www.comunicare.es/wp-content/uploads/2020/12/Servicios-de-jardineria.jpg",
          "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990267/logos/nhqsptfuorp4dkmutlcm.jpg"
        ]
      }
    },
    methods : {
      async getServices () {
        try {
          const {data} = await api.get('/services/get')
          this.services = data.services
          this.loaded = true
        } catch (error) {
          console.log(error)
        }
      },
      async getComments () {
        try {
          const {data} = await api.get('/comment/get')
          console.log(data)
          this.Comentarios = data.comments
        } catch (error) {
          console.log(error)
        }
      },
    },
    components: {
      ProyectsCard: defineAsyncComponent(() => import('@/modules/shared/components/ProyectsCard.vue')),
      ComentsUserCard: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/shared/components/ComentsUserCard.vue')),
    },
    mounted () {
      this.getServices()
      this.getComments()
    }
  };
</script>

<style scoped>
.text{
  font-size: 23px;
}
.v-carousel {
  margin-top: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.texto{
  color: white;
  font-size: 23px;
}
</style>
 -->

<template>
  <v-container>
    <v-form @submit.prevent="submitComment">
      <v-text-field
        label="Ingrese su comentario"
        v-model="comment"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Enviar</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarMessage }}
      <v-btn color="red" text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      comment: "",
      snackbar: false,
      snackbarMessage: "",
    };
  },
  methods: {
    async submitComment() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/predict/comment",
          {
            comment: this.comment,
          },
        );
        this.snackbarMessage = `Predicción: ${response.data.prediction}`;
      } catch (error) {
        this.snackbarMessage = "Error al realizar la predicción";
      } finally {
        this.snackbar = true;
      }
    },
  },
};
</script>

<style>
/* Agrega estilos personalizados si es necesario */
</style>
