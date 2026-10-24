import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies — Kunal Farma",
  description:
    "Hypothetical, independent product analyses of Amazon, Flipkart, and Myntra — problem statement to learnings, clearly labelled as exercises.",
};

export default function CaseStudiesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Case Studies
        </p>
        <h1 className="mt-2 text-balance text-[38px] font-bold leading-tight tracking-tight text-white sm:text-5xl">
          How I break product problems down
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-zinc-400">
          Each analysis runs the same structure: problem, users, evidence and
          assumptions, root causes, solution, flow, metrics, risks, and
          learnings.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-8 max-w-3xl">
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
          <strong>Hypothetical case studies.</strong> These are independent
          product analyses published as thinking exercises — I have not worked
          for Amazon, Flipkart, or Myntra, and no internal company data is
          used. (I have managed seller-side catalogs on Amazon and Flipkart at
          VLE Bazaar; that operational familiarity is the only connection.)
        </div>
      </Reveal>

      <div className="mt-14 grid gap-7 md:grid-cols-3">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 100} className="h-full">
            <Link
              href={`/case-studies/${cs.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-[#232830] bg-[#10141A] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.35)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-lg font-bold tracking-tight text-white">
                  {cs.company}
                </span>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                  Hypothetical
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold leading-snug text-white">
                {cs.title}
              </h2>
              <p className="mt-3 text-pretty text-base leading-7 text-zinc-400">
                {cs.oneLiner}
              </p>
              <div className="mt-auto pt-6">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-300 transition-colors group-hover:text-indigo-200">
                  View case study
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
