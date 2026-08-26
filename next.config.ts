import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { withPayload } from "@payloadcms/next/withPayload";
import { legacyRedirects } from "./lib/legacyRedirects";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return legacyRedirects;
  },
  // Powers the soft cross-fade between pages — see <ViewTransition> in
  // app/(nl)/layout.tsx and app/en/layout.tsx, and the
  // ::view-transition-old/new(*) rules in app/globals.css.
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({});

export default withPayload(withMDX(nextConfig));
