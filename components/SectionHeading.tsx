export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  // Defaults to h2 (a section heading within a page that has its own h1
  // elsewhere). Pass as="h1" when this is a page's sole/primary heading —
  // see the pages that do so for why: without it those pages had no h1 at all.
  as?: "h1" | "h2";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Heading className="text-3xl sm:text-4xl font-extrabold text-foreground text-balance">{title}</Heading>
      {intro && <p className="mt-4 text-lg text-muted text-pretty">{intro}</p>}
    </div>
  );
}
