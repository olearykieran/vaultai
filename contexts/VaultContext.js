import React, { createContext, useState, useEffect, useContext } from 'react';
import supabase from '../services/supabase';
import { useAuth } from './AuthContext';

// Create the vault context
export const VaultContext = createContext({
  ritualStreak: 0,
  lastCompletedDate: null,
  preferences: {},
  completedRitual: () => {},
  updatePreferences: () => {},
  loading: true,
});

// Custom hook to use the vault context
export const useVault = () => {
  return useContext(VaultContext);
};

// Vault provider component
export const VaultProvider = ({ children }) => {
  const { user } = useAuth();
  const [ritualStreak, setRitualStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);

  // Load user data when the user changes
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setRitualStreak(0);
        setLastCompletedDate(null);
        setPreferences({});
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch user metadata from profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('ritual_streak, last_completed_date, preferences')
          .eq('id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          // PGRST116 is the error for no rows returned
          console.error('Error fetching user data:', error);
          throw error;
        }
        
        if (data) {
          setRitualStreak(data.ritual_streak || 0);
          setLastCompletedDate(data.last_completed_date);
          setPreferences(data.preferences || {});
        } else {
          // Upsert the profile if one doesn't exist (prevents duplicate key errors)
          const { error: upsertError } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              ritual_streak: 0,
              preferences: {},
            }, {
              onConflict: 'id' // Specify the conflict target
            });
          
          if (upsertError) {
            console.error('Error upserting user profile:', upsertError);
            throw upsertError;
          }
          // Set initial state after successful upsert
          setRitualStreak(0);
          setLastCompletedDate(null);
          setPreferences({});
        }
      } catch (error) {
        console.error('Error in loadUserData:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [user]);

  // Update user data when ritual is completed
  const completedRitual = async () => {
    if (!user) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Don't increment streak if already completed today
      if (lastCompletedDate === today) {
        return;
      }
      
      // Check if streak should continue or reset
      let newStreak = ritualStreak;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastCompletedDate === yesterdayStr) {
        // Continue streak
        newStreak += 1;
      } else if (lastCompletedDate !== today) {
        // Reset streak if not yesterday and not today
        newStreak = 1;
      }
      
      // Update the database
      const { error } = await supabase
        .from('profiles')
        .update({
          ritual_streak: newStreak,
          last_completed_date: today,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setRitualStreak(newStreak);
      setLastCompletedDate(today);
      
      return newStreak;
    } catch (error) {
      console.error('Error updating ritual streak:', error);
      return null;
    }
  };

  // Update user preferences
  const updatePreferences = async (newPreferences) => {
    if (!user) return;
    
    try {
      // Merge with existing preferences
      const updatedPreferences = { ...preferences, ...newPreferences };
      
      // Update the database
      const { error } = await supabase
        .from('profiles')
        .update({
          preferences: updatedPreferences,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setPreferences(updatedPreferences);
      
      return updatedPreferences;
    } catch (error) {
      console.error('Error updating preferences:', error);
      return null;
    }
  };

  // Context value
  const value = {
    ritualStreak,
    lastCompletedDate,
    preferences,
    completedRitual,
    updatePreferences,
    loading,
  };

  // Render the provider
  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
};