import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import SetupProfileScreen from '../screens/Onboarding/SetupProfileScreen';
import ChooseVoiceScreen from '../screens/Onboarding/ChooseVoiceScreen';

// Import theme context
import { useTheme } from '../contexts/ThemeContext';

// Create stack navigator
const Stack = createNativeStackNavigator();

// Onboarding stack component
export default function OnboardingStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SetupProfile" component={SetupProfileScreen} />
      <Stack.Screen name="ChooseVoice" component={ChooseVoiceScreen} />
    </Stack.Navigator>
  );
}