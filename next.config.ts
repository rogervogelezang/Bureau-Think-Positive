import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { legacyRedirects } from "./lib/legacyRedirects";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return legacyRedirects;
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
