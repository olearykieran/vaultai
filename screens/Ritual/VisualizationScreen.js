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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Visualization Scene */}
        <View style={styles.sceneContainer}>
          {currentScene && <VisualizationScene scene={currentScene} />}
        </View>
        
        {/* Scene Controls */}
        <View style={styles.sceneControls}>
          <TouchableOpacity
            style={[
              styles.sceneButton,
              { backgroundColor: theme.colors.card, borderRadius: theme.roundness.s },
            ]}
            onPress={handleChangeScene}
          >
            <MaterialCommunityIcons name="refresh" size={20} color={theme.colors.primary} />
            <Text style={[styles.sceneButtonText, { color: theme.colors.primary }]}>
              Change Scene
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.sceneButton,
              { backgroundColor: theme.colors.card, borderRadius: theme.roundness.s },
            ]}
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
          <Text style={[styles.timerTitle, { color: theme.colors.text }]}>
            Visualization Timer
          </Text>
          
          <View
            style={[
              styles.timerContainer,
              { backgroundColor: theme.colors.card, borderRadius: theme.roundness.m },
            ]}
          >
            <Text style={[styles.timerText, { color: theme.colors.text }]}>
              {formatTime(timer)}
            </Text>
            
            <View style={styles.timerControls}>
              {isTimerRunning ? (
                <TouchableOpacity
                  style={[
                    styles.timerButton,
                    { backgroundColor: theme.colors.warning, borderRadius: theme.roundness.s },
                  ]}
                  onPress={handlePauseTimer}
                >
                  <MaterialCommunityIcons name="pause" size={20} color="#FFFFFF" />
                  <Text style={[styles.timerButtonText, { color: '#FFFFFF' }]}>Pause</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.timerButton,
                    { backgroundColor: theme.colors.primary, borderRadius: theme.roundness.s },
                  ]}
                  onPress={handleStartTimer}
                >
                  <MaterialCommunityIcons name="play" size={20} color="#FFFFFF" />
                  <Text style={[styles.timerButtonText, { color: '#FFFFFF' }]}>Start</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={[
                  styles.timerButton,
                  { backgroundColor: theme.colors.card, borderRadius: theme.roundness.s },
                ]}
                onPress={handleResetTimer}
              >
                <MaterialCommunityIcons name="refresh" size={20} color={theme.colors.text} />
                <Text style={[styles.timerButtonText, { color: theme.colors.text }]}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Instructions */}
        <View
          style={[
            styles.instructionContainer,
            {
              backgroundColor: theme.colors.card,
              borderRadius: theme.roundness.m,
              borderLeftColor: theme.colors.accent,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={theme.colors.accent}
            style={styles.infoIcon}
          />
          <View>
            <Text style={[styles.instructionTitle, { color: theme.colors.text }]}>
              How to visualize effectively
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.subText }]}>
              1. Get comfortable and take three deep breaths
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.subText }]}>
              2. Immerse yourself in the scene, using all your senses
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.subText }]}>
              3. Feel the emotions of already having achieved this
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.subText }]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sceneContainer: {
    height: 250,
    width: '100%',
  },
  sceneControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  sceneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sceneButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  timerSection: {
    padding: 16,
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  timerContainer: {
    padding: 16,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  timerButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  instructionContainer: {
    padding: 16,
    margin: 16,
    flexDirection: 'row',
    borderLeftWidth: 4,
  },
  infoIcon: {
    marginRight: 12,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  nextButton: {
    margin: 16,
  },
});