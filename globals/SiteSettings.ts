import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

// Shared by Header and Footer — the one place to change the logo or the
// business's contact details.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: { nl: "Site-instellingen", en: "Site Settings" },
  admin: {
    group: { nl: "Instellingen", en: "Settings" },
  },
  fields: [
    { name: "logo", type: "upload", relationTo: "media", required: true, label: "Logo" },
    { name: "siteName", type: "text", defaultValue: "Bureau Think Positive", label: "Bedrijfsnaam" },
    { name: "street", type: "text", required: true, label: "Straat en huisnummer" },
    { name: "postalCodeAndCity", type: "text", required: true, label: "Postcode en plaats" },
    { name: "phone", type: "text", required: true, label: "Telefoonnummer" },
  ],
  hooks: {
    afterChange: [
      () => {
        // Every page renders the logo/contact info, so revalidate broadly.
        revalidatePath("/", "layout");
        revalidatePath("/en", "layout");
      },
    ],
  },
};
