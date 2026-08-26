"use client";

import { useLayoutEffect, useRef } from "react";

/** Drifts its wrapped box vertically at a fraction of scroll speed, giving
 * a depth-layer parallax feel. Deliberately JS-driven rather than CSS
 * `animation-timeline: view()`: this is meant to wrap boxes that sit
 * inside an `overflow-hidden` ancestor (e.g. HeroBlock's own
 * `overflow-hidden` <section>), which becomes the nearest CSS scroll
 * container and — since nothing inside it actually overflows — resolves
 * to a zero-range, effectively inert view-timeline. A plain
 * getBoundingClientRect()-based scroll listener has no such ancestor
 * dependency. The transform is applied to this wrapper box itself, never
 * to content inside it, so there's no risk of revealing clipped edges
 * within the wrapper's own overflow-hidden boundary. */
export default function ParallaxLayer({
  speed = 0.12,
  className,
  children,
}: {
  speed?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
      rafId = 0;
    }
    function onScroll() {
      if (!rafId) rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
