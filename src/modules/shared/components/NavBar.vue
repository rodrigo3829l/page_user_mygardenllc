<!-- <template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-nav" :class="{ 'bg-green': !scrolled, 'bg-green': scrolled }">
    <div class="container">
      <a class="navbar-brand" href="#">
        <div class="d-flex align-items-center">
          <img src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1697989916/logos/jgkamjqwy97zkb0hfsye.png" alt="Logo" class="logo">
          <div class="d-md-none d-lg-block">
            <p class="company-name">My Garden LLC</p>
            <p class="subtitle">Servicios de Jardinería y más</p>
          </div>
        </div>
      </a>
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <CustomLink
            v-for="link in links"
            :key="link.to"
            :link="link"
          />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  data() {
    return {
      links: [
        { to: 'home-home', name: 'Home' },
        { to: 'login-login', name: 'Login' },
        { to: 'profile-profile', name: 'Perfil' },
        { to: 'services-services', name: 'Servicios' },
        { to: 'proyects-view', name: 'Proyectos' },
        { to: 'home-contact', name: 'Contacto' },
        { to: 'home-answers', name: 'Preguntas frecuentes' },
      ],
      scrolled: false,
      prevScrollPosition: 0,
    };
  },

  components: {
    CustomLink: defineAsyncComponent(() => import('./CustomLink.vue')),
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > this.prevScrollPosition) {
        this.scrolled = false;
      } else {
        this.scrolled = true;
      }

      this.prevScrollPosition = currentScrollPosition;

      const navBar = document.querySelector('.navbar');

      if (this.scrolled) {
        navBar.classList.add('fixed-nav');
      } else {
        navBar.classList.remove('fixed-nav');
      }
    },
    closeMobileMenu() {
      // Este método cierra el menú en dispositivos móviles
      const navBar = document.getElementById('navbarNav');
      const toggleButton = document.querySelector('.navbar-toggler');
      if (navBar.classList.contains('show')) {
        navBar.classList.remove('show');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  padding: 10px 0;
  transition: background-color 0.5s;
}

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

.bg-transparent {
  background-color: #3E7347;
}

.bg-green {
  background-color: #3E7347;
}

.fixed-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.5s;
}

.nav-link {
  color: #c6c5c5;
  padding: 0.5rem 1rem;
}

.is-active {
  color: #ffffff;
}
</style> -->


<!-- <template>
  <nav class="navbar navbar-expand-lg navbar-light bg-green">
    <div class="container">
      <a class="navbar-brand" href="#">
        <div class="d-flex align-items-center">
          <img src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1697989916/logos/jgkamjqwy97zkb0hfsye.png" alt="Logo" class="logo">
          <div class="d-md-none d-lg-block">
            <p class="company-name">
              My Garden LLC
            </p>
            <p class="subtitle">
              Gardening Services and More.
            </p>
          </div>
        </div>
      </a>
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <CustomLink
            v-for="link in links"
            :key="link.to"
            :link="link"
          />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  data() {
    return {
      links: [
        // { to: 'home-home', name: 'Home' },
        // { to: 'login-login', name: 'Login' },
        // { to: 'profile-profile', name: 'Perfil' },
        // { to: 'services-services', name: 'Servicios' },
        // { to: 'proyects-view', name: 'Proyectos' },
        // { to: 'home-contact', name: 'Contacto' },
        // { to: 'home-answers', name: 'Preguntas frecuentes' },
        { to: 'home-home', name: 'Home' },
        { to: 'login-login', name: 'Login' },
        { to: 'profile-profile', name: 'Profile' },
        { to: 'services-services', name: 'Services' },
        { to: 'proyects-view', name: 'Projects' },
        { to: 'home-contact', name: 'Contact' },
        { to: 'home-answers', name: 'Frequent Fuestions' },
      ],
      scrolled: false,
      prevScrollPosition: 0,
    };
  },

  components: {
    CustomLink: defineAsyncComponent(() => import('./CustomLink.vue')),
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    speak(text) {
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    }
  },
};
</script>

<style scoped>
.navbar {
  padding: 10px 0;
  transition: background-color 0.5s;
}

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

.bg-transparent {
  background-color: #3E7347;
}

.bg-green {
  background-color: #3E7347;
}

.fixed-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.5s;
}

.nav-link {
  color: #c6c5c5;
  padding: 0.5rem 1rem;
}

.is-active {
  color: #ffffff;
}
</style> -->


<!-- <template>
  <v-app-bar color="green-darken-3">
    <v-toolbar-title class="mr-auto">
      <v-img
        class="mr-2"
        contain
        height="50"
        src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1697989916/logos/jgkamjqwy97zkb0hfsye.png"
      ></v-img>
      <span class="title">My Garden LLC</span>
      <br>
      <span class="subtitle">Gardening Services and More.</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <custom-link
        v-for="link in links"
        :key="link.name"
        :link="link"
      ></custom-link>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    CustomLink: defineAsyncComponent(() => import('../modules/shared/components/CustomLink.vue')),
  },
  data() {
    return {
      links: [
        { name: 'Home', to: 'home-home', icon: 'mdi-home' },
        { name: 'Login', to: 'login-login', icon: 'mdi-login' },
        { name: 'Profile', to: 'profile-profile', icon: 'mdi-account' },
        { name: 'Services', to: 'services-services', icon: 'mdi-hammer-screwdriver' },
        { name: 'Projects', to: 'proyects-view', icon: 'mdi-briefcase' },
        { name: 'Contact', to: 'home-contact', icon: 'mdi-email' },
        { name: 'Frequent Questions', to: 'home-answers', icon: 'mdi-help-circle' },
      ],
    };
  },
};
</script>


<style scoped>
.title {
  font-size: 1.25rem;
  font-weight: 500;
}

.subtitle {
  font-size: 0.875rem;
}
</style> -->
<!-- 
<template>
  <v-layout class="overflow-visible" style="height: 56px;" >
    <v-bottom-navigation
      v-model="value"
      color="blue-grey-lighten-2"
      grow
      bg-color="green-darken-3"
    >
      <v-btn v-for="link in links" :key="link.name" @click="navigateTo(link.to)">
        <v-icon>{{ link.icon }}</v-icon>
          {{ link.name }}
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
// import { defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    // CustomLink: defineAsyncComponent(() => import('../modules/shared/components/CustomLink.vue')),
  },
  setup() {
    const router = useRouter();
    const navigateTo = (route) => {
      router.push({ name: route });
    };
    return { navigateTo };
  },
  data() {
    return {
      links: [
        { name: 'Home', to: 'home-home', icon: 'mdi-home' },
        { name: 'Login', to: 'login-login', icon: 'mdi-login' },
        { name: 'Profile', to: 'profile-profile', icon: 'mdi-account' },
        { name: 'Services', to: 'services-services', icon: 'mdi-hammer-screwdriver' },
        { name: 'Projects', to: 'proyects-view', icon: 'mdi-briefcase' },
        { name: 'Contact', to: 'home-contact', icon: 'mdi-email' },
        { name: 'Frequent Questions', to: 'home-answers', icon: 'mdi-help-circle' },
      ],
      value: 1
    };
  },
};
</script>

<style scoped>
  .v-btn a {
    text-decoration: none;
    color: inherit; /* Para heredar el color del texto del contenedor padre (en este caso, el botón) */
  }
</style>

   -->
   <template>
    <nav class="navbar navbar-expand-lg navbar-light bg-green-darken-3">
      <v-container>
        <div class="container">
          <v-row align="center" justify="center">
            <v-col cols="auto">
              <router-link to="/" class="navbar-brand">
                <div class="d-flex align-items-center">
                  <img src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1697989916/logos/jgkamjqwy97zkb0hfsye.png" alt="Logo" class="logo">
                </div>
              </router-link>
            </v-col>
  
            <v-col cols="auto" class="d-md-none d-lg-block">
              <p class="company-name">
                My Garden LLC
              </p>
              <p class="subtitle">
                Gardening Services and More.
              </p>
            </v-col>
  
            <v-col cols="auto">
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
            </v-col>
  
            <v-col cols="auto">
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
                    <v-icon size="15" color="white">mdi-login</v-icon>Login
                  </router-link>
                </ul>
              </div>
            </v-col>
  
            <!-- Agregamos el componente de avatar aquí -->
            <v-col v-if="userStore.token !== null" cols="auto">
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
                      <span class="text-h5">{{ user.initials }}</span>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <div class="mx-auto text-center">
                      <v-avatar
                        color="light-blue-darken-4"
                      >
                        <span class="text-h5">{{ user.initials }}</span>
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
                        Your Account
                      </v-btn>
                      <v-divider class="my-3"></v-divider>
                      <v-btn
                        rounded
                        variant="text"
                        @click="logout"
                      >
                        Disconnect
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </nav>
  </template>
  
  <script>
    import { useUserStore } from '@/store/store';
    import { useRouter } from 'vue-router';
    
    export default {
      setup() {
        const userStore = useUserStore();
        const router = useRouter();
    
        let links = [
          { name: 'Home', to: 'home-home', icon: 'mdi-home' },
          { name: 'Services', to: 'services-services', icon: 'mdi-hammer-screwdriver' },
          { name: 'Projects', to: 'proyects-view', icon: 'mdi-briefcase' },
          { name: 'Contact', to: 'home-contact', icon: 'mdi-email' },
          { name: 'Frequent Questions', to: 'home-answers', icon: 'mdi-help-circle' },
        ];
    
        // if (userStore.token === null) {
        //   links.push({ name: 'Login', to: 'login-login', icon: 'mdi-login' });
        // }
    
        const logout = async () => {
          await userStore.logout();
          router.push('/');
        };
    
        return {
          links,
          drawer: false,
          userStore,
          user: {
            initials: 'RD',
            fullName: 'Rodigo Del Angel',
            email: 'prueba@gmail.com',
          },
          speak: (text) => {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
          },
          profile: () => {
            router.push({ name: 'profile-profile' });
          },
          logout, // Agregar la función logout al retorno
        };
      },
    
      mounted() {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          this.userStore.refreshToken();
        }
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
  </style>
  
  
  