import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Import contexts and components
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useVault } from '../../contexts/VaultContext';
import VaultButton from '../../components/VaultButton';
import JournalPrompt from '../../components/JournalPrompt';

// Import utilities and services
import { createJournalEntry } from '../../services/journalService';
import { generateJournalSummary } from '../../services/aiService';
import { getStreakBasedPrompt } from '../../utils/promptHelpers';

// Journal screen component (third step in ritual)
export default function JournalScreen({ navigation }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { ritualStreak, completedRitual } = useVault();
  const [journalPrompt, setJournalPrompt] = useState('');
  const [journalText, setJournalText] = useState('');
  const [moodTag, setMoodTag] = useState('focused');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get a journal prompt based on user's streak
  useEffect(() => {
    setJournalPrompt(getStreakBasedPrompt(ritualStreak));
  }, [ritualStreak]);
  
  // Handle mood selection
  const handleMoodSelect = (mood) => {
    setMoodTag(mood);
  };
  
  // Handle finish ritual button press
  const handleFinishRitual = async () => {
    if (journalText.trim().length < 10) {
      Alert.alert(
        'Journal Entry Too Short',
        'Please write at least a few sentences in your journal entry.'
      );
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate AI summary
      const { summary } = await generateJournalSummary(journalText);
      
      // Create journal entry in database
      const { entry, error } = await createJournalEntry({
        user_id: user.id,
        entry_text: journalText,
        ai_summary: summary || 'No summary available',
        mood_tag: moodTag,
      });
      
      if (error) throw error;
      
      // Update ritual streak
      await completedRitual();
      
      // Navigate back to home screen
      navigation.navigate('Home');
      
      // Show success message
      Alert.alert(
        'Ritual Completed!',
        'Your journal entry has been saved. Great job completing your wealth ritual today!'
      );
    } catch (error) {
      console.error('Error saving journal entry:', error);
      Alert.alert(
        'Error',
        'There was a problem saving your journal entry. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render mood buttons
  const renderMoodButtons = () => {
    const moods = [
      { value: 'inspired', icon: 'lightbulb-on', color: theme.colors.primary },
      { value: 'focused', icon: 'target', color: theme.colors.accent },
      { value: 'grateful', icon: 'heart', color: theme.colors.success },
      { value: 'ambitious', icon: 'rocket', color: theme.colors.secondary },
      { value: 'determined', icon: 'arm-flex', color: theme.colors.warning },
    ];
    
    return moods.map((mood) => (
      <TouchableOpacity
        key={mood.value}
        style={[
          styles.moodButton,
          {
            backgroundColor:
              moodTag === mood.value ? mood.color : theme.colors.card,
            borderColor: mood.color,
            borderRadius: theme.roundness.s,
          },
        ]}
        onPress={() => handleMoodSelect(mood.value)}
      >
        <MaterialCommunityIcons
          name={mood.icon}
          size={20}
          color={moodTag === mood.value ? '#FFFFFF' : mood.color}
        />
        <Text
          style={[
            styles.moodText,
            {
              color: moodTag === mood.value ? '#FFFFFF' : theme.colors.text,
            },
          ]}
        >
          {mood.value.charAt(0).toUpperCase() + mood.value.slice(1)}
        </Text>
      </TouchableOpacity>
    ));
  };
  
  return (
    <KeyboardAwareScrollView 
      style={[styles.scrollView, { backgroundColor: theme.colors.background }]} 
      contentContainerStyle={styles.scrollContent}
      enableOnAndroid
    >
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Daily Journal</Text>
          <Text style={[styles.description, { color: theme.colors.subText }]}>
            Reflect on your wealth journey and capture your thoughts. This completes your
            daily ritual.
          </Text>
        </View>
        
        {/* Journal Prompt */}
        <JournalPrompt prompt={journalPrompt} style={styles.prompt} />
        
        {/* Journal Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Your Thoughts
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border,
                borderRadius: theme.roundness.m,
              },
            ]}
            placeholder="Start writing your journal entry..."
            placeholderTextColor={theme.colors.subText}
            value={journalText}
            onChangeText={setJournalText}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
          />
        </View>
        
        {/* Mood Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            How are you feeling?
          </Text>
          <View style={styles.moodContainer}>{renderMoodButtons()}</View>
        </View>
        
        {/* Finish Button */}
        <VaultButton
          title="Complete Ritual"
          onPress={handleFinishRitual}
          loading={isSubmitting}
          style={styles.finishButton}
          icon={
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#FFFFFF"
              style={{ marginRight: 8 }}
            />
          }
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  prompt: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    minHeight: 200,
    padding: 16,
    borderWidth: 1,
    fontSize: 16,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  moodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  moodText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  finishButton: {
    marginBottom: 20,
  },
});