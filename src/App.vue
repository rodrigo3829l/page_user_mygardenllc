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

export default {
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

 <!-- <template>
  <v-app>
    <v-main>
      <NavBar></NavBar>
      <v-breadcrumbs bg-color="green-darken-3" :items="breadcrumbItems" divider="-"></v-breadcrumbs>
      <router-view></router-view>
      <FooterComponent></FooterComponent>
    </v-main>
  </v-app>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'App',
  data() {
    return {
      breadcrumbItems: JSON.parse(localStorage.getItem('breadcrumbs')) || [],
    };
  },
  watch: {
    $route(to, from) {
      this.updateBreadcrumbs(to, from);
    },
  },
  created() {
    this.updateBreadcrumbs(this.$route, null);
  },
  methods: {
    updateBreadcrumbs(to, from) {
      if (from && this.breadcrumbItems.length && this.breadcrumbItems[this.breadcrumbItems.length - 1].href === from.path) {
        this.breadcrumbItems.pop();
      } else if (to.meta.title && !this.breadcrumbItems.find(item => item.href === to.path)) {
        this.breadcrumbItems.push({
          title: to.meta.title,
          disabled: false,
          href: to.path,
        });
      }
      if (this.breadcrumbItems[0] && this.breadcrumbItems[0].title !== 'Home') {
        this.breadcrumbItems.unshift({
          title: 'Home',
          disabled: false,
          href: '/home/homeuser',
        });
      }
      localStorage.setItem('breadcrumbs', JSON.stringify(this.breadcrumbItems));
    },
  },
  components: {
    NavBar: defineAsyncComponent(() => import('@/modules/shared/components/NavBar.vue')),
    FooterComponent: defineAsyncComponent(() => import('@/modules/shared/components/FooterComponent.vue')),
  },
};
</script> -->

