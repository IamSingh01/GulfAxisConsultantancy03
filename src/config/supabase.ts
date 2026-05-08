// Supabase Configuration Template
// Replace with your actual Supabase project credentials

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Helper functions for common operations
export const getDestinations = async () => {
  const { data, error } = await supabase
    .from('destinations')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getExperiences = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getHotels = async () => {
  const { data, error } = await supabase
    .from('hotels')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const submitContactForm = async (formData: {
  name: string;
  email: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([formData]);
  
  if (error) throw error;
  return data;
};

export default supabase;
