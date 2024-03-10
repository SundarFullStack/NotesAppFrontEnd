// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBGoQPKhswRiuDT1TyxFqW9CKKQJvOFRI",
  authDomain: "notes-bba73.firebaseapp.com",
  projectId: "notes-bba73",
  storageBucket: "notes-bba73.appspot.com",
  messagingSenderId: "1069351828117",
  appId: "1:1069351828117:web:f80566f617f66686b7f99c",
  measurementId: "G-LYD66FZXEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);