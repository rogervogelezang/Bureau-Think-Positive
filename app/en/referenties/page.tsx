import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Experiences from parents and families who have been supported by Bureau Think Positive.",
};

const testimonials = [
  {
    quote:
      "I have seen how he handled highly threatening situations and aggression. He can respond adequately and at the right moment to situations like these.",
    author: "Hannie de Bie — ILO psychologist, Ontwikkeling & Leren",
  },
  {
    quote:
      "I know Roger as open-minded and genuinely interested in people. He has a strongly developed sense of empathy, but also isn't afraid to say things straight.",
    author: "Jeroen Duijvestein — manager at G. Fisher",
  },
  {
    quote:
      "He is very committed to the people he works for. He is calm and consistent, decisive, clear, and has the ability to be in charge without being bossy about it. He reads people and situations well, which means he responds before things escalate.",
    author: "Hans Nouwen — caring guidance",
  },
  {
    quote:
      "I came to know Roger as a calm person with a great deal of work experience in crisis situations, who connects with the client in a calm yet clear way. Through observation, feedback, and actively thinking along with and coaching our support workers, he made a clear contribution to resolving the crisis situation that had arisen.",
    author: "Sandra Crone — lead worker, De Seisoenen",
  },
  {
    quote:
      "I'm so proud of you all! What growth this past year! Thank you so much for all the trust you had in my guy, and above all for the trust you gave him! I don't think there are many children who have grown so much in such a short time.",
    author: "C. — mother",
  },
  {
    quote:
      "What amazing steps you've taken, what tremendous growth, so many years of guidance, and certainly a huge contribution to his self-image, growth and development. You were also there for us as parents time and again, and I'm so grateful to you for searching together for what was always best.",
    author: "M. — parent",
  },
  {
    quote:
      "His buddy, his friend… What a great, wonderful support worker who is always there for him! His steady support worker for so long already, and so much been through together!",
    author: "H. — parent",
  },
  {
    quote:
      "You gave and offered the possibilities that no one else could give — literally by offering a space, but certainly also by giving room to go at his own pace. A place to be himself, and to be allowed to grow and develop.",
    author: "R. — parent",
  },
  {
    quote:
      "You gave the possibilities that no one else could give — a place to be himself, and to be allowed to grow and develop. We could never have achieved this without you!",
    author: "A. — mother",
  },
];

export default function ReferentiesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="What others say"
          title="Some testimonials"
          intro="From fellow professionals to parents who went through the programme themselves."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
