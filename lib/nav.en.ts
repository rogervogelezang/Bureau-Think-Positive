// English mirror of lib/nav.ts. Slugs stay identical to the Dutch versions
// (see the plan's URL-segment note) — only labels/summaries/hrefs change,
// with every href already carrying the /en prefix so callers never need to
// concatenate it themselves.

export const overOnsNav = [
  { href: "/en/over-ons", label: "About us" },
  { href: "/en/over-ons/kernteam", label: "The core team" },
  { href: "/en/over-ons/werkwijze", label: "Our approach" },
  { href: "/en/over-ons/doelgroep", label: "Who we help" },
];

export const doelgroepen = [
  {
    slug: "particulieren",
    label: "Individuals",
    summary: "Parents and families looking for help for their child or teenager.",
  },
  {
    slug: "ouders-en-kinderen",
    label: "Parents & children",
    summary: "Parents who are struggling with raising their child.",
  },
  {
    slug: "bedrijven",
    label: "Businesses",
    summary: "Organisations looking for training or coaching for their staff.",
  },
  {
    slug: "zorginstellingen",
    label: "Care institutions",
    summary: "Institutions dealing with care recipients experiencing severe aggression or crisis situations.",
  },
  {
    slug: "onderwijsinstellingen",
    label: "Educational institutions",
    summary: "Schools that want to strengthen their students' resilience.",
  },
  {
    slug: "mensen-die-vastlopen",
    label: "People who feel stuck",
    summary: "Young people and adults who have become stuck in their development.",
  },
];

export const diensten = [
  {
    slug: "ambulante-begeleiding",
    label: "Outreach support",
    summary: "Specialist, personal support focused on behavioural issues.",
  },
  {
    slug: "opvoedingsondersteuning",
    label: "Parenting support",
    summary: "Practical support for parents raising their child.",
  },
  {
    slug: "trajecten-voor-thuiszitters",
    label: "Programmes for school non-attenders",
    summary: "Programmes for young people who have dropped out of school due to underlying issues.",
  },
  {
    slug: "crisis-interventie",
    label: "Crisis intervention",
    summary: "Immediate intervention and stabilisation in crisis situations involving young people & families.",
  },
  {
    slug: "trainingen-op-maat",
    label: "Tailored training",
    summary: "Training for teams and professionals, tailored to real-world practice.",
  },
  {
    slug: "coachingstrajecten",
    label: "Coaching programmes",
    summary: "Individual coaching focused on growth and self-reliance.",
  },
  {
    slug: "counseling",
    label: "Counselling",
    summary: "Supportive conversations around personal challenges.",
  },
  {
    slug: "oplossingsgericht-coachen",
    label: "Solution-focused coaching",
    summary: "Coaching that focuses on what does work, rather than on the problem.",
  },
  {
    slug: "psychosociale-begeleiding",
    label: "Psychosocial support",
    summary: "Support around the interplay between mental wellbeing and social environment.",
  },
];

export const mainNav = [
  { href: "/en", label: "Home" },
  { href: "/en/over-ons", label: "About us", children: overOnsNav },
  {
    href: "/en/diensten",
    label: "Services",
    children: [
      { href: "/en/diensten", label: "All services" },
      ...diensten.map((d) => ({ href: `/en/diensten/${d.slug}`, label: d.label })),
    ],
  },
  { href: "/en/kennisbank", label: "Knowledge base" },
  { href: "/en/referenties", label: "Testimonials" },
  { href: "/en/contact", label: "Contact" },
];
