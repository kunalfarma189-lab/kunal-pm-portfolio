"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { capabilities, experience, hero, profile, proofStats, stations } from "@/lib/content";
import { ArrowRight, capabilityIcons } from "./Icons";
import { Parallax } from "./Motion";

/*
 * Hero. The headline comes first on every screen.
 *
 * Desktop (xl+): the portrait sits beside it inside an orbit; a comet
 * circles the orbit, six capability icons float around the photo and take
 * turns lighting up, and dotted arrows join them in a loop.
 *
 * Phones/tablets: a smaller portrait below the headline with four floating
 * icon orbs, the six capabilities as a swipeable row of chips, then a
 * roadmap card — the four "how I work" stops on a dotted road (tap to
 * jump) and the three proof sections — so the whole page is clear before
 * the first scroll.
 *
 * The portrait pops in once on load and drifts slower than the page
 * (parallax). Nothing else is driven by scroll.
 */

type Pt = { x: number; y: number };

const ellipsePath = (c: Pt, rx: number, ry: number) =>
  `M ${c.x - rx} ${c.y} A ${rx} ${ry} 0 1 0 ${c.x + rx} ${c.y} A ${rx} ${ry} 0 1 0 ${c.x - rx} ${c.y}`;

/* A glowing dot that circles an invisible path (native SVG motion, no JS). */
function Comet({ id, d, dur }: { id: string; d: string; dur: string }) {
  return (
    <>
      <path id={id} d={d} fill="none" stroke="none" />
      <circle
        r="3.5"
        fill="#fff"
        style={{ filter: "drop-shadow(0 0 6px #a9bcff) drop-shadow(0 0 14px rgba(169,188,255,0.8))" }}
      >
        <animateMotion dur={dur} repeatCount="indefinite">
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
    </>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" aria-label="Introduction" className="relative scroll-mt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[8%] h-[38rem] w-[38rem] rounded-full bg-[#3b5bff]/[0.13] blur-[120px]" />
        <div className="absolute bottom-[-12rem] right-[30%] h-[30rem] w-[30rem] rounded-full bg-[#8a5cff]/[0.12] blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:px-24 xl:min-h-[calc(100svh-4rem)] xl:grid-cols-[minmax(0,40%)_minmax(0,1fr)] xl:gap-6 xl:py-0 xl:pr-8">
        {/* text — first on every screen */}
        <div className="relative z-10">
          <p className="hero-in text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-400 sm:text-sm">
            {hero.eyebrow}
          </p>
          <h1 className="hero-in hero-in-2 mt-6 text-[clamp(3rem,11vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white xl:text-[clamp(4.25rem,5.6vw,6rem)]">
            From problems
            <br />
            to{" "}
            <span className="bg-[linear-gradient(95deg,#d6e0ff_0%,#9fb7ff_45%,#b9a4ff_100%)] bg-clip-text pr-[0.08em] font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-transparent">
              products.
            </span>
          </h1>
          <p className="hero-in hero-in-3 mt-6 max-w-[30rem] text-pretty text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">
            {hero.subtitle}
          </p>
          <div className="hero-in hero-in-4 mt-8 flex flex-wrap gap-3 sm:mt-10">
            <Link
              href="#case-studies"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#05070c] transition-transform duration-300 ease-out hover:-translate-y-0.5"
            >
              See my work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:border-white/45 hover:bg-white/[0.04]"
            >
              Get in touch
            </Link>
          </div>
          <Proof />
        </div>

        <MobileVisual reduce={!!reduce} />
        <Stage reduce={!!reduce} />
      </div>
    </section>
  );
}

/* Real, sourced results and real employers right under the headline, so
   the first screen already carries proof — nothing here is invented. */
function Proof() {
  const results = proofStats.filter((s) => s.source);
  const companies = experience.map((j) => j.company);
  return (
    <div className="hero-in hero-in-5 mt-9 border-t border-white/10 pt-6">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
        {results.map((s) => (
          <li key={s.label} className="leading-tight">
            <span className="block text-[1.35rem] font-semibold tracking-[-0.03em] text-white">{s.value}</span>
            <span className="block text-[13px] text-zinc-400">
              {s.label} <span className="text-zinc-600">· {s.source}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[13px] text-zinc-500">
        Worked at {companies.slice(0, -1).join(", ")} and {companies[companies.length - 1]} · {profile.location}
      </p>
    </div>
  );
}

function Portrait({ sizes }: { sizes: string }) {
  return (
    <Image
      src={profile.portrait}
      alt="Portrait of Kunal Farma"
      fill
      sizes={sizes}
      priority
      className="portrait-mask object-cover object-[50%_20%]"
    />
  );
}

/* ------------------------------ below xl ------------------------------ */

function MobileVisual({ reduce }: { reduce: boolean }) {
  const orbs = [
    { icon: "research", pos: "-left-2 top-[14%]", delay: 0 },
    { icon: "ai", pos: "-right-2 top-[9%]", delay: 1.3 },
    { icon: "data", pos: "left-0 bottom-[17%]", delay: 2.4 },
    { icon: "execution", pos: "right-0 bottom-[10%]", delay: 0.7 },
  ];
  return (
    <div className="xl:hidden">
      <Parallax speed={-0.12} className="relative mx-auto aspect-[4/5] w-[min(76vw,330px)]">
        <div className="hero-pop relative h-full w-full">
          <div aria-hidden className="absolute inset-[10%] rounded-full bg-[#5b6bff]/25 blur-3xl" />
          <svg aria-hidden viewBox="0 0 400 500" className="absolute inset-0 h-full w-full overflow-visible">
            <ellipse cx="200" cy="225" rx="188" ry="214" className="fill-none stroke-white/25" strokeWidth="1" />
            <ellipse cx="200" cy="225" rx="205" ry="168" className="fill-none stroke-white/10" strokeDasharray="2 6" transform="rotate(-14 200 225)" />
            {!reduce && <Comet id="orbit-m" d={ellipsePath({ x: 200, y: 225 }, 188, 214)} dur="16s" />}
          </svg>
          <div className="absolute inset-0">
            <Portrait sizes="(max-width: 1279px) 330px, 1px" />
          </div>
          {orbs.map((o) => (
            <span
              key={o.icon}
              style={{ animationDelay: `${o.delay}s` }}
              className={`float absolute ${o.pos} grid size-11 place-items-center rounded-full border border-white/30 bg-[#06080f]/85 text-zinc-100 shadow-[0_0_30px_-6px_rgba(120,140,255,0.6)] backdrop-blur-md`}
            >
              {capabilityIcons[o.icon]({ className: "size-5" })}
            </span>
          ))}
        </div>
      </Parallax>

      {/* the six capabilities, swipeable */}
      <ul className="no-scrollbar -mx-5 mt-8 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8">
        {capabilities.map((cap) => (
          <li
            key={cap.key}
            className="flex shrink-0 snap-start items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] py-2 pl-2 pr-4 text-[15px] font-medium text-zinc-100"
          >
            <span className="grid size-8 place-items-center rounded-full bg-white/[0.07]">
              {capabilityIcons[cap.key]({ className: "size-4" })}
            </span>
            {cap.label}
          </li>
        ))}
      </ul>

      <Roadmap />
    </div>
  );
}

/* The page in one glance (below xl): the four stops of "how I work" on a
   dotted road, each a link to its step, and where the proof lives. */
function Roadmap() {
  const proof = [
    { href: "#case-studies", icon: "doc", label: "Case studies" },
    { href: "#experience", icon: "roadmap", label: "Experience" },
    { href: "#skills", icon: "chart", label: "Toolkit" },
  ];
  return (
    <nav aria-label="Page roadmap" className="hero-in hero-in-5 mt-8 rounded-[1.5rem] border border-white/10 bg-[#090c14] p-4 sm:p-5">
      <p className="flex items-center justify-between text-[12px] font-medium uppercase tracking-[0.2em] text-zinc-500">
        How I work
        <span className="font-mono normal-case tracking-normal text-[#a9bcff]">4 steps</span>
      </p>
      <ol className="relative mt-4 grid grid-cols-4">
        <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[22px] border-t border-dashed border-white/30" />
        {stations.map((st, i) => (
          <li key={st.id} className="relative">
            <a href={`#step-${i + 1}`} className="group flex flex-col items-center gap-2 text-center">
              <span className="grid size-11 place-items-center rounded-full border border-white/30 bg-[#0e1220] text-zinc-100 shadow-[0_0_24px_-6px_rgba(120,140,255,0.6)] transition-colors group-hover:border-[#a9bcff]">
                {capabilityIcons[st.icon]({ className: "size-5" })}
              </span>
              <span className="text-[13px] font-medium text-zinc-200">
                <span className="font-mono text-[11px] text-zinc-500">{i + 1} </span>
                {st.step}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
        <span className="shrink-0 text-[12px] font-medium uppercase tracking-[0.2em] text-zinc-500">Then</span>
        <ul className="no-scrollbar flex gap-2 overflow-x-auto">
          {proof.map((p) => (
            <li key={p.href} className="shrink-0">
              <a
                href={p.href}
                className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[13px] font-medium text-zinc-200 transition-colors hover:border-white/40"
              >
                {capabilityIcons[p.icon]({ className: "size-3.5 text-[#a9bcff]" })}
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* -------------------------------- xl+ -------------------------------- */

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

function Stage({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { w, h } = useSize(ref);

  const c: Pt = { x: w / 2, y: h * 0.47 };
  const rx = w * 0.33;
  const ry = h * 0.43;
  const pts: Pt[] = capabilities.map((cap) => ({ x: (cap.x / 100) * w, y: (cap.y / 100) * h }));

  return (
    <div ref={ref} className="relative hidden h-[84vh] max-h-[860px] min-h-[560px] xl:block">
      <div aria-hidden className="dot-grid absolute inset-[-4%]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[44%] h-[70%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(110,120,255,0.3),rgba(140,100,255,0.12)_55%,transparent)] blur-2xl"
      />
      <div className="absolute left-1/2 top-0 aspect-[3/4] h-full -translate-x-1/2">
        <Parallax speed={-0.1} className="h-full w-full">
          <div className="hero-pop relative h-full w-full">
            <Portrait sizes="(min-width: 1280px) 600px, 1px" />
          </div>
        </Parallax>
      </div>

      {w > 0 && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${w} ${h}`}>
          <ellipse cx={c.x} cy={c.y} rx={rx} ry={ry} className="fill-none stroke-white/25" strokeWidth={1} />
          <ellipse
            cx={c.x}
            cy={c.y}
            rx={rx * 1.2}
            ry={ry * 0.82}
            transform={`rotate(-12 ${c.x} ${c.y})`}
            className="fill-none stroke-white/15"
            strokeWidth={1}
            strokeDasharray="2 7"
          />
          {pts.map((p, i) => (
            <DottedArrow key={i} from={p} to={pts[(i + 1) % pts.length]} c={c} />
          ))}
          {!reduce && <Comet id="orbit-d" d={ellipsePath(c, rx, ry)} dur="22s" />}
        </svg>
      )}

      {capabilities.map((cap, i) => (
        <div
          key={cap.key}
          style={{ left: `${cap.x}%`, top: `${cap.y}%`, animationDelay: `${i * 0.9}s` }}
          className="float absolute flex w-40 -translate-x-1/2 -translate-y-7 flex-col items-center text-center"
        >
          <span
            style={{ animationDelay: `${i * 2}s` }}
            className="glow-cycle grid size-14 place-items-center rounded-full border border-white/35 bg-[#06080f]/85 text-zinc-100 shadow-[0_0_40px_-8px_rgba(120,140,255,0.5)] backdrop-blur-md transition-transform duration-300 hover:scale-110"
          >
            {capabilityIcons[cap.key]({ className: "size-6" })}
          </span>
          <span className="mt-3 text-base font-semibold tracking-[-0.01em] text-white [text-shadow:0_0_14px_#05070c,0_0_4px_#05070c]">
            {cap.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// Dotted curve from one icon to the next, bowed away from the face,
// with a small arrowhead at the end.
function DottedArrow({ from, to, c }: { from: Pt; to: Pt; c: Pt }) {
  const trim = (a: Pt, b: Pt, d: number): Pt => {
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    return { x: a.x + ((b.x - a.x) / len) * d, y: a.y + ((b.y - a.y) / len) * d };
  };
  const s = trim(from, to, 38);
  const e = trim(to, from, 38);
  const m = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
  const ol = Math.hypot(m.x - c.x, m.y - c.y) || 1;
  const q = { x: m.x + ((m.x - c.x) / ol) * 46, y: m.y + ((m.y - c.y) / ol) * 46 };
  const ang = (Math.atan2(e.y - q.y, e.x - q.x) * 180) / Math.PI;

  return (
    <g>
      <path
        d={`M ${s.x} ${s.y} Q ${q.x} ${q.y} ${e.x} ${e.y}`}
        className="fill-none stroke-white/55"
        strokeWidth={1.4}
        strokeDasharray="1 6"
        strokeLinecap="round"
      />
      <path
        d="M -7 -4.5 L 0 0 L -7 4.5"
        transform={`translate(${e.x} ${e.y}) rotate(${ang})`}
        className="fill-none stroke-white/80"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
