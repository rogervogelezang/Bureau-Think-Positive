import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Onze werkwijze" };

const methodieken = [
  {
    slug: "meewerkend-coach-de-werkwijze",
    title: "De meewerkend coach",
    body: "Onze trajectleider kruipt eerst zelf in de rol van begeleider om vanuit de vloer de kern van de situatie te ervaren, brengt kaders en veiligheid aan, en schuift dan geleidelijk door naar een coachende rol richting het team.",
  },
  {
    slug: "methodiek-triple-c",
    title: "Triple-C",
    body: "Gericht op herstel van het gewone leven in plaats van het beheersen van probleemgedrag: relatie- en competentieopbouw vermindert stress en probleemgedrag.",
  },
  {
    slug: "methodiek-oplossingsgericht-werken",
    title: "Oplossingsgericht werken",
    body: "Niet de beperking van het probleem staat centraal, maar hoe mensen zelf oplossingen vinden en welke mogelijkheden en vaardigheden ze al in huis hebben.",
  },
];

export default function WerkwijzePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Onze werkwijze"
          title="No-nonsense, projectmatig en oplossingsgericht"
          intro="We gebruiken de uitgangspunten van de moderne positieve psychologie om krachten aan te boren en hindernissen te overkomen. Op basis van jarenlange ervaring werkt onze aanpak: op één enkele uitzondering na zijn alle jongeren die bij ons een traject volgden er goed van af gekomen."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {methodieken.map((m) => (
            <div key={m.slug} className="card p-6 flex flex-col">
              <h3 className="font-display text-lg font-bold text-primary-dark">{m.title}</h3>
              <p className="mt-3 text-sm text-muted text-pretty flex-1">{m.body}</p>
              <Link
                href={`/kennisbank/${m.slug}`}
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                Lees de volledige methodiek →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 card p-8 sm:p-10">
          <h3 className="font-display text-xl font-extrabold">Wat je van ons mag verwachten</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 text-muted text-pretty leading-relaxed">
            <p>
              We beloven niet dat het makkelijk gaat — werken aan jezelf en je problemen kost
              moeite en inspanning. Maar we staan naast je bij elke volgende hindernis, en leren
              je om je aandacht te focussen op wat wél werkt, in plaats van stil te staan bij wat
              niet werkt.
            </p>
            <p>
              We leren je gebruikmaken van je krachten en mogelijkheden, en zoomen ook in op je
              problemen — want sommige hindernissen kun je niet omzeilen. Vooral kijken en
              luisteren we naar jou: realistisch, maar hoopvol.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
