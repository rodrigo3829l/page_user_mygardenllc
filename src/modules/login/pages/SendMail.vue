<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="16">
        <v-card class="elevation-12">
          <v-toolbar color="green-darken-3" dark>
            <v-toolbar-title class="white--text text-center">
              Email
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert
              v-if="showAlert"
              :type="typeAlert"
              :title="tittleAlert"
              :text="message"
              class="fade-alert"  
            ></v-alert>
            <v-form  @submit.prevent="submit">
              <label for="">Registered mail</label>
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="Enter the email associated with the account"
                variant="underlined"
                prepend-inner-icon="mdi-account"
                color="green-darken-3"
                outlined
                required
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
                  Confirm
                </v-btn>

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
        
      },
    })

    const email = useField('email')
    const dialog = ref(false);
    const message = ref('');
    const typeAlert = ref('')
    const tittleAlert = ref('')
    const showAlert = ref(false);
    const router = useRouter();

    const submit = handleSubmit(async (values) => {
      dialog.value = true;
      await new Promise(resolve => setTimeout(resolve, 2000));
      dialog.value = false;

      if (values.email !== 'prueba@gmail.com') {
        message.value = 'This email has not been registered';
        typeAlert.value = 'warning'
        tittleAlert.value = 'Warning'
        showAlert.value = true;
      }

      // Espera a que se actualice el DOM antes de mostrar la alerta
      await nextTick();
      setTimeout(() => {
        showAlert.value = false;
        // Redirige a 'home-home' después de que la alerta se haya mostrado
        if(typeAlert.value !== 'warning'){
          router.push({ name: 'login-optconfirm' });
        }
      }, 2000);
    });

    

    return {
      email,
      dialog,
      message,
      typeAlert,
      tittleAlert,
      showAlert,
      submit,
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