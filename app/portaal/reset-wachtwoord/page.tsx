"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/AuthCard";

export default function ResetWachtwoordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (updateError) {
      setError("Er ging iets mis bij het opslaan van je nieuwe wachtwoord.");
      return;
    }
    setDone(true);
    setTimeout(() => {
      router.push("/portaal/dashboard");
      router.refresh();
    }, 1500);
  }

  return (
    <AuthCard title="Nieuw wachtwoord instellen">
      {done ? (
        <p className="text-center text-sm text-muted">Wachtwoord opgeslagen — je wordt doorgestuurd...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-muted">
              Nieuw wachtwoord
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? "Bezig met opslaan..." : "Wachtwoord opslaan"}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
