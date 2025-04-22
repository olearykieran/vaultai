import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { VaultProvider } from './contexts/VaultContext';

// Import navigation
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
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