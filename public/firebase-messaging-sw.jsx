importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");
if (!firebase.apps.length) {
firebase.initializeApp({
    messagingSenderId: "14160058425",
});
firebase.messaging();
//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler((payload) => console.log("payload", payload));
}