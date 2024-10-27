<template>
  <v-footer color="grey-darken-3">
    <v-container>
      <v-row>
        <v-col md="3">
          <div class="company-info">
            <v-row>
              <v-col>
                <h3 class="white--text">{{ $t("footer.titleString") }}</h3>
                <p class="white--text">{{ $t("footer.descriptionString") }}</p>
                <br />
                <div class="abn">
                  <p>
                    <router-link
                      class="white--text"
                      :to="{ name: 'privacity' }"
                      >{{ $t("footer.privacyPolicyString") }}</router-link
                    >
                  </p>
                  <!-- <p><router-link class="white--text" :to="{ name: 'cookies' }">Cookie Policy</router-link></p> -->
                  <p>
                    <router-link class="white--text" :to="{ name: 'terms' }">{{
                      $t("footer.termsAndConditionsString")
                    }}</router-link>
                  </p>
                  <p>
                    <router-link class="white--text" :to="{ name: 'bina' }">{{
                      $t("footer.binBataString")
                    }}</router-link>
                  </p>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col md="3">
          <h3 class="white--text">{{ $t("footer.ourScheduleString") }}</h3>
          <br />
          <div class="office-hours">
            <p>{{ $t("footer.mondayString") }}</p>
            <p>{{ $t("footer.saturdayString") }}</p>
            <p>{{ $t("footer.sundayClosedString") }}</p>
          </div>
        </v-col>
        <v-col md="3">
          <h3 class="white--text">{{ $t("footer.contactString") }}</h3>
          <br />
          <div class="contact-list">
            <p>
              <i class="fa fa-map-marker-alt"></i
              >{{ $t("footer.addressString") }}
            </p>
            <p><i class="fa fa-phone"></i>{{ $t("footer.phoneString") }}</p>
            <p>
              <i class="fa fa-envelope"></i
              >{{ $t("footer.emailString") }}mygarden1526@gmail.com
            </p>
          </div>
        </v-col>
        <v-col md="3">
          <h3 class="white--text">{{ $t("footer.mapString") }}</h3>
          <br />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.721079772485!2d-83.97655204990384!3d34.12066818059001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5930a75dfedaf%3A0xee111c14c9f9e19d!2s2879%20Pebblebrook%20Dr%2C%20Buford%2C%20GA%2030518%2C%20EE.%20UU.!5e0!3m2!1sen!2sus!4v1646111597671!5m2!1sen!2sus"
            width="100%"
            height="200"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </v-col>
      </v-row>
      <v-row class="text-center my-4">
        <v-col>
          <v-btn icon class="social-link" color="grey-darken-3" href="#"
            ><v-icon size="40">mdi-facebook</v-icon></v-btn
          >
          <v-btn icon class="social-link" color="grey-darken-3" href="#"
            ><v-icon size="40">mdi-twitter</v-icon></v-btn
          >
          <v-btn icon class="social-link" color="grey-darken-3" href="#"
            ><v-icon size="40">mdi-instagram</v-icon></v-btn
          >
          <v-btn icon class="social-link" color="grey-darken-3" href="#"
            ><v-icon size="40">mdi-linkedin</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {};
</script>

<style scoped>
p a {
  text-decoration: none;
  color: inherit; /* To inherit the text color from the parent container (in this case, the button) */
  letter-spacing: 0.1rem; /* Adjust this value according to your needs */
}
</style>
