import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import contexts and components
import { useTheme } from '../../contexts/ThemeContext';
import VaultButton from '../../components/VaultButton';
import AffirmationCard from '../../components/AffirmationCard';

// Import utilities and constants
import { getRandomAffirmation } from '../../constants/affirmations';

// Mirror screen component (first step in ritual)
export default function MirrorScreen({ navigation }) {
  const { theme } = useTheme();
  const [affirmation, setAffirmation] = useState(getRandomAffirmation());
  const [personalAffirmation, setPersonalAffirmation] = useState('');
  const [favoriteAffirmation, setFavoriteAffirmation] = useState(false);
  
  // Toggle favorite affirmation
  const toggleFavorite = () => {
    setFavoriteAffirmation(!favoriteAffirmation);
    // In a real app, save this to the database
  };
  
  // Handle next button press to proceed to visualization
  const handleNextPress = () => {
    // In a real app, save the personal affirmation to the database
    navigation.navigate('Visualization');
  };
  
  // Get a new suggested affirmation
  const getNewAffirmation = () => {
    setAffirmation(getRandomAffirmation());
    setFavoriteAffirmation(false);
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
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Mirror Exercise
          </Text>
          <Text style={[styles.description, { color: theme.colors.subText }]}>
            Speak your wealth affirmation out loud while looking in a mirror to reinforce your
            wealth identity.
          </Text>
        </View>
        
        {/* Suggested Affirmation Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Suggested Affirmation
            </Text>
            <VaultButton
              title="New"
              onPress={getNewAffirmation}
              variant="outline"
              size="small"
            />
          </View>
          
          <AffirmationCard
            affirmation={affirmation}
            onFavorite={toggleFavorite}
            isFavorite={favoriteAffirmation}
          />
        </View>
        
        {/* Personal Affirmation Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Your Personal Affirmation
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
            placeholder="Write your own affirmation..."
            placeholderTextColor={theme.colors.subText}
            value={personalAffirmation}
            onChangeText={setPersonalAffirmation}
            multiline
            numberOfLines={4}
          />
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
              How to use this exercise
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.subText }]}>
              1. Look in a mirror (or use your phone's selfie camera)
              )
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.subText }]}>
              2. Say your affirmation with conviction 3 times
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.subText }]}>
              3. Focus on believing the words as you speak them
            </Text>
          </View>
        </View>
        
        {/* Next Button */}
        <VaultButton
          title="Continue to Visualization"
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
    marginBottom: 24,
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    minHeight: 100,
    padding: 12,
    borderWidth: 1,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  instructionContainer: {
    padding: 16,
    marginBottom: 32,
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
    marginBottom: 20,
  },
});