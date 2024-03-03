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
              {{ $t('passwordRecovery.confirm.tittleString') }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form  @submit.prevent="submit">
              <label for="">{{ $t('passwordRecovery.confirm.passwordTittleString') }}</label>
              <v-text-field
                :label="$t('passwordRecovery.confirm.passwordLabel')"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                variant="underlined"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="passwordVisible ? 'text' : 'password'"
                @click:append-inner="togglePasswordVisibility"
                color="green-darken-3"
                outlined
                required
                @input="checkStrength"
              ></v-text-field>
              <div v-if="password.value.value">
                <span v-if="passwordStrength === 'weak'" class="red--text">{{ $t('passwordRecovery.confirm.weakPasswordString') }}</span>
                <span v-else-if="passwordStrength === 'good'" class="orange--text">{{ $t('passwordRecovery.confirm.goodPassword') }}</span>
                <span v-else class="green--text">{{ $t('passwordRecovery.confirm.excellentPassword') }}</span>
              </div>
              <label for="">{{ $t('passwordRecovery.confirm.confirmPasswordTittle') }}</label>
              <v-text-field
              :label="$t('passwordRecovery.confirm.confirmPasswordLabel')"
                v-model="confirmPassword.value.value"
                :error-messages="confirmPassword.errorMessage.value"
                variant="underlined"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="passwordVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                :type="passwordVisibleConfirm ? 'text' : 'password'"
                @click:append-inner="togglePasswordVisibilityConfirm"
                color="green-darken-3"
                outlined
                required
              ></v-text-field>

                <v-btn 
                color="green-darken-3" 
                block 
                class="mt-4" 
                type="submit"
                :disabled="dialog"
                :loading="dialog"
                >
                  <v-icon left>mdi-login</v-icon>
                  {{ $t('passwordRecovery.confirm.buttonString') }}
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
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate'
import { api } from '@/axios/axios';
import {i18n} from '@/main.js'
import { toast } from 'vue3-toastify';

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
        {
          title: 'OTP Code',
          disabled: false,
          href: '/login/optconfirm',
        },
        {
          title: 'Confirm Password',
          disabled: false,
          href: '/login/confirm',
        },
      ],
    }),
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        password(value) {
          // Check minimum length of 6 characters
          const stringValue = value || '';
          // Check minimum length of 6 characters
          if (stringValue.length < 6) {
            return i18n.global.t('passwordRecovery.confirm.alertLength');
          }

          // Check for at least one uppercase letter
          if (!/[A-Z]/.test(value)) {
            return i18n.global.t('passwordRecovery.confirm.alertUppercase');
          }

          // Check for at least one number
          if (!/\d/.test(value)) {
            return i18n.global.t('passwordRecovery.confirm.alertNumber');
          }

          // Check for only one special character
          const specialCharCount = (value.match(/[^A-Za-z0-9]/g) || []).length;
          if (specialCharCount !== 1) {
            return i18n.global.t('passwordRecovery.confirm.alertCharacter');
          }

          // If all conditions are met, the password is valid
          return true;
      },
      confirmPassword(value) {
          // Check minimum length of 6 characters
          const stringValue = value || '';
          // Check minimum length of 6 characters
          if (stringValue.length < 6) {
            return i18n.global.t('passwordRecovery.confirm.alertLength');
          }

          // Check for at least one uppercase letter
          if (!/[A-Z]/.test(value)) {
            return i18n.global.t('passwordRecovery.confirm.alertUppercase');
          }

          // Check for at least one number
          if (!/\d/.test(value)) {
            return i18n.global.t('passwordRecovery.confirm.alertNumber');
          }

          // Check for only one special character
          const specialCharCount = (value.match(/[^A-Za-z0-9]/g) || []).length;
          if (specialCharCount !== 1) {
            return i18n.global.t('passwordRecovery.confirm.alertCharacter');
          }

          // If all conditions are met, the password is valid
          return true;
      },
      },
    })

    const password = useField('password')
    const confirmPassword = useField('confirmPassword');
    const passwordVisible = ref(false);
    const passwordVisibleConfirm = ref(false);
    const dialog = ref(false);
    const passwordStrength = ref('');
    const router = useRouter();

    const submit = handleSubmit(async (values) => {
      try {
        if (values.password !== values.confirmPassword) {
          toast.warning(i18n.global.t('passwordRecovery.confirm.alertDontMatch'))
          return; // No continuar si las contraseñas no coinciden
        }

        dialog.value = true;
        const datos ={
          token: localStorage.getItem('tokenData'),
          password : values.password
        }
        const {data} = await api.post('/user/change', datos)

        dialog.value = false;

        if(!data.success){
          toast.warning( i18n.global.t('passwordRecovery.confirm.alertDontChange'))

        }else{
          toast.success( i18n.global.t('passwordRecovery.confirm.alertChange'))
          setTimeout(() => {
            router.push({ name: 'home-home' });
          }, 2000);
        }

        
      } catch (error) {
        console.log(error)
        router.push({ name: 'serverError' });
      }

    });


    const checkStrength = () => {
      const patterns = {
        length: /.{8,}/,
        lowercase: /[a-z]+/,
        uppercase: /[A-Z]+/,
        number: /\d+/,
        special: /[@$!%*?&#^*]+/,
      };

      const checks = {
        length: patterns.length.test(password.value.value),
        lowercase: patterns.lowercase.test(password.value.value),
        uppercase: patterns.uppercase.test(password.value.value),
        number: patterns.number.test(password.value.value),
        special: patterns.special.test(password.value.value),
      };

      const passedChecks = Object.values(checks).filter(Boolean).length;

      switch (passedChecks) {
        case 5:
          passwordStrength.value = 'excellent';
          break;
        case 4:
          passwordStrength.value = 'good';
          break;
        default:
          passwordStrength.value = 'weak';
      }
    }

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };
    const togglePasswordVisibilityConfirm = () => {
      passwordVisibleConfirm.value = !passwordVisibleConfirm.value;
    };

    return {
      password,
      confirmPassword,
      passwordVisible,
      passwordVisibleConfirm,
      dialog,
      submit,
      togglePasswordVisibility,
      togglePasswordVisibilityConfirm,
      checkStrength,
      passwordStrength
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
.red--text {
    color: red;
  }
  
  .orange--text {
    color: orange;
  }
  
  .green--text {
    color: green;
  }
</style>s