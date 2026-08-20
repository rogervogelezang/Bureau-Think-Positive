import type { Metadata } from "next";
import { ViewTransition } from "react";
import { heading, body } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const DEFAULT_DESCRIPTION =
  "Bureau Think Positive provides specialist outreach support, crisis intervention and coaching for young people and their families. Small-scale, personal and solution-focused.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bureau Think Positive — Youth care with a positive approach",
    template: "%s | Bureau Think Positive",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bureau Think Positive",
    title: "Bureau Think Positive — Youth care with a positive approach",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Bureau Think Positive — Youth care with a positive approach",
    description: DEFAULT_DESCRIPTION,
  },
  alternates: {
    languages: { "nl-NL": "/", "en-US": "/en" },
  },
};

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header lang="en" />
        <main className="flex-1">
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Footer lang="en" />
      </body>
    </html>
  );
}
