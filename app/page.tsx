import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderBlock from "@/components/PlaceholderBlock";
import TestimonialCard from "@/components/TestimonialCard";
import { diensten } from "@/lib/nav";

const kenmerken = [
  { title: "Bekwaam", body: "Jarenlange ervaring in de complexe jeugdzorg, van crisis tot dagelijkse begeleiding." },
  { title: "Bevoegd", body: "SKJ-geregistreerd en werkend volgens de professionele standaarden in de jeugdhulp." },
  { title: "Betrouwbaar", body: "Kleinschalig, korte lijnen en een no-nonsensmentaliteit — je weet altijd waar je aan toe bent." },
];

const testimonials = [
  {
    quote:
      "Ik ben trots op jullie! Wat een groei het afgelopen jaar! Ontzettend bedankt voor al het vertrouwen wat jullie in mijn kerel hebben gehad.",
    author: "C. — moeder",
  },
  {
    quote:
      "Hij is erg betrokken bij de mensen waar hij voor werkt. Rustig en consequent, doortastend en duidelijk, met het vermogen de regie te hebben zonder de baas te zijn.",
    author: "Hans Nouwen — zorgzame begeleiding",
  },
  {
    quote:
      "Je gaf de mogelijkheden die een ander niet kon geven — een plek om zichzelf te zijn, en te mogen groeien en ontplooien.",
    author: "R. — ouder",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-4">Bureau Think Positive · Jeugdzorg</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-balance">
              Werken aan vastgelopen ontwikkeling, met een{" "}
              <span className="text-primary">positieve</span> aanpak
            </h1>
            <p className="mt-6 text-lg text-muted text-pretty">
              Wij zijn een team van specialisten in de complexe jeugdzorg. Van crisissituaties
              rondom jeugd &amp; gezin tot ambulante begeleiding en coaching — wij zorgen voor
              stabiliteit, veiligheid en perspectief.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary">
                Vraag een gratis oriënterend gesprek aan
              </Link>
              <Link href="/over-ons" className="btn btn-outline">
                Ontdek ons verhaal
              </Link>
            </div>
          </div>
          <PlaceholderBlock variant="primary" className="h-72 sm:h-96" label="Bureau Think Positive" />
        </Container>
      </section>

      <section className="py-16 sm:py-24 bg-background-elevated border-y border-border">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <PlaceholderBlock variant="soft" className="h-64 sm:h-80 order-last lg:order-first" />
          <div>
            <SectionHeading
              eyebrow="Onze filosofie"
              title="Ga mee op ontdekkingsreis en word wie je bent"
            />
            <p className="mt-6 text-muted text-pretty leading-relaxed">
              Opgroeien is niet makkelijk. Voor de meeste jongeren voelt het eerder als een
              hindernisbaan vol obstakels — soms zo zwaar dat je er alleen voor lijkt te staan.
              Daarom richtten we Bureau Think Positive op: om te helpen op een manier die bij jou
              aanslaat, zodat je voorbij de zware periode komt en er weer zin in krijgt.
            </p>
            <p className="mt-4 text-muted text-pretty leading-relaxed">
              We beloven niet dat het makkelijk gaat — werken aan jezelf kost moeite. Maar we staan
              naast je bij elke hindernis, en leren je focussen op wat wél werkt. Think Positive is
              geen slogan, het is een way of life.
            </p>
            <Link href="/over-ons" className="mt-6 inline-block font-semibold text-primary hover:underline">
              Lees ons volledige verhaal →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Wat we doen"
            title="Een integraal pakket aan zorgdiensten"
            intro="Van gespecialiseerde ambulante begeleiding tot trajecten voor gestrande jongeren — projectmatig en oplossingsgericht."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diensten.slice(0, 6).map((d) => (
              <Link
                key={d.slug}
                href={`/diensten/${d.slug}`}
                className="card p-6 hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <h3 className="font-display text-lg font-bold text-primary-dark">{d.label}</h3>
                <p className="mt-2 text-sm text-muted text-pretty">{d.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/diensten" className="btn btn-secondary">
              Bekijk alle diensten
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 bg-primary-light/40">
        <Container>
          <SectionHeading align="center" eyebrow="Waarom Bureau Think Positive" title="Waarom zou je voor ons kiezen?" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {kenmerken.map((k) => (
              <div key={k.title} className="card p-8 text-center">
                <h3 className="font-display text-xl font-extrabold text-primary">{k.title}</h3>
                <p className="mt-3 text-sm text-muted text-pretty">{k.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn btn-primary">
              Vraag nu een gratis oriënterend gesprek aan
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Wat anderen zeggen" title="Enkele referenties" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.author} {...t} />
            ))}
          </div>
          <Link href="/referenties" className="mt-8 inline-block font-semibold text-primary hover:underline">
            Lees meer referenties →
          </Link>
        </Container>
      </section>

      <section className="py-16 sm:py-24 bg-primary-dark text-white">
        <Container className="flex flex-col items-center text-center gap-6">
          <p className="eyebrow text-accent">Onze tekenpartner</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Super Kids</h2>
          <p className="max-w-xl text-white/70">Geen beperkingen, maar mogelijkheden.</p>
        </Container>
      </section>
    </>
  );
}
