import { StyleSheet, Text, View, Image, TouchableOpacity,Modal, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const RoomDetail = ({ route }) => {
  const { getRoom } = route.params;
  const { roomId } = route.params;
  console.log(roomId);
  const [nguoithue, setnguoithue] = useState({
    name:"",
    phone:"",

  });
  const defaultImage = require("../assets/Group.png");
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);

  const toggleModals = () => {
    setIsModalVisibles(!isModalVisibles);
    setIsModalVisible(false);
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
      //setUser({ ...user, image: result.assets[0].uri});
      // console.log('base64: '+result.uri.base64);
      //setImage(result.assets[0].uri);
    }
    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };

  const handleNameOnChange = (value) => {
    setnguoithue({ ...nguoithue, name: value });
  };
  const handlePhoneOnChange = (value) => {
    setnguoithue({ ...nguoithue, phone: value });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{getRoom.tenphong}</Text>
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
      <TouchableOpacity style={{width: "50%",
                backgroundColor: "#33CCFF",
                padding: 12,
                borderRadius: 40,
                marginTop:130,
                borderWidth: 2,
                marginLeft: 120
                }} onPress={() => toggleModals(true)}>
        <Text style={{textAlign:'center', fontWeight:'bold',
      color:'white'}} >Thêm người thuê</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisibles}
        onRequestClose={toggleModals}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <TouchableOpacity onPress={pickImage} style={{ marginBottom: 30 }}>
              <Image
                source={defaultImage}
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
              
              
            >
            </TextInput>

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
              
              
            >
            </TextInput>
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
              
              
            >
            </TextInput>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={toggleModals}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
});
