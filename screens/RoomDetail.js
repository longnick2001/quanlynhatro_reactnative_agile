import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc} from "firebase/firestore";
import { app } from "./firebaseConfig";

const RoomDetail = ({ route }) => {
  const [getRoom, setgetRoom] = useState(route.params.getRoom);
  const { userId } = route.params;
  console.log(userId);
  const [nguoithue, setnguoithue] = useState({
    name: "",
    phone: "",
    gender: "",
    image: "",
    roomid: getRoom.roomid,
    userid: userId,
  });
  const defaultImage = require("../assets/Group.png");
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const isModalUpdate = () => {
    setIsUpdate(!isUpdate);
    delAnh();
  };
  const toggleModals = () => {
    setIsModalVisibles(!isModalVisibles);
    setIsModalVisible(false);
    setnguoithue({
      name: "",
      phone: "",
      gender: "",
      image: "",
      roomid: getRoom.roomid,
      userid: userId,
    });
  };
  const handleBackPress = () => {
    navigation.goBack();
  };

  function formatPrice(price) {
    price = String(price);
    if (price.length >= 4) {
      price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return price;
  }

  const pickImageUpdate = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setgetRoom({ ...getRoom, anhphong: result.assets[0].uri });
      //console.log('base64: '+result.uri.base64);
      setImage(result.assets[0].uri);
    }
    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };

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

  const updateRoomData = async () => {
    console.log("Vào hàm update");
    const firestore = getFirestore(app);
    try {
      await updateDoc(doc(firestore, "rooms", getRoom.roomid), {
        tenphong: getRoom.tenphong,
        giaphong: getRoom.giaphong,
        dientich: getRoom.dientich,
        mota: getRoom.mota,
        soluongtoida: getRoom.soluongtoida,
        anhphong: getRoom.anhphong,
      });
      console.log("Rooms data updated successfully!");
    } catch (error) {
      console.error("Error updating Rooms data: ", error);
    }
  };

  const handleNameOnChange = (value) => {
    setnguoithue({ ...nguoithue, name: value });
  };
  const handlePhoneOnChange = (value) => {
    setnguoithue({ ...nguoithue, phone: value });
  };
  const handleGenderOnChange = (value) => {
    setnguoithue({ ...nguoithue, gender: value });
  };
  const handleImageOnChange = (value) => {
    setnguoithue({ ...nguoithue, image: value });
  };

  const handletenPhong = (value) => {
    setgetRoom({ ...getRoom, tenphong: value });
  };
  const handledienTich = (value) => {
    setgetRoom({ ...getRoom, dientich: value });
  };
  const handlegiaPhong = (value) => {
    setgetRoom({ ...getRoom, giaphong: value });
  };
  const handlemoTa = (value) => {
    setgetRoom({ ...getRoom, mota: value });
  };
  const handlesoluongMax = (value) => {
    setgetRoom({ ...getRoom, soluongtoida: value });
  };
  const handleanhPhong = (value) => {
    setgetRoom({ ...getRoom, anhphong: getRoom.anhphong });
  };
  const delAnh = () => {
    setgetRoom({ ...getRoom, anhphong: getRoom.anhphong });
  };
  const UpdateRoom = () => {
    updateRoomData(getRoom);
    console.log(getRoom);
    isModalUpdate();
  };

  const [thanhvien, setThanhVien] = useState(getRoom.thanhvien);
  const addNguoiThue = async () => {
    const db = getFirestore(app);
    try {
      const docRef = await addDoc(collection(db, "nguoithuephongs"), nguoithue);
      thanhvien.push(docRef.id);
      console.log("Thêm người thuê thành công: ", docRef.id);
      updateRoomField(getRoom.roomid, "thanhvien", thanhvien);

      setIsModalVisibles(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateRoomField = async (roomId, fieldToUpdate, updatedValue) => {
    const db = getFirestore(app);
    const docRef = doc(db, "rooms", roomId); // Xác định vị trí của tài liệu
    try {
      await updateDoc(docRef, {
        [fieldToUpdate]: updatedValue, // Cập nhật trường fieldToUpdate với giá trị updatedValue
      });
      console.log("Document successfully updated!");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextInput style={styles.title} value={getRoom.tenphong} />
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={isModalUpdate}
        >
          <Icon name="sync" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={{ width: "100%", height: "60%" }}
          source={{ uri: getRoom.anhphong }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {formatPrice(getRoom.giaphong)} đ
        </Text>
      </View>
      <View style={[styles.overlay, styles.upperOverlay]}>
        <View style={[styles.column, styles.leftColumn]}>
          <Text style={styles.overlayText}>Diện tích</Text>
          <Text style={styles.overlayNumbers}>{getRoom.dientich}</Text>
          <Text style={styles.overlayText}>Số lượng tối đa</Text>
          <Text style={styles.overlayNumber}>{getRoom.soluongtoida}</Text>
        </View>

        <View style={[styles.column, styles.rightColumn]}>
          <Text style={styles.overlayText}>Mô tả</Text>
          <Text style={styles.overlayNumbers}>{getRoom.mota}</Text>
          <Text style={styles.overlayText}>Đặt cọc</Text>
          <Text style={styles.overlayNumber}>{getRoom.datcoc}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: "50%",
          backgroundColor: "#33CCFF",
          padding: 12,
          borderRadius: 40,
          marginTop: 130,
          borderWidth: 2,
          marginLeft: 120,
        }}
        onPress={() => toggleModals(true)}
      >
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
        >
          Thêm người thuê
        </Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={isModalVisibles}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <TouchableOpacity onPress={pickImageUser} style={{ marginBottom: 30 }}>
              <Image
                source={
                  nguoithue && nguoithue.image != ""
                    ? { uri: nguoithue.image }
                    : defaultImage
                }
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#ccc",
                padding: 12,
                borderRadius: 20,
                marginBottom: 12,
                borderWidth: 2,
                textAlign: "center",
              }}
              onChangeText={handleNameOnChange}
            ></TextInput>

            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#ccc",
                padding: 12,
                borderRadius: 20,
                marginBottom: 12,
                borderWidth: 2,
                textAlign: "center",
              }}
              onChangeText={handlePhoneOnChange}
            ></TextInput>
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "#ccc",
                padding: 12,
                borderRadius: 20,
                marginBottom: 12,
                borderWidth: 2,
                textAlign: "center",
              }}
              onChangeText={handleGenderOnChange}
            ></TextInput>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={addNguoiThue}
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
      {/* Dialog sửa phòng */}
      <Modal visible={isUpdate} animationType="slide">
        <View style={styles.modalContainerz}>
          <Text style={styles.modalTitle}>Sửa Phòng</Text>
          <TouchableOpacity onPress={pickImageUpdate}>
            <Image
              source={
                getRoom.anhphong ? { uri: getRoom.anhphong } : defaultImage
              }
              style={{
                width: 180,
                height: 130,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "blue",
              }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Tên phòng"
            value={getRoom.tenphong}
            onChangeText={handletenPhong}
          />
          <TextInput
            style={styles.input}
            placeholder="Giá phòng"
            value={getRoom.giaphong}
            onChangeText={handlegiaPhong}
          />
          <TextInput
            style={styles.input}
            placeholder="Diện tích"
            value={getRoom.dientich}
            onChangeText={handledienTich}
          />
          <TextInput
            style={styles.input}
            placeholder="Mô tả"
            value={getRoom.mota}
            onChangeText={handlemoTa}
          />
          <TextInput
            style={styles.input}
            placeholder="Số lượng tối đa"
            value={getRoom.soluongtoida}
            keyboardType="numeric"
            onChangeText={handlesoluongMax}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={UpdateRoom}>
              <Text style={styles.modalButtonText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={isModalUpdate}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RoomDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: 10,
  },
  refButton: {
    marginRight: 10,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 160,
  },
  overlay: {
    position: "absolute",
    flexDirection: "row", // Display children in a row
    left: 10,
    right: 10,
    borderRadius: 10, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  upperOverlay: {
    top: "60%",
    backgroundColor: "white", // Semi-transparent white background
    zIndex: 1,
    backgroundColor: "#66FF66",
  },
  column: {
    flex: 1,
  },
  leftColumn: {
    marginRight: 5,
  },
  rightColumn: {
    marginLeft: 5,
  },
  overlayText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  overlayNumber: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  overlayNumbers: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // opacity for the background
  },
  modalContainerz: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContents: {
    backgroundColor: "#FFF",
    padding: 20,
    margin: 20,
    width: "90%",
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // Điều chỉnh khoảng cách giữa các nút (nếu cần)
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginLeft: 115,
    borderColor: "green",
    borderWidth: 5,
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
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: "#10DEDE", // Màu nền của nút
    padding: 10, // Khoảng cách giữa nút và kích thước nút
    borderRadius: 8, // Bo góc của nút
    margin: 10,
  },
  modalButtonText: {
    color: "white", // Màu chữ của nút
    textAlign: "center", // Căn giữa nội dung của nút
    fontWeight: "bold",
  },
});
