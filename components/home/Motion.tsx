"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { capabilityIcons } from "./Icons";

/* Count-up for stats like "+11%", "~15%", "4+": the number climbs from 0
   once, just before the stat scrolls into view. The real value is what
   renders by default (SSR, no JS, reduced motion, or if the observer never
   fires), so a stat can never be left showing a wrong number. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 120px 0px" });
  const reduce = useReducedMotion();
  const parts = value.match(/^([^\d]*)(\d+)(.*)$/);
  const [shown, setShown] = useState(parts ? Number(parts[2]) : null);

  useEffect(() => {
    if (!parts || !inView || reduce) return;
    // plain rAF ease-out: keeps the standalone animate() out of the bundle
    const end = Number(parts[2]);
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setShown(Math.round(end * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {parts ? `${parts[1]}${reduce ? parts[2] : shown}${parts[3]}` : value}
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
    <m.div
      initial={reduce ? false : "up"}
      whileInView="down"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      className="relative flex h-full flex-wrap content-end items-end gap-2 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#090c14] p-4 pt-13 sm:min-h-[13rem] sm:gap-2.5 sm:rounded-[1.75rem] sm:p-6 sm:pt-16"
    >
      {title && (
        <span className="absolute left-4 top-4 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-zinc-400 sm:left-6 sm:top-5 sm:text-sm">
          {icon && capabilityIcons[icon]({ className: "size-4 text-[#a9bcff]" })}
          {title}
        </span>
      )}
      <span aria-hidden className="absolute inset-x-6 bottom-4 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {items.map((s, i) => (
        <m.span
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
          className="relative flex items-center gap-2 rounded-full border border-white/15 bg-[#0e1220] py-1.5 pl-1.5 pr-3.5 text-[14px] text-zinc-100 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] sm:pr-4 sm:text-[15px]"
        >
          <span className="grid size-7 place-items-center rounded-full bg-white/[0.07]">
            {capabilityIcons[s.icon]({ className: "size-3.5" })}
          </span>
          {s.label}
        </m.span>
      ))}
    </m.div>
  );
}

/* Parallax: the wrapped element drifts at `speed` × scroll (negative =
   slower than the page). One passive listener, one read per frame. */
export function Parallax({
  speed = -0.15,
  max = 700,
  className = "",
  children,
}: {
  speed?: number;
  max?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const y = useMotionValue(0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      y.set(Math.min(window.scrollY, max) * speed);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, speed, max, y]);
  return (
    <m.div style={{ y }} className={className}>
      {children}
    </m.div>
  );
}

/* Tilt: on devices with a mouse, the card leans toward the pointer and
   springs back on leave. No-op on touch screens and under reduced motion. */
const FINE = "(pointer: fine)";
const subscribeFine = (cb: () => void) => {
  const mq = window.matchMedia(FINE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
export function useFinePointer() {
  return useSyncExternalStore(subscribeFine, () => window.matchMedia(FINE).matches, () => false);
}

export function Tilt({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sy = useSpring(ry, { stiffness: 220, damping: 20 });
  const active = fine && !reduce;

  return (
    <m.div
      style={active ? { rotateX: sx, rotateY: sy, transformPerspective: 1000 } : undefined}
      onPointerMove={
        active
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              rx.set(-py * max * 2);
              ry.set(px * max * 2);
            }
          : undefined
      }
      onPointerLeave={
        active
          ? () => {
              rx.set(0);
              ry.set(0);
            }
          : undefined
      }
      className={className}
    >
      {children}
    </m.div>
  );
}

/* Aurora: three soft colour blobs that drift behind the whole page.
   Transforms only, so it stays cheap; stops under reduced motion. */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora-a absolute -left-[10%] -top-[20%] h-[60vh] w-[60vw] rounded-full bg-[#3b5bff]/[0.11] blur-[120px]" />
      <div className="aurora-b absolute -right-[10%] top-[30%] h-[55vh] w-[50vw] rounded-full bg-[#8a5cff]/[0.11] blur-[120px]" />
      <div
        className="aurora-a absolute bottom-[-20%] left-[30%] h-[50vh] w-[50vw] rounded-full bg-[#2dd4bf]/[0.05] blur-[120px]"
        style={{ animationDelay: "-12s" }}
      />
    </div>
  );
}
