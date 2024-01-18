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
                :loading="validating"
                class="my-4"
                color="green-darken-3"
                height="40"
                text="Verify"
                variant="flat"
                width="70%"
                @click="onClick"
              ></v-btn>

              <div class="text-caption">
                Didn't receive the code? <a href="#" @click.prevent="otp = ''">Resend</a>
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

export default {
  data: () => ({
    otp: '',
    validating: false,
    message: '',
    typeAlert: '',
    tittleAlert: '',
    color: '',
    showAlert: false,
  }),

  setup() {
    const router = useRouter();
    return { router };
  },

  methods: {
    onClick () {
      this.validating = true;

      setTimeout(() => {
        this.validating = false;

        if (this.otp !== '123456') {
          this.message = 'Invalid code';
          this.typeAlert = 'warning';
          this.tittleAlert = 'Warning';
          this.color = 'warning';
          this.showAlert = true;
        }

        setTimeout(() => {
          this.showAlert = false;
          if (this.otp === '123456') {
            this.router.push({ name: 'login-confirm' });
          }
        }, 2000);
      }, 2000);
    },
  },
};
</script>
