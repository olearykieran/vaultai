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
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.roundness.m,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="fire" size={24} color={theme.colors.warning} />
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Ritual Streak</Text>
      </View>
      
      <View style={styles.streakContent}>
        <Text style={[styles.streakNumber, { color: theme.colors.primary }]}>
          {ritualStreak}
        </Text>
        <Text style={[styles.streakLabel, { color: theme.colors.subText }]}>
          {ritualStreak === 1 ? 'day' : 'days'}
        </Text>
      </View>
      
      <Text style={[styles.streakMessage, { color: theme.colors.subText }]}>
        {getStreakMessage(ritualStreak)}
      </Text>
    </View>
  );
  
  // Render affirmation card
  const renderAffirmationCard = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Daily Affirmation
      </Text>
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
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Recent Journal Insights
      </Text>
      
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
      ) : journalSummaries.length > 0 ? (
        journalSummaries.map((summary, index) => (
          <View
            key={index}
            style={[
              styles.summaryCard,
              {
                backgroundColor: theme.colors.card,
                borderRadius: theme.roundness.m,
                borderLeftColor: getMoodColor(summary.mood_tag, theme),
              },
            ]}
          >
            <View style={styles.summaryHeader}>
              <Text style={[styles.summaryDate, { color: theme.colors.subText }]}>
                {formatRelativeDate(summary.entry_date)}
              </Text>
              <View style={styles.moodTag}>
                <MaterialCommunityIcons
                  name={getMoodIcon(summary.mood_tag)}
                  size={16}
                  color={getMoodColor(summary.mood_tag, theme)}
                />
                <Text
                  style={[
                    styles.moodText,
                    { color: getMoodColor(summary.mood_tag, theme) },
                  ]}
                >
                  {summary.mood_tag || 'neutral'}
                </Text>
              </View>
            </View>
            
            <Text style={[styles.summaryText, { color: theme.colors.text }]}>
              {summary.ai_summary || 'No summary available.'}
            </Text>
          </View>
        ))
      ) : (
        <View
          style={[
            styles.emptyState,
            {
              backgroundColor: theme.colors.card,
              borderRadius: theme.roundness.m,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="notebook-outline"
            size={40}
            color={theme.colors.subText}
          />
          <Text style={[styles.emptyStateText, { color: theme.colors.subText }]}>
            No journal entries yet. Complete your daily ritual to start building your vault.
          </Text>
        </View>
      )}
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Your Vault</Text>
          <Text style={[styles.subtitle, { color: theme.colors.subText }]}>
            Track your wealth journey progress
          </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  card: {
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  streakLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  streakMessage: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryCard: {
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  moodTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginLeft: 4,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  loader: {
    marginVertical: 20,
  },
});