// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DrawerNavigator from './screens/navigators/drawerNavigator';
import 'react-native-gesture-handler';
import {
  LogBox,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import TabNavigator from './screens/TabNavigator';
import Bill from './screens/Bill';
import Room from './screens/Room';
import RoomList from './screens/RoomList';
import Search from './screens/Search';
import HomePage from './screens/HomePage';


const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Bill" component={Bill} />
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="RoomList" component={RoomList} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;