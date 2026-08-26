import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    { name: "intro", type: "textarea", required: true, localized: true },
    { name: "dienstenHeading", type: "text", required: true, localized: true },
    { name: "doelgroepHeading", type: "text", required: true, localized: true },
    { name: "bureauHeading", type: "text", required: true, localized: true },
    {
      name: "bureauLinks",
      type: "array",
      admin: { description: "e.g. Het kernteam, Kennisbank, Algemene voorwaarden, Klachtenprocedure" },
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "href", type: "text", required: true, localized: true },
      ],
    },
    { name: "keurmerkenHeading", type: "text", localized: true },
    {
      name: "keurmerken",
      type: "array",
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "alt", type: "text", required: true, localized: true },
      ],
    },
    {
      name: "facebookUrl",
      type: "text",
      admin: { description: "Volledige link naar de Facebook-pagina, bijv. https://facebook.com/bureauthinkpositive. Leeg laten om het icoon te verbergen." },
    },
    {
      name: "instagramUrl",
      type: "text",
      admin: { description: "Volledige link naar het Instagram-profiel, bijv. https://instagram.com/bureauthinkpositive. Leeg laten om het icoon te verbergen." },
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidatePath("/", "layout");
        revalidatePath("/en", "layout");
      },
    ],
  },
};
