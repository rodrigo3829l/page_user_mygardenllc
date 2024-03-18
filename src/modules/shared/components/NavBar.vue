<template>
  <v-navigation-drawer
      v-model="drawer"
    >
    <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
        title="John Leider"
        subtitle="ejemplo de correo"
      ></v-list-item>

      <v-divider></v-divider>
      <v-list-item
        v-for="(link, index) in links"
        :key="index"
        :prepend-icon="link.icon"
        :title="link.name"
        @click="$router.push({ name: link.to })"
        :value="link.to"
      ></v-list-item>

      <v-list-item v-if="!userStore.token" prepend-icon="mdi-login" :title="$t('navbar.loginString')"></v-list-item>

      <div v-if="userStore.token">
        <v-list-item prepend-icon="mdi-account" @click="$router.push({ name: 'profile-profile' })" :title="$t('navbar.yourAccountString')"></v-list-item>
        <v-list-item prepend-icon="mdi-cogs" @click="$router.push({ name: 'profile-myservices' })" :title="$t('navbar.yourServices')"></v-list-item>
      </div>

      <v-list-item v-if="theme.global.name.value === 'dark'" prepend-icon="mdi-white-balance-sunny" title="Light" @click="toggleTheme"></v-list-item>
      <v-list-item v-if="theme.global.name.value === 'light'" prepend-icon="mdi-weather-night" title="Dark" @click="toggleTheme"></v-list-item>
      <v-list-item v-if="this.$i18n.locale === 'en'" prepend-icon="mdi-translate" title="Español" @click="changeLanguage('es')"></v-list-item>
      <v-list-item v-if="this.$i18n.locale === 'es'" prepend-icon="mdi-translate" title="Inglish" @click="changeLanguage('en')"></v-list-item>

      <template v-slot:append v-if="userStore.token"> 
        <div class="pa-2">
          <v-btn block @click="logout">
            {{ $t('navbar.logoutString') }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  <nav class="navbar navbar-expand-lg navbar-light bg-green-darken-3 navbar-transition" clipped-left>
    <v-container>
      <div class="container">
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <router-link to="/" class="navbar-brand">
              <div class="d-flex align-items-center">
                <img src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png" alt="Logo" class="logo">
              </div>
            </router-link>
          </v-col>
          <v-col cols="auto" class="d-md-none d-lg-block">
            <p class="company-name">
              My Garden LLC
            </p>
            <p class="subtitle">
              {{ $t('navbar.subtitleString') }}
            </p>
          </v-col>
          <!-- <v-col cols="auto">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </v-col> -->
          <!-- a este -->
          <v-col v-if="width > pixels" cols="auto">
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <router-link
                  v-for="link in links"
                  :key="link.to"
                  :to="{ name: link.to }"
                  class="nav-link"
                  :class="{ 'is-active': $route.name === link.to }"
                >
                  <v-icon size="15" color="white">{{ link.icon }}</v-icon>{{ link.name }}
                </router-link>
                <router-link v-if="userStore.token === null"
                  :to="{ name: 'login-login' }"
                  class="nav-link is-active"
                >
                  <v-icon size="15" color="white">mdi-login</v-icon>{{ $t('navbar.loginString') }}
                </router-link>
              </ul>
            </div>
          </v-col>
          <!-- a este -->
          <v-col v-if="userStore.token !== null && width > pixels " cols="auto">
            <v-menu
              min-width="200px"
              rounded
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  v-bind="props"
                >
                  <v-avatar
                    color="light-blue-darken-4"
                    size="large"
                  >
                    <v-icon icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <div class="mx-auto text-center">
                    <v-avatar
                      color="light-blue-darken-4"
                    >
                      <v-icon icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                    <h3>{{ userStore.name }}</h3>
                    <p class="text-caption mt-1">
                      {{ userStore.email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                      rounded
                      variant="text"
                      @click="profile"
                    >
                      {{ $t('navbar.yourAccountString') }}
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                      rounded
                      variant="text"
                      @click="services"
                    >
                      {{ $t('navbar.yourServices') }}
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                      rounded
                      variant="text"
                      @click="logout"
                    >
                      {{ $t('navbar.logoutString') }}
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-col>
          <!-- a este -->
          <v-col cols="auto" class="d-flex align-items-center">
            <v-btn icon variant="text" @click="changeLanguage('en')" class="mx-1" v-if="this.$i18n.locale === 'es' && width > pixels ">
              <v-img
                src="https://flagcdn.com/16x12/us.webp"
                alt="USA"
                width="16"
                height="12"
              ></v-img>
            </v-btn>
            <v-btn icon variant="text" @click="changeLanguage('es')" class="mx-1" v-if="this.$i18n.locale === 'en' && width > pixels " >
              <v-img
                src="https://flagcdn.com/16x12/mx.webp"
                alt="Mexico"
                width="16"
                height="12"
              ></v-img>
            </v-btn>
            <v-app-bar-nav-icon v-if="width < pixels"  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-btn v-if="width > pixels"  icon variant="text" @click="toggleTheme" >
              <v-icon v-if="theme.global.name.value === 'light'">mdi-moon-waning-crescent</v-icon>
              <v-icon v-if="theme.global.name.value === 'dark'">mdi-white-balance-sunny</v-icon>

            </v-btn> 
          </v-col>

        </v-row>
      </div>
    </v-container>
  </nav>
</template>

<script>
  import { useUserStore } from '@/store/store';
  import { setLanguage } from '@/store/languajeStore';
  import { useDisplay } from 'vuetify'
  import { useTheme } from 'vuetify'
  const userStore = useUserStore();
  
  export default {
    setup() {
        const { width, mobile } = useDisplay()
        const theme = useTheme()
        const toggleTheme = () => {
          theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        }
        return {
          theme,
          toggleTheme,
          width,
          mobile
        };
      },
    
    data() {
      return {
        links : [
          { name: this.$t('navbar.homeString'), to: 'home-home', icon: 'mdi-home' },
          { name: this.$t('navbar.servicesString'), to: 'services-services', icon: 'mdi-hammer-screwdriver' },
          { name: this.$t('navbar.projectsString'), to: 'proyects-view', icon: 'mdi-briefcase' },
          { name: this.$t('navbar.contactString'), to: 'home-contact', icon: 'mdi-email' },
          { name: this.$t('navbar.faqsString'), to: 'home-answers', icon: 'mdi-help-circle' },
        ],
        drawer: false,
        userStore,
        pixels : 750
      }
    },
    
    methods: {
      
      speak (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      },
      profile () {
        this.$router.push({ name: 'profile-profile' });
      },
      services () {
        this.$router.push({ name: 'profile-myservices' });
      },
      async logout() {
        await userStore.logout();
        this.$router.push('/');
      },
      changeLanguage(lang) {
        this.$i18n.locale = lang;
        setLanguage(lang);
      },
      hideNavbar() {
        const navbar = document.querySelector('.navbar-transition');
        if (navbar) navbar.style.opacity = '0';
      },
      showNavbar() {
        const navbar = document.querySelector('.navbar-transition');
        if (navbar) navbar.style.opacity = '1';
      }
    },
    mounted() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.userStore.refreshToken();
      }
      let lastScrollTop = 0; 

      window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
          this.hideNavbar();
        } else {
          this.showNavbar();
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Evita valores negativos
      }, false);
    },
  };
</script>

<style scoped>
  .logo {
    width: 120px;
    margin-right: 10px;
  }

  .company-name {
    font-weight: bold;
    font-size: 18px;
    margin: 0;
    color: #efe9e9;
  }

  .subtitle {
    font-size: 14px;
    margin: 0;
    color: #efe9e9;
  }

  .nav-link {
    color: #c6c5c5;
    padding: 0.5rem 1rem;
  }

  .is-active {
    color: #ffffff;
  }

  .navbar-transition {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: opacity 0.5s ease-in-out;
    opacity: 1;
  }

</style>