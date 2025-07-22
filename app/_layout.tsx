import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    mb: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    mm: require('../assets/fonts/Montserrat-Medium.ttf'),
    ol: require('../assets/fonts/OpenSans-Light.ttf'),
    ob: require('../assets/fonts/OpenSans-Bold.ttf'),
    om: require('../assets/fonts/OpenSans-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: '#1a1625' }}>
      <StatusBar style="light" backgroundColor="#1a1625" translucent={false} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#1a1625' },
          headerStyle: { backgroundColor: '#1a1625' },
          headerTintColor: '#ffffff',
       
        }}
      >
        <Stack.Screen name='onboarding/Index' options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="eventDetails/Index" options={{ headerShown: false }} />
        <Stack.Screen name="getTicket/Index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}