import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type Trajectleider = { id: string; naam: string; is_coordinator: boolean };

// Call at the top of every /portaal/team/* page (except login). Redirects
// to the team login if not authenticated at all, or back to the public
// /portaal landing if logged in but not a trajectleider (e.g. an ouder who
// wandered onto a staff URL) — RLS would block their queries anyway, but
// this gives a clean redirect instead of an empty/broken page.
export async function requireTrajectleider(): Promise<Trajectleider> {
  // Supabase isn't provisioned in every environment yet — bail out to the
  // public portal page instead of crashing (createClient() throws if the
  // env vars are missing).
  if (!isSupabaseConfigured()) redirect("/portaal");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portaal/team/login");

  const { data } = await supabase
    .from("trajectleiders")
    .select("id, naam, is_coordinator")
    .eq("id", user.id)
    .maybeSingle();

  if (!data) redirect("/portaal");

  return data as Trajectleider;
}

// Call at the top of every coordinator-only page/action (beheer, and any
// action touching the service-role admin client). Redirects non-coordinator
// trajectleiders back to the team dashboard instead of letting them proceed.
export async function requireCoordinator(): Promise<Trajectleider> {
  const trajectleider = await requireTrajectleider();
  if (!trajectleider.is_coordinator) redirect("/portaal/team/dashboard");
  return trajectleider;
}
