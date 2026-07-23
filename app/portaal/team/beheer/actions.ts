"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireTrajectleider } from "@/lib/supabase/trajectleider";

async function requireCoordinator() {
  const trajectleider = await requireTrajectleider();
  if (!trajectleider.is_coordinator) redirect("/portaal/team/dashboard");
  return trajectleider;
}

// Uses Supabase's built-in invite flow: creates the auth user and emails
// them a link to set their own password — no custom email template needed.
export async function inviteTrajectleiderAction(formData: FormData) {
  await requireCoordinator();
  const naam = formData.get("naam")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const isCoordinator = formData.get("is_coordinator") === "on";

  if (!naam || !email) redirect("/portaal/team/beheer?error=velden_verplicht");

  const admin = getSupabaseAdmin();
  const { data, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email);
  if (inviteError || !data.user) {
    redirect("/portaal/team/beheer?error=uitnodigen_mislukt");
  }

  // Insert with the admin client (service role) since this happens right
  // after creating the auth user in the same request — the new user has
  // no session yet for the regular client's RLS-scoped insert to run as.
  const { error: insertError } = await admin
    .from("trajectleiders")
    .insert({ id: data.user!.id, naam, is_coordinator: isCoordinator });
  if (insertError) redirect("/portaal/team/beheer?error=opslaan_mislukt");

  revalidatePath("/portaal/team/beheer");
  redirect("/portaal/team/beheer?uitgenodigd=1");
}

export async function toggleCoordinatorAction(formData: FormData) {
  await requireCoordinator();
  const id = formData.get("id")?.toString() ?? "";
  const nieuweStatus = formData.get("nieuwe_status") === "true";

  const supabase = await createClient();
  await supabase.from("trajectleiders").update({ is_coordinator: nieuweStatus }).eq("id", id);

  revalidatePath("/portaal/team/beheer");
  redirect("/portaal/team/beheer");
}

// Deletes the auth user entirely (not just the trajectleiders row) — the
// trajectleiders row disappears automatically via its ON DELETE CASCADE
// foreign key to auth.users. Any kinderen rows this trajectleider owned
// keep existing (kinderen.trajectleider_id has no cascade), so a
// coordinator should reassign them first from each kind's detail page.
export async function deleteTrajectleiderAction(formData: FormData) {
  const coordinator = await requireCoordinator();
  const id = formData.get("id")?.toString() ?? "";
  if (!id) redirect("/portaal/team/beheer");
  if (id === coordinator.id) redirect("/portaal/team/beheer?error=kan_zichzelf_niet_verwijderen");

  const admin = getSupabaseAdmin();
  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) redirect("/portaal/team/beheer?error=verwijderen_mislukt");

  revalidatePath("/portaal/team/beheer");
  redirect("/portaal/team/beheer?verwijderd=1");
}
