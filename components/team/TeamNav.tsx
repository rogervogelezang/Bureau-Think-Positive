import Link from "next/link";
import { signOutAction } from "@/app/portaal/team/actions";

const BASE_LINKS = [
  { href: "/portaal/team/dashboard", label: "Gezinnen", key: "dashboard" },
  { href: "/portaal/team/agenda", label: "Agenda", key: "agenda" },
  { href: "/portaal/team/updates", label: "Updates", key: "updates" },
];

export default function TeamNav({
  naam,
  isCoordinator,
  active,
}: {
  naam: string;
  isCoordinator: boolean;
  active: string;
}) {
  const links = isCoordinator
    ? [...BASE_LINKS, { href: "/portaal/team/beheer", label: "Beheer", key: "beheer" }]
    : BASE_LINKS;

  return (
    <div className="border-b border-border bg-background-elevated">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
        <nav className="flex flex-wrap gap-1">
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                active === l.key ? "bg-primary text-white" : "text-foreground hover:bg-primary-light"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted">{naam}</span>
          <form action={signOutAction}>
            <button type="submit" className="btn btn-outline text-xs">
              Uitloggen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
