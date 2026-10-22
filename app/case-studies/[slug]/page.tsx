import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    title: `${cs.company} case study (hypothetical) — Kunal Farma`,
    description: cs.oneLiner,
  };
}

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/5 py-8 first:border-t-0 first:pt-0">
      <h2 className="flex items-baseline gap-3 text-lg font-semibold text-white">
        <span className="font-mono text-sm text-indigo-400">
          {String(n).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-6 text-zinc-400">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
          {item}
        </li>
      ))}
    </ul>
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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/case-studies"
        className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
      >
        ← All case studies
      </Link>

      <div className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
        <strong>Hypothetical case study.</strong> An independent product
        analysis published as a thinking exercise — I have not worked for{" "}
        {cs.company}, and no internal company data is used.
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-sm font-bold uppercase tracking-widest text-indigo-300">
          {cs.company}
        </span>
        {cs.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-500"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {cs.title}
      </h1>
      <p className="mt-4 text-base leading-7 text-zinc-400">{cs.oneLiner}</p>

      <div className="mt-10">
        <Section n={1} title="Problem statement">
          <p className="text-sm leading-7 text-zinc-400">{cs.problem}</p>
        </Section>

        <Section n={2} title="Target users">
          <Bullets items={cs.targetUsers} />
        </Section>

        <Section n={3} title="Evidence & research assumptions">
          <Bullets items={cs.evidence} />
        </Section>

        <Section n={4} title="Root cause analysis">
          <Bullets items={cs.rootCauses} />
        </Section>

        <Section n={5} title="Proposed solution">
          <Bullets items={cs.solution} />
        </Section>

        <Section n={6} title="User flow">
          <div className="flex flex-wrap items-center gap-2">
            {cs.flow.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200">
                  {step}
                </span>
                {i < cs.flow.length - 1 && (
                  <span aria-hidden className="text-indigo-400">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </Section>

        <Section n={7} title="Success metrics">
          <div className="flex flex-wrap gap-2">
            {cs.metrics.map((metric) => (
              <span
                key={metric}
                className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-sm text-indigo-300"
              >
                {metric}
              </span>
            ))}
          </div>
        </Section>

        <Section n={8} title="Risks & trade-offs">
          <Bullets items={cs.risks} />
        </Section>

        <Section n={9} title="Learnings">
          <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/5 p-5">
            <Bullets items={cs.learnings} />
          </div>
        </Section>
      </div>

      <div className="mt-12 border-t border-white/10 pt-8">
        <Link
          href={`/case-studies/${next.slug}`}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-indigo-400/40"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Next case study
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {next.company} — {next.title}
            </p>
          </div>
          <span className="text-indigo-300 transition group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
