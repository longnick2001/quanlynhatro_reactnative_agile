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
  console.log("UserId: " + route.params.userId);

  console.log("profile: " + user.dob);
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
    if (!result.cancelled) {
      setUser({ ...user, image: result.uri });
    }

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateUserDatas = async () => {
    console.log("logggggggggggg", userId);
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
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={user.image ? { uri: user.image } : defaultImage}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={handleOnChangeMail}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ tên</Text>
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={handleNameOnChange}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            value={user.pass}
            onChangeText={handleOnChangePass}
            secureTextEntry={true}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ngày sinh</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
            disabled={!isEditing}
          >
            <Text style={{ marginTop: 8, fontWeight: "bold" }}>
              {formatDate(new Date(user.dob ? JSON.parse(user.dob) : "00-00-00"))}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(user.dob ? JSON.parse(user.dob) : "00-00-00")}
              mode="date"
              display="spinner" // Chọn kiểu hiển thị là spinner
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Giới tính</Text>
          <TextInput
            style={styles.input}
            value={user.gender}
            onChangeText={handleOnChangeGender}
            editable={isEditing}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          // disabled={!isEditing}
          onPress={updateUserDatas}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
          >
            Lưu Thông Tin
          </Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  btn: {
    width: "40%",
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 20,
    marginTop: 10,
  },
});
export default Profile;
