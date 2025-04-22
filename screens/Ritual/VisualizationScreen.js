import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import contexts and components
import { useTheme } from '../../contexts/ThemeContext';
import { useVault } from '../../contexts/VaultContext';
import VaultButton from '../../components/VaultButton';
import VisualizationScene from '../../components/VisualizationScene';

// Import utilities and constants
import { getRandomScene, visualizationScenes } from '../../constants/scenes';

// Visualization screen component (second step in ritual)
export default function VisualizationScreen({ navigation }) {
  const { theme } = useTheme();
  const { preferences, updatePreferences } = useVault();
  const [currentScene, setCurrentScene] = useState(null);
  const [timer, setTimer] = useState(60); // 60 seconds for visualization
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Define styles inside the component to access theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      padding: theme.spacing.m,
    },
    sceneContainer: {
      height: 250,
      width: '100%',
      marginBottom: theme.spacing.m,
      backgroundColor: theme.colors.card,
      borderRadius: theme.roundness.m,
    },
    sceneControls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.l,
    },
    sceneButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.s,
      paddingHorizontal: theme.spacing.m,
      backgroundColor: theme.colors.card,
      borderRadius: theme.roundness.s,
    },
    sceneButtonText: {
      marginLeft: theme.spacing.xs,
      fontSize: theme.typography.fontSizes.s,
      fontFamily: theme.typography.fontFamilies.medium,
    },
    timerSection: {
      marginBottom: theme.spacing.l,
    },
    timerTitle: {
      fontSize: theme.typography.fontSizes.l,
      fontWeight: '600',
      fontFamily: theme.typography.fontFamilies.medium,
      color: theme.colors.text,
      marginBottom: theme.spacing.m,
    },
    timerContainer: {
      padding: theme.spacing.m,
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: theme.roundness.m,
    },
    timerText: {
      fontSize: 48,
      fontWeight: 'bold',
      fontFamily: theme.typography.fontFamilies.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.m,
    },
    timerControls: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    timerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.s,
      paddingHorizontal: theme.spacing.m,
      marginHorizontal: theme.spacing.xs,
      borderRadius: theme.roundness.s,
    },
    timerButtonText: {
      marginLeft: theme.spacing.xs,
      fontSize: theme.typography.fontSizes.s,
      fontFamily: theme.typography.fontFamilies.medium,
    },
    instructionContainer: {
      padding: theme.spacing.m,
      marginBottom: theme.spacing.l,
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.card,
      borderRadius: theme.roundness.m,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.accent,
    },
    infoIcon: {
      marginRight: theme.spacing.m,
      marginTop: 2,
    },
    instructionTitle: {
      fontSize: theme.typography.fontSizes.m,
      fontWeight: '600',
      fontFamily: theme.typography.fontFamilies.medium,
      color: theme.colors.text,
      marginBottom: theme.spacing.s,
    },
    instructionText: {
      fontSize: theme.typography.fontSizes.s,
      lineHeight: 20,
      fontFamily: theme.typography.fontFamilies.regular,
      color: theme.colors.subText,
      marginBottom: theme.spacing.xs,
    },
    nextButton: {
      marginTop: theme.spacing.s, // Keep some margin before the end
    },
  });

  // Load current scene on component mount
  useEffect(() => {
    // Get preferred scene from user preferences, or random scene
    const preferredSceneId = preferences.preferredSceneId;
    if (preferredSceneId) {
      const scene = visualizationScenes.find(s => s.id === preferredSceneId);
      setCurrentScene(scene || getRandomScene());
    } else {
      setCurrentScene(getRandomScene());
    }
  }, [preferences]);

  // Handle timer countdown
  useEffect(() => {
    let interval;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle start timer
  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  // Handle pause timer
  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  // Handle reset timer
  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimer(60);
  };

  // Handle next button press to proceed to journal
  const handleNextPress = () => {
    navigation.navigate('Journal');
  };

  // Handle scene change
  const handleChangeScene = () => {
    const newScene = getRandomScene();
    setCurrentScene(newScene);
  };

  // Set current scene as preferred
  const handleSetPreferred = () => {
    if (currentScene) {
      updatePreferences({ preferredSceneId: currentScene.id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Visualization Scene */}
        <View style={styles.sceneContainer}>
          {currentScene && <VisualizationScene scene={currentScene} />}
        </View>

        {/* Scene Controls */}
        <View style={styles.sceneControls}>
          <TouchableOpacity
            style={styles.sceneButton}
            onPress={handleChangeScene}
          >
            <MaterialCommunityIcons name="refresh" size={20} color={theme.colors.primary} />
            <Text style={[styles.sceneButtonText, { color: theme.colors.primary }]}>
              Change Scene
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sceneButton}
            onPress={handleSetPreferred}
          >
            <MaterialCommunityIcons name="star" size={20} color={theme.colors.warning} />
            <Text style={[styles.sceneButtonText, { color: theme.colors.warning }]}>
              Set as Preferred
            </Text>
          </TouchableOpacity>
        </View>

        {/* Timer Section */}
        <View style={styles.timerSection}>
          <Text style={styles.timerTitle}>
            Visualization Timer
          </Text>

          <View
            style={styles.timerContainer}
          >
            <Text style={styles.timerText}>
              {formatTime(timer)}
            </Text>

            <View style={styles.timerControls}>
              {isTimerRunning ? (
                <TouchableOpacity
                  style={[styles.timerButton, { backgroundColor: theme.colors.warning }]}
                  onPress={handlePauseTimer}
                >
                  <MaterialCommunityIcons name="pause" size={20} color="#FFFFFF" /><Text style={[styles.timerButtonText, { color: '#FFFFFF' }]}>Pause</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.timerButton, { backgroundColor: theme.colors.primary }]} // Background is primary
                  onPress={handleStartTimer}
                >
                  <MaterialCommunityIcons name="play" size={20} color={theme.colors.background} /><Text style={[styles.timerButtonText, { color: theme.colors.background }]}>Start</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.timerButton, { backgroundColor: theme.colors.card }]}
                onPress={handleResetTimer}
              >
                <MaterialCommunityIcons name="refresh" size={20} color={theme.colors.text} /><Text style={[styles.timerButtonText, { color: theme.colors.text }]}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Instructions */}
        <View
          style={styles.instructionContainer}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={theme.colors.accent}
            style={styles.infoIcon}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.instructionTitle}>
              How to visualize effectively
            </Text>
            <Text style={styles.instructionText}>
              1. Get comfortable and take three deep breaths
            </Text>
            <Text style={styles.instructionText}>
              2. Immerse yourself in the scene, using all your senses
            </Text>
            <Text style={styles.instructionText}>
              3. Feel the emotions of already having achieved this
            </Text>
            <Text style={styles.instructionText}>
              4. Stay with the visualization for at least 60 seconds
            </Text>
          </View>
        </View>

        {/* Next Button */}
        <VaultButton
          title="Continue to Journal"
          onPress={handleNextPress}
          style={styles.nextButton}
          icon={
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}