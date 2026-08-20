import Link from "next/link";
import { diensten as diensten_nl, doelgroepen as doelgroepen_nl } from "@/lib/nav";
import { diensten as diensten_en, doelgroepen as doelgroepen_en } from "@/lib/nav.en";

const keurmerken = {
  nl: [
    { src: "/keurmerken/erkend-leerbedrijf.avif", alt: "Erkend leerbedrijf — Wij leiden vakmensen op" },
    { src: "/keurmerken/iso9001.avif", alt: "ISO 9001 gecertificeerd" },
    { src: "/keurmerken/vgct.avif", alt: "VGCt" },
    { src: "/keurmerken/skj.avif", alt: "SKJ Kwaliteitsregister Jeugd" },
  ],
  en: [
    { src: "/keurmerken/erkend-leerbedrijf.avif", alt: "Recognised training company — we train future professionals" },
    { src: "/keurmerken/iso9001.avif", alt: "ISO 9001 certified" },
    { src: "/keurmerken/vgct.avif", alt: "VGCt" },
    { src: "/keurmerken/skj.avif", alt: "SKJ Quality Register for Youth Professionals" },
  ],
};

const COPY = {
  nl: {
    intro:
      "Specialistische ambulante begeleiding, crisisinterventie en coaching voor jongeren en hun gezin. Kleinschalig, korte lijnen, hart voor de jongeren.",
    dienstenHeading: "Diensten",
    doelgroepHeading: "Doelgroep",
    bureauHeading: "Bureau",
    kernteam: { href: "/over-ons/kernteam", label: "Het kernteam" },
    kennisbank: { href: "/kennisbank", label: "Kennisbank" },
    portaal: { href: "/portaal", label: "Ouderportaal" },
    voorwaarden: { href: "/voorwaarden", label: "Algemene voorwaarden" },
    klachtenprocedure: { href: "/klachtenprocedure", label: "Klachtenprocedure" },
    keurmerkenHeading: "Keurmerken",
  },
  en: {
    intro:
      "Specialist outreach support, crisis intervention and coaching for young people and their families. Small-scale, short lines of communication, a heart for young people.",
    dienstenHeading: "Services",
    doelgroepHeading: "Who we help",
    bureauHeading: "About",
    kernteam: { href: "/en/over-ons/kernteam", label: "The core team" },
    kennisbank: { href: "/en/kennisbank", label: "Knowledge base" },
    portaal: { href: "/portaal", label: "Parent portal" },
    voorwaarden: { href: "/en/voorwaarden", label: "Terms and conditions" },
    klachtenprocedure: { href: "/en/klachtenprocedure", label: "Complaints procedure" },
    keurmerkenHeading: "Certifications",
  },
};

export default function Footer({ lang = "nl" }: { lang?: "nl" | "en" }) {
  const diensten = lang === "en" ? diensten_en : diensten_nl;
  const doelgroepen = lang === "en" ? doelgroepen_en : doelgroepen_nl;
  const t = COPY[lang];
  const dienstenBase = lang === "en" ? "/en/diensten" : "/diensten";
  const doelgroepBase = lang === "en" ? "/en/over-ons/doelgroep" : "/over-ons/doelgroep";

  return (
    <footer
      className="mt-24 border-t border-border bg-primary-dark text-white"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="container-page py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/logo.svg" alt="Bureau Think Positive" className="h-[7.5rem] w-auto" />
          <p className="mt-3 text-sm text-white/70 text-pretty">{t.intro}</p>
          <address className="mt-4 not-italic text-sm text-white/70 leading-relaxed">
            Stationsweg 59
            <br />
            2681 SM Honselersdijk
            <br />
            <a href="tel:0648252166" className="hover:text-accent">
              06 48 25 21 66
            </a>
          </address>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent">{t.dienstenHeading}</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {diensten.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link href={`${dienstenBase}/${d.slug}`} className="hover:text-white">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent">{t.doelgroepHeading}</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {doelgroepen.map((d) => (
              <li key={d.slug}>
                <Link href={`${doelgroepBase}/${d.slug}`} className="hover:text-white">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent">{t.bureauHeading}</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <li>
              <Link href={t.kernteam.href} className="hover:text-white">
                {t.kernteam.label}
              </Link>
            </li>
            <li>
              <Link href={t.kennisbank.href} className="hover:text-white">
                {t.kennisbank.label}
              </Link>
            </li>
            <li>
              <Link href={t.portaal.href} className="hover:text-white">
                {t.portaal.label}
              </Link>
            </li>
            <li>
              <Link href={t.voorwaarden.href} className="hover:text-white">
                {t.voorwaarden.label}
              </Link>
            </li>
            <li>
              <Link href={t.klachtenprocedure.href} className="hover:text-white">
                {t.klachtenprocedure.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-8">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">{t.keurmerkenHeading}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {keurmerken[lang].map((k) => (
              <div key={k.alt} className="flex h-16 items-center rounded-[var(--radius-sm)] bg-white px-4 py-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- small local badge images, no next/image benefit */}
                <img src={k.src} alt={k.alt} className="h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Bureau Think Positive B.V. — KvK 72918500</p>
        </div>
      </div>
    </footer>
  );
}
