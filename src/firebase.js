import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBP_2HaJX73mJ47VhogEUDacuywG5v5iYo",
  authDomain: "interview-tutorial.firebaseapp.com",
  projectId: "interview-tutorial",
  storageBucket: "interview-tutorial.firebasestorage.app",
  messagingSenderId: "906717186971",
  appId: "1:906717186971:web:5312c385c7443cb92b6f3e",
  measurementId: "G-WW5BTC5YFF"
};

const app = initializeApp(firebaseConfig);

// ✅ Auth + Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);