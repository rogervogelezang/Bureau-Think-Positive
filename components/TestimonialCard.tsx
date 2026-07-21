export default function TestimonialCard({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <figure className="card p-6 flex flex-col gap-4">
      <blockquote className="text-foreground text-pretty leading-relaxed">
        “{quote}”
      </blockquote>
      <figcaption className="text-sm font-semibold text-primary mt-auto">{author}</figcaption>
    </figure>
  );
}
