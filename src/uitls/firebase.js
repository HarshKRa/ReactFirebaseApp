import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz9BvA44mhioGROarkztqlvhuPPFw2wsw",
  authDomain: "newcurdproject.firebaseapp.com",
  projectId: "newcurdproject",
  storageBucket: "newcurdproject.firebasestorage.app",
  messagingSenderId: "531591469952",
  appId: "1:531591469952:web:6af7c71e85cd2ea63cbf65",
  measurementId: "G-VHK4TMNNQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
