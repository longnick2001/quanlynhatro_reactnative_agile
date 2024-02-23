import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import DateTimePicker from "react-native-modal-datetime-picker";

const RoomDetail = ({ route }) => {
  const [getRoom, setgetRoom] = useState(route.params.getRoom);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const { userId } = route.params;
  console.log("ID: " + getRoom.roomid);
  console.log("Tháng: " + selectedMonthYear);

  const [nguoithue, setnguoithue] = useState({
    id: "",
    name: "",
    phone: "",
    gender: "",
    image: "",
    roomid: getRoom.roomid,
    userid: userId,
  });

  const defaultImage = require("../assets/images/user.png");
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalHD, setisModalHD] = useState(false);
  const [soDienSuDung, setsoDienSuDung] = useState("");
  const giaMoiSo = 3500;
  const [soNuocSuDung, setsoNuocSuDung] = useState("");
  const giaSoNuoc = 30000;
  const giaVeSinh = 20000;
  const [tongTien, setTongTien] = useState("");
  const [hoaDon, sethoaDon] = useState({
    tenphong: getRoom.tenphong,
    thangnam: "",
    giaphong: getRoom.giaphong,
    tiendien: "",
    tiennuoc: "",
    tienvesinh: giaVeSinh,
    tongtienphong: "",
    trangthai: false,
    roomid: getRoom.roomid,
    userid: userId,
  });

  const isModalUpdate = () => {
    setIsUpdate(!isUpdate);
    delAnh();
  };

  const isModalHoaDon = () => {
    setisModalHD(!isModalHD);
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
  //-------------------------------------
  // const handleThangNam = (value) => {
  //   sethoaDon({ ...hoaDon, thangnam: value });
  // };
  const handleTienDien = (value) => {
    sethoaDon({ ...hoaDon, tiendien: value * giaMoiSo });
  };
  const handleTienNuoc = (value) => {
    sethoaDon({ ...hoaDon, tiennuoc: value * giaSoNuoc });
  };
  // const handleTienVS = (value) =
  //   sethoaDon({ ...hoaDon, tienvesinh: value });
  // };
  // const handleTongTien = (value) => {
  //   sethoaDon({ ...hoaDon, tongtienphong: value });
  // };
  //--------------------------------------
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
  //--------------------------------------
  const handletenPhong = (value) => {
    setgetRoom({ ...getRoom, tenphong: value });
    sethoaDon({ ...hoaDon, tenphong: value });
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
  //--------------------------------------
  const UpdateRoom = () => {
    updateRoomData(getRoom);
    isModalUpdate();
  };

  const [thanhvien, setThanhVien] = useState(getRoom.thanhvien);
  const addNguoiThue = async () => {
    const db = getFirestore(app);
    try {
      const docRef = await addDoc(collection(db, "nguoithuephongs"), nguoithue);

      const updatedIds = [...thanhvien, docRef.id]; // Sử dụng spread operator để thêm ID mới vào mảng
      setThanhVien(updatedIds);
      console.log("add: " + docRef.id);
      updateRoomField(getRoom.roomid, "thanhvien", updatedIds);
      const nguoi = {
        id: docRef.id,
        name: nguoithue.name,
        phone: nguoithue.phone,
        gender: nguoithue.phone,
        image: nguoithue.image,
        roomid: getRoom.roomid,
        userid: userId,
      };
      
      const newNt = [nguoi, ...nguoithues];
      setNguoithues(newNt);

      setIsModalVisibles(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //hàm xử lý đưa dữ liệu lên firebase
  const hoaDonsenDataToFirebase = async () => {
    console.log(hoaDon);
    const db = getFirestore(app);
    try {
      const docRef = await addDoc(collection(db, "bills"), hoaDon);
      console.log("Thêm thành công hóa đơn", docRef.id);
      alert("Tạo thành công hóa đơn " + getRoom.tenphong);
      //window.location.reload();
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
  const db = getFirestore(app);
  const [nguoithues, setNguoithues] = useState([]);
  const [xemDanhSach, setXemDanhSach] = useState(false);
  React.useEffect(() => {
    const getNguoiThue = navigation.addListener('focus', () => {
      const fetchRooms = async () => {
        const roomCollection = collection(db, "nguoithuephongs");
        const querySnapshot = await getDocs(roomCollection);
        const roomList = [];
        querySnapshot.forEach(async (docs) => {
          thanhvien.forEach(async (id) => {
            if (docs.data().userid === userId && id === docs.id) {
              //////
              const docRef = doc(db, "rooms", docs.data().roomid);
              const docSnap = await getDoc(docRef);
  
              if (docSnap.exists()) {
                roomList.push({
                  id: docs.id,
                  image: docs.data().image,
                  name: docs.data().name,
                  phone: docs.data().phone,
                  gender: docs.data().gender,
                  userid: docs.data().userid,
                  roomid: docs.data().roomid,
                  tenphong: docSnap.data().tenphong,
                });
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
              //////
            }
          });
        });
        setNguoithues(roomList);
      };
      fetchRooms();
    });
    return getNguoiThue;
  }, [navigation]);

    const toggleXemDanhSach = () => {
      setXemDanhSach(!xemDanhSach);
    };


  var tinhTienDien = (soDienSuDung, giaMoiSo) => {
    const td = soDienSuDung * giaMoiSo;
    //setTienDien(td);
    return td;
  };

  const tinhTienNuoc = (soNuocSuDung, giaSoNuoc) => {
    const tn = soNuocSuDung * giaSoNuoc;
    //setTienNuoc(tn);
    return tn;
  };

  var soTienDien = tinhTienDien(soDienSuDung, giaMoiSo);
  var soTienNuoc = tinhTienNuoc(soNuocSuDung, giaSoNuoc);
  var newTongTiens = formatPrice(
    soTienDien + soTienNuoc + giaVeSinh + parseFloat(getRoom.giaphong)
  );

  useEffect(() => {
    setTongTien(newTongTiens);
    sethoaDon({
      ...hoaDon,
      tongtienphong: newTongTiens,
      thangnam: selectedMonthYear,
    });
  }, [soTienDien, soTienNuoc, giaVeSinh, getRoom.giaphong, selectedMonthYear]);

  const resetValue = () => {
    setSelectedMonthYear("");
    soTienDien = 0;
  };
  const showDatePickers = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    // Extract month and year from the selected date
    const selectedMonth = date.getMonth() + 1; // Month is zero-based, so add 1
    const selectedYear = date.getFullYear();
    const formattedDate = `${selectedMonth}/${selectedYear}`;
    setSelectedMonthYear(formattedDate);
  };
  const deleteNguoiThue = async (item) => {
    console.log("Chạy: "+item.id)
    const db = getFirestore(app);
    const nguoiThueRef = doc(db, "nguoithuephongs", item.id);

    try {
      await deleteDoc(nguoiThueRef, item.id);
      console.log("Người thuê đã được xóa thành công");
      console.log("delete: " + thanhvien);
      try {
        const update = thanhvien.filter((id) => id != item.id);
        setThanhVien(update);
        updateRoomField(getRoom.roomid, "thanhvien", update);

        nguoithues.forEach((nguoithue) => {
          if (nguoithue.id === item.id) {
            const newNt = nguoithues.filter((nguoi) => nguoi != nguoithue);
            setNguoithues(newNt);
          }
        });
      } catch (e) {
        console.error("Error delete id: ", e);
      }
    } catch (e) {}
  };

  const xoaPhong = async ()=>{
    console.log('click: '+getRoom.roomid);
    const db = getFirestore(app);
    const roomRef = doc(db, "rooms", getRoom.roomid);
    try {
      console.log('try: '+getRoom.roomid);
      await deleteDoc(roomRef, getRoom.id);
      console.log('Xóa thành công');
      handleBackPress();
    } catch (e) {
      console.error("Error delete id: ", e);
    }
  }

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
          style={{
            width: "95%",
            height: "60%",
            borderColor: "green",
            borderWidth: 2,
            borderRadius: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
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
          <Text style={styles.overlayNumber}>
            {formatPrice(getRoom.datcoc)} đ
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "yellow",
            padding: 12,
            borderRadius: 10,
            borderWidth: 2,
            width: 150,
            height: 50,
            marginRight: 20,
            marginLeft: 20,
          }}
          onPress={toggleXemDanhSach}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "black" }}
          >
            Danh sách
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#33CCFF",
            padding: 12,
            borderRadius: 10,
            borderWidth: 2,
            width: 150,
            height: 50,
            marginLeft: 20,
          }}
          onPress={() => toggleModals(true)}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
          >
            Thêm người thuê
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 12,
            borderRadius: 10,
            borderWidth: 2,
            width: 150,
            height: 50,
            marginLeft: 20,
            marginRight:20
          }}
          onPress={() => {
            isModalHoaDon(true);
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
          >
            Tạo hóa đơn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 12,
            borderRadius: 10,
            borderWidth: 2,
            width: 150,
            height: 50,
            marginLeft: 20,
            
          }}
          onPress={()=>{xoaPhong(getRoom)}
          }
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
          >
            Xóa phòng
          </Text>
        </TouchableOpacity>
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
            <TouchableOpacity
              onPress={pickImageUser}
              style={{ marginBottom: 30 }}
            >
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
                backgroundColor: "white",
                padding: 12,
                borderRadius: 10,
                marginBottom: 12,
                borderWidth: 2,
                textAlign: "center",
              }}
              placeholder="Họ & Tên"
              onChangeText={handleNameOnChange}
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
              placeholder="Số điện thoại"
              onChangeText={handlePhoneOnChange}
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
              placeholder="Giới tính"
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
      <Modal visible={xemDanhSach} animationType="slide">
        <ScrollView style={{ width: "100%", backgroundColor:'#FFFF99' }}>
          <TouchableOpacity
            style={{
              width: "30%",
              backgroundColor: "#33CCFF",
              padding: 4,
              borderRadius: 40,
              borderWidth: 2,
              margin: 10,
            }}
            onPress={toggleXemDanhSach}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Đóng
            </Text>
          </TouchableOpacity>
          {nguoithues.map((item, index) => (
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
                <Text style={styles.roomDescription}>
                  Phòng: {item.tenphong}
                </Text>
                <Text style={styles.roomInfo}>Giới tính: {item.gender}</Text>
                <Text style={styles.roomInfo}>Số điện thoại: {item.phone}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  deleteNguoiThue(item);
                }}
              >
                <Text>Xóa</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </Modal>
      {/* Dialog tạo hóa đơn */}
      <Modal visible={isModalHD} animationType="slide">
        <View style={styles.modalContainerz}>
          <Text style={styles.modalTitle}>
            Tạo Hóa Đơn Phòng {getRoom.tenphong}
          </Text>
          <Text style={{ marginRight: 280, fontWeight: "bold" }}>
            Tháng - Năm
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Chọn tháng"
            value={selectedMonthYear}
            editable={false} // Đặt editable thành false để ngăn người dùng nhập trực tiếp vào TextInput
            //onChangeText={handleThangNam}
          ></TextInput>
          <TouchableOpacity
            onPress={showDatePickers}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />

          <Text style={{ marginRight: 290, fontWeight: "bold" }}>
            Giá phòng
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Tên phòng"
            editable={false}
            //value={formatPrice(getRoom.giaphong)}
            value={getRoom.giaphong}
            onChangeText={handlegiaPhong}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold", flex: 1, marginLeft: 50 }}>
              Số điện
            </Text>
            <Text style={{ flex: 1, marginLeft: 200 }}>
              {formatPrice(soTienDien)} đ
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Số điện"
            onChangeText={(text) => {
              setsoDienSuDung(text);
              handleTienDien(text);
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold", flex: 1, marginLeft: 50 }}>
              Số nước
            </Text>
            <Text style={{ flex: 1, marginLeft: 200 }}>
              {formatPrice(soTienNuoc)} đ
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Số nước"
            onChangeText={(text) => {
              setsoNuocSuDung(text);
              handleTienNuoc(text);
            }}
          />
          <Text style={{ marginRight: 300, fontWeight: "bold" }}>Vệ sinh</Text>
          <TextInput
            style={styles.input}
            value={formatPrice(giaVeSinh)}
            editable={false}
          />
          <Text style={{ marginRight: 300, fontWeight: "bold" }}>
            Tổng tiền
          </Text>
          <TextInput
            style={styles.inputTT}
            value={newTongTiens}
            editable={false}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                hoaDonsenDataToFirebase();
                isModalHoaDon();
              }}
            >
              <Text style={styles.modalButtonText}>Tạo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                isModalHoaDon();
                resetValue();
              }}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        modal={false} // Đặt modal thành false
      />
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
    backgroundColor: "#FFFF99",
  },
  modalContents: {
    backgroundColor: "#FFF",
    padding: 20,
    margin: 20,
    width: "90%",
    borderRadius: 10,
    borderColor: "#33CCFF",
    borderWidth: 2,
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
    borderColor: "black",
    borderWidth: 2,
  },
  input: {
    width: "80%",
    height: 50,
    marginVertical: 10,
    padding: 10,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  inputTT: {
    width: "80%",
    height: 50,
    marginVertical: 10,
    padding: 10,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    color: "red",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  roomItem: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor:'white'
  },
  roomImageContainer: {
    marginRight: 10,
  },
  roomImage: {
    width: 100,
    height: 115,
    borderRadius: 15,
    borderColor:'black',
    borderWidth: 1,
    alignItems:'center'
  },
  roomDetails: {
    flex: 1,
    backgroundColor: "#10DEDE",
    borderRadius: 10,
    width: '80%',
    justifyContent:'center',
    textAlign:'center',
    paddingLeft: 10
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
});
