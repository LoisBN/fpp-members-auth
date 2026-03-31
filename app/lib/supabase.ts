import { createClient } from "@supabase/supabase-js";
import { log } from "./logger";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

/**
 * Check if Supabase is properly configured
 * Returns true if both URL and key are set and not placeholders
 */
export const isSupabaseConfigured = (): boolean => {
  const isConfigured =
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes("placeholder") &&
    !supabaseAnonKey.includes("placeholder") &&
    supabaseUrl.includes("supabase.co");

  if (!isConfigured) {
    log.warn("Supabase is not configured. Authentication features will not work.");
  }

  return isConfigured;
};

/**
 * Error message to display when Supabase is not configured
 */
export const supabaseConfigError =
  "Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.";

/**
 * Setup instructions for users
 */
export const supabaseSetupSteps = [
  "Create a Supabase project at supabase.com",
  "Copy the .env.example file to .env",
  "Add your Project URL as VITE_SUPABASE_URL",
  "Add your anon/public key as VITE_SUPABASE_ANON_KEY",
  "Restart your dev server",
];

// Create client with fallback for unconfigured state
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

log.info("Supabase client initialized", {
  configured: isSupabaseConfigured(),
  url: supabaseUrl ? supabaseUrl.substring(0, 30) + "..." : "not set",
});
