<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-title>{{ example }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Example',
  props: {
    example: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-top: 50px;
}
</style>
