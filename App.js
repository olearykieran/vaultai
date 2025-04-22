import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Import providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { VaultProvider } from './contexts/VaultContext';

// Import navigation
import AppNavigator from './navigation/AppNavigator';

// Keep the splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Satoshi-Black': require('./assets/font/Satoshi-Black.otf'),
        'Satoshi-BlackItalic': require('./assets/font/Satoshi-BlackItalic.otf'),
        'Satoshi-Bold': require('./assets/font/Satoshi-Bold.otf'),
        'Satoshi-BoldItalic': require('./assets/font/Satoshi-BoldItalic.otf'),
        'Satoshi-Italic': require('./assets/font/Satoshi-Italic.otf'),
        'Satoshi-Light': require('./assets/font/Satoshi-Light.otf'),
        'Satoshi-LightItalic': require('./assets/font/Satoshi-LightItalic.otf'),
        'Satoshi-Medium': require('./assets/font/Satoshi-Medium.otf'),
        'Satoshi-MediumItalic': require('./assets/font/Satoshi-MediumItalic.otf'),
        'Satoshi-Regular': require('./assets/font/Satoshi-Regular.otf'),
      });
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Optionally, render a custom splash/loading here
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <AuthProvider>
        <ThemeProvider>
          <VaultProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </VaultProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}