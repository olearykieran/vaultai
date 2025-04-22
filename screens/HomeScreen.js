import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import contexts and components
import { useTheme } from '../contexts/ThemeContext';
import { useVault } from '../contexts/VaultContext';
import VaultButton from '../components/VaultButton';
import AffirmationCard from '../components/AffirmationCard';

// Import utilities and constants
import { getTodaysAffirmation } from '../constants/affirmations';

// Home screen component
export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const { ritualStreak, lastCompletedDate } = useVault();
  const [todaysAffirmation, setTodaysAffirmation] = useState(null);
  const [favoriteAffirmation, setFavoriteAffirmation] = useState(false);
  
  // Get today's date for comparison
  const today = new Date().toISOString().split('T')[0];
  
  // Check if a ritual has been completed today
  const ritualCompletedToday = lastCompletedDate === today;
  
  // Load today's affirmation
  useEffect(() => {
    setTodaysAffirmation(getTodaysAffirmation());
  }, []);
  
  // Handle start ritual button press
  const handleStartRitual = () => {
    navigation.navigate('Ritual');
  };
  
  // Toggle favorite affirmation
  const toggleFavorite = () => {
    setFavoriteAffirmation(!favoriteAffirmation);
    // In a real app, save this to the database
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.colors.text }]}>
            Welcome to Vault
          </Text>
          <Text style={[styles.subGreeting, { color: theme.colors.subText }]}>
            Your wealth identity ritual
          </Text>
        </View>
        
        {/* Streak Card */}
        <View
          style={[
            styles.streakCard,
            {
              backgroundColor: theme.colors.card,
              borderRadius: theme.roundness.m,
            },
          ]}
        >
          <View style={styles.streakTop}>
            <Text style={[styles.streakTitle, { color: theme.colors.text }]}>
              Ritual Streak
            </Text>
            <View style={styles.streakCountContainer}>
              <MaterialCommunityIcons
                name="fire"
                size={28}
                color={theme.colors.warning}
                style={styles.fireIcon}
              />
              <Text style={[styles.streakCount, { color: theme.colors.text }]}>
                {ritualStreak}
              </Text>
            </View>
          </View>
          
          <View style={styles.streakBottom}>
            <Text style={[styles.streakSubtext, { color: theme.colors.subText }]}>
              {ritualCompletedToday
                ? 'You completed your ritual today! 🎉'
                : 'Start your ritual to continue your streak'}
            </Text>
          </View>
        </View>
        
        {/* Start Ritual Button */}
        <VaultButton
          title={ritualCompletedToday ? "Today's Ritual Completed" : "Start Today's Ritual"}
          onPress={handleStartRitual}
          variant={ritualCompletedToday ? 'success' : 'primary'}
          disabled={ritualCompletedToday}
          style={styles.ritualButton}
          icon={
            <MaterialCommunityIcons
              name={ritualCompletedToday ? 'check-circle' : 'meditation'}
              size={24}
              color="#FFFFFF"
              style={{ marginRight: 8 }}
            />
          }
        />
        
        {/* Today's Affirmation Card */}
        {todaysAffirmation && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Today's Affirmation
            </Text>
            <AffirmationCard
              affirmation={todaysAffirmation}
              onFavorite={toggleFavorite}
              isFavorite={favoriteAffirmation}
            />
          </>
        )}
        
        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Quick Actions
        </Text>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.card, borderRadius: theme.roundness.m },
            ]}
            onPress={() => navigation.navigate('Chat')}
          >
            <MaterialCommunityIcons
              name="message-text"
              size={28}
              color={theme.colors.primary}
            />
            <Text style={[styles.actionText, { color: theme.colors.text }]}>
              Talk to AI Coach
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.card, borderRadius: theme.roundness.m },
            ]}
            onPress={() => navigation.navigate('Vault')}
          >
            <MaterialCommunityIcons
              name="treasure-chest"
              size={28}
              color={theme.colors.accent}
            />
            <Text style={[styles.actionText, { color: theme.colors.text }]}>
              View Your Vault
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 16,
    marginTop: 4,
  },
  streakCard: {
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  streakTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  streakCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireIcon: {
    marginRight: 4,
  },
  streakCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  streakBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakSubtext: {
    fontSize: 14,
  },
  ritualButton: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});