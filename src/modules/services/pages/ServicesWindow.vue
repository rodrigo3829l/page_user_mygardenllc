<template>
  <div class="container">
    <div class="service-page">
      <h1 class="page-title">Our services</h1>
      <div class="service-selector">
        <label for="serviceSelect">Filter Services.</label>
        <select id="serviceSelect" class="form-select ">
          <option value="jardineria">Jardinería</option>
          <option value="construccion">Construcción</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
      </div>
      <div class="service-cards-container">
        <CardService
          v-for="servicio in servicios"
          :key = "servicio.id"
          :servicio="servicio"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default{
  data(){
    return {
      servicios : [
        {id: 1, name: "Pruning Trees", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia expedita temporibus nobis, deleniti dicta neque sint laudantium molestias dolorem iusto quasi nulla aliquid atque? Modi temporibus soluta numquam! Porro, vitae?", image: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg", rating: 2},
        {id: 2, name: "Garden Maintenance", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia expedita temporibus nobis, deleniti dicta neque sint laudantium molestias dolorem iusto quasi nulla aliquid atque? Modi temporibus soluta numquam! Porro, vitae?", image: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg", rating: 5},
        {id: 3, name: "Wall Erection", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia expedita temporibus nobis, deleniti dicta neque sint laudantium molestias dolorem iusto quasi nulla aliquid atque? Modi temporibus soluta numquam! Porro, vitae?", image: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg", rating: 3},
      ]
    }
  },
  components : {
    CardService : defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/services/components/CardService')),
  }
}
</script>

<style scoped>
.service-page {
  text-align: center;
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
}

.service-selector {
  margin: 20px 0;
}

label {
  font-weight: bold;
  display: inline-block;
  margin-right: 10px;
}

.form-select {
  padding: 8px;
  font-size: 14px;
  width: 200px;
}

.service-details {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: left;
}
.service-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

h2 {
  font-size: 20px;
  margin-top: 0;
}

.btn-back {
  background-color: #3E7347;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-back:hover {
  background-color: #1c882f;
}
</style>
