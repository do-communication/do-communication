import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };


// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// export const auth = getAuth(app)

const firebaseConfig = {
    apiKey: "AIzaSyDj0B7jYE0Km0_9xMKnp3b3dN96f6C098Q",
    authDomain: "dodemo-e627f.firebaseapp.com",
    projectId: "dodemo-e627f",
    storageBucket: "dodemo-e627f.appspot.com",
    messagingSenderId: "14160058425",
    appId: "1:14160058425:web:ae42ad81c1adcea9d0d5e8",
    measurementId: "G-ZLZTGMT0YP"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app)
export { auth, app }
