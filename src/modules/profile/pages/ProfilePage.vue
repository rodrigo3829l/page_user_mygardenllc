<template>
  <v-container>
    <v-row>
      <!-- Lado izquierdo: Dashboard -->
      <v-col cols="4">
        <v-card color="green darken-3" class="white--text d-flex flex-column">
          <v-row class="align-center justify-center flex-grow-1">
            <v-col cols="4">
              <v-img src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" class="mx-auto"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title class="headline text-center">Hola, <br> Bienvenido Rodrigo</v-card-title>
            </v-col>
          </v-row>
          <v-list class="flex-shrink-0">
            <v-list-item>
              <v-btn block text>Editar Información</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block text>Mis Servicios</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block text>Cambiar Contraseña</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block text>Cerrar Sesión</v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Lado derecho: Espacio para componentes adicionales -->
      <v-col cols="8">
        <Information></Information>
        <!-- Aquí puedes agregar los componentes que se mostrarán al hacer clic en los botones -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    Information: defineAsyncComponent(() => import('./EditProfile.vue')),
  },
};
</script>

<style scoped>
.v-btn {
  margin: 0;
}
.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
