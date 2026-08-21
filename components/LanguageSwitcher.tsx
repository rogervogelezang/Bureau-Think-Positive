"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function otherLanguageHref(pathname: string, lang: "nl" | "en"): string {
  if (lang === "en") {
    // Strip the leading /en (and nothing else, since every English route is
    // an exact /en-prefixed mirror of its Dutch counterpart by design).
    const nlPath = pathname.replace(/^\/en(?=\/|$)/, "");
    return nlPath === "" ? "/" : nlPath;
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
