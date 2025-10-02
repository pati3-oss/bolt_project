import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          name: string;
          streak: number;
          total_check_ins: number;
          level: number;
          experience: number;
          badges: string[];
          last_check_in: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          streak?: number;
          total_check_ins?: number;
          level?: number;
          experience?: number;
          badges?: string[];
          last_check_in?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          streak?: number;
          total_check_ins?: number;
          level?: number;
          experience?: number;
          badges?: string[];
          last_check_in?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      check_ins: {
        Row: {
          id: string;
          user_id: string;
          mood: number;
          energy: number;
          stress: number;
          note: string | null;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mood: number;
          energy: number;
          stress: number;
          note?: string | null;
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mood?: number;
          energy?: number;
          stress?: number;
          note?: string | null;
          date?: string;
          created_at?: string;
        };
      };
    };
  };
};