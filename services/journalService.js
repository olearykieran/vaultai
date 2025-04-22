import supabase from './supabase';

// Fetch journal entries for a user
export const fetchJournalEntries = async (userId, limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('entry_date', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return { entries: data, error: null };
  } catch (error) {
    return { entries: [], error };
  }
};

// Create a new journal entry
export const createJournalEntry = async (entryData) => {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert(entryData)
      .select()
      .single();
    
    if (error) throw error;
    
    return { entry: data, error: null };
  } catch (error) {
    return { entry: null, error };
  }
};

// Update an existing journal entry
export const updateJournalEntry = async (entryId, updates) => {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .update(updates)
      .eq('id', entryId)
      .select()
      .single();
    
    if (error) throw error;
    
    return { entry: data, error: null };
  } catch (error) {
    return { entry: null, error };
  }
};

// Delete a journal entry
export const deleteJournalEntry = async (entryId) => {
  try {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', entryId);
    
    if (error) throw error;
    
    return { error: null };
  } catch (error) {
    return { error };
  }
};

// Get journal entries summary for the past week
export const getWeeklySummary = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('entry_date, ai_summary, mood_tag')
      .eq('user_id', userId)
      .order('entry_date', { ascending: false })
      .limit(7);
    
    if (error) throw error;
    
    return { summaries: data, error: null };
  } catch (error) {
    return { summaries: [], error };
  }
};