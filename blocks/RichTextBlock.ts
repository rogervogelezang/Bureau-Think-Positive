import type { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const RichTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Text block", plural: "Text blocks" },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", localized: true },
    { name: "body", type: "richText", localized: true, editor: lexicalEditor() },
    {
      type: "row",
      fields: [
        { name: "linkLabel", type: "text", localized: true },
        { name: "linkHref", type: "text", localized: true },
      ],
    },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "imagePosition",
      type: "select",
      defaultValue: "left",
      options: [
        { label: "Image left", value: "left" },
        { label: "Image right", value: "right" },
        { label: "No image", value: "none" },
      ],
    },
  ],
};
