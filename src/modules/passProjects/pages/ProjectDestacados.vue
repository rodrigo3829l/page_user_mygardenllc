<template>
  <v-breadcrumbs :items="bread">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
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
            :to="{ name: 'categorie-view', params: { category: item._id } }"
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
                  {{ item.tipo }}
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
import { api } from '@/axios/axios';
export default {
  data() {
    return {
      bread: [
        {
          title: 'Home',
          disabled: false,
          href: '/home/homeuser',
        },
        {
          title: 'projects',
          disabled: false,
          href: '/proyects/destacados',
        },
      ],
      imageUrl: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
      items: [],
    };
  },
  methods : {
    async getTypes (){
      try {
        const {data} = await api.get("/typeservice/get")
        console.log(data)
        this.items = data.tipesServices
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted(){
    this.getTypes()
  }
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
  font-size: 1.5em;
}
</style>
