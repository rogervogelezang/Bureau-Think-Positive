"use server";

import { redirect } from "next/navigation";
import { sendContactFormEmail } from "@/lib/email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A real visitor takes at least a couple of seconds to fill in the form; a
// bot that POSTs the instant it fetches the page doesn't. Combined with the
// "website" honeypot field (invisible to real users via CSS, but most spam
// scripts fill every input they find), this catches most contact-form spam
// without ever showing a visitor a CAPTCHA.
const MIN_SUBMIT_MS = 2000;

export async function submitContactFormAction(formData: FormData): Promise<void> {
  const honeypot = formData.get("website")?.toString() ?? "";
  const renderedAt = Number(formData.get("renderedAt"));
  const submittedTooFast = Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_SUBMIT_MS;

  if (honeypot.trim() !== "" || submittedTooFast) {
    redirect("/contact?sent=1");
  }

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email || !message) {
    redirect("/contact?error=missing_fields");
  }
  if (!EMAIL_PATTERN.test(email)) {
    redirect("/contact?error=invalid_email");
  }

  await sendContactFormEmail({ name, email, phone, message });
  redirect("/contact?sent=1");
}
