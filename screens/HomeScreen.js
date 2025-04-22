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

  // Define styles inside the component to access theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: theme.spacing.m,
    },
    header: {
      marginTop: theme.spacing.l,
      marginBottom: theme.spacing.l,
    },
    greeting: {
      fontSize: theme.typography.fontSizes.xxxl,
      fontWeight: 'bold',
      fontFamily: theme.typography.fontFamilies.bold,
      color: theme.colors.text,
    },
    subGreeting: {
      fontSize: theme.typography.fontSizes.m,
      marginTop: theme.spacing.xs,
      fontFamily: theme.typography.fontFamilies.regular,
      color: theme.colors.subText,
    },
    streakCard: {
      padding: theme.spacing.m,
      marginBottom: theme.spacing.l,
      backgroundColor: theme.colors.card,
      borderRadius: theme.roundness.m,
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
      marginBottom: theme.spacing.s,
    },
    streakTitle: {
      fontSize: theme.typography.fontSizes.l,
      fontWeight: '600',
      fontFamily: theme.typography.fontFamilies.medium,
      color: theme.colors.text,
    },
    streakCountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    fireIcon: {
      marginRight: theme.spacing.xs,
    },
    streakCount: {
      fontSize: theme.typography.fontSizes.xxl,
      fontWeight: 'bold',
      fontFamily: theme.typography.fontFamilies.bold,
      color: theme.colors.text,
    },
    streakBottom: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    streakSubtext: {
      fontSize: theme.typography.fontSizes.s,
      fontFamily: theme.typography.fontFamilies.regular,
      color: theme.colors.subText,
    },
    ritualButton: {
      marginBottom: theme.spacing.l,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: '600',
      fontFamily: theme.typography.fontFamilies.medium,
      marginBottom: theme.spacing.s,
      color: theme.colors.text,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.l,
    },
    actionButton: {
      width: '48%',
      padding: theme.spacing.m,
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: theme.roundness.m,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    actionText: {
      fontSize: theme.typography.fontSizes.m,
      marginTop: theme.spacing.s,
      fontFamily: theme.typography.fontFamilies.regular,
      color: theme.colors.text,
    },
  });

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Welcome to Vault
          </Text>
          <Text style={styles.subGreeting}>
            Your wealth identity ritual
          </Text>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakTop}>
            <Text style={styles.streakTitle}>
              Ritual Streak
            </Text>
            <View style={styles.streakCountContainer}>
              <MaterialCommunityIcons
                name="fire"
                size={28}
                color={theme.colors.warning}
                style={styles.fireIcon}
              />
              <Text style={styles.streakCount}>
                {ritualStreak}
              </Text>
            </View>
          </View>

          <View style={styles.streakBottom}>
            <Text style={styles.streakSubtext}>
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
            <Text style={styles.sectionTitle}>
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
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Chat')}
          >
            <MaterialCommunityIcons
              name="message-text"
              size={28}
              color={theme.colors.primary}
            />
            <Text style={styles.actionText}>
              Talk to AI Coach
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Vault')}
          >
            <MaterialCommunityIcons
              name="treasure-chest"
              size={28}
              color={theme.colors.accent}
            />
            <Text style={styles.actionText}>
              View Your Vault
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}