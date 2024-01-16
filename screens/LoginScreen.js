import { View, Text, Image,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View className = "bg-white h-full w-full">
        <StatusBar style='light'/>
      <Image className= "h-full w-full absolute" source = {require('../assets/images/background.png')}/>
      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Image className="h-[225] w-[90]" source = {require('../assets/images/light.png')}/>
        <Image className="h-[160] w-[65]" source = {require('../assets/images/light.png')}/>
      </View>
      {/* title and form */}
      <View className= "h-full w-full flex justify-around pt-40 pd-10">
        {/* title */}
        <View className="flex items-center">
            <Text className= "text-white font-bold tracking-wider text-5xl">
                Login
            </Text>
        </View>
        {/* form */}
        <View className="flex items-center mx-4 space-y-4">
            <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder='Email' placeholderTextColor={'gray'}/>
            </View>
            <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry/>
            </View>
            <View className='w-full'>
                <TouchableOpacity className='w-full bg-sky-400 p-3 rounded-2xl mb-3' onPress={()=> navigation.push("TabButton")}>
                    <Text className='text-xl font-bold text-white text-center'>Login</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center">
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={()=> navigation.push('Signup')}>
                    <Text className="text-sky-600">SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}