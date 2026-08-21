import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

// Shared by Header and Footer — the one place to change the logo or the
// business's contact details.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  fields: [
    { name: "logo", type: "upload", relationTo: "media", required: true },
    { name: "siteName", type: "text", defaultValue: "Bureau Think Positive" },
    { name: "street", type: "text", required: true },
    { name: "postalCodeAndCity", type: "text", required: true },
    { name: "phone", type: "text", required: true },
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
