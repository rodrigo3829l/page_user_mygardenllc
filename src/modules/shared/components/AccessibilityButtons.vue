<template>
  <div class="accessibility-buttons">
    <router-link :to="{ name: 'accesibility' }">
      <v-btn class="visual btn" @mouseover="expand" @mouseout="shrink">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </router-link>
    <router-link :to="{ name: 'home-home' }">
      <v-btn
        class="auditory btn"
        @mouseover="expand"
        @mouseout="shrink"
        @click="reloadPage"
      >
        <v-icon>mdi-hearing</v-icon>
      </v-btn>
    </router-link>
    <router-link :to="{ name: 'accesibility' }">
      <v-btn class="mobility btn" @mouseover="expand" @mouseout="shrink">
        <v-icon>mdi-wheelchair-accessibility</v-icon>
        <!-- Icono de silla de ruedas -->
      </v-btn>
    </router-link>
    <v-btn
      class="html btn"
      @mouseover="expand"
      @mouseout="shrink"
      @click="toggleNoStyles"
    >
      <v-icon>mdi-language-html5</v-icon>
      <!-- Icono de HTML -->
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    expand(event) {
      let icon = event.target.querySelector(".v-icon");
      event.target.style.width = "100px"; // Expande el botón
      if (icon) icon.style.width = "100%"; // Expande el icono
    },
    shrink(event) {
      let icon = event.target.querySelector(".v-icon");
      event.target.style.width = "80px"; // Contrae el botón
      if (icon) icon.style.width = "100%"; // Contrae el icono
    },
    toggleNoStyles() {
      this.$store.commit("toggleNoStyles");
    },
    reloadPage() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.accessibility-buttons {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 1000;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;
}

.btn {
  width: 50px;
  height: 50px;
  transition: width 0.3s ease;
  font-size: 24px;
  color: white;
  border-radius: 0; /* Quita los bordes redondeados */
}

.v-icon {
  width: 100%;
}

.visual {
  background-color: #3e7347;
}

.auditory {
  background-color: #b06204;
}

.mobility {
  background-color: #255a35;
}

.html {
  background-color: #8b4513;
}
</style>

<!-- <template>
  <div class="accessibility-buttons">

    <router-link :to="{ name: 'accesibility' }">
      <v-btn class="visual btn" :class="{ 'expanded': expanded }" @mouseenter="expand" @mouseleave="shrink">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </router-link>

    <router-link :to="{ name: 'home-home' }">
      <v-btn class="visual btn" :class="{ 'expanded': expanded }" @mouseenter="expand" @mouseleave="shrink">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </router-link>

    <router-link :to="{ name: 'accesibility' }">
      <v-btn class="visual btn" :class="{ 'expanded': expanded }" @mouseenter="expand" @mouseleave="shrink">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </router-link>

    <router-link :to="{ name: 'home-home' }">
      <v-btn class="visual btn" :class="{ 'expanded': expanded }" @mouseenter="expand" @mouseleave="shrink">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    expand() {
      this.expanded = true;
    },
    shrink() {
      this.expanded = false;
    },
    toggleNoStyles() {
      this.$store.commit('toggleNoStyles');
    },
    reloadPage() {
      location.reload();
    }
  }
};
</script>

<style scoped>
.accessibility-buttons {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 1000;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;
}

.btn {
  width: 50px;
  height: 50px;
  transition: width 0.3s ease;
  font-size: 24px;
  color: white;
  border-radius: 0; 
}

.v-icon {
  width: 100%;
}

.visual {
  background-color: #3E7347;
}

.auditory {
  background-color: #b06204;
}

.mobility {
  background-color: #255A35;
}

.html {
  background-color: #8B4513;
}
.btn.expanded {
  width: 100px; 
}
</style> -->
