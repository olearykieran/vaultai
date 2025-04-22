import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Import contexts and components
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import VaultButton from '../../components/VaultButton';

// Setup profile screen component
export default function SetupProfileScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { signIn, signUp } = useAuth();
  const isSignIn = route.params?.isSignIn || false;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Handle authentication
  const handleAuth = async () => {
    // Validate inputs
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    
    if (!isSignIn && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    
    setLoading(true);
    
    try {
      if (isSignIn) {
        // Sign in
        const { error } = await signIn(email, password);
        
        if (error) throw error;
      } else {
        // Sign up
        const { error } = await signUp(email, password);
        
        if (error) {
          // Check for duplicate email error
          if (
            error.code === '23505' ||
            (typeof error.message === 'string' && error.message.toLowerCase().includes('already registered'))
          ) {
            Alert.alert(
              'Email Already Registered',
              'That email is already registered. Please sign in or use a different email.'
            );
            return;
          }
          throw error;
        }
        // Navigate to next onboarding step
        navigation.navigate('ChooseVoice');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Authentication Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  // Toggle between sign in and sign up
  const toggleAuthMode = () => {
    navigation.setParams({ isSignIn: !isSignIn });
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent} enableOnAndroid>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {isSignIn ? 'Welcome Back' : 'Create Your Account'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.subText }]}>
              {isSignIn
                ? 'Sign in to continue your wealth journey'
                : 'Set up your profile to begin your wealth transformation'}
            </Text>
          </View>
          
          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Email</Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                    borderRadius: theme.roundness.m,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={theme.colors.subText}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Enter your email"
                  placeholderTextColor={theme.colors.subText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
            
            {/* Name Input (Sign Up Only) */}
            {!isSignIn && (
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                  Full Name
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      backgroundColor: theme.colors.card,
                      borderColor: theme.colors.border,
                      borderRadius: theme.roundness.m,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={20}
                    color={theme.colors.subText}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter your name"
                    placeholderTextColor={theme.colors.subText}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
            )}
            
            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                Password
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                    borderRadius: theme.roundness.m,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color={theme.colors.subText}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.colors.subText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={theme.colors.subText}
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Confirm Password Input (Sign Up Only) */}
            {!isSignIn && (
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                  Confirm Password
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      backgroundColor: theme.colors.card,
                      borderColor: theme.colors.border,
                      borderRadius: theme.roundness.m,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={theme.colors.subText}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Confirm your password"
                    placeholderTextColor={theme.colors.subText}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                  />
                </View>
              </View>
            )}
          </View>
          
          {/* Action Buttons */}
          <VaultButton
            title={isSignIn ? 'Sign In' : 'Create Account'}
            onPress={handleAuth}
            loading={loading}
            style={styles.actionButton}
          />
          
          {/* Toggle Auth Mode */}
          <TouchableOpacity style={styles.toggleLink} onPress={toggleAuthMode}>
            <Text style={[styles.toggleText, { color: theme.colors.primary }]}>
              {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    paddingRight: 12,
  },
  eyeIcon: {
    padding: 12,
  },
  actionButton: {
    marginBottom: 16,
  },
  toggleLink: {
    alignItems: 'center',
    padding: 12,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
  },
});