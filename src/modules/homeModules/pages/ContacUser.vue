<template>
  <!-- Título y mensaje informativo -->
  <v-container>
    <v-row justify="center" class="text-center my-4">
      <v-col cols="12">
        <h2>Let's Get in Touch</h2>
        <p>We will respond to your email within a maximum of 3 days.</p>
      </v-col>
    </v-row>

    <!-- División en dos columnas para el formulario y la información de contacto -->
    <v-row justify="center" align="center">
      <!-- Columna para el formulario de contacto -->
      <v-col md="6">
        <v-card elevation="5">
          <v-card-title>
            <h2>Contact Us</h2>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                variant="underlined"
                color="green-darken-3"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                variant="underlined"
                color="green-darken-3"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                variant="underlined"
                color="green-darken-3"
                label="Subject"
                required
              ></v-text-field>
              <v-textarea
                variant="outlined"
                color="green-darken-3"
                label="Message"
                rows="4"
                required
              ></v-textarea>
              <v-btn
                block
                color="green-darken-3"
                :loading="loading"
                @click="handleSubmit"
              >
                Send Message
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Columna para la información de contacto -->
      <v-col md="6">
        <v-card-text class="text-center">
          <h2>Contact Information</h2>
          <v-list dense>
            <v-list-item>
              <v-icon>mdi-phone</v-icon>
              +1 123 456 789
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-map-marker</v-icon>
              123 Main St, Anytown, Country
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-clock</v-icon>
              Monday to Friday, 9 AM - 6 PM
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },

  methods: {
    handleSubmit() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
