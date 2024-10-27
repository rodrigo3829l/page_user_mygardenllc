<template>
  <v-card>
    <v-card-title>Selecciona el monto a pagar</v-card-title>
    <v-card-text>
      <v-select
        v-if="showPaymentSelection"
        v-model="paymentPercentage"
        :items="['50%', '100%']"
        label="Monto a pagar"
        required
      ></v-select>
      <div id="paypal-button-container" ref="paypal"></div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('close')"> Close </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { api } from "@/axios/axios.js";
import { useUserStore } from "@/store/store";
import { toast } from "vue3-toastify";

export default {
  name: "PaymentCard",
  props: {
    monto: {
      type: Number,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    pendingAmount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      paymentPercentage: "100%",
      userStore: useUserStore(),
      paidFor: false,
      amount: this.pendingAmount, // Inicializa con el monto pendiente
      showPaymentSelection: true, // Mostrar selección de pago
    };
  },
  watch: {
    paymentPercentage(newVal) {
      let monto = this.pendingAmount;
      let montoMitad = (monto / 2).toFixed(2);
      this.amount = newVal === "50%" ? montoMitad : monto;
      this.renderPayPalButton();
    },
  },
  methods: {
    loadPayPalScript() {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AfOuWCGm02PBc-nT5eA3DrWwE4_YT-kqE7G0Vd_RTKIlHpDWpiE3Qui9UMxUkRxPdUkMaGJj8m_4Eg1X";
      script.addEventListener("load", this.renderPayPalButton);
      document.body.appendChild(script);
    },
    renderPayPalButton() {
      // Elimina el botón anterior si existe
      const paypalContainer = this.$refs.paypal;
      paypalContainer.innerHTML = "";

      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.$t(
                    "profile.pages.infoMyService.paymentFormString",
                  ),
                  amount: {
                    currency_code: "USD",
                    value: this.amount.toString(),
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);

            const paymentDetails = {
              user: this.userStore.token,
              mount: this.amount,
              scheduleService: this.serviceId,
              type: "65d9c9eda4ee265c1c861501",
              paypalOrderId: order.id,
              paypalPayerId: order.payer.payer_id,
            };
            console.log(paymentDetails);

            try {
              const { data } = await api.post("/pays/pay", paymentDetails);
              if (!data.success) {
                toast.warning(data.msg);
                return;
              }
              toast.success(data.msg);
              this.$emit("payment-success");

              // Verificar si se pagó el 50% o el 100%
              if (this.paymentPercentage === "50%") {
                this.showPaymentSelection = false; // Ocultar selección de pago
                this.amount = (this.monto - this.amount).toFixed(2); // Actualizar monto pendiente
                this.renderPayPalButton(); // Renderizar nuevamente el botón de PayPal
              } else {
                this.paidFor = true;
              }
            } catch (error) {
              console.error(error);
            }
          },
          onError: (err) => {
            console.error(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
  mounted() {
    this.loadPayPalScript();
    if (this.pendingAmount <= this.monto / 2) {
      this.showPaymentSelection = false;
    }
  },
};
</script>

<style scoped>
#paypal-button-container {
  margin-top: 20px;
}
</style>
