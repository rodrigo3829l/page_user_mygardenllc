<template>
  <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-container>
    <v-row align="center" justify="center">
      <v-col md="6">
        <!-- Sección de información de contacto -->
        <v-card-text class="text-center">
          <h2 class="mb-4">Información de Contacto</h2>
          <v-list dense>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>+1 123 456 789</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-content>123 Main St, Ciudad, País</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-clock</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Lunes a Viernes: 9:00 AM - 6:00 PM</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-col>

      <v-col md="6">
        <!-- Sección del formulario de contacto en un Card con sombra -->
        <v-card elevation="5">
          <v-card-title>
            <h2 class="mb-4">Contacto</h2>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field variant="underlined" color="green-darken-3" label="Nombre" required></v-text-field>
              <v-text-field variant="underlined" color="green-darken-3" label="Correo" type="email" required></v-text-field>
              <v-text-field variant="underlined" color="green-darken-3" label="Asunto" required></v-text-field>
              <v-textarea variant="outlined" color="green-darken-3" label="Mensaje" rows="4" required></v-textarea>
              <v-btn block color="green-darken-3" :loading="loading" @click="load">Enviar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
     loading: false,
     items: [
        {
          title: 'Home',
          disabled: false,
          href: '/home/homeuser',
        },
        {
          title: 'Contact',
          disabled: false,
          href: '/home/contact',
        },
      ],
     }),

  methods: {
    load() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 3000);
    },
  },
};
</script>
