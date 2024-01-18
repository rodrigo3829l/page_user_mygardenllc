<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="header-form">
        <h1 class="text-center">Editar Perfil</h1>
      </div>
      <div class="card-body">
        <!-- Foto de perfil -->
        <div class="service-image">
          <div class="image-input">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="imagen" @change="handleImageUpload" accept="image/*">
              <label class="custom-file-label" for="imagen">Eliga su nueva foto de perfil</label>
            </div>
          </div>
          <div class="image-preview">
            <img v-if="formData.imagen" :src="formData.imagen" alt="Imagen seleccionada">
            <img v-else src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" alt="Imagen de perfil por defecto">
          </div>
        </div>

        <!-- Nombre -->
        <div class="mb-3">
          <label for="nombre">Nombre</label>
          <input type="text" class="form-control" id="nombre" v-model="formData.nombre" placeholder="Rodrigo">
        </div>

        <!-- Apellidos centrados con márgenes -->
        <div class="mb-3 d-flex justify-content-center">
          <div style="margin-right: 50px;">
            <label for="apellidoPaterno">Apellido Paterno</label>
            <input type="text" class="form-control" id="apellidoPaterno" v-model="formData.apellidoPaterno" placeholder="Del Angel">
          </div>
          <div style="margin-left: 50px;">
            <label for="apellidoMaterno">Apellido Materno</label>
            <input type="text" class="form-control" id="apellidoMaterno" v-model="formData.apellidoMaterno" placeholder="Gerardo">
          </div>
        </div>

        <!-- Teléfono -->
        <div class="mb-3">
          <label for="telefono">Teléfono</label>
          <input type="tel" class="form-control" id="telefono" v-model="formData.telefono" placeholder="0123456789">
        </div>

        <!-- Suspender cuenta (select) -->
        <div class="mb-3">
          <label for="suspenderCuenta">Desea suuspender su cuenta</label>
          <select class="form-control" id="suspenderCuenta" v-model="formData.suspenderCuenta">
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <router-link :to="{name: 'profile-profile'}">
          <button class="btn button-danger">Regresar</button>
        </router-link>
        <router-link :to="{name: 'profile-profile'}">
          <button class="btn button-succes">Guardar Cambios</button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formData: {
        imagen: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png',
        nombre: 'Rodrigo',
        apellidoPaterno: 'Del Angel',
        apellidoMaterno: 'Gerardo',
        telefono: '0123456789',
        suspenderCuenta: 'no',
      },
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.imagen = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.card {
  margin: 50px 0;
  
}
.service-image {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 0 20px 20px 20px;
}
.image-preview {
  width: 250px;
  height: 200px;
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

@media screen and (max-width: 992px) {
  .image-preview {
    height: 145px;
  }
}
</style>
