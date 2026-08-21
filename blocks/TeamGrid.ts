import type { Block } from "payload";

export const TeamGrid: Block = {
  slug: "teamGrid",
  labels: { singular: "Team grid", plural: "Team grids" },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", localized: true },
    { name: "intro", type: "textarea", localized: true },
  ],
};
