// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzjPpiJ5KfOUP_shUTghCWJAR9_XzaVn8",
  authDomain: "neodev-148c0.firebaseapp.com",
  projectId: "neodev-148c0",
  storageBucket: "neodev-148c0.appspot.com",
  messagingSenderId: "933942551634",
  appId: "1:933942551634:web:72132a4ba2007c05076b8b"
};

// Initialize Firebase
let app: FirebaseApp;
app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);