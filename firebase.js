import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDdCXA7mV51_sIIWAPh0AGNMHlaW53CFOE",
  authDomain: "chatapp-3dcd3.firebaseapp.com",
  projectId: "chatapp-3dcd3",
  storageBucket: "chatapp-3dcd3.appspot.com",
  messagingSenderId: "945227712750",
  appId: "1:945227712750:web:60230490a788667b384bff",
  measurementId: "G-LNQBES9NG8"
};


const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);


export { firebase,app,auth };

