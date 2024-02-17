import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
//firebase
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    name: '',
    pass: '',
    phone: ''
  });

  // Hàm xử lý khi thay đổi giá trị của trường name
  const handleEmailChange = (value) => {
    setUser({ ...user, phone: value });
  };
  // Hàm xử lý khi thay đổi giá trị của trường pass
  const handlePassChange = (value) => {
    setUser({ ...user, pass: value });
  };

  //firebase
  const getDataFromFirebase = async (user) => {
    const db = getFirestore(app);
    const usersCollection = collection(db, 'users');
    let isValid = false;
    try {
      const querySnapshot = await getDocs(usersCollection);
      querySnapshot.forEach((doc) => {
        if (user.phone === doc.data().phone && user.pass === doc.data().pass) {
          alert('Đăng nhập thành công');
          navigation.push('DrawerNavigator',{user: doc.data(), userId: doc.id})
          // console.log('loooooooo: '+doc.id)
          isValid = true;
        }
      });
      if (!isValid) {
        alert('Đăng nhập không thành công');
      }
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  };

  const Login = () => {
    getDataFromFirebase(user);
  }
  return (
    <View className="bg-white h-full w-full">
      <StatusBar style='light' />
      <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />
      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Image className="h-[225] w-[90]" source={require('../assets/images/light.png')} />
        <Image className="h-[160] w-[65]" source={require('../assets/images/light.png')} />
      </View>
      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-40 pd-10">
        {/* title */}
        <View className="flex items-center">
          <Text className="text-white font-bold tracking-wider text-5xl">
            Login
          </Text>
        </View>
        {/* form */}
        <View className="flex items-center mx-4 space-y-4">
          <View className="bg-black/5 p-5 rounded-2xl w-full">
            {user.phone == "" && <Text className="text-red font-normal">Nhập số điện thoại</Text>}
            <TextInput placeholder='Phone number' placeholderTextColor={'gray'} value={user.phone} onChangeText={handleEmailChange} />
          </View>
          <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
            {user.pass == "" && <Text className="text-red font-normal">Nhập mật khẩu</Text>}
            <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry value={user.pass} onChangeText={handlePassChange} />
          </View>
          <View className='w-full'>
            {!login &&
              user.phone != '' &&
              user.pass != '' &&
              <TouchableOpacity className='w-full bg-sky-400 p-3 rounded-2xl mb-3' onPress={Login}>
                <Text className='text-xl font-bold text-white text-center'>Login</Text>
              </TouchableOpacity>
            }
          </View>
          <View className="flex-row justify-center">
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('Signup')}>
              <Text className="text-sky-600"> SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}