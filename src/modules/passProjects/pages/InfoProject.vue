<template>
  <div v-if="overlay">
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>
  </div>

  <v-container v-else>
    <v-row>
      <!-- Primera columna -->
      <v-col cols="12" md="8">
        <v-row>
          <!-- Carrusel de imágenes -->
          <v-col cols="12">
            <v-carousel 
              :show-arrows="false" 
              hide-delimiter-background 
              :continuous="true" 
              style="height: 300px;"
            >
              <v-carousel-item v-for="(image, index) in project.images" :key="index">
                <v-img :src="image.secure_url"></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <!-- Título y descripción -->
          <v-col cols="12">
            <h2 class="title">{{ project.scheduleService.description }}</h2>
            <p class="description">{{ project.description }}</p>
          </v-col>
        </v-row>
      </v-col>

      <!-- Segunda columna -->
      <v-col cols="12" md="4">
        <v-card class="mb-4">
          <v-card-title>
            <strong>{{ project.service.name }}</strong>
          </v-card-title>
          <v-card-subtitle class="service-description">{{ project.service.description }}</v-card-subtitle>
          <v-card-text>
            <div class="rating-container">
              <v-rating half-increments v-model="project.service.Calificacion.total" color="yellow-darken-3" readonly></v-rating>
              <span class="rating-number">({{ project.service.Calificacion.total }})/{{ project.service.Calificacion.totales }}</span>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <strong>Costo del proyecto:</strong>
            <p>${{ project.scheduleService.quote }}</p>
          </v-card-text>
          <v-card-text>
            <strong>Tipo de servicio:</strong>
            <p>{{ project.service.tipoDeServicio.tipo }}</p>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>
            Comentarios
          </v-card-title>
          <v-card-text>
            <CommentCard v-if="comment" :comment="comment"></CommentCard>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { api } from '@/axios/axios.js';
import { toast } from 'vue3-toastify';

export default {
  components: {
    CommentCard: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/profile/components/CommentCard.vue'))
  },
  data() {
    return {
      overlay: false,
      project: null,
      comment: null
    };
  },
  async created() {
    this.overlay = true;
    try {
      const { id } = this.$route.params;
      const { data } = await api.get(`/feature/get/${id}`);
      this.project = data.project;

      const { data: commentData } = await api.get(`/comment/getCommentByScheduledId/${this.project.scheduleService._id}`);
      this.comment = commentData.comment;
      this.overlay = false;
    } catch (error) {
      toast.error('Error fetching project or comment data');
      this.overlay = false;
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 1.5rem;
}
.description {
  font-size: 1.2rem;
}
.service-description {
  font-size: 1.1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.rating-container {
  display: flex;
  align-items: center;
}
.rating-number {
  margin-left: 8px;
}
</style>
