<template>
  <v-breadcrumbs :items="bread">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="card in cards" :key="card.title">
        <router-link 
          :to="{name: card.to}" 
          @focus="speak(card.title)"
        >
          <v-card
            class="mb-3 card"
            :color="card.color"
            @mouseenter="expand($event, card.title)"
            @mouseleave="shrink($event)"
          >
            <v-card-text class="text-center white--text">
              <v-icon x-large>{{ card.icon }}</v-icon>
              <h5>{{ card.title }}</h5>
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      bread: [
        {
          title: 'Home',
          disabled: false,
          href: '/home/homeuser',
        },
        {
          title: 'accesibility',
          disabled: false,
          href: '/accesibility',
        },
      ],
      cards: [
      { title: 'Regresar', icon: 'mdi-arrow-left', color: 'primary', to:'home-home'},
        { title: 'Inicio', icon: 'mdi-home', color: 'success', to:'home-home' },
        { title: 'Login', icon: 'mdi-login', color: 'red', to:'login-login' },
        { title: 'Perfil', icon: 'mdi-account', color: 'orange', to:'profile-profile' },
        { title: 'Servicios', icon: 'mdi-briefcase', color: 'light-blue', to:'services-services' },
        { title: 'Proyectos', icon: 'mdi-folder-open', color: 'grey darken-3', to:'proyects-view' },
        { title: 'Contacto', icon: 'mdi-email', color: 'purple', to:'home-contact' },
        { title: 'Preguntas Frecuentes', icon: 'mdi-help-circle', color: 'grey lighten-1', to:'home-answers' },
      ]
    };
  },
  methods: {
    expand(event, title) {
      let card = event.currentTarget;
      card.style.transform = 'scale(1.15)'; // Aumenta el tamaño del botón
      card.style.transition = 'transform 0.3s ease'; // Suaviza la transición
      console.log(`Leyendo: ${title}`); // Simula la acción de leer el título
      this.speak(title);
      // Aquí podrías integrar alguna funcionalidad de voz para leer el título
    },
    shrink(event) {
      let card = event.currentTarget;
      card.style.transform = 'scale(1)'; // Retorna el botón a su tamaño original
    },
    speak(text) {
      if (!window.speechSynthesis) {
        console.error("La síntesis de voz no es soportada en este navegador");
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-EN';
      window.speechSynthesis.speak(utterance);
    }

  }
};
</script>
