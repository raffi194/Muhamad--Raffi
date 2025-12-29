// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Ganti process.env dengan import.meta.env
// Ganti NEXT_PUBLIC dengan VITE
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL dan Key belum disetting di file .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseKey);