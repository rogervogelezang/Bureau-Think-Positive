// Shared check used by every server-rendered page that needs a signed-in
// session (ouder dashboard, all /portaal/team/* pages) so they can bail out
// to a safe page instead of crashing when Supabase isn't provisioned yet —
// same reasoning as the guard in lib/supabase/proxy.ts.
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
