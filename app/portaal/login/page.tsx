"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/AuthCard";

export default function PortaalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (signInError) {
      setError("Inloggen is niet gelukt. Controleer je e-mailadres en wachtwoord.");
      return;
    }

    router.push("/portaal/dashboard");
    router.refresh();
  }

  return (
    <AuthCard title="Inloggen" subtitle="Welkom terug in het ouderportaal.">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <p className="text-right text-sm">
          <Link href="/portaal/wachtwoord-vergeten" className="text-primary hover:underline">
            Wachtwoord vergeten?
          </Link>
        </p>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Bezig met inloggen..." : "Inloggen"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Nog geen account?{" "}
        <Link href="/portaal/registreren" className="font-semibold text-primary hover:underline">
          Account aanmaken
        </Link>
      </p>
    </AuthCard>
  );
}
