<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="16">
        <v-card class="elevation-12">
          <v-toolbar color="green-darken-3" dark>
            <v-toolbar-title class="white--text text-center">
              Verify Your Account
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert
              v-if="showAlert"
              :type="typeAlert"
              :title="tittleAlert"
              :text="message"
              class="fade-alert" 
              :color="color"
              variant="outlined"
              prominent
              border="top" 
            ></v-alert>
            
            <v-form class="text-center mx-auto">
              <div class="text-body-2">
                We sent a verification code to example..@gmail.com <br>

                Please check your email and paste the code below.
              </div>
              <v-sheet color="surface">
              <v-otp-input
              v-model="otp"
              class="mt-3 ms-n2"
              :disabled="validating"
              placeholder="0"
              variant="underlined"
              ></v-otp-input>
              </v-sheet>

              <v-btn
                :loading="validating || resending"
                :disabled="validating || resending"
                class="my-4"
                color="green-darken-3"
                height="40"
                text="Verify"
                variant="flat"
                width="70%"
                @click="onClick"
              ></v-btn>

              <div class="text-caption" v-if="countdown > 0">
                Resend in: {{ formatCountdown }}
              </div>
              <div class="text-caption" v-else>
                Didn't receive the code? <a href="#" @click.prevent="onClickResend" style="color: #2E7D32;">Resend</a>
              </div>
            </v-form><br>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';
import { api } from '@/axios/axios';

export default {
  data: () => ({
    otp: '',
    validating: false,
    message: '',
    typeAlert: '',
    tittleAlert: '',
    color: '',
    showAlert: false,
    resending: false,
    countdown: 60, // 5 minutes in seconds
    intervalId: null,
  }),

  setup() {
    const router = useRouter();
    return { router };
  },

  mounted() {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown -= 1;
      } else {
        this.onClickResend();
        clearInterval(this.intervalId);
      }
    }, 1000); // Update every second
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
  },

  methods: {
    onClick() {
      try {
        this.validating = true;

        setTimeout(async () => {
          this.validating = false;
          const datos = {
            token: localStorage.getItem('tokenData'),
            code: this.otp
          }
          const {data} = await api.post('/user/verify', datos)

          if (data.success === false) {
            this.message = 'Invalid code';
            this.typeAlert = 'warning';
            this.tittleAlert = 'Warning';
            this.color = 'warning';
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 2000);
          }
          else {
              this.router.push({ name: 'login-confirm' });
            }
          
        }, 2000);
      } catch (error) {
        this.router.push({ name: 'serverError' });
      }
    },
    async onClickResend() {
      this.resending = true;
      try {
        const datos = {
            token: localStorage.getItem('tokenData'),
          }
        const {data} = await api.post('user/resend', datos)

        if (data.success) {
            this.message = 'Code resending';
            this.typeAlert = 'success';
            this.tittleAlert = 'Success';
            this.color = 'green-darken-3';
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 2000);
        }
      } catch (error) {
        this.message = 'Code not resending';
        this.typeAlert = 'warning';
        this.tittleAlert = 'Warning';
        this.color = 'warning';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      }
      this.resending = false;
    }
  },

  computed: {
    formatCountdown() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes} min ${seconds} sec`;
    }
  }
};
</script>
