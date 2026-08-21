import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath } from "next/cache";

// Based on Payload's official templates/website revalidation hook, extended
// to be locale-aware: this project serves Dutch unprefixed (app/(nl)/...)
// and English under /en (app/en/...), so every path needs revalidating
// twice — once per tree — rather than once per Payload locale.
function pathsForSlug(slug: string): string[] {
  const nlPath = slug === "home" || slug === "" ? "/" : `/${slug}`;
  const enPath = slug === "home" || slug === "" ? "/en" : `/en/${slug}`;
  return [nlPath, enPath];
}

export const revalidatePage: CollectionAfterChangeHook = ({ doc, previousDoc, req: { context } }) => {
  if (context?.disableRevalidate) return doc;

  if (doc._status === "published") {
    for (const path of pathsForSlug(doc.slug)) {
      revalidatePath(path);
    }
  }

  // Slug changed or unpublished — clear out the old path too.
  if (previousDoc?._status === "published" && previousDoc.slug !== doc.slug) {
    for (const path of pathsForSlug(previousDoc.slug)) {
      revalidatePath(path);
    }
  }

  return doc;
};

export const revalidatePageDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (context?.disableRevalidate) return doc;

  for (const path of pathsForSlug(doc.slug)) {
    revalidatePath(path);
  }

  return doc;
};
