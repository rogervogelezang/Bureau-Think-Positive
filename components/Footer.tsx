import Link from "next/link";
import type { FooterGlobal, SiteSettingsGlobal, Media } from "@/lib/payloadTypes";
import type { Service, TargetGroup } from "@/lib/payloadTypes";

const ADMIN_LABEL = { nl: "Beheer site", en: "Manage site" };

export default function Footer({
  lang = "nl",
  siteSettings,
  footer,
  services,
  targetGroups,
}: {
  lang?: "nl" | "en";
  siteSettings: SiteSettingsGlobal;
  footer: FooterGlobal;
  services: Service[];
  targetGroups: TargetGroup[];
}) {
  const logo = typeof siteSettings.logo === "object" ? (siteSettings.logo as Media) : null;
  const dienstenBase = lang === "en" ? "/en/diensten" : "/diensten";
  const doelgroepBase = lang === "en" ? "/en/over-ons/doelgroep" : "/over-ons/doelgroep";

  return (
    <footer
      className="mt-24 border-t border-border bg-primary-dark text-white"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="container-page py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {logo?.url && <img src={logo.url} alt={logo.alt} className="h-[7.5rem] w-auto" />}
          <p className="mt-3 text-sm text-white/70 text-pretty">{footer.intro}</p>
          <address className="mt-4 not-italic text-sm text-white/70 leading-relaxed">
            {siteSettings.street}
            <br />
            {siteSettings.postalCodeAndCity}
            <br />
            <a href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`} className="hover:text-accent">
              {siteSettings.phone}
            </a>
          </address>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent">{footer.dienstenHeading}</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {services.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link href={`${dienstenBase}/${d.slug}`} className="hover:text-white">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent">{footer.doelgroepHeading}</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {targetGroups.map((d) => (
              <li key={d.slug}>
                <Link href={`${doelgroepBase}/${d.slug}`} className="hover:text-white">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent">{footer.bureauHeading}</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {(footer.bureauLinks ?? []).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(footer.keurmerken ?? []).length > 0 && (
        <div className="border-t border-white/10 py-8">
          <div className="container-page">
            {footer.keurmerkenHeading && <p className="text-xs font-bold uppercase tracking-wide text-white/50">{footer.keurmerkenHeading}</p>}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {(footer.keurmerken ?? []).map((k, i) => {
                const img = typeof k.image === "object" ? (k.image as Media) : null;
                if (!img?.url) return null;
                return (
                  <div key={i} className="flex h-16 items-center rounded-[var(--radius-sm)] bg-white px-4 py-2">
                    <img src={img.url} alt={k.alt} className="h-full w-auto object-contain" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} {siteSettings.siteName ?? "Bureau Think Positive"} B.V. — KvK 72918500</p>
          <Link
            href="/admin"
            className="rounded-full border border-white/20 px-4 py-1.5 font-semibold text-white/70 hover:border-white/40 hover:text-white transition"
          >
            {ADMIN_LABEL[lang]}
          </Link>
        </div>
      </div>
    </footer>
  );
}
