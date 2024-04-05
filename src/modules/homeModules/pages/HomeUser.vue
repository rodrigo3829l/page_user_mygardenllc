
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
      <!-- <v-slide-group center-active>
        <v-slide-group-item v-for="(proyecto, i) in proyectos" :key="i">
          <div style="max-width: 400px ; margin-left: 10px; margin-right: 10px;" >
            <ProyectsCard :proyecto="proyecto" />
          </div>
        </v-slide-group-item>
      </v-slide-group> -->

    <h2>{{ $t('home.commentsString') }}</h2>
      <v-slide-group center-active>
        <v-slide-group-item v-for="(comentario, i) in Comentarios" :key="i">
          <div style="max-width: 440px ; margin-left: 10px; margin-right: 10px;">
            <ComentsUserCard
              :userAvatar="comentario.userAvatar"
              :userName="comentario.userName"
              :commentText="comentario.commentText"
              :rating="comentario.rating"
            />
          </div>
        </v-slide-group-item>
      </v-slide-group>
  </v-container><br>
</template>

<script>

  import { defineAsyncComponent } from 'vue'
  export default {
    data() {
      return {
        proyectos: [
          {nombre: 'ejempllo1', rating: 4, img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', descripcion : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore impedit temporibus minima dolor? Totam obcaecati porro hic adipisci molestiae amet, delectus animi nisi omnis maiores, reiciendis officia id minima!'},
          {nombre: 'ejempplo2', rating: 4.3, img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', descripcion : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore impedit temporibus minima dolor? Totam obcaecati porro hic adipisci molestiae amet, delectus animi nisi omnis maiores, reiciendis officia id minima!'},
          {nombre: 'ejempllo3', rating: 4.1, img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', descripcion : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore impedit temporibus minima dolor? Totam obcaecati porro hic adipisci molestiae amet, delectus animi nisi omnis maiores, reiciendis officia id minima!'},
          {nombre: 'ejempplo5', rating: 4, img: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg', descripcion : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore impedit temporibus minima dolor? Totam obcaecati porro hic adipisci molestiae amet, delectus animi nisi omnis maiores, reiciendis officia id minima!'},
        ],
        Comentarios : [
          {
            userAvatar: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
            userName: 'Rodrigo Del Angel Gerardo',
            commentText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure doloremque omnis, consequuntur voluptate laborum aspernatur excepturi velit aliquid suscipit! Maxime laudantium molestiae',
            rating: 4.5, 
          },
          {
            userAvatar: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
            userName: 'Avelina Hernandez Hernandez',
            commentText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure doloremque omnis, consequuntur voluptate laborum aspernatur excepturi velit aliquid suscipit! Maxime laudantium molestiae',
            rating: 5, 
          },
          {
            userAvatar: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
            userName: 'Juan perez Hernandez Hernandez',
            commentText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure doloremque omnis, consequuntur voluptate laborum aspernatur excepturi velit aliquid suscipit! Maxime laudantium molestiae',
            rating: 3, 
          },
          {
            userAvatar: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
            userName: 'Josue Hernandez Guzman',
            commentText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure doloremque omnis, consequuntur voluptate laborum aspernatur excepturi velit aliquid suscipit! Maxime laudantium molestiae',
            rating: 4, 
          }
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
    components: {
        // ProyectsCard: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/shared/components/ProyectsCard.vue')),
        ComentsUserCard: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/shared/components/ComentsUserCard.vue')),
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

