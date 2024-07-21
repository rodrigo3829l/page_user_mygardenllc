<template>
  <v-card class="mx-auto" max-width="344">
    <!-- Primera fila: Imagen con chip para el status -->
    <v-img
      :src="service.img.secure_url"
      height="200px"
      cover
    >
      <!-- Chip para el status -->
      <v-chip
        variant="elevated"
        :color="statusColor"
        text-color="white"
        small
        outlined
        class="status-chip"
      >
        {{ service.status }}
      </v-chip>
    </v-img>

    <!-- Segunda fila: Descripción del servicio -->
    <v-card-title>
      {{ service.description }}
    </v-card-title>

    <!-- Tercera fila: Última fecha de actualización -->
    <v-card-subtitle>
      Last updated {{ lastUpdated }}
    </v-card-subtitle>

    <!-- Cuarta fila: Botones de acción -->
    <v-card-actions>
      <v-row dense>
        <v-col v-for="button in actionButtons" :key="button.text" cols="4">
          <v-btn
            :color="button.color"
            small
            @click="button.action"
            variant="outlined"
          >
            {{ button.text }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
    },
  },
  computed: {
    statusColor() {
      switch (this.service.status) {
        case 'development':
          return 'yellow';
        case 'quoted':
          return 'orange'; // Color para estado quoted
        case 'canceled':
          return 'red';
        case 'finish':
          return 'green';
        case 'quoting':
          return 'blue'; // Color para estado quoting
        default:
          return 'grey';
      }
    },
    lastUpdated() {
      const status = this.service.status;
      let referenceDate;

      if (status === 'quoting') {
        referenceDate = this.service.dates.reserved;
      } else if (status === 'finish') {
        referenceDate = this.service.dates.quoted;
      } else if (status === 'quoted' || status === 'development') {
        referenceDate = this.service.dates.quoted;
      } else if (status === 'canceled') {
        referenceDate = this.service.dates.quoted || this.service.dates.reserved;
      }

      if (!referenceDate) {
        return 'Unknown';
      }

      const currentDate = new Date();
      const serviceDate = new Date(referenceDate);

      const diffInMillis = currentDate - serviceDate;
      const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));

      if (diffInDays < 30) {
        return `${diffInDays} days ago`;
      } else if (diffInDays < 365) {
        const diffInMonths = Math.floor(diffInDays / 30);
        return `${diffInMonths} months ago`;
      } else {
        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} years ago`;
      }
    },
    actionButtons() {
      const buttons = [];

      // Botón para ver información
      buttons.push({
        text: 'View',
        color: 'success',
        action: () => this.info(),
      });

      // Botón para reagendar si el status es quoting
      if (this.service.status === 'quoting') {
        buttons.push({
          text: 'Reprog',
          color: 'primary',
          action: () => this.reschedule(),
        });
      }

      // Botón para cancelar si el status no es finish
      if (this.service.status !== 'finish') {
        buttons.push({
          text: 'Cancel',
          color: 'error',
          action: () => this.cancel(),
        });
      }

      // Botón para pagar si el status es quoted
      if (this.service.status === 'quoted') {
        buttons.push({
          text: 'Pay',
          color: 'yellow-darken-4',
          action: () => this.pay(),
        });
      }

      return buttons;
    },
  },
  methods: {
    reschedule() {
      this.$emit('updateData', {
        id: this.service._id,
        date: this.service.dates.scheduledTime,
      }, 'reschedule');
    },
    cancel() {
      this.$emit('updateData', this.service._id, 'cancel');
    },
    info() {
      this.$router.push({ name: 'profile-infomyservices', params: { id: this.service._id } });
    },
    pay() {
      console.log("Payment process initiated.");
    },
  },
};
</script>

<style scoped>
.status-chip {
  margin-top: 8px;
  margin-left: 8px;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.mx-auto {
  margin: auto;
}

.v-card-actions {
  flex-wrap: wrap;
}
</style>
