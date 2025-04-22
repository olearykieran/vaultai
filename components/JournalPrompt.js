import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Journal prompt component
export default function JournalPrompt({ prompt, style = {} }) {
  const { theme } = useTheme();
  
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.roundness.m,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="lightbulb-outline"
          size={24}
          color={theme.colors.accent}
        />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Today's Prompt</Text>
        <Text style={[styles.promptText, { color: theme.colors.text }]}>{prompt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  promptText: {
    fontSize: 16,
    lineHeight: 24,
  },
});