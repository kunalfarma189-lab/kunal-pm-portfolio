"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { capabilityIcons } from "./Icons";
import { Tilt } from "./Motion";

/*
 * Spine building blocks.
 *
 * SpineNode — an icon on the journey. The outer element carries
 * `data-jp-node` and never moves (JourneyPath measures it); inside, the
 * icon drops in with a gravity bounce, then floats. Once the journey
 * arrow reaches it (`data-reached`, set by JourneyPath) it glows and a
 * ring pulses out of it.
 *
 * StationRow — one "how I work" step. The card slides in from its side
 * of the spine and settles with a bounce, and tilts toward the pointer on
 * desktop. On lg+ the node sits in a centre column and a big outlined
 * step word fills the opposite side; below lg the node sits on a rail at
 * the card's left edge (a straight timeline) and the card fills the rest.
 */

const spring = { type: "spring", stiffness: 210, damping: 14, mass: 1 } as const;

export function SpineNode({
  icon,
  label,
  side,
  size = "lg",
  className = "",
}: {
  icon: string;
  label: string;
  side: "left" | "right";
  size?: "lg" | "md" | "sm";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const box = { lg: "size-20", md: "size-14", sm: "size-11" }[size];
  const glyph = { lg: "size-8", md: "size-6", sm: "size-5" }[size];
  // desktop zig-zag: nodes sit a little left/right of the centre column
  const offset = side === "left" ? "lg:-translate-x-12" : "lg:translate-x-12";
  return (
    <m.div
      initial={reduce ? false : "up"}
      whileInView="down"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      data-jp-node={label}
      className={`group/node relative z-10 w-fit ${offset} ${className}`}
    >
      <m.div
        variants={{
          up: { y: -120, opacity: 0, scale: 0.8 },
          down: { y: 0, opacity: 1, scale: 1, transition: { ...spring, opacity: { duration: 0.25 } } },
        }}
      >
        <span className="float block" style={{ animationDelay: side === "left" ? "0s" : "1.6s" }}>
          <span
            className={`node-ring relative grid ${box} place-items-center rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),rgba(120,135,255,0.08)_45%,#070a12_75%)] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-[border-color,box-shadow] duration-500 group-data-[reached]/node:border-[#a9bcff] group-data-[reached]/node:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_44px_rgba(140,160,255,0.55)]`}
          >
            {capabilityIcons[icon]({ className: glyph })}
          </span>
        </span>
      </m.div>
    </m.div>
  );
}

export function StationRow({
  index,
  step,
  icon,
  side,
  children,
}: {
  index: number;
  step: string;
  icon: string;
  side: "left" | "right";
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const n = String(index).padStart(2, "0");
  const label = `${n} ${step}`;
  // arrive from the card's own side, slightly tilted, and settle
  const fromX = side === "left" ? -80 : 80;
  const tilt = side === "left" ? -2.5 : 2.5;

  const card = (
    <m.div
      initial={reduce ? false : "up"}
      whileInView="down"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <m.div
        variants={{
          up: { x: fromX, rotate: tilt, opacity: 0 },
          down: {
            x: 0,
            rotate: 0,
            opacity: 1,
            transition: { ...spring, delay: 0.1, opacity: { duration: 0.4, delay: 0.1 } },
          },
        }}
      >
        <Tilt className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-6 shadow-[0_40px_80px_-50px_rgba(100,110,255,0.6)] sm:p-9 lg:backdrop-blur-md">
          <p className="font-mono text-sm text-[#a9bcff]">
            {n} <span className="text-zinc-500">· {step}</span>
          </p>
          {children}
        </Tilt>
      </m.div>
    </m.div>
  );

  const ghost = (
    <div aria-hidden className="hidden select-none lg:block">
      <span
        className={`float-slow block text-[clamp(5rem,9vw,8.5rem)] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)] ${
          side === "left" ? "text-left" : "text-right"
        }`}
      >
        {step}
      </span>
    </div>
  );

  return (
    <div
      id={`step-${index}`}
      className="relative scroll-mt-24 lg:grid lg:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] lg:items-center lg:gap-x-10"
    >
      {/* below lg: the node sits on the rail at the card's left edge
          (JourneyPath indents the content by 22px to make room) */}
      <div className="absolute -left-[22px] top-4 lg:hidden">
        <SpineNode icon={icon} label={label} side={side} size="sm" />
      </div>
      <div className={side === "left" ? "lg:order-1" : "lg:order-3"}>{card}</div>
      <div className="hidden lg:order-2 lg:block">
        <SpineNode icon={icon} label={label} side={side} className="mx-auto" />
      </div>
      <div className={side === "left" ? "lg:order-3" : "lg:order-1"}>{ghost}</div>
    </div>
  );
}
