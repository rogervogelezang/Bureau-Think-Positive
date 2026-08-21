import type { MetadataRoute } from "next";
import { diensten, doelgroepen } from "@/lib/nav";
import { getAllKennisbankSlugs } from "@/lib/kennisbank";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // Every one of these has an /en-prefixed English mirror at the same
  // segment/slug (see the i18n plan).
  const translatedStaticPaths = [
    "/",
    "/over-ons",
    "/over-ons/kernteam",
    "/over-ons/werkwijze",
    "/over-ons/doelgroep",
    "/diensten",
    "/kennisbank",
    "/referenties",
    "/contact",
    "/voorwaarden",
    "/klachtenprocedure",
  ];

  const translatedDynamicPaths = [
    ...diensten.map((d) => `/diensten/${d.slug}`),
    ...doelgroepen.map((d) => `/over-ons/doelgroep/${d.slug}`),
    ...getAllKennisbankSlugs().map((slug) => `/kennisbank/${slug}`),
  ];

  const allPaths = [...translatedStaticPaths, ...translatedDynamicPaths];
  const enPaths = allPaths.map((path) => (path === "/" ? "/en" : `/en${path}`));

  return [...allPaths, ...enPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
