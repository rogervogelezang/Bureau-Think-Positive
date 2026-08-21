import type { CollectionConfig } from "payload";

// Backs every image on the site — team photos, the logo, keurmerken
// badges, block images. Stored via the Vercel Blob adapter in
// payload.config.ts (falls back to local disk in dev when no blob token
// is configured).
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
    },
  ],
  upload: {
    mimeTypes: ["image/*"],
  },
};
