<template>
  <v-breadcrumbs :items="bread">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-container class="container">
    <v-card>
      <v-card-title class="green darken-1 white--text">
        <h2>{{ service.name }}</h2>
        <!-- <h2>Ejemplo de servicio</h2> -->
      </v-card-title>
      <v-card-text>
        <p>{{ service.descriptio }}</p><br>
        <p>{{ service.Clificacion }}</p><br>
        <v-divider></v-divider>
        <br>
        <label>{{ $t('service.pages.scheduleService.descriptionString') }}</label>
        <br>
        <v-textarea
          outlined
          name="descripcion"
          :label="$t('service.pages.scheduleService.describeServiceString')"
          rows="4"
          :error-messages="this.errors.description"
          v-model="formData.description"
        ></v-textarea>

        
        
        <v-row align="center">
          <v-col cols="12" sm="6" class="d-flex flex-column justify-center" @dragover.prevent>
            
            <v-file-input
              :label="$t('service.pages.scheduleService.selectPhotoString')"
              @change="handleImageUpload"
              @drop.prevent = "handleImageDrop"
              accept="image/*"
              :error-messages="this.errors.image"
              prepend-icon="mdi-camera"
              outlined
            ></v-file-input>

            <div class="image-preview" v-if="formData.imagen">
              <v-img :src="formData.imagen" aspect-ratio="1" contain></v-img>
            </div>
            <div v-else class="image-placeholder" @dragover.prevent>
              {{ $t('service.pages.scheduleService.dragImageString') }}
            </div>
          </v-col>



          <v-col cols="12" sm="6">
            <v-row justify="space-around">
              <v-date-picker
              width="400"
              color="green-darken-3"
                v-model="date"
                :allowed-dates="allowedDates"
                :min="minDate"
              ></v-date-picker>
            </v-row>
          </v-col>
        </v-row>

      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <router-link :to="{name: 'services-services'}">
          <!-- <v-btn color="red darken-1" text>Cancelar</v-btn> -->
        </router-link>
          <v-btn color="green darken-1" @click="validate()" text>{{ $t('service.pages.scheduleService.scheduleString') }}</v-btn>
      </v-card-actions>
    </v-card>
    
    <v-dialog v-model="scheduleDialog" max-width="600" persistent >
      <v-sheet
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-4 text-center mx-auto"
        
      >
        <div>
          <v-icon
            class="mb-5"
            :color="color"
            :icon="icon"
            size="112"
          ></v-icon>
  
          <h2 class="text-h5 mb-6">{{ tittle }}</h2>
  
          <p class="mb-4 text-medium-emphasis text-body-2">
            {{ message }}
          </p>
  
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
              {{ $t('service.pages.scheduleService.closeString') }}
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-dialog>
  </v-container>
    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>

<script>
import {api} from '@/axios/axios.js'
import { useUserStore } from '@/store/store';

const userStore = useUserStore();
export default {
  data() {
    return {
      bread: [
        {
          title: 'Home',
          disabled: false,
          href: '/home/homeuser',
        },
        {
          title: 'services',
          disabled: false,
          href: '/services/servicespage',
        },
        {
          title: 'Schedule service',
          disabled: true,
          href: '/services/schedule/id',
        },
      ],
      formData: {
        imagen: null,
        description : ''
      },
      menu: false,
      rating: 0,
      date: new Date(),
      minDate : new Date(),
      unavailableDates: [],
      service : [],
      userStore,
      scheduleDialog : false,
      overlay : false,
      icon : '',
      tittle : '',
      message : '',
      color : '',
      errors : {
        description : '',
        image : ''
      }
    };
  },
  methods: {
    validate(){
      this.errors.description = (!this.formData.description) 
        ? this.$t('service.pages.scheduleService.script.description')
        : ''

      this.errors.image = (!this.formData.imagen) 
        ? this.$t('registration.alerts.imageFile') 
        : '';

        if (Object.values(this.errors).some(error => error !== '')) {
          return;
        }

        this.quote()
    },
    openScheduleDialog() {
      this.scheduleDialog = true
    },
    closeScheduleDialog() {
      this.scheduleDialog = false
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.processImage(file);
    },
    handleImageDrop(event) {
      const file = event.dataTransfer.files[0];
      this.processImage(file);
    },
    processImage(file) {
      // Check if a file is selected
      this.errors.image = (!file) ? this.$t('service.pages.scheduleService.script.imageRequired') : '';

      // Check the file size (in bytes)
      const maxSize = 4 * 1024 * 1024; // 4 megabytes
      this.errors.image = (file.size > maxSize) ? this.$t('registration.alerts.sizeFile') : '';

      // Read the image as a Blob object
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.imagen = e.target.result;
      };

      // Check if the file type is an image
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        this.errors.image = this.$t('registration.alerts.validImage');
      }
    },
    allowedDates(val) {
      return !this.unavailableDates.includes(this.$vuetify.date.toISO(val))
    },
    async getDates(){
      try {
        const {data} = await api.get('/dates/get')
        console.log(data)
        this.unavailableDates = data.dates.map(item => item.date.split('T')[0])
      } catch (error) {
        console.log(error)
      }
    },
    async quote(){
      this.tittle = ''
      this.message = ''
      this.icon = ''
      this.color = ''
      this.closeScheduleDialog()
      this.overlay = true
      const date = new Date(this.date).toISOString().split('T')[0];
      const actualDate = new Date().toISOString().split('T')[0];
      console.log(date)
      try {
        if(date === actualDate){
          this.tittle = this.$t('service.pages.scheduleService.script.busy')
          this.message = this.$t('service.pages.scheduleService.script.busyMessage')
          this.icon = 'mdi-alert-octagon-outline'
          this.color = 'gred-darken-4'
          this.openScheduleDialog()
          return
        } 
        const datos = {
          user : this.userStore.token,
          service : this.service._id,
          description : this.formData.description ,
          img : {
            public_id : "aksdbaskdjas",
            secure_url : "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg"
          },
          typeReserve : "online",
          scheduledTime : date
        }
        const {data} = await api.post('/schedule/schedule', datos)
        if(data.success === false){
          this.tittle = this.$t('service.pages.scheduleService.script.error')
          this.message = data.msg
          this.icon = 'mdi-alert-octagon-outline'
          this.color = 'red-darken-4'
          this.openScheduleDialog()
        }else{
          this.tittle = this.$t('service.pages.scheduleService.script.success')
          this.message = data.msg
          this.icon = 'mdi-check-circle'
          this.color = 'green-darken-3'
          this.openScheduleDialog()
          setTimeout(() => {
            this.$router.push({ name: 'profile-myservices' });
          }, 2000);
        }
      } catch (error) {
        console.log(error)
      }finally{
        this.overlay = false
      }
    },
    async getService (){
      try {
        const {data} = await api.get(`/services/getservice/${this.$route.params.id}`)
        this.service = data.service
        console.log(this.service)
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.getDates()
    this.getService()
  },
};
</script>

<style scoped>
.image-preview {
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 5px;
  margin-top: 20px;
}
.image-placeholder {
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 100%;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 5px;
  margin-top: 20px;
}
</style>




