<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h2>Ejemplo de servicio</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut nobis laudantium voluptate ex commodi similique ut. Id laboriosam aliquid voluptate delectus repellat ratione reprehenderit, corrupti mollitia voluptas? Earum, officiis accusantium.</p>
        <div class="stars">
          <span v-for="star in 5" :key="star" :class="{ 'filled-star': star <= 5 }">★</span>
        </div>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="descripcion">Describa brevemente como desea su servicio</label>
          <textarea class="form-control" id="descripcion" rows="4"></textarea>
        </div>

        <div class="service-image">
          <div class="image-input">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="imagen" @change="handleImageUpload" accept="image/*">
              <label class="custom-file-label" for="imagen">Seleccione una foto del area a trabajar</label>
            </div>
          </div>
          <div class="image-preview">
            <img v-if="formData.imagen" :src="formData.imagen" alt="Imagen seleccionada">
            <div v-else class="image-placeholder">Imagen seleccionada</div>
          </div>
        </div>

        <div class="service-date mt-1">
          <label for="fecha">Seleccionar Fecha de visita para la cotizacion</label>
          <input type="date" class="form-control rounded" name="fecha" id="fecha">
        </div>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <router-link :to="{name: 'services-services'}">
          <button class="btn button-danger" >Cancelar</button>
        </router-link>
        <router-link :to="{name: 'profile-profile' }">
          <button class="btn button-succes" >Cotizar</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    servicio: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        imagen: null,
      },
    };
  },
  methods: {
    handleImageUpload(event) {
      // Maneja la subida de imágenes y muestra una vista previa
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.imagen = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    openCalendarModal() {
      // Abre la ventana modal para seleccionar una fecha
      // Utiliza el componente CalendarCard
      // Puedes implementar esta lógica según tus necesidades
    },
    cancelAgendar() {
      // Implementa la lógica para cancelar la acción
    },
    cotizar() {
      // Implementa la lógica para cotizar el servicio
    },
  },
};
</script>

<style scoped>
.card {
  margin: 50px 60px;
}
.service-date{
  text-align: center;
}
.card-header {
  background-color: #3E7347;
  color: #fff;
}
.stars {
  font-size: 24px;
  margin-top: 10px;
}
.filled-star {
  color: #FFD700; /* Color de estrella rellena (amarillo) */
}
.service-image {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 2px 100px;
}
.image-preview {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}
.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  position: absolute;
}
.image-placeholder {
  font-size: 14px;
  color: #666;
  position: absolute;
  z-index: 1;
  user-select: none;
}
.image-input {
  flex-grow: 1;
}
.btn-select-image {
  background-color: #3E7347;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>
