importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js")

firebase.initializeApp({
  apiKey: "AIzaSyDl6Yih1lovarVVnUv3VvttcSuVktjSX7M",
  authDomain: "virasat-organics.firebaseapp.com",
  projectId: "virasat-organics",
  storageBucket: "virasat-organics.firebasestorage.app",
  messagingSenderId: "616372509690",
  appId: "1:616372509690:web:d8c946de091ee4292c6243",
  measurementId: "G-GGCX3P1XPX"
})

const messaging = firebase.messaging()