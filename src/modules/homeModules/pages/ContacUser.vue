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
          <h2 class="mb-4">{{ $t('contact.contactInformationString') }}</h2>
          <v-list dense>
            <v-list-item>
               
                <v-icon>mdi-phone</v-icon>
               
               +1 123 456 789 
            </v-list-item>
            <v-list-item>
               
                <v-icon>mdi-map-marker</v-icon>
               
               {{ $t('contact.countryString') }} 
            </v-list-item>
            <v-list-item>
                <v-icon>mdi-clock</v-icon>
              {{ $t('contact.dayOfServiceString') }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-col>

      <v-col md="6">
        <!-- Sección del formulario de contacto en un Card con sombra -->
        <v-card elevation="5">
          <v-card-title>
            <h2 class="mb-4">{{ $t('contact.ContactString') }}</h2>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field variant="underlined" color="green-darken-3" :label="$t('contact.nameString')" required></v-text-field>
              <v-text-field variant="underlined" color="green-darken-3" :label="$t('contact.emailString')" type="email" required></v-text-field>
              <v-text-field variant="underlined" color="green-darken-3" :label="$t('contact.subjectString')" required></v-text-field>
              <v-textarea variant="outlined" color="green-darken-3" :label="$t('contact.messageString')" rows="4" required></v-textarea>
              <v-btn block color="green-darken-3" :loading="loading" @click="load">{{ $t('contact.buttonString') }}</v-btn>
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
