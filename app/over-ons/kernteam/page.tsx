import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderBlock from "@/components/PlaceholderBlock";

export const metadata: Metadata = { title: "Het kernteam" };

const placeholderMembers = Array.from({ length: 3 }, (_, i) => i + 1);

export default function KernteamPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Het kernteam"
          title="De mensen achter Bureau Think Positive"
          intro="Trajectleider en oprichter, aangevuld met een team van zeer gedreven en ervaren zorgprofessionals — elk met hun eigen expertise en skills."
        />

        <div className="mt-12 card p-8 sm:p-10 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
          <PlaceholderBlock variant="primary" className="h-40 w-40 rounded-full" label="RV" />
          <div>
            <h3 className="font-display text-2xl font-extrabold">Roger Vogelezang</h3>
            <p className="mt-1 font-semibold text-primary">Oprichter &amp; trajectleider</p>
            <p className="mt-4 text-muted text-pretty leading-relaxed">
              Hbo Culturele en Maatschappelijke Vorming (Haagsche Hogeschool, 1995). Werkte
              jarenlang als interim agressiecoach, sociotherapeut en specialistisch psychiatrisch
              begeleider voordat hij in 2011 Bureau Think Positive oprichtte. Case manager,
              agressiecoach, crisismanager en specialistisch ambulant begeleider ineen — met een
              trackrecord dat onder meer de Van der Hoeven Kliniek (TBS) in Utrecht omvat.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-xl font-extrabold">Onze specialisten</h3>
          <p className="mt-2 text-muted text-pretty">
            Deze plekken worden binnenkort gevuld met de rest van het kernteam.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderMembers.map((n) => (
              <div key={n} className="placeholder-block p-8 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-white/60" />
                <p className="mt-4 font-semibold">Naam volgt</p>
                <p className="text-sm">Functie / expertise</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
