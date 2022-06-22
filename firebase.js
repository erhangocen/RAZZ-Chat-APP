// Import the functions you need from the SDKs you need

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-FsvZ49_897uZOCDccS4rAXzz7LSFGnU",
  authDomain: "razzdb1.firebaseapp.com",
  projectId: "razzdb1",
  storageBucket: "razzdb1.appspot.com",
  messagingSenderId: "200563211708",
  appId: "1:200563211708:web:c33a674d8788d9b971ffb9",
  measurementId: "G-HFPF4HH3C4"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();





export { auth };

