"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useScrollProgress } from "./useScrollProgress";

// A thin vertical rule that draws itself as its own box scrolls through
// the viewport. Absolutely position it inside the element it annotates.
export default function ScrollLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const scale = useScrollProgress(ref, 0.8, 0.55);

  return (
    <span ref={ref} aria-hidden className={`absolute w-px bg-white/10 ${className}`}>
      <motion.span
        style={{ scaleY: reduce ? 1 : scale }}
        className="absolute inset-0 origin-top bg-gradient-to-b from-white/60 via-[#9fb7ff]/60 to-[#b9a4ff]/50"
      />
    </span>
  );
}
