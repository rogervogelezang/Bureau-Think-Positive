import type { Block } from "payload";

export const ServiceGrid: Block = {
  slug: "serviceGrid",
  labels: {
    singular: { nl: "Dienstenoverzicht", en: "Service grid" },
    plural: { nl: "Dienstenoverzichten", en: "Service grids" },
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
    { name: "intro", type: "textarea", localized: true, label: "Introductietekst" },
    {
      name: "limit",
      type: "number",
      defaultValue: 6,
      label: "Aantal diensten",
      admin: { description: "Hoeveel diensten hier getoond worden, in de volgorde die is ingesteld bij Diensten." },
    },
    {
      type: "row",
      fields: [
        { name: "showAllLabel", type: "text", localized: true, label: "Knoptekst \"bekijk alles\"" },
        {
          name: "showAllHref",
          type: "text",
          localized: true,
          label: "Link (URL)",
          admin: { description: "Waar deze knop naartoe verwijst, bijv. /diensten." },
        },
      ],
    },
  ],
};
