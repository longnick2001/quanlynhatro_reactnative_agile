import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import HomePage from './HomePage';
import Room from './Room';
import RoomList from './RoomList';
import Bill from './Bill';
import Icon from "react-native-vector-icons/Ionicons";
import CustomTabBarButton from './customs/customTabBarButton';
import { useNavigation } from '@react-navigation/native';
Icon.loadFont();


const Tab = createBottomTabNavigator();
export default function TabNavigator({route}) {
  const navigation = useNavigation();
  // console.log("navigation", props)
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Room') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'RoomList') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Bill') {
          iconName = focused ? 'receipt' : 'receipt-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />
      },
    })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >

      <Tab.Screen name="Home" component={HomePage} initialParams={{ user: route.params.user }}
        options={{
          tabBarLabel: "TT chung",
          title: "TT chung",
          headerShown: true,
          // tabBarButton: props => (<CustomTabBarButton route="feed" {...props} />),
          headerLeft: () => {
            return (
              <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()}>
                <Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} size={30} color={'#222'} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            )
          }
        }} />
      <Tab.Screen name="Room" component={Room} initialParams={{ userId: route.params.userId }}
        options={{
          tabBarLabel: "Phòng",
          title: "Phòng",
          headerShown: true,
          // tabBarButton: props => (<CustomTabBarButton route="feed" {...props} />),
          headerLeft: () => {
            return (
              <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()}>
                <Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} size={30} color={'#222'} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            )
          }
        }} />
      <Tab.Screen name="RoomList" component={RoomList} initialParams={{ userId: route.params.userId }}
        options={{
          tabBarLabel: "Danh sách người thuê",
          title: "Danh sách thuê",
          headerShown: true,
          // tabBarButton: props => (<CustomTabBarButton route="feed" {...props} />),
          headerLeft: () => {
            return (
              <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()}>
                <Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} size={30} color={'#222'} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            )
          }
        }} />
      <Tab.Screen name="Bill" component={Bill} initialParams={{ userId: route.params.userId }}
        options={{
          tabBarLabel: "Hóa đơn",
          title: "Hóa Đơn",
          headerShown: true,
          // tabBarButton: props => (<CustomTabBarButton route="feed" {...props} />),
          headerLeft: () => {
            return (
              <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()}>
                <Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} size={30} color={'#222'} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            )
          }
        }} />
    </Tab.Navigator>
  )
}