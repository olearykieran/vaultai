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
  const { theme } = useTheme(); // Theme is available here
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
          styles.moodButton, // Base style
          {
            backgroundColor:
              moodTag === mood.value ? mood.color : theme.colors.card,
            borderColor: mood.color,
            borderRadius: theme.roundness.s, // Use theme value
            paddingVertical: theme.spacing.xs, // Use theme value
            paddingHorizontal: theme.spacing.s, // Use theme value
            marginRight: theme.spacing.s, // Use theme value
            marginBottom: theme.spacing.s, // Use theme value
          },
        ]}
        onPress={() => handleMoodSelect(mood.value)}
      >
        <MaterialCommunityIcons
          name={mood.icon}
          size={20}
          // Use background (dark) icon color for active 'inspired', otherwise white for active, mood color for inactive.
          color={moodTag === mood.value ? (mood.value === 'inspired' ? theme.colors.background : '#FFFFFF') : mood.color}
        />
        <Text
          style={[
            styles.moodText, // Base style with font family
            {
              // Conditional color logic from previous fix
              color: moodTag === mood.value
                       ? (mood.value === 'inspired' ? theme.colors.background : '#FFFFFF') // Use background (dark) text for active 'inspired'
                       : mood.color, // Use mood color for inactive
              marginLeft: theme.spacing.xs, // Use theme value
              fontSize: theme.typography.fontSizes.s, // Use theme value
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
      style={[styles.scrollView, { backgroundColor: theme.colors.background }]} // Apply background color inline
      contentContainerStyle={[styles.scrollContent, { padding: theme.spacing.m }]} // Apply padding inline
      enableOnAndroid
    >
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <View style={[styles.headerSection, { marginBottom: theme.spacing.l }]}>
          <Text style={[
            styles.title, // Base style with font family
            {
              color: theme.colors.text,
              marginBottom: theme.spacing.s,
              fontSize: theme.typography.fontSizes.xl, // Apply font size inline
            }
          ]}>
            Daily Journal
          </Text>
          <Text style={[
            styles.description, // Base style with font family
            {
              color: theme.colors.subText,
              lineHeight: theme.typography.lineHeights.m, // Apply line height inline
              fontSize: theme.typography.fontSizes.m, // Apply font size inline
            }
          ]}>
            Reflect on your wealth journey and capture your thoughts. This completes your
            daily ritual.
          </Text>
        </View>

        {/* Journal Prompt */}
        <JournalPrompt
          prompt={journalPrompt}
          style={[styles.prompt, { marginBottom: theme.spacing.l }]} // Apply margin inline
        />

        {/* Journal Input */}
        <View style={[styles.section, { marginBottom: theme.spacing.l }]}>
          <Text style={[
            styles.sectionTitle, // Base style with font family
            {
              color: theme.colors.text,
              marginBottom: theme.spacing.m,
              fontSize: theme.typography.fontSizes.l, // Apply font size inline
            }
          ]}>
            Your Thoughts
          </Text>
          <TextInput
            style={[
              styles.input, // Base style with font family, minHeight, etc.
              {
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border,
                borderRadius: theme.roundness.m,
                padding: theme.spacing.m, // Apply padding inline
                fontSize: theme.typography.fontSizes.m, // Apply font size inline
              },
            ]}
            placeholder="Start writing your journal entry..."
            placeholderTextColor={theme.colors.subText}
            value={journalText}
            onChangeText={setJournalText}
            multiline
            // numberOfLines={10} // minHeight controls this
            textAlignVertical="top"
          />
        </View>

        {/* Mood Selection */}
        <View style={[styles.section, { marginBottom: theme.spacing.l }]}>
          <Text style={[
            styles.sectionTitle, // Base style with font family
            {
              color: theme.colors.text,
              marginBottom: theme.spacing.m,
              fontSize: theme.typography.fontSizes.l, // Apply font size inline
            }
          ]}>
            How are you feeling?
          </Text>
          <View style={styles.moodContainer}>{renderMoodButtons()}</View>
        </View>

        {/* Finish Button */}
        <VaultButton
          title="Complete Ritual"
          onPress={handleFinishRitual}
          loading={isSubmitting}
          style={[styles.finishButton, { marginTop: theme.spacing.m }]} // Apply margin inline
          icon={
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#FFFFFF"
              style={{ marginRight: theme.spacing.s }} // Use theme spacing
            />
          }
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

// Stylesheet moved outside the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1, // Keep flexGrow
  },
  headerSection: {
    // Basic structure
  },
  title: {
    fontFamily: 'Satoshi-Bold', // Use direct font name
  },
  description: {
    fontFamily: 'Satoshi-Regular', // Use direct font name
  },
  prompt: {
    // Basic structure
  },
  section: {
    // Basic structure
  },
  sectionTitle: {
    fontFamily: 'Satoshi-Medium', // Use direct font name
  },
  input: {
    minHeight: 200,
    borderWidth: 1,
    fontFamily: 'Satoshi-Regular', // Use direct font name
    textAlignVertical: 'top',
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  moodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  moodText: {
    fontFamily: 'Satoshi-Medium', // Use direct font name
  },
  finishButton: {
    // Basic structure
  },
});