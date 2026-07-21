import { ReactNode } from "react";
import Link from "next/link";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-md px-6">
        <Link href="/portaal" className="mb-6 inline-block text-sm font-semibold text-primary hover:underline">
          ← Terug naar het ouderportaal
        </Link>
        <div className="card p-8">
          <h1 className="font-display text-2xl font-extrabold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
