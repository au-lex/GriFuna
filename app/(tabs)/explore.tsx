
import SafeLayout from '@/Layout/SafeAreaLayout';
import MyEvents from '@/Screens/USERS/mY/MyEvent';
import { Text, View } from 'react-native';





export default function Index() {
  return (
    <>
    <SafeLayout>

   

      <View style={{ flex: 1, }}>
      <MyEvents />
      </View>
  
    </SafeLayout>
    
    </>
  );
}

