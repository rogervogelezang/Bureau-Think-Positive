import type { Block } from "payload";

export const Hero: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Hero blocks" },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "heading", type: "text", required: true, localized: true },
    {
      name: "highlightText",
      type: "text",
      localized: true,
      admin: { description: "A word/phrase within the heading to render in the accent colour, e.g. \"positive\"." },
    },
    { name: "intro", type: "textarea", localized: true },
    {
      type: "row",
      fields: [
        { name: "primaryCtaLabel", type: "text", localized: true },
        {
          name: "primaryCtaHref",
          type: "text",
          localized: true,
          admin: { description: "Internal links need the /en prefix on the English version, e.g. /contact vs /en/contact." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "secondaryCtaLabel", type: "text", localized: true },
        { name: "secondaryCtaHref", type: "text", localized: true },
      ],
    },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};
