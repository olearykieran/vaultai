import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import contexts and components
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useVault } from '../contexts/VaultContext';
import AffirmationCard from '../components/AffirmationCard';

// Import utilities and services
import { getWeeklySummary } from '../services/journalService';
import { formatRelativeDate } from '../utils/formatDate';
import { getTodaysAffirmation } from '../constants/affirmations';

// Vault screen component
export default function VaultScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { ritualStreak } = useVault();
  const [journalSummaries, setJournalSummaries] = useState([]);
  const [favoriteAffirmation, setFavoriteAffirmation] = useState(false);
  const [loading, setLoading] = useState(true);

  // Define styles inside the component to access theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background, // Apply background here
    },
    scrollContent: {
      padding: theme.spacing.m, // Use theme spacing
    },
    header: {
      marginBottom: theme.spacing.l, // Use theme spacing
    },
    title: {
      fontSize: theme.typography.fontSizes.xl, // Use theme font size
      fontFamily: theme.typography.fontFamilies.bold, // Apply font
      color: theme.colors.text, // Use theme color
      marginBottom: theme.spacing.xs, // Use theme spacing
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.m, // Use theme font size
      fontFamily: theme.typography.fontFamilies.regular, // Apply font
      color: theme.colors.subText, // Use theme color
    },
    card: {
      padding: theme.spacing.m, // Use theme spacing
      marginBottom: theme.spacing.l, // Use theme spacing
      backgroundColor: theme.colors.card, // Use theme color
      borderRadius: theme.roundness.m, // Use theme roundness
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.m, // Use theme spacing
    },
    cardTitle: {
      fontSize: theme.typography.fontSizes.l, // Use theme font size
      fontFamily: theme.typography.fontFamilies.medium, // Apply font
      color: theme.colors.text, // Use theme color
      marginLeft: theme.spacing.s, // Use theme spacing
    },
    streakContent: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
      marginBottom: theme.spacing.s, // Use theme spacing
    },
    streakNumber: {
      fontSize: theme.typography.fontSizes.xxl, // Use theme font size
      fontFamily: theme.typography.fontFamilies.bold, // Apply font
      color: theme.colors.primary, // Use theme color
      marginRight: theme.spacing.xs, // Use theme spacing
    },
    streakLabel: {
      fontSize: theme.typography.fontSizes.m, // Use theme font size
      fontFamily: theme.typography.fontFamilies.regular, // Apply font
      color: theme.colors.subText, // Use theme color
    },
    streakMessage: {
      fontSize: theme.typography.fontSizes.s, // Use theme font size
      fontFamily: theme.typography.fontFamilies.regular, // Apply font
      color: theme.colors.subText, // Use theme color
      textAlign: 'center',
    },
    section: {
      marginBottom: theme.spacing.l, // Use theme spacing
    },
    sectionTitle: {
      fontSize: theme.typography.fontSizes.l, // Use theme font size
      fontFamily: theme.typography.fontFamilies.medium, // Apply font
      color: theme.colors.text, // Use theme color
      marginBottom: theme.spacing.m, // Use theme spacing
    },
    loader: {
      marginTop: theme.spacing.xl, // Use theme spacing
    },
    summaryCard: {
      padding: theme.spacing.m, // Use theme spacing
      marginBottom: theme.spacing.m, // Use theme spacing
      backgroundColor: theme.colors.card, // Use theme color
      borderRadius: theme.roundness.m, // Use theme roundness
      borderLeftWidth: 4,
    },
    summaryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.s, // Use theme spacing
    },
    summaryDate: {
      fontSize: theme.typography.fontSizes.xs, // Use theme font size
      fontFamily: theme.typography.fontFamilies.regular, // Apply font
      color: theme.colors.subText, // Use theme color
    },
    moodTag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background, // Use theme color for contrast
      paddingVertical: theme.spacing.xxs, // Use theme spacing
      paddingHorizontal: theme.spacing.xs, // Use theme spacing
      borderRadius: theme.roundness.s, // Use theme roundness
    },
    moodText: {
      marginLeft: theme.spacing.xxs, // Use theme spacing
      fontSize: theme.typography.fontSizes.xs, // Use theme font size
      fontFamily: theme.typography.fontFamilies.medium, // Apply font
      textTransform: 'capitalize',
    },
    summaryText: {
      fontSize: theme.typography.fontSizes.s, // Use theme font size
      fontFamily: theme.typography.fontFamilies.regular, // Apply font
      color: theme.colors.text, // Use theme color
      lineHeight: theme.typography.lineHeights.s, // Use theme line height
    },
    emptyState: {
      padding: theme.spacing.l, // Use theme spacing
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.card, // Use theme color
      borderRadius: theme.roundness.m, // Use theme roundness
      minHeight: 150,
    },
    emptyStateText: {
      fontSize: theme.typography.fontSizes.s, // Use theme font size
      fontFamily: theme.typography.fontFamilies.regular, // Apply font
      color: theme.colors.subText, // Use theme color
      textAlign: 'center',
      marginTop: theme.spacing.m, // Use theme spacing
    },
  });

  // Load journal summaries when component mounts
  useEffect(() => {
    const loadJournalData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { summaries, error } = await getWeeklySummary(user.id);

        if (error) throw error;

        setJournalSummaries(summaries || []);
      } catch (error) {
        console.error('Error loading journal summaries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJournalData();
  }, [user]);

  // Toggle favorite affirmation
  const toggleFavorite = () => {
    setFavoriteAffirmation(!favoriteAffirmation);
    // In a real app, save this to the database
  };

  // Render streak card
  const renderStreakCard = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="fire" size={24} color={theme.colors.warning} />
        <Text style={styles.cardTitle}>Ritual Streak</Text>
      </View>

      <View style={styles.streakContent}>
        <Text style={styles.streakNumber}>{ritualStreak}</Text>
        <Text style={styles.streakLabel}>{ritualStreak === 1 ? 'day' : 'days'}</Text>
      </View>

      <Text style={styles.streakMessage}>{getStreakMessage(ritualStreak)}</Text>
    </View>
  );

  // Render affirmation card
  const renderAffirmationCard = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Daily Affirmation</Text>
      <AffirmationCard
        affirmation={getTodaysAffirmation()}
        onFavorite={toggleFavorite}
        isFavorite={favoriteAffirmation}
      />
    </View>
  );

  // Render journal summaries
  const renderJournalSummaries = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Journal Insights</Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
      ) : journalSummaries.length > 0 ? (
        journalSummaries.map((summary, index) => (
          <View
            key={index}
            style={[
              styles.summaryCard,
              {
                borderLeftColor: getMoodColor(summary.mood_tag, theme),
              },
            ]}
          >
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryDate}>{formatRelativeDate(summary.entry_date)}</Text>
              <View style={styles.moodTag}>
                <MaterialCommunityIcons
                  name={getMoodIcon(summary.mood_tag)}
                  size={16}
                  color={getMoodColor(summary.mood_tag, theme)}
                />
                <Text style={styles.moodText}>{summary.mood_tag || 'neutral'}</Text>
              </View>
            </View>

            <Text style={styles.summaryText}>{summary.ai_summary || 'No summary available.'}</Text>
          </View>
        ))
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="notebook-outline"
            size={40}
            color={theme.colors.subText}
          />
          <Text style={styles.emptyStateText}>
            No journal entries yet. Complete your daily ritual to start building your vault.
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Vault</Text>
          <Text style={styles.subtitle}>Track your wealth journey progress</Text>
        </View>

        {renderStreakCard()}
        {renderAffirmationCard()}
        {renderJournalSummaries()}
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to get streak message
const getStreakMessage = (streak) => {
  if (streak === 0) {
    return 'Start your first ritual today!';
  } else if (streak < 3) {
    return "You're building momentum!";
  } else if (streak < 7) {
    return 'A solid habit is forming!';
  } else if (streak < 14) {
    return "You're really committed!";
  } else if (streak < 30) {
    return 'Incredibly consistent!';
  } else {
    return 'Wealth identity master!';
  }
};

// Helper function to get mood icon
const getMoodIcon = (mood) => {
  switch (mood) {
    case 'inspired':
      return 'lightbulb-on';
    case 'focused':
      return 'target';
    case 'grateful':
      return 'heart';
    case 'ambitious':
      return 'rocket';
    case 'determined':
      return 'arm-flex';
    default:
      return 'emoticon-neutral';
  }
};

// Helper function to get mood color
const getMoodColor = (mood, theme) => {
  switch (mood) {
    case 'inspired':
      return theme.colors.primary;
    case 'focused':
      return theme.colors.accent;
    case 'grateful':
      return theme.colors.success;
    case 'ambitious':
      return theme.colors.secondary;
    case 'determined':
      return theme.colors.warning;
    default:
      return theme.colors.subText;
  }
};