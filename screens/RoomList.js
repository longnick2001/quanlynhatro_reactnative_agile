import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { DocumentReference, getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

export default function RoomList({ route }) {
  const userId = route.params.userId[0];
  const [nguoithue, setNguoithues] = useState([]);
  const [room, setRoom] = useState({});
  const db = getFirestore(app);
  React.useEffect(() => {
    const fetchRooms = async () => {
      const roomCollection = collection(db, 'nguoithuephongs');
      const querySnapshot = await getDocs(roomCollection);
      const roomList = [];
      querySnapshot.forEach(async (docs) => {
        if (docs.data().userid === userId) {
          roomList.push(docs.data());
          console.log('fetch' + docs.data().roomid);
          //////
          const docRef = doc(db, "rooms", docs.data().roomid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setRoom(docSnap.data())
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }

          //////
        }
      });
      setNguoithues(roomList);
    };
    fetchRooms();

  }, []);


  return (
    <ScrollView>
      {nguoithue.map((item, index) => (
        <View key={index} style={styles.roomItem}>
          <View style={styles.roomDetails}>
            <Text style={[styles.roomInfo, { fontSize: 20 }]}>{item.name}</Text>
            <Text style={styles.roomDescription}>Phòng: {room.tenphong}</Text>
            <Text style={styles.roomInfo}>Giới tính: {item.gender}</Text>
            <Text style={styles.roomInfo}>Ngày sinh: {item.dob}</Text>
          </View>
          <View style={styles.roomImageContainer}>
            {/* Hiển thị ảnh của phòng */}
            <Image source={require('../assets/images/background.png')} style={styles.roomImage} />
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  roomItem: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row'
  },
  roomImageContainer: {
    marginRight: 10,
  },
  roomImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  roomDetails: {
    flex: 1,
    backgroundColor: '#10DEDE',
    borderRadius: 10,
    padding: 8
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roomInfo: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  roomDescription: {
    fontSize: 16,
    marginTop: 10,
  },
});