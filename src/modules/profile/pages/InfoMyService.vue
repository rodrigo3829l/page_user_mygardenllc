<template>
  <v-container style="height: 400px;" v-if="!loaded">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col class="text-subtitle-1 text-center" cols="12">
        Get Your Service Information
      </v-col>
      <v-col cols="6">
        <v-progress-linear color="green-darken-3" indeterminate rounded height="6"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <!-- Primera Columna -->
      <v-col cols="12" md="8">
        <!-- Primera Fila -->
        <v-row>
          <v-col cols="12" md="6">
            <v-img :src="serviceImage" height="200px" class="white--text align-end" alt="Service Image"></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <div class="text-h5 font-weight-bold">{{ serviceName }}</div>
                <strong>{{ serviceDescription }}</strong>
              </v-col>
              <template v-if="status !== 'quoting'">
                <v-col cols="6">
                <div>
                  <strong>Total Price</strong>
                  <div class="text-h5 font-weight-bold">${{ servicePrice }}</div>
                </div>
              </v-col>
              <v-col cols="6">
                <div>
                  <strong>Pending Payment</strong>
                  <div class="text-h5 font-weight-bold">${{ pending }}</div>
                </div>
              </v-col>
              </template>
              
              <v-col cols="12" class="d-flex justify-center">
                <div>
                  <strong>Status: </strong>
                  <v-chip color="primary" class="text-h6">{{ status }}</v-chip>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
          <!-- Segunda Fila -->
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>Service Dates</v-card-title>
                <v-card-item>
                  <v-row>
                    <v-col v-if="dates.reserved">
                      <v-card-text>
                        <strong>Reserved Date</strong><br>
                        {{ formatDate(dates.reserved) }}
                      </v-card-text>
                    </v-col>
                    <v-col v-if="dates.scheduledTime">
                      <v-card-text>
                        <strong>Scheduled Time</strong><br>
                        {{ formatDate(dates.scheduledTime) }}
                      </v-card-text>
                    </v-col>
                    <v-col v-if="dates.quoted">
                      <v-card-text>
                        <strong>Quoted Date</strong><br>
                        {{ formatDate(dates.quoted) }}
                      </v-card-text>
                    </v-col>
                    <v-col v-if="dates.start">
                      <v-card-text>
                        <strong>Start Date</strong><br>
                        {{ formatDate(dates.start) }}
                      </v-card-text>
                    </v-col>
                    <v-col v-if="dates.finish">
                      <v-card-text>
                        <strong>Finish Date</strong><br>
                        {{ formatDate(dates.finish) }}
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>

        <template v-if="status !== 'quoting'">

          <!-- Tercera Fila -->
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>Used Products</v-card-title>
                <v-card-item>
                  <v-table density="compact">
                    <thead>
                      <tr>
                        <th class="text-left">Product</th>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="product in productList" :key="product._id">
                        <td>{{ product.product.product }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>{{ product.total }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>

          <!-- Cuarta Fila -->
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-card-title>Cost Breakdown</v-card-title>
                <v-list>
                  <v-list-item>
                    <div>
                      <strong>Labor</strong>
                      <div>${{ laborCost }}</div>
                    </div>
                  </v-list-item>
                  <v-list-item>
                    <div>
                      <strong>Machinery</strong>
                      <div>${{ machineryCost }}</div>
                    </div>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-title>Assigned Employees</v-card-title>
                <v-card-item>
                  <v-row v-for="(employee, index) in employeeList" :key="index" class="align-center">
                    <v-col cols="4">
                      <v-img :src="employee.img.secure_url" alt="Employee Avatar" class="rounded-circle" height="36" width="36"></v-img>
                    </v-col>
                    <v-col cols="8">
                      <div>{{ employee.name }} {{ employee.apellidoP }} {{ employee.apellidoM }}</div>
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-col>

      <!-- Segunda Columna -->
      <v-col cols="12" md="4">
        <!-- Primera Fila -->
        <v-row v-if="status !== 'quoting'">
          <v-col cols="12">
            <v-card>
              <v-card-title>Make a Payment</v-card-title>

              <v-card-item>
              <div class="d-flex justify-space-between">
                    <span>Total Price</span>
                    <span class="font-weight-bold">${{ servicePrice }}</span>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span>Pending Payment</span>
                    <span class="font-weight-bold">${{ pending }}</span>
                  </div>
                  <div class="d-flex justify-space-between">
                    <span>Amount Paid</span>
                    <span class="font-weight-bold">${{ servicePrice - pending }}</span>
                  </div>

                <div v-if="pending !== 0">
                  <div class="font-weight-bold">You must pay at least 50% to start the service</div>
                </div>

                <div v-else>
                  <div class="font-weight-bold">Thank you for your payment!</div>
                </div>

              </v-card-item>
              <v-card-actions v-if="pending !== 0">
                <v-btn color="green-darken-3" class="mt-4" @click="openPaymentDialog" block>
                  Pay Now
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Segunda Fila -->
        <v-row>
          <v-col cols="12">
            <template v-if="status === 'finish'">

              <v-card v-if="!showComment">
                <v-card-title>Leave a Comment</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-textarea v-model="comment" label="Enter your comment here..." auto-grow rows="1" outlined dense class="my-4"></v-textarea>
                    <div class="text-center mb-2">Your Rating</div>
                    <div class="d-flex justify-center mb-4">
                      <v-rating v-model="rating" dense clearable hover half-increments size="40" color="amber"></v-rating>
                    </div>
                  </v-form>
                  <v-card-actions class="justify-center">
                    <v-btn color="deep-purple accent-4" dark @click="submitComment">
                      Submit Comment
                      <v-icon right>mdi-send</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-card>

              <div v-if="showComment">
                <CommentCard :comment="commentUser"></CommentCard>
              </div>
            </template>
            <v-card v-else-if="status === 'quoting'">
              <v-card-title>Waiting for Quotation</v-card-title>
              <v-card-text>
                <div>
                  <p>We are currently processing your quotation.</p> 
                  <p>The visit is scheduled in {{ daysUntilVisit }} days.</p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Payment Dialog -->
    <v-dialog v-model="paymentDialog" max-width="600" persistent>
      <PaymentCard :monto="servicePrice" :pendingAmount="pending" :token="userStore.token" :serviceId="$route.params.id" @close="closePaymentDialog" @payment-success="handlePaymentSuccess" />
    </v-dialog>
  </v-container>

  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { api } from '@/axios/axios.js'
import { useUserStore } from '@/store/store'
import { toast } from 'vue3-toastify';
import axios from 'axios';

const userStore = useUserStore()

export default {
  data() {
    return {
      comment: '',
      rating: 0,
      userStore,
      serviceName: '',
      serviceDescription: '',
      servicePrice: 0,
      status: '',
      productList: [],
      laborCost: 0,
      machineryCost: 0,
      employeeList: [],
      paymentDialog: false,
      pending: 0,
      overlay: false,
      loaded: false,
      showComment: false,
      commentUser: [],
      dates: {},
      serviceImage: ''
    }
  },
  computed: {
    daysUntilVisit() {
      const visitDate = new Date(this.dates.scheduledTime);
      const today = new Date();
      const diffTime = Math.abs(visitDate - today);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  },
  methods: {
    async submitComment() {
      this.overlay = true
      try {
        const { data: translate } = await axios.get(`https://api.mymemory.translated.net/get?q=${this.comment}&langpair=es-ES|en-GB`)
        const translation = translate.responseData.translatedText;
        const { data: prediccion } = await axios.post('https://sentiments-and-recomendatios.onrender.com/predict/comment', { comment: translation });

        let pred 
        const category = prediccion.prediction

        if (category === 1) {
          pred = "Thanks for the good comment, we strive to offer the best service"
        } else if (category == 0) {
          pred = "We apologize if something went wrong, we will take it into account for next time, thank you"
        } else {
          pred = "Thank you very much for your opinion on the service"
        }

        const datos = {
          comment: this.comment,
          rating: this.rating,
          scheduleservice: this.$route.params.id,
          category
        }

        const { data } = await api.post('/comment/add', datos)
        if (data.success) {
          toast.success(pred)
        } else {
          toast.success(data.msg)
        }
        this.showComment = true
      } catch (error) {
        console.log(error)
      } finally {
        this.overlay = false
      }
    },
    async getService() {
      try {
        const { data } = await api.get(`/schedule/scheduleservice/${this.$route.params.id}`)
        console.log(data)
        this.serviceName = data.scheduledService.service.name
        this.serviceDescription = data.scheduledService.description
        this.status = data.scheduledService.status
        this.serviceImage = data.scheduledService.img.secure_url
        this.dates = data.scheduledService.dates

        

         if (data.scheduledService.status !== 'quoting') {
          this.servicePrice = data.scheduledService.quote
          this.pending = data.scheduledService.pending
          this.productList = data.scheduledService.products
          this.laborCost = data.scheduledService.additionalCosts.labor
          this.machineryCost = data.scheduledService.additionalCosts.machinery
          this.employeeList = data.scheduledService.employeds
         }

        if (data.scheduledService.status === 'finish') {
          const { data: commentData } = await api.get(`/comment/getCommentByScheduledId/${this.$route.params.id}`)
          console.log(commentData)
          if(commentData.success){
            this.commentUser = commentData.comment
          this.showComment = true
          } else {
            this.commentDialog = true
          }
        
        }

        this.loaded = true
      } catch (error) {
        console.log(error)
      }
    },
    openPaymentDialog() {
      this.paymentDialog = true;
    },
    closePaymentDialog() {
      this.paymentDialog = false;
    },
    handlePaymentSuccess() {
      this.paymentDialog = false;
      this.getService();
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  },
  created() {
    this.getService()
  },
  components: {
    CommentCard: defineAsyncComponent(() => import('@/modules/profile/components/CommentCard.vue')),
    PaymentCard: defineAsyncComponent(() => import('@/modules/profile/components/PayComponent.vue'))
  }
}
</script>

<style scoped>
.text-h4 {
  color: rgb(255, 255, 255);
}
.rounded-circle {
  border-radius: 50%;
}
.text-h5 {
  font-size: 1.25rem;
}
.text-h6 {
  font-size: 1rem;
}
</style>
