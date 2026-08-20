import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Complaints procedure",
  description: "How Bureau Think Positive handles complaints, and how you can file one.",
};

const stappen = [
  {
    title: "Step 1 — Discuss the complaint with the care provider involved",
    body: "First raise the complaint with the care provider or staff member concerned — in most cases it can be resolved in a direct conversation. Respond to the issue as soon as possible, request a meeting if needed, and consider putting the complaint briefly and clearly in writing. If you're unable to resolve it this way, please contact our care coordinator, Roger Vogelezang.",
  },
  {
    title: "Step 2 — Raise the complaint with the complaints officer",
    body: "Our independent complaints officer is Mark van Onselen. He can inform and support you, and mediate with the care provider. A complaint doesn't need to be reported in writing straight away — it can also be raised verbally, for example by phone. If the complaint is submitted in writing, a statutory response period of six weeks applies (with a possible extension of four weeks).",
  },
  {
    title: "Step 3 — Submit the complaint in writing to the complaints committee",
    body: "If the complaint cannot be resolved to your satisfaction, you can submit an official complaint to the complaints committee. Our organisation is affiliated with the complaints committee of CBKZ, which investigates through a hearing of both parties and rules the complaint founded or unfounded.",
  },
  {
    title: "Step 4 — Submit your complaint to the disputes committee",
    body: "If the complaint is not resolved, or not resolved sufficiently, the next step is the independent disputes committee of CBKZ. Please note: this is only possible after the complaint has first been submitted to Bureau Think Positive, and the disputes committee's ruling is binding — appeal or recourse to the courts is no longer possible afterwards. The procedure is, however, faster and less costly than proceedings through the courts.",
  },
];

export default function KlachtenprocedurePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-4">Complaints procedure</p>
        <h1 className="text-4xl font-extrabold text-balance">Not satisfied? Here are your steps</h1>
        <p className="mt-6 text-muted text-pretty leading-relaxed">
          At Bureau Think Positive, we do our best to deliver our services as well as we possibly
          can. Even so, there may be times when you&rsquo;re not satisfied with how things went —
          below are the steps you can take as a client in that case.
        </p>

        <div className="mt-12 flex flex-col gap-6">
          {stappen.map((s, i) => (
            <div key={s.title} className="card p-6 flex gap-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-display font-extrabold text-primary-dark">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-primary-dark">{s.title}</h2>
                <p className="mt-2 text-sm text-muted text-pretty leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
