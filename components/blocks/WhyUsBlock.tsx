import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import type { WhyUsBlockType } from "@/lib/payloadTypes";

export default function WhyUsBlock({ eyebrow, title, items }: WhyUsBlockType) {
  return (
    <section className="py-16 sm:py-24 bg-primary-light/40">
      <Container>
        {(eyebrow || title) && <SectionHeading align="center" eyebrow={eyebrow ?? undefined} title={title ?? ""} />}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {(items ?? []).map((item) => (
            <div key={item.title} className="card p-8 text-center">
              <h3 className="font-display text-xl font-extrabold text-primary">{item.title}</h3>
              <p className="mt-3 text-sm text-muted text-pretty">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
