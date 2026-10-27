"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation } from "motion/react";

/* Loads only the animation features the site uses (variants, in-view,
   hover) instead of the whole Motion runtime. Components use `m.*`;
   `strict` throws in dev if a full `motion.*` sneaks back in. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
