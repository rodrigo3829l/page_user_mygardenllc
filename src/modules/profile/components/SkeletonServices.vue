<template>
    <v-skeleton-loader
      class="mx-auto my-4"
      max-width="344"
      type="image, text, subtitle, actions"
    >
      <template #image>
        <v-row>
          <v-col cols="12">
            <v-skeleton-loader type="image" height="200px"></v-skeleton-loader>
          </v-col>
        </v-row>
      </template>
  
      <template #text>
        <v-row>
          <v-col cols="12">
            <v-skeleton-loader type="text" width="80%"></v-skeleton-loader>
            <v-skeleton-loader type="text" width="90%"></v-skeleton-loader>
          </v-col>
        </v-row>
      </template>
  
      <template #subtitle>
        <v-row>
          <v-col cols="12">
            <v-skeleton-loader type="text" width="50%"></v-skeleton-loader>
          </v-col>
        </v-row>
      </template>
  
      <template #actions>
        <v-row dense>
          <v-col cols="4">
            <v-skeleton-loader type="action" height="36px" width="100%"></v-skeleton-loader>
          </v-col>
          <v-col cols="4">
            <v-skeleton-loader type="action" height="36px" width="100%"></v-skeleton-loader>
          </v-col>
          <v-col cols="4">
            <v-skeleton-loader type="action" height="36px" width="100%"></v-skeleton-loader>
          </v-col>
        </v-row>
      </template>
    </v-skeleton-loader>
  </template>
  
  <script>
  export default {
    name: 'ServiceSkeletonLoader',
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si son necesarios */
  </style>
  