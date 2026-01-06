// app/firebase/firebaseConfig.ts

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY3b6VXpHRFSK-NXQ4Z-txwv6wdPEu9qc",
  authDomain: "ai-schedule-assistant-33af3.firebaseapp.com",
  projectId: "ai-schedule-assistant-33af3",
  storageBucket: "ai-schedule-assistant-33af3.firebasestorage.app",
  messagingSenderId: "87358154916",
  appId: "1:87358154916:web:8a4c3edb9e9e55fbc91e31"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
