"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireTrajectleider } from "@/lib/supabase/trajectleider";

export async function createUpdateAction(formData: FormData) {
  const trajectleider = await requireTrajectleider();
  const titel = formData.get("titel")?.toString().trim() ?? "";
  const bericht = formData.get("bericht")?.toString().trim() ?? "";
  const kindIds = formData.getAll("kind_ids").map((v) => v.toString());

  if (!titel || !bericht || kindIds.length === 0) {
    redirect("/portaal/team/updates?error=velden_verplicht");
  }

  const supabase = await createClient();
  const { data: update, error } = await supabase
    .from("updates")
    .insert({ titel, bericht, trajectleider_id: trajectleider.id })
    .select("id")
    .single();

  if (error || !update) redirect("/portaal/team/updates?error=aanmaken_mislukt");

  const { error: ontvangersError } = await supabase
    .from("update_ontvangers")
    .insert(kindIds.map((kindId) => ({ update_id: update.id, kind_id: kindId })));
  if (ontvangersError) redirect("/portaal/team/updates?error=ontvangers_mislukt");

  revalidatePath("/portaal/team/updates");
  redirect("/portaal/team/updates?verstuurd=1");
}

export async function deleteUpdateAction(formData: FormData) {
  await requireTrajectleider();
  const id = formData.get("id")?.toString() ?? "";
  const supabase = await createClient();
  await supabase.from("updates").delete().eq("id", id);
  revalidatePath("/portaal/team/updates");
  redirect("/portaal/team/updates");
}
