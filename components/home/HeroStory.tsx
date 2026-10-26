"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { capabilities, hero, profile } from "@/lib/content";
import { ArrowDown, ArrowRight, capabilityIcons } from "./Icons";
import { useScrollProgress } from "./useScrollProgress";

/*
 * Hero + scroll-linked "product thinking" visualisation.
 *
 * Desktop (xl+): the section is 210vh tall and its inner stage is sticky,
 * so the first ~110vh of scrolling drives `progress` from 0 → 1. Nothing
 * autoplays or loops: the orbit, the six capability nodes, the connectors
 * and their arrowheads are all functions of scroll position. Scrolling is
 * never captured — the page moves normally the whole time.
 *
 * Below xl the hero stacks (portrait first) and the capabilities become a
 * vertical list after it (see MobileCapabilities), drawn by its own scroll.
 *
 * prefers-reduced-motion: progress is pinned to 1 (everything visible) and
 * the section collapses to normal height via the motion-reduce variant.
 */

type Pt = { x: number; y: number };


// Node timeline: node i is reached at T(i); its connector draws just before.
const T = (i: number) => 0.1 + i * 0.13;

// Server snapshot is `false` (full motion) so SSR and hydration agree;
// the client then switches to the real preference without a mismatch.
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useReducedMotionPref() {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

function useSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

export default function HeroStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotionPref();
  const scrolled = useScrollProgress(sectionRef, 0, 1);
  const done = useMotionValue(1);
  const progress = reduce ? done : scrolled;

  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);
  const barScale = useTransform(progress, [T(0), T(5) + 0.08], [0, 1]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative xl:h-[210vh] xl:motion-reduce:h-auto"
    >
      <div className="relative xl:sticky xl:top-16 xl:h-[calc(100svh-4rem)] xl:min-h-[640px]">
        {/* atmosphere */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-[8%] h-[38rem] w-[38rem] rounded-full bg-[#3b5bff]/[0.13] blur-[120px]" />
          <div className="absolute bottom-[-10rem] right-[30%] h-[30rem] w-[30rem] rounded-full bg-[#8a5cff]/[0.12] blur-[120px]" />
          <div className="absolute -left-40 top-1/3 h-[24rem] w-[24rem] rounded-full bg-[#3b5bff]/[0.06] blur-[100px]" />
        </div>

        <div className="relative mx-auto grid h-full max-w-[1360px] grid-cols-1 items-center px-5 pb-16 pt-6 sm:px-8 xl:grid-cols-[minmax(0,40%)_minmax(0,1fr)] xl:gap-6 xl:pb-0 xl:pt-0">
          <MobilePortrait progress={progress} />

          {/* text column */}
          <div className="relative z-10 -mt-14 sm:-mt-20 xl:mt-0">
            <p className="hero-in text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-400 sm:text-sm">
              {hero.eyebrow}
            </p>
            <h1 className="hero-in hero-in-2 mt-6 text-[clamp(3.1rem,11vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white xl:text-[clamp(4.25rem,5.6vw,6rem)]">
              From problems
              <br />
              to{" "}
              <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.02em] bg-[linear-gradient(95deg,#d6e0ff_0%,#9fb7ff_45%,#b9a4ff_100%)] bg-clip-text pr-[0.08em] text-transparent">
                products.
              </span>
            </h1>
            <p className="hero-in hero-in-3 mt-7 max-w-[34rem] text-pretty text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">
              {hero.subtitle}
            </p>
            <div className="hero-in hero-in-4 mt-10 flex flex-wrap gap-3">
              <Link
                href="#case-studies"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#05070c] transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                View case studies
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <a
                href={profile.resumeUrl}
                download="Kunal_Farma_PM_Resume.pdf"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:border-white/45 hover:bg-white/[0.04]"
              >
                Download resume
              </a>
            </div>

            {/* scroll progress through the six capabilities (desktop) */}
            <div className="hero-in hero-in-5 mt-14 hidden items-center gap-4 xl:flex" aria-hidden>
              <span className="text-sm text-zinc-500">How I work</span>
              <span className="relative h-px w-36 overflow-hidden bg-white/12">
                <motion.span
                  style={{ scaleX: barScale }}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-[#9fb7ff] to-[#b9a4ff]"
                />
              </span>
              <span className="text-sm text-zinc-500">6 steps</span>
            </div>
          </div>

          <DesktopStage progress={progress} />
        </div>

        <motion.div
          aria-hidden
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-500 xl:flex"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ArrowDown className="size-4" />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Portrait                                                            */
/* ------------------------------------------------------------------ */

function Portrait({ sizes, eager }: { sizes: string; eager?: boolean }) {
  return (
    <Image
      src={profile.portrait}
      alt="Portrait of Kunal Farma"
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      className="portrait-mask object-cover object-[50%_20%]"
    />
  );
}

function MobilePortrait({ progress }: { progress: MotionValue<number> }) {
  const orbit = useTransform(progress, [0, 0.5], [0.35, 1]);
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] xl:hidden">
      <div aria-hidden className="absolute inset-[8%] rounded-full bg-[#5b6bff]/20 blur-3xl" />
      <svg aria-hidden viewBox="0 0 400 500" className="absolute inset-0 h-full w-full overflow-visible">
        <motion.ellipse
          cx="200"
          cy="225"
          rx="188"
          ry="214"
          className="fill-none stroke-white/30"
          strokeWidth="1"
          style={{ pathLength: orbit }}
          transform="rotate(-90 200 225)"
        />
        <ellipse cx="200" cy="225" rx="205" ry="168" className="fill-none stroke-white/10" strokeDasharray="2 6" transform="rotate(-14 200 225)" />
      </svg>
      <div className="absolute inset-0">
        <Portrait sizes="(max-width: 1279px) 460px, 1px" eager />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop stage: portrait + orbit + six nodes, all driven by progress */
/* ------------------------------------------------------------------ */

function DesktopStage({ progress }: { progress: MotionValue<number> }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { w, h } = useSize(stageRef);

  const portraitScale = useTransform(progress, [0, 1], [1, 0.95]);
  const glow = useTransform(progress, [0, 0.9], [0.55, 1]);

  // Orbit geometry, centred on the face.
  const c: Pt = { x: w / 2, y: h * 0.47 };
  const rx = w * 0.33;
  const ry = h * 0.43;

  const nodes: Pt[] = capabilities.map((cap) => ({
    x: (cap.x / 100) * w,
    y: (cap.y / 100) * h,
  }));

  return (
    <div ref={stageRef} className="relative hidden h-[86%] min-h-[560px] xl:block">
      {/* faint dotted grid */}
      <div aria-hidden className="dot-grid absolute inset-[-4%]" />

      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="absolute left-1/2 top-[44%] h-[70%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(110,120,255,0.28),rgba(140,100,255,0.12)_55%,transparent)] blur-2xl"
      />

      <motion.div
        style={{ scale: portraitScale }}
        className="absolute left-1/2 top-0 h-full w-auto -translate-x-1/2 aspect-[3/4]"
      >
        <Portrait sizes="(min-width: 1280px) 560px, 1px" eager />
      </motion.div>

      {w > 0 && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${w} ${h}`}
        >
          <Orbit c={c} rx={rx} ry={ry} progress={progress} />
          {nodes.map((n, i) => (
            <Connector
              key={capabilities[i].key}
              from={i === 0 ? orbitPointToward(c, rx, ry, n) : nodes[i - 1]}
              to={n}
              c={c}
              i={i}
              progress={progress}
              trimStart={i === 0 ? 0 : 34}
            />
          ))}
        </svg>
      )}

      {capabilities.map((cap, i) => (
        <CapabilityNode key={cap.key} cap={cap} i={i} progress={progress} />
      ))}
    </div>
  );
}

function orbitPointToward(c: Pt, rx: number, ry: number, p: Pt): Pt {
  const a = Math.atan2((p.y - c.y) / ry, (p.x - c.x) / rx);
  return { x: c.x + rx * Math.cos(a), y: c.y + ry * Math.sin(a) };
}

function Orbit({
  c,
  rx,
  ry,
  progress,
}: {
  c: Pt;
  rx: number;
  ry: number;
  progress: MotionValue<number>;
}) {
  const draw = useTransform(progress, [0, 0.32], [0.38, 1]);
  const outer = useTransform(progress, [0, 0.4], [0.12, 0.3]);
  // a marker that travels the orbit with scroll — the "you are here"
  const angle = useTransform(progress, [0, 1], [-Math.PI / 2, (3 * Math.PI) / 2]);
  const mx = useTransform(angle, (a) => c.x + rx * Math.cos(a));
  const my = useTransform(angle, (a) => c.y + ry * Math.sin(a));

  const ellipse = `M ${c.x} ${c.y - ry} A ${rx} ${ry} 0 1 1 ${c.x} ${c.y + ry} A ${rx} ${ry} 0 1 1 ${c.x} ${c.y - ry}`;
  const ticks: Pt[] = [
    { x: c.x, y: c.y - ry },
    { x: c.x + rx, y: c.y },
    { x: c.x, y: c.y + ry },
    { x: c.x - rx, y: c.y },
  ];

  return (
    <g>
      <motion.ellipse
        cx={c.x}
        cy={c.y}
        rx={rx * 1.2}
        ry={ry * 0.82}
        transform={`rotate(-12 ${c.x} ${c.y})`}
        className="fill-none stroke-white"
        strokeWidth={1}
        strokeDasharray="2 7"
        style={{ opacity: outer }}
      />
      <motion.path
        d={ellipse}
        className="fill-none stroke-white/35"
        strokeWidth={1}
        style={{ pathLength: draw }}
      />
      {ticks.map((t, i) => (
        <path
          key={i}
          d={`M ${t.x - 5} ${t.y} H ${t.x + 5} M ${t.x} ${t.y - 5} V ${t.y + 5}`}
          className="stroke-white/40"
          strokeWidth={1}
        />
      ))}
      <motion.circle cx={mx} cy={my} r={3.5} className="fill-white" />
      <motion.circle cx={mx} cy={my} r={9} className="fill-none stroke-[#9fb7ff]/60" strokeWidth={1} />
    </g>
  );
}

function Connector({
  from,
  to,
  c,
  i,
  progress,
  trimStart,
}: {
  from: Pt;
  to: Pt;
  c: Pt;
  i: number;
  progress: MotionValue<number>;
  trimStart: number;
}) {
  const t = T(i);
  const draw = useTransform(progress, [t - 0.06, t + 0.04], [0, 1]);
  const headOpacity = useTransform(progress, [t + 0.03, t + 0.05], [0, 1]);

  // trim both ends so lines stop short of the icon rings
  const trim = (a: Pt, b: Pt, d: number): Pt => {
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    return { x: a.x + ((b.x - a.x) / len) * d, y: a.y + ((b.y - a.y) / len) * d };
  };
  const s = trimStart ? trim(from, to, trimStart) : from;
  const e = trim(to, from, 38);

  // bow the curve away from the portrait centre
  const m = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
  const ol = Math.hypot(m.x - c.x, m.y - c.y) || 1;
  const bend = 46;
  const q = { x: m.x + ((m.x - c.x) / ol) * bend, y: m.y + ((m.y - c.y) / ol) * bend };
  const d = `M ${s.x} ${s.y} Q ${q.x} ${q.y} ${e.x} ${e.y}`;

  // arrowhead follows the tangent at the end (2·(E − Q))
  const ang = (Math.atan2(e.y - q.y, e.x - q.x) * 180) / Math.PI;

  return (
    <g>
      <path d={d} className="fill-none stroke-white/10" strokeWidth={1} strokeDasharray="1 6" strokeLinecap="round" />
      <motion.path
        d={d}
        className="fill-none stroke-white/70"
        strokeWidth={1.1}
        strokeLinecap="round"
        style={{ pathLength: draw }}
      />
      <motion.path
        d="M -7 -4.5 L 0 0 L -7 4.5"
        transform={`translate(${e.x} ${e.y}) rotate(${ang})`}
        className="fill-none stroke-white"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: headOpacity }}
      />
    </g>
  );
}

function CapabilityNode({
  cap,
  i,
  progress,
}: {
  cap: (typeof capabilities)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const t = T(i);
  const opacity = useTransform(progress, [t + 0.01, t + 0.07], [0, 1]);
  const scale = useTransform(progress, [t + 0.01, t + 0.09], [0.82, 1]);
  const y = useTransform(progress, [t + 0.02, t + 0.1], [10, 0]);
  const ring = useTransform(progress, [t + 0.03, t + 0.12], [0, 1]);
  const IconC = capabilityIcons[cap.key];

  return (
    <motion.div
      style={{ left: `${cap.x}%`, top: `${cap.y}%`, opacity }}
      className="node absolute flex w-[11.5rem] -translate-x-1/2 -translate-y-7 flex-col items-center text-center"
    >
      <motion.span
        style={{ scale }}
        className="relative grid size-14 place-items-center rounded-full border border-white/30 bg-[#06080f]/85 text-zinc-100 shadow-[0_0_40px_-8px_rgba(120,140,255,0.45)] backdrop-blur-md"
      >
        <svg aria-hidden viewBox="0 0 60 60" className="absolute -inset-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] -rotate-90">
          <motion.circle cx="30" cy="30" r="29" className="fill-none stroke-[#a9bcff]" strokeWidth={1} style={{ pathLength: ring }} />
        </svg>
        {IconC({ className: "size-6" })}
      </motion.span>
      <motion.div style={{ y }} className="mt-3.5 [text-shadow:0_0_14px_#05070c,0_0_4px_#05070c,0_1px_2px_#05070c]">
        <p className="text-[17px] font-semibold tracking-[-0.01em] text-white">{cap.label}</p>
        <p className="mt-1 text-[14px] leading-snug text-zinc-400">{cap.line}</p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Below xl: the six capabilities as a vertical, scroll-drawn path     */
/* ------------------------------------------------------------------ */

export function MobileCapabilities() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionPref();
  const scrolled = useScrollProgress(listRef, 0.85, 0.6);
  const done = useMotionValue(1);
  const progress = reduce ? done : scrolled;

  return (
    <section aria-labelledby="how-i-work" className="mx-auto max-w-2xl px-5 pb-8 pt-4 sm:px-8 xl:hidden">
      <h2 id="how-i-work" className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-400">
        How I work
      </h2>
      <ol ref={listRef} className="relative mt-8 space-y-9">
        <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-px bg-white/10" />
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute bottom-6 left-[23px] top-6 w-px origin-top bg-gradient-to-b from-white/70 via-[#9fb7ff]/70 to-[#b9a4ff]/70"
        />
        {capabilities.map((cap, i) => (
          <MobileItem key={cap.key} cap={cap} i={i} progress={progress} />
        ))}
      </ol>
    </section>
  );
}

function MobileItem({
  cap,
  i,
  progress,
}: {
  cap: (typeof capabilities)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const at = i / capabilities.length;
  const opacity = useTransform(progress, [at - 0.05, at + 0.08], [0.25, 1]);
  const x = useTransform(progress, [at - 0.05, at + 0.08], [8, 0]);
  const IconC = capabilityIcons[cap.key];
  return (
    <motion.li style={{ opacity }} className="relative flex gap-5">
      <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-white/25 bg-[#05070c] text-zinc-100">
        {IconC({ className: "size-[22px]" })}
      </span>
      <motion.div style={{ x }} className="pt-1">
        <p className="text-lg font-semibold text-white">{cap.label}</p>
        <p className="mt-1 text-base leading-7 text-zinc-400">{cap.line}</p>
      </motion.div>
    </motion.li>
  );
}
