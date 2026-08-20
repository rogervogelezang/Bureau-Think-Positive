"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/AuthCard";

export default function WachtwoordVergetenPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/portaal/reset-wachtwoord`,
    });

    setLoading(false);
    if (resetError) {
      setError("Er ging iets mis. Probeer het later opnieuw.");
      return;
    }
    setSent(true);
  }

  return (
    <AuthCard title="Wachtwoord vergeten" subtitle="We sturen je een link om een nieuw wachtwoord in te stellen.">
      {sent ? (
        <p className="text-center text-sm text-muted">
          Heeft <span className="text-foreground font-medium">{email}</span> een account, dan is
          er een reset-link onderweg — check je inbox.
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
          {error && <p className="text-sm text-danger">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? "Bezig met versturen..." : "Verstuur reset-link"}
          </button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted">
        Weer terug?{" "}
        <Link href="/portaal/login" className="font-semibold text-primary hover:underline">
          Inloggen
        </Link>
      </p>
    </AuthCard>
  );
}
