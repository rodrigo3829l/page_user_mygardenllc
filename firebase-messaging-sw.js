importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDtDswGuO5glDnzQPOJ_T-_sNHXm0McBOo",
  authDomain: "notifications-32633.firebaseapp.com",
  projectId: "notifications-32633",
  storageBucket: "notifications-32633.firebasestorage.app",
  messagingSenderId: "27910282456",
  appId: "1:27910282456:web:9eb50131e6e606ed4e4bad",
  measurementId: "G-RPKNJ503MB"
};

// Inicializa Firebase en el Service Worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Maneja notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("Notificación en segundo plano recibida:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "./public/img/icons/180x180.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
