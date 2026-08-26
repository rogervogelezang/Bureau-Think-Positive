import type { Block } from "payload";

export const WhyUs: Block = {
  slug: "whyUs",
  labels: {
    singular: { nl: "Waarom-ons blok", en: "Why us block" },
    plural: { nl: "Waarom-ons blokken", en: "Why us blocks" },
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      label: "Tekst boven de titel",
      admin: { description: "Klein, optioneel tekstje dat boven de hoofdtitel van dit blok verschijnt, bijv. \"ONZE DIENSTEN\"." },
    },
    { name: "title", type: "text", localized: true, label: "Titel" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      labels: {
        singular: { nl: "Kaart", en: "Card" },
        plural: { nl: "Kaarten", en: "Cards" },
      },
      label: "Kaarten",
      admin: {
        description: "Elke kaart is één reden om voor jullie te kiezen: een titel plus een korte toelichting.",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
          label: "Titel van de kaart",
          admin: { description: "Korte kop, bijv. \"Persoonlijke aanpak\"." },
        },
        {
          name: "body",
          type: "textarea",
          required: true,
          localized: true,
          label: "Toelichting",
          admin: { description: "Korte uitleg bij deze kaart, 1–2 zinnen." },
        },
      ],
    },
  ],
};
