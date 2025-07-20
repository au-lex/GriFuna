
import SafeLayout from '@/Layout/SafeAreaLayout';
import Header from '@/Screens/USERS/Home/Header';
import Hero from '@/Screens/USERS/Home/Hero';
import { Text, View } from 'react-native';





export default function Index() {
  return (
    <>
    <SafeLayout backgroundColor='#1a1625' statusBarBackgroundColor='#1a1625' statusBarStyle='light'>

   

      <View style={{ flex: 1, }}>
 <Header />
 <Hero />
      </View>
  
    </SafeLayout>
    
    </>
  );
}

