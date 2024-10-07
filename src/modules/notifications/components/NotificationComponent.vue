<template>
    <v-card class="pa-3 mb-4 notification-card" :class="cardClass" outlined>
      <v-row no-gutters>
        <!-- Primera columna: Ícono basado en el tipo de notificación -->
        <v-col cols="auto" class="d-flex align-center" style="width: 80px;">
          <v-icon :color="iconColor" class="mr-3" size="40">
            {{ notificationIcon }}
          </v-icon>
        </v-col>
  
        <!-- Segunda columna: Detalles de la notificación -->
        <v-col>
          <v-row class="d-flex flex-column">
            <v-col>
              <!-- Solo los títulos con el color dinámico -->
              <h4 class="text-h6 font-weight-bold" :class="titleClass">{{ notification.tittle }}</h4>
              <p>{{ notification.message }}</p>
              <p>{{ notification.userId.name }} {{ notification.userId.apellidoP }} {{ notification.userId.apellidoM }}</p>
              <p>{{ notification.userId.email }}</p>
              <!-- Solo el nombre del servicio con el color dinámico -->
              <p class="font-weight-bold" :class="titleClass">{{ notification.serviceId.service.name }}</p>
              <p>{{ notification.serviceId.description }}</p>
            </v-col>
  
            <!-- Chip basado en el tipo de notificación -->
            <v-col>
              <v-chip :color="chipColor" outlined>
                {{ chipLabel }}
              </v-chip>
            </v-col>
          </v-row>
        </v-col>
  
        <!-- Tercera columna: Fecha y acciones -->
        <v-col cols="auto" class="d-flex flex-column justify-space-between align-end">
          <!-- Primera fila: Fecha -->
          <span>{{ formattedDate(notification.createdAt) }}</span>
  
          <!-- Segunda fila: Botón "Go to Service" y Acciones (Marcar como leído, Eliminar) -->
          <div class="d-flex align-center">
            <v-btn class="mr-2" variant="outlined" :color="buttonColor" @click="goToService">
              Go to Service
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
            <!-- Mostrar el ícono de "Marcar como leído" solo si la notificación no ha sido leída -->
            <v-icon v-if="!notification.read" small outlined :color="buttonColor" @click="markAsRead">
              mdi-check-circle
            </v-icon>
            <v-icon small outlined color="red" @click="deleteNotification">
              mdi-trash-can-outline
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'NotificationCard',
    props: {
      notification: {
        type: Object,
        required: true,
      },
    },
    computed: {
      // Devolver el ícono basado en el tipo de notificación
      notificationIcon() {
        switch (this.notification.type) {
          case 'serviceScheduled':
            return 'mdi-calendar';
          case 'serviceQuoted':
            return 'mdi-file-document-outline';
          case 'serviceCancelled':
            return 'mdi-alert-circle-outline';
          case 'serviceRescheduled':
            return 'mdi-calendar-clock';
          case 'servicePaid':
            return 'mdi-cash-check';
          case 'upcomingVisit':
            return 'mdi-calendar';
          default:
            return 'mdi-calendar';
        }
      },
      // Devolver el color del ícono basado en el tipo de notificación
      iconColor() {
        switch (this.notification.type) {
          case 'serviceScheduled':
          case 'upcomingVisit':
            return 'green';
          case 'serviceCancelled':
            return 'red';
          case 'serviceQuoted':
          case 'serviceRescheduled':
          case 'servicePaid':
            return 'blue';
          default:
            return 'grey';
        }
      },
      // Etiqueta del chip dependiendo del tipo de notificación
      chipLabel() {
        switch (this.notification.type) {
          case 'serviceScheduled':
            return 'Scheduled';
          case 'serviceQuoted':
            return 'Quoted';
          case 'serviceCancelled':
            return 'Cancelled';
          case 'serviceRescheduled':
            return 'Rescheduled';
          case 'servicePaid':
            return 'Paid';
          case 'upcomingVisit':
            return 'Upcoming Visit';
          default:
            return 'Notification';
        }
      },
      // Color del chip
      chipColor() {
        switch (this.notification.type) {
          case 'serviceScheduled':
          case 'upcomingVisit':
            return 'green';
          case 'serviceCancelled':
            return 'red';
          case 'serviceQuoted':
          case 'serviceRescheduled':
          case 'servicePaid':
            return 'blue';
          default:
            return 'grey';
        }
      },
      // Clase CSS para el borde de la notificación
      cardClass() {
        switch (this.notification.type) {
          case 'serviceScheduled':
          case 'upcomingVisit':
            return 'green-border';
          case 'serviceCancelled':
            return 'red-border';
          case 'serviceQuoted':
          case 'serviceRescheduled':
          case 'servicePaid':
            return 'blue-border';
          default:
            return 'grey-border';
        }
      },
      // Clase CSS para el color del título y nombre del servicio
      titleClass() {
        switch (this.notification.type) {
          case 'serviceScheduled':
          case 'upcomingVisit':
            return 'green--text';
          case 'serviceCancelled':
            return 'red--text';
          case 'serviceQuoted':
          case 'serviceRescheduled':
          case 'servicePaid':
            return 'blue--text';
          default:
            return 'grey--text';
        }
      },
      // Color del botón
      buttonColor() {
        switch (this.notification.type) {
          case 'serviceScheduled':
          case 'upcomingVisit':
            return 'green';
          case 'serviceCancelled':
            return 'red';
          case 'serviceQuoted':
          case 'serviceRescheduled':
          case 'servicePaid':
            return 'blue';
          default:
            return 'grey';
        }
      },
    },
    methods: {
      // Formatear la fecha de la notificación
      formattedDate(date) {
        return new Date(date).toLocaleString();
      },
      // Marcar la notificación como leída
      markAsRead() {
        this.$emit('mark-as-read', this.notification._id);
      },
      // Eliminar la notificación
      deleteNotification() {
        this.$emit('delete-notification', this.notification._id);
      },
      // Ir al servicio relacionado
      goToService() {
        // this.$router.push();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Bordes dinámicos */
  .green-border {
    border-left: 4px solid green;
  }
  
  .blue-border {
    border-left: 4px solid blue;
  }
  
  .red-border {
    border-left: 4px solid red;
  }
  
  .grey-border {
    border-left: 4px solid grey;
  }
  
  /* Estilos para los títulos */
  .green--text {
    color: green !important;
  }
  
  .blue--text {
    color: blue !important;
  }
  
  .red--text {
    color: red !important;
  }
  
  .grey--text {
    color: grey !important;
  }
  </style>
  