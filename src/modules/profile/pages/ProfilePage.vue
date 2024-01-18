<template>
  <br>
  <div class="container">
    <div class="row">
      <!-- Sección del usuario -->
      <div class="col-md-4">
        <div class="user-profile d-flex flex-column justify-content-center text-center">
          <h2>Perfil</h2> <!-- Título "Perfil" agregado -->
          <img class="profile-picture" src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" alt="Perfil">
          <div class="user-details">
            <div class="user-input">
              <label class="user-label">Nombre:</label>
              <input class="form-control" value="Rodrigo" readonly>
            </div>
            <div class="user-input">
              <label class="user-label">Apellidos:</label>
              <input class="form-control" value="Del Ángel Gerardo" readonly>
            </div>
            <div class="user-input">
              <label class="user-label">Teléfono:</label>
              <input class="form-control" value="1234567890" readonly>
            </div>
            <div class="user-input">
              <label class="user-label">Dirección:</label>
              <input class="form-control" value="123 Main St, Ciudad, País" readonly>
            </div>
          </div>
          <router-link :to="{name: 'profile-edit'}">
            <button class="btn button-action form-control mt-4">Editar Perfil</button>
            <!-- <button class="btn button-succes form-control mt-4">Editar Perfil</button> -->
          </router-link>
        </div>
      </div>
      
      <!-- Sección de servicios del usuario -->
      <div class="col-md-8">
        <div class="user-services">
          <CardService
            v-for="service in services"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  data() {
    return {
      services: [
        {
          id: 1,
          image: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
          name: 'Servicio 1',
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sit perspiciatis sed repudiandae facere amet sint. Accusamus, harum sequi. Vero minus',
          status: "En cotizacion"
        },
        {
          id: 2,
          image: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
          name: 'Servicio 2',
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sit perspiciatis sed repudiandae facere amet sint. Accusamus, harum sequi. Vero minus',
          status: "En seguimiento"
        },
        {
          id: 3,
          image: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
          name: 'Servicio 3',
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sit perspiciatis sed repudiandae facere amet sint. Accusamus, harum sequi. Vero minus',
          status: "Cotizado"
        },
        {
          id: 4,
          image: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
          name: 'Servicio 4',
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur sit perspiciatis sed repudiandae facere amet sint. Accusamus, harum sequi. Vero minus',
          status: "Concluido"
        },
      ],
    };
  },
  components: {
    CardService: defineAsyncComponent(() => import('@/modules/profile/components/CardServiceUser')),
  },
};
</script>
