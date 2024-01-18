<template>
  <div class="container">
    <div class="payment-container">
      <!-- Tarjeta de crédito editable a la izquierda -->
      <div class="credit-card">
        <div class="credit-card-top">
          <img src="logo-tarjeta.png" alt="Logo de la tarjeta" />
        </div>
        <div class="credit-card-number">
          {{ formData.cardNumber.slice(0, 4) || '####' }}
          {{ formData.cardNumber.slice(4, 8) || '####' }}
          {{ formData.cardNumber.slice(8, 12) || '####' }}
          {{ formData.cardNumber.slice(12) || '####' }}
        </div>
        <div class="credit-card-bottom">
          <div class="credit-card-name">
            {{ formData.cardHolder || 'TITULAR DE LA TARJETA' }}
          </div>
          <div class="credit-card-expiry-cvv">
            <div class="credit-card-expiry">
              {{ formData.expiry || 'MM/YY' }}
            </div>
            <div class="credit-card-cvv">
              {{ formData.cvv || 'CVV' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario de pago a la derecha -->
      <div class="payment-form shadow">
        <h2>Detalles de Pago</h2>
        <div class="form-group">
          <label for="cardHolder">Nombre del Titular</label>
          <input type="text" id="cardHolder" v-model="formData.cardHolder" />
        </div>
        <div class="form-group">
          <label for="cardNumber">Número de Tarjeta</label>
          <input type="text" id="cardNumber" v-model="formData.cardNumber" />
        </div>
        <div class="form-group">
          <label for="expiry">Fecha de Vencimiento</label>
          <input type="text" id="expiry" v-model="formData.expiry" />
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" v-model="formData.cvv" />
        </div>
        <div class="buttons">
          <router-link :to="{name: 'profile-profile'}">
            <button class="btn button-danger">Cancelar</button>
          </router-link>
          <router-link :to="{name: 'profile-profile'}">
            <button class="btn button-succes">Pagar</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        cardHolder: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
      },
    };
  },
};
</script>

<style scoped>

.payment-container {
  display: flex;
  justify-content: space-between;
}

.credit-card {
  background-color: #3E7347;
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  flex-grow: 1;
  margin: 130px 0;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.credit-card img {
  max-width: 80px;
}

.credit-card-number {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin: 20px 0;
}

.credit-card-holder,
.credit-card-expiry,
.credit-card-cvv {
  font-size: 14px;
}

.payment-form {
  flex-grow: 2;
  padding: 20px;
  margin: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
