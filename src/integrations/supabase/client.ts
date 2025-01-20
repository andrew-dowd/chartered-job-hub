import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cwyytndalzoydxcgaliz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3eXl0bmRhbHpveWR4Y2dhbGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNTg5MjQsImV4cCI6MjA1MjYzNDkyNH0.NlZevOkHKxvEk6Zp3NECi8MQU4mxkZ9SwSIdRX31-ZU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
});