import type { Block } from "payload";

export const ServiceGrid: Block = {
  slug: "serviceGrid",
  labels: { singular: "Service grid", plural: "Service grids" },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", localized: true },
    { name: "intro", type: "textarea", localized: true },
    { name: "limit", type: "number", defaultValue: 6, admin: { description: "How many services to show, in their configured order." } },
    {
      type: "row",
      fields: [
        { name: "showAllLabel", type: "text", localized: true },
        { name: "showAllHref", type: "text", localized: true },
      ],
    },
  ],
};
