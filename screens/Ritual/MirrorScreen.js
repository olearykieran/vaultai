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

  // Define styles inside the component to access theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: theme.spacing.m,
    },
    headerSection: {
      marginBottom: theme.spacing.l,
    },
    title: {
      fontSize: theme.typography.fontSizes.xxl,
      fontWeight: 'bold',
      fontFamily: theme.typography.fontFamilies.bold,
      marginBottom: theme.spacing.s,
      color: theme.colors.text,
    },
    description: {
      fontSize: theme.typography.fontSizes.m,
      lineHeight: 24,
      fontFamily: theme.typography.fontFamilies.regular,
      color: theme.colors.subText,
    },
    section: {
      marginBottom: theme.spacing.l,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.s,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSizes.l,
      fontWeight: '600',
      fontFamily: theme.typography.fontFamilies.medium,
      color: theme.colors.text,
    },
    input: {
      minHeight: 100,
      padding: theme.spacing.m,
      borderWidth: 1,
      backgroundColor: theme.colors.card,
      color: theme.colors.text,
      borderColor: theme.colors.border,
      borderRadius: theme.roundness.m,
      fontSize: theme.typography.fontSizes.m,
      fontFamily: theme.typography.fontFamilies.regular,
      textAlignVertical: 'top', // Align placeholder text to top
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
      marginTop: 2, // Adjust vertical alignment if needed
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
      marginTop: theme.spacing.s,
    },
  });

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
      style={styles.scrollView} // Background color now in StyleSheet
      contentContainerStyle={styles.scrollContent}
      enableOnAndroid
    >
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>
            Mirror Exercise
          </Text>
          <Text style={styles.description}>
            Speak your wealth affirmation out loud while looking in a mirror to reinforce your
            wealth identity.
          </Text>
        </View>

        {/* Suggested Affirmation Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
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
          <Text style={styles.sectionTitle}>
            Your Personal Affirmation
          </Text>
          <TextInput
            style={styles.input} // Styles now defined inside with theme access
            placeholder="Write your own affirmation..."
            placeholderTextColor={theme.colors.subText}
            value={personalAffirmation}
            onChangeText={setPersonalAffirmation}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Instructions */}
        <View style={styles.instructionContainer}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color={theme.colors.accent}
            style={styles.infoIcon}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.instructionTitle}>
              How to use this exercise
            </Text>
            <Text style={styles.instructionText}>
              1. Look in a mirror (or use your phone's selfie camera)
            </Text>
            <Text style={styles.instructionText}>
              2. Say your affirmation with conviction 3 times
            </Text>
            <Text style={styles.instructionText}>
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