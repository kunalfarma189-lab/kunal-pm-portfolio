"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "motion/react";

/*
 * 0 → 1 progress of an element through the viewport, as a Motion value.
 *
 * `start` / `end` are viewport fractions (0 = top, 1 = bottom):
 *   progress is 0 when the element's top sits at `start`·vh, and
 *   1 when the element's bottom reaches `end`·vh.
 * For a tall sticky section use start 0 / end 1 ("start start → end end").
 *
 * Motion's own useScroll can hand these values to the browser's native
 * ScrollTimeline; with element targets that mapping came out wrong in
 * testing, so progress is measured here and fed to Motion as plain values.
 * One passive scroll listener per element, coalesced to one read per frame.
 */
export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  start: number,
  end: number,
): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      // distance the top travels between the two anchor points
      const total = r.height + start * vh - end * vh;
      const p = total > 0 ? (start * vh - r.top) / total : 1;
      progress.set(Math.min(1, Math.max(0, p)));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, start, end, progress]);

  return progress;
}
