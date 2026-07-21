"use client";

import { useState } from "react";

// Split out as a Client Component because reading Date.now() during render
// is an impure call the framework won't allow inside a Server Component —
// useState's lazy initializer is the sanctioned escape hatch, evaluated
// once per mount.
export default function HoneypotFields() {
  const [renderedAt] = useState(() => Date.now());

  return (
    <>
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="renderedAt" value={renderedAt} />
    </>
  );
}
