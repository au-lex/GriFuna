import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventDetailsScreen from '@/Screens/USERS/Events/EventDetails'
import SafeLayout from '@/Layout/SafeAreaLayout'

const Index = () => {
  return (
    <SafeLayout>

    <View style={{ flex: 1, backgroundColor: '#1a1625' }}>
<EventDetailsScreen />
    </View>
    </SafeLayout>
  )
}

export default Index

const styles = StyleSheet.create({})