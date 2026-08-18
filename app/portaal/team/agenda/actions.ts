"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireTrajectleider } from "@/lib/supabase/trajectleider";

export async function createAgendaItemAction(formData: FormData) {
  const trajectleider = await requireTrajectleider();
  const titel = formData.get("titel")?.toString().trim() ?? "";
  const type = formData.get("type")?.toString() ?? "individueel";
  const startAt = formData.get("start_at")?.toString() ?? "";
  const endAt = formData.get("end_at")?.toString() || null;
  const beschrijving = formData.get("beschrijving")?.toString().trim() || null;
  const kindIds = formData.getAll("kind_ids").map((v) => v.toString());

  if (!titel || !startAt || kindIds.length === 0) {
    redirect("/portaal/team/agenda?error=velden_verplicht");
  }

  const supabase = await createClient();
  const { data: item, error } = await supabase
    .from("agenda_items")
    .insert({
      titel,
      type,
      start_at: new Date(startAt).toISOString(),
      end_at: endAt ? new Date(endAt).toISOString() : null,
      beschrijving,
      trajectleider_id: trajectleider.id,
    })
    .select("id")
    .single();

  if (error || !item) redirect("/portaal/team/agenda?error=aanmaken_mislukt");

  const { error: deelnemersError } = await supabase
    .from("agenda_deelnemers")
    .insert(kindIds.map((kindId) => ({ agenda_item_id: item.id, kind_id: kindId })));
  if (deelnemersError) redirect("/portaal/team/agenda?error=deelnemers_mislukt");

  revalidatePath("/portaal/team/agenda");
  redirect("/portaal/team/agenda?toegevoegd=1");
}

export async function deleteAgendaItemAction(formData: FormData) {
  await requireTrajectleider();
  const id = formData.get("id")?.toString() ?? "";
  const supabase = await createClient();
  const { error } = await supabase.from("agenda_items").delete().eq("id", id);
  if (error) redirect("/portaal/team/agenda?error=verwijderen_mislukt");
  revalidatePath("/portaal/team/agenda");
  redirect("/portaal/team/agenda");
}
