"use client";

import { useEffect } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useFinePointer } from "./Motion";

/* A soft light that follows the mouse with a little lag — desktop only
   (needs a fine pointer), off under reduced motion, never catches events. */
export default function Spotlight() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-2000);
  const y = useMotionValue(-2000);
  const sx = useSpring(x, { stiffness: 120, damping: 22 });
  const sy = useSpring(y, { stiffness: 120, damping: 22 });
  const active = fine && !reduce;

  useEffect(() => {
    if (!active) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, x, y]);

  if (!active) return null;
  return (
    <m.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(169,188,255,0.09),rgba(169,188,255,0.03)_35%,transparent_65%)]"
    />
  );
}
