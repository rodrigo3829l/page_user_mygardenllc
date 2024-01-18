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
                color="green-darken-3"
                outlined
                required
                @click:append-inner="togglePasswordVisibility"
              ></v-text-field>
              <label for="">Confirm your password</label>
              <v-text-field
                label="Valid your password"
                v-model="confirmPassword.value.value"
                :error-messages="confirmPassword.errorMessage.value"
                variant="underlined"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="passwordVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                :type="passwordVisibleConfirm ? 'text' : 'password'"
                color="green-darken-3"
                outlined
                required
                @click:append-inner="togglePasswordVisibilityConfirm"
              ></v-text-field>
              <!-- <v-card-text class="text-medium-emphasis text-caption">
                Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
              </v-card-text> -->
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

export default {
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        password(value) {
          if (value?.length >= 6) return true;
          return 'La contraseña debe tener al menos 6 caracteres.';
        },
        confirmPassword(value, { password }) {
          if (value !== password) return true;
          return 'Las contraseñas no coinciden.';
        },
      },
    })

    const password = useField('password')
    const confirmPassword = useField('confirmPassword');
    const passwordVisible = ref(false);
    const passwordVisibleConfirm = ref(false);
    const dialog = ref(false);
    const message = ref('');
    const typeAlert = ref('')
    const titleAlert = ref('')
    const showAlert = ref(false);
    const router = useRouter();

    const submit = handleSubmit(async (values) => {
      if (values.password !== values.confirmPassword) {
        message.value = 'Las contraseñas no coinciden.';
        typeAlert.value = 'warning';
        titleAlert.value = 'Advertencia';
        showAlert.value = true;
        return; // No continuar si las contraseñas no coinciden
      }

      dialog.value = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      dialog.value = false;


      // Espera a que se actualice el DOM antes de mostrar la alerta
      await nextTick();
      message.value = 'Contraseña cambiada exitosamente';
      typeAlert.value = 'success';
      titleAlert.value = 'Éxito';
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
      togglePasswordVisibilityConfirm
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