import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Tilt } from "@/components/home/Motion";
import { SpineNode } from "@/components/home/Story";
import { ArrowRight, capabilityIcons } from "@/components/home/Icons";
import { portfolio, type PortfolioTag } from "@/lib/content";

const serifAccent = "font-serif font-normal italic tracking-[-0.01em] text-[#c3cfff]";
const wrap = "mx-auto max-w-[1240px] px-5 sm:px-8";
const h2 =
  "mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white";

const tagStyle: Record<PortfolioTag, string> = {
  "Real work": "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Practice: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Sample: "border-[#a9bcff]/30 bg-[#a9bcff]/10 text-[#c3cfff]",
  "On request": "border-white/15 bg-white/[0.04] text-zinc-300",
};

/*
 * Build Portfolio — six tiles a performance-marketing hiring manager
 * asks for. Each tile opens (native <details>) to the items behind it,
 * every item tagged honestly: real work, practice, sample or on request.
 */
export default function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-16 pt-16 sm:pt-36">
      <div className={wrap}>
        <SpineNode icon="design" label="Portfolio" side="left" size="md" className="-ml-7 lg:mx-auto" />
        <Reveal className="mt-8 text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-500">Build portfolio</p>
          <div className="mask">
            <h2 className={h2}>
              The work, <span className={serifAccent}>by type.</span>
            </h2>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-7 text-zinc-400">
            Campaigns, projects, pages, creatives and plans. Real work is marked green; practice, samples and
            things I share on request are marked too.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {portfolio.map((group, i) => {
            const real = group.items.filter((it) => it.tag === "Real work").length;
            return (
              <Reveal key={group.key} delay={i * 80} className="h-full">
                <Tilt max={3} className="h-full">
                  <details className="group/p flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-[#090c14] p-6 transition-colors duration-500 open:border-[#a9bcff]/40 hover:border-white/30 sm:p-7">
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start justify-between gap-4">
                        <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/20 text-zinc-100">
                          {capabilityIcons[group.icon]({ className: "size-5" })}
                        </span>
                        <svg
                          aria-hidden
                          viewBox="0 0 16 16"
                          className="mt-3 size-4 text-zinc-500 transition-transform duration-300 group-open/p:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m4 6 4 4 4-4" />
                        </svg>
                      </span>
                      <span className="mt-5 block text-[1.4rem] font-semibold leading-tight tracking-[-0.025em] text-white">
                        {group.title}
                      </span>
                      <span className="mt-2 block text-[15px] leading-6 text-zinc-400">{group.blurb}</span>
                      <span className="mt-4 flex flex-wrap gap-2 text-[12px] text-zinc-500">
                        <span className="rounded-full border border-white/10 px-2.5 py-1">
                          {group.items.length} {group.items.length === 1 ? "item" : "items"}
                        </span>
                        {real ? (
                          <span className="rounded-full border border-emerald-300/25 px-2.5 py-1 text-emerald-200/90">
                            {real} real
                          </span>
                        ) : null}
                      </span>
                    </summary>

                    <ul className="drop-in mt-5 space-y-3 border-t border-white/10 pt-5">
                      {group.items.map((it) => {
                        const inner = (
                          <>
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-[15px] font-semibold text-white">{it.title}</span>
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${tagStyle[it.tag]}`}
                              >
                                {it.tag}
                              </span>
                            </span>
                            <span className="mt-1.5 block text-[14px] leading-6 text-zinc-400">{it.body}</span>
                            {it.href ? (
                              <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#a9bcff]">
                                Open
                                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/i:translate-x-1" />
                              </span>
                            ) : null}
                          </>
                        );
                        const tile = "block rounded-2xl border border-white/10 bg-white/[0.02] p-4";
                        return (
                          <li key={it.title}>
                            {it.href ? (
                              <Link
                                href={it.href}
                                className={`group/i ${tile} transition-colors hover:border-[#a9bcff]/50 hover:bg-white/[0.04]`}
                              >
                                {inner}
                              </Link>
                            ) : (
                              <div className={tile}>{inner}</div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
