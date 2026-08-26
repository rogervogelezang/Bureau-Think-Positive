import type { CollectionConfig } from "payload";
import { Hero } from "../../blocks/Hero";
import { RichTextBlock } from "../../blocks/RichTextBlock";
import { ServiceGrid } from "../../blocks/ServiceGrid";
import { TargetGroupGrid } from "../../blocks/TargetGroupGrid";
import { TeamGrid } from "../../blocks/TeamGrid";
import { WhyUs } from "../../blocks/WhyUs";
import { CTA } from "../../blocks/CTA";
import { revalidatePage, revalidatePageDelete } from "./hooks/revalidatePage";

// The page builder: every marketing page (starting with the homepage in
// Phase 1) is one of these, an ordered list of blocks. Structure (which
// blocks, in which order) is shared across languages — only the text
// inside each block is localized — so editing content in English can't
// accidentally drift the page layout out of sync with Dutch.
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: { nl: "Pagina", en: "Page" },
    plural: { nl: "Pagina's", en: "Pages" },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    group: { nl: "Inhoud", en: "Content" },
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: "Titel" },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL-pad (slug)",
      admin: {
        description: "Het webadres van deze pagina, zonder schuine streep aan het begin of einde. Gebruik \"home\" voor de homepage.",
      },
    },
    {
      name: "metaTitle",
      type: "text",
      localized: true,
      label: "SEO-titel",
      admin: { description: "Titel die Google in de zoekresultaten toont. Leeg laten om de gewone titel hierboven te gebruiken." },
    },
    {
      name: "metaDescription",
      type: "textarea",
      localized: true,
      label: "SEO-omschrijving",
      admin: { description: "Korte omschrijving die Google onder de titel in de zoekresultaten toont." },
    },
    {
      name: "layout",
      type: "blocks",
      minRows: 1,
      blocks: [Hero, RichTextBlock, ServiceGrid, TargetGroupGrid, TeamGrid, WhyUs, CTA],
      label: "Opbouw van de pagina",
      labels: { singular: { nl: "Blok", en: "Block" }, plural: { nl: "Blokken", en: "Blocks" } },
      admin: {
        description: "De blokken waaruit deze pagina bestaat, van boven naar beneden. Klik op \"Voeg Blok toe\" om een nieuw blok toe te voegen.",
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
};
