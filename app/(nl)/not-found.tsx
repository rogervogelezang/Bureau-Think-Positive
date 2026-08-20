import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-4xl font-extrabold text-balance">Deze pagina bestaat niet (meer)</h1>
        <p className="mt-4 text-muted">
          Mogelijk is de pagina verplaatst tijdens de vernieuwing van onze website.
        </p>
        <Link href="/" className="btn btn-primary mt-8 inline-flex">
          Terug naar de homepage
        </Link>
      </Container>
    </section>
  );
}
