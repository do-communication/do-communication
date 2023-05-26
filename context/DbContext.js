import { getFirestore } from 'firebase/firestore';
import { app } from "../config/firebase";


const db = getFirestore(app);

export { db };