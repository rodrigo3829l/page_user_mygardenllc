<template>
  <div>
    <!-- <v-overlay
        :model-value="overlay"
        class="align-center justify-center"
      >
        <v-progress-circular
          color="primary"
          size="64"
          indeterminate
        ></v-progress-circular>
      </v-overlay> -->
  </div>
    <v-container>
      <v-card>
        <div style="position: relative;">
          <v-carousel 
            :show-arrows="false" 
            hide-delimiter-background 
            :continuous="true" 
            style="height: 200px;"
          >
            <v-carousel-item v-for="(image, index) in project.images" :key="index">
              <v-img :src="image.secure_url"></v-img>
            </v-carousel-item>
          </v-carousel>
          <v-chip 
            class="ma-2" 
            color="orange"
            text-color="white"
            variant="tonal"
            style="position: absolute; top: 10px; right: 10px;"
          >
            {{ project.service.name }}
          </v-chip>
        </div>
        <v-card-title>{{ project.description }}</v-card-title>
        <v-card-subtitle>{{ project.scheduleService.description }}</v-card-subtitle>
        <v-card-actions class="justify-end">
          <v-btn type="text" append-icon="mdi-arrow-right" color="green-darken-3" @click="showMoreInfo">
            More info
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-container>
</template>

<script>
export default {
  
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showMoreInfo() {
      this.$router.push({ name: 'proyects-info', params: { id: this.project._id } });
    }
  }
}
</script>
