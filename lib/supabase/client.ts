import { createBrowserClient } from "@supabase/ssr";

// For use in Client Components. Auth-aware (reads/writes the session cookie).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
