
import SafeLayout from '@/Layout/SafeAreaLayout';
import Header from '@/Screens/USERS/Home/Header';
import { Text, View } from 'react-native';





export default function Index() {
  return (
    <>
    <SafeLayout>

   

      <View style={{ flex: 1, }}>
 <Header />
      </View>
  
    </SafeLayout>
    
    </>
  );
}

