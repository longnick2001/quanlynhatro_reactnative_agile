import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const RoomDetail = ({route}) => {
    const [room, setRoom] = useState(route.params.data);
  return (
    <SafeAreaView>
      <Text>Detail</Text>
    </SafeAreaView>
  )
}

export default RoomDetail

const styles = StyleSheet.create({})