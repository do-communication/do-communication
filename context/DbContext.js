import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "../config/firebase";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };