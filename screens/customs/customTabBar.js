/* eslint-disable prettier/prettier */

import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';


const CustomTabBar = props => {
    return (
        <View>
            <View style={styles.tabBar}>
                <BottomTabBar {...props} />
            </View>
        </View>
    );
}

export default CustomTabBar;

const styles = StyleSheet.create({
    tabBar : {
        position:'absolute',
        right:10,
        left:10,
        bottom:15,
        height:30,
        backgroundColor:"#fff",
        borderRadius:10,
        shadowColor:'#222',
        shadowOffset:{
            width:0, height:1,
        },
        shadowOpacity:0.25,
        shadowRadius:2, 
        elevation:3,
        // width: "100%",
        margin:0
    }
});
