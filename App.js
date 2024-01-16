// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomePage from './screens/HomePage';
import Room from './screens/Room';
import Search from './screens/Search';
import RoomList from './screens/RoomList';
import Bill from './screens/Bill';
import TabButton from './screens/TabButton';
import TabNavigator from './screens/TabNavigator';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="TabButton" component={TabButton} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Room" component={Room} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="RoomList" component={RoomList} />
        <Stack.Screen name="Bill" component={Bill} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;