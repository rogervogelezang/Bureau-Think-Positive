import type { MetadataRoute } from "next";
import { diensten, doelgroepen } from "@/lib/nav";
import { getAllKennisbankSlugs } from "@/lib/kennisbank";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticPaths = [
    "/",
    "/over-ons",
    "/over-ons/kernteam",
    "/over-ons/werkwijze",
    "/over-ons/doelgroep",
    "/diensten",
    "/kennisbank",
    "/referenties",
    "/contact",
    "/portaal",
    "/voorwaarden",
    "/klachtenprocedure",
  ];

  const dynamicPaths = [
    ...diensten.map((d) => `/diensten/${d.slug}`),
    ...doelgroepen.map((d) => `/over-ons/doelgroep/${d.slug}`),
    ...getAllKennisbankSlugs().map((slug) => `/kennisbank/${slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
