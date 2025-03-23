// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCqg13aRStxworwGTZYWJz2RsdtKRk0N98",
  authDomain: "ebuddy-9931d.firebaseapp.com",
  projectId: "ebuddy-9931d",
  storageBucket: "ebuddy-9931d.firebasestorage.app",
  messagingSenderId: "469464385880",
  appId: "1:469464385880:web:0d6505863b95c60552bd2d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
