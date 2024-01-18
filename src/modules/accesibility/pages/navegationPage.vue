<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="card in cards" :key="card.title">
        <router-link :to="{name: card.to}">
          <v-card class="mb-3" :color="card.color">
            <v-card-text class="text-center white--text">
              <v-icon large>{{ card.icon }}</v-icon>
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
};
</script>
