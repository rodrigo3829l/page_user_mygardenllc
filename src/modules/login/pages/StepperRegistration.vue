<template>
  <v-breadcrumbs :items="routes">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8" lg="16">
        <v-card class="elevation-12">
          <v-stepper alt-labels v-model="step" :items="items" hide-actions>
            <template v-slot:item.1>
              <h3 class="text-h6">
                {{ $t("registration.personalInformation.titleString") }}
              </h3>

              <br />
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    :label="
                      $t('registration.personalInformation.firstNameString')
                    "
                    v-model="formData.nombre"
                    required
                    :error-messages="errors.nombre"
                    variant="underlined"
                    color="green-darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :label="
                      $t('registration.personalInformation.lastNameString')
                    "
                    v-model="formData.apellidoPaterno"
                    required
                    :error-messages="errors.apellidoPaterno"
                    variant="underlined"
                    color="green-darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :label="$t('registration.personalInformation.middleString')"
                    v-model="formData.apellidoMaterno"
                    required
                    :error-messages="errors.apellidoMaterno"
                    variant="underlined"
                    color="green-darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :label="$t('registration.personalInformation.dateString')"
                    type="date"
                    v-model="formData.fechaNacimiento"
                    required
                    :error-messages="errors.fechaNacimiento"
                    variant="underlined"
                    color="green-darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    :label="$t('registration.personalInformation.genderString')"
                    v-model="formData.sexo"
                    :items="[
                      $t('registration.personalInformation.maleString'),
                      $t('registration.personalInformation.femaleString'),
                    ]"
                    required
                    variant="underlined"
                    color="green-darken-3"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-row align="center">
                    <v-col cols="4">
                      <v-select
                        v-model="formData.lada"
                        :items="['+1 (USA)', '+52 (Mexico)']"
                        :label="
                          $t('registration.personalInformation.ladeString')
                        "
                        :error-messages="errors.lada"
                        variant="underlined"
                        color="green-darken-3"
                      ></v-select>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        :label="
                          $t('registration.personalInformation.phoneString')
                        "
                        v-model="formData.phone"
                        required
                        :error-messages="errors.phone"
                        type="number"
                        variant="underlined"
                        color="green-darken-3"
                        :prefix="
                          formData.lada ? formData.lada.split(' ')[0] : ''
                        "
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <h3 class="text-h6">
                {{ $t("registration.personalInformation.titlePictureString") }}
              </h3>

              <br />
              <!-- <v-row>
                <v-col cols="12" md="6">
                  <v-file-input
                    @change="handleImageUpload"
                    accept="image/*"
                    :error-messages="errors.image"
                    :label="
                      $t('registration.personalInformation.selectPictureString')
                    "
                  ></v-file-input>
                </v-col>
                <v-col cols="12" md="6">
                  <v-img
                    v-if="formData.imagen"
                    :src="formData.imagen"
                    alt="Selected Image"
                    class="image-preview"
                    contain
                  ></v-img>
                  <v-row
                    v-else
                    class="image-preview"
                    justify="center"
                    align="center"
                  >
                    <div class="image-placeholder">
                      {{
                        $t("registration.personalInformation.selectImageString")
                      }}
                    </div>
                  </v-row>
                </v-col>
              </v-row> -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-file-input
                    @change="handleImageUpload"
                    accept="image/*"
                    :error-messages="errors.image"
                    :label="
                      $t('registration.personalInformation.selectPictureString')
                    "
                  ></v-file-input>
                  <v-btn
                    @click="openCamera"
                    color="green-darken-3"
                    class="mt-2"
                  >
                    Abrir Cámara
                  </v-btn>
                </v-col>

                <v-col cols="12" md="6">
                  <video
                    ref="video"
                    width="200"
                    height="150"
                    autoplay
                    v-if="cameraActive"
                  ></video>

                  <v-img
                    v-else-if="formData.imagen"
                    :src="formData.imagen"
                    alt="Selected Image"
                    class="image-preview"
                    contain
                  ></v-img>

                  <v-row
                    v-else
                    class="image-preview"
                    justify="center"
                    align="center"
                  >
                    <div class="image-placeholder">
                      {{
                        $t("registration.personalInformation.selectImageString")
                      }}
                    </div>
                  </v-row>

                  <v-btn
                    @click="capturePhoto"
                    color="green-darken-3"
                    class="mt-2"
                    v-if="cameraActive"
                  >
                    Capturar Foto
                  </v-btn>
                </v-col>
              </v-row>

              <v-btn
                v-if="step > 1"
                @click="step--"
                color="red-darken-4"
                variant="text"
              >
                {{ $t("registration.buttons.buttonPreviousString") }}
              </v-btn>
              <v-btn
                v-if="step !== items.length"
                @click="validateInformation"
                color="green-darken-3"
                variant="text"
              >
                {{ $t("registration.buttons.buttonNextString") }}
              </v-btn>
            </template>

            <template v-slot:item.2>
              <h3 class="text-h6">
                {{ $t("registration.LocationDetails.titleString") }}
              </h3>

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
                    v-model="formData.city"
                    :label="$t('registration.LocationDetails.cityString')"
                    color="green-darken-3"
                    required
                    :disabled="true"
                    :error-messages="errors.city"
                    variant="underlined"
                  ></v-autocomplete>

                  <v-select
                    v-model="formData.street"
                    :label="$t('registration.LocationDetails.streetString')"
                    required
                    :disabled="!cpValidate"
                    :error-messages="errors.street"
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
                    :label="
                      $t('registration.LocationDetails.neighborhoodString')
                    "
                    required
                    :disabled="!cpValidate"
                    :placeholder="
                      $t(
                        'registration.LocationDetails.placeholderNeighboorhood',
                      )
                    "
                    :error-messages="errors.neighborhood"
                    variant="underlined"
                    color="green-darken-3"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.houseNumber"
                    :label="$t('registration.LocationDetails.houseString')"
                    required
                    :disabled="!cpValidate"
                    :error-messages="errors.houseNumber"
                    variant="underlined"
                    color="green-darken-3"
                    :placeholder="
                      $t('registration.LocationDetails.placeholderNumHouse')
                    "
                    type="number"
                  ></v-text-field>

                  <v-btn
                    v-if="step > 1"
                    @click="step--"
                    color="red-darken-4"
                    variant="text"
                  >
                    {{ $t("registration.buttons.buttonPreviousString") }}
                  </v-btn>
                  <v-btn
                    v-if="step !== items.length"
                    @click="validateDirecion"
                    color="green-darken-3"
                    variant="text"
                    :disabled="!cpValidate"
                  >
                    {{ $t("registration.buttons.buttonNextString") }}
                  </v-btn>
                </v-col>
              </v-row>
            </template>

            <template v-slot:item.3>
              <h3 class="text-h6">
                {{ $t("registration.userdata.titleString") }}
              </h3>
              <!-- DE AQUI EN ADELANTE NO APARECEN NI LOS CAMPOS NI LOS BOTONES -->
              <br />
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formData.userName"
                    :label="$t('registration.userdata.userString')"
                    color="green-darken-3"
                    required
                    :error-messages="errors.userName"
                    variant="underlined"
                    :placeholder="$t('registration.userdata.userNameString')"
                  ></v-text-field>
                  <!-- Este es el problema -->
                  <!-- <v-text-field
                    v-model="formData.email"
                    label="Username"
                    required
                    :error-messages="errors.email"
                    variant="underlined"
                    placeholder="ex User38"
                    type="email"
                    color="green-darken-3"
                  ></v-text-field> -->
                  <v-text-field
                    v-model="formData.email"
                    :label="$t('registration.userdata.emailString')"
                    required
                    :error-messages="errors.email"
                    variant="underlined"
                    :placeholder="$t('registration.userdata.userEmailString')"
                    type="email"
                    color="green-darken-3"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.password"
                    :label="$t('registration.userdata.passwordString')"
                    required
                    :error-messages="errors.password"
                    variant="underlined"
                    color="green-darken-3"
                    :placeholder="$t('registration.userdata.helloString')"
                    :append-inner-icon="
                      passwordVisible ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    :type="passwordVisible ? 'text' : 'password'"
                    outlined
                    @click:append-inner="togglePasswordVisibility"
                    @input="checkStrength"
                  ></v-text-field>

                  <div v-if="formData.password.length > 0">
                    <v-progress-linear
                      :color="formData.color"
                      height="10"
                      :model-value="formData.passwordStrength"
                      striped
                    ></v-progress-linear>

                    <span
                      v-if="
                        formData.passwordStrength >= 0 &&
                        formData.passwordStrength < 50
                      "
                      class="red--text"
                      >{{
                        $t("registration.userdata.veryWeakPasswordString")
                      }}</span
                    >
                    <span
                      v-else-if="
                        formData.passwordStrength >= 50 &&
                        formData.passwordStrength < 75
                      "
                      class="red--text"
                      >{{
                        $t("registration.userdata.weakPasswordString")
                      }}</span
                    >
                    <span
                      v-else-if="
                        formData.passwordStrength >= 75 &&
                        formData.passwordStrength < 100
                      "
                      class="orange--text"
                      >{{ $t("registration.userdata.goodPassword") }}</span
                    >
                    <span v-else class="green--text">{{
                      $t("registration.userdata.excellentPassword")
                    }}</span>
                  </div>

                  <v-text-field
                    v-model="formData.confirmPassword"
                    :label="$t('registration.userdata.confirmPasswordString')"
                    required
                    :error-messages="errors.confirmPassword"
                    variant="underlined"
                    color="green-darken-3"
                    :placeholder="$t('registration.userdata.helloString')"
                    :append-inner-icon="
                      passwordVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    :type="passwordVisibleConfirm ? 'text' : 'password'"
                    outlined
                    @click:append-inner="togglePasswordVisibilityConfirm"
                  ></v-text-field>

                  <v-checkbox
                    v-model="formData.agreeToTerms"
                    :required="true"
                    :error-messages="errors.agreeToTerms"
                    :label="$t('registration.userdata.descriptionString')"
                    color="green-darken-3"
                  ></v-checkbox>

                  <v-btn
                    v-if="step > 1"
                    @click="step--"
                    color="red-darken-4"
                    variant="text"
                  >
                    {{ $t("registration.buttons.buttonPreviousString") }}
                  </v-btn>
                  <v-btn
                    :disabled="!formData.agreeToTerms"
                    @click="validateUser"
                    color="green-darken-3"
                    variant="text"
                  >
                    {{ $t("registration.buttons.signUp") }}
                  </v-btn>
                </v-col>
              </v-row>
            </template>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialogVisible" width="500">
    <v-sheet
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
        v-if="progress"
      ></v-progress-circular>
      <div v-if="!progress">
        <v-icon class="mb-5" :color="color" :icon="icon" size="112"></v-icon>

        <h2 class="text-h5 mb-6">{{ tittle }}</h2>

        <p class="mb-4 text-medium-emphasis text-body-2">
          {{ message }}
        </p>

        <v-divider class="mb-4"></v-divider>

        <div class="text-end">
          <v-btn
            class="text-none"
            :color="color"
            rounded
            variant="flat"
            width="90"
            @click="dialogVisible = false"
          >
            okey
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { api } from "@/axios/axios";
import axios from "axios";
// import zxcvbn from 'zxcvbn';

export default {
  data() {
    return {
      formData: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        fechaNacimiento: "",
        sexo: "",
        lada: "",
        phone: "",
        imagen: null,
        postalCode: "",
        userName: "",
        email: "",
        password: "",
        passwordStrength: 0,
        color: "",
        confirmPassword: "",
        houseNumber: "",
        street: "",
        neighborhood: "",
        city: "",
      },
      cameraActive: false,
      videoStream: null,
      shipping: 0,
      step: 1,
      items: [
        this.$t("registration.personalInformation.titleString"),
        this.$t("registration.LocationDetails.titleString"),
        this.$t("registration.userdata.titleString"),
      ],
      routes: [
        {
          title: "Home",
          disabled: false,
          href: "/home/homeuser",
        },
        {
          title: "Register",
          disabled: false,
          href: "/login/registration",
        },
      ],
      // Error messages for each field
      errors: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        fechaNacimiento: "",
        phone: "",
        lada: "",
        city: "",
        neighborhood: "",
        street: "",
        houseNumber: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
        postalCode: "",
      },
      progress: true,
      dialogVisible: false,
      color: "",
      tittle: "",
      message: "",
      icon: "",
      passwordVisibleConfirm: false,
      passwordVisible: false,
      cpValidate: false,
      loadBtn: false,
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

        // Espera a que el DOM se actualice
        await this.$nextTick();

        if (this.$refs.video) {
          this.$refs.video.srcObject = stream;
        } else {
          console.error("No se encontró el elemento video.");
        }
      } catch (error) {
        console.error("Error al acceder a la cámara:", error);
      }
    },
    capturePhoto() {
      const canvas = document.createElement("canvas");
      canvas.width = this.$refs.video.videoWidth;
      canvas.height = this.$refs.video.videoHeight;
      canvas.getContext("2d").drawImage(this.$refs.video, 0, 0);
      this.formData.imagen = canvas.toDataURL("image/png");
      this.stopCamera();
    },
    stopCamera() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
      }
      this.cameraActive = false;
    },
    checkStrength() {
      let score = 0;

      // Evaluar la contraseña usando criterios básicos
      if (this.formData.password.length >= 8) score++; // Longitud mínima de 8 caracteres
      if (/[A-Z]/.test(this.formData.password)) score++; // Contiene al menos una letra mayúscula
      if (/[0-9]/.test(this.formData.password)) score++; // Contiene al menos un número
      if (/[\W_]/.test(this.formData.password)) score++; // Contiene un carácter especial

      console.log(score);

      // Asignar la puntuación y color según el puntaje obtenido
      switch (score) {
        case 0:
          this.formData.passwordStrength = 0;
          this.formData.color = "red-darken-4";
          break;
        case 1:
          this.formData.passwordStrength = 25;
          this.formData.color = "red-darken-4";
          break;
        case 2:
          this.formData.passwordStrength = 50;
          this.formData.color = "orange-darken-4";
          break;
        case 3:
          this.formData.passwordStrength = 75;
          this.formData.color = "deep-orange-darken-4";
          break;
        case 4:
          this.formData.passwordStrength = 100;
          this.formData.color = "green-darken-4";
          break;
        default:
          // Mantén el valor anterior si no hay coincidencias.
          break;
      }
    },

    // falta este de validar
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
        const response = await axios.get(
          `https://api.zippopotam.us/us/${this.formData.postalCode}`,
        );
        const data = response.data;

        // Verifica si el lugar es Atlanta
        const placeName = data.places[0]["place name"];
        console.log(placeName);
        if (placeName.toLowerCase() === "atlanta") {
          this.errors.postalCode = "";
          this.cpValidate = true;
          this.formData.city = placeName; // Asigna el nombre del lugar al campo de ciudad
        } else {
          this.errors.postalCode = this.$t("registration.alerts.serviceOnly"); // Mensaje de error si no es Atlanta
          this.cpValidate = false;
        }
      } catch (error) {
        console.error("Error fetching postal code info:", error);
        this.errors.postalCode = this.$t("registration.alerts.postalCode");
        this.cpValidate = false;
      } finally {
        this.loadBtn = false;
      }
    },

    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    togglePasswordVisibilityConfirm() {
      this.passwordVisibleConfirm = !this.passwordVisibleConfirm;
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
        this.formData.imagen = e.target.result;
      };

      // Check if the file type is an image
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else {
        this.errors.image = this.$t("registration.alerts.validImage");
      }
    },

    async validateInformation() {
      let lada = this.formData.lada.split(" ")[0]; // "+1"
      let number = lada.replace("+", ""); // "1"
      console.log(number); // Imprime: 1

      // Validation for Personal Information step
      this.errors.nombre =
        this.formData.nombre.length < 3 ||
        !/^[a-zA-ZüÜáéíóúÁÉÍÓÚñÑ' ]+$/.test(this.formData.nombre)
          ? this.$t("registration.alerts.firstName")
          : "";

      this.errors.apellidoPaterno =
        this.formData.apellidoPaterno.length < 4 ||
        !/^[a-zA-ZüÜáéíóúÁÉÍÓÚñÑ' ]+$/.test(this.formData.apellidoPaterno)
          ? this.$t("registration.alerts.lastName")
          : "";

      this.errors.apellidoMaterno =
        this.formData.apellidoMaterno.length < 4 ||
        !/^[a-zA-ZüÜáéíóúÁÉÍÓÚñÑ' ]+$/.test(this.formData.apellidoMaterno)
          ? this.$t("registration.alerts.maidenName")
          : "";

      this.errors.fechaNacimiento =
        new Date().getFullYear() -
          new Date(this.formData.fechaNacimiento).getFullYear() <
        18
          ? this.$t("registration.alerts.dateBirth")
          : "";
      this.errors.lada = !this.formData.lada
        ? this.$t("registration.alerts.lade")
        : "";

      // Validación del número de teléfono con la API
      try {
        const response = await axios.get(
          `https://api.apilayer.com/number_verification/validate?number=${number}${this.formData.phone}`,
          {
            headers: {
              apikey: "isWBK7I7wNGIiFCcBpYICqSUGrKgpdDw",
            },
          },
        );
        console.log(response);
        if (response.data.valid) {
          this.errors.phone = "";
        } else {
          this.errors.phone = this.$t("registration.alerts.number");
        }
      } catch (error) {
        console.error(error);
        this.errors.phone = this.$t("registration.alerts.validatingPhone");
      }

      if (Object.values(this.errors).some((error) => error !== "")) {
        return;
      }
      console.log(this.formData.imagen);
      this.step++;
    },
    validateDirecion() {
      // Validation for Location Details step
      this.errors.city = !this.formData.city
        ? this.$t("registration.alerts.city")
        : "";

      // Define the regex pattern to match valid characters
      const validPattern = /^[a-zA-Z0-9\s'#]+$/;
      const hasInvalidChars = !validPattern.test(this.formData.neighborhood);
      if (!this.formData.neighborhood) {
        this.errors.neighborhood = this.$t("registration.alerts.neighborhood");
      }

      // Check for invalid characters
      else if (hasInvalidChars) {
        this.errors.neighborhood = this.$t("registration.alerts.invalidChars");
      } else {
        this.errors.neighborhood = "";
      }

      this.errors.street = !this.formData.street
        ? this.$t("registration.alerts.street")
        : "";
      this.errors.houseNumber =
        this.formData.houseNumber.length < 3 ||
        !/^\d+$/.test(this.formData.houseNumber)
          ? this.$t("registration.alerts.houseNumber")
          : "";

      if (Object.values(this.errors).some((error) => error !== "")) {
        return;
      }
      this.step++;
    },
    validateUser() {
      // Validation for User Data step
      this.errors.userName =
        !this.formData.userName ||
        this.formData.userName.length < 6 ||
        !/^[a-zA-Z0-9]+$/.test(this.formData.userName)
          ? this.$t("registration.alerts.userName")
          : "";
      this.errors.email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(
        this.formData.email,
      )
        ? ""
        : this.$t("registration.alerts.email");

      if (this.formData.password === this.formData.confirmPassword) {
        this.errors.confirmPassword = "";
        this.errors.password = "";
      }
      if (this.formData.password < 6) {
        this.errors.password = this.$t("registration.alerts.alertLength");
      }

      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(this.formData.password)) {
        this.errors.password = this.$t("registration.alerts.alertUppercase");
      }

      // Check for at least one number
      if (!/\d/.test(this.formData.password)) {
        this.errors.password = this.$t("registration.alerts.alertNumber");
      }

      // Check for only one special character
      const specialCharCount = (
        this.formData.password.match(/[^A-Za-z0-9]/g) || []
      ).length;
      if (specialCharCount !== 1) {
        this.errors.password = this.$t("registration.alerts.alertCharacter");
      }

      if (this.formData.confirmPassword < 6) {
        this.errors.confirmPassword = this.$t(
          "registration.alerts.alertLength",
        );
      }

      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(this.formData.confirmPassword)) {
        this.errors.confirmPassword = this.$t(
          "registration.alerts.alertUppercase",
        );
      }

      // Check for at least one number
      if (!/\d/.test(this.formData.confirmPassword)) {
        this.errors.confirmPassword = this.$t(
          "registration.alerts.alertNumber",
        );
      }

      // Check for only one special character
      const specialCharCountTwo = (
        this.formData.confirmPassword.match(/[^A-Za-z0-9]/g) || []
      ).length;
      if (specialCharCountTwo !== 1) {
        this.errors.confirmPassword = this.$t(
          "registration.alerts.alertCharacter",
        );
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = this.$t("registration.alerts.dontMatch");
        this.errors.password = this.$t("registration.alerts.dontMatch");
      }

      if (Object.values(this.errors).some((error) => error !== "")) {
        return;
      }
      this.signUp();
    },
    signUp: async function () {
      this.tittle = "";
      this.message = "";
      this.icon = "";
      this.color = "";
      this.dialogVisible = true;
      this.progress = true;
      try {
        const direccion = {
          estado: this.formData.neighborhood,
          numCasa: this.formData.houseNumber,
          postalCode: this.formData.postalCode,
          ciudad: this.formData.city,
          calle: this.formData.street,
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
          img: this.formData.imagen,
        };

        console.log("Datos:", datos);

        // Usar async/await ya que api.post devuelve una Promise
        const { data } = await api.post("/user/signup", datos);

        if (data.success === false) {
          this.tittle = this.$t("registration.alerts.tittleAlertError");
          this.message = data.msg;
          this.icon = "mdi-alert-octagon-outline";
          this.color = "red-darken-4";
          this.progress = false;
        } else {
          this.tittle = this.$t("registration.alerts.tittleAlertSuccess");
          this.message = data.msg;
          this.icon = "mdi-check-circle";
          this.color = "green-darken-3";
          this.progress = false;
          setTimeout(() => {
            this.$router.push({
              name: "home-home",
            });
          }, 2000);
        }
      } catch (error) {
        this.$router.push({
          name: "serverError",
        });
        // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
      }
    },
  },
};
</script>

<style scoped>
.max-width-card {
  margin: 50px auto;
  max-width: 600px;
}

.image-preview {
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
}

.image-placeholder {
  font-size: 14px;
  color: #666;
  position: absolute;
  z-index: 1;
  user-select: none;
  text-align: center;
  width: 100%;
  padding: 60px 0;
}

.red--text {
  color: red;
}

.orange--text {
  color: orange;
}

.green--text {
  color: green;
}
</style>
