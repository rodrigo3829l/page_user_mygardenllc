<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4" 
        v-for="(item, index) in items"
        :key="index"
      >
        <v-hover v-slot:default="{ hover }">
          <router-link
            :to="{ name: 'categorie-view', params: { category: item } }"
          >
            <v-card
              class="mx-auto on-hover"
              :elevation="hover ? 12 : 2"
              flat
              tile
            >
              <v-img
                :src="imageUrl"
                class="white--text image-effect"
                height="300px"
                cover
              >
                <v-card-title class="fill-height d-flex align-center justify-center text-center title-effect" style="color: white;">
                  {{ item }}
                </v-card-title>
              </v-img>
            </v-card>
          </router-link>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
      items: ["Gardening", "Construction", "Cleaning", "Maintenance", "ejemplo 5", "ejemplo 6"],
    };
  },
}
</script>

<style scoped>
.on-hover:hover .v-card {
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
}

.image-effect {
  transition: opacity 0.4s ease-in-out;
  opacity: 0.6;
}

.on-hover:hover .image-effect {
  opacity: 1;
}

.title-effect {
  font-size: 1.5em; /* Mantiene tu ajuste para el tamaño de la fuente */
}


</style>
