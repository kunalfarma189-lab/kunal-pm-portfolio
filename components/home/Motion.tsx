"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { capabilityIcons } from "./Icons";

/* Count-up for stats like "+11%", "~15%", "4+": the number climbs from 0
   once, just before the stat scrolls into view. The real value is what
   renders by default (SSR, no JS, reduced motion, or if the observer never
   fires), so a stat can never be left showing a wrong number. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 120px 0px" });
  const reduce = useReducedMotion();
  const m = value.match(/^([^\d]*)(\d+)(.*)$/);
  const [shown, setShown] = useState(m ? Number(m[2]) : null);

  useEffect(() => {
    if (!m || !inView || reduce) return;
    const controls = animate(0, Number(m[2]), {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {m ? `${m[1]}${reduce ? m[2] : shown}${m[3]}` : value}
    </span>
  );
}

/* Gravity chips: each chip drops in from above with a little spin, lands
   with a spring bounce, and they pile up at the bottom of their tray —
   like things falling into a box. Runs once per visit.
   The tray (which never moves) decides when to drop: a chip that starts
   clipped above the tray can never be seen by an IntersectionObserver
   itself, so per-chip triggers would leave it stuck out of view. */
export function GravityChips({
  title,
  icon,
  items,
  delay = 0,
}: {
  title?: string;
  icon?: string;
  items: { icon: string; label: string }[];
  delay?: number;
}) {
  const reduce = useReducedMotion();
  // fixed pseudo-random tilt/drop per chip so SSR and client agree
  const tilt = [-14, 9, -6, 12, -10, 7, -4, 11];
  return (
    <motion.div
      initial={reduce ? false : "up"}
      whileInView="down"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      className="relative flex h-full min-h-[13rem] flex-wrap content-end items-end gap-2.5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090c14] p-5 pt-16 sm:p-6 sm:pt-16"
    >
      {title && (
        <span className="absolute left-5 top-5 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400 sm:left-6">
          {icon && capabilityIcons[icon]({ className: "size-4 text-[#a9bcff]" })}
          {title}
        </span>
      )}
      <span aria-hidden className="absolute inset-x-6 bottom-4 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {items.map((s, i) => (
        <motion.span
          key={s.label}
          variants={{
            up: { y: -180, opacity: 0, rotate: tilt[i % tilt.length] },
            down: {
              y: 0,
              opacity: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 13,
                mass: 1.1,
                delay: delay + 0.08 * i,
                opacity: { duration: 0.2, delay: delay + 0.08 * i },
              },
            },
          }}
          whileHover={{ y: -6 }}
          className="relative flex items-center gap-2 rounded-full border border-white/15 bg-[#0e1220] py-1.5 pl-1.5 pr-4 text-[15px] text-zinc-100 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]"
        >
          <span className="grid size-7 place-items-center rounded-full bg-white/[0.07]">
            {capabilityIcons[s.icon]({ className: "size-3.5" })}
          </span>
          {s.label}
        </motion.span>
      ))}
    </motion.div>
  );
}
