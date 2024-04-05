<template>
  <v-container style="height: 400px;"  v-if="!loaded">
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        class="text-subtitle-1 text-center"
        cols="12"
      >
      {{ $t('profile.pages.infoMyService.getYourServiceString') }}
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="green-darken-3"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          :src="'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg'"
          height="300px"
          class="white--text align-end"
          :alt="'Service Image'"
        >
          <v-card-title class="text-h4 text-center">{{ serviceName }}</v-card-title>
        </v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-list lines="two">
          <h2>{{ $t('profile.pages.infoMyService.serviceDetailsString') }}</h2>
          <v-list-item>
            <v-list-item-title>{{ $t('profile.pages.infoMyService.descriptionString') }}</v-list-item-title>
            <v-list-item-subtitle>{{ serviceDescription }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>{{ $t('profile.pages.infoMyService.totalPriceString') }}</v-list-item-title>
            <v-list-item-subtitle>${{ servicePrice }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>{{ $t('profile.pages.infoMyService.pendingPaymentString') }}</v-list-item-title>
            <v-list-item-subtitle>${{ pending }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>{{ $t('profile.pages.infoMyService.statusString') }}</v-list-item-title>
            <v-list-item-subtitle>{{ status }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-divider class="my-4"></v-divider>

    <v-row v-if="status !== 'quoting'">
      <v-col cols="12" md="6">
        <h2>{{ $t('profile.pages.infoMyService.usedProductsString') }}</h2>
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">{{ $t('profile.pages.infoMyService.productString') }}</th>
              <th class="text-left">{{ $t('profile.pages.infoMyService.quantityString') }}</th>
              <th class="text-left">{{ $t('profile.pages.infoMyService.totalString') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productList" :key="product.name">
              <td>{{ product.product }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.total }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="6">
            <v-list>
              <h2>{{ $t('profile.pages.infoMyService.costBreakdownString') }}</h2>
              <v-list-item>
                <v-list-item-title>{{ $t('profile.pages.infoMyService.laborString') }}</v-list-item-title>
                <v-list-item-subtitle>${{ laborCost }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{ $t('profile.pages.infoMyService.machineryString') }}</v-list-item-title>
                <v-list-item-subtitle>${{ machineryCost }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="6">
            <v-list>
              <h2>{{ $t('profile.pages.infoMyService.assignedEmployeesString') }}</h2>
              <v-list-item v-for="(employee, index) in employeeList" :key="index">
                <v-list-item-title>{{ employee }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="pending !== 0" justify="center">
      <v-btn color="green" dark class="mt-8 mb-6" @click="openPaymentDialog">{{ $t('profile.pages.infoMyService.payBtn') }}</v-btn>
    </v-row>

    <CommentCard v-if="showComment" :comment = "commentUser"></CommentCard>

    <v-dialog v-model="paymentDialog" max-width="600" persistent >
      <v-card>
        <v-card-title class="headline">{{ $t('profile.pages.infoMyService.paymentFormString') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="cardName"
            :label="$t('profile.pages.infoMyService.cardNameString')"
            required
            :error-messages="this.errors.cardName"
          ></v-text-field>

          <v-text-field
            v-model="cardNumber"
            :label="$t('profile.pages.infoMyService.cardNumberString')"
            :error-messages="this.errors.cardNumber"
            :counter="16"
            type="number"
            required
          ></v-text-field>

          <v-row>
            <v-col cols="4">
              <v-select
                v-model="expMonth"
                :items="months"
                :error-messages="this.errors.expMonth"
                :label="$t('profile.pages.infoMyService.expirationMonthString')"
                required
              ></v-select>
            </v-col>

            <v-col cols="4">
              <v-select
                v-model="expYear"
                :items="years"
                :error-messages="this.errors.expYear"
                :label="$t('profile.pages.infoMyService.paymentPercentageString')"
                required
              ></v-select>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="cvv"
                label="CVV"
                :error-messages="this.errors.cvv"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-select
            v-model="paymentPercentage"
            :items="['50%', '100%']"
            :label="$t('profile.pages.infoMyService.expirationYearString')"
            v-if="porcentage < 50"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closePaymentDialog">{{ $t('profile.pages.infoMyService.buttonClose') }}</v-btn>
          <v-btn color="blue darken-1" text @click="submitPayment">{{ $t('profile.pages.infoMyService.buttonPay') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="commentDialog" persistent >
      <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="mx-auto" outlined>
        <v-card-title class="justify-center text-h5">
          <v-icon class="mr-2">mdi-comment-outline</v-icon>{{ $t('profile.pages.infoMyService.shareOpinionString') }}</v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-form>
            <v-textarea
              v-model="comment"
              :label="$t('profile.pages.infoMyService.leaveCommentString')"
              auto-grow
              rows="1"
              outlined
              dense
              class="my-4"
            ></v-textarea>

            <div class="text-center mb-2">{{ $t('profile.pages.infoMyService.yourRatingString') }}</div>
            <div class="d-flex justify-center mb-4">
              <v-rating
                v-model="rating"
                dense
                clearable
                hover
                half-increments
                size="40"
                color="amber"
              ></v-rating>
            </div>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="deep-purple accent-4" dark @click="submitComment">
            {{ $t('profile.pages.infoMyService.sendString') }}
            <v-icon right>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
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
import { defineAsyncComponent } from 'vue';
import { api } from '@/axios/axios.js'
import { useUserStore } from '@/store/store'
import { toast } from 'vue3-toastify';
const userStore = useUserStore()
export default {
  data() {
    return {
      comment : '',
      rating : 0,
      userStore,
      serviceName: '',
      serviceDescription: '',
      servicePrice: 0,
      status: '',
      productList: [],
      laborCost: 500,
      machineryCost: 300,
      employeeList: [],
      paymentDialog: false,
      cardName: '',
      cardNumber: '',
      expMonth: '',
      pending : 0,
      expYear: '',
      cvv: '',
      porcentage: 0,
      overlay: false,
      paymentPercentage: '100%',
      months: Array.from({ length: 12 }, (v, k) => k + 1),
      years: Array.from({ length: 10 }, (v, k) => new Date().getFullYear() + k),
      errors : {
        cardName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvv: '',
      },
      loaded : false,
      commentDialog : false,
      showComment : false,
      commentUser : []
    }
  },
  methods: {
    async submitComment(){
      try {
        const datos = {
          comment: this.comment,
          rating : this.rating,
          scheduleservice : this.$route.params.id
        }
        console.log(datos)
        const {data} = await api.post('/comment/add', datos)
        console.log(data)
        toast.success('Mensage registrado con exito, gracias.')
        this.commentDialog = false
      } catch (error) {
        console.log(error)
      }
    },  
    async getService() {
      try {
        const { data } = await api.get(`/schedule/scheduleservice/${this.$route.params.id}`)
        console.log(data)
        this.serviceName = data.newService.service
        this.pending = data.newService.pending
        this.serviceDescription = data.newService.description
        this.status = data.newService.status
        this.servicePrice = data.newService.quote
        if (data.newService.status !== 'quoting') {
          this.productList = data.newService.products
          this.laborCost = data.newService.additionalCosts.labor
          this.machineryCost = data.newService.additionalCosts.machinery
          this.employeeList = data.newService.employeds
          this.porcentage = data.newService.pay.porcentage
        }
        if(data.newService.status === 'finish') {
          const {data} = await api.get(`/comment/getCommentByScheduledId/${this.$route.params.id}`)
          console.log(data)
          this.commentUser = data.comment
          this.showComment = true
          if(!data.success) this.commentDialog = true
        }
        this.loaded = true
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    openPaymentDialog() {
      this.paymentDialog = true
    },
    closePaymentDialog() {
      this.paymentDialog = false
    },
    async submitPayment() {
      const isMonthSelected = this.expMonth !== '';
      this.errors.expMonth = !isMonthSelected ? this.$t('profile.pages.infoMyService.script.expirationMonthString') : '';

      const isYearSelected = this.expYear !== '';
      this.errors.expYear = !isYearSelected ? this.$t('profile.pages.infoMyService.script.expirationRequiredString') : '';

      this.errors.cardName = (this.cardName.length < 3 || !/^[a-zA-ZüÜáéíóúÁÉÍÓÚñÑ' ]+$/.test(this.cardName))
          ? this.$t('registration.alerts.firstName') 
          : '';

          const isValidNumber = /^\d{16}$/.test(this.cardNumber);
      this.errors.cardNumber = !isValidNumber ? this.$t('profile.pages.infoMyService.script.cardNumberString') : '';

      const isValidCVV = /^\d{3,4}$/.test(this.cvv);
      this.errors.cvv = !isValidCVV ? this.$t('profile.pages.infoMyService.script.theCodeString') : '';

      if (Object.values(this.errors).some(error => error !== '')) {
        return;
      }

      let mount = this.pending
      if(this.paymentPercentage === '50%') mount = (this.pending / 2)
      const datos = {
        user : userStore.token,
        mount,
        scheduleService : this.$route.params.id,
        type : '65d9c9eda4ee265c1c861501'
      }
      this.overlay = true
      try {
        console.log(datos)
        const {data} = await api.post('/pays/pay', datos)
        this.overlay = false
        if(!data.success){
          toast.warning(data.msg)
          return
        }
        toast.success(data.msg)
        const newService = await api.get(`/schedule/scheduleservice/${this.$route.params.id}`)
        this.pending = newService.data.newService.pending
        this.porcentage = newService.data.newService.pay.porcentage
        this.status =   newService.data.newService.status
        this.paymentPercentage = '100%'
        console.log(newService.data)
        if(newService.data.newService.status === 'finish') {
          const {data} = await api.get(`/comment/getCommentByScheduledId/${this.$route.params.id}`)
          console.log(data)
          this.showComment = true
          this.commentUser = data.comment
          if(!data.success) this.commentDialog = true
        }
      } catch (error) {
        console.log(error)
      }
      console.log(datos)
    },
  },
  created() {
    this.getService()
  },
  components : {
    CommentCard : defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/profile/components/CommentCard.vue'))
  }
}
</script>

<style scoped>
.text-h4 {
  color: rgb(255, 255, 255);
}
</style>