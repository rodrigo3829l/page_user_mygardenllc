<template>
  <!-- Sección de Parallax con Buscador -->
  <v-parallax
    src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg"
    height="380"
  >
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-0" color="grey-lighten-3">
          <v-card-text>
            <v-autocomplete
              v-model="selectedTipo"
              density="compact"
              variant="solo"
              :label="$t('services.searchString')"
              append-inner-icon="mdi-magnify"
              :items="itemServices"
              single-line
              hide-details
              @change="navigateToSelectedTipo"
              @keyup.enter="navigateToSelectedTipo"
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-parallax>

  <v-breadcrumbs :items="bread">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <v-container>
    <div v-for="(tipo, index) in tiposDeServicio" :key="index">
      <v-row>
        <v-col cols="12">
          <h2 class="text-h5 my-4">
            {{ tipo.tipo }}
          </h2>
        </v-col>
      </v-row>

      <v-row v-if="!loaded">
        <v-col v-for="n in 4" :key="n" cols="12" md="3">
          <v-skeleton-loader
            class="mx-auto border"
            max-width="300"
            max-height="500"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-slide-group center-active>
            <v-slide-group-item v-for="(service, i) in services" :key="i">
              <div
                v-if="service.tipoDeServicio.tipo === tipo.tipo"
                style="max-width: 400px; margin-left: 10px; margin-right: 10px"
              >
                <ProyectsCard :service="service" />
              </div>
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { api } from "@/axios/axios.js";

export default {
  data() {
    return {
      bread: [
        {
          title: "Home",
          disabled: false,
          href: "/home/homeuser",
        },
        {
          title: "services",
          disabled: false,
          href: "/services/servicespage",
        },
      ],
      tiposDeServicio: [],
      services: [],
      loaded: false,
      numberLoader: 4,
      itemServices: [],
      selectedTipo: "",
    };
  },
  async created() {
    await this.getTypeServices();
  },
  methods: {
    async getTypeServices() {
      try {
        const { data } = await api.get("/typeservice/get");
        this.tiposDeServicio = data.tipesServices;
        this.getServices();
      } catch (error) {
        console.log(error);
      }
    },
    async getServices() {
      try {
        const { data } = await api.get("/services/get");
        this.services = data.services;
        this.itemServices = this.services.map((service) => service.name);
        this.loaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    navigateToSelectedTipo() {
      const selectedService = this.services.find(
        (service) => service.name === this.selectedTipo,
      );
      if (selectedService) {
        const id = selectedService._id;
        this.$router.push({ name: "services-Schedule", params: { id: id } });
      } else {
        console.log(
          "No se encontró ningún servicio con el nombre seleccionado:",
          this.selectedTipo,
        );
      }
    },
  },
  components: {
    ProyectsCard: defineAsyncComponent(
      () => import("@/modules/shared/components/ProyectsCard.vue"),
    ),
  },
};
</script>
