import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { DocumentReference, getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, getDoc, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useIsFocused } from "@react-navigation/native";
export default function RoomList({ route }) {
  const userId = route.params.userId[0];
  const [nguoithue, setNguoithues] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchRooms = async () => {
    const db = getFirestore(app);
    const roomCollection = collection(db, "nguoithuephongs");
    const querySnapshot = await getDocs(roomCollection);
    const promises = []; // Mảng chứa các promise
    const roomList = [];

    querySnapshot.forEach((docs) => {
      if (docs.data().userid === userId) {
        const docRef = doc(db, "rooms", docs.data().roomid);
        const promise = getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const user = {
                image: docs.data().image,
                name: docs.data().name,
                phone: docs.data().phone,
                gender: docs.data().gender,
                userid: docs.data().userid,
                roomid: docs.data().roomid,
                tenphong: docSnap.data().tenphong,
              };
              roomList.push(user);
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
        promises.push(promise);
      }
    });

    // Sử dụng Promise.all để đợi tất cả các promise hoàn thành
    await Promise.all(promises);

    // Cập nhật state sau khi tất cả các promise đã hoàn thành
    setNguoithues(roomList);
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchRooms();
    }
  }, [isFocused]);

  // Thêm hàm xử lý tìm kiếm
  const filterRooms = (text) => {
    const filteredRooms = nguoithue.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.gender.toLowerCase().includes(text.toLowerCase()) ||
        item.phone.toLowerCase().includes(text.toLowerCase()) ||
        item.tenphong.toLowerCase().includes(text.toLowerCase())
    );
    return filteredRooms;
  };

  //thêm phòng
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newNguoiThue, setnewNguoiThue] = useState({
    image: "",
    gender: "",
    phone: "",
    name: "",
    roomid: "",
    userid: userId,
    tenphong: "",
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo tên"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <ScrollView style={{ width: "100%" }}>
        {filterRooms(searchText).map((item, index) => (
          <View key={index} style={styles.roomItem}>
            <View style={styles.roomImageContainer}>
              <Image
                source={
                  item.image != ""
                    ? { uri: item.image }
                    : require("../assets/images/user.png")
                }
                style={styles.roomImage}
              />
            </View>
            <View style={styles.roomDetails}>
              <Text style={[styles.roomInfo, { fontSize: 20 }]}>
                {item.name}
              </Text>
              <Text style={styles.roomDescription}>Phòng: {item.tenphong}</Text>
              <Text style={styles.roomInfo}>Giới tính: {item.gender}</Text>
              <Text style={styles.roomInfo}>Số điện thoại: {item.phone}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  roomItem: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flexDirection: "row",
  },
  roomImageContainer: {
    marginRight: 10,
  },
  roomImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 15,
  },
  fabText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  roomDetails: {
    flex: 1,
    backgroundColor: "#10DEDE",
    borderRadius: 10,
    padding: 8,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roomInfo: {
    fontSize: 16,
    color: "black",
    marginTop: 5,
  },
  roomDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    padding: 10,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#aaa",
  },
  searchIcon: {
    position: "absolute",
    left: 5,
    zIndex: 1,
  },
  fabButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#10DEDE",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
    elevation: 8,
  },
});
