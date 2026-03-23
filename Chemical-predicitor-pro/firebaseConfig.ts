// Firebase configuration for ChemiSafe Predictor Pro
// Project: chemisafe-predictor-pro

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOJCGXa284KrdjWY8SJIeETgGqZILTWo0",
    authDomain: "chemisafe-predictor-pro.firebaseapp.com",
    projectId: "chemisafe-predictor-pro",
    storageBucket: "chemisafe-predictor-pro.firebasestorage.app",
    messagingSenderId: "879851895506",
    appId: "1:879851895506:web:b926a23b6c6f68f53d4b0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
