// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js';
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACenebTNKRAPHBiH2NJlbk-UnrKCUwvM8",
  authDomain: "davi-s-demo-database.firebaseapp.com",
  databaseURL: "https://davi-s-demo-database-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "davi-s-demo-database",
  storageBucket: "davi-s-demo-database.firebasestorage.app",
  messagingSenderId: "385354817362",
  appId: "1:385354817362:web:f262e5a256393dce96648b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const usersRef = ref(db, '/users');

