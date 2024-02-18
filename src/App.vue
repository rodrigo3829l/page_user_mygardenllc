<template>
  <v-app>
    <v-main>
      <NavBar></NavBar>
      <router-view></router-view>
      <FooterComponent></FooterComponent>
    </v-main>
  </v-app>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { csp } from './plugins/csp';

export default {
  metaInfo() {
    return {
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          content: csp,
        },
      ],
    };
  },
  components: {
    NavBar: defineAsyncComponent(() => import('@/modules/shared/components/NavBar.vue')),
    FooterComponent: defineAsyncComponent(() => import('@/modules/shared/components/FooterComponent.vue')),
  }, 
  methods:{
    verifyBdConecction (){
      
    },
  }
};
</script>


<style>
a {
  text-decoration: none; /* Quita el subrayado */
  color: inherit; /* Usa el color heredado (mismo color que el texto circundante) */
  cursor: pointer; /* Establece el cursor a pointer para indicar que es interactivo */
}
</style>

