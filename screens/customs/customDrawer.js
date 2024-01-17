/* eslint-disable prettier/prettier */
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, View } from "react-native";

const {width} = Dimensions.get('screen');

const CustomDrawer = props =>{

    return (
        <DrawerContentScrollView {...props}  contentContainerStyle={{flex: 1}}>
            <ImageBackground source={require("../../assets/images/background.png")} style={{height:140}}>
                <Image source={require("../../assets/images/background.png")} style={styles.userImg} />
            </ImageBackground>
            <View style={styles.drawerListWrapper}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    )

}

export default CustomDrawer;


const styles = StyleSheet.create({
    userImg:{
        width:110,
        height:110,
        borderRadius:110/2,
        position:'absolute',
        left:width/2-130,
        bottom:-110/2,
        borderWidth:4,
        borderColor:"#fff"
    },
    drawerListWrapper:{
        marginTop:65
    }
});
