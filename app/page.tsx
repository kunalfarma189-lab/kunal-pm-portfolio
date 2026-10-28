import Link from "next/link";
import Reveal from "@/components/Reveal";
import Hero from "@/components/home/Hero";
import JourneyPath from "@/components/home/JourneyPath";
import FlowPreview from "@/components/home/FlowPreview";
import Spotlight from "@/components/home/Spotlight";
import { Aurora, CountUp, GravityChips, Tilt } from "@/components/home/Motion";
import { SpineNode, StationRow } from "@/components/home/Story";
import { ArrowRight, capabilityIcons, contactIcons } from "@/components/home/Icons";
import {
  caseStudies,
  caseStudiesAreDemo,
  certifications,
  credentials,
  experience,
  profile,
  proofStats,
  stations,
  toolkit,
} from "@/lib/content";

/*
 * The homepage is one journey: a zig-zag spine (JourneyPath) runs from the
 * hero to contact through every SpineNode. First the four "how I work"
 * stations — Discover → Define → Deliver → Measure — then the proof: case
 * studies, experience, toolkit. On lg+ the stations alternate sides of the
 * spine; on phones every node sits on a left rail (a straight timeline)
 * mirrored by a progress strip under the navbar.
 */

const serifAccent = "font-serif font-normal italic tracking-[-0.01em] text-[#c3cfff]";
const wrap = "mx-auto max-w-[1240px] px-5 sm:px-8";
const h2 = "mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white";

function CenterHead({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <Reveal className="mt-8 text-center">
      <p className="text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-500">{eyebrow}</p>
      <div className="mask">
        <h2 className={h2}>{title}</h2>
      </div>
    </Reveal>
  );
}

/* ------------------------------ how I work ------------------------------ */

function HowIWork() {
  const measured = proofStats.filter((s) => s.source);
  return (
    <section id="how" className="scroll-mt-16 pb-6 pt-14 sm:pb-10 sm:pt-28">
      <div className={wrap}>
        <Reveal className="mb-10 text-center sm:mb-20">
          <p className="text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-500">How I work</p>
          <div className="mask">
            <h2 className={h2}>
              From insight <span className={serifAccent}>to impact.</span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-8 sm:space-y-24">
          {stations.map((st, i) => (
            <StationRow key={st.id} index={i + 1} step={st.step} icon={st.icon} side={i % 2 ? "right" : "left"}>
              <h3 className="mt-4 text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
                {st.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {st.points.map((pt, j) => (
                  <li key={pt} className="flex gap-3 text-[16px] leading-6 text-zinc-300 sm:text-[17px] sm:leading-7">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full border border-[#a9bcff]/40 font-mono text-[11px] text-[#a9bcff]">
                      {j + 1}
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              {st.proof ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {st.proof.map((p) => (
                    <li key={p} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-zinc-200">
                      {p}
                    </li>
                  ))}
                </ul>
              ) : (
                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6">
                  {measured.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd>
                        <CountUp
                          value={s.value}
                          className="bg-[linear-gradient(95deg,#ffffff,#c3cfff)] bg-clip-text text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-transparent sm:text-[2.6rem]"
                        />
                      </dd>
                      <dd className="mt-2 text-[15px] font-semibold text-white">{s.metric}</dd>
                      <dd className="text-[14px] leading-5 text-zinc-400">
                        {s.label} <span className="text-zinc-600">· {s.source}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </StationRow>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- case studies ----------------------------- */

function Work() {
  const featured = caseStudies.find((cs) => cs.kind === "work");
  const practice = caseStudies.filter((cs) => cs.kind !== "work");
  const practiceBadge = caseStudiesAreDemo ? "Demo" : "Practice";

  return (
    <section id="case-studies" className="scroll-mt-16 pt-16 sm:pt-36">
      <div className={wrap}>
        <SpineNode icon="doc" label="Case studies" side="right" size="md" className="-ml-7 lg:mx-auto" />
        <CenterHead
          eyebrow="Case studies"
          title={
            <>
              How I solve <span className={serifAccent}>problems.</span>
            </>
          }
        />

        {/* real work, featured */}
        {featured && (
          <Reveal className="mt-12 sm:mt-14">
            <Tilt max={3}>
              <Link
                href={`/case-studies/${featured.slug}`}
                className="group grid gap-8 rounded-[1.75rem] border border-[#a9bcff]/25 bg-[linear-gradient(160deg,rgba(169,188,255,0.08),rgba(255,255,255,0.01))] p-6 transition-colors duration-500 hover:border-[#a9bcff]/50 sm:p-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-12"
              >
                <span className="block">
                  <span className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold text-white">{featured.company}</span>
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200">
                      Real work
                    </span>
                  </span>
                  <span className="mt-5 block text-balance text-[clamp(1.5rem,2.8vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                    {featured.title.replace(/-/g, "‑")}
                  </span>
                  <span className="mt-4 block text-[17px] leading-7 text-zinc-400 sm:text-lg sm:leading-8">{featured.oneLiner}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-white">
                    Read the case study
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
                <span className="block">
                  <FlowPreview steps={featured.deliver.flow} />
                </span>
              </Link>
            </Tilt>
          </Reveal>
        )}

        {/* practice studies */}
        <Reveal className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            Practice studies
          </span>
          <span className="rounded-full border border-amber-300/25 bg-amber-300/[0.06] px-3 py-1 text-sm text-amber-100/90">
            {caseStudiesAreDemo
              ? "Demo — sample studies, real ones coming soon"
              : "My own thinking exercises — not client work"}
          </span>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {practice.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 100} className="h-full">
              <Tilt className="h-full">
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-[#090c14] p-6 transition-colors duration-500 hover:border-white/30 sm:p-8"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[15px] font-semibold text-white">{cs.company}</span>
                    <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200">
                      {practiceBadge}
                    </span>
                  </span>
                  <h3 className="mt-5 text-balance text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.025em] text-white">
                    {/* non-breaking hyphens keep "drop-off" on one line */}
                    {cs.title.replace(/-/g, "‑")}
                  </h3>
                  <div className="mt-8 flex-1">
                    <FlowPreview steps={cs.deliver.flow} />
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-white">
                    Read case study
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ experience ------------------------------ */

function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 pt-16 sm:pt-36">
      <div className={wrap}>
        <SpineNode icon="roadmap" label="Experience" side="left" size="md" className="-ml-7 lg:mx-auto" />
        <CenterHead
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve <span className={serifAccent}>worked.</span>
            </>
          }
        />

        <Reveal className="mx-auto mt-12 max-w-4xl sm:mt-14">
          <ol className="divide-y divide-white/10 rounded-[1.75rem] border border-white/10 bg-[#090c14]">
            {experience.map((job) => (
              <li key={job.company} className="p-5 sm:p-8">
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/20 text-zinc-100 sm:size-12">
                    {capabilityIcons[job.icon]({ className: "size-5" })}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="text-xl font-semibold text-white">{job.company}</h3>
                      <span className="text-sm text-zinc-500">{job.period}</span>
                    </div>
                    <p className="text-[15px] text-zinc-400">{job.role}</p>
                    <p className="mt-2 text-base text-zinc-200">{job.highlight}</p>

                    {job.solved && (
                      <details className="group/d mt-4">
                        <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/40 [&::-webkit-details-marker]:hidden">
                          Problems I solved · {job.solved.length}
                          <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 transition-transform duration-300 group-open/d:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                            <path d="m4 6 4 4 4-4" />
                          </svg>
                        </summary>
                        <ul className="drop-in mt-4 space-y-3">
                          {job.solved.map((p) => (
                            <li key={p.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/15 text-zinc-100">
                                {capabilityIcons[p.icon]({ className: "size-5" })}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-base font-semibold text-white">{p.title}</span>
                                <span className="mt-1 block text-[15px] leading-6 text-zinc-400">{p.body}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                        {job.focus && (
                          <p className="mt-3 text-sm text-zinc-500">
                            <span className="text-zinc-400">Focus:</span> {job.focus}
                          </p>
                        )}
                        {job.caseStudy && (
                          <Link
                            href={`/case-studies/${job.caseStudy}`}
                            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white"
                          >
                            Read the case study
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        )}
                      </details>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <ul className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[15px] text-zinc-200">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/15 text-[#a9bcff]">
                {capabilityIcons.doc({ className: "size-4" })}
              </span>
              {credentials[0]}
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[15px] font-medium text-white transition-colors hover:border-white/30"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/15 text-[#a9bcff]">
                  {contactIcons.linkedin({ className: "size-4" })}
                </span>
                Verify on LinkedIn
                <ArrowRight className="size-4 text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
              </a>
            </li>
          </ul>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4">
            <p className="flex items-center gap-3 text-[15px] text-zinc-200">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/15 text-[#a9bcff]">
                {capabilityIcons.checklist({ className: "size-4" })}
              </span>
              {certifications.length} certifications
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex items-start gap-2.5 rounded-xl border border-white/10 px-3 py-2.5 text-sm leading-5 text-zinc-200">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#a9bcff]" />
                  <span>
                    {cert.name}
                    <span className="block text-[12px] text-zinc-500">{cert.issuer}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- toolkit -------------------------------- */

function Toolkit() {
  return (
    <section id="skills" className="scroll-mt-16 pt-16 sm:pt-36">
      <div className={wrap}>
        <SpineNode icon="chart" label="Toolkit" side="right" size="md" className="-ml-7 lg:mx-auto" />
        <CenterHead
          eyebrow="Toolkit"
          title={
            <>
              Tools I <span className={serifAccent}>use.</span>
            </>
          }
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
          {toolkit.map((g, i) => (
            <GravityChips key={g.title} title={g.title} icon={g.icon} items={g.items} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- contact -------------------------------- */

function Contact() {
  const rows = [
    { key: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { key: "phone", label: "Phone", value: profile.phone, href: profile.phoneHref },
    { key: "linkedin", label: "LinkedIn", value: "in/kunal-farma", href: profile.linkedin, external: true },
    { key: "resume", label: "Resume", value: "Download PDF", href: profile.resumeUrl, download: true },
  ];

  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden pb-20 pt-16 sm:pb-36 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[32rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#5b6bff]/[0.14] blur-[120px]" />
      <div className={`relative ${wrap}`}>
        <SpineNode icon="send" label="Contact" side="left" size="md" className="-ml-7 lg:mx-auto" />
        <Reveal className="mt-8 text-center">
          <div className="mask">
            <h2 className="text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
              Got a problem
              <br />
              to <span className={serifAccent}>solve?</span>
            </h2>
          </div>
          <p className="mt-6 text-lg text-zinc-400">
            Open to Product Manager roles · {profile.location}. Let&apos;s talk.
          </p>
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-10 max-w-2xl sm:mt-12">
          <ul className="grid gap-3 sm:grid-cols-2">
            {rows.map((r) => (
              <li key={r.key}>
                <a
                  href={r.href}
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(r.download ? { download: "Kunal_Farma_PM_Resume.pdf" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#090c14] p-4 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/30"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-zinc-200">
                    {contactIcons[r.key]({ className: "size-5" })}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-zinc-500">{r.label}</span>
                    <span className="block truncate text-base font-medium text-white">{r.value}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Aurora />
      <Spotlight />
      <Hero />
      <JourneyPath>
        <HowIWork />
        <Work />
        <Experience />
        <Toolkit />
        <Contact />
      </JourneyPath>
    </>
  );
}
