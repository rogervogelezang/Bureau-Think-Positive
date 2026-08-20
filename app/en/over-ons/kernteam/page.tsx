import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "The core team",
  description: "Meet the core team at Bureau Think Positive — experienced care professionals, each with their own area of expertise.",
};

const teamMembers = [
  { name: "Mark van Onselen", role: "Core team member", photo: "/kernteam/mark-van-onselen.jpg" },
  { name: "Silvia de Brabander", role: "Core team member", photo: "/kernteam/silvia-de-brabander.jpg" },
  { name: "Diana Eskens Lodder", role: "Core team member", photo: "/kernteam/diana-eskens-lodder.jpg" },
];

export default function KernteamPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="The core team"
          title="The people behind Bureau Think Positive"
          intro="Founder and care coordinator, joined by a team of highly driven and experienced care professionals — each with their own expertise and skills."
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
            <p className="mt-1 font-semibold text-primary">Founder &amp; care coordinator</p>
            <p className="mt-4 text-muted text-pretty leading-relaxed">
              Bachelor&apos;s degree in Cultural and Social Development (Haagse Hogeschool, 1995).
              Worked for many years as an interim aggression coach, socio-therapist and
              specialist psychiatric support worker before founding Bureau Think Positive in
              2011. Case manager, aggression coach, crisis manager and specialist in-home support
              worker all in one — with a track record that includes the Van der Hoeven Kliniek
              (TBS) in Utrecht.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-xl font-extrabold">Our specialists</h3>
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
