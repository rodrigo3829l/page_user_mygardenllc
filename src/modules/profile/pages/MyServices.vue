<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <h1>Mis Servicios</h1>
    </v-row>
    
    <v-row v-if="!loaded">
      <v-col
        cols="12"
        md="4"
        v-for="num in 6"
        :key="num"
      >
      <v-skeleton-loader
          class="mx-auto border"
          max-width="340"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    
    <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="(service, index) in services"
        :key="index"
      >
        <ServicesCard :service="service"></ServicesCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import {api} from '@/axios/axios.js'
import { useUserStore } from '@/store/store';
const userStore = useUserStore();
export default {
  data(){
    return {
      userStore,
      services : [],
      loaded : false
    }
  },
  methods : {
    async getServices () {
      try {
        const {data} = await api.get(`/schedule/userservices/${userStore.token}`)
        console.log(data)
        this.services = data.services
        this.loaded = true
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getServices()
  },
  components: {
    ServicesCard: defineAsyncComponent(() => import('../components/CardServiceUser.vue')),
  },
}
</script>

<style scoped>
.v-col {
  margin: 20px;
}
h1 {
  margin-bottom: 20px;
}
</style>
