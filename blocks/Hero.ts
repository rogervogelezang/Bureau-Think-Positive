import type { Block } from "payload";

export const Hero: Block = {
  slug: "hero",
  labels: {
    singular: { nl: "Openingsblok", en: "Hero" },
    plural: { nl: "Openingsblokken", en: "Hero blocks" },
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      localized: true,
      label: "Tekst boven de titel",
      admin: { description: "Klein, optioneel tekstje dat boven de hoofdtitel van dit blok verschijnt, bijv. \"ONZE DIENSTEN\"." },
    },
    { name: "heading", type: "text", required: true, localized: true, label: "Titel" },
    {
      name: "highlightText",
      type: "text",
      localized: true,
      label: "Geaccentueerd woord in de titel",
      admin: {
        description: "Een woord of korte zin uit het titelveld hierboven, die in de accentkleur wordt getoond — bijv. \"positief\". Moet exact hetzelfde getypt zijn als in de titel, anders werkt de accentkleur niet.",
      },
    },
    { name: "intro", type: "textarea", localized: true, label: "Introductietekst" },
    {
      type: "row",
      fields: [
        { name: "primaryCtaLabel", type: "text", localized: true, label: "Knoptekst hoofdknop" },
        {
          name: "primaryCtaHref",
          type: "text",
          localized: true,
          label: "Link hoofdknop",
          admin: {
            description: "Waar de knop naartoe verwijst. Voor een pagina op deze site: begin met een schuine streep, bijv. /contact. Let op: bij de Engelse versie van deze pagina moet het pad beginnen met /en/, bijv. /en/contact.",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "secondaryCtaLabel", type: "text", localized: true, label: "Knoptekst tweede knop" },
        {
          name: "secondaryCtaHref",
          type: "text",
          localized: true,
          label: "Link tweede knop",
          admin: { description: "Zelfde als bij de hoofdknop — begin met een schuine streep, en met /en/ op de Engelse pagina." },
        },
      ],
    },
    { name: "image", type: "upload", relationTo: "media", label: "Afbeelding" },
  ],
};
