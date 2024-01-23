import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { DocumentReference, getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, getDoc, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RoomList({ route }) {
  const userId = route.params.userId[0];
  const [nguoithue, setNguoithues] = useState([]);
  const [room, setRoom] = useState({});
  const db = getFirestore(app);
  const [searchText, setSearchText] = useState('');

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

  // Thêm hàm xử lý tìm kiếm
  const filterRooms = (text) => {
    const filteredRooms = nguoithue.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.gender.toLowerCase().includes(text.toLowerCase()) ||
        item.dob.toLowerCase().includes(text.toLowerCase()) ||
        room.tenphong.toLowerCase().includes(text.toLowerCase())
    );
    return filteredRooms;
  };

  //thêm phòng
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newNguoiThue, setnewNguoiThue] = useState({
    anh:'',
    dob: '',
    email: '',
    gender: '',
    name: '',
    roomid: "",
    userid: userId,
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  //hàm xử lý đưa dữ liệu lên firebase
  const senDataToFirebase = async (nguoithue) => {
    const db = getFirestore(app);
    try {
      const docRef = await addDoc(collection(db, "nguoithuephongs"), nguoithue);
      console.log("Thêm người thành công: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addRoom = () => {
    // Thêm phòng vào danh sách phòng
    setNguoithues([...nguoithue, newNguoiThue]);
    // Thêm phòng vào database
    senDataToFirebase(newNguoiThue);
    // Đóng dialog
    setIsModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo tên"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
    <ScrollView style={{ width: '100%' }}>
      {filterRooms(searchText).map((item, index) => (
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
    <TouchableOpacity style={styles.fabButton} onPress={toggleModal}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      {/* Dialog thêm phòng */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thêm Phòng</Text>
          <TouchableOpacity>
            <Image source={require('../assets/images/background.png')} style={{ width: 200, height: 120 }} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Tên phòng"
            value={newNguoiThue.anh}
            onChangeText={(text) => setnewNguoiThue({ ...newNguoiThue, anh: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Giá phòng"
            value={newNguoiThue.dob}
            onChangeText={(text) => setnewNguoiThue({ ...newNguoiThue, dob: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Diện tích"
            value={newNguoiThue.email}
            onChangeText={(text) => setnewNguoiThue({ ...newNguoiThue, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Mô tả"
            value={newNguoiThue.gender}
            onChangeText={(text) => setnewNguoiThue({ ...newNguoiThue, gender: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Số lượng tối đa"
            value={newNguoiThue.name}
            keyboardType="numeric"
            onChangeText={(text) => setnewNguoiThue({ ...newNguoiThue, name: text })}
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
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
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
  },
  searchIcon: {
    position: 'absolute',
    left: 5,
    zIndex: 1,
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
});