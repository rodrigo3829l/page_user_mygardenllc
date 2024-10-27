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
              {{ $t("login.titleString") }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-divider></v-divider>
            <v-form @submit.prevent="submit">
              <label for="">{{ $t("login.emailString") }}</label>
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                :label="$t('login.InsertUserEmailString')"
                variant="underlined"
                class="email"
                prepend-inner-icon="mdi-account"
                color="green-darken-3"
                outlined
                required
              ></v-text-field>
              <label for="">{{ $t("login.passwordString") }}</label>
              <v-text-field
                :label="$t('login.insertValidPasswordString')"
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
                {{ $t("login.descriptionWarningString") }}
              </v-card-text>
              <!-- <v-row justify="center">
                <v-col cols="12" sm="8" md="6" lg="16" align="center">
                  <div class="g-recaptcha" data-sitekey="6Le5gHApAAAAADv0EqDbSKVSgpcBxPFpCz6o4zVt" data-callback="onRecaptchaSuccess"></div>
                </v-col>
              </v-row> -->
              <v-divider></v-divider>
              <v-btn
                color="green-darken-3"
                block
                class="mt-4"
                type="submit"
                :disabled="dialog"
                :loading="dialog"
              >
                <v-icon left>mdi-login</v-icon>
                {{ $t("login.buttonString") }}
              </v-btn> </v-form
            ><br />
            <v-divider></v-divider>
            <div class="text-center mt-5">
              <router-link :to="{ name: 'login-reistration' }">
                <p class="mb-0">
                  {{ $t("login.registrationString")
                  }}<v-icon icon="mdi-chevron-right"></v-icon>
                </p>
              </router-link>
              <router-link :to="{ name: 'login-mail' }">
                <p class="mb-0">
                  {{ $t("login.forgotPasswordString")
                  }}<v-icon icon="mdi-chevron-right"></v-icon>
                </p>
              </router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { useUserStore } from "../../../store/store.js";
import { i18n } from "@/main.js";
import { toast } from "vue3-toastify";
export default {
  data: () => ({
    items: [
      {
        title: "Home",
        disabled: false,
        href: "/home/homeuser",
      },
      {
        title: "Login",
        disabled: false,
        href: "/login/loginuser",
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
          return i18n.global.t("login.alertEmail");
        },

        password(value) {
          const stringValue = value || "";
          // Check minimum length of 6 characters
          if (stringValue.length < 6) {
            return i18n.global.t("login.alertLength");
          }

          // Check for at least one uppercase letter
          if (!/[A-Z]/.test(value)) {
            return i18n.global.t("login.alertUppercase");
          }

          // Check for at least one number
          if (!/\d/.test(value)) {
            return i18n.global.t("login.alertNumber");
          }

          // Check for only one special character
          const specialCharCount = (value.match(/[^A-Za-z0-9]/g) || []).length;
          if (specialCharCount !== 1) {
            return i18n.global.t("login.alertCharacter");
          }

          // If all conditions are met, the password is valid
          return true;
        },
      },
    });

    const email = useField("email");
    const password = useField("password");
    const passwordVisible = ref(false);
    const dialog = ref(false);
    const router = useRouter();
    const userStore = useUserStore();
    const captchaVerified = ref(false);

    const submit = handleSubmit(async (values) => {
      dialog.value = true;
      try {
        const res = await userStore.login(
          values.email,
          values.password,
          "client",
        );
        console.log(res);

        dialog.value = false;

        if (res.error) {
          toast.warning(res.error);
        } else {
          toast.success(i18n.global.t("login.tittleAlert"));
          setTimeout(() => {
            router.push({ name: "home-home" });
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        router.push({ name: "serverError" });
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
      submit,
      togglePasswordVisibility,
    };
  },
};
</script>

<style scoped>
.fade-alert {
  transition: opacity 1s;
}
.fade-alert.v-leave-active {
  opacity: 0;
}
</style>
