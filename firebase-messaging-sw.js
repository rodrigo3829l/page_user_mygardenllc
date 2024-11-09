/* eslint-disable */
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyDtDswGuO5glDnzQPOJ_T-_sNHXm0McBOo",
  authDomain: "notifications-32633.firebaseapp.com",
  projectId: "notifications-32633",
  storageBucket: "notifications-32633.firebasestorage.app",
  messagingSenderId: "27910282456",
  appId: "1:27910282456:web:9eb50131e6e606ed4e4bad",
  measurementId: "G-RPKNJ503MB",
};

// Inicializa Firebase en el Service Worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Maneja notificaciones en segundo plano
// messaging.onBackgroundMessage((payload) => {
//   console.log("Notificación en segundo plano recibida:", payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png",
//     requireInteraction: true, // Para mantener la notificación en pantalla
//     silent: false, // Asegúrate de que no esté en modo silencioso
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Escuchar notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("Notificación en segundo plano recibida:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png",
    requireInteraction: true,
    silent: false,
    data: {
      // Añadir la URL que queremos abrir al hacer clic
      url: `https://mygardenllcservices.com/profile/infomyservices/${payload.data.serviceId}`,
    },
  };

  // Mostrar la notificación
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Escuchar el evento click en las notificaciones
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Cerrar la notificación al hacer clic

  // Abrir o enfocar la URL especificada en la notificación
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Si ya existe una ventana abierta con la URL, enfocar esa ventana
      for (let client of windowClients) {
        if (client.url === event.notification.data.url && "focus" in client) {
          return client.focus();
        }
      }
      // Si no, abrir una nueva ventana con la URL
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    }),
  );
});
