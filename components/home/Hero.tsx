"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { capabilities, hero, profile } from "@/lib/content";
import { ArrowRight, capabilityIcons } from "./Icons";

/*
 * Hero: headline + one line on the left, portrait on the right with six
 * static capability icons around it, joined in a loop by dotted arrows.
 * Nothing here animates on scroll — the picture reads at a glance.
 * (The page-level journey line lives in JourneyRail.)
 */

type Pt = { x: number; y: number };

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative scroll-mt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[8%] h-[38rem] w-[38rem] rounded-full bg-[#3b5bff]/[0.13] blur-[120px]" />
        <div className="absolute bottom-[-12rem] right-[30%] h-[30rem] w-[30rem] rounded-full bg-[#8a5cff]/[0.12] blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-10 px-5 pb-20 pt-8 sm:px-8 lg:px-24 xl:min-h-[calc(100svh-4rem)] xl:grid-cols-[minmax(0,40%)_minmax(0,1fr)] xl:gap-6 xl:py-0 xl:pr-8">
        {/* text */}
        <div className="relative z-10 order-2 xl:order-1">
          <p className="hero-in text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-400 sm:text-sm">
            {hero.eyebrow}
          </p>
          <h1 className="hero-in hero-in-2 mt-6 text-[clamp(3.1rem,11vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white xl:text-[clamp(4.25rem,5.6vw,6rem)]">
            From problems
            <br />
            to{" "}
            <span className="bg-[linear-gradient(95deg,#d6e0ff_0%,#9fb7ff_45%,#b9a4ff_100%)] bg-clip-text pr-[0.08em] font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-transparent">
              products.
            </span>
          </h1>
          <p className="hero-in hero-in-3 mt-7 max-w-[30rem] text-pretty text-xl leading-9 text-zinc-300">
            {hero.subtitle}
          </p>
          <div className="hero-in hero-in-4 mt-10 flex flex-wrap gap-3">
            <Link
              href="#case-studies"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#05070c] transition-transform duration-300 ease-out hover:-translate-y-0.5"
            >
              See my work
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

          {/* below xl the six capabilities sit under the CTAs */}
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 xl:hidden">
            {capabilities.map((cap) => (
              <li key={cap.key} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 text-zinc-100">
                  {capabilityIcons[cap.key]({ className: "size-5" })}
                </span>
                <span className="text-[15px] font-medium text-zinc-200">{cap.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <MobilePortrait />
        <Stage />
      </div>
    </section>
  );
}

function Portrait({ sizes }: { sizes: string }) {
  return (
    <Image
      src={profile.portrait}
      alt="Portrait of Kunal Farma"
      fill
      sizes={sizes}
      loading="eager"
      fetchPriority="high"
      className="portrait-mask object-cover object-[50%_20%]"
    />
  );
}

function MobilePortrait() {
  return (
    <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[440px] xl:hidden">
      <div aria-hidden className="absolute inset-[8%] rounded-full bg-[#5b6bff]/20 blur-3xl" />
      <svg aria-hidden viewBox="0 0 400 500" className="absolute inset-0 h-full w-full overflow-visible">
        <ellipse cx="200" cy="225" rx="188" ry="214" className="fill-none stroke-white/25" strokeWidth="1" />
        <ellipse cx="200" cy="225" rx="205" ry="168" className="fill-none stroke-white/10" strokeDasharray="2 6" transform="rotate(-14 200 225)" />
      </svg>
      <div className="absolute inset-0">
        <Portrait sizes="(max-width: 1279px) 440px, 1px" />
      </div>
    </div>
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

function Stage() {
  const ref = useRef<HTMLDivElement>(null);
  const { w, h } = useSize(ref);

  const c: Pt = { x: w / 2, y: h * 0.47 };
  const rx = w * 0.33;
  const ry = h * 0.43;
  const pts: Pt[] = capabilities.map((cap) => ({ x: (cap.x / 100) * w, y: (cap.y / 100) * h }));

  return (
    <div ref={ref} className="relative order-3 hidden h-[84vh] max-h-[860px] min-h-[560px] xl:block">
      <div aria-hidden className="dot-grid absolute inset-[-4%]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[44%] h-[70%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(110,120,255,0.3),rgba(140,100,255,0.12)_55%,transparent)] blur-2xl"
      />
      <div className="absolute left-1/2 top-0 aspect-[3/4] h-full -translate-x-1/2">
        <Portrait sizes="(min-width: 1280px) 600px, 1px" />
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
        </svg>
      )}

      {capabilities.map((cap, i) => (
        <div
          key={cap.key}
          style={{ left: `${cap.x}%`, top: `${cap.y}%`, animationDelay: `${i * 0.9}s` }}
          className="float absolute flex w-40 -translate-x-1/2 -translate-y-7 flex-col items-center text-center"
        >
          <span className="grid size-14 place-items-center rounded-full border border-white/35 bg-[#06080f]/85 text-zinc-100 shadow-[0_0_40px_-8px_rgba(120,140,255,0.5)] backdrop-blur-md">
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
