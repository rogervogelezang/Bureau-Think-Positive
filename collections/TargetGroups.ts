import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

// Replaces lib/doelgroepDetails.ts / lib/doelgroepDetails.en.ts.
export const TargetGroups: CollectionConfig = {
  slug: "target-groups",
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
    { name: "intro", type: "textarea", required: true, localized: true },
    {
      name: "bullets",
      type: "array",
      minRows: 1,
      fields: [{ name: "text", type: "text", required: true, localized: true }],
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidatePath(`/over-ons/doelgroep/${doc.slug}`);
        revalidatePath(`/en/over-ons/doelgroep/${doc.slug}`);
        revalidatePath("/over-ons/doelgroep");
        revalidatePath("/en/over-ons/doelgroep");
        return doc;
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidatePath(`/over-ons/doelgroep/${doc.slug}`);
        revalidatePath(`/en/over-ons/doelgroep/${doc.slug}`);
        revalidatePath("/over-ons/doelgroep");
        revalidatePath("/en/over-ons/doelgroep");
        return doc;
      },
    ],
  },
};
