<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12" class="position-relative pa-0">
        <!-- Carousel -->
        <v-carousel show-arrows="hover" hide-delimiters height="450" cycle interval="2500">
          <v-carousel-item v-for="(image, i) in images" :key="i" :src="image" cover></v-carousel-item>
        </v-carousel>

        <!-- Texto y botón sobre el carousel -->
        <div class="overlay-content">
          <v-col cols="12" md="12" class="white--text">
            <h1 >Servicios de jardinería profesional</h1>
            <p>
              Confíe en nosotros para mantener su jardín en las mejores condiciones. Nuestro equipo
              cuenta con años de experiencia y garantiza resultados de calidad.
            </p>
            <v-btn color="green-darken-3" dark>
              Agendar un servicio
            </v-btn>
          </v-col>
        </div>
      </v-col>
    </v-row>
    <About></About>
    <br><br>
    <Benefits></Benefits>
    <br><br>
    <Comments></Comments>
    <br>
    <Contact></Contact>
    <br><br>
    <Faqs></Faqs>
  </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    About: defineAsyncComponent(() => import('@/modules/homeModules/pages/AboutView.vue')),
    Benefits: defineAsyncComponent(() => import('@/modules/homeModules/pages/BenefitsView.vue')),
    Comments: defineAsyncComponent(() => import('@/modules/homeModules/pages/CommentsClients.vue')),
    Faqs: defineAsyncComponent(() => import('@/modules/homeModules/pages/FAQSView.vue')),
    Contact: defineAsyncComponent(() => import('@/modules/homeModules/pages/ContacUser.vue')),
  },
  data() {
    return {
      images: [
        "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990267/logos/nhqsptfuorp4dkmutlcm.jpg",
        "https://png.pngtree.com/background/20230611/original/pngtree-picturesque-garden-in-a-lawn-with-trees-and-flowers-picture-image_3160419.jpg",
        "https://img.freepik.com/foto-gratis/foto-banco-blanco-parque_181624-48161.jpg?t=st=1709034581~exp=1709035181~hmac=35d9b81bf3f82969cf1cfc4a1f063871cfec03ead125adb4531bd5ce226d291a",
        "https://www.comunicare.es/wp-content/uploads/2020/12/Servicios-de-jardineria.jpg",
        "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990267/logos/nhqsptfuorp4dkmutlcm.jpg"
      ]
    }
  }
};
</script>

<style scoped>
.display-2 {
  font-size: 2.8rem;
}

p {
  font-size: 1.2rem;
}

.overlay-content {
  position: absolute;
  top: 20%;
  left: 5%;
  width: 50%;
  text-align: left;
  z-index: 2;
  color: white;
}

.v-carousel-item {
  height: 450px;
}

.carousel {
  height: 450px;
}

.pa-0 {
  padding: 0;
}

.no-gutters {
  margin: 0;
}
</style>
