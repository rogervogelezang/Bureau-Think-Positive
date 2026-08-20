import type { Metadata } from "next";
import Container from "@/components/Container";
import { voorwaardenIntro, voorwaardenArtikelen, voorwaardenFooterNote } from "@/lib/voorwaardenContent.en";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The general terms and conditions of Bureau Think Positive B.V.",
};

export default function VoorwaardenPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="text-4xl font-extrabold text-balance">
          Terms and Conditions of Bureau Think Positive B.V.
        </h1>
        <p className="mt-6 text-muted text-pretty leading-relaxed">{voorwaardenIntro}</p>

        <div className="mt-12 flex flex-col gap-10">
          {voorwaardenArtikelen.map((artikel) => (
            <div key={artikel.title}>
              <h2 className="font-display text-xl font-bold text-primary-dark">{artikel.title}</h2>
              <ol className="mt-4 flex flex-col gap-3 text-sm text-muted text-pretty leading-relaxed list-decimal list-outside pl-5">
                {artikel.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted">{voorwaardenFooterNote}</p>
      </Container>
    </section>
  );
}
