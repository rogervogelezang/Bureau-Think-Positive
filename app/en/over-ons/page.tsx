import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderBlock from "@/components/PlaceholderBlock";

export const metadata: Metadata = {
  title: "About us",
  description: "The story, vision and mission of Bureau Think Positive — active in complex youth care since 2011.",
};

export default function OverOnsPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-4">About Bureau Think Positive</p>
            <h1 className="text-4xl font-extrabold text-balance">Our story</h1>
            <div className="mt-6 flex flex-col gap-4 text-muted text-pretty leading-relaxed">
              <p>
                Bureau Think Positive was founded in 2011 by Roger Vogelezang (BA in Cultural and
                Social Studies, Haagse Hogeschool, 1995) — at the time under the name &lsquo;De
                Crisisspecialist&rsquo; — with the original aim of working with clients stuck in
                complex care — often people with an intellectual disability and considerable
                psychiatric difficulties, facing a (looming) crisis.
              </p>
              <p>
                After years working as an interim aggression coach, sociotherapist and specialist
                psychiatric support worker, the step into self-employment was a logical one:
                tackling crisis situations around youth &amp; family and ensuring stability and
                safety — that&rsquo;s what we&rsquo;re really good at.
              </p>
              <p>
                Since then, the bureau has grown into Bureau Think Positive: a team of driven,
                experienced care professionals, each with their own skills and expertise. We work
                on a project basis and solution-focused, with the aim of getting the young person
                and their support system back on track as quickly as possible.
              </p>
            </div>
          </div>
          <PlaceholderBlock variant="accent" className="h-72 sm:h-96" label="Since 2011" />
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-background-elevated border-y border-border">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Vision" title="People come first, regardless of their role" />
            <div className="mt-6 flex flex-col gap-4 text-muted text-pretty leading-relaxed">
              <p>
                We believe in a world where every person comes first, regardless of who they are
                or what role they play in society — a world where everyone is free to shape their
                own life. We place great value on self-determination: the freedom to live in a
                way you can truly stand behind.
              </p>
              <p>
                That individual freedom goes hand in hand with responsibility for, and
                involvement with, others and your surroundings. Human dignity, justice and
                freedom are central, with a preference for dialogue over dogma.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Mission" title="Providing integrated youth care" />
            <div className="mt-6 flex flex-col gap-4 text-muted text-pretty leading-relaxed">
              <p>
                Integrated youth care is tailored and joined-up: the young person is the starting
                point, and support is kept as light and ordinary as possible, while becoming
                intensive immediately wherever needed. Care is joined-up when expertise from
                different specialisms and sectors is used more effectively and offered together.
              </p>
              <p>
                We&rsquo;re always keen to work together with specialists, both within and outside
                our organisation, so that every young person gets an equal chance to develop.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
