import { View, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';

export default function Room({ route }) {
  const [rooms, setRooms] = useState([]);
  const userId = route.params.userId[0];
  const navigation = useNavigation();
  React.useEffect(() => {
    const fetchRooms = async () => {
      const db = getFirestore(app);
      const roomCollection = collection(db, 'rooms');
      const querySnapshot = await getDocs(roomCollection);
      const roomList = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().userid === userId) {
          roomList.push(doc.data());
        }

      });
      setRooms(roomList);
    };

    fetchRooms();
  }, []);

  //thêm phòng
  const defaultImage = require('../assets/images/background.png');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRoom, setNewRoom] = useState({
    anhphong: '',
    tenphong: '',
    giaphong: '',
    dientich: '',
    mota: '',
    soluongtoida: 0,
    userid: userId,
    thanhvien: [],
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setNewRoom({
      anhphong: '',
      tenphong: '',
      giaphong: '',
      dientich: '',
      mota: '',
      soluongtoida: 0,
      userid: userId,
      thanhvien: [],
    })
  };

  //hàm xử lý đưa dữ liệu lên firebase
  const senDataToFirebase = async (room) => {
    const db = getFirestore(app);
    try {
      const docRef = await addDoc(collection(db, "rooms"), room);
      console.log("Thêm phòng thành công: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addRoom = () => {
    // Thêm phòng vào danh sách phòng
    setRooms([...rooms, newRoom]);
    // Thêm phòng vào database
    senDataToFirebase(newRoom);
    // Đóng dialog
    setIsModalVisible(false);
    setNewRoom({
      anhphong: '',
      tenphong: '',
      giaphong: '',
      dientich: '',
      mota: '',
      soluongtoida: 0,
      userid: userId,
      thanhvien: [],
    })
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setNewRoom({ ...newRoom, anhphong: result.assets[0].uri });
      console.log('base64: ' + result.assets[0].uri);
      // setImage(result.assets[0].uri);
    }
  };
  return (

    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <View>
          {rooms.map((room, index) => (
            <TouchableOpacity key={index} style={styles.roomItem} onPress={()=>{navigation.navigate('RoomDetail', {data: room})}}>
              <View style={styles.roomDetails}>
                <Text style={[styles.roomInfo, { fontSize: 20 }]}>{room.tenphong}</Text>
                <Text style={styles.roomInfo}>Giá: {room.giaphong}</Text>
                <Text style={styles.roomInfo}>Diện tích: {room.dientich}</Text>
                <Text style={styles.roomInfo}>Mô tả: {room.mota}</Text>
              </View>
              <View style={styles.roomImageContainer}>
                {/* Hiển thị ảnh của phòng */}
                <Image source={room.anhphong ? { uri: room.anhphong } : require('../assets/images/background.png')} style={styles.roomImage} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.fabButton} onPress={toggleModal}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      {/* Dialog thêm phòng */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thêm Phòng</Text>
          <TouchableOpacity onPress={pickImage}>
            <Image source={newRoom.anhphong ? { uri: newRoom.anhphong } : defaultImage} style={{ width: 200, height: 120 }} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Tên phòng"
            value={newRoom.tenphong}
            onChangeText={(text) => setNewRoom({ ...newRoom, tenphong: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Giá phòng"
            value={newRoom.giaphong}
            onChangeText={(text) => setNewRoom({ ...newRoom, giaphong: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Diện tích"
            value={newRoom.dientich}
            onChangeText={(text) => setNewRoom({ ...newRoom, dientich: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Mô tả"
            value={newRoom.mota}
            onChangeText={(text) => setNewRoom({ ...newRoom, mota: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Số lượng tối đa"
            value={newRoom.soluongtoida}
            keyboardType="numeric"
            onChangeText={(text) => setNewRoom({ ...newRoom, soluongtoida: text })}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={addRoom}>
              <Text style={styles.modalButtonText}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roomItem: {
    width: '100%',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roomImageContainer: {
    marginRight: 10,
  },
  roomImage: {
    width: 160,
    height: 120,
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
  fabButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10DEDE',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: '#10DEDE', // Màu nền của nút
    padding: 10, // Khoảng cách giữa nút và kích thước nút
    borderRadius: 8, // Bo góc của nút
    margin:10
  },
  modalButtonText: {
    color: 'white', // Màu chữ của nút
    textAlign: 'center', // Căn giữa nội dung của nút
    fontWeight:'bold'
  },
});
