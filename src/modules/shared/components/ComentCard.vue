<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        Comentarios
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="comment">Escribe tu comentario:</label>
          <textarea id="comment" class="form-control" v-model="userComment"></textarea>
        </div>
        <div class="form-group">
          <label for="rating">Calificación (de 1 a 5 estrellas):</label>
          <select id="rating" class="form-control" v-model="userRating">
            <option value="1">1 estrella</option>
            <option value="2">2 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="5">5 estrellas</option>
          </select>
        </div>
        <button class="btn btn-primary" @click="submitComment">Subir</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userComment: '',
      userRating: '5' // Valor predeterminado de 5 estrellas
    };
  },
  methods: {
    submitComment() {
      // Aquí puedes manejar la lógica para enviar el comentario y calificación a tu servidor o realizar otras acciones necesarias.
      console.log('Comentario:', this.userComment);
      console.log('Calificación:', this.userRating);
    }
  }
};
</script>
