// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLk_JpiYCGG3WPfx4UCE1Sczh28Q8PSuc",
  authDomain: "expense-tracker-b8222.firebaseapp.com",
  projectId: "expense-tracker-b8222",
  storageBucket: "expense-tracker-b8222.appspot.com",
  messagingSenderId: "894477606297",
  appId: "1:894477606297:web:60851b619aa0ae46784708",
  measurementId: "G-4S0BVHM2KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=new getFirestore(app);
