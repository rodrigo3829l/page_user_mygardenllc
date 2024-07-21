<template>
<v-container>
    <v-row align="center" justify="space-between">
        <v-col cols="12" md="6">
            <h1 class="display-2">Servicios de jardinería profesional</h1>
            <p>
                Confíe en nosotros para mantener su jardín en las mejores condiciones. Nuestro equipo
                cuenta con años de experiencia y garantiza resultados de calidad.
            </p>
            <v-btn color="primary">
                Agendar un servicio
            </v-btn>
        </v-col>

        <v-col cols="12" md="6">
            <v-carousel show-arrows="hover" hide-delimiters height="350" cycle interval="2500">
                <v-carousel-item v-for="(image, i) in images" :key="i" :src="image" cover>
                </v-carousel-item>
            </v-carousel>

        </v-col>
    </v-row>
</v-container>
<br><br>
<About></About>
<br><br>
<Benefits></Benefits>
<br><br>
<Comments></Comments>
<br>
<Contact></Contact>
<br><br>
<Faqs></Faqs>
</template>

<script>
import {
    defineAsyncComponent
} from 'vue'
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
</style>


<!-- <template>
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
  import axios from 'axios';
  
  export default {
    data() {
      return {
        comment: '',
        snackbar: false,
        snackbarMessage: ''
      };
    },
    methods: {
      async submitComment() {
        try {
        const {data} = await axios.get(`https://api.mymemory.translated.net/get?q=${this.comment}?&langpair=es-ES|en-GB`)
        console.log(data)
        const translation = data.responseData.translatedText;
          const response = await axios.post('http://127.0.0.1:5000/predict/comment', {
            comment: translation
          });
          let pred
          if(response.data.prediction === 1){
            pred = "Gracias por el buen comentario, trabajamos por ofrecer el mejor servicio"
          }else if(response.data.prediction == 0){
            pred = "Sentimos si algo estuvo mal, lo tomaremos en cuenta para la proxima, gracias"
          }else{
            pred = "Mucchas gracias por opinar sobre el servicio"
          }
          this.snackbarMessage = `Predicción: ${pred}`;
        } catch (error) {
          this.snackbarMessage = 'Error al realizar la predicción';
        } finally {
          this.snackbar = true;
        }
      }
    }
  };
  </script>
  
  <style>
  /* Agrega estilos personalizados si es necesario */
  </style> -->



   // src/components/TranslateComponent.vue
<!-- <template>
  <div>
    <input v-model="text" placeholder="Escribe algo en español" />
    <button @click="translateText">Traducir</button>
    <p>Traducción: {{ translation }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      text: '',
      translation: ''
    };
  },
  methods: {
    async translateText() {
      try {
        const {data} = await axios.get(`https://api.mymemory.translated.net/get?q=${this.text}?&langpair=es-ES|en-GB`)
        console.log(data)
        this.translation = data.responseData.translatedText;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script> -->
