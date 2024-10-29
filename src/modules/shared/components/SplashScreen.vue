<template>
  <v-container class="splash-screen">
    <v-row justify="center">
      <v-col cols="12" sm="8" class="text-center py-5">
        <!-- Background Image -->
        <v-img
          src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png"
          class="splash-image"
          height="218px"
          contain
        ></v-img>

        <!-- Title -->
        <h1 class="splash-title">🌿 Welcome to My Garden LLC! 🌱</h1>

        <!-- Friendly Message with emojis -->
        <p class="friendly-message">
          "We nurture your space with love and care.<br />
          Get ready to watch your garden blossom 🌷"
        </p>

        <!-- Loading Text and Indeterminate Progress Bar -->
        <v-row class="py-3">
          <v-col>
            <p class="loading-text">Loading your green paradise...🌻</p>
            <v-progress-linear
              color="black"
              height="8"
              indeterminate
              class="progress-bar"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SplashPage",
};
</script>

<style scoped>
.splash-screen {
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;
}

.splash-image {
  border-radius: 12px;
}

.splash-title {
  font-size: 32px;
  font-weight: bold;
  color: #131613;
  padding-top: 24px;
  padding-bottom: 12px;
}

.friendly-message {
  font-size: 18px;
  color: #131613;
  margin-top: 10px;
  margin-bottom: 20px;
}

.loading-text {
  font-size: 16px;
  color: #131613;
}

.progress-bar {
  background-color: #dee3de;
  border-radius: 4px;
  overflow: hidden;
}
</style>
