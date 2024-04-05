<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <h1>{{ $t('profile.pages.myServices.servicesString') }}</h1>
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
      <div>
        <ServicesCard @updateData="updateData" :service="service"></ServicesCard>

      </div>
      </v-col>
    </v-row>
  </v-container>


  <v-dialog 
    v-model="rescheduleDialog"
    width="auto"
    persistent
  >
    <CalendarCard @updateData="updateData"></CalendarCard>
  </v-dialog>


  <v-dialog 
    v-model="cancelDialog" 
    width="auto"
    persistent
  >
    <v-card>
      <v-card-title>
        {{ $t('profile.pages.myServices.cancellationString') }}
      </v-card-title>
      <v-card-text>
        {{ $t('profile.pages.myServices.serviceString') }}
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="closeCancel">No</v-btn>
        <v-btn color="error" @click="confirmCancel">{{ $t('profile.pages.myServices.yesString') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import {api} from '@/axios/axios.js'
import { useUserStore } from '@/store/store';
import { toast } from 'vue3-toastify';
const userStore = useUserStore();
export default {
  data(){
    return {
      userStore,
      services : [],
      loaded : false,
      cancelDialog : false,
      idService : '',
      overlay : false,
      rescheduleDialog : false
    }
  },
  methods : {
    updateData( id, action) {
      if (action === 'cancel'){
        this.cancelDialog = true
        this.idService = id
      }else if (action === 'reschedule'){
        this.rescheduleDialog = !this.rescheduleDialog
        this.idService = id
      }else{
        this.reschedule(id)
      }
      
    },
    async getServices () {
      try {
        const {data} = await api.get(`/schedule/userservices/${userStore.token}`)
        console.log(data)
        this.services = data.services
        this.loaded = true
      } catch (error) {
        console.log(error)
      }
    },
    async confirmCancel() {
      try {
        this.cancelDialog = false
        this.overlay = true
        const {data} = await api.put(`/schedule/cancel/${this.idService}`)
        if(!data.success){
          toast.warning(data.msg)
        }else{
          this.getServices()
          toast.success(data.msg)
        }
        this.idService = ''
        this.overlay = false
      } catch (error) {
        this.overlay = false
        toast.error(this.$t('profile.pages.myServices.cancelServiceString'))
        console.log(error)
      }
    },
    async reschedule(date){
      try {
        this.rescheduleDialog = false
        this.overlay = true
        const datos = {
          newDate : date
        }
        const {data} = await api.put(`/schedule/rescheduleservice/${this.idService}`, datos)

        if(!data.success){
          toast.warning(data.msg)
        }else{
          this.getServices()
          toast.success(data.msg)
        }
        this.idService = ''
        this.overlay = false 
      } catch (error) {
        this.overlay = false 
        console.log(error)
      }
    },
    closeCancel() {
      this.cancelDialog = false,
      this.idService = ''
    },

  },
  
  created() {
    this.getServices()
  },
  components: {
    ServicesCard: defineAsyncComponent(() => import('../components/CardServiceUser.vue')),
    CalendarCard: defineAsyncComponent(() => import('../components/CalendarCard.vue')),
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
