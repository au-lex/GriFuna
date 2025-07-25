import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeLayout from '@/Layout/SafeAreaLayout'
import MessageUI from '@/Screens/ORGANIZERS/Chat/MessageUI'

const Index = () => {
  return (
    <SafeLayout>

    <View style={{ flex: 1 }}>
<MessageUI />
    </View>
    </SafeLayout>
  )
}

export default Index

const styles = StyleSheet.create({})