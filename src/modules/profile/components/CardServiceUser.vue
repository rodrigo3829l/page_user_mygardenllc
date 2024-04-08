<!-- <template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="service.img.secure_url"
      height="200px"
      cover
    ></v-img>

    <v-card-title>
     {{ service.description }}
    </v-card-title>

    <v-card-subtitle>
      {{ $t('profile.components.cardServiceUser.statusString') }}: {{ service.status }}
    </v-card-subtitle>
    
    <v-card-subtitle v-if="service.status === 'quoted'">
      {{ $t('profile.components.cardServiceUser.payServicesString') }}
    </v-card-subtitle>
    <v-card-subtitle v-if="service.status === 'pay'">
      {{ $t('profile.components.cardServiceUser.payServiceString') }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="green-darken-3"
        variant="text"
        @click="info"
      >
      {{ $t('profile.components.cardServiceUser.informationString') }}
      </v-btn>
      <v-spacer></v-spacer>
      

      
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
    },
  },
  methods : {
    info(){
      this.$router.push({name: 'profile-infomyservices', params: {id: this.service._id} })
    }
  }
};
</script>

<style>

</style> -->


<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="service.img.secure_url"
      height="200px"
      cover
    ></v-img>

    <v-card-title class="text-center">
      {{ service.description }}
    </v-card-title>

    <v-card-subtitle class="text-center">
      {{ service.status }}
    </v-card-subtitle>

    <v-card-subtitle class="text-center" v-if="service.status === 'quoted'">
      {{ $t('profile.components.cardServiceUser.payServicesString') }}
    </v-card-subtitle>
    <v-card-subtitle class="text-center" v-else-if="service.status === 'pay'">
      {{ $t('profile.components.cardServiceUser.payServiceString') }}
    </v-card-subtitle>
    <v-card-subtitle class="text-center" v-else-if="service.status === 'in progress'">
      Servicio en progreso
    </v-card-subtitle>
    <v-card-subtitle class="text-center" v-else-if="service.status === 'ifinish'">
      Servicio terminado
    </v-card-subtitle>
    <v-card-subtitle v-else>
      .
    </v-card-subtitle>
    
    <v-card-actions class="d-flex justify-center">
      <v-btn
        color="success"
        @click="info"
      >
      {{ $t('profile.components.cardServiceUser.informationString') }}
      </v-btn>
    </v-card-actions>

    <v-card-actions  v-if="service.status !== 'finish'" class="d-flex justify-center">
      <v-btn
      v-if="service.status === 'quoting'"
        color="primary"
        @click="reschedule"
      >
        Reschedule
      </v-btn>
      <v-btn
        color="error"
        @click="cancel"
      >
        Cancel the service
      </v-btn>
    </v-card-actions>
  </v-card>
  
</template>

<script>
export default {

  props: {
    service: {
      type: Object,
    },
  },
  methods: {
    reschedule() {
      this.$emit('updateData', {
        id : this.service._id,
        date :this.service.dates.scheduledTime
      }
      , 'reschedule');
      // Lógica para reprogramar el servicio
    },
    cancel() {
      this.$emit('updateData', this.service._id, 'cancel');
      // Lógica para cancelar el servicio
    },
    info(){
      this.$router.push({name: 'profile-infomyservices', params: {id: this.service._id} })
    }
  }
};
</script>

<style>

</style>

