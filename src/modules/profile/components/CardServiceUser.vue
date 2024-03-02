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
      Status: {{ service.status }}
    </v-card-subtitle>
    
    <v-card-subtitle v-if="service.status === 'quoted'">
      Please pay the service
    </v-card-subtitle>
    <v-card-subtitle v-if="service.status === 'pay'">
      Paid service
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="green-darken-3"
        variant="text"
        @click="info"
      >
        Info
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