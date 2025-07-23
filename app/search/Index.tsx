import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeLayout from '@/Layout/SafeAreaLayout'
import SearchScreen from '@/Screens/Srch/Search'

const Index = () => {
  return (
    <SafeLayout>

    <View style={{ flex: 1,  }}>
    <SearchScreen />
    </View>
    </SafeLayout>
  )
}

export default Index

const styles = StyleSheet.create({})