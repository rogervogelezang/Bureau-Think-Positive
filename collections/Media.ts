import type { CollectionConfig } from "payload";

// Backs every image on the site — team photos, the logo, keurmerken
// badges, block images. Stored via the Vercel Blob adapter in
// payload.config.ts (falls back to local disk in dev when no blob token
// is configured).
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: { nl: "Afbeelding", en: "Media" },
    plural: { nl: "Afbeeldingen", en: "Media" },
  },
  admin: {
    group: { nl: "Gebruikers en media", en: "Users and Media" },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      label: "Alternatieve tekst",
      admin: {
        description: "Korte omschrijving van de afbeelding, voor schermlezers en als de afbeelding niet kan laden. Bijv. \"Roger Vogelezang, oprichter\".",
      },
    },
  ],
  upload: {
    mimeTypes: ["image/*"],
  },
};
