import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

// Name/photo aren't language-specific; role and bio are.
export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: {
    singular: { nl: "Teamlid", en: "Team member" },
    plural: { nl: "Teamleden", en: "Team members" },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    group: { nl: "Inhoud", en: "Content" },
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Naam", admin: { description: "Hetzelfde in beide talen." } },
    { name: "role", type: "text", required: true, localized: true, label: "Functie" },
    { name: "email", type: "email", label: "E-mailadres" },
    { name: "bio", type: "textarea", localized: true, label: "Korte biografie" },
    { name: "photo", type: "upload", relationTo: "media", label: "Foto", admin: { description: "Hetzelfde in beide talen." } },
    { name: "order", type: "number", defaultValue: 0, label: "Volgorde", admin: { description: "Bepaalt de volgorde op de website. Laag getal = eerder in de lijst." } },
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
