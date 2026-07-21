import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";

export const metadata: Metadata = { title: "Referenties" };

const testimonials = [
  {
    quote:
      "Ik heb gezien hoe hij omging met zeer dreigende situaties en agressie. Hij kan adequaat en op het juiste moment inspelen op dergelijke situaties.",
    author: "Hannie de Bie — ILO psycholoog, Ontwikkeling & Leren",
  },
  {
    quote:
      "Roger ken ik als open-minded en oprecht geïnteresseerd in mensen. Hij heeft een sterk ontwikkeld gevoel voor empathie maar durft ook duidelijk te zeggen waar het op staat.",
    author: "Jeroen Duijvestein — manager bij G. Fisher",
  },
  {
    quote:
      "Hij is erg betrokken bij de mensen waar hij voor werkt. Is rustig en consequent, doortastend, duidelijk en heeft het vermogen de regie te hebben zonder de baas te zijn. Hij leest de mens en de situatie goed waardoor hij reageert voor het escaleert.",
    author: "Hans Nouwen — zorgzame begeleiding",
  },
  {
    quote:
      "Ik heb Roger leren kennen als een rustige persoon, die veel werkervaring heeft in crisissituaties en op een rustige, maar duidelijke manier de aansluiting vindt bij de cliënt. Door observatie, feedback en actief meedenken en coaching van onze begeleiders heeft hij een duidelijke bijdrage geleverd bij het oplossen van de ontstane crisissituatie.",
    author: "Sandra Crone — eerst verantwoordelijke De Seisoenen",
  },
  {
    quote:
      "Ik ben trots op jullie! Wat een groei het afgelopen jaar! Ontzettend bedankt voor al het vertrouwen wat jullie in mijn kerel hebben gehad en vooral het vertrouwen wat jullie hem hebben gegeven! Ik denk dat er weinig kinderen zijn die in zo'n korte tijd zo ontzettend veel zijn gegroeid.",
    author: "C. — moeder",
  },
  {
    quote:
      "Wat een geweldige stappen heb jij gemaakt, een geweldige groei doorgemaakt, vele jaren begeleid en zeker heel veel bijdrage aan zijn zelfbeeld, de groei en ontwikkeling. Ook voor ons als ouders ben je er regelmatig geweest en ik ben je zeer dankbaar voor het samen zoeken naar wat altijd het beste was.",
    author: "M. — ouder",
  },
  {
    quote:
      "Zijn maatje, zijn vriend… Wat een toffe en superfijne begeleider die er altijd voor hem is! Al zo lang zijn vaste begeleider en zoveel samen doorgemaakt!",
    author: "H. — ouder",
  },
  {
    quote:
      "Je gaf en bood de mogelijkheden die een ander niet kon geven — letterlijk door een ruimte te bieden, maar zeker ook door ruimte te geven in zijn eigen tempo. Een plek om zichzelf te zijn, en te mogen groeien en ontplooien.",
    author: "R. — ouder",
  },
  {
    quote:
      "Je gaf de mogelijkheden die een ander niet kon geven — een plek om zichzelf te zijn, en te mogen groeien en ontplooien. Dit hadden wij nooit kunnen bereiken zonder jullie!",
    author: "A. — moeder",
  },
];

export default function ReferentiesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Wat anderen zeggen"
          title="Enkele referenties"
          intro="Van collega-professionals tot ouders die het traject zelf hebben meegemaakt."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
