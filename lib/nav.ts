export const overOnsNav = [
  { href: "/over-ons", label: "Over ons" },
  { href: "/over-ons/kernteam", label: "Het kernteam" },
  { href: "/over-ons/werkwijze", label: "Onze werkwijze" },
  { href: "/over-ons/doelgroep", label: "Doelgroep" },
];

export const doelgroepen = [
  {
    slug: "particulieren",
    label: "Particulieren",
    summary: "Ouders en gezinnen die zelf hulp zoeken voor hun kind of jongere.",
  },
  {
    slug: "ouders-en-kinderen",
    label: "Ouders & kinderen",
    summary: "Ouders die moeite ondervinden bij het opvoeden van hun kind.",
  },
  {
    slug: "bedrijven",
    label: "Bedrijven",
    summary: "Organisaties die trainingen of coaching voor medewerkers zoeken.",
  },
  {
    slug: "zorginstellingen",
    label: "Zorginstellingen",
    summary: "Instellingen die kampen met zorgvragers met ernstige agressie of crisissituaties.",
  },
  {
    slug: "onderwijsinstellingen",
    label: "Onderwijsinstellingen",
    summary: "Scholen die de weerbaarheid van leerlingen willen versterken.",
  },
  {
    slug: "mensen-die-vastlopen",
    label: "Mensen die vastlopen",
    summary: "Jongeren en volwassenen die vastgelopen zijn in hun ontwikkeling.",
  },
];

export const diensten = [
  {
    slug: "ambulante-begeleiding",
    label: "Ambulante begeleiding",
    summary: "Specialistische, persoonlijke begeleiding gericht op gedragsproblematiek.",
  },
  {
    slug: "opvoedingsondersteuning",
    label: "Opvoedingsondersteuning",
    summary: "Praktische ondersteuning voor ouders bij de opvoeding van hun kind.",
  },
  {
    slug: "trajecten-voor-thuiszitters",
    label: "Trajecten voor thuiszitters",
    summary: "Trajecten voor jongeren die door problematiek thuis zijn komen te zitten.",
  },
  {
    slug: "crisis-interventie",
    label: "Crisisinterventie",
    summary: "Direct ingrijpen en stabiliseren bij crisissituaties rondom jeugd & gezin.",
  },
  {
    slug: "trainingen-op-maat",
    label: "Trainingen op maat",
    summary: "Trainingen voor teams en professionals, toegespitst op de praktijk.",
  },
  {
    slug: "coachingstrajecten",
    label: "Coachingstrajecten",
    summary: "Individuele coaching gericht op groei en zelfredzaamheid.",
  },
  {
    slug: "counseling",
    label: "Counseling",
    summary: "Begeleidende gesprekken bij persoonlijke vraagstukken.",
  },
  {
    slug: "oplossingsgericht-coachen",
    label: "Oplossingsgericht coachen",
    summary: "Coaching met de focus op wat wél werkt, in plaats van op het probleem.",
  },
  {
    slug: "psychosociale-begeleiding",
    label: "Psychosociale begeleiding",
    summary: "Begeleiding bij de wisselwerking tussen psychisch welzijn en sociale omgeving.",
  },
];

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over ons", children: overOnsNav },
  {
    href: "/diensten",
    label: "Diensten",
    children: [
      { href: "/diensten", label: "Alle diensten" },
      ...diensten.map((d) => ({ href: `/diensten/${d.slug}`, label: d.label })),
    ],
  },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/referenties", label: "Referenties" },
  { href: "/contact", label: "Contact" },
];
