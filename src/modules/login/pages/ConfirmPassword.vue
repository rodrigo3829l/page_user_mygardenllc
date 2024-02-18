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
              variant="outlined"
              prominent
              border="top"
            ></v-alert>
            <v-form  @submit.prevent="submit">
              <label for="">New Pasword</label>
              <v-text-field
                label="Insert new password valid"
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
                <span v-if="passwordStrength === 'weak'" class="red--text">Weak password</span>
                <span v-else-if="passwordStrength === 'good'" class="orange--text">Good password</span>
                <span v-else class="green--text">Excellent password</span>
              </div>
              <label for="">Confirm your password</label>
              <v-text-field
                label="Valid your password"
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
import { ref,nextTick } from 'vue'
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate'
import { api } from '@/axios/axios';

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
      confirmPassword(value) {
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

    const password = useField('password')
    const confirmPassword = useField('confirmPassword');
    const passwordVisible = ref(false);
    const passwordVisibleConfirm = ref(false);
    const dialog = ref(false);
    const message = ref('');
    const passwordStrength = ref('');
    const typeAlert = ref('')
    const titleAlert = ref('')
    const showAlert = ref(false);
    const router = useRouter();

    const submit = handleSubmit(async (values) => {
      try {
        if (values.password !== values.confirmPassword) {
          message.value = 'Passwords do not match.';
          typeAlert.value = 'warning';
          titleAlert.value = 'Warning';
          showAlert.value = true;
          return; // No continuar si las contraseñas no coinciden
        }

        setTimeout(() => {
          showAlert.value = false;
        }, 2000);

        dialog.value = true;
        const datos ={
          token: localStorage.getItem('tokenData'),
          password : values.password
        }
        const {data} = await api.post('/user/change', datos)

        console.log(data)
        dialog.value = false;

        if(!data.success){
          message.value = 'Error al cambiar contraseña';
          typeAlert.value = 'warning';
          titleAlert.value = 'Warning';
          showAlert.value = true;
        }else{
          message.value = 'Contraseña cambiada con exito';
          typeAlert.value = 'success';
          titleAlert.value = 'success';
          showAlert.value = true;
        }

        await nextTick();
      
        setTimeout(() => {
          showAlert.value = false;
          if(typeAlert.value !== 'warning'){
            router.push({ name: 'home-home' });
          }
        }, 2000);
      } catch (error) {
        router.push({ name: 'serverError' });
      }

    });


    const checkStrength = () => {
      const patterns = {
        length: /.{6,}/,
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
      message,
      typeAlert,
      titleAlert,
      showAlert,
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