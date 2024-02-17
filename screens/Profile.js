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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Import thư viện icon, có thể thay đổi tùy thuộc vào thư viện bạn sử dụng
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const Profile = ({ route }) => {
  const [user, setUser] = useState(route.params.user);
  const [userId, setUserId] = useState(route.params.userId);

  const [image, setImage] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const defaultImage = require("../assets/Group.png");

  const handleEditPress = () => {
    setEditing(!isEditing);
  };

  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setUser({ ...user, dob: JSON.stringify(selectedDate) });
    }
  };
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
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
      setUser({ ...user, image: result.uri });
      // console.log('base64: '+result.uri.base64);
      setImage(result.assets[0].uri);
    }

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };

  const updateUserDatas = async () => {
    const userRef = doc(getFirestore(app), "users", userId);

    try {
      await updateDoc(userRef, user);
      console.log("User data updated successfully!");
      setUser(user);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleNameOnChange = (value) => {
    setUser({ ...user, name: value });
  };
  const handleOnChangeGender = (value) => {
    setUser({ ...user, gender: value });
  };
  const handleOnChangePass = (value) => {
    setUser({ ...user, pass: value });
  };
  const handleOnChangeMail = (value) => {
    setUser({ ...user, email: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="blue" />
        </TouchableOpacity>
        <Text style={styles.title}>Hồ sơ</Text>
        <TouchableOpacity style={{ marginLeft: 250 }} onPress={handleEditPress}>
          <Text className="text-sky-600">Sửa thông tin</Text>
        </TouchableOpacity>
      </View>
      {/* Upper overlay */}
      <View style={[styles.overlay, styles.upperOverlay]}>
        <View>
          <TouchableOpacity>
            <Image
              source={user.image ? { uri: user.image } : defaultImage}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={handleNameOnChange}
            editable={isEditing}
          />
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
              onChangeText={handleOnChangeMail}
              editable={isEditing}
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
              onChangeText={handleOnChangeMail}
              editable={isEditing}
            />
          </View>
        </View>
      </View>
      <View style={[styles.overlay, styles.lowerOverlay]}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold'}}>Gói quản lý</Text>
            <Text style={{marginLeft: 30, fontWeight: 'bold', color:'green'}}>Cá nhân</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={{fontWeight: 'normal'}}>Ngày kích hoạt</Text>
            <Text style={{marginLeft: 220, fontWeight: 'bold'}}>18-02-2024</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'normal'}}>Ngày kết thúc</Text>
            <Text style={{marginLeft: 227, fontWeight: 'bold'}}>18-03-2024</Text>
        </View>
      </View>
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
    borderColor: 'green',
    borderWidth: 5
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
});
export default Profile;
