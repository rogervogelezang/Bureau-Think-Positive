import Link from "next/link";
import { diensten, doelgroepen } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary-dark text-white">
      <div className="container-page py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/logo.svg" alt="Bureau Think Positive" className="h-20 w-auto" />
          <p className="mt-3 text-sm text-white/70 text-pretty">
            Specialistische ambulante begeleiding, crisisinterventie en coaching voor jongeren en
            hun gezin. Kleinschalig, korte lijnen, hart voor de jongeren.
          </p>
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
          <p className="text-sm font-bold uppercase tracking-wide text-accent">Diensten</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {diensten.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link href={`/diensten/${d.slug}`} className="hover:text-white">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent">Doelgroep</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {doelgroepen.map((d) => (
              <li key={d.slug}>
                <Link href={`/over-ons/doelgroep/${d.slug}`} className="hover:text-white">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent">Bureau</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <li>
              <Link href="/over-ons/kernteam" className="hover:text-white">
                Het kernteam
              </Link>
            </li>
            <li>
              <Link href="/kennisbank" className="hover:text-white">
                Kennisbank
              </Link>
            </li>
            <li>
              <Link href="/portaal" className="hover:text-white">
                Ouderportaal
              </Link>
            </li>
            <li>
              <Link href="/voorwaarden" className="hover:text-white">
                Algemene voorwaarden
              </Link>
            </li>
            <li>
              <Link href="/klachtenprocedure" className="hover:text-white">
                Klachtenprocedure
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Bureau Think Positive B.V. — KvK 72918500</p>
          <p>SKJ geregistreerd</p>
        </div>
      </div>
    </footer>
  );
}
