import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { DocumentReference, getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";


export default function Bill({ route }) {
  const userId = route.params.userId[0];
  const [nguoithue, setNguoithues] = useState([]);
  const [room, setRoom] = useState({});
  const db = getFirestore(app);
  React.useEffect(() => {

    const fetchRooms = async () => {
      const roomCollection = collection(db, 'bills');
      const querySnapshot = await getDocs(roomCollection);
      const roomList = [];
      querySnapshot.forEach(async (docs) => {
        if (docs.data().userid === userId) {
          roomList.push(docs.data());

          //////---------------------------------------
          const docRef = doc(db, "rooms", docs.data().roomid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setRoom(docSnap.data())
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }

          //////-------------------------------------
        }
      });
      setNguoithues(roomList);
    };
    fetchRooms();

  }, []);

  return (

    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        {nguoithue.map((item, index) => (
          <View key={index} style={styles.roomItem}>
            <View style={styles.roomDetails}>
              <Text style={styles.roomDescription}>Phòng: {room.tenphong}</Text>
              <Text style={styles.roomInfo}>Tổng tiền: {item.tongtien} đ</Text>
              <Text style={styles.roomInfo}>Ghi chú: {item.ghichu}</Text>

              <Text style={styles.roomInfo}>Ngày xuất hóa đơn: {item.ngayxuathoadon}</Text>
              {item.trangthaithanhtoan && <Text style={[styles.roomInfo, { color: 'white' }]}>Đã thanh toán</Text>}
              {!item.trangthaithanhtoan && <Text style={[styles.roomInfo, { color: 'red' }]}>Chưa thanh toán</Text>}
            </View>

          </View>
        ))}

      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roomItem: {
    width: '100%',
    height: 'auto',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  roomDetails: {
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
    marginTop: 5,
  },
});