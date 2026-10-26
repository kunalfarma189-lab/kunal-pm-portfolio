"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { capabilityIcons } from "./Icons";

/*
 * Spine building blocks.
 *
 * SpineNode — the icon on the zig-zag spine. The outer element carries
 * `data-jp-node` and never moves (JourneyPath measures it); inside, the
 * icon drops in with a gravity bounce, then floats. It glows once the
 * journey arrow has reached it (`data-reached`, set by JourneyPath).
 *
 * StationRow — a node in the middle, a card that drops in with a gravity
 * bounce, and a big outlined step word filling the opposite side. Sides
 * alternate row to row, so the page zig-zags.
 */

const spring = { type: "spring", stiffness: 210, damping: 14, mass: 1 } as const;

export function SpineNode({
  icon,
  label,
  side,
  size = "lg",
}: {
  icon: string;
  label: string;
  side: "left" | "right";
  size?: "lg" | "md";
}) {
  const reduce = useReducedMotion();
  const box = size === "lg" ? "size-20" : "size-14";
  const glyph = size === "lg" ? "size-8" : "size-6";
  return (
    <motion.div
      initial={reduce ? false : "up"}
      whileInView="down"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      data-jp-node={label}
      className={`group/node relative z-10 w-fit lg:mx-auto ${
        side === "left" ? "-translate-x-1.5 lg:-translate-x-12" : "translate-x-1.5 lg:translate-x-12"
      }`}
    >
      <motion.div
        variants={{
          up: { y: -140, opacity: 0, scale: 0.8 },
          down: { y: 0, opacity: 1, scale: 1, transition: { ...spring, opacity: { duration: 0.25 } } },
        }}
      >
        <span className="float block" style={{ animationDelay: side === "left" ? "0s" : "1.6s" }}>
          <span
            className={`relative grid ${box} place-items-center rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),rgba(120,135,255,0.08)_45%,#070a12_75%)] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-[border-color,box-shadow] duration-500 group-data-[reached]/node:border-[#a9bcff] group-data-[reached]/node:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_44px_rgba(140,160,255,0.55)]`}
          >
            {capabilityIcons[icon]({ className: glyph })}
          </span>
        </span>
      </motion.div>
    </motion.div>
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
  // cards drop in from above with a slight tilt and settle with a bounce
  const tilt = side === "left" ? -2.5 : 2.5;

  const card = (
    <motion.div
      initial={reduce ? false : "up"}
      whileInView="down"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <motion.div
        variants={{
          up: { y: -70, rotate: tilt, opacity: 0 },
          down: {
            y: 0,
            rotate: 0,
            opacity: 1,
            transition: { ...spring, delay: 0.1, opacity: { duration: 0.4, delay: 0.1 } },
          },
        }}
        className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-7 shadow-[0_40px_80px_-50px_rgba(100,110,255,0.6)] backdrop-blur-md sm:p-9"
      >
        <p className="font-mono text-sm text-[#a9bcff]">
          {String(index).padStart(2, "0")} <span className="text-zinc-500">· {step}</span>
        </p>
        {children}
    </motion.div>
    </motion.div>
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
    <div className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-4 lg:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] lg:gap-x-10">
      <div className="lg:hidden">
        <SpineNode icon={icon} label={`${String(index).padStart(2, "0")} ${step}`} side={side} size="md" />
      </div>
      <div className={side === "left" ? "lg:order-1" : "lg:order-3"}>{card}</div>
      <div className="hidden lg:order-2 lg:block">
        <SpineNode icon={icon} label={`${String(index).padStart(2, "0")} ${step}`} side={side} />
      </div>
      <div className={side === "left" ? "lg:order-3" : "lg:order-1"}>{ghost}</div>
    </div>
  );
}
