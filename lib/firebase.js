import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_iAEcA3m74hAkOy9F6geD-_fI5sk3i-Y",
  authDomain: "eduhansa-79387.firebaseapp.com",
  projectId: "eduhansa-79387",
  storageBucket: "eduhansa-79387.firebasestorage.app",
  messagingSenderId: "339885964454",
  appId: "1:339885964454:web:4894575e7799b0af7a0867",
  measurementId: "G-J5XBV0PM7D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
