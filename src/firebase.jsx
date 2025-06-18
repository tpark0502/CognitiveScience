import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpntWd0uOQuGuqI9K5HO9rmSdqLYXPAyk",
  authDomain: "test-firebase-8fd46.firebaseapp.com",
  projectId: "test-firebase-8fd46",
  storageBucket: "test-firebase-8fd46.firebasestorage.app",
  messagingSenderId: "498308550794",
  appId: "1:498308550794:web:b3ff3e990e149fbf221d73",
  measurementId: "G-THEZS8YPGX",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
