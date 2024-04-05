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
             {{($t('login.pages.sendPhoneCode.phoneNumberString'))}}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <label for="">
               {{ ($t('login.pages.sendMail.phoneNumberString')) }}
              </label>
              <v-text-field
                v-model="FormData.phone"
                :error-messages="errors.phone"
                :label="$t('login.pages.sendMail.enterPhoneString')"
                variant="underlined"
                prepend-inner-icon="mdi-phone"
                color="green-darken-3"
                outlined
                @input="validatePhone"
                type="number"
                required
              ></v-text-field>
              <v-btn
                color="green-darken-3"
                block
                lass="mt-4"
                :disabled="dialog"
                :loading="dialog"
                @click="submit"
              >
                <v-icon left>mdi-login</v-icon>
                {{ $t("passwordRecovery.email.buttonString") }}
              </v-btn> </v-form
            ><br />
            <v-divider></v-divider>
            <div class="text-center mt-3">
              <router-link :to="{name: 'login-mail'}" class="green--text text-darken-3">
                {{ ($t('login.pages.sendMail.optionEmailString')) }}
              </router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { toast } from 'vue3-toastify';
import { api } from "@/axios/axios";

export default {
  data(){
    return{
      dialog : false,
      FormData : {
        phone : ''
      },
      errors  : {
        phone  : ''
      },
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
          title: 'Send phone',
          disabled: false,
          href: '/login/phone',
        },
      ],
    }
  },
  methods : {
    validatePhone () {
      this.errors.phone = (!this.FormData.phone)? 'El numero es requerido' : ''
      this.errors.phone = (this.FormData.phone.length < 10 && this.FormData.phone.length >  10)? 'El numero debede ser de 10 caracteres' : ''
    },
    async submit (){
      this.errors.phone = (!this.FormData.phone) ? 'Ingrese un numero' : ''
      if (Object.values(this.errors).some(error => error !== '')) {
        toast.warning('Por favor llene correctamente los campos')
        return;
      }
      try {
        this.dialog = true;

        const datos = {
          cellPhone: this.FormData.phone
        }
        const { data } = await api.post('/user/recoversms', datos )
        this.value = false;

        if (!data.success) {
          toast.warning(this.$t('passwordRecovery.email.messageEmail'))
        }

        if(data.success === true){
          toast.success('Revise su entrada de mensajes')
          localStorage.setItem('tokenData', data.token);
          this.$router.push({ name: 'login-optconfirm' });
        }
      } catch (error) {
        this.$router.push({ name: 'serverError' })
      }
    }
  }
};
</script>

<style scoped>
.fade-alert {
  transition: opacity 1s;
}

.fade-alert.v-leave-active {
  opacity: 0;
}
</style>s