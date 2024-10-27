<template>
  <li class="nav-item">
    <router-link
      :to="{ name: link.to }"
      v-slot="{ isActive }"
      @click="closeMobileMenu"
    >
      <a :class="isActive ? 'is-active nav-link' : 'normal-link nav-link'">
        {{ link.name }}
      </a>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeMobileMenu() {
      // Cierra el menú en dispositivos móviles
      const navBar = document.getElementById("navbarNav");
      const toggleButton = document.querySelector(".navbar-toggler");
      if (navBar.classList.contains("show")) {
        navBar.classList.remove("show");
        toggleButton.setAttribute("aria-expanded", "false");
      }
    },
  },
};
</script>

<!-- 
   <template>
    <v-list-item  @click="closeMobileMenu">
      <v-list-item-icon>
        <v-icon>{{ link.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ link.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </template>
  
  <script>
  export default {
    props: {
      link: {
        type: Object,
        required: true,
      },
    },
    methods: {
      closeMobileMenu() {
        // Cierra el menú en dispositivos móviles
        const navBar = document.getElementById('navbarNav');
        const toggleButton = document.querySelector('.navbar-toggler');
        if (navBar.classList.contains('show')) {
          navBar.classList.remove('show');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      },
    },
  };
  </script> -->
