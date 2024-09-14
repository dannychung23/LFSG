// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCygY_50A0S5mX8fYjctF6l9lK-_FcJphE",
  authDomain: "lfsg-1.firebaseapp.com",
  projectId: "lfsg-1",
  storageBucket: "lfsg-1.appspot.com",
  messagingSenderId: "54765044915",
  appId: "1:54765044915:web:94d76a527893277d8f5cc6",
  measurementId: "G-4HWJ45TT0C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);