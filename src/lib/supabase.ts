import { createClient } from '@supabase/supabase-js';

// These should be in environment variables, but for quick setup:
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Only create client if we have real credentials
export const supabase = (supabaseUrl.includes('placeholder') || supabaseAnonKey === 'placeholder-key') 
  ? null as any // Will show error message in UI
  : createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface RaffleEntry {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  entered_at: string;
  created_at: string;
}