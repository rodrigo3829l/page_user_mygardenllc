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
              {{ $t('passwordRecovery.email.emailString') }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert
              v-if="showAlert"
              :type="typeAlert"
              :title="tittleAlert"
              :text="message"
              class="fade-alert" 
              variant="outlined"
              prominent
              border="top" 
            ></v-alert>
            <v-form  @submit.prevent="submit">
              <label for="">{{ $t('passwordRecovery.email.registeredString') }}</label>
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                :label="$t('passwordRecovery.email.enterEmailString')"
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
                  {{ $t('passwordRecovery.email.buttonString') }}
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
import { api } from '@/axios/axios';
import {i18n} from '@/main.js'

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
        {
          title: 'Send email',
          disabled: false,
          href: '/login/mail',
        },
      ],
    }),
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        email(value) {
          if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)) {
            return true;
          }
          return i18n.global.t('passwordRecovery.email.alertEmail')
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
      try {
        dialog.value = true;

        const datos = {
          email: values.email
        }

        console.log(datos)
        const { data } = await api.post('/user/recover', datos )
        console.log(data)
        dialog.value = false;

        if (data.success === false) {
          message.value = i18n.global.t('passwordRecovery.email.messageEmail')
          typeAlert.value = 'warning'
          tittleAlert.value = 'Warning'
          showAlert.value = true;
        }

        // Espera a que se actualice el DOM antes de mostrar la alerta
        await nextTick();
        if(data.success === true){
            localStorage.setItem('tokenData', data.token);
            router.push({ name: 'login-optconfirm' });
          }
        setTimeout(() => {
          showAlert.value = false;

        }, 2000);
      } catch (error) {
        router.push({ name: 'serverError' });
      }
      
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