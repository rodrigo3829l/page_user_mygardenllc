<!-- <template>
  <v-card class="comment" elevation="2">
    <v-row align="center" class="comment-top">
      <v-img class="user-avatar" :src="userAvatar" alt="Avatar" width="40" height="40"></v-img>
      <span class="user-name">{{ userName }}</span>
    </v-row>

    <div class="comment-middle">
      <p>{{ commentText }}</p>
    </div>

    <v-row align="center" class="comment-bottom">
      <v-rating 
        :model-value="rating" 
        :half-increments="true" 
        show-size readonly 
        :length="5"
        :item-labels="['sad', '', '', '', 'happy']"
        item-label-position="bottom"
        color="yellow-darken-3"
      ></v-rating>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    userAvatar: String,
    userName: String,
    commentText: String,
    rating: Number, // Valor entre 0 y 5 para la calificación
  },
};
</script>

<style scoped>
.comment {
  border-radius: 5px;
  margin: 10px;
  padding: 20px;
}

.comment-top {
  margin-bottom: 10px;
}

.user-avatar {
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-weight: bold;
}

.comment-middle {
  margin-bottom: 10px;
}

.comment-middle p {
  font-size: 16px;
}

.comment-bottom {
  margin-top: 5px;
}
</style> -->
<template>
  <v-card
    class="mx-auto"
    max-width="344"
    :title="userName"
    :subtitle="service"
    :prepend-avatar="userAvatar"
    :append-avatar="userAvatar"
  >
    <v-card-text>{{ commentText }}</v-card-text>
    <v-rating 
      :model-value="rating" 
      :half-increments="true" 
      show-size readonly 
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
    rating: Number, // Valor entre 0 y 5 para la calificación
  },
};
</script>