import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0sdk8pK-TOeAPgbL-BKkLTeXu-hEqv8E",
  authDomain: "hys-app-b6da6.firebaseapp.com",
  projectId: "hys-app-b6da6",
  storageBucket: "hys-app-b6da6.firebasestorage.app",
  messagingSenderId: "608148714751",
  appId: "1:608148714751:web:a3cc0d5b8cc00d2d4788ca",
  measurementId: "G-6L34ECKGK7"
};

// Inicializas la app
const app = initializeApp(firebaseConfig);

// Exportas auth y firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app); 
export const db = getFirestore(app);

