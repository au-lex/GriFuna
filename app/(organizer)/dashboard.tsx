import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeLayout from '@/Layout/SafeAreaLayout'
import MessageListUI from '@/Screens/ORGANIZERS/Chat/MsgList'

const Index = () => {
  return (
    <SafeLayout>

    <View style={{ flex: 1 }}>
<MessageListUI />
    </View>
    </SafeLayout>
  )
}

export default Index

const styles = StyleSheet.create({})