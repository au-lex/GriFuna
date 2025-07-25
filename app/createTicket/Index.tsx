import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TkMgt from '@/Screens/ORGANIZERS/AddTicket/AddTicket'
import SafeLayout from '@/Layout/SafeAreaLayout'

const Index = () => {
  return (
    <SafeLayout>


    <View style={{ flex: 1, backgroundColor: '#1a1625' }}>
   <TkMgt />
    </View>
    </SafeLayout>
  )
}

export default Index

const styles = StyleSheet.create({})