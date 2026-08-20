"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Portal routes have no English mirror (Dutch-only tool for Dutch families
// and staff) — switching to English from there lands on the English
// homepage instead of a non-existent /en/portaal.
const NO_ENGLISH_MIRROR_PREFIXES = ["/portaal"];

function otherLanguageHref(pathname: string, lang: "nl" | "en"): string {
  if (lang === "en") {
    // Strip the leading /en (and nothing else, since every English route is
    // an exact /en-prefixed mirror of its Dutch counterpart by design).
    const nlPath = pathname.replace(/^\/en(?=\/|$)/, "");
    return nlPath === "" ? "/" : nlPath;
  }

  if (NO_ENGLISH_MIRROR_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return "/en";
  }
  return `/en${pathname === "/" ? "" : pathname}`;
}

export default function LanguageSwitcher({ lang, className = "" }: { lang: "nl" | "en"; className?: string }) {
  const pathname = usePathname();
  const href = otherLanguageHref(pathname, lang);

  return (
    <Link
      href={href}
      className={`text-sm font-semibold text-foreground hover:text-primary ${className}`}
      aria-label={lang === "nl" ? "Switch to English" : "Overschakelen naar Nederlands"}
    >
      {lang === "nl" ? "EN" : "NL"}
    </Link>
  );
}
