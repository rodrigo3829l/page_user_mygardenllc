<template>
  <v-app>
    <v-main>
      <NavBar></NavBar>
      <!-- <AccessibilityButtons></AccessibilityButtons> -->
      <router-view></router-view>
      <FooterComponent></FooterComponent>
    </v-main>
  </v-app>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'App',
  components: {
    NavBar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/shared/components/NavBar.vue')),
    FooterComponent: defineAsyncComponent(() => import(/* webpackChunkName: "Footer" */ '@/modules/shared/components/FooterComponent.vue')),
    // AccessibilityButtons: defineAsyncComponent(() => import(/* webpackChunkName: "AccessibilityButtons" */ '@/modules/shared/components/AccessibilityButtons')),
  },
}
</script>
<style scoped>
.v-carousel {
  margin-top: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>