
import { initializeApp } from "firebase/app";




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHRU2ClF1CVNNgEcY6sXA-oB8IP02B_QI",
    authDomain: "fir-e9d16.firebaseapp.com",
    projectId: "fir-e9d16",
    storageBucket: "fir-e9d16.appspot.com",
    messagingSenderId: "8693088751",
    appId: "1:8693088751:web:17b67d82c59a8f43cc761a",
    measurementId: "G-GPG91NY1GB"
  };
// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);

export default {Firebase};