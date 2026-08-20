import type { Metadata } from "next";
import { ViewTransition } from "react";
import { heading, body } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const DEFAULT_DESCRIPTION =
  "Bureau Think Positive biedt specialistische ambulante begeleiding, crisisinterventie en coaching voor jongeren en hun gezin. Kleinschalig, betrokken en oplossingsgericht.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bureau Think Positive — Jeugdzorg met een positieve aanpak",
    template: "%s | Bureau Think Positive",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Bureau Think Positive",
    title: "Bureau Think Positive — Jeugdzorg met een positieve aanpak",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Bureau Think Positive — Jeugdzorg met een positieve aanpak",
    description: DEFAULT_DESCRIPTION,
  },
  alternates: {
    languages: { "nl-NL": "/", "en-US": "/en" },
  },
};

export default function DutchRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" data-scroll-behavior="smooth" className={`${heading.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header lang="nl" />
        <main className="flex-1">
          {/* Header/Footer live outside this boundary on purpose, so they
              stay static — only the page content itself cross-fades between
              routes. See ::view-transition-old/new(*) in globals.css. */}
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Footer lang="nl" />
      </body>
    </html>
  );
}
