"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { requireTrajectleider } from "@/lib/supabase/trajectleider";

export async function addScoreAction(formData: FormData) {
  const trajectleider = await requireTrajectleider();
  const kindId = formData.get("kind_id")?.toString() ?? "";
  const score = Number(formData.get("score"));
  const toelichting = formData.get("toelichting")?.toString().trim() || null;

  if (!kindId || !Number.isFinite(score) || score < 0 || score > 100) {
    redirect(`/portaal/team/kinderen/${kindId}?error=ongeldige_score`);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("voortgang_scores")
    .insert({ kind_id: kindId, score, toelichting, trajectleider_id: trajectleider.id });
  if (error) redirect(`/portaal/team/kinderen/${kindId}?error=score_mislukt`);

  revalidatePath(`/portaal/team/kinderen/${kindId}`);
  redirect(`/portaal/team/kinderen/${kindId}`);
}

export async function addDoelAction(formData: FormData) {
  await requireTrajectleider();
  const kindId = formData.get("kind_id")?.toString() ?? "";
  const titel = formData.get("titel")?.toString().trim() ?? "";
  if (!kindId || !titel) redirect(`/portaal/team/kinderen/${kindId}?error=doel_verplicht`);

  const supabase = await createClient();
  const { error } = await supabase.from("doelen").insert({ kind_id: kindId, titel });
  if (error) redirect(`/portaal/team/kinderen/${kindId}?error=doel_mislukt`);

  revalidatePath(`/portaal/team/kinderen/${kindId}`);
  redirect(`/portaal/team/kinderen/${kindId}`);
}

export async function updateDoelStatusAction(formData: FormData) {
  await requireTrajectleider();
  const kindId = formData.get("kind_id")?.toString() ?? "";
  const doelId = formData.get("doel_id")?.toString() ?? "";
  const status = formData.get("status")?.toString() ?? "";

  const supabase = await createClient();
  await supabase.from("doelen").update({ status, updated_at: new Date().toISOString() }).eq("id", doelId);

  revalidatePath(`/portaal/team/kinderen/${kindId}`);
  redirect(`/portaal/team/kinderen/${kindId}`);
}

// Links an existing ouder account (found by email) to this kind. The
// lookup needs the admin client since auth.users isn't queryable through
// the regular RLS-scoped client — the link itself (writing kinderen.ouder_id)
// still goes through the normal client so RLS keeps enforcing who's allowed
// to edit this row.
export async function koppelOuderAction(formData: FormData) {
  await requireTrajectleider();
  const kindId = formData.get("kind_id")?.toString() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  if (!kindId || !email) redirect(`/portaal/team/kinderen/${kindId}?error=email_verplicht`);

  const admin = getSupabaseAdmin();
  const { data: usersPage } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const match = usersPage?.users.find((u) => u.email?.toLowerCase() === email);

  if (!match) redirect(`/portaal/team/kinderen/${kindId}?error=ouder_niet_gevonden`);

  const supabase = await createClient();
  const { error } = await supabase.from("kinderen").update({ ouder_id: match.id }).eq("id", kindId);
  if (error) redirect(`/portaal/team/kinderen/${kindId}?error=koppelen_mislukt`);

  revalidatePath(`/portaal/team/kinderen/${kindId}`);
  redirect(`/portaal/team/kinderen/${kindId}?gekoppeld=1`);
}

export async function reassignTrajectleiderAction(formData: FormData) {
  const trajectleider = await requireTrajectleider();
  if (!trajectleider.is_coordinator) redirect("/portaal/team/dashboard");

  const kindId = formData.get("kind_id")?.toString() ?? "";
  const nieuweTrajectleiderId = formData.get("trajectleider_id")?.toString() ?? "";
  if (!kindId || !nieuweTrajectleiderId) redirect(`/portaal/team/kinderen/${kindId}`);

  const supabase = await createClient();
  await supabase.from("kinderen").update({ trajectleider_id: nieuweTrajectleiderId }).eq("id", kindId);

  revalidatePath(`/portaal/team/kinderen/${kindId}`);
  redirect(`/portaal/team/kinderen/${kindId}`);
}
