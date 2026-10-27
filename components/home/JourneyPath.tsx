"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/*
 * The journey through the page, measured from every element marked
 * `data-jp-node="Label"` (its centre). Only displayed nodes count, so a
 * node can have a desktop copy and a phone copy.
 *
 * lg and up: one dotted path zig-zags down the page through the nodes. A
 * glowing arrow rides it with scroll — spring-driven, so it swings through
 * each diagonal, overshoots a touch and settles — with a softer comet
 * trail behind it. The travelled part lights up.
 *
 * Below lg: the same road as a straight timeline. Content is indented and
 * every node sits on a rail at the cards' left edge, so the arrow rides
 * down the edge and never crosses text. A fixed strip under the navbar
 * mirrors it: a progress bar with a dot per stop and the current stop's
 * name.
 *
 * Either way, every node the reader has passed gets `data-reached`,
 * which the node styles use to glow and pulse.
 */

type P = { x: number; y: number; label: string };

const visibleNodes = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>("[data-jp-node]")).filter(
    (el) => el.getClientRects().length > 0,
  );

export default function JourneyPath({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();

  const [geo, setGeo] = useState<{ w: number; h: number; d: string; pts: P[]; lens: number[]; total: number }>({
    w: 0,
    h: 0,
    d: "",
    pts: [],
    lens: [],
    total: 0,
  });
  const [label, setLabel] = useState("");
  const [moving, setMoving] = useState(false);
  const [onRight, setOnRight] = useState(false);

  const target = useMotionValue(0);
  const sprung = useSpring(target, { stiffness: 110, damping: 11, mass: 1.15 });
  const trailing = useSpring(target, { stiffness: 50, damping: 12, mass: 1.2 });
  const L = reduce ? target : sprung;
  const T = reduce ? target : trailing;

  // point + heading on the real path at a given length
  const at = (l: number) => {
    const p = pathRef.current;
    if (!p) return { x: 0, y: 0, a: 0 };
    const total = p.getTotalLength();
    if (!total) return { x: 0, y: 0, a: 0 };
    const len = Math.min(total, Math.max(0, l));
    const a = p.getPointAtLength(len);
    const b = p.getPointAtLength(Math.min(total, len + 2));
    return { x: a.x, y: a.y, a: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI - 90 };
  };
  const pos = useTransform(L, at);
  const ax = useTransform(pos, (q) => q.x);
  const ay = useTransform(pos, (q) => q.y);
  const ar = useTransform(pos, (q) => q.a);
  const tpos = useTransform(T, at);
  const tx = useTransform(tpos, (q) => q.x);
  const ty = useTransform(tpos, (q) => q.y);
  const dash = useTransform(L, (l) => `${Math.max(0, l)} 1000000`);
  const progress = useTransform(L, (l) => (geo.total ? Math.min(1, Math.max(0, l / geo.total)) : 0));

  // ---- route from node markers ------------------------------------------
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const build = () => {
      const wr = wrap.getBoundingClientRect();
      const pts: P[] = [];
      visibleNodes(wrap).forEach((el) => {
        const r = el.getBoundingClientRect();
        pts.push({
          x: r.left - wr.left + r.width / 2,
          y: r.top - wr.top + r.height / 2,
          label: el.dataset.jpNode || "",
        });
      });
      if (!pts.length) return;
      // lead-in from the top edge, straight above the first node
      pts.unshift({ x: pts[0].x, y: 0, label: "" });
      const lens = [0];
      for (let i = 1; i < pts.length; i++) {
        lens.push(lens[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
      }
      const d = pts.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
      setGeo({ w: wr.width, h: wrap.scrollHeight, d, pts, lens, total: lens[lens.length - 1] });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    window.addEventListener("load", build);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", build);
    };
  }, []);

  // ---- scroll → arrow target --------------------------------------------
  useEffect(() => {
    const wrap = wrapRef.current;
    const { pts, lens } = geo;
    if (!wrap || pts.length < 2) return;
    const nodes = visibleNodes(wrap);
    let raf = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.5 - wrap.getBoundingClientRect().top;
      let l = 0;
      let x = pts[0].x;
      if (line >= pts[pts.length - 1].y) {
        l = lens[lens.length - 1];
        x = pts[pts.length - 1].x;
      } else if (line > 0) {
        for (let i = 1; i < pts.length; i++) {
          if (line < pts[i].y) {
            const f = (line - pts[i - 1].y) / (pts[i].y - pts[i - 1].y);
            l = lens[i - 1] + f * (lens[i] - lens[i - 1]);
            x = pts[i - 1].x + f * (pts[i].x - pts[i - 1].x);
            break;
          }
        }
      }
      target.set(l);
      setOnRight(x > geo.w / 2);
      let current = "";
      nodes.forEach((n, i) => {
        const reached = line >= pts[i + 1].y - 2;
        n.toggleAttribute("data-reached", reached);
        if (reached) current = pts[i + 1].label;
      });
      setLabel(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
      setMoving(true);
      clearTimeout(idle);
      idle = setTimeout(() => setMoving(false), 1100);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(idle);
    };
  }, [geo, target]);

  const ready = geo.pts.length > 1;
  const pill =
    "whitespace-nowrap rounded-full border border-white/15 bg-[#05070c]/90 px-3 py-1 text-[13px] font-medium text-white backdrop-blur transition-opacity duration-300";

  return (
    <div ref={wrapRef} className="relative overflow-x-clip">
      {/* the road */}
      {ready && (
        <svg aria-hidden width={geo.w} height={geo.h} className="pointer-events-none absolute left-0 top-0 overflow-visible">
          <defs>
            <linearGradient id="jp-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.5" stopColor="#a9bcff" />
              <stop offset="1" stopColor="#c4a8ff" />
            </linearGradient>
            <mask id="jp-travelled" maskUnits="userSpaceOnUse" x="0" y="0" width={geo.w} height={geo.h}>
              <m.path d={geo.d} fill="none" stroke="#fff" strokeWidth={10} style={{ strokeDasharray: dash }} />
            </mask>
          </defs>
          <path ref={pathRef} d={geo.d} fill="none" className="stroke-white/20" strokeWidth={1.5} strokeDasharray="1 8" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={geo.d}
            fill="none"
            stroke="url(#jp-glow)"
            strokeWidth={2.2}
            strokeDasharray="1 8"
            strokeLinecap="round"
            strokeLinejoin="round"
            mask="url(#jp-travelled)"
            style={{ filter: "drop-shadow(0 0 5px rgba(169,188,255,0.8))" }}
          />
        </svg>
      )}

      {/* below lg the content is indented so the road has a clear rail at
          the left edge of every card — the arrow never crosses text */}
      <div className="relative pl-[22px] lg:pl-0">{children}</div>

      {/* comet trail, then the arrow (its name label only on lg+, where
          there is room beside the road; phones show it in the top strip) */}
      {ready && (
        <>
          <m.div aria-hidden style={{ x: tx, y: ty }} className="pointer-events-none absolute left-0 top-0 z-20">
            <span className="absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a9bcff]/40 blur-[6px]" />
          </m.div>
          <m.div aria-hidden style={{ x: ax, y: ay }} className="pointer-events-none absolute left-0 top-0 z-30">
            <m.span
              style={{ rotate: ar }}
              className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#a9bcff] bg-[#05070c] text-white shadow-[0_0_28px_rgba(140,160,255,0.8)]"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2.5v10M4 9l4 4 4-4" />
              </svg>
            </m.span>
            {label && (
              <span className={`absolute top-0 hidden -translate-y-1/2 lg:block ${pill} ${onRight ? "right-7" : "left-7"} ${moving ? "opacity-100" : "opacity-0"}`}>
                {label}
              </span>
            )}
          </m.div>
        </>
      )}

      {/* below lg: the road in miniature under the navbar — a progress
          bar with one dot per stop, and the stop you are at */}
      {ready && (
        <div aria-hidden className="pointer-events-none fixed inset-x-0 top-16 z-40 lg:hidden">
          <div className="relative h-[3px] w-full bg-white/[0.08]">
            <m.div
              style={{ scaleX: progress }}
              className="h-full origin-left bg-gradient-to-r from-white via-[#a9bcff] to-[#c4a8ff] shadow-[0_0_12px_rgba(169,188,255,0.8)]"
            />
            {geo.lens.slice(1).map((l, i) => (
              <span
                key={i}
                style={{ left: `${(l / geo.total) * 100}%` }}
                className="absolute top-1/2 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-[#05070c]/60"
              />
            ))}
          </div>
          <span className={`absolute right-4 top-3 ${pill} ${label ? "opacity-100" : "opacity-0"}`}>{label || " "}</span>
        </div>
      )}
    </div>
  );
}
