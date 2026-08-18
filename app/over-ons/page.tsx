import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderBlock from "@/components/PlaceholderBlock";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Het verhaal, de visie en de missie van Bureau Think Positive — sinds 2011 actief in de complexe jeugdzorg.",
};

export default function OverOnsPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-4">Over Bureau Think Positive</p>
            <h1 className="text-4xl font-extrabold text-balance">Ons verhaal</h1>
            <div className="mt-6 flex flex-col gap-4 text-muted text-pretty leading-relaxed">
              <p>
                Bureau Think Positive is in 2011 opgericht door Roger Vogelezang (Hbo Culturele
                en Maatschappelijke Vorming, Haagse Hogeschool, 1995) — destijds onder de naam
                &lsquo;De Crisisspecialist&rsquo; — met het oorspronkelijke doel te werken aan
                vastgelopen cliënten in de complexe zorg — vaak mensen met een verstandelijke
                beperking en de nodige psychiatrische problematiek, bij wie sprake was van een
                (dreigende) crisis.
              </p>
              <p>
                Na jaren als interim agressiecoach, sociotherapeut en specialistisch
                psychiatrisch begeleider was de stap naar zelfstandig ondernemen een logische:
                crisissituaties rondom jeugd &amp; gezin aanpakken en zorgen voor stabiliteit en
                veiligheid, dát is waar we heel goed in zijn.
              </p>
              <p>
                Sindsdien is het bureau uitgegroeid tot Bureau Think Positive: een team van
                gedreven en ervaren zorgprofessionals met ieder hun eigen skills en expertise. We
                werken projectmatig en oplossingsgericht, met als doel de jongere en zijn/haar
                systeem zo snel mogelijk weer te laten functioneren.
              </p>
            </div>
          </div>
          <PlaceholderBlock variant="accent" className="h-72 sm:h-96" label="Sinds 2011" />
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-background-elevated border-y border-border">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Visie" title="Mensen centraal, ongeacht hun rol" />
            <div className="mt-6 flex flex-col gap-4 text-muted text-pretty leading-relaxed">
              <p>
                Wij geloven in een wereld waarin ieder mens centraal staat, ongeacht wie hij is of
                wat zijn rol in de maatschappij is — een wereld waarin iedereen zelf vorm mag
                geven aan zijn leven. Wij hechten bijzonder veel waarde aan zelfbeschikking: de
                vrijheid om te leven zoals je daar zelf achter kunt staan.
              </p>
              <p>
                Die individuele vrijheid gaat samen met verantwoordelijkheid voor en
                betrokkenheid bij anderen en je omgeving. Menselijke waardigheid, rechtvaardigheid
                en vrijheid staan centraal, met een voorkeur voor dialoog boven dogmatiek.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Missie" title="Integrale jeugdhulp bieden" />
            <div className="mt-6 flex flex-col gap-4 text-muted text-pretty leading-relaxed">
              <p>
                Integrale jeugdhulp is passend en samenhangend: de jongere is het uitgangspunt en
                de hulp is zo licht en gewoon mogelijk, maar direct intensief waar nodig. De hulp
                is samenhangend wanneer deskundigheid vanuit verschillende specialismen en
                sectoren beter benut en in samenhang aangeboden wordt.
              </p>
              <p>
                We gaan graag de samenwerking aan met specialisten, zowel binnen als buiten onze
                organisatie, zodat iedere jongere gelijke kansen krijgt om zich te ontwikkelen.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
