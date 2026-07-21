import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Klachtenprocedure" };

const stappen = [
  {
    title: "Stap 1 — Bespreek de klacht met de betreffende zorgverlener",
    body: "Maak de klacht eerst kenbaar bij de desbetreffende zorgverlener of medewerker — in de meeste gevallen is de klacht in een direct gesprek op te lossen. Reageer zo snel mogelijk op de onvrede, vraag zo nodig een gesprek aan en zet de klacht eventueel kort en krachtig op papier. Komt u er niet uit, neem dan contact op met onze zorgcoördinator, Roger Vogelezang.",
  },
  {
    title: "Stap 2 — Maak de klacht kenbaar bij de klachtenfunctionaris",
    body: "Onze onafhankelijke klachtenfunctionaris is Mark van Onselen. Hij kan u informeren, ondersteunen en bemiddelen met de zorgverlener. Een klacht hoeft niet direct schriftelijk gemeld te worden — dat kan ook mondeling, bijvoorbeeld telefonisch. Wordt de klacht schriftelijk ingediend, dan geldt een wettelijke reactietermijn van zes weken (met een mogelijke verlenging van vier weken).",
  },
  {
    title: "Stap 3 — Dien de klacht schriftelijk in bij de klachtencommissie",
    body: "Lukt het niet om de klacht naar tevredenheid op te lossen, dan kunt u een officiële klacht indienen bij de klachtencommissie. Onze organisatie is aangesloten bij de klachtencommissie van CBKZ, die via hoor en wederhoor onderzoek doet en de klacht gegrond of ongegrond verklaart.",
  },
  {
    title: "Stap 4 — Dien uw klacht in bij de geschillencommissie",
    body: "Is de klacht niet of onvoldoende opgelost, dan kan de stap gemaakt worden naar de onafhankelijke geschillencommissie van CBKZ. Let op: dit kan pas nadat de klacht eerst bij Bureau Think Positive is ingediend, en de uitkomst van de geschillencommissie is bindend — hoger beroep of een gang naar de rechter is daarna niet meer mogelijk. De procedure is wel sneller en goedkoper dan een procedure via de rechter.",
  },
];

export default function KlachtenprocedurePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Klachtenprocedure"
          title="Niet tevreden? Dit zijn uw stappen"
          intro="Wij van Bureau Think Positive doen ons best om onze dienstverlening zo goed mogelijk uit te voeren. Bij de uitvoering daarvan kan het voorkomen dat u niet tevreden bent — hieronder de stappen die u dan als cliënt kunt ondernemen."
        />

        <div className="mt-12 flex flex-col gap-6">
          {stappen.map((s, i) => (
            <div key={s.title} className="card p-6 flex gap-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-display font-extrabold text-primary-dark">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-primary-dark">{s.title}</h2>
                <p className="mt-2 text-sm text-muted text-pretty leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
