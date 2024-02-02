import { View, Text, Image, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
//firebase
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";
//progress
import * as Progress from 'react-native-progress';


export default function SignupScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);

  //navigation
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: '',
    pass: '',
    email: '',
    gender: ''
  });

  // Hàm xử lý khi thay đổi giá trị của trường name
  const handleNameChange = (value) => {
    setUser({ ...user, name: value });
  };
  // Hàm xử lý khi thay đổi giá trị của trường name
  const handleEmailChange = (value) => {
    setUser({ ...user, email: value });
  };
  // Hàm xử lý khi thay đổi giá trị của trường pass
  const handlePassChange = (value) => {
    setUser({ ...user, pass: value });
  };
  // Hàm xử lý khi thay đổi giá trị của trường gender
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setUser({ ...user, gender: gender });
  };


  //hàm xử lý đưa dữ liệu lên firebase
  const senDataToFirebase = async (user) => {
    const db = getFirestore(app);

    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: user.name,
        email: user.email,
        pass: user.pass,
        gender: user.gender,
        dob: '',
        image: ''
      });
      navigation.push('Login')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getDataFromFirebase = async (user) => {
    const db = getFirestore(app);
    const usersCollection = collection(db, 'users');
    let isValid = true;
    try {
      const querySnapshot = await getDocs(usersCollection);
      querySnapshot.forEach((doc) => {
        if (user.name === doc.data().name && user.email === doc.data().email) {
          Alert.alert('Tài khoản đã tồn tại');
          setIsSignUp(false);
          setUser({
            name: '',
            email: '',
            pass: ''
          });
          isValid = false;
          return
        }
      });

      if (isValid) {
        senDataToFirebase(user);
        Alert.alert('Đăng ký thành công', 'Tài khoản của bạn đã được tạo.', [{ text: 'OK' }]);
      }
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  };

  // Thực hiện khi click vào signUp
  const SignUp = () => {
    setIsSignUp(true);
    getDataFromFirebase(user);
  }

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style='light' />
      <Image style={{ width: '100%', height: '80%', position: 'absolute' }} source={require('../assets/images/background.png')} />
      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Image className="h-[160] w-[65]" source={require('../assets/images/light.png')} />
        <Image className="h-[160] w-[65]" source={require('../assets/images/light.png')} />
      </View>
      {/* title and form */}
      <View style={{ height: '100%', width: '100%', flex: 1, justifyContent: 'space-around', paddingTop: 100 }}>
        {/* title */}
        <View className="flex items-center">
          <Text className="text-white font-bold tracking-wider text-5xl">
            Sign Up
          </Text>
        </View>
        {/* form */}
        <View className="flex items-center mx-4 space-y-4">
          <View className="bg-black/5 p-5 rounded-2xl w-full">
            {user.name == "" && <Text className="text-red font-normal">Nhập họ và tên</Text>}
            <TextInput placeholder='Username' placeholderTextColor={'gray'} value={user.name} onChangeText={handleNameChange} />
          </View>
          <View className="bg-black/5 p-5 rounded-2xl w-full">
            {user.email == "" && <Text className="text-red font-normal">Nhập số điện thoại</Text>}
            <TextInput placeholder='Phone number' placeholderTextColor={'gray'} value={user.email} onChangeText={handleEmailChange} />
          </View>
          <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
            {user.pass == "" && <Text className="text-red font-normal">Nhập mật khẩu</Text>}
            <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry value={user.pass} onChangeText={handlePassChange} />
          </View>
          {/* <View style={styles.container}>
            <TouchableOpacity
              style={selectedGender === 'male' ? styles.selectedOption : styles.option}
              onPress={() => handleGenderSelect('male')}>
              <Text style={styles.optionText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={selectedGender === 'female' ? styles.selectedOption : styles.option}
              onPress={() => handleGenderSelect('female')}>
              <Text style={styles.optionText}>Nữ</Text>
            </TouchableOpacity>
          </View> */}
          <View className='w-full'>
            {user.name != '' &&
              user.email != '' &&
              user.pass != '' &&
              !isSignUp &&
              <TouchableOpacity className='w-full bg-sky-400 p-3 rounded-2xl mb-3'
                onPress={SignUp}>
                <Text className='text-xl font-bold text-white text-center'>SignUp</Text>
              </TouchableOpacity>}
            {isSignUp &&
              <Progress.Circle size={30} indeterminate={true} style={{ alignSelf: 'center' }} />
            }
          </View>
          <View className="flex-row justify-center">
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <Text className="text-sky-600"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin:15
  },
  selectedOption: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    backgroundColor: 'lightblue',
  },
  optionText: {
    fontSize: 16,
  },
});