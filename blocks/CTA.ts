import type { Block } from "payload";

export const CTA: Block = {
  slug: "cta",
  labels: { singular: "Call to action", plural: "Calls to action" },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", required: true, localized: true },
    { name: "body", type: "textarea", localized: true },
    {
      type: "row",
      fields: [
        { name: "buttonLabel", type: "text", localized: true },
        { name: "buttonHref", type: "text", localized: true },
      ],
    },
    {
      name: "background",
      type: "select",
      defaultValue: "light",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
      ],
    },
  ],
};
