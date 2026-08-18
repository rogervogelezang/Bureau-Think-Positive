"use server";

import { signOutAndRedirect } from "@/lib/supabase/server";

export async function signOutAction() {
  await signOutAndRedirect("/portaal/login");
}
