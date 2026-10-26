import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ArrowRight, capabilityIcons } from "@/components/home/Icons";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.company} case study${cs.kind === "work" ? "" : " (hypothetical)"} — Kunal Farma`,
    description: cs.oneLiner,
  };
}

/*
 * A case study reads in the same four steps as the homepage:
 * Discover → Define → Deliver → Measure. Each chapter is one numbered
 * block; the summary strip at the top gives the whole thing in one glance.
 */

const serifAccent = "font-serif font-normal italic tracking-[-0.01em] text-[#c3cfff]";

const chapters = [
  { n: "01", label: "Discover", icon: "research", title: "What is the problem?" },
  { n: "02", label: "Define", icon: "strategy", title: "What should we build, and why?" },
  { n: "03", label: "Deliver", icon: "execution", title: "How do we build it?" },
  { n: "04", label: "Measure", icon: "data", title: "Did it work?" },
] as const;

function Chapter({ i, children }: { i: 0 | 1 | 2 | 3; children: React.ReactNode }) {
  const ch = chapters[i];
  return (
    <Reveal className="border-t border-white/10 pt-10 sm:pt-12">
      <section aria-labelledby={`ch-${ch.n}`}>
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/25 bg-[#090c14] text-zinc-100">
            {capabilityIcons[ch.icon]({ className: "size-5" })}
          </span>
          <div>
            <p className="font-mono text-sm text-[#a9bcff]">
              {ch.n} <span className="text-zinc-500">· {ch.label}</span>
            </p>
            <h2 id={`ch-${ch.n}`} className="mt-0.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[1.75rem]">
              {ch.title}
            </h2>
          </div>
        </div>
        <div className="mt-8 space-y-9">{children}</div>
      </section>
    </Reveal>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[13px] font-medium uppercase tracking-[0.2em] text-zinc-500">{label}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Bullets({ items, numbered }: { items: string[]; numbered?: boolean }) {
  const Tag = numbered ? "ol" : "ul";
  return (
    <Tag className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4 text-[17px] leading-7 text-zinc-300">
          {numbered ? (
            <span className="mt-0.5 shrink-0 font-mono text-sm text-[#a9bcff]">{String(i + 1).padStart(2, "0")}</span>
          ) : (
            <span aria-hidden className="mt-[0.95rem] h-px w-3.5 shrink-0 bg-zinc-600" />
          )}
          {item}
        </li>
      ))}
    </Tag>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#a9bcff]/25 bg-[#a9bcff]/[0.06] p-5 text-[17px] leading-7 text-zinc-200 sm:p-6">
      {children}
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const idx = caseStudies.indexOf(cs);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowRight className="size-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          All case studies
        </Link>
      </Reveal>

      <Reveal delay={80} className="mt-8">
        {cs.kind === "work" ? (
          <p className="rounded-2xl border border-emerald-300/25 bg-emerald-300/[0.06] p-4 text-[15px] leading-6 text-emerald-100/90">
            <strong className="font-semibold text-emerald-200">From my work at {cs.company}.</strong>{" "}
            Written from the problem I was given. Details are kept general and no internal
            numbers are shared.
          </p>
        ) : (
          <p className="rounded-2xl border border-amber-300/25 bg-amber-300/[0.06] p-4 text-[15px] leading-6 text-amber-100/90">
            <strong className="font-semibold text-amber-200">Practice case study.</strong> I have
            not worked for {cs.company}. My own thinking, no inside data — every number is a public
            report or marked as my guess.
          </p>
        )}
      </Reveal>

      <Reveal delay={140} className="mt-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a9bcff]">{cs.company}</span>
          {cs.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-balance text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
          {/* non-breaking hyphens keep "seven-step" / "drop-off" together */}
          {cs.title.replace(/-/g, "‑")}
        </h1>
        <p className="mt-5 text-pretty text-lg leading-8 text-zinc-400">{cs.oneLiner}</p>
      </Reveal>

      {/* one-glance summary */}
      <Reveal delay={200} className="mt-10">
        <dl className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            ["Goal", cs.define.goal],
            ["Do this first", cs.define.bets[0]],
            ["Main number to watch", cs.measure.metrics[0]],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#090c14] p-5">
              <dt className="text-[12px] font-medium uppercase tracking-[0.2em] text-zinc-500">{k}</dt>
              <dd className="mt-2 text-[15px] leading-6 text-zinc-200">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-14 space-y-14">
        <Chapter i={0}>
          <Block label="The problem">
            <p className="text-pretty text-[17px] leading-8 text-zinc-300">{cs.discover.problem}</p>
          </Block>
          <Block label="Who it affects">
            <Bullets items={cs.discover.users} />
          </Block>
          <Block label="What we know so far">
            <Bullets items={cs.discover.evidence} />
          </Block>
          <Block label="Why it happens">
            <Bullets items={cs.discover.rootCauses} numbered />
          </Block>
        </Chapter>

        <Chapter i={1}>
          <Block label="Goal">
            <p className="text-pretty text-[1.35rem] font-medium leading-snug tracking-[-0.01em] text-white sm:text-2xl">
              {cs.define.goal}
            </p>
          </Block>
          <Block label="What to build, in this order">
            <Bullets items={cs.define.bets} numbered />
          </Block>
          <Block label="Why start with number 1">
            <Callout>{cs.define.whyFirst}</Callout>
          </Block>
        </Chapter>

        <Chapter i={2}>
          <Block label="How it works for the customer">
            <ol className="flex flex-wrap items-center gap-2">
              {cs.deliver.flow.map((step, i) => {
                const last = i === cs.deliver.flow.length - 1;
                return (
                  <li key={step} className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-3.5 py-1.5 text-[15px] ${
                        last ? "border-[#a9bcff]/50 bg-[#a9bcff]/10 text-white" : "border-white/15 text-zinc-200"
                      }`}
                    >
                      {step}
                    </span>
                    {!last && <ArrowRight className="size-4 text-zinc-500" />}
                  </li>
                );
              })}
            </ol>
          </Block>
          <div className="grid gap-9 sm:grid-cols-2">
            <Block label="Build first">
              <Bullets items={cs.deliver.now} />
            </Block>
            <Block label="Build later">
              <Bullets items={cs.deliver.later} />
            </Block>
          </div>
          <Block label="What could go wrong">
            <Bullets items={cs.deliver.risks} />
          </Block>
        </Chapter>

        <Chapter i={3}>
          <Block label="Numbers to watch">
            <ul className="flex flex-wrap gap-2">
              {cs.measure.metrics.map((m, i) => (
                <li
                  key={m}
                  className={`rounded-full border px-3.5 py-1.5 text-[15px] ${
                    i === 0 ? "border-[#a9bcff]/50 bg-[#a9bcff]/10 text-white" : "border-white/15 text-zinc-200"
                  }`}
                >
                  {i === 0 && <span className="mr-1.5 font-mono text-xs text-[#a9bcff]">main</span>}
                  {m}
                </li>
              ))}
            </ul>
          </Block>
          <Block label="How I would test it">
            <p className="text-pretty text-[17px] leading-8 text-zinc-300">{cs.measure.experiment}</p>
          </Block>
          <Block label="What I learned">
            <Callout>
              <Bullets items={cs.measure.learnings} />
            </Callout>
          </Block>
        </Chapter>
      </div>

      <Reveal className="mt-16 border-t border-white/10 pt-8">
        <Link
          href={`/case-studies/${next.slug}`}
          className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-[#090c14] p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/30 sm:p-6"
        >
          <span>
            <span className="block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Next case study
            </span>
            <span className="mt-1.5 block text-base font-semibold text-white sm:text-lg">
              {next.company} — <span className={serifAccent}>{next.title}</span>
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-zinc-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
        </Link>
      </Reveal>
    </div>
  );
}
