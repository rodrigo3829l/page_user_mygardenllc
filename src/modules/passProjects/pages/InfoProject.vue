<template>
  <div class="container mt-4">
    <h1 class="text-center mt-4">{{ proyecto.name }}</h1>
    <div class="row mt-4">
      <div class="col-md-6">
        <img :src="proyecto.image" alt="Imagen del proyecto" class="img-fluid project-image" />
      </div>
      <div class="col-md-6">
        <h2>Descripción</h2>
        <p>{{ proyecto.description }}</p>
        <h2>Calificación</h2>
        <div class="star-ratings">
          <span v-for="star in 5" :key="star" :class="{ 'filled-star': star <= proyecto.rating }">★</span>
        </div>
      </div>
    </div>
    
    <h2>Comentarios</h2>
    <ComentsUserCard
      v-for="comment in Comentarios"
      :key="comment.userName"
      :userAvatar="comment.userAvatar"
      :userName="comment.userName"
      :commentText="comment.commentText"
      :rating="comment.rating"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  data(){
    return {
      proyecto: {
        name: 'Ejemplo de proyecto',
        image: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi saepe voluptates, odit reprehenderit laboriosam ab libero officiis consequatur veniam dolor autem amet ut sint quaerat quidem ullam distinctio explicabo aperiam?',
        rating: 5,
      },
      Comentarios : [
        {
          userAvatar: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
          userName: 'Rodrigo Del Angel Gerardo',
          commentText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure doloremque omnis, consequuntur voluptate laborum aspernatur excepturi velit aliquid suscipit! Maxime laudantium molestiae',
          rating: 4, 
        },
        {
          userAvatar: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
          userName: 'Avelina Hernandez Hernandez',
          commentText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure doloremque omnis, consequuntur voluptate laborum aspernatur excepturi velit aliquid suscipit! Maxime laudantium molestiae',
          rating: 5, 
        },
        {
          userAvatar: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
          userName: 'Juan perez Hernandez Hernandez',
          commentText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure doloremque omnis, consequuntur voluptate laborum aspernatur excepturi velit aliquid suscipit! Maxime laudantium molestiae',
          rating: 3, 
        },
        {
          userAvatar: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
          userName: 'Josue Hernandez Guzman',
          commentText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure doloremque omnis, consequuntur voluptate laborum aspernatur excepturi velit aliquid suscipit! Maxime laudantium molestiae',
          rating: 4, 
        }
      ],
    }
  },
  components: {
    ComentsUserCard: defineAsyncComponent(() =>
      import('@/modules/shared/components/ComentsUserCard')
    ),
  },
};
</script>

<style scoped>
.star-ratings {
  font-size: 24px;
  margin-top: 5px;
}

.filled-star {
  color: #f39c12; /* Color de la estrella rellena */
}

.project-image {
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
