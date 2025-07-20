
import SafeLayout from '@/Layout/SafeAreaLayout';
import SavedEventsScreen from '@/Screens/USERS/Saved/SavedEvent';
import { Text, View } from 'react-native';





export default function Index() {
  return (
    <>
    <SafeLayout>

   

      <View style={{ flex: 1, }}>
<SavedEventsScreen />
      </View>
  
    </SafeLayout>
    
    </>
  );
}

