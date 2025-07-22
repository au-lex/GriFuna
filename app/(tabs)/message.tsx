
import SafeLayout from '@/Layout/SafeAreaLayout';
import MyTicketsPage from '@/Screens/USERS/MyTickets/MyTicket';
import { Text, View } from 'react-native';





export default function Index() {
  return (
    <>
    <SafeLayout>

   

      <View style={{ flex: 1,}}>
      <MyTicketsPage />
      </View>
  
    </SafeLayout>
    
    </>
  );
}

