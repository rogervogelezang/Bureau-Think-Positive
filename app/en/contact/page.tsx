import type { Metadata } from "next";
import Container from "@/components/Container";
import HoneypotFields from "@/components/HoneypotFields";
import { submitContactFormAction } from "./actions";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Bureau Think Positive for a free introductory conversation about in-home support, crisis intervention or coaching.",
};

const kenmerken = ["Small-scale", "Short lines of communication", "No-nonsense mentality", "Qualified and skilled", "A heart for young people"];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;

  return (
    <section className="py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Come by for a cup of coffee</p>
          <h1 className="text-4xl font-extrabold text-balance">Get in touch</h1>
          <p className="mt-4 text-muted text-pretty">
            Request a free introductory conversation — we&rsquo;re happy to think along with you.
          </p>

          <address className="mt-8 not-italic">
            <p className="font-semibold text-foreground">Bureau Think Positive</p>
            <p className="text-muted">Stationsweg 59</p>
            <p className="text-muted">2681 SM Honselersdijk</p>
            <p className="mt-2">
              <a href="tel:0648252166" className="font-semibold text-primary hover:underline">
                06 48 25 21 66
              </a>
            </p>
          </address>

          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-wide text-primary">
              Bureau Think Positive&rsquo;s qualities
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {kenmerken.map((k) => (
                <li key={k} className="card px-4 py-3 text-sm font-medium">
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="font-display text-xl font-bold">Contact form</h2>

          {sent ? (
            <p className="mt-6 rounded-[var(--radius-sm)] border border-primary/30 bg-primary-light p-4 text-sm text-primary-dark">
              Thanks for your message — we&rsquo;ll get back to you as soon as possible.
            </p>
          ) : (
            <form action={submitContactFormAction} className="mt-6 flex flex-col gap-4">
              {error === "missing_fields" && (
                <p className="rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-4 text-sm text-danger">
                  Please fill in all required fields.
                </p>
              )}
              {error === "invalid_email" && (
                <p className="rounded-[var(--radius-sm)] border border-danger/30 bg-coral-light p-4 text-sm text-danger">
                  This doesn&rsquo;t look like a valid email address.
                </p>
              )}

              <HoneypotFields />

              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-muted">
                  Name
                </label>
                <input id="name" name="name" required className="input-field" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-muted">
                  Email address
                </label>
                <input id="email" name="email" type="email" required className="input-field" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm text-muted">
                  Phone number (optional)
                </label>
                <input id="phone" name="phone" type="tel" className="input-field" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm text-muted">
                  Message
                </label>
                <textarea id="message" name="message" required rows={5} className="input-field resize-y" />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Send message
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
