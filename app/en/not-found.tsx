import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-4xl font-extrabold text-balance">This page no longer exists</h1>
        <p className="mt-4 text-muted">The page may have moved during our website relaunch.</p>
        <Link href="/en" className="btn btn-primary mt-8 inline-flex">
          Back to the homepage
        </Link>
      </Container>
    </section>
  );
}
