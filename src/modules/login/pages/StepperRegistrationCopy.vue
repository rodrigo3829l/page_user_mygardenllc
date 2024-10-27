<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="10" lg="16">
        <v-card class="elevation-12">
          <v-stepper v-model="step">
            <v-stepper-header class="custom-stepper-header">
              <template v-for="n in 3" :key="`${n}-step`">
                <v-stepper-item
                  :complete="step > n"
                  :step="items[n - 1]"
                  :value="n"
                  :title="items[n - 1]"
                ></v-stepper-item>
                <v-divider v-if="n !== 3" :key="n"></v-divider>
              </template>
            </v-stepper-header>
            <v-stepper-window>
              <v-stepper-window-item
                v-for="n in 3"
                :key="`${n}-content`"
                :value="n"
              >
                <PersonalInformation
                  v-if="n === 1"
                  @updateData="updateData"
                ></PersonalInformation>
                <LocationInformation
                  v-else-if="n === 2"
                  @updateData="updateData"
                ></LocationInformation>
                <UserInformation
                  v-else
                  @updateData="updateData"
                ></UserInformation>
              </v-stepper-window-item>
            </v-stepper-window>
            <VBtn color="error" @click="previo">Previo</VBtn>
            <VBtn v-if="step < 3" color="success" @click="siguiente"
              >Siguiente</VBtn
            >
            <VBtn v-if="step >= 3" color="success" @click="signUp"
              >Registro</VBtn
            >
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
  <DialogMessage
    v-if="dialogVisible"
    :color="color"
    :icon="icon"
    :title="tittle"
    :message="message"
  ></DialogMessage>
</template>

<script>
import { api } from "@/axios/axios";
import { toast } from "vue3-toastify";
import { defineAsyncComponent } from "vue";
export default {
  data() {
    return {
      step: 1,
      items: [
        this.$t("registration.personalInformation.titleString"),
        this.$t("registration.LocationDetails.titleString"),
        this.$t("registration.userdata.titleString"),
      ],
      FormData: {},
      errors: {},
      dialogVisible: false,
      progress: true,
      color: "",
      tittle: "",
      message: "",
      icon: "",
      overlay: false,
    };
  },
  methods: {
    updateData(formData, errors) {
      this.formData = Object.assign({}, this.formData, formData);
      this.errors = errors;
    },

    siguiente() {
      if (Object.values(this.errors).some((error) => error !== "")) {
        toast.warning("Por favor llene correctamente los campos");
        return;
      }
      if (!this.formData) {
        toast.warning("Por favor llene todos los campos");
        return;
      }
      if (
        Object.values(this.formData).every(
          (value) => value === "" || value === null || value === undefined,
        )
      ) {
        toast.warning("Por favor llene todos los campos");
        return;
      }
      if (
        Object.values(this.formData).some(
          (value) => value === "" || value === null || value === undefined,
        )
      ) {
        toast.warning("Por favor llene todos los campos");
        return;
      }

      if (this.step < 3) {
        this.step++;
      }
    },
    previo() {
      if (this.step > 1) this.step--;
    },
    signUp: async function () {
      if (this.formData.password !== this.formData.confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      if (!this.formData.agreeToTerms) {
        toast.error(
          "Por favor acepte los terminos y condiciones para el registro",
        );
        return;
      }
      this.tittle = "";
      this.message = "";
      this.icon = "";
      this.color = "";
      this.overlay = true;
      try {
        const direccion = {
          neighborhood: this.formData.neighborhood,
          numCasa: this.formData.numCasa,
          postalCode: this.formData.postalCode,
          ciudad: this.formData.ciudad,
          calle: this.formData.calle,
        };

        const datos = {
          name: this.formData.nombre,
          apellidoP: this.formData.apellidoPaterno,
          apellidoM: this.formData.apellidoMaterno,
          fechaNacimiento: this.formData.fechaNacimiento,
          genero: this.formData.sexo,
          cellPhone: this.formData.phone,
          imagen: this.formData.imagen,
          direccion: direccion,
          userName: this.formData.userName,
          email: this.formData.email,
          password: this.formData.password,
        };
        // Convertir el objeto `datos` a una cadena JSON
        const jsonData = JSON.stringify(datos);

        // Obtener la longitud de la cadena JSON en bytes
        const payloadSizeInBytes = new Blob([jsonData]).size;

        // Convertir de bytes a megabytes (MB)
        const payloadSizeInMB = payloadSizeInBytes / (1024 * 1024);

        console.log("Tamaño del payload:", payloadSizeInMB.toFixed(2), "MB");

        const { data } = await api.post("/user/signup", datos);

        if (!data.success) {
          this.tittle = this.$t("registration.alerts.tittleAlertError");
          this.message = data.msg;
          this.icon = "mdi-alert-octagon-outline";
          this.color = "red-darken-4";
          this.dialogVisible = true;
        } else {
          this.tittle = this.$t("registration.alerts.tittleAlertSuccess");
          this.message = data.msg;
          this.icon = "mdi-check-circle";
          this.color = "green-darken-3";
          this.dialogVisible = true;
          setTimeout(() => {
            this.$router.push({ name: "home-home" });
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    PersonalInformation: defineAsyncComponent(
      () => import("../components/PersonalData.vue"),
    ),
    LocationInformation: defineAsyncComponent(
      () => import("../components/LocationData.vue"),
    ),
    UserInformation: defineAsyncComponent(
      () => import("../components/UserData.vue"),
    ),
    DialogMessage: defineAsyncComponent(
      () => import("../components/Dialog.vue"),
    ),
  },
};
</script>

<style scoped>
/* Estilos personalizados para el encabezado del stepper */
.custom-stepper-header {
  background-color: #2e7d32 !important;
  /* green-darken-3 */
  color: white;
}
</style>
