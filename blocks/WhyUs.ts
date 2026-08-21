import type { Block } from "payload";

export const WhyUs: Block = {
  slug: "whyUs",
  labels: { singular: "\"Why us\" cards", plural: "\"Why us\" cards" },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", localized: true },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true, localized: true },
        { name: "body", type: "textarea", required: true, localized: true },
      ],
    },
  ],
};
