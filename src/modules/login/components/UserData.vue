<template>
  <h3 class="text-h6">{{ $t("registration.userdata.titleString") }}</h3>
  <br />
  <v-row>
    <v-col>
      <v-text-field
        v-model="formData.userName"
        :label="$t('registration.userdata.userString')"
        color="green-darken-3"
        required
        @input="validateUserName"
        :error-messages="errors.userName"
        variant="underlined"
        :placeholder="$t('registration.userdata.userNameString')"
      ></v-text-field>
      <v-text-field
        v-model="formData.email"
        :label="$t('registration.userdata.emailString')"
        required
        @input="validateEmail"
        :error-messages="errors.email"
        variant="underlined"
        :placeholder="$t('registration.userdata.userEmailString')"
        type="email"
        color="green-darken-3"
      ></v-text-field>

      <v-text-field
        v-model="formData.password"
        :label="$t('registration.userdata.passwordString')"
        required
        @input="validatePswd"
        :error-messages="errors.password"
        variant="underlined"
        color="green-darken-3"
        :placeholder="$t('registration.userdata.helloString')"
        :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="passwordVisible ? 'text' : 'password'"
        outlined
        @click:append-inner="togglePasswordVisibility"
      ></v-text-field>
      <div v-if="formData.password.length > 0">
        <v-progress-linear
          :color="color"
          height="10"
          :model-value="passwordStrength"
          striped
        ></v-progress-linear>
        <span
          v-if="passwordStrength >= 0 && passwordStrength < 50"
          class="red--text"
          >{{ $t("registration.userdata.veryWeakPasswordString") }}</span
        >
        <span
          v-else-if="passwordStrength >= 50 && passwordStrength < 75"
          class="red--text"
          >{{ $t("registration.userdata.weakPasswordString") }}</span
        >
        <span
          v-else-if="passwordStrength >= 75 && passwordStrength < 100"
          class="orange--text"
          >{{ $t("registration.userdata.goodPassword") }}</span
        >
        <span v-else class="green--text">{{
          $t("registration.userdata.excellentPassword")
        }}</span>
      </div>
      <v-text-field
        v-model="formData.confirmPassword"
        :label="$t('registration.userdata.confirmPasswordString')"
        required
        @input="validateConfPswd"
        :error-messages="errors.confirmPassword"
        variant="underlined"
        color="green-darken-3"
        :placeholder="$t('registration.userdata.helloString')"
        :append-inner-icon="passwordVisibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
        :type="passwordVisibleConfirm ? 'text' : 'password'"
        outlined
        @click:append-inner="togglePasswordVisibilityConfirm"
      ></v-text-field>
      <v-checkbox
        v-model="formData.agreeToTerms"
        :required="true"
        @click="validateTerms"
        :error-messages="errors.agreeToTerms"
        :label="$t('registration.userdata.descriptionString')"
        color="green-darken-3"
      ></v-checkbox>
    </v-col>
  </v-row>
</template>

<script>
import {
  userNameValidate,
  emailValidate,
  passwordValidate,
  checkStrengthValid,
} from "@/plugins/validations";
export default {
  data() {
    return {
      formData: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      },
      passwordStrength: 0,
      color: "",
      passwordVisibleConfirm: false,
      passwordVisible: false,
      errors: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: "",
      },
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    togglePasswordVisibilityConfirm() {
      this.passwordVisibleConfirm = !this.passwordVisibleConfirm;
    },
    validateUserName() {
      this.errors.userName = userNameValidate(this.formData.userName);
      this.$emit("updateData", this.formData, this.errors);
    },
    validateEmail() {
      this.errors.email = emailValidate(this.formData.email);
      this.$emit("updateData", this.formData, this.errors);
    },
    validatePswd() {
      if (this.formData.password === this.formData.confirmPassword) {
        this.errors.confirmPassword = "";
        this.errors.password = "";
      }
      this.errors.password = passwordValidate(this.formData.password);
      this.validateForcePsw();
      this.$emit("updateData", this.formData, this.errors);
    },
    validateTerms() {
      this.formData.agreeToTerms = !this.formData.agreeToTerms;
      this.$emit("updateData", this.formData, this.errors);
    },
    validateConfPswd() {
      if (this.formData.password === this.formData.confirmPassword) {
        this.errors.confirmPassword = "";
        this.errors.password = "";
      }
      this.errors.confirmPassword = passwordValidate(
        this.formData.confirmPassword,
      );
      this.$emit("updateData", this.formData, this.errors);
    },
    validateForcePsw() {
      const { passwordStrength, color } = checkStrengthValid(
        this.formData.password,
      );
      this.passwordStrength = passwordStrength;
      this.color = color;
    },
  },
  mounted() {
    this.$emit("updateData", this.formData, this.errors);
  },
};
</script>
