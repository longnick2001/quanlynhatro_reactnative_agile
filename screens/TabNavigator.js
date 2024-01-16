import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import HomePage from './HomePage';
import Room from './Room';
import Search from './Search';
import RoomList from './RoomList';
import Bill from './Bill';


const Tab = createBottomTabNavigator();
export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Room') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'RoomList') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === 'Bill') {
                iconName = focused ? 'receipt' : 'receipt-outline';
              }              
            return <Ionicons name={iconName} size={size} color={color}/>
        },
    })}
    tabBarOptions = {{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
    }}
    > 

    <Tab.Screen name="Home" component = {HomePage}/>
    <Tab.Screen name="Room" component = {Room}/>
    <Tab.Screen name="Search" component = {Search}/>
    <Tab.Screen name="RoomList" component = {RoomList}/>
    <Tab.Screen name="Bill" component = {Bill}/>
    </Tab.Navigator>
  )
}