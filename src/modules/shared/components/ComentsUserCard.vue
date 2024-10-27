<template>
  <v-card
    class="mx-auto"
    max-width="344"
    :title="userName"
    :subtitle="service"
    prepend-icon="mdi-account"
  >
    <v-card-text>"{{ commentText }}"</v-card-text>
    <v-rating
      :model-value="rating"
      :half-increments="true"
      show-size
      readonly
      :length="5"
      color="yellow-darken-3"
    ></v-rating>
  </v-card>
</template>

<script>
export default {
  props: {
    userAvatar: String,
    userName: String,
    commentText: String,
    service: String,
    rating: Number,
  },
};
</script>
