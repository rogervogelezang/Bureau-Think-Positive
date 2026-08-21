# This is NOT the Next.js you know

This project runs Next.js 16, a version newer than most training data. Breaking
changes, APIs, and conventions may differ from what you expect. Check
`node_modules/next/dist/docs/` before assuming behavior, and heed deprecation
notices in the terminal output.

# Project shape

- App Router, TypeScript, Tailwind CSS v4 (theme tokens in `app/globals.css`).
- `app/(nl)/` — Dutch routes (a route group, invisible in the URL — `/over-ons` etc. are unprefixed). `app/en/` — the English mirror, real `/en/...` URLs. Each has its own root layout (`<html lang>`, Header/Footer) since Next.js requires that for multiple root layouts sharing no common one.
- `content/kennisbank/*.mdx` (Dutch) / `content/kennisbank-en/*.mdx` (English) — knowledge-base articles, same slugs in both, rendered via `app/(nl)/kennisbank/[slug]/page.tsx` / `app/en/kennisbank/[slug]/page.tsx`.
- Marketing/service pages still avoid stock photography by design (`PlaceholderBlock` for illustration/color blocks). Real, client-provided photos are used where they represent actual people or the actual business: the homepage hero/philosophy photos (`public/onze-filosofie.jpg`, `public/hero-gezin.jpg`) and kernteam headshots (`public/kernteam/*.jpg`). Don't add stock/generic photography elsewhere without asking — only real, client-supplied images.
