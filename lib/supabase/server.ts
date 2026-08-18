import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// For use in Server Components, Server Actions, and Route Handlers.
// Reads/writes the session via Next.js's cookie store.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — cookies can't be set here.
            // Harmless as long as proxy.ts is also refreshing the session.
          }
        },
      },
    },
  );
}

// Shared by the ouder and trajectleider sign-out actions — identical apart
// from where each portal sends the user afterward.
export async function signOutAndRedirect(target: string): Promise<never> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(target);
}
