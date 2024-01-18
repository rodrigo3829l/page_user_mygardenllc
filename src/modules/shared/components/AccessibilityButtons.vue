<template>
    <div class="accessibility-buttons">
        <router-link :to="{name: 'accesibility'}">
            <button class="btn visual" @mouseover="expand" @mouseout="shrink">
                <i class="fa fa-eye"></i> <!-- Icono de discapacidad visual -->
            </button>
        </router-link>
        <router-link :to="{name: 'home-home'}">
            <button class="btn auditory" @mouseover="expand" @mouseout="shrink" @click="reloadPage">
                <i class="fa fa-deaf"></i> <!-- Icono de discapacidad auditiva -->
            </button>
        </router-link>
        <router-link :to="{name: 'accesibility'}">
            <button class="btn mobility" @mouseover="expand" @mouseout="shrink">
                <i class="fa fa-wheelchair"></i> <!-- Icono de silla de ruedas -->
            </button>
        </router-link>
          <button class="btn html" @mouseover="expand" @mouseout="shrink" @click="toggleNoStyles">
            <i class="fa fa-html5"></i> <!-- Icono de HTML -->
          </button>   
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      expand(event) {
        let icon = event.target.querySelector('i');
        event.target.style.width = '100px'; // Expande el botón
        if (icon) icon.style.width = '100%'; // Expande el icono
      },
      shrink(event) {
        let icon = event.target.querySelector('i');
        event.target.style.width = '80px'; // Contrae el botón
        if (icon) icon.style.width = '100%'; // Contrae el icono
      },
      toggleNoStyles() {
        this.$store.commit('toggleNoStyles')
      },
      reloadPage() {
        location.reload()
      }
    }
  }
  </script>
  
  <style scoped>
  .accessibility-buttons {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
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
  
  .fa {
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
  </style>
  