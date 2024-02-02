import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
export default function HomePage({ route }) {
  const [user, setUser] = useState(route.params.user);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 18 }}>Xin chào</Text>
            <Text style={styles.headerText}>{user.name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-person-circle-sharp"
              size={28}
              style={{ color: "white" }}
              onPress={() =>
                navigation.navigate("Profile", {
                  params: "Profile",
                  user: user,
                  userId: route.params.userId,
                })
              }
            />
            <Ionicons
              name="ios-notifications-circle"
              size={28}
              style={{ marginLeft: 14, color: "white" }}
            />
          </View>
        </View>
      </View>

      {/* Upper overlay */}
      <View style={[styles.overlay, styles.upperOverlay]}>
        <View style={styles.column}>
          <Text style={styles.overlayText}>Số tòa nhà</Text>
          <Text style={styles.overlayNumber}>5</Text>
          <Text style={styles.overlayText}>Số phòng</Text>
          <Text style={styles.overlayNumber}>30</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.overlayText}>Số người thuê</Text>
          <Text style={styles.overlayNumber}>30</Text>
          <Text style={styles.overlayText}>Số phòng trống</Text>
          <Text style={styles.overlayNumber}>30</Text>
        </View>
      </View>

      {/* Lower overlay */}
      <View style={[styles.overlay, styles.lowerOverlay]}>
        <View style={styles.column}>
          <View style={styles.infoItem}>
            <Image
              style={styles.iconImage}
              source={require("../assets/images/dichvu.png")}
            />
            <Text style={styles.infoText}>Dịch vụ</Text>
          </View>
          <View style={styles.infoItem}>
            <Image
              style={styles.iconImage}
              source={require("../assets/images/hoadon.png")}
            />
            <Text style={styles.infoText}>Hóa đơn</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.infoItem}>
            <Image
              style={styles.iconImage}
              source={require("../assets/images/nguoi.png")}
            />
            <Text style={styles.infoText}>Người thuê</Text>
          </View>
          <View style={styles.infoItem}>
            <Image
              style={styles.iconImage}
              source={require("../assets/images/suco3.png")}
            />
            <Text style={styles.infoText}>Sự cố</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.infoItem}>
            <Image
              style={styles.iconImage}
              source={require("../assets/images/hopdong.png")}
            />
            <Text style={styles.infoText}>Hợp đồng</Text>
          </View>
          <View style={styles.infoItem}>
            <Image
              style={styles.iconImage}
              source={require("../assets/images/chotdv1.png")}
            />
            <Text style={styles.infoText}>Chốt dịch vụ</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width:'100%',
    position: "absolute",
    padding:'5%',
    top:'5%'
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  backgroundImage: {
    width: "100%",
    height: "110%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    flexDirection: "row", // Display children in a row
    left: 16,
    right: 16,
    borderRadius: 10, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  upperOverlay: {
    top: "25%",
    backgroundColor: "white", // Semi-transparent white background
    zIndex: 1,
  },
  lowerOverlay: {
    bottom: "10%",
    backgroundColor: "white", // Semi-transparent white background
    zIndex: 1,
  },
  column: {
    flex: 1,
    padding: 8,
  },
  overlayTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overlayText: {
    marginLeft: 40,
    color: "black",
    fontSize: 18,
    fontWeight: "normal",
  },
  overlayNumber: {
    color: "black",
    fontSize: 18,
    textAlign: "center", // Center the number
  },
  infoItem: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 18,
    color: "black",
  },
  bottomAlign: {
    alignSelf: "flex-end", // Căn dưới
  },
  iconImage: {
    width: 50, // Độ rộng của ảnh
    height: 50, // Độ cao của ảnh
  },
});
