import type { Block } from "payload";

export const CTA: Block = {
  slug: "cta",
  labels: {
    singular: { nl: "Oproepblok", en: "Call to action" },
    plural: { nl: "Oproepblokken", en: "Calls to action" },
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      label: "Tekst boven de titel",
      admin: { description: "Klein, optioneel tekstje dat boven de hoofdtitel van dit blok verschijnt, bijv. \"ONZE DIENSTEN\"." },
    },
    { name: "title", type: "text", required: true, localized: true, label: "Titel" },
    { name: "body", type: "textarea", localized: true, label: "Tekst" },
    {
      type: "row",
      fields: [
        { name: "buttonLabel", type: "text", localized: true, label: "Knoptekst" },
        {
          name: "buttonHref",
          type: "text",
          localized: true,
          label: "Link (URL)",
          admin: { description: "Waar de knop naartoe verwijst. Voor een pagina op deze site: begin met een schuine streep, bijv. /contact." },
        },
      ],
    },
    {
      name: "background",
      type: "select",
      defaultValue: "light",
      label: "Achtergrondkleur",
      options: [
        { label: "Licht", value: "light" },
        { label: "Donker", value: "dark" },
      ],
    },
  ],
};
