"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SectionSubNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  return (
    <div className="border-b border-border bg-primary-light/40" style={{ viewTransitionName: "section-subnav" }}>
      <div className="container-page flex gap-1 overflow-x-auto py-3">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                active ? "bg-primary text-white" : "text-primary-dark hover:bg-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
