import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import contexts and components
import { useTheme } from '../../contexts/ThemeContext';
import { useVault } from '../../contexts/VaultContext';
import VaultButton from '../../components/VaultButton';

// Choose voice screen component
export default function ChooseVoiceScreen({ navigation }) {
  const { theme } = useTheme();
  const { updatePreferences } = useVault();
  const [selectedVoice, setSelectedVoice] = useState('encouraging');
  const [loading, setLoading] = useState(false);
  
  // Voice options
  const voiceOptions = [
    {
      id: 'encouraging',
      title: 'Encouraging Coach',
      description: 'Supportive, motivating, and positive guidance',
      icon: 'account-heart',
    },
    {
      id: 'direct',
      title: 'Direct Mentor',
      description: 'Straightforward, no-nonsense advice',
      icon: 'account-tie',
    },
    {
      id: 'analytical',
      title: 'Analytical Advisor',
      description: 'Data-driven, logical financial insights',
      icon: 'account-search',
    },
    {
      id: 'spiritual',
      title: 'Spiritual Guide',
      description: 'Holistic, mindful approach to wealth',
      icon: 'meditation',
    },
  ];
  
  // Handle voice selection
  const handleSelectVoice = (voiceId) => {
    setSelectedVoice(voiceId);
  };
  
  // Handle completion of onboarding
  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Save voice preference
      await updatePreferences({ preferredVoice: selectedVoice });
      
      // Navigate to home screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Render voice option
  const renderVoiceOption = (option) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.voiceOption,
        {
          backgroundColor: theme.colors.card,
          borderColor:
            selectedVoice === option.id ? theme.colors.primary : theme.colors.border,
          borderRadius: theme.roundness.m,
        },
      ]}
      onPress={() => handleSelectVoice(option.id)}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              selectedVoice === option.id
                ? theme.colors.primary
                : theme.colors.background,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={option.icon}
          size={24}
          color={selectedVoice === option.id ? '#FFFFFF' : theme.colors.primary}
        />
      </View>
      
      <View style={styles.voiceContent}>
        <Text style={[styles.voiceTitle, { color: theme.colors.text }]}>
          {option.title}
        </Text>
        <Text style={[styles.voiceDescription, { color: theme.colors.subText }]}>
          {option.description}
        </Text>
      </View>
      
      {selectedVoice === option.id && (
        <MaterialCommunityIcons
          name="check-circle"
          size={24}
          color={theme.colors.primary}
          style={styles.checkIcon}
        />
      )}
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Choose Your Coach
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.subText }]}>
            Select the coaching style that resonates with you for your wealth journey
          </Text>
        </View>
        
        {/* Voice Options */}
        <View style={styles.voicesContainer}>
          {voiceOptions.map(renderVoiceOption)}
        </View>
        
        {/* Instructions */}
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: theme.colors.card,
              borderRadius: theme.roundness.m,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color={theme.colors.accent}
            style={styles.infoIcon}
          />
          <Text style={[styles.infoText, { color: theme.colors.subText }]}>
            You can change your coach style anytime in your profile settings.
          </Text>
        </View>
        
        {/* Complete Button */}
        <VaultButton
          title="Complete Setup"
          onPress={handleComplete}
          loading={loading}
          style={styles.completeButton}
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
    padding: 20,
  },
  headerSection: {
    marginTop: 20,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  voicesContainer: {
    marginBottom: 24,
  },
  voiceOption: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 2,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  voiceContent: {
    flex: 1,
  },
  voiceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  voiceDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  checkIcon: {
    alignSelf: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    marginBottom: 32,
  },
  infoIcon: {
    marginRight: 12,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  completeButton: {
    marginBottom: 20,
  },
});