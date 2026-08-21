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
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL path with no leading/trailing slash. Use \"home\" for the homepage." },
    },
    { name: "metaTitle", type: "text", localized: true },
    { name: "metaDescription", type: "textarea", localized: true },
    {
      name: "layout",
      type: "blocks",
      minRows: 1,
      blocks: [Hero, RichTextBlock, ServiceGrid, TargetGroupGrid, TeamGrid, WhyUs, CTA],
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
};
