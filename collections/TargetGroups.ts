import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

// Replaces lib/doelgroepDetails.ts / lib/doelgroepDetails.en.ts.
export const TargetGroups: CollectionConfig = {
  slug: "target-groups",
  labels: {
    singular: { nl: "Doelgroep", en: "Target group" },
    plural: { nl: "Doelgroepen", en: "Target groups" },
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "slug", "order"],
    group: { nl: "Inhoud", en: "Content" },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL-onderdeel (slug)",
      admin: {
        description: "Het laatste stukje van het webadres, zonder schuine strepen. Bijv. \"zorginstellingen\" voor de pagina /over-ons/doelgroep/zorginstellingen.",
      },
    },
    {
      name: "label",
      type: "text",
      required: true,
      localized: true,
      label: "Naam van de doelgroep",
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      localized: true,
      label: "Korte samenvatting",
      admin: { description: "Verschijnt in het overzicht van doelgroepen." },
    },
    {
      name: "intro",
      type: "textarea",
      required: true,
      localized: true,
      label: "Introductietekst",
      admin: { description: "Verschijnt bovenaan de eigen pagina van deze doelgroep." },
    },
    {
      name: "bullets",
      type: "array",
      minRows: 1,
      labels: {
        singular: { nl: "Punt", en: "Bullet" },
        plural: { nl: "Punten", en: "Bullets" },
      },
      label: "Puntsgewijze lijst",
      admin: {
        description: "Korte punten die op de doelgroep-pagina met een vinkje worden getoond.",
      },
      fields: [{ name: "text", type: "text", required: true, localized: true, label: "Tekst" }],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: "Volgorde",
      admin: { description: "Bepaalt de volgorde op de website. Laag getal = eerder in de lijst." },
    },
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
