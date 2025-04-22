import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

// Visualization scene component for the ritual
export default function VisualizationScene({ scene, autoFade = false }) {
  const { theme } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));
  
  // Fade in the scene when it first renders
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Auto fade out after a delay if requested
    if (autoFade) {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [scene]);
  
  if (!scene) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>Loading scene...</Text>
      </View>
    );
  }
  
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, opacity: fadeAnim },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: scene.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: '#FFFFFF' }]}>{scene.title}</Text>
        <Text style={[styles.description, { color: '#E2E8F0' }]}>
          {scene.description}
        </Text>
        <Text style={[styles.prompt, { color: '#FFFFFF' }]}>{scene.prompt}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    width,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  prompt: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 40,
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});