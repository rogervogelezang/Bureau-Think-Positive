import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

// Drives the nav bar. navItems is what lets the client add a new page to
// navigation herself once she's created it — no developer needed.
export const Header: GlobalConfig = {
  slug: "header",
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "href", type: "text", required: true, localized: true },
        {
          name: "children",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true, localized: true },
            { name: "href", type: "text", required: true, localized: true },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "contactCtaLabel", type: "text", localized: true },
        { name: "contactCtaHref", type: "text", localized: true },
      ],
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidatePath("/", "layout");
        revalidatePath("/en", "layout");
      },
    ],
  },
};
