import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import MirrorScreen from '../screens/Ritual/MirrorScreen';
import VisualizationScreen from '../screens/Ritual/VisualizationScreen';
import JournalScreen from '../screens/Ritual/JournalScreen';

// Import theme context
import { useTheme } from '../contexts/ThemeContext';

// Create stack navigator
const Stack = createNativeStackNavigator();

// Ritual stack component
export default function RitualStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Mirror"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Mirror"
        component={MirrorScreen}
        options={{
          title: 'Mirror Exercise',
        }}
      />
      
      <Stack.Screen
        name="Visualization"
        component={VisualizationScreen}
        options={{
          title: 'Visualization',
        }}
      />
      
      <Stack.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          title: 'Journal',
        }}
      />
    </Stack.Navigator>
  );
}