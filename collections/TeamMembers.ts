import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

// Name/photo aren't language-specific; role and bio are.
export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true, localized: true },
    { name: "bio", type: "textarea", localized: true },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidatePath("/over-ons/kernteam");
        revalidatePath("/en/over-ons/kernteam");
      },
    ],
    afterDelete: [
      () => {
        revalidatePath("/over-ons/kernteam");
        revalidatePath("/en/over-ons/kernteam");
      },
    ],
  },
};
