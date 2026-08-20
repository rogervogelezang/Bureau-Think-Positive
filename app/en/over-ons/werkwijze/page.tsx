import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Our approach",
  description: "The methodologies behind Bureau Think Positive: the hands-on coach, Triple-C and solution-focused working.",
};

const methodieken = [
  {
    slug: "meewerkend-coach-de-werkwijze",
    title: "The hands-on coach",
    body: "Our programme lead starts by taking on the role of support worker themselves, experiencing the heart of the situation first-hand from the floor. From there, they introduce structure and safety, then gradually move into a coaching role for the team.",
  },
  {
    slug: "methodiek-triple-c",
    title: "Triple-C",
    body: "Focused on restoring everyday life rather than managing problem behaviour: building relationships and competence reduces stress and problem behaviour.",
  },
  {
    slug: "methodiek-oplossingsgericht-werken",
    title: "Solution-focused working",
    body: "The focus isn't on the limits of the problem, but on how people find their own solutions and the possibilities and skills they already have.",
  },
];

export default function WerkwijzePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Our approach"
          title="No-nonsense, project-based and solution-focused"
          intro="We use the principles of modern positive psychology to tap into strengths and overcome obstacles. Years of experience show our approach works: with a single exception, every young person who has completed a programme with us has come out the other side well."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {methodieken.map((m) => (
            <div key={m.slug} className="card p-6 flex flex-col">
              <h3 className="font-display text-lg font-bold text-primary-dark">{m.title}</h3>
              <p className="mt-3 text-sm text-muted text-pretty flex-1">{m.body}</p>
              <Link
                href={`/en/kennisbank/${m.slug}`}
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                Read the full methodology →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 card p-8 sm:p-10">
          <h3 className="font-display text-xl font-extrabold">What you can expect from us</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 text-muted text-pretty leading-relaxed">
            <p>
              We won&apos;t promise it&apos;s easy — working on yourself and your problems takes
              effort. But we stand beside you at every hurdle, and help you focus your attention
              on what does work, rather than dwelling on what doesn&apos;t.
            </p>
            <p>
              We help you make use of your strengths and possibilities, and we also zoom in on
              your problems — because some obstacles simply can&apos;t be avoided. Above all, we
              look and listen to you: realistic, but hopeful.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
