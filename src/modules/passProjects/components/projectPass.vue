<template>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="align-end text-white"
        height="200"
        :src="proyecto.img"
        cover
      >
        <v-card-title>{{ proyecto.nombre }}</v-card-title>
      </v-img>
  
      <v-card-subtitle class="pt-4">
        <v-rating
          :model-value="proyecto.rating"
          color="yellow darken-3"
          half-increments
          readonly
        ></v-rating>
      </v-card-subtitle>
  
      <v-card-text>
        <div>{{ proyecto.descripcion }}</div>
      </v-card-text>
  
      <v-card-actions>
        <v-btn color="green darken-3">
          More information
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      proyecto: {
        type: Object,
        required: true,
      },
    },
  }
  </script>
  