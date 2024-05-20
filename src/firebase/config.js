const dotenv=require ('dotenv')
dotenv.cconfig();
import { initializeApp } from "firebase/app";

const FIREBASE_KEY = process.env.FIREBASE_KEY


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    FIREBASE_KEY
  };
// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);

export default {Firebase};
