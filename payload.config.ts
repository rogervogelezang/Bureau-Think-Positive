import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { nl } from "@payloadcms/translations/languages/nl";
import { en } from "@payloadcms/translations/languages/en";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Services } from "./collections/Services";
import { TargetGroups } from "./collections/TargetGroups";
import { TeamMembers } from "./collections/TeamMembers";
import { SiteSettings } from "./globals/SiteSettings";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Local dev has no external database available in this environment, so it
// runs on a zero-setup SQLite file by default. The moment a real
// DATABASE_URL is set (a Neon/Postgres connection string — required for
// production on Vercel, since SQLite's file wouldn't persist across
// serverless invocations), this switches to Postgres automatically. Same
// adapter interface either way, so nothing else in this config changes.
const db = process.env.DATABASE_URL
  ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } })
  : sqliteAdapter({ client: { url: `file:${path.resolve(dirname, "payload-dev.db")}` } });

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "dev-only-insecure-secret-change-in-production",
  db,
  editor: lexicalEditor(),
  admin: {
    components: {
      graphics: {
        Logo: "/components/admin/AdminLogo#AdminLogo",
        Icon: "/components/admin/AdminIcon#AdminIcon",
      },
    },
  },
  i18n: {
    fallbackLanguage: "nl",
    supportedLanguages: { nl, en },
  },
  // Order here drives both the sidebar group order and item order within
  // each group — Pages first since it's the most-edited content.
  collections: [Pages, Services, TargetGroups, TeamMembers, Users, Media],
  globals: [SiteSettings, Header, Footer],
  localization: {
    locales: [
      { label: "Nederlands", code: "nl" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "nl",
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // Only wired up once a real token exists (set by Vercel automatically
  // when Blob storage is attached to the project) — without it, uploads
  // fall back to local disk, which is fine for local development.
  plugins: process.env.BLOB_READ_WRITE_TOKEN
    ? [
        vercelBlobStorage({
          collections: { media: true },
          token: process.env.BLOB_READ_WRITE_TOKEN,
          clientUploads: true,
        }),
      ]
    : [],
});
