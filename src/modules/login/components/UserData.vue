<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="16">
        <v-card class="elevation-12">
          <v-card-title class="text-h5">
            User Data
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="formData.userName"
                label="Username"
                color="green-darken-3"
                required
                variant="underlined"
                placeholder="Enter your username"
              ></v-text-field>

              <v-text-field
                v-model="formData.email"
                label="Email"
                required
                variant="underlined"
                placeholder="Enter your email"
                type="email"
                color="green-darken-3"
              ></v-text-field>

              <v-text-field
                v-model="formData.password"
                label="Password"
                required
                variant="underlined"
                color="green-darken-3"
                placeholder="Enter your password"
                type="password"
              ></v-text-field>

              <v-text-field
                v-model="formData.confirmPassword"
                label="Confirm Password"
                required
                variant="underlined"
                color="green-darken-3"
                placeholder="Confirm your password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
};
</script>
