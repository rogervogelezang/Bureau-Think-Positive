import type { Block } from "payload";

export const TargetGroupGrid: Block = {
  slug: "targetGroupGrid",
  labels: {
    singular: { nl: "Doelgroepenoverzicht", en: "Target group grid" },
    plural: { nl: "Doelgroepenoverzichten", en: "Target group grids" },
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
      type: "row",
      fields: [
        { name: "showAllLabel", type: "text", localized: true, label: "Knoptekst \"bekijk alles\"" },
        {
          name: "showAllHref",
          type: "text",
          localized: true,
          label: "Link (URL)",
          admin: { description: "Waar deze knop naartoe verwijst, bijv. /over-ons/doelgroep." },
        },
      ],
    },
  ],
};
