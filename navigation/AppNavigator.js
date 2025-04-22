import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import contexts
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// Import navigation components
import BottomTabs from './BottomTabs';
import OnboardingStack from './OnboardingStack';

// Create stack navigator
const Stack = createNativeStackNavigator();

// Main navigator component
export default function AppNavigator() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  // Show loading indicator while checking authentication status
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // User is signed in, show the main app
        <Stack.Screen name="Main" component={BottomTabs} />
      ) : (
        // User is not signed in, show the onboarding flow
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});