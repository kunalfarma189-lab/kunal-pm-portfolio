import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroStory, { MobileCapabilities } from "@/components/home/HeroStory";
import FlowPreview from "@/components/home/FlowPreview";
import ScrollLine from "@/components/home/ScrollLine";
import { ArrowRight, contactIcons } from "@/components/home/Icons";
import {
  caseStudies,
  certifications,
  differentiators,
  education,
  experience,
  profile,
  proofStats,
  skillGroups,
} from "@/lib/content";

function SectionHead({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-500">
        <span className="font-mono text-[#a9bcff]">{index}</span>
        <span aria-hidden className="h-px w-8 bg-white/20" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-balance text-[clamp(2.4rem,4.6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-zinc-400">{intro}</p>
      )}
    </Reveal>
  );
}

const serifAccent = "font-serif font-normal italic tracking-[-0.01em] text-[#c3cfff]";

/* -------------------------------- why me -------------------------------- */

function WhyMe() {
  return (
    <section id="why" className="scroll-mt-16 py-20 sm:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <SectionHead
          index="01"
          eyebrow="Why me"
          title={
            <>
              Not just any PM — one who{" "}
              <span className={serifAccent}>builds, measures</span> and ships.
            </>
          }
        />

        <ol className="mt-12 grid gap-px overflow-hidden sm:mt-16 rounded-[1.75rem] border border-white/10 bg-white/10 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <li key={d.title} className="bg-[#05070c]">
              <Reveal delay={i * 90} className="h-full p-7 sm:p-10">
                <span className="font-mono text-sm text-zinc-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl font-semibold sm:mt-8 tracking-[-0.02em] text-white sm:text-[1.75rem]">
                  {d.title}
                </h3>
                <p className="mt-4 text-pretty text-[17px] leading-8 text-zinc-400">{d.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {proofStats.map((s) => (
              <div key={s.label} className="border-t border-white/10 pt-6">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                  {s.value}
                </dd>
                <dd className="mt-3 text-base text-zinc-300">{s.label}</dd>
                {s.source && <dd className="mt-1 text-sm text-zinc-500">{s.source}</dd>}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- case studies ----------------------------- */

function CaseStudies() {
  return (
    <section id="case-studies" className="scroll-mt-16 border-t border-white/[0.07] py-20 sm:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            index="02"
            eyebrow="Case studies"
            title={
              <>
                How I take a problem{" "}
                <span className={serifAccent}>apart.</span>
              </>
            }
            intro="Three independent analyses of real e-commerce problems — each worked from problem to proposed solution and the metrics I'd hold it to."
          />
          <Reveal>
            <p className="max-w-sm rounded-2xl border border-amber-300/25 bg-amber-300/[0.06] px-5 py-4 text-[15px] leading-6 text-amber-100/90">
              <strong className="font-semibold text-amber-200">Hypothetical.</strong> I have not
              worked for Amazon, Flipkart or Myntra, and no internal data is used.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-36">
          {caseStudies.map((cs, i) => (
            <article
              key={cs.slug}
              className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16"
            >
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-lg font-semibold text-white">{cs.company}</span>
                  <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">
                    Hypothetical
                  </span>
                </div>
                <h3 className="mt-5 text-balance text-[clamp(1.9rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                  {/* non-breaking hyphens: keep "drop-off" on one line */}
                  {cs.title.replace(/-/g, "‑")}
                </h3>
                <p className="mt-5 text-pretty text-lg leading-8 text-zinc-300">{cs.oneLiner}</p>

                <dl className="mt-10 space-y-7">
                  <CaseRow label="Approach">
                    Root-cause first. {cs.rootCauses[0]}.
                  </CaseRow>
                  <CaseRow label="Solution">{cs.solution[0]}.</CaseRow>
                  <CaseRow label="Outcome">
                    <span className="block text-zinc-500">
                      Not shipped — success would be measured by:
                    </span>
                    <span className="mt-3 flex flex-wrap gap-2">
                      {cs.metrics.slice(0, 3).map((m) => (
                        <span
                          key={m}
                          className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-zinc-200"
                        >
                          {m}
                        </span>
                      ))}
                    </span>
                  </CaseRow>
                </dl>

                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group mt-10 inline-flex items-center gap-2.5 text-base font-semibold text-white"
                >
                  <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-white">
                    Read the full case study
                  </span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>

              <Reveal delay={120} className={`lg:sticky lg:top-28 ${i % 2 ? "lg:order-1" : ""}`}>
                <FlowPreview steps={cs.flow} company={cs.company} />
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-white/10 pt-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
      <dt className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">{label}</dt>
      <dd className="text-pretty text-[17px] leading-7 text-zinc-300">{children}</dd>
    </div>
  );
}

/* ------------------------------ experience ------------------------------ */

function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-white/[0.07] py-20 sm:py-32">
      <div className="mx-auto grid max-w-[1360px] gap-16 px-5 sm:px-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-20">
        <div>
          <SectionHead
            index="03"
            eyebrow="Experience"
            title={
              <>
                Started on the floor,{" "}
                <span className={serifAccent}>moved into product.</span>
              </>
            }
          />

          <ol className="relative mt-16 space-y-14 pl-10 sm:pl-14">
            <ScrollLine className="bottom-2 left-[5px] top-2" />
            {experience.map((job) => (
              <li key={job.company} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-10 top-2 grid size-[11px] place-items-center rounded-full border border-white/50 bg-[#05070c] sm:-left-14"
                />
                <Reveal>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white">
                      {job.company}
                      <span className="font-normal text-zinc-400"> — {job.role}</span>
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {job.period} · {job.location}
                    </p>
                  </div>
                  <ul className="mt-5 max-w-3xl space-y-3">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3.5 text-[17px] leading-7 text-zinc-400">
                        <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-zinc-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={120} className="space-y-10 xl:pt-[12.5rem]">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Education</h3>
            <p className="mt-4 text-lg font-semibold text-white">{education.degree}</p>
            <p className="mt-1 text-base text-zinc-400">
              {education.period} · {education.detail}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              Certifications
            </h3>
            <ul className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {certifications.map((c) => (
                <li key={c} className="py-3 text-[15px] leading-6 text-zinc-300">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- skills -------------------------------- */

function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 border-t border-white/[0.07] py-20 sm:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <SectionHead
          index="04"
          eyebrow="Skills & tools"
          title={
            <>
              The toolkit, <span className={serifAccent}>kept short.</span>
            </>
          }
        />
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-16 sm:gap-x-10 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="border-t border-white/15 pt-6">
              <h3 className="text-lg font-semibold text-white">{g.title}</h3>
              <ul className="mt-5 space-y-3">
                {g.items.map((item) => (
                  <li key={item} className="text-base text-zinc-400 sm:text-[17px]">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- contact ------------------------------- */

function Contact() {
  const rows = [
    { key: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { key: "phone", label: "Phone", value: profile.phone, href: profile.phoneHref },
    { key: "linkedin", label: "LinkedIn", value: "in/kunal-farma", href: profile.linkedin, external: true },
    { key: "resume", label: "Resume", value: "Download PDF", href: profile.resumeUrl, download: true },
  ];

  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t border-white/[0.07] py-28 sm:py-40">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[32rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#5b6bff]/[0.12] blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1360px] gap-16 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <Reveal>
          <p className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            <span className="font-mono text-[#a9bcff]">05</span>
            <span aria-hidden className="h-px w-8 bg-white/20" />
            Contact
          </p>
          <h2 className="mt-5 text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
            Have a problem
            <br />
            worth <span className={serifAccent}>solving?</span>
          </h2>
          <p className="mt-7 max-w-md text-pretty text-lg leading-8 text-zinc-400">
            Open to Product Manager, Associate PM, Product Operations and AI Product Manager
            roles. Email is the fastest way to reach me.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {rows.map((r) => {
              const IconC = contactIcons[r.key];
              return (
                <li key={r.key}>
                  <a
                    href={r.href}
                    {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(r.download ? { download: "Kunal_Farma_PM_Resume.pdf" } : {})}
                    className="group flex items-center gap-5 py-5 sm:py-6"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-zinc-200 transition-colors group-hover:border-white/50">
                      {IconC({ className: "size-5" })}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-zinc-500">{r.label}</span>
                      <span className="block truncate text-lg font-medium text-white sm:text-xl">
                        {r.value}
                      </span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroStory />
      <MobileCapabilities />
      <WhyMe />
      <CaseStudies />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
