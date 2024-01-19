import { View, Text, Button } from "react-native";
import React from "react";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
const db = getFirestore(app);

const senDataToFirebase = async () => {
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "lón",
      last: "Le Van",
      age: 22,
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
