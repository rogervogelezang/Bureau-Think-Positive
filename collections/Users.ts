import type { CollectionConfig } from "payload";

// Payload's own auth system — unrelated to the Supabase auth this project
// used to have for the (now removed) ouderportaal. This is the client's
// login for /admin.
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: {
    singular: { nl: "Gebruiker", en: "User" },
    plural: { nl: "Gebruikers", en: "Users" },
  },
  admin: {
    useAsTitle: "email",
    group: { nl: "Gebruikers en media", en: "Users and Media" },
  },
  fields: [],
};
