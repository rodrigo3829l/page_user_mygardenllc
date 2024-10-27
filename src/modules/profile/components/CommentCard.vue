<template>
  <v-card class="comment-card" outlined>
    <v-card-title>
      <v-avatar size="32" class="mr-2">
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      <span class="font-weight-bold">{{ comment.name }}</span>
    </v-card-title>

    <v-card-text>
      {{ comment.comment }}
    </v-card-text>

    <v-card-actions>
      <v-rating
        :model-value="comment.rating"
        readonly
        dense
        half-increments
        color="yellow"
      ></v-rating>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.comment-card {
  margin-bottom: 20px;
}
</style>
