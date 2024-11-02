import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDtDswGuO5glDnzQPOJ_T-_sNHXm0McBOo",
  authDomain: "notifications-32633.firebaseapp.com",
  projectId: "notifications-32633",
  storageBucket: "notifications-32633.firebasestorage.app",
  messagingSenderId: "27910282456",
  appId: "1:27910282456:web:9eb50131e6e606ed4e4bad",
  measurementId: "G-RPKNJ503MB"
};

// Inicialización de la app de Firebase
console.log("Inicializando Firebase...");
const app = initializeApp(firebaseConfig);
console.log("Firebase inicializado con éxito.");

// Inicialización de Firebase Messaging
const messaging = getMessaging(app);
console.log("Firebase Messaging configurado correctamente.");

export const requestForToken = async () => {
  try {
    console.log("Solicitando token FCM...");

    // Registra el Service Worker si aún no está registrado
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('Service Worker registrado:', registration);

    // Obtén el token de FCM usando el Service Worker registrado
    const token = await getToken(messaging, { 
      vapidKey: "BEBPVYvr0MDHP6_UJjUsivzgQMuU8FG1jsPuIBB8XyGC4RGiZOsQsh_XzrMGSJEukeUNSPnH8lgYA_qLgmHHunM",
      serviceWorkerRegistration: registration
    });
    

    if (token) {
      console.log("FCM Token obtenido:", token);
      return token; // Envía este token al backend para asociarlo al usuario
    } else {
      console.warn("No se pudo obtener el token FCM. Verifica los permisos de notificación.");
    }
  } catch (error) {
    console.error("Error obteniendo el token FCM:", error);
  }
};


// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     console.log("Esperando mensajes en primer plano...");
//     onMessage(messaging, (payload) => {
//       console.log("Notificación recibida en primer plano:", payload); // Imprime la notificación en la consola

//       // Muestra una notificación push
//       if (Notification.permission === "granted") {
//         new Notification(payload.notification.title, {
//           body: payload.notification.body,
//           icon: payload.notification.icon || "./public/img/icons/192x192.png",
//           requireInteraction: true,
//           silent: false,
//         });
//       }

//       resolve(payload);
//     });
//   });

export const onMessageListener = () =>
  new Promise((resolve) => {
    console.log("Esperando mensajes en primer plano...");
    onMessage(messaging, (payload) => {
      console.log("Notificación recibida en primer plano:", payload);

      // Verifica si hay una URL en el payload para redirigir al hacer clic
      const notificationUrl = `https://mygardenllcservices.com/profile/infomyservices/${payload.data.serviceId}`;

      // Muestra una notificación push en primer plano
      if (Notification.permission === "granted") {
        const notification = new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png",
          requireInteraction: true,
          silent: false,
          data: { url: notificationUrl }, // Guarda la URL en los datos de la notificación
        });

        // Añade un listener para manejar el clic en la notificación
        notification.onclick = (event) => {
          event.preventDefault(); // Evita que se cierre la notificación automáticamente

          // Redirige al usuario a la URL especificada
          if (notification.data && notification.data.url) {
            window.open(notification.data.url, "_blank");
          }
        };
      }

      resolve(payload);
    });
  });

