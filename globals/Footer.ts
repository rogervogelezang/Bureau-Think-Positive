import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: { nl: "Footer", en: "Footer" },
  admin: {
    group: { nl: "Instellingen", en: "Settings" },
  },
  fields: [
    {
      name: "intro",
      type: "textarea",
      required: true,
      localized: true,
      label: "Introductietekst",
      admin: { description: "Korte tekst bovenaan de footer, boven de kolommen." },
    },
    {
      name: "dienstenHeading",
      type: "text",
      required: true,
      localized: true,
      label: "Titel diensten-kolom",
      admin: {
        description: "De titel boven de lijst met diensten in de footer. De diensten zelf beheer je niet hier, maar bij \"Diensten\" in het menu links.",
      },
    },
    {
      name: "doelgroepHeading",
      type: "text",
      required: true,
      localized: true,
      label: "Titel doelgroepen-kolom",
      admin: {
        description: "De titel boven de lijst met doelgroepen in de footer. De doelgroepen zelf beheer je niet hier, maar bij \"Doelgroepen\" in het menu links.",
      },
    },
    {
      name: "bureauHeading",
      type: "text",
      required: true,
      localized: true,
      label: "Titel bureau-kolom",
      admin: {
        description: "De titel boven de kolom met interne links. De links zelf voeg je hieronder toe, bij \"Bureau-links\".",
      },
    },
    {
      name: "bureauLinks",
      type: "array",
      labels: {
        singular: { nl: "Link", en: "Link" },
        plural: { nl: "Bureau-links", en: "Bureau links" },
      },
      label: "Bureau-links",
      admin: {
        description: "e.g. Het kernteam, Kennisbank, Algemene voorwaarden, Klachtenprocedure",
      },
      fields: [
        { name: "label", type: "text", required: true, localized: true, label: "Tekst" },
        {
          name: "href",
          type: "text",
          required: true,
          localized: true,
          label: "Link (URL)",
          admin: { description: "Voor een pagina op deze site: begin met een schuine streep, bijv. /over-ons/kernteam." },
        },
      ],
    },
    {
      name: "keurmerkenHeading",
      type: "text",
      localized: true,
      label: "Titel keurmerken",
      admin: {
        description: "De titel boven de keurmerk-logo's onderaan de website. Optioneel — leeg laten als je geen titel wilt tonen.",
      },
    },
    {
      name: "keurmerken",
      type: "array",
      labels: {
        singular: { nl: "Keurmerk", en: "Certification" },
        plural: { nl: "Keurmerk-logo's", en: "Certifications" },
      },
      label: "Keurmerk-logo's",
      admin: {
        description: "Eén rij per logo: een afbeelding plus een korte omschrijving (voor toegankelijkheid, niet zichtbaar voor bezoekers).",
      },
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true, label: "Logo-afbeelding" },
        { name: "alt", type: "text", required: true, localized: true, label: "Omschrijving (niet zichtbaar)" },
      ],
    },
    {
      name: "facebookUrl",
      type: "text",
      label: "Facebook-link",
      admin: {
        description: "Volledige link naar de Facebook-pagina, bijv. https://facebook.com/bureauthinkpositive. Leeg laten om het icoon te verbergen.",
      },
    },
    {
      name: "instagramUrl",
      type: "text",
      label: "Instagram-link",
      admin: {
        description: "Volledige link naar het Instagram-profiel, bijv. https://instagram.com/bureauthinkpositive. Leeg laten om het icoon te verbergen.",
      },
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
