<template>
  <v-card class="mx-auto my-12" max-width="450">
    <!-- Skeleton para la imagen del servicio -->
    <v-skeleton-loader type="image" height="250"></v-skeleton-loader>

    <!-- Skeleton para el título y el rating -->
    <v-card-item>
      <v-row>
        <v-col>
          <v-skeleton-loader type="heading"></v-skeleton-loader>
        </v-col>
        <v-col class="text-right">
          <v-skeleton-loader type="text" width="60px"></v-skeleton-loader>
          <v-skeleton-loader type="text" width="60px"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card-item>

    <!-- Skeleton para la descripción -->
    <v-card-text>
      <v-skeleton-loader type="text"></v-skeleton-loader>
      <v-skeleton-loader type="text"></v-skeleton-loader>
      <v-skeleton-loader type="text"></v-skeleton-loader>
    </v-card-text>

    <!-- Skeleton para el botón -->
    <v-card-actions>
      <v-skeleton-loader type="button" width="100%"></v-skeleton-loader>
    </v-card-actions>
  </v-card>
</template>

<script>
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
