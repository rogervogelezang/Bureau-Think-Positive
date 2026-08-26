"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Moves focus to #main-content on client-side route changes, so keyboard
 * users don't lose their place to <body> when the old page's focused link
 * unmounts. Skipped on first mount so it doesn't steal focus on initial
 * page load. */
export default function FocusMainOnNavigate() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.getElementById("main-content")?.focus();
  }, [pathname]);

  return null;
}
