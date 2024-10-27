<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h2 class="text-h5 green--text font-weight-bold">
          My Garden LLC Notifications
        </h2>
        <div>
          <v-btn
            @click="markAllAsRead"
            variant="outlined"
            color="green"
            class="mr-3"
            outlined
          >
            <v-icon left>mdi-check-circle</v-icon>
            Mark All as Read
          </v-btn>
          <v-btn
            @click="deleteAllNotifications"
            variant="outlined"
            color="red"
            outlined
          >
            <v-icon left>mdi-trash-can-outline</v-icon>
            Delete All
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Overlay de carga -->
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <!-- Mostrar mensaje amigable si no hay notificaciones -->
    <v-row
      v-if="notifications && notifications.length === 0"
      class="text-center"
    >
      <v-col cols="12" class="my-5">
        <v-icon size="80" class="green--text text--darken-3 mb-4"
          >mdi-leaf</v-icon
        >
        <h2 class="text-h4 font-weight-bold mb-3 green--text text--darken-3">
          No notifications available 🌸
        </h2>
        <p class="text-h6">Take a break and enjoy your garden! 🌿🌼🪴</p>
      </v-col>
    </v-row>

    <!-- Notificaciones agrupadas por fecha -->
    <v-row v-for="(group, date) in groupedNotifications" :key="date">
      <v-col cols="12">
        <h2 class="text-subtitle-1">{{ formatDate(date) }}</h2>
        <v-divider></v-divider>

        <!-- <NotificationComponent
            v-for="notification in group"
            :key="notification._id"
            :notification="notification"
          /> -->
        <NotificationComponent
          v-for="notification in group"
          :key="notification._id"
          :notification="notification"
          @mark-as-read="handleMarkAsRead"
          @delete-notification="handleDeleteNotification"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { api } from "@/axios/axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import NotificationComponent from "../components/NotificationComponent.vue";

export default {
  components: {
    NotificationComponent,
  },
  data() {
    return {
      notifications: [], // Almacena las notificaciones
      overlay: false, // Controla la visibilidad del overlay
    };
  },
  computed: {
    // Agrupar notificaciones por fecha
    groupedNotifications() {
      return this.notifications.reduce((groups, notification) => {
        const notificationDate = new Date(
          notification.createdAt,
        ).toLocaleDateString(); // Solo la fecha
        if (!groups[notificationDate]) {
          groups[notificationDate] = [];
        }
        groups[notificationDate].push(notification);
        return groups;
      }, {});
    },
  },
  mounted() {
    this.fetchNotifications();
  },
  methods: {
    async handleMarkAsRead(notificationId) {
      try {
        this.overlay = true;
        const { data } = await api.put(`/notifications/mark/${notificationId}`);
        if (data.success) {
          toast.success("Notification marked as read");
        }
        await this.fetchNotifications();
      } catch (error) {
        console.error("Error marking notification as read:", error);
        toast.error("Error marking notification as read");
      } finally {
        this.overlay = false;
      }
    },
    async handleDeleteNotification(notificationId) {
      try {
        this.overlay = true;
        const { data } = await api.delete(
          `/notifications/delete/${notificationId}`,
        );
        if (data.success) {
          toast.success("Notification deleted");
        }
        await this.fetchNotifications();
      } catch (error) {
        console.error("Error deleting notification:", error);
        toast.error("Error deleting notification");
      } finally {
        this.overlay = false;
      }
    },
    async fetchNotifications() {
      try {
        this.overlay = true; // Mostrar el overlay mientras se hace la petición
        const token = localStorage.getItem("token");
        const { data } = await api({
          method: "GET",
          url: "/notifications/notifications",
          headers: {
            Authorization: "Bearer " + token,
            rol: "client",
          },
        });
        if (data.success) {
          this.notifications = data.notifications;
        } // Guarda las notificaciones
        this.overlay = false; // Ocultar el overlay después de obtener las notificaciones
      } catch (error) {
        console.error("Error fetching notifications:", error);
        this.overlay = false; // Ocultar el overlay si hay error
      } finally {
        this.overlay = false; // Ocultar el overlay si hay error
      }
    },
    async markAllAsRead() {
      try {
        this.overlay = true; // Mostrar overlay mientras se procesa la petición
        const token = localStorage.getItem("token");
        const { data } = await api({
          method: "PUT",
          url: "/notifications/read-all",
          headers: {
            Authorization: "Bearer " + token,
            rol: "client",
          },
        });
        if (data.success) {
          toast.success("All notifications marked as read");
        } else {
          toast.error("Failed to mark notifications as read");
        }

        await this.fetchNotifications(); // Recargar las notificaciones después de la acción
      } catch (error) {
        console.error("Error marking all as read:", error);
        toast.error("Error marking all notifications as read");
      } finally {
        this.overlay = false; // Ocultar el overlay después de la acción
      }
    },
    async deleteAllNotifications() {
      try {
        this.overlay = true; // Mostrar overlay mientras se procesa la petición
        const token = localStorage.getItem("token");
        const { data } = await api({
          method: "DELETE",
          url: "/notifications/delete-all",
          headers: {
            Authorization: "Bearer " + token,
            rol: "client",
          },
        });

        if (data.success) {
          toast.success("All notifications deleted");
        } else {
          toast.error("Failed to delete all notifications");
        }

        await this.fetchNotifications(); // Recargar las notificaciones después de la acción
      } catch (error) {
        console.error("Error deleting all notifications:", error);
        toast.error("Error deleting notifications");
      } finally {
        this.overlay = false; // Ocultar el overlay después de la acción
      }
    },
    formatDate(date) {
      const now = new Date();
      const targetDate = new Date(date);

      const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };

      if (now.toLocaleDateString() === targetDate.toLocaleDateString()) {
        return "Today";
      }

      // Ayer
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      if (yesterday.toLocaleDateString() === targetDate.toLocaleDateString()) {
        return "Yesterday";
      }

      // Formato normal para días anteriores
      return new Intl.DateTimeFormat("en-US", options).format(targetDate);
    },
  },
};
</script>

<style scoped>
.notification-card {
  border-left: 4px solid green;
}
</style>
