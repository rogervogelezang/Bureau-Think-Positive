# This is NOT the Next.js you know

This project runs Next.js 16, a version newer than most training data. Breaking
changes, APIs, and conventions may differ from what you expect. Check
`node_modules/next/dist/docs/` before assuming behavior, and heed deprecation
notices in the terminal output.

# Project shape

- App Router, TypeScript, Tailwind CSS v4 (theme tokens in `app/globals.css`).
- `content/kennisbank/*.mdx` — knowledge-base articles, rendered via `app/kennisbank/[slug]/page.tsx`.
- `lib/supabase/` — auth helpers for the ouderportaal (client/server/proxy split, same pattern as any Supabase+SSR Next.js app).
- Marketing/service pages still avoid stock photography by design (`PlaceholderBlock` for illustration/color blocks). Real, client-provided photos are used where they represent actual people or the actual business: the homepage hero/philosophy photos (`public/onze-filosofie.jpg`, `public/hero-gezin.jpg`) and kernteam headshots (`public/kernteam/*.jpg`). Don't add stock/generic photography elsewhere without asking — only real, client-supplied images.
