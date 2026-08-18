import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Het kernteam",
  description: "Maak kennis met het kernteam van Bureau Think Positive — ervaren zorgprofessionals met ieder hun eigen expertise.",
};

const teamMembers = [
  { name: "Mark van Onselen", role: "Lid kernteam", photo: "/kernteam/mark-van-onselen.jpg" },
  { name: "Silvia de Brabander", role: "Lid kernteam", photo: "/kernteam/silvia-de-brabander.jpg" },
  { name: "Diana Eskens Lodder", role: "Lid kernteam", photo: "/kernteam/diana-eskens-lodder.jpg" },
];

export default function KernteamPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Het kernteam"
          title="De mensen achter Bureau Think Positive"
          intro="Oprichter en zorg coördinator, aangevuld met een team van zeer gedreven en ervaren zorgprofessionals — elk met hun eigen expertise en skills."
        />

        <div className="mt-12 card p-8 sm:p-10 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/kernteam/roger-vogelezang.jpg"
              alt="Roger Vogelezang"
              fill
              sizes="160px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h3 className="font-display text-2xl font-extrabold">Roger Vogelezang</h3>
            <p className="mt-1 font-semibold text-primary">Oprichter &amp; zorg coördinator</p>
            <p className="mt-4 text-muted text-pretty leading-relaxed">
              Hbo Culturele en Maatschappelijke Vorming (Haagse Hogeschool, 1995). Werkte
              jarenlang als interim agressiecoach, sociotherapeut en specialistisch psychiatrisch
              begeleider voordat hij in 2011 Bureau Think Positive oprichtte. Case manager,
              agressiecoach, crisismanager en specialistisch ambulant begeleider ineen — met een
              trackrecord dat onder meer de Van der Hoeven Kliniek (TBS) in Utrecht omvat.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-xl font-extrabold">Onze specialisten</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m) => (
              <div key={m.name} className="card p-8 text-center">
                <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                  <Image src={m.photo} alt={m.name} fill sizes="96px" className="object-cover object-top" />
                </div>
                <p className="mt-4 font-semibold">{m.name}</p>
                <p className="text-sm text-muted">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
