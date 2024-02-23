import React, { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Import thư viện icon, có thể thay đổi tùy thuộc vào thư viện bạn sử dụng
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { getFirestore } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const Profile = ({ route }) => {
  const [user, setUser] = useState(route.params.user);
  const [userId, setUserId] = useState(route.params.userId);
  const [image, setImage] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const defaultImage = require("../assets/Group.png");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  // Hàm kiểm tra xem số điện thoại có đúng kiểu không
  const isValidPhoneNumber = (phoneNumber) => {
    // Biểu thức chính quy để kiểm tra số điện thoại
    const phoneNumberRegex = /^[0-9]{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModals = () => {
    setIsModalVisibles(!isModalVisibles);
    setIsModalVisible(false);
  };

  const navigation = useNavigation();
  const handleBackPress = () => {
    //navigation.goBack();
    navigation.navigate("Home", { updatedName: user.name });
  };

  const updateUserData = async () => {
    const firestore = getFirestore(app);
    const IDUSER = userId[0];
    try {
      await updateDoc(doc(firestore, "users", IDUSER), {
        name: user.name,
        phone: user.phone,
        address: user.address,
        image: user.image,
      });

      
      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
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
      setUser({ ...user, image: result.assets[0].uri });
      // console.log('base64: '+result.uri.base64);
      setImage(result.assets[0].uri);
    }

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };

  const handleNameOnChange = (value) => {
    setUser({ ...user, name: value });
  };
  const handleOnChangeAddress = (value) => {
    setUser({ ...user, address: value });
  };
  const handleOnChangePass = (value) => {
    setUser({ ...user, pass: value });
  };
  const handleOnChangePhone = (value) => {
    setUser({ ...user, phone: value });
  };

  const handleSaveAndClose = () => {
    if (!user.name || !user.phone || !user.address) {
      // Hiển thị thông báo hoặc thực hiện các hành động cần thiết khi có trường thông tin trống
      Alert.alert("Thông báo", "Vui lòng  nhập đủ thông tin!");
      return; // Dừng hàm nếu có trường thông tin trống
    };
    if (!isValidPhoneNumber(user.phone)) {
      Alert.alert('Thông báo', 'Số điện thoại phải chứa chính xác 10 chữ số.');
      return;
    };

    updateUserData(user);
    toggleModals();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="blue" />
        </TouchableOpacity>
        <Text style={styles.title}>Hồ sơ</Text>
      </View>
      {/* Upper overlay */}
      <View style={[styles.overlay, styles.upperOverlay]}>
        <View>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={user.image ? { uri: user.image } : defaultImage}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TextInput style={styles.input} value={user.name} editable={false} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginRight: 230, fontWeight: "bold" }}>
              Số điện thoại
            </Text>
            <TextInput
              style={{ color: "black" }}
              value={user.phone}
              editable={false}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginRight: 230, fontWeight: "bold" }}>
              Địa chỉ
            </Text>
            <TextInput
              style={{ color: "black" }}
              value={user.address}
              editable={false}
            />
          </View>
        </View>
      </View>
      <View style={[styles.overlay, styles.lowerOverlay]}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Gói quản lý</Text>
          <Text style={{ marginLeft: 30, fontWeight: "bold", color: "green" }}>
            Cá nhân
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={{ fontWeight: "normal" }}>Ngày kích hoạt</Text>
          <Text style={{ marginLeft: 220, fontWeight: "bold" }}>
            18-02-2024
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "normal" }}>Ngày kết thúc</Text>
          <Text style={{ marginLeft: 227, fontWeight: "bold" }}>
            18-03-2024
          </Text>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              className="w-full bg-sky-300 p-3 rounded-2xl mb-3"
              onPress={toggleModals}
            >
              <Text className="text-x font-bold text-white text-center">
                Cập nhật
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full bg-sky-300 p-3 rounded-2xl mb-3">
              <Text className="text-x font-bold text-white text-center">
                Chuyển đổi doanh nghiệp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full bg-sky-300 p-3 rounded-2xl mb-3">
              <Text className="text-x font-bold text-white text-center">
                Xóa
              </Text>
            </TouchableOpacity>
            {/* Add your update, delete account buttons or any other functionality */}
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisibles}
        onRequestClose={toggleModals}
      >
        <View style={styles.modalContainers}>
          <View style={styles.modalContents}>
            <TouchableOpacity onPress={pickImage} style={{ marginBottom: 30 }}>
              <Image
                source={user.image ? { uri: user.image } : defaultImage}
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
              placeholder="Tên của bạn"
              value={user.name}
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
              placeholder="Số điện thoại"
              value={user.phone}
              onChangeText={handleOnChangePhone}
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
              placeholder="Địa chỉ"
              value={user.address}
              onChangeText={handleOnChangeAddress}
            ></TextInput>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={handleSaveAndClose}
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
    </SafeAreaView>
  );
};

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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginLeft: 115,
    borderColor: "green",
    borderWidth: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 18,
    color: "gray",
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
    textAlign: "right",
  },
  input: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  btn: {
    width: "40%",
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 20,
    marginTop: 10,
  },
  overlay: {
    position: "absolute",
    //flexDirection: "row", // Display children in a row
    left: 16,
    right: 16,
    borderRadius: 10, // Rounded corners
    padding: 16,
  },
  upperOverlay: {
    top: "15%",
    backgroundColor: "white", // Semi-transparent white background
  },
  lowerOverlay: {
    bottom: "35%",
    backgroundColor: "white", // Semi-transparent white background
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // opacity for the background
  },
  modalContents: {
    backgroundColor: "#FFF",
    padding: 20,
    margin: 20,
    width: "90%",
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContainers: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // opacity for the background
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
});
export default Profile;
