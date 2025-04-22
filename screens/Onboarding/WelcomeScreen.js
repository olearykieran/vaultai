import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import contexts and components
import { useTheme } from '../../contexts/ThemeContext';
import VaultButton from '../../components/VaultButton';

// Welcome screen component
export default function WelcomeScreen({ navigation }) {
  const { theme } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo and Header */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="treasure-chest"
              size={60}
              color={theme.colors.primary}
            />
          </View>
          <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to Vault</Text>
          <Text style={[styles.subtitle, { color: theme.colors.subText }]}>
            Your daily ritual for wealth identity transformation
          </Text>
        </View>
        
        {/* Feature Highlights */}
        <View style={styles.featuresSection}>
          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: theme.colors.card,
                borderRadius: theme.roundness.m,
              },
            ]}
          >
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons
                name="meditation"
                size={32}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
                Daily Wealth Ritual
              </Text>
              <Text style={[styles.featureText, { color: theme.colors.subText }]}>
                A 3-step practice to reinforce your wealth identity every day
              </Text>
            </View>
          </View>
          
          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: theme.colors.card,
                borderRadius: theme.roundness.m,
              },
            ]}
          >
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons
                name="message-text"
                size={32}
                color={theme.colors.secondary}
              />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
                AI Wealth Coach
              </Text>
              <Text style={[styles.featureText, { color: theme.colors.subText }]}>
                Get guidance and answers to your wealth-building questions
              </Text>
            </View>
          </View>
          
          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: theme.colors.card,
                borderRadius: theme.roundness.m,
              },
            ]}
          >
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons
                name="notebook"
                size={32}
                color={theme.colors.accent}
              />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
                Journal Your Progress
              </Text>
              <Text style={[styles.featureText, { color: theme.colors.subText }]}>
                Track your thoughts and insights on your wealth journey
              </Text>
            </View>
          </View>
        </View>
        
        {/* Get Started Button */}
        <VaultButton
          title="Get Started"
          onPress={() => navigation.navigate('SetupProfile')}
          style={styles.getStartedButton}
          icon={
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          }
        />
        
        {/* Sign In Link */}
        <TouchableOpacity
          style={styles.signInLink}
          onPress={() => navigation.navigate('SetupProfile', { isSignIn: true })}
        >
          <Text style={[styles.signInText, { color: theme.colors.primary }]}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginHorizontal: 20,
  },
  featuresSection: {
    marginBottom: 40,
  },
  featureCard: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
  },
  getStartedButton: {
    marginBottom: 16,
  },
  signInLink: {
    alignItems: 'center',
    padding: 12,
  },
  signInText: {
    fontSize: 16,
    fontWeight: '500',
  },
});