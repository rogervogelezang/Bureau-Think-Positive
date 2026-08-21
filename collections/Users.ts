import type { CollectionConfig } from "payload";

// Payload's own auth system — unrelated to the Supabase auth this project
// used to have for the (now removed) ouderportaal. This is the client's
// login for /admin.
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [],
};
