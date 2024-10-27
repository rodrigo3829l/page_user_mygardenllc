<template>
  <h3 class="text-h6">{{ $t("registration.LocationDetails.titleString") }}</h3>

  <br />
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="8" sm="9">
          <v-text-field
            v-model="formData.postalCode"
            :label="$t('registration.LocationDetails.postalString')"
            required
            type="number"
            :error-messages="errors.postalCode"
            variant="underlined"
            color="green-darken-3"
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="3">
          <v-btn
            @click="validatePostalCode"
            color="green-darken-3"
            class="ma-2"
            small
            :loading="loadBtn"
            :disabled="loadBtn"
          >
            {{ $t("registration.LocationDetails.buttonString") }}
          </v-btn>
        </v-col>
      </v-row>

      <v-autocomplete
        v-model="formData.ciudad"
        :label="$t('registration.LocationDetails.cityString')"
        color="green-darken-3"
        required
        :disabled="true"
        :error-messages="errors.ciudad"
        variant="underlined"
      ></v-autocomplete>

      <v-select
        v-model="formData.calle"
        :label="$t('registration.LocationDetails.streetString')"
        required
        @update:focused="validateStreet"
        :disabled="!cpValidate"
        :error-messages="errors.calle"
        variant="underlined"
        color="green-darken-3"
        :items="[
          'Peachtree Street',
          'Marietta Street',
          'Decatur Street',
          'Spring Street',
          'Auburn Avenue',
          'Monroe Drive',
          'North Avenue',
          'Boulevard',
          'Ponce de Leon Avenue',
          'Irwin Street',
          'Edgewood Avenue',
          'Mitchell Street',
          'Chicory Way',
          'Churchill Heights',
          'Clarinbridge Way',
          'Cobblestone Way',
          'Columbia Bay',
          'Cranchester Way',
          'Whittenham Clse',
        ]"
      ></v-select>

      <v-text-field
        v-model="formData.neighborhood"
        :label="$t('registration.LocationDetails.neighborhoodString')"
        required
        @input="validateNeighborhood"
        :disabled="!cpValidate"
        :placeholder="
          $t('registration.LocationDetails.placeholderNeighboorhood')
        "
        :error-messages="errors.neighborhood"
        variant="underlined"
        color="green-darken-3"
      ></v-text-field>

      <v-text-field
        v-model="formData.numCasa"
        :label="$t('registration.LocationDetails.houseString')"
        required
        @input="validateNumberHouse"
        :disabled="!cpValidate"
        :error-messages="errors.numCasa"
        variant="underlined"
        color="green-darken-3"
        :placeholder="$t('registration.LocationDetails.placeholderNumHouse')"
        type="number"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

import {
  streetValidate,
  houseNumberValidate,
  neighborhoodValidate,
} from "@/plugins/validations";
export default {
  data() {
    return {
      formData: {
        postalCode: "",
        numCasa: "",
        calle: "",
        neighborhood: "",
        ciudad: "",
      },
      loadBtn: false,
      cpValidate: false,
      errors: {
        postalCode: "",
        numCasa: "",
        calle: "",
        neighborhood: "",
        ciudad: "",
      },
    };
  },
  methods: {
    async validatePostalCode() {
      this.loadBtn = true;

      // Verificación inicial del formato del código postal
      if (
        this.formData.postalCode.length !== 5 ||
        !/^\d+$/.test(this.formData.postalCode)
      ) {
        this.errors.postalCode = this.$t("registration.alerts.postalCode");
        this.cpValidate = false;
        this.loadBtn = false;
        return;
      }

      try {
        // Llamada a la API de Zippopotam para validar el código postal
        const { data } = await axios.get(
          `https://api.zippopotam.us/us/${this.formData.postalCode}`,
        );

        // Verifica si el lugar es Atlanta
        const placeName = data.places[0]["place name"];
        console.log(placeName);
        if (placeName.toLowerCase() === "atlanta") {
          this.errors.postalCode = "";
          this.cpValidate = true;
          this.formData.ciudad = placeName; // Asigna el nombre del lugar al campo de ciudad
        } else {
          this.errors.postalCode = this.$t("registration.alerts.serviceOnly"); // Mensaje de error si no es Atlanta
          this.cpValidate = false;
        }
      } catch (error) {
        console.error("Error fetching postal code info:", error);
        this.errors.postalCode = this.$t("registration.alerts.postalCode");
        this.cpValidate = false;
      } finally {
        this.$emit("updateData", this.formData, this.errors);
        this.loadBtn = false;
      }
    },
    validateStreet() {
      console.log("calle: ", this.formData.calle);
      this.errors.calle = streetValidate(this.formData.calle);
      this.$emit("updateData", this.formData, this.errors);
    },
    validateNumberHouse() {
      console.log("numero: ", this.formData.numCasa);
      this.errors.numCasa = houseNumberValidate(this.formData.numCasa);
      this.$emit("updateData", this.formData, this.errors);
    },
    validateNeighborhood() {
      this.errors.neighborhood = neighborhoodValidate(
        this.formData.neighborhood,
      );
      this.$emit("updateData", this.formData, this.errors);
    },
  },
  mounted() {
    this.$emit("updateData", this.formData, this.errors);
  },
};
</script>
