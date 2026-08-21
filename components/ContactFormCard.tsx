"use client";

import { useSearchParams } from "next/navigation";
import HoneypotFields from "@/components/HoneypotFields";

// Reading sent/error via useSearchParams (client-side, from the current URL)
// instead of the page's searchParams prop keeps the contact page itself free
// of request-time data, so it can be statically prerendered — only this
// card needs a Suspense boundary. See the page files for why this matters.
const COPY = {
  nl: {
    heading: "Contactformulier",
    thanks: "Bedankt voor je bericht — we nemen zo snel mogelijk contact met je op.",
    missingFields: "Vul alstublieft alle verplichte velden in.",
    invalidEmail: "Dit lijkt geen geldig e-mailadres te zijn.",
    name: "Naam",
    email: "E-mailadres",
    phone: "Telefoonnummer (optioneel)",
    message: "Bericht",
    submit: "Stuur bericht",
  },
  en: {
    heading: "Contact form",
    thanks: "Thanks for your message — we'll get back to you as soon as possible.",
    missingFields: "Please fill in all required fields.",
    invalidEmail: "This doesn't look like a valid email address.",
    name: "Name",
    email: "Email address",
    phone: "Phone number (optional)",
    message: "Message",
    submit: "Send message",
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

  return (
    <div className="card p-8">
      <h2 className="font-display text-xl font-bold">{t.heading}</h2>

      {sent ? (
        <p className="mt-6 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-4 text-sm text-primary-dark">
          {t.thanks}
        </p>
      ) : (
        <form action={action} className="mt-6 flex flex-col gap-4">
          {error === "missing_fields" && (
            <p className="rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-4 text-sm text-danger">
              {t.missingFields}
            </p>
          )}
          {error === "invalid_email" && (
            <p className="rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-4 text-sm text-danger">
              {t.invalidEmail}
            </p>
          )}

          <HoneypotFields />

          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-muted">
              {t.name}
            </label>
            <input id="name" name="name" required className="input-field" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-muted">
              {t.email}
            </label>
            <input id="email" name="email" type="email" required className="input-field" />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm text-muted">
              {t.phone}
            </label>
            <input id="phone" name="phone" type="tel" className="input-field" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm text-muted">
              {t.message}
            </label>
            <textarea id="message" name="message" required rows={5} className="input-field resize-y" />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {t.submit}
          </button>
        </form>
      )}
    </div>
  );
}
