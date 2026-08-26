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
  labels: {
    singular: { nl: "Dienst", en: "Service" },
    plural: { nl: "Diensten", en: "Services" },
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
        description: "Het laatste stukje van het webadres, zonder schuine strepen. Bijv. \"ambulante-begeleiding\" voor de pagina /diensten/ambulante-begeleiding. Alleen kleine letters, cijfers en streepjes.",
      },
    },
    {
      name: "label",
      type: "text",
      required: true,
      localized: true,
      label: "Naam van de dienst",
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      localized: true,
      label: "Korte samenvatting",
      admin: { description: "Verschijnt in overzichten, bijv. op de homepage en de Diensten-pagina." },
    },
    {
      name: "body",
      type: "richText",
      localized: true,
      editor: lexicalEditor(),
      label: "Volledige beschrijving",
      admin: { description: "De uitgebreide tekst op de eigen pagina van deze dienst." },
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
