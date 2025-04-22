import * as SecureStore from 'expo-secure-store';
import supabase from './supabase';

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Store session in secure storage
    if (data?.session) {
      await SecureStore.setItemAsync('supabase-session', JSON.stringify(data.session));
    }
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Sign up with email and password
export const signUp = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Store session in secure storage if available (may not be if email confirmation is required)
    if (data?.session) {
      await SecureStore.setItemAsync('supabase-session', JSON.stringify(data.session));
    }
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    // Remove session from secure storage
    await SecureStore.deleteItemAsync('supabase-session');
    
    return { error: null };
  } catch (error) {
    return { error };
  }
};

// Retrieve session from secure storage
export const getStoredSession = async () => {
  try {
    const sessionString = await SecureStore.getItemAsync('supabase-session');
    if (sessionString) {
      return { session: JSON.parse(sessionString), error: null };
    }
    return { session: null, error: null };
  } catch (error) {
    return { session: null, error };
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(userData, { returning: 'minimal' });
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};