import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidatePath } from "next/cache";

// Replaces lib/dienstenContent.ts / lib/dienstenContent.en.ts. Each
// service renders at its own detail page (/diensten/[slug],
// /en/diensten/[slug]) and can also appear in a ServiceGrid block (the
// diensten hub, the homepage) — so a change revalidates all of those
// rather than trying to track exactly which pages embed the block.
export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "slug", "order"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true },
    { name: "label", type: "text", required: true, localized: true },
    { name: "summary", type: "textarea", required: true, localized: true },
    { name: "body", type: "richText", localized: true, editor: lexicalEditor() },
    { name: "order", type: "number", defaultValue: 0 },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidatePath(`/diensten/${doc.slug}`);
        revalidatePath(`/en/diensten/${doc.slug}`);
        revalidatePath("/diensten");
        revalidatePath("/en/diensten");
        revalidatePath("/");
        revalidatePath("/en");
        return doc;
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidatePath(`/diensten/${doc.slug}`);
        revalidatePath(`/en/diensten/${doc.slug}`);
        revalidatePath("/diensten");
        revalidatePath("/en/diensten");
        return doc;
      },
    ],
  },
};
