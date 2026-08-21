import type { Block } from "payload";

export const TargetGroupGrid: Block = {
  slug: "targetGroupGrid",
  labels: { singular: "Target group grid", plural: "Target group grids" },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", localized: true },
    { name: "intro", type: "textarea", localized: true },
    {
      type: "row",
      fields: [
        { name: "showAllLabel", type: "text", localized: true },
        { name: "showAllHref", type: "text", localized: true },
      ],
    },
  ],
};
