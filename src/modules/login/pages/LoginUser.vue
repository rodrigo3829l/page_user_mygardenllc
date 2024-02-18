<template>
  <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="16">
        <v-card class="elevation-12">
          <v-toolbar color="green-darken-3" dark>
            <v-toolbar-title class="white--text text-center">
              Login
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
            <br v-if="showAlert">
            <v-divider></v-divider>
            <v-form  @submit.prevent="submit">
              <label for="">Email or user</label>
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="Insert valid user or email"
                variant="underlined"
                prepend-inner-icon="mdi-account"
                color="green-darken-3"
                outlined
                required
              ></v-text-field>
              <label for="">Password</label>
              <v-text-field
                label="Insert a valid password"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                variant="underlined"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="passwordVisible ? 'text' : 'password'"
                outlined
                @click:append-inner="togglePasswordVisibility"
                color="green-darken-3"
                required
              ></v-text-field>

              <v-card-text class="text-medium-emphasis text-caption">
                Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
              </v-card-text>
              <center>
                <div class="g-recaptcha" data-sitekey="6Le5gHApAAAAADv0EqDbSKVSgpcBxPFpCz6o4zVt" data-callback="onRecaptchaSuccess"></div>
              </center>
              <v-divider></v-divider>
              <v-btn 
                color="green-darken-3" 
                block 
                class="mt-4" 
                type="submit"
                :disabled="dialog || !captchaVerified"
                :loading="dialog"
              >
                  <v-icon left>mdi-login</v-icon>
                  Ingresar
                </v-btn>
            </v-form><br>
            <v-divider></v-divider>
            <v-stack class="text-center mt-5">
              <router-link :to="{name: 'login-reistration'}">
                <p class="mb-0">You do not have an account? Sign up <v-icon icon="mdi-chevron-right"></v-icon></p>
              </router-link>
              <router-link :to="{name: 'login-mail'}">
                <p class="mb-0">Forgot your password? Get it here<v-icon icon="mdi-chevron-right"></v-icon></p>
              </router-link>
            </v-stack>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, nextTick } from 'vue'
import { useField, useForm } from 'vee-validate'
import  {useUserStore} from '../../../store/store.js'

export default {
  data: () => ({
      items: [
        {
          title: 'Home',
          disabled: false,
          href: '/home/homeuser',
        },
        {
          title: 'Login',
          disabled: false,
          href: '/login/loginuser',
        },
      ],
    }),
  setup() {
    window.onRecaptchaSuccess = () => {
      captchaVerified.value = true;
    };

    const { handleSubmit } = useForm({
      validationSchema: {
        email(value) {
          if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)) {
            return true;
          }
          return 'Must be a valid e-mail with a supported domain.';
        },


        password(value) {
          // Check minimum length of 6 characters
          if (value.length < 6) {
            return 'Password must be at least 6 characters long.';
          }

          // Check for at least one uppercase letter
          if (!/[A-Z]/.test(value)) {
            return 'Password must contain at least one uppercase letter.';
          }

          // Check for at least one number
          if (!/\d/.test(value)) {
            return 'Password must contain at least one number.';
          }

          // Check for only one special character
          const specialCharCount = (value.match(/[^A-Za-z0-9]/g) || []).length;
          if (specialCharCount !== 1) {
            return 'Password must contain only one special character.';
          }

          // If all conditions are met, the password is valid
          return true;
      },


      },
    })

    const email = useField('email')
    const password = useField('password')
    const passwordVisible = ref(false);
    const dialog = ref(false);
    const message = ref('');
    const color = ref('')
    const typeAlert = ref('')
    const tittleAlert = ref('')
    const showAlert = ref(false);
    const router = useRouter();
    const userStore = useUserStore();
    const captchaVerified = ref(false);

    const submit = handleSubmit(async (values) => {
      dialog.value = true;
      try {
        const res = await userStore.login(values.email, values.password);
        console.log(res);

        dialog.value = false;

        if (res.error) {
          message.value = res.error;
          typeAlert.value = 'warning';
          tittleAlert.value = 'Warning';
          color.value = 'warning';
        } else {
          message.value = 'Welcome';
          typeAlert.value = 'success';
          color.value = 'green-darken-3';
          tittleAlert.value = 'Successful login';
        }

        // Espera a que se actualice el DOM antes de mostrar la alerta
        await nextTick();
        showAlert.value = true;
        setTimeout(() => {
          showAlert.value = false;
          // Redirige a 'home-home' después de que la alerta se haya mostrado
          if (typeAlert.value === 'success') {
            router.push({ name: 'home-home' });
          }
        }, 2000);
      } catch (error) {
        console.error(error);
        // Si hay un error al realizar la solicitud, redirige a 'serverError'
        router.push({ name: 'serverError' });
      }
    });


    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    return {
      captchaVerified,
      email,
      password,
      passwordVisible,
      dialog,
      color,
      message,
      typeAlert,
      tittleAlert,
      showAlert,
      submit,
      togglePasswordVisibility
    }
  }
}
</script>

<style scoped>
.fade-alert {
  transition: opacity 1s;
}
.fade-alert.v-leave-active {
  opacity: 0;
}
</style>s