# This is NOT the Next.js you know

This project runs Next.js 16, a version newer than most training data. Breaking
changes, APIs, and conventions may differ from what you expect. Check
`node_modules/next/dist/docs/` before assuming behavior, and heed deprecation
notices in the terminal output.

# Project shape

- App Router, TypeScript, Tailwind CSS v4 (theme tokens in `app/globals.css`).
- `content/kennisbank/*.mdx` — knowledge-base articles, rendered via `app/kennisbank/[slug]/page.tsx`.
- `lib/supabase/` — auth helpers for the ouderportaal (client/server/proxy split, same pattern as any Supabase+SSR Next.js app).
- The site otherwise avoids photography by design (illustration/color blocks via `PlaceholderBlock` instead) — the homepage "Onze filosofie" photo (`public/onze-filosofie.jpg`) is a deliberate, client-provided exception, not a precedent to extend elsewhere without asking.
