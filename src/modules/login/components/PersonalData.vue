<template>
  <h3 class="text-h6">
    {{ $t("registration.personalInformation.titleString") }}
  </h3>

  <br />
  <v-row>
    <v-col cols="12" md="6">
      <v-text-field
        :label="$t('registration.personalInformation.firstNameString')"
        v-model="formData.nombre"
        required
        :error-messages="errors.nombre"
        variant="underlined"
        color="green-darken-3"
        @input="validateName"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        :label="$t('registration.personalInformation.lastNameString')"
        v-model="formData.apellidoPaterno"
        required
        :error-messages="errors.apellidoPaterno"
        variant="underlined"
        color="green-darken-3"
        @input="validateApellidoP"
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
        @input="validateApellidoM"
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
        @input="validateDate"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-select
        :label="$t('registration.personalInformation.genderString')"
        v-model="formData.sexo"
        @update:focused="validateSex"
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
            :label="$t('registration.personalInformation.ladeString')"
            :error-messages="errors.lada"
            @update:focused="validateLade"
            variant="underlined"
            color="green-darken-3"
          ></v-select>
        </v-col>
        <v-col cols="8">
          <v-text-field
            :label="$t('registration.personalInformation.phoneString')"
            v-model="formData.phone"
            required
            :error-messages="errors.phone"
            type="number"
            @blur="validatePhone"
            variant="underlined"
            color="green-darken-3"
            :prefix="formData.lada ? formData.lada.split(' ')[0] : ''"
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
  <v-row>
    <v-col cols="12" md="6">
      <v-file-input
        @change="validateImage"
        accept="image/*"
        :error-messages="errors.image"
        :label="$t('registration.personalInformation.selectPictureString')"
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
      <v-row v-else class="image-preview" justify="center" align="center">
        <div class="image-placeholder">
          {{ $t("registration.personalInformation.selectImageString") }}
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { 
  nameValidate,
  dateValidate,
  phoneValidate,

 } from '@/plugins/validations';
export default {
  data () {
    return {
      formData : {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        sexo: '',
        lada: '',
        phone: '',
        imagen: null,
      },
      errors : {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        phone: '',
        lada: '',
        image: '',
      }
    }
  },
  methods : {
    validateImage () {
      const file = event.target.files[0];

      // Check if a file is selected
      this.errors.image = (!file) ? this.$t('registration.alerts.imageFile') : '';

      // Check the file size (in bytes)
      const maxSize = 4 * 1024 * 1024; // 4 megabytes
      this.errors.image = (file.size > maxSize) ? this.$t('registration.alerts.sizeFile')  : '';

      // Read the image as a Blob object
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.imagen = e.target.result;
        this.$emit('updateData', this.formData, this.errors);
      };
      
      // Check if the file type is an image
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        this.$emit('updateData', this.formData, this.errors);
        this.errors.image = this.$t('registration.alerts.validImage') ;
      }
      
    },
    validateSex() {
      this.$emit('updateData', this.formData, this.errors);
    },
    validateName () {
      console.log('click en el name')
      this.errors.nombre = nameValidate(this.formData.nombre)
      this.$emit('updateData', this.formData, this.errors);
    },
    validateDate () {
      this.errors.fechaNacimiento = dateValidate(this.formData.fechaNacimiento)
      this.$emit('updateData', this.formData, this.errors);
    },
    validateApellidoP () {
      this.errors.apellidoPaterno = nameValidate(this.formData.apellidoPaterno)
      this.$emit('updateData', this.formData, this.errors);
    },
    validateApellidoM () {
      this.errors.apellidoMaterno = nameValidate(this.formData.apellidoMaterno)
      this.$emit('updateData', this.formData, this.errors);
    },
    validateLade () {
      this.errors.lada = (!this.formData.lada)
        ? this.$t('registration.alerts.lade') 
        : '';
      this.$emit('updateData', this.formData, this.errors);
    },
    async validatePhone () {
      let lada = this.formData.lada.split(' ')[0]; // "+1"
      let number = lada.replace('+', ''); // "1"
      this.errors.phone = await phoneValidate(number, this.formData.phone)
      this.$emit('updateData', this.formData, this.errors);
    },
    
  }
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
</style>