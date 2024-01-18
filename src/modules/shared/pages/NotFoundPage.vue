<template>
    <div class="error-container">
      <div class="error-content">
        <img :src="iconSrc" alt="Error 404 Icon" class="error-icon">
        <h2 class="error-title">Error 404: ¡Oops!</h2>
        <p class="error-message">
          Parece que has llegado a un rincón de nuestro jardín que no existe.
          Te invitamos a explorar nuestras páginas principales.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        iconSrc: 'https://cdn-icons-png.flaticon.com/128/1761/1761536.png' // URL del ícono
      };
    }
  };
  </script>
  
  <style scoped>
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0 300px;
  }
  
  .error-content {
    text-align: center;
  }
  
  .error-icon {
    max-width: 200px; /* Tamaño del ícono aumentado */
    margin-bottom: 20px;
  }
  
  .error-title {
    font-size: 3rem; /* Tamaño del título aumentado */
    color: #e74c3c; /* Color personalizado para el título */
  }
  
  .error-message {
    font-size: 1.5rem; /* Tamaño del mensaje aumentado */
    color: #333; /* Color de texto personalizado */
    margin-top: 10px;
  }
  </style>
  