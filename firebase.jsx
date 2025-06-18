import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.apiKey,
  authDomain: process.authDomain,
  projectId: process.projectId,
  storageBucket: process.projectId,
  messagingSenderId: process.messagingSenderId,
  appId: process.appId,
  measurementId: process.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
