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
    ib: require('../assets/fonts/IntelOneMono-Bold.ttf'),
    im: require('../assets/fonts/IntelOneMono-Medium.ttf'),
    il: require('../assets/fonts/IntelOneMono-Light.ttf'),
    is: require('../assets/fonts/IntelOneMono-SemiBold.ttf'),
    ir: require('../assets/fonts/IntelOneMono-Regular.ttf'),
    rb: require('../assets/fonts/Roboto-Bold.ttf'),
    rm: require('../assets/fonts/Roboto-Medium.ttf'),
    rl: require('../assets/fonts/Roboto-Light.ttf'),
    rs: require('../assets/fonts/Roboto-SemiBold.ttf'),
    rr: require('../assets/fonts/Roboto-Regular.ttf'),
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
        <Stack.Screen name="notifica/Index" options={{ headerShown: false }} />
        <Stack.Screen name="search/Index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}