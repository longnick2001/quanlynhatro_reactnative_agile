import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/Ionicons";
import Room from "../Room";
import RoomList from "../RoomList";
import Bill from "../Bill";
import CustomDrawer from "../customs/customDrawer";
import TabNavigator from "../TabNavigator";
import Profile from "../Profile";
import Notifications from "../Notifications";
import { Settings } from "react-native";
import Setting from "../Setting";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
    <Drawer.Navigator 
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#B666D2",
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: {
            marginLeft: -20,
        },
        }}>

        <Drawer.Screen name={"Home Drawer"} initialParams={{ params: 'feed' }} component={TabNavigator} options={{ 
            title:"TT chung",
            drawerIcon : ({focused, color, size}) =>(
                <Icon name="home-sharp" size={18} color={color} />
            )
        }} />

        <Drawer.Screen name={"Profile"}  initialParams={{ params: 'Profile' }} component={Profile} options={{
            title:"Profile", 
            drawerIcon : ({focused, color, size}) =>(
                <Icon name="ios-person-circle-sharp" size={18} color={color} />
            )
        }} />

        <Drawer.Screen name={"Notification"} initialParams={{ params: 'Notification' }} component={Notifications} options={{
            title:"Notification", 
            drawerIcon : ({focused, color, size}) =>(
                <Icon name="ios-notifications-circle" size={18} color={color} />
            )
        }} />

        <Drawer.Screen name={"Settings"} initialParams={{ params: 'Settings' }} component={Setting} options={{
            title:"Settings", 
            drawerIcon : ({focused, color, size}) =>(
                <Icon name="settings-sharp" size={18} color={color} />
            )
        }} />
        
    </Drawer.Navigator>
    )
}

export default DrawerNavigator;