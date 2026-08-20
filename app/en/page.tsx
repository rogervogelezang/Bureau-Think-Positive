import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { diensten } from "@/lib/nav.en";

const kenmerken = [
  { title: "Skilled", body: "Years of experience in complex youth care, from crisis intervention to day-to-day support." },
  { title: "Qualified", body: "SKJ-registered and working to the professional standards in youth care." },
  { title: "Reliable", body: "Small-scale, short lines of communication and a no-nonsense mentality — you always know where you stand." },
];

const testimonials = [
  {
    quote:
      "I'm so proud of you! What growth this past year! Thank you so much for all the trust you placed in my boy.",
    author: "C. — mother",
  },
  {
    quote:
      "He's deeply committed to the people he works for. Calm and consistent, decisive and clear, with the ability to take the lead without being the boss.",
    author: "Hans Nouwen — caring support",
  },
  {
    quote:
      "You gave the possibilities that no one else could — a place to be yourself, and to grow and develop.",
    author: "R. — parent",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-4">Bureau Think Positive · Youth Care</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-balance">
              Helping stalled development move forward, with a{" "}
              <span className="text-primary">positive</span> approach
            </h1>
            <p className="mt-6 text-lg text-muted text-pretty">
              We&rsquo;re a team of specialists in complex youth care. From crisis situations
              around young people &amp; families to in-home support and coaching — we provide
              stability, safety and perspective.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/en/contact" className="btn btn-primary">
                Request a free introductory conversation
              </Link>
              <Link href="/en/over-ons" className="btn btn-outline">
                Discover our story
              </Link>
            </div>
          </div>
          <div className="relative h-72 sm:h-96 overflow-hidden rounded-[var(--radius-lg)]">
            <Image
              src="/hero-gezin.jpg"
              alt="Family together — mother, father and teenager"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 bg-background-elevated border-y border-border">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative h-64 sm:h-80 order-last lg:order-first overflow-hidden rounded-[var(--radius-lg)]">
            <Image
              src="/onze-filosofie.jpg"
              alt="A boy grows up from baby to young adult"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our philosophy"
              title="Join us on a journey of discovery and become who you are"
            />
            <p className="mt-6 text-muted text-pretty leading-relaxed">
              Growing up isn&rsquo;t easy. For most young people, it can feel more like an
              obstacle course — sometimes so tough that you feel like you&rsquo;re facing it alone.
              That&rsquo;s why we founded Bureau Think Positive: to help in a way that actually
              works for you, so you can move past the hard times and find your enthusiasm again.
            </p>
            <p className="mt-4 text-muted text-pretty leading-relaxed">
              We won&rsquo;t promise it&rsquo;s easy — working on yourself takes effort. But we stand
              beside you at every hurdle, and help you focus on what does work. Think Positive is
              not a slogan, it&rsquo;s a way of life.
            </p>
            <Link href="/en/over-ons" className="mt-6 inline-block font-semibold text-primary hover:underline">
              Read our full story →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="A comprehensive range of care services"
            intro="From specialised in-home support to programmes for young people who have hit a dead end — project-based and solution-focused."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diensten.slice(0, 6).map((d) => (
              <Link
                key={d.slug}
                href={`/en/diensten/${d.slug}`}
                className="card p-6 hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <h3 className="font-display text-lg font-bold text-primary-dark">{d.label}</h3>
                <p className="mt-2 text-sm text-muted text-pretty">{d.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/en/diensten" className="btn btn-secondary">
              View all services
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 bg-primary-light/40">
        <Container>
          <SectionHeading align="center" eyebrow="Why Bureau Think Positive" title="Why choose us?" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {kenmerken.map((k) => (
              <div key={k.title} className="card p-8 text-center">
                <h3 className="font-display text-xl font-extrabold text-primary">{k.title}</h3>
                <p className="mt-3 text-sm text-muted text-pretty">{k.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/en/contact" className="btn btn-primary">
              Request a free introductory conversation now
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="What others say" title="A few references" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.author} {...t} />
            ))}
          </div>
          <Link href="/en/referenties" className="mt-8 inline-block font-semibold text-primary hover:underline">
            Read more references →
          </Link>
        </Container>
      </section>

      <section className="py-16 sm:py-24 bg-primary-dark text-white">
        <Container className="flex flex-col items-center text-center gap-6">
          <p className="eyebrow text-accent">Our drawing partner</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Super Kids</h2>
          <p className="max-w-xl text-white/70">No capabilities, only possibilities.</p>
        </Container>
      </section>
    </>
  );
}
