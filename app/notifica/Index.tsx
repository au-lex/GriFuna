import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationsScreen from '@/Screens/Notification/Notification'
import SafeLayout from '@/Layout/SafeAreaLayout'

const Index = () => {
  return (
    <SafeLayout>

    <View style={{ flex: 1,  }}>
<NotificationsScreen />
    </View>
    </SafeLayout>
  )
}

export default Index

const styles = StyleSheet.create({})