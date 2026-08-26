import type { Block } from "payload";

export const TeamGrid: Block = {
  slug: "teamGrid",
  labels: {
    singular: { nl: "Teamoverzicht", en: "Team grid" },
    plural: { nl: "Teamoverzichten", en: "Team grids" },
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
      name: "intro",
      type: "textarea",
      localized: true,
      label: "Introductietekst",
      admin: {
        description: "Toont automatisch alle teamleden uit \"Teamleden\", op de volgorde die daar bij elk teamlid is ingesteld.",
      },
    },
  ],
};
