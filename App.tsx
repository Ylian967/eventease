import { Anton_400Regular } from '@expo-google-fonts/anton';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { EventProvider } from './src/context/EventContext';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme';

// Le splash screen reste affiché tant que les polices ne sont pas chargées
SplashScreen.preventAutoHideAsync();

// Fond menthe par défaut pour tous les écrans
const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Anton_400Regular,
    DMSans_400Regular,
    DMSans_700Bold,
    DMSerifDisplay_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <EventProvider>
          <NavigationContainer theme={navigationTheme}>
            <RootNavigator />
            <StatusBar style="light" />
          </NavigationContainer>
        </EventProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
