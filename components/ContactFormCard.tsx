"use client";

import { useSearchParams } from "next/navigation";
import ContactFormFields from "@/components/ContactFormFields";

// Reading sent/error via useSearchParams (client-side, from the current URL)
// instead of the page's searchParams prop keeps the contact page itself free
// of request-time data, so it can be statically prerendered. The default
// (no sent/error) branch below renders ContactFormFields exactly as the
// page's Suspense fallback does — see ContactFormFields.tsx for why that
// match matters.
const COPY = {
  nl: {
    heading: "Contactformulier",
    thanks: "Bedankt voor je bericht — we nemen zo snel mogelijk contact met je op.",
    missingFields: "Vul alstublieft alle verplichte velden in.",
    invalidEmail: "Dit lijkt geen geldig e-mailadres te zijn.",
  },
  en: {
    heading: "Contact form",
    thanks: "Thanks for your message — we'll get back to you as soon as possible.",
    missingFields: "Please fill in all required fields.",
    invalidEmail: "This doesn't look like a valid email address.",
  },
};

export default function ContactFormCard({
  lang,
  action,
}: {
  lang: "nl" | "en";
  action: (formData: FormData) => void;
}) {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");
  const error = searchParams.get("error");
  const t = COPY[lang];

  const errorBanner =
    error === "missing_fields" || error === "invalid_email" ? (
      <p className="rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-4 text-sm text-danger">
        {error === "missing_fields" ? t.missingFields : t.invalidEmail}
      </p>
    ) : null;

  return (
    <div className="card p-8">
      <h2 className="font-display text-xl font-bold">{t.heading}</h2>

      {sent ? (
        <p className="mt-6 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-4 text-sm text-primary-dark">
          {t.thanks}
        </p>
      ) : (
        <ContactFormFields lang={lang} action={action} errorBanner={errorBanner} />
      )}
    </div>
  );
}
