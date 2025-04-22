import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Animated affirmation card component
export default function AffirmationCard({ affirmation, onFavorite, isFavorite = false }) {
  const { theme } = useTheme();
  const [scaleValue] = useState(new Animated.Value(1));
  
  // Handle card press animation
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Get category color
  const getCategoryColor = () => {
    if (!affirmation || !affirmation.category) return theme.colors.primary;
    
    switch (affirmation.category) {
      case 'self-worth':
        return theme.colors.primary;
      case 'abundance':
        return theme.colors.success;
      case 'empowerment':
        return theme.colors.secondary;
      case 'attraction':
        return '#9C27B0'; // Purple
      case 'growth':
        return theme.colors.accent;
      case 'opportunity':
        return '#FF9800'; // Orange
      case 'confidence':
        return '#00BCD4'; // Cyan
      case 'income':
        return '#CDDC39'; // Lime
      case 'mindset':
        return '#7986CB'; // Indigo
      default:
        return theme.colors.primary;
    }
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.roundness.m,
          transform: [{ scale: scaleValue }],
          borderLeftColor: getCategoryColor(),
        },
      ]}
    >
      <TouchableOpacity style={styles.cardContent} onPress={handlePress} activeOpacity={0.8}>
        <Text style={[styles.categoryTag, { color: getCategoryColor() }]}>
          {affirmation?.category?.toUpperCase() || 'AFFIRMATION'}
        </Text>
        
        <Text style={[styles.affirmationText, { color: theme.colors.text }]}>
          {affirmation?.text || 'Loading affirmation...'}
        </Text>
        
        <View style={styles.footer}>
          <TouchableOpacity onPress={onFavorite} style={styles.favoriteButton}>
            <MaterialCommunityIcons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? theme.colors.error : theme.colors.subText}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
  },
  cardContent: {
    padding: 16,
  },
  categoryTag: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  affirmationText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 4,
  },
});