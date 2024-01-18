<template>
  <div class="service-card card shadow my-4">
    <div class="row align-items-center">
      <div class="col-md-4 service-image text-center">
        <img :src="service.image" alt="Servicio" class="img-fluid">
      </div>
      <div class="col-md-5 service-info">
        <h3 class="title">{{ service.name }}</h3>
        <p class="description">{{ service.description }}</p>
      </div>
      <div class="col-md-3 service-status text-center">
        <p class="status">Status</p>
        <p class="status">{{ service.status }}</p>
        <router-link :to="{ name: 'profile-pay' }">
          <button v-if="service.status === 'Cotizado'" class="btn button-action">Pagar</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    service: Object,
  },
};
</script>
