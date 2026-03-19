import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// On s'assure que les variables sont bien chargées pour éviter les erreurs "offline"
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variables d\'environnement Supabase manquantes.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
