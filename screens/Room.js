import { View, Text, Button } from "react-native";
import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBuKYM1X3QYyjXVxu-RHgJ38H0mnLcdZpU",
  authDomain: "quanlynhatro-4b76d.firebaseapp.com",
  databaseURL:
    "https://quanlynhatro-4b76d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quanlynhatro-4b76d",
  storageBucket: "quanlynhatro-4b76d.appspot.com",
  messagingSenderId: "22092479287",
  appId: "1:22092479287:web:de6bcbdf6043de124538b2",
  measurementId: "G-FRJ96GF87X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const senDataToFirebase = async () => {
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export default function Room() {
  return (
    <View>
      <Button
        onPress={senDataToFirebase}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
