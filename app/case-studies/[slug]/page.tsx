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
    title: `${cs.company} case study${cs.kind === "work" ? "" : " (practice)"} — Kunal Farma`,
    description: cs.oneLiner,
  };
}

/*
 * A case study reads in the same four steps as the homepage. Every block
 * is a tile, a card or a stepper rather than a paragraph, so the page
 * scans in one pass; the summary strip at the top gives it in one glance.
 */

const serifAccent = "font-serif font-normal italic tracking-[-0.01em] text-[#c3cfff]";
const card = "rounded-2xl border border-white/10 bg-[#090c14]";

const chapters = [
  { id: "discover", n: "01", label: "Discover", icon: "research", title: "What is the problem?" },
  { id: "define", n: "02", label: "Define", icon: "strategy", title: "What should we build, and why?" },
  { id: "deliver", n: "03", label: "Deliver", icon: "execution", title: "How do we build it?" },
  { id: "measure", n: "04", label: "Measure", icon: "data", title: "Did it work?" },
] as const;

function Chapter({ i, children }: { i: 0 | 1 | 2 | 3; children: React.ReactNode }) {
  const ch = chapters[i];
  return (
    <Reveal>
      <section id={ch.id} aria-labelledby={`h-${ch.id}`} className="scroll-mt-32 border-t border-white/10 pt-10 sm:pt-12">
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/25 bg-[#090c14] text-zinc-100">
            {capabilityIcons[ch.icon]({ className: "size-5" })}
          </span>
          <div>
            <p className="font-mono text-sm text-[#a9bcff]">
              {ch.n} <span className="text-zinc-500">· {ch.label}</span>
            </p>
            <h2 id={`h-${ch.id}`} className="mt-0.5 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[1.75rem]">
              {ch.title}
            </h2>
          </div>
        </div>
        <div className="mt-8 space-y-10">{children}</div>
      </section>
    </Reveal>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-zinc-500">{children}</h3>;
}

/* Evidence lines carry their source in the text; show it as a tag instead. */
function evidenceTag(s: string): { tag: string; icon: string; text: string } {
  const m = s.match(/^(My guess|Public reports|Industry reports|Reports):\s*/i);
  if (!m) return { tag: "Observed", icon: "research", text: s };
  const guess = /guess/i.test(m[1]);
  return { tag: guess ? "Guess" : "Report", icon: guess ? "bulb" : "chart", text: s.slice(m[0].length) };
}

/* Full-width stepper: numbered circles on one dotted line (vertical on phones). */
function Stepper({ steps }: { steps: string[] }) {
  const half = `${50 / steps.length}%`;
  return (
    <ol
      className="relative grid gap-5 sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))] sm:gap-2"
      style={{ "--cols": steps.length } as React.CSSProperties}
    >
      {/* the dotted line behind the circles: vertical on phones, horizontal from sm */}
      <li aria-hidden className="absolute bottom-[22px] left-[21px] top-[22px] border-l border-dashed border-white/25 sm:hidden" />
      <li
        aria-hidden
        className="absolute top-[22px] hidden border-t border-dashed border-white/25 sm:block"
        style={{ left: half, right: half }}
      />
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s} className="relative flex items-center gap-4 sm:flex-col sm:gap-3 sm:text-center">
            <span
              className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-full border font-mono text-sm ${
                last ? "border-[#a9bcff] bg-[#a9bcff]/15 text-white" : "border-white/30 bg-[#05070c] text-zinc-300"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`text-[15px] leading-snug ${last ? "font-medium text-white" : "text-zinc-300"}`}>{s}</span>
          </li>
        );
      })}
    </ol>
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
  const summary = [
    { icon: "strategy", k: "Goal", v: cs.define.goal },
    { icon: "execution", k: "Do this first", v: cs.define.bets[0] },
    { icon: "data", k: "Main number to watch", v: cs.measure.metrics[0] },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
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
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[15px] leading-6 text-zinc-300">
            <strong className="font-semibold text-white">Practice case study.</strong> A real-world
            problem worked with my full method, so you can see how I think. Not work for{" "}
            {cs.company}: numbers are public reports or marked as my guess.
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
        <h1 className="mt-4 max-w-3xl text-balance text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
          {/* non-breaking hyphens keep "seven-step" / "drop-off" together */}
          {cs.title.replace(/-/g, "‑")}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-zinc-400">{cs.oneLiner}</p>
      </Reveal>

      {/* one-glance summary */}
      <Reveal delay={200} className="mt-10">
        <dl className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-3">
          {summary.map((s) => (
            <div key={s.k} className="bg-[#090c14] p-5">
              <dt className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                {capabilityIcons[s.icon]({ className: "size-4 text-[#a9bcff]" })}
                {s.k}
              </dt>
              <dd className="mt-2.5 text-[15px] leading-6 text-zinc-200">{s.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* chapter jump bar */}
      <nav
        aria-label="Chapters"
        className="sticky top-16 z-20 -mx-5 mt-10 bg-[#05070c]/85 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8"
      >
        <ol className="flex flex-wrap gap-2">
          {chapters.map((ch) => (
            <li key={ch.id}>
              <a
                href={`#${ch.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
              >
                <span className="font-mono text-xs text-[#a9bcff]">{ch.n}</span>
                {ch.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-6 space-y-14">
        {/* ------------------------------ 01 ------------------------------ */}
        <Chapter i={0}>
          <p className="max-w-3xl text-pretty text-[17px] leading-8 text-zinc-300">{cs.discover.problem}</p>

          <div>
            <Label>Who it affects</Label>
            <ul className="grid gap-3 sm:grid-cols-3">
              {cs.discover.users.map((u) => (
                <li key={u} className={`${card} flex items-start gap-3 p-4`}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-zinc-200">
                    {capabilityIcons.research({ className: "size-4" })}
                  </span>
                  <span className="text-[15px] leading-6 text-zinc-200">{u}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Label>Why it happens</Label>
            <ol className="grid gap-3 sm:grid-cols-2">
              {cs.discover.rootCauses.map((r, i) => (
                <li key={r} className={`${card} flex gap-4 p-5`}>
                  <span className="font-mono text-sm text-[#a9bcff]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16px] leading-7 text-zinc-200">{r}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <Label>What we know so far</Label>
            <ul className="grid gap-3 sm:grid-cols-3">
              {cs.discover.evidence.map((e) => {
                const t = evidenceTag(e);
                return (
                  <li key={e} className={`${card} p-4`}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-300">
                      {capabilityIcons[t.icon]({ className: "size-3.5 text-[#a9bcff]" })}
                      {t.tag}
                    </span>
                    <p className="mt-3 text-[15px] leading-6 text-zinc-300">{t.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Chapter>

        {/* ------------------------------ 02 ------------------------------ */}
        <Chapter i={1}>
          <div>
            <Label>Goal</Label>
            <p className="max-w-3xl text-pretty text-[1.35rem] font-medium leading-snug tracking-[-0.01em] text-white sm:text-2xl">
              {cs.define.goal}
            </p>
          </div>

          <div>
            <Label>Build in this order</Label>
            <ol className="space-y-3">
              {cs.define.bets.map((b, i) => {
                const first = i === 0;
                return (
                  <li
                    key={b}
                    className={`rounded-2xl border p-5 ${
                      first ? "border-[#a9bcff]/40 bg-[#a9bcff]/[0.06]" : "border-white/10 bg-[#090c14]"
                    }`}
                  >
                    <div className="flex gap-4">
                      <span className={`pt-0.5 font-mono text-sm ${first ? "text-[#a9bcff]" : "text-zinc-500"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[17px] leading-7 text-white">{b}</p>
                        {first && (
                          <p className="mt-3 border-t border-[#a9bcff]/20 pt-3 text-[15px] leading-6 text-zinc-300">
                            <span className="font-semibold text-[#c3cfff]">Why first: </span>
                            {cs.define.whyFirst}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Chapter>

        {/* ------------------------------ 03 ------------------------------ */}
        <Chapter i={2}>
          <div>
            <Label>How it works for the customer</Label>
            <div className={`${card} p-5 sm:p-6`}>
              <Stepper steps={cs.deliver.flow} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Build first", cs.deliver.now, true],
              ["Build later", cs.deliver.later, false],
            ].map(([k, items, accent]) => (
              <div key={k as string} className={`rounded-2xl border p-5 ${accent ? "border-[#a9bcff]/30 bg-[#a9bcff]/[0.04]" : "border-white/10 bg-[#090c14]"}`}>
                <h3 className="text-[13px] font-medium uppercase tracking-[0.2em] text-zinc-500">{k as string}</h3>
                <ul className="mt-4 space-y-3">
                  {(items as string[]).map((it) => (
                    <li key={it} className="flex gap-3 text-[15px] leading-6 text-zinc-200">
                      <span aria-hidden className={`mt-[0.6rem] size-1.5 shrink-0 rounded-full ${accent ? "bg-[#a9bcff]" : "bg-zinc-600"}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <Label>What could go wrong</Label>
            <ul className="grid gap-3 sm:grid-cols-3">
              {cs.deliver.risks.map((r) => (
                <li key={r} className={`${card} p-4`}>
                  <span className="grid size-8 place-items-center rounded-full border border-amber-300/30 text-amber-200">
                    {capabilityIcons.alert({ className: "size-4" })}
                  </span>
                  <p className="mt-3 text-[15px] leading-6 text-zinc-300">{r}</p>
                </li>
              ))}
            </ul>
          </div>
        </Chapter>

        {/* ------------------------------ 04 ------------------------------ */}
        <Chapter i={3}>
          <div>
            <Label>Numbers to watch</Label>
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
          </div>

          <div>
            <Label>How I would test it</Label>
            <dl className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: "research", k: "Who", v: cs.measure.experiment.who },
                { icon: "data", k: "Main check", v: cs.measure.experiment.check },
                { icon: "checklist", k: "Also watch", v: cs.measure.experiment.guard },
              ].map((t) => (
                <div key={t.k} className={`${card} p-4`}>
                  <dt className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    {capabilityIcons[t.icon]({ className: "size-4 text-[#a9bcff]" })}
                    {t.k}
                  </dt>
                  <dd className="mt-2.5 text-[15px] leading-6 text-zinc-200">{t.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <Label>What I learned</Label>
            <ul className="grid gap-3 sm:grid-cols-2">
              {cs.measure.learnings.map((l) => (
                <li key={l} className="rounded-2xl border border-[#a9bcff]/25 bg-[#a9bcff]/[0.06] p-5 text-[17px] leading-7 text-zinc-100">
                  <span className={`${serifAccent} mr-2 text-2xl leading-none`}>“</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </Chapter>
      </div>

      <Reveal className="mt-16 border-t border-white/10 pt-8">
        <Link
          href={`/case-studies/${next.slug}`}
          className={`group flex items-center justify-between gap-4 rounded-[1.5rem] ${card} p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/30 sm:p-6`}
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
