import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomePage({route}) {
  const [user, setUser] = useState(route.params.user);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Xin chào, {user.name}!</Text>
      </View>
      <Image source={require('../assets/images/background.png')} style={styles.backgroundImage} />

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
            <Icon name="home" size={20} color="black" />
            <Text style={styles.infoText}>Dịch vụ</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="file-text-o" size={20} color="black" />
            <Text style={styles.infoText}>Hóa đơn</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.infoItem}>
            <Icon name="user" size={20} color="black" />
            <Text style={styles.infoText}>Người thuê</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="exclamation-triangle" size={20} color="black" />
            <Text style={styles.infoText}>Sự cố</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.infoItem}>
            <Icon name="handshake-o" size={20} color="black" />
            <Text style={styles.infoText}>Hợp đồng</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="handshake-o" size={20} color="black" />
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
    backgroundColor: '#3498db', // A color for the header background
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  backgroundImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    flexDirection: 'row', // Display children in a row
    left: 16,
    right: 16,
    borderRadius: 10, // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  upperOverlay: {
    top: '30%',
    backgroundColor: 'white', // Semi-transparent white background
    zIndex: 1,
  },
  lowerOverlay: {
    bottom: '10%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    zIndex: 1,
  },
  column: {
    flex: 1,
    padding: 8,
  },
  overlayTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overlayText: {
    marginLeft: 40,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  overlayNumber: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center', // Center the number
  },
  infoItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20
  },
  infoText: {
    marginLeft: 8,
    fontSize: 18,
    color: 'black',
  },
});
