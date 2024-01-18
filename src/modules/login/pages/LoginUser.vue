<template>
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
                color="green-darken-3"
                outlined
                required
                @click:append-inner="togglePasswordVisibility"
              ></v-text-field>
              <!-- <v-card-text class="text-medium-emphasis text-caption">
                Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
              </v-card-text> -->
                <v-btn 
                color="green-darken-3" 
                block 
                lass="mt-4" 
                type="submit"
                :disabled="dialog"
                :loading="dialog"
                >
                  <v-icon left>mdi-login</v-icon>
                  Ingresar
                </v-btn>

                <!-- <v-dialog
                  v-model="dialog"
                  :scrim="false"
                  persistent
                  width="auto"
                >
                  <v-card
                    color="green-darken-3"
                  >
                    <v-card-text>
                      Please stand by
                      <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                      ></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog> -->

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

export default {
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        email (value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
          return 'Must be a valid e-mail.'
        },
        password  (value) {
          if (value?.length >= 6) return true;
          return 'La contraseña debe tener al menos 6 caracteres.';
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

    const submit = handleSubmit(async (values) => {
      dialog.value = true;
      await new Promise(resolve => setTimeout(resolve, 2000));
      dialog.value = false;

      if (values.email !== 'prueba@gmail.com') {
        message.value = 'Invalid email';
        typeAlert.value = 'warning'
        tittleAlert.value = 'Warning'
        color.value= 'warning';
      } else if (values.password !== 'hola123') {
        message.value = 'Invalid password';
        typeAlert.value = 'warning'
        color.value= 'warning';
        tittleAlert.value = 'Warning'
      } else {
        message.value = 'Welcome Rodrigo';
        typeAlert.value = 'success'
        color.value= 'green-darken-3';
        tittleAlert.value = 'Successful login'
      }

      // Espera a que se actualice el DOM antes de mostrar la alerta
      await nextTick();
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
        // Redirige a 'home-home' después de que la alerta se haya mostrado
        if(typeAlert.value === 'success'){
          router.push({ name: 'home-home' });
        }
      }, 2000);
      
    });

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    return {
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