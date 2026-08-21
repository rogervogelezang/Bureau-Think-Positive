import Link from "next/link";
import Container from "@/components/Container";
import type { CTABlockType } from "@/lib/payloadTypes";

export default function CTABlock({ eyebrow, title, body, buttonLabel, buttonHref, background }: CTABlockType) {
  const dark = background === "dark";

  return (
    <section className={`py-16 sm:py-24 ${dark ? "bg-primary-dark text-white" : ""}`}>
      <Container className="flex flex-col items-center text-center gap-4">
        {eyebrow && <p className={`eyebrow ${dark ? "text-accent" : ""}`}>{eyebrow}</p>}
        <h2 className={dark ? "text-2xl sm:text-3xl font-extrabold" : "text-2xl sm:text-3xl font-extrabold text-foreground"}>{title}</h2>
        {body && <p className={`max-w-xl ${dark ? "text-white/70" : "text-muted"}`}>{body}</p>}
        {buttonLabel && buttonHref && (
          <Link href={buttonHref} className={`btn mt-2 ${dark ? "btn-outline border-white text-white hover:bg-white hover:text-primary-dark" : "btn-primary"}`}>
            {buttonLabel}
          </Link>
        )}
      </Container>
    </section>
  );
}
