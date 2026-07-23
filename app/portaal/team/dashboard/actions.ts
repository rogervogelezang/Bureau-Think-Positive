"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireTrajectleider } from "@/lib/supabase/trajectleider";

export async function createKindAction(formData: FormData) {
  const trajectleider = await requireTrajectleider();
  const naam = formData.get("naam")?.toString().trim() ?? "";
  if (!naam) redirect("/portaal/team/dashboard?error=naam_verplicht");

  const supabase = await createClient();
  const { error } = await supabase.from("kinderen").insert({
    naam,
    trajectleider_id: trajectleider.id,
  });
  if (error) redirect("/portaal/team/dashboard?error=aanmaken_mislukt");

  revalidatePath("/portaal/team/dashboard");
  redirect("/portaal/team/dashboard?toegevoegd=1");
}
