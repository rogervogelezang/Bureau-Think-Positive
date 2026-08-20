import { Manrope, Inter } from "next/font/google";

// Shared by every root layout (app/(nl)/layout.tsx, app/en/layout.tsx) so
// each language's multi-root-layout only loads these once rather than
// duplicating the next/font calls.
export const heading = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});
