// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuKYM1X3QYyjXVxu-RHgJ38H0mnLcdZpU",
  authDomain: "quanlynhatro-4b76d.firebaseapp.com",
  databaseURL: "https://quanlynhatro-4b76d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quanlynhatro-4b76d",
  storageBucket: "quanlynhatro-4b76d.appspot.com",
  messagingSenderId: "22092479287",
  appId: "1:22092479287:web:de6bcbdf6043de124538b2",
  measurementId: "G-FRJ96GF87X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);