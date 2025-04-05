
import { useState, useEffect } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useSettings } from '@/contexts/SettingsContext';

// Create a single supabase client for the entire app
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tjqzfrogyqbhspuwmarp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function useSupabase() {
  return supabase;
}

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabase();
  
  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) {
            throw error;
          }
          
          setProfile(data);
        }
      } catch (error: any) {
        setError(error);
        console.error('Error fetching profile:', error.message);
      } finally {
        setLoading(false);
      }
    }
    
    getProfile();
  }, [supabase]);
  
  return { profile, loading, error };
}

export function useSkills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { language } = useSettings();
  const supabase = useSupabase();
  
  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('order');
          
        if (error) {
          throw error;
        }
        
        setSkills(data || []);
      } catch (error: any) {
        setError(error);
        console.error('Error fetching skills:', error.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSkills();
  }, [supabase, language]);
  
  return { skills, loading, error };
}
