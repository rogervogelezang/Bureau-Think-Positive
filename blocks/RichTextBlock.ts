import type { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const RichTextBlock: Block = {
  slug: "richText",
  labels: {
    singular: { nl: "Tekstblok", en: "Text block" },
    plural: { nl: "Tekstblokken", en: "Text blocks" },
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
    { name: "body", type: "richText", localized: true, editor: lexicalEditor(), label: "Tekst" },
    {
      type: "row",
      fields: [
        { name: "linkLabel", type: "text", localized: true, label: "Linktekst" },
        {
          name: "linkHref",
          type: "text",
          localized: true,
          label: "Link (URL)",
          admin: { description: "Waar de link naartoe verwijst. Voor een pagina op deze site: begin met een schuine streep, bijv. /diensten." },
        },
      ],
    },
    { name: "image", type: "upload", relationTo: "media", label: "Afbeelding" },
    {
      name: "imagePosition",
      type: "select",
      defaultValue: "left",
      label: "Positie van de afbeelding",
      options: [
        { label: "Afbeelding links", value: "left" },
        { label: "Afbeelding rechts", value: "right" },
        { label: "Geen afbeelding", value: "none" },
      ],
    },
  ],
};
