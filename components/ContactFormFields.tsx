import HoneypotFields from "@/components/HoneypotFields";

// Plain, server-renderable form markup — no client hooks. Shared between the
// page's Suspense fallback (the static shell) and ContactFormCard's default
// branch, so the two produce byte-identical DOM for the ~everyday case
// (visiting /contact with no ?sent/?error). That match is what lets React
// hydrate silently instead of swapping content in after the fact — which is
// what caused the "pop-in" during page transitions. Only the rare
// just-submitted-the-form states (?sent=1, ?error=...) differ from this.
const COPY = {
  nl: {
    name: "Naam",
    email: "E-mailadres",
    phone: "Telefoonnummer (optioneel)",
    message: "Bericht",
    submit: "Stuur bericht",
  },
  en: {
    name: "Name",
    email: "Email address",
    phone: "Phone number (optional)",
    message: "Message",
    submit: "Send message",
  },
};

export default function ContactFormFields({
  lang,
  action,
  errorBanner,
}: {
  lang: "nl" | "en";
  action: (formData: FormData) => void;
  errorBanner?: React.ReactNode;
}) {
  const t = COPY[lang];

  return (
    <form action={action} className="mt-6 flex flex-col gap-4">
      {errorBanner}

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
  );
}
