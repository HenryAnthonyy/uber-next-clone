// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAm9wjLijutJUu9lPWVoxwKUb3E66B97Ek",
  authDomain: "henry-uber-next-clone.firebaseapp.com",
  projectId: "henry-uber-next-clone",
  storageBucket: "henry-uber-next-clone.appspot.com",
  messagingSenderId: "453059734650",
  appId: "1:453059734650:web:a2b9f39e0ad3117449dfc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth()

export {app, provider, auth}