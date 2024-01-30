// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3uTEpmuj8B1Cd4Wwo6DducTajL-TlTCY",
  authDomain: "juegosmatematicas-b4f5b.firebaseapp.com",
  projectId: "juegosmatematicas-b4f5b",
  storageBucket: "juegosmatematicas-b4f5b.appspot.com",
  messagingSenderId: "721465637580",
  appId: "1:721465637580:web:bfb399dad31dbe8909e069",
  measurementId: "G-21PWGQL9PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);