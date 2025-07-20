
import SafeLayout from '@/Layout/SafeAreaLayout';
import Header from '@/Screens/USERS/Home/Header';
import Hero from '@/Screens/USERS/Home/Hero';
import { Text, View } from 'react-native';





export default function Index() {
  return (
    <>
    <SafeLayout>

   

      <View style={{ flex: 1, }}>
 <Header />
 <Hero />
      </View>
  
    </SafeLayout>
    
    </>
  );
}

