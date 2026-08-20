"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/AuthCard";

export default function PortaalRegistrerenPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (signUpError) {
      setError("Aanmaken is niet gelukt. Probeer het opnieuw.");
      return;
    }

    if (data.session) {
      router.push("/portaal/dashboard");
      router.refresh();
    } else {
      setCheckEmail(true);
    }
  }

  return (
    <AuthCard title="Account aanmaken" subtitle="Voor ouders en verzorgers van onze cliënten.">
      {checkEmail ? (
        <p className="text-center text-sm text-muted">
          Bijna klaar — check <span className="text-foreground font-medium">{email}</span> voor
          een bevestigingslink, en log daarna in.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-muted">
              E-mailadres
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-muted">
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              placeholder="Minimaal 6 tekens"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? "Bezig..." : "Account aanmaken"}
          </button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted">
        Heb je al een account?{" "}
        <Link href="/portaal/login" className="font-semibold text-primary hover:underline">
          Inloggen
        </Link>
      </p>
    </AuthCard>
  );
}
