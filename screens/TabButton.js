import { View, Text, Button } from 'react-native'
import React, {useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomePage from './HomePage';
import Room from './Room';
import Search from './Search';
import RoomList from './RoomList';
import Bill from './Bill';
import TabNavigator from './TabNavigator';

export default function TabButton() {
    const [currentTab, setCurrentTab] = useState(1);

    const handleTabClick = (tabNumber) =>{
        setCurrentTab(tabNumber);
    };


  return (
      <GestureHandlerRootView style={{flex: 1}}> 
      <TabNavigator>
        <Button onPress={() => handleTabClick(1)}>Tab 1</Button>
        <Button onPress={() => handleTabClick(2)}>Tab 2</Button>
        <Button onPress={() => handleTabClick(3)}>Tab 3</Button>
        <Button onPress={() => handleTabClick(4)}>Tab 4</Button>
        <Button onPress={() => handleTabClick(5)}>Tab 5</Button>

        {currentTab === 1 && <HomePage/>}
        {currentTab === 2 && <Room/>}
        {currentTab === 3 && <Search/>}
        {currentTab === 4 && <RoomList/>}
        {currentTab === 5 && <Bill/>}
        </TabNavigator>
      </GestureHandlerRootView>
  );
};