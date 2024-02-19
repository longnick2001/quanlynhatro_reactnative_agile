// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBuKYM1X3QYyjXVxu-RHgJ38H0mnLcdZpU",
  authDomain: "quanlynhatro-4b76d.firebaseapp.com",
  databaseURL: "https://quanlynhatro-4b76d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quanlynhatro-4b76d",
  storageBucket: "quanlynhatro-4b76d.appspot.com",
  messagingSenderId: "22092479287",
  appId: "1:22092479287:web:de6bcbdf6043de124538b2",
  measurementId: "G-FRJ96GF87X",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const firebase = { app, database};
export default firebase;
