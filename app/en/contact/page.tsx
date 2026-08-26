import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/Container";
import ContactFormCard from "@/components/ContactFormCard";
import ContactFormFields from "@/components/ContactFormFields";
import { submitContactFormAction } from "./actions";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Bureau Think Positive for a free introductory conversation about in-home support, crisis intervention or coaching.",
};

const kenmerken = ["Small-scale", "Short lines of communication", "No-nonsense mentality", "Qualified and skilled", "A heart for young people"];

export default function ContactPage() {
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

        <Suspense
          fallback={
            <div className="card p-8">
              <h2 className="font-display text-xl font-bold">Contact form</h2>
              <ContactFormFields lang="en" action={submitContactFormAction} />
            </div>
          }
        >
          <ContactFormCard lang="en" action={submitContactFormAction} />
        </Suspense>
      </Container>
    </section>
  );
}
