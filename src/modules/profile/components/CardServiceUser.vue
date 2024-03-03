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

</style>