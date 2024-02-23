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
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function RoomList({ route }) {
  const userId = route.params.userId[0];
  const [nguoithue, setNguoithues] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const defaultImage = require("../assets/images/user.png");

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
                id: docs.id,
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

  const xoaNguoiThue = async (nguoi) => {
    console.log('id: ' + nguoi.id);
    const db = getFirestore(app);
    const nguoiThueRef = doc(db, "nguoithuephongs", nguoi.id);
    try {
      await deleteDoc(nguoiThueRef, nguoi.id);
      try {
        const roomRef = doc(db, "rooms", nguoi.roomid);
        await getDoc(roomRef)
          .then(async (docSnap) => {
            if (docSnap.exists()) {
              const update = docSnap.data().thanhvien.filter(nguoithueid => nguoithueid != nguoi.id);
              await updateDoc(roomRef, {
                ["thanhvien"]: update, // Cập nhật trường fieldToUpdate với giá trị updatedValue

              });
              fetchRooms();
            } else {
              console.log("Doc doesn't exist!");
            }
          })

      } catch (e) {
        console.error("Error delete id: ", e);
      }
    } catch (e) { }
  }


  const [suaNguoiThue, setSuaNguoiThue] = useState(false);
  const [updateNguoi, setUpdateNguoi] = useState({
    id: '',
    name: '',
    image: '',
    phone: '',
    gender: '',
    userid: '',
    roomid: '',
    tenphong: '',
  });
  const toggleSuaNguoiThue = (nguoi) => {
    console.log('nguoi.id: ' + nguoi.id);

    setUpdateNguoi(nguoi);
    setSuaNguoiThue(!suaNguoiThue);

  }
  const toggleModals = () => {
    setSuaNguoiThue(!suaNguoiThue);
  }

  const suaNguoi = async () => {
    const db = getFirestore(app);

    const docRef = doc(db, "nguoithuephongs", updateNguoi.id); // Xác định vị trí của tài liệu
    try {
      await updateDoc(docRef, {
        name: updateNguoi.name,
        phone: updateNguoi.phone,
        gender: updateNguoi.gender,
        image: updateNguoi.image,
      });
      fetchRooms();
      toggleModals();
      console.log("Document successfully updated!");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  const pickImageUser = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      //setgetRoom({ ...getRoom, anhphong: result.assets[0].uri});
      //console.log('base64: '+result.uri.base64);
      //setImage(result.assets[0].uri);
      handleImageOnChange(result.assets[0].uri);
    }
    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };

  const handleNameOnChange = (value) => {
    setUpdateNguoi({ ...updateNguoi, name: value });
  };
  const handlePhoneOnChange = (value) => {
    setUpdateNguoi({ ...updateNguoi, phone: value });
  };
  const handleGenderOnChange = (value) => {
    setUpdateNguoi({ ...updateNguoi, gender: value });
  };
  const handleImageOnChange = (value) => {
    setUpdateNguoi({ ...updateNguoi, image: value });
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

            <View style={{flexDirection:'column', justifyContent:'center'}}>
              <TouchableOpacity onPress={(item) => { xoaNguoiThue(item) }}
              style={{backgroundColor:'yellow', margin:6, padding:6, borderWidth:2, borderColor:'black', borderRadius:10}}>
                <Text>Xóa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { toggleSuaNguoiThue(item) }}
              style={{backgroundColor:'green', margin:6, padding:6, borderWidth:2, borderColor:'black', borderRadius:10}}>
                <Text>Sửa</Text>
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={suaNguoiThue}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <TouchableOpacity
              onPress={pickImageUser}
              style={{ marginBottom: 30 }}
            >
              <Image
                source={
                  updateNguoi.image != ""
                    ? { uri: updateNguoi.image }
                    : defaultImage
                }
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "white",
                padding: 12,
                borderRadius: 10,
                marginBottom: 12,
                borderWidth: 2,
                textAlign: "center",
              }}
              value={updateNguoi.name}
              placeholder="Họ & Tên"
              onChangeText={(value) => { handleNameOnChange(value) }}
            ></TextInput>

            <TextInput
              style={{
                width: "100%",
                backgroundColor: "white",
                padding: 12,
                borderRadius: 10,
                marginBottom: 12,
                borderWidth: 2,
                textAlign: "center",
              }}
              value={updateNguoi.phone}
              placeholder="Số điện thoại"
              onChangeText={(value) => { handlePhoneOnChange(value) }}
            ></TextInput>
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "white",
                padding: 12,
                borderRadius: 10,
                marginBottom: 12,
                borderWidth: 2,
                textAlign: "center",
              }}
              value={updateNguoi.gender}
              placeholder="Giới tính"
              onChangeText={(value) => { handleGenderOnChange(value) }}
            ></TextInput>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={suaNguoi}
                style={styles.saveButton}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModals}
                style={styles.closeButton}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
            {/* Add your update, delete account buttons or any other functionality */}
          </View>
        </View>
      </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // opacity for the background
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginLeft: 115,
    borderColor: "black",
    borderWidth: 2,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // Điều chỉnh khoảng cách giữa các nút (nếu cần)
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  modalContents: {
    backgroundColor: "#FFF",
    padding: 20,
    margin: 20,
    width: "90%",
    borderRadius: 10,
    borderColor: "#33CCFF",
    borderWidth: 2,
  }
});
