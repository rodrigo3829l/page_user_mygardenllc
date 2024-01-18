<!-- <template>
  <v-card class="small-card" elevation="2">
    <v-img :src="proyecto.img" class="card-image" aspect-ratio="1.78"></v-img>
    <v-card-text class="card-content">
      <p>{{ proyecto.descripcion }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    proyecto: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.small-card {
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 10px;
}

.card-image {
  border-radius: 10px 10px 0 0; /* Esquinas redondeadas solo en la parte superior */
}

.card-content {
  padding: 16px;
}

.card-content p {
  font-size: 16px;
  margin: 0; /* Elimina el margen inferior predeterminado */
}
</style> -->

<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="green-darken-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="250"
      :src="proyecto.img"
    ></v-img>

    <v-card-item>
      <v-card-title>{{proyecto.nombre}}</v-card-title>

    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :model-value="proyecto.rating"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          {{ proyecto.rating }} (413)
        </div>
      </v-row>
      <br>
      

      <div>{{ proyecto.descripcion   }}</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Tags</v-card-title>

    <div class="px-4">
      <v-chip-group v-model="selection">
        <v-chip>Gardening</v-chip>

        <v-chip>Pruning</v-chip>

        <v-chip>Maintenance</v-chip>
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn
        color="green-darken-3"
        variant="text"
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      proyecto: {
        type: Object,
      },
    },
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>