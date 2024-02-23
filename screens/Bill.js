import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { DocumentReference, getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
export default function Bill({ route }) {
  const userId = route.params.userId[0];
  const [nguoithue, setNguoithues] = useState([]);
  const [room, setRoom] = useState({});
  const db = getFirestore(app);
  const navigation = useNavigation();
  const [isEnabled, setisEnabled] = useState(false);
  const [refresh, setRefresh] = useState(false); // Tạo state refresh
  const [bills, setbills] = useState([]);
  const [searchText, setSearchText] = useState("");
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchRooms = async () => {
        const roomCollection = collection(db, "bills");
        const querySnapshot = await getDocs(roomCollection);
        const roomList = [];
        const billList = [];
        querySnapshot.forEach(async (docs) => {
          if (docs.data().userid === userId) {
            const billData = docs.data();
            const billId = docs.id; // Lấy id của hóa đơn
            roomList.push({ ...billData, id: billId }); // Thêm id vào dữ liệu hóa đơn
            console.log("ID Bill " + docs.id);
            //////---------------------------------------
            const docRef = doc(db, "rooms", docs.data().roomid);
            const docSnap = await getDoc(docRef);
            const bill = {
              tenphong: docs.data().tenphong,
              thangnam: doc.data().thangnam,
            };
            billList.push(bill);
            if (docSnap.exists()) {
              //console.log("Document data:", docSnap.data());
              setRoom(docSnap.data());
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
            //////-------------------------------------
          }
        });
        setbills(billList);
        setNguoithues(roomList);
      };
      fetchRooms();
    });
    return unsubscribe;
  }, [navigation]);

  const updateBillData = async (billId) => {
    console.log("ID Bill: " + billId);
    const db = getFirestore(app);
    const hoaDon = doc(db, "bills", billId);

    try {
      await updateDoc(hoaDon, { trangthai: true });
      console.log("Bills data updated successfully!");

      // Cập nhật trạng thái trực tiếp trong mảng nguoithue
      setNguoithues((prevState) => {
        const updatedNguoithue = prevState.map((item) => {
          if (item.id === billId) {
            return { ...item, trangthai: !item.trangthai };
          }
          return item;
        });
        return updatedNguoithue;
      });
    } catch (error) {
      console.error("Error updating Bills data: ", error);
    }
  };

  // Thêm hàm xử lý tìm kiếm
  const filterBills = (text) => {
    const filteredBiils = bills.filter((bill) =>
      bill.tenphong.toLowerCase().includes(text.toLowerCase())
    );
    return filteredBiils;
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
        {nguoithue
          .slice()
          .sort((a, b) =>
            a.trangthai === b.trangthai ? 0 : a.trangthai ? 1 : -1
          )
          .filter((item) =>
            item.tenphong.toLowerCase().includes(searchText.toLowerCase()) || item.thangnam.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((item, index) => (
            <View key={index} style={styles.roomItem}>
              <View style={styles.roomDetails}>
                <Text style={styles.roomDescription}>
                  Phòng: {item.tenphong}
                </Text>
                <Text style={styles.roomInfo}>Tháng: {item.thangnam}</Text>
                <Text style={styles.roomInfo}>
                  Tổng tiền: {item.tongtienphong} đ
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {item.trangthai && (
                    <Text
                      style={[
                        styles.roomInfo,
                        { color: "green", fontWeight: "bold" },
                      ]}
                    >
                      Đã thanh toán
                    </Text>
                  )}
                  {!item.trangthai && (
                    <Text
                      style={[
                        styles.roomInfo,
                        { color: "red", fontWeight: "bold" },
                      ]}
                    >
                      Chưa thanh toán
                    </Text>
                  )}
                  <View style={{ flex: 1, marginLeft: 195 }}>
                    {!item.trangthai && ( // Hiển thị nút thanh toán chỉ khi chưa thanh toán
                      <TouchableOpacity
                        style={{
                          width: 100,
                          height: 30,
                          alignItems: "center",
                          backgroundColor: "green",
                          padding: 5,
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          updateBillData(item.id);
                          console.log("OK");
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 13,
                            color: "white",
                          }}
                        >
                          Thanh toán
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
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
    width: "100%",
    height: "auto",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  roomDetails: {
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
    marginTop: 5,
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
});
