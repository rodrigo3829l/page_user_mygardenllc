<template>
  <v-container>
    <!-- Primera fila -->
    <v-row dense>
      <!-- Columna para la imagen y la información del servicio -->
      <v-col cols="12" md="6">
        <v-img
          :src="service.img.secure_url"
          alt="Service Image"
          height="350"
          contain
        ></v-img>
        <h1 class="mt-2">{{ service.name }}</h1>
        <v-rating
          :model-value="service.Calificacion.total"
          color="amber"
          density="compact"
          half-increments
          readonly
        ></v-rating>
        <p>
          {{ service.Calificacion.total }} ({{ service.Calificacion.totales }}
          reviews)
        </p>
        <p>{{ service.description }}</p>
      </v-col>

      <!-- Columna para el formulario de agendar servicio -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title> Schedule Cleaning </v-card-title>
          <v-card-text>
            <v-form ref="scheduleForm">
              <v-textarea
                v-model="scheduleDescription"
                variant="underlined"
                color="green-darken-3"
                label="Description"
                clearable
                dense
                hide-details
                class="my-1"
              />

              <!-- <v-row dense>
                <v-col cols="8" class="d-flex align-center">
                  <v-file-input
                    v-model="scheduleImage"
                    variant="underlined"
                    color="green-darken-3"
                    label="Select Image"
                    clearable
                    @change="handleImageUpload"
                  ></v-file-input>
                </v-col>

                <v-col cols="4" class="d-flex align-center justify-center">
                  <v-row
                    v-if="!scheduleImagePreview"
                    class="image-preview"
                    justify="center"
                    align="center"
                  >
                    <div class="image-placeholder">Selected Image</div>
                  </v-row>

                  <v-img
                    v-else
                    :src="scheduleImagePreview"
                    alt="Selected Image"
                    max-width="150"
                    height="100"
                    class="my-3"
                  ></v-img>
                </v-col>
              </v-row> -->
              <v-row dense>
                <v-col cols="8" class="d-flex align-center">
                  <v-file-input
                    v-model="scheduleImage"
                    variant="underlined"
                    color="green-darken-3"
                    label="Select Image"
                    clearable
                    @change="handleImageUpload"
                  ></v-file-input>
                </v-col>

                <v-col cols="4" class="d-flex align-center justify-center">
                  <v-btn color="primary" @click="openCamera" class="mx-2">
                    Open Camera
                  </v-btn>
                </v-col>

                <v-col
                  cols="12"
                  class="d-flex align-center justify-center my-3"
                >
                  <video
                    ref="video"
                    width="150"
                    height="100"
                    autoplay
                    v-if="cameraActive"
                  ></video>
                  <v-img
                    v-else-if="scheduleImagePreview"
                    :src="scheduleImagePreview"
                    alt="Selected Image"
                    max-width="150"
                    height="100"
                    class="my-3"
                  ></v-img>
                  <div v-else class="image-placeholder">Selected Image</div>
                </v-col>
              </v-row>

              <v-btn
                color="green-darken-3"
                @click="capturePhoto"
                block
                v-if="cameraActive"
              >
                Capture Photo
              </v-btn>

              <v-text-field
                v-model="scheduleDate"
                variant="underlined"
                color="green-darken-3"
                label="Select Date"
                type="date"
                id="calendar"
              ></v-text-field>

              <div v-if="unavailableDates.length" class="mt-4 mb-4 text-center">
                <h3>Unavailable Dates</h3>
                <v-row dense justify="center">
                  <v-col
                    v-for="(days, month) in unavailableDatesGrouped"
                    :key="month"
                    cols="4"
                  >
                    <v-sheet class="pa-2 text-center" elevation="1">
                      <h4>{{ month }}</h4>
                      <p>{{ days.join(", ") }}</p>
                    </v-sheet>
                  </v-col>
                </v-row>
              </div>

              <v-btn color="green-darken-3" @click="quote" block>
                Schedule
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Segunda fila: Customer Reviews -->
    <v-row>
      <h1>Customer Reviews</h1>
      <v-col cols="12">
        <div v-if="!loaded">
          <Swiper
            :modules="modules"
            :breakpoints="breakpoints"
            :space-between="20"
            :loop="true"
            :navigation="navigationOptions"
            :pagination="paginationOptions"
          >
            <SwiperSlide v-for="i in 6" :key="i">
              <ComentsUserSkeleton></ComentsUserSkeleton>
            </SwiperSlide>
            <template v-slot:container-end>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-pagination"></div>
            </template>
          </Swiper>
        </div>
        <div v-else>
          <Swiper
            :modules="modules"
            :breakpoints="breakpoints"
            :space-between="20"
            :loop="true"
            :navigation="navigationOptions"
            :pagination="paginationOptions"
          >
            <SwiperSlide v-for="(comentario, i) in comentarios" :key="i">
              <div class="card-content">
                <ComentsUserCard
                  userAvatar="mdi-account"
                  :userName="
                    comentario.user.name +
                    ' ' +
                    comentario.user.apellidoP +
                    ' ' +
                    comentario.user.apellidoM
                  "
                  :commentText="comentario.comment"
                  :rating="comentario.rating"
                  :service="comentario.service.name"
                />
              </div>
            </SwiperSlide>
            <template v-slot:container-end>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-pagination"></div>
            </template>
          </Swiper>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="scheduleDialog" max-width="600" persistent>
      <v-sheet
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-4 text-center mx-auto"
      >
        <div>
          <v-icon class="mb-5" :color="color" :icon="icon" size="112"></v-icon>
          <h2 class="text-h5 mb-6">{{ tittle }}</h2>
          <p class="mb-4 text-medium-emphasis text-body-2">{{ message }}</p>
          <v-divider class="mb-4"></v-divider>
          <div class="text-end">
            <v-btn
              class="text-none"
              color="success"
              rounded
              variant="flat"
              width="90"
              @click="closeScheduleDialog"
            >
              {{ $t("service.pages.scheduleService.closeString") }}
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-dialog>
  </v-container>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
import { useUserStore } from "@/store/store";
import { api } from "@/axios/axios.js";
import { defineAsyncComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { nextTick } from "vue";

const userStore = useUserStore();

export default {
  components: {
    Swiper,
    SwiperSlide,
    ComentsUserCard: defineAsyncComponent(
      () => import("@/modules/shared/components/ComentsUserCard.vue"),
    ),
    ComentsUserSkeleton: defineAsyncComponent(
      () => import("@/modules/shared/components/CommentsUserSkeleton.vue"),
    ),
  },
  data() {
    return {
      cameraActive: false,
      videoStream: null,
      userStore,
      comentarios: [],
      calendar: false,
      loaded: false,
      minDate: new Date(),
      modules: [Pagination],
      paginationOptions: {
        el: ".swiper-pagination",
        clickable: true,
      },
      overlay: false,
      scheduleDialog: false,
      icon: "",
      tittle: "",
      message: "",
      color: "",
      service: {
        name: "",
        description: "",
        img: {
          secure_url: "",
        },
        Calificacion: {
          total: 0,
          totales: 0,
        },
      },
      scheduleDescription: "",
      scheduleImage: null,
      scheduleImagePreview: null,
      scheduleDate: null,
      load: false,
      errors: {
        image: "",
      },
      unavailableDates: [],
      unavailableDatesGrouped: {},
    };
  },
  methods: {
    async openCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.videoStream = stream;
        this.cameraActive = true;

        // Asegúrate de que el DOM se haya renderizado completamente
        await nextTick();

        if (this.$refs.video) {
          this.$refs.video.srcObject = stream;
        } else {
          console.error("No se encontró el elemento video.");
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    },
    capturePhoto() {
      const canvas = document.createElement("canvas");
      canvas.width = this.$refs.video.videoWidth;
      canvas.height = this.$refs.video.videoHeight;
      canvas.getContext("2d").drawImage(this.$refs.video, 0, 0);
      this.scheduleImagePreview = canvas.toDataURL("image/png");
      this.stopCamera();
    },
    stopCamera() {
      if (this.videoStream) {
        const tracks = this.videoStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      this.cameraActive = false;
    },
    async quote() {
      this.tittle = "";
      this.message = "";
      this.icon = "";
      this.color = "";
      this.closeScheduleDialog();
      this.overlay = true;
      const date = new Date(this.scheduleDate).toISOString().split("T")[0];
      const actualDate = new Date().toISOString().split("T")[0];
      console.log(date);
      try {
        if (date === actualDate) {
          this.tittle = this.$t("service.pages.scheduleService.script.busy");
          this.message = this.$t(
            "service.pages.scheduleService.script.busyMessage",
          );
          this.icon = "mdi-alert-octagon-outline";
          this.color = "gred-darken-4";
          this.openScheduleDialog();
          return;
        }
        const datos = {
          user: this.userStore.token,
          service: this.service._id,
          description: this.scheduleDescription,
          img: this.scheduleImagePreview,
          typeReserve: "online",
          scheduledTime: date,
        };
        console.log(datos);
        const { data } = await api.post("/schedule/schedule", datos);
        if (data.success === false) {
          this.tittle = this.$t("service.pages.scheduleService.script.error");
          this.message = data.msg;
          this.icon = "mdi-alert-octagon-outline";
          this.color = "red-darken-4";
          this.openScheduleDialog();
        } else {
          this.tittle = this.$t("service.pages.scheduleService.script.success");
          this.message = data.msg;
          this.icon = "mdi-check-circle";
          this.color = "green-darken-3";
          this.openScheduleDialog();
          setTimeout(() => {
            this.$router.push({
              name: "profile-myservices",
            });
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.overlay = false;
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];

      // Check if a file is selected
      this.errors.image = !file ? this.$t("registration.alerts.imageFile") : "";

      // Check the file size (in bytes)
      const maxSize = 4 * 1024 * 1024; // 4 megabytes
      this.errors.image =
        file.size > maxSize ? this.$t("registration.alerts.sizeFile") : "";

      // Read the image as a Blob object
      const reader = new FileReader();
      reader.onload = (e) => {
        this.scheduleImagePreview = e.target.result;
      };

      // Check if the file type is an image
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else {
        this.errors.image = this.$t("registration.alerts.validImage");
      }
    },
    openScheduleDialog() {
      this.scheduleDialog = true;
    },
    closeScheduleDialog() {
      this.scheduleDialog = false;
    },
    allowedDates(val) {
      return !this.unavailableDates.includes(this.$vuetify.date.toISO(val));
    },
    async getDates() {
      try {
        const { data } = await api.get("/dates/get");
        console.log(data);
        this.unavailableDates = data.dates.map(
          (item) => item.date.split("T")[0],
        );
        this.groupUnavailableDates();
      } catch (error) {
        console.log(error);
      }
    },
    groupUnavailableDates() {
      const grouped = this.unavailableDates.reduce((acc, date) => {
        const [year, month, day] = date.split("-");
        const monthName = new Date(year, month - 1).toLocaleString("default", {
          month: "long",
        });
        if (!acc[monthName]) acc[monthName] = [];
        acc[monthName].push(parseInt(day));
        return acc;
      }, {});
      this.unavailableDatesGrouped = grouped;
    },
    async fetchService() {
      try {
        this.overlay = true;
        const { data } = await api.get(
          `/services/getservice/${this.$route.params.id}`,
        );
        this.service = data.service;
        console.log(this.service);
      } catch (error) {
        console.log(error);
      } finally {
        this.overlay = false;
        this.load = true;
      }
    },
    async fetchComments() {
      try {
        const { data } = await api.get(`/comment/get/${this.$route.params.id}`);
        this.comentarios = data.comments;
      } catch (error) {
        console.log(error);
      } finally {
        this.loaded = true;
      }
    },
    async scheduleService() {
      console.log(this.scheduleDate);
    },
  },
  created() {
    this.getDates();
    this.fetchService();
    this.fetchComments();
  },
};
</script>

<style scoped>
.v-card {
  padding: 10px;
}

.swiper-button-prev,
.swiper-button-next {
  color: #2e7d32;
}

.swiper-pagination {
  color: #2e7d32;
}

.image-preview {
  width: 80%;
  height: 100px;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  margin: 10px;
}

.image-placeholder {
  font-size: 14px;
  color: #666;
  position: absolute;
  z-index: 1;
  user-select: none;
  text-align: center;
  width: 80%;
  padding: 60px 0;
}
</style>
