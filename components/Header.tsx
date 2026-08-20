"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNav as mainNavNl } from "@/lib/nav";
import { mainNav as mainNavEn } from "@/lib/nav.en";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const COPY = {
  nl: {
    home: "/",
    portaal: { href: "/portaal", label: "Ouderportaal" },
    contact: { href: "/contact", label: "Neem contact op" },
    submenuLabel: (label: string) => `${label} submenu tonen`,
  },
  en: {
    home: "/en",
    portaal: { href: "/portaal", label: "Parent portal" },
    contact: { href: "/en/contact", label: "Get in touch" },
    submenuLabel: (label: string) => `Show ${label} submenu`,
  },
};

export default function Header({ lang = "nl" }: { lang?: "nl" | "en" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const mainNav = lang === "en" ? mainNavEn : mainNavNl;
  const t = COPY[lang];

  function toggleExpanded(href: string) {
    setExpanded((prev) => ({ ...prev, [href]: !prev[href] }));
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="container-page flex h-28 items-center justify-between">
        <Link href={t.home} className="flex items-center">
          <img src="/logo.svg" alt="Bureau Think Positive" className="h-24 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary-light hover:text-primary-dark"
              >
                {item.label}
                {item.children && (
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="card min-w-64 p-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium text-foreground hover:bg-primary-light hover:text-primary-dark"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher lang={lang} />
          <Link href={t.portaal.href} className="btn btn-outline text-sm">
            {t.portaal.label}
          </Link>
          <Link href={t.contact.href} className="btn btn-primary text-sm">
            {t.contact.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border"
          aria-expanded={mobileOpen}
          aria-label="Menu"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
            <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <div className="container-page py-4 flex flex-col gap-1">
            {mainNav.map((item) => (
              <div key={item.href} className="mb-1">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-[var(--radius-sm)] px-3 py-2 font-semibold text-foreground"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(item.href)}
                      aria-expanded={!!expanded[item.href]}
                      aria-label={t.submenuLabel(item.label)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center text-muted"
                    >
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        aria-hidden
                        className={`transition-transform ${expanded[item.href] ? "rotate-180" : ""}`}
                      >
                        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && expanded[item.href] && (
                  <div className="ml-3 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-[var(--radius-sm)] px-3 py-1.5 text-sm text-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between px-3">
              <span className="text-sm text-muted">{lang === "nl" ? "Taal" : "Language"}</span>
              <LanguageSwitcher lang={lang} />
            </div>
            <Link href={t.portaal.href} onClick={() => setMobileOpen(false)} className="btn btn-outline mt-2 w-full">
              {t.portaal.label}
            </Link>
            <Link href={t.contact.href} onClick={() => setMobileOpen(false)} className="btn btn-primary mt-2 w-full">
              {t.contact.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
