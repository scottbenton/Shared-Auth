import { createCustomCookieStorage } from "@/context/AuthProvider/authCookie";
import { createClient } from "@supabase/supabase-js";
import { COOKIE_DOMAIN } from "./cookieDomain";
import type { Database } from "@/types/supabase-generated.type";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function getStringOrThrow(value: any, message: string) {
  if (typeof value !== "string") {
    throw new Error(message);
  }
  return value;
}

const supabaseURL = getStringOrThrow(
  import.meta.env.VITE_SUPABASE_URL,
  "SUPABASE_URL is not defined",
);
const supabaseKey = getStringOrThrow(
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  "SUPABASE_PUBLISHABLE_DEFAULT_KEY is not defined",
);
const cookieStorage = createCustomCookieStorage(COOKIE_DOMAIN);

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseURL, supabaseKey, {
  auth: {
    storage: cookieStorage,
  },
});
