import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  profile,
  heroChips,
  experience,
  caseStudies,
  aiProjects,
  certifications,
  education,
} from "@/lib/content";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-pretty text-base leading-7 text-zinc-400">
          {description}
        </p>
      )}
    </Reveal>
  );
}

function Hero() {
  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden">
      {/* subtle gradient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
        <p className="hero-fade hero-delay-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
          {profile.headline} · {profile.location}
        </p>
        <h1 className="hero-fade hero-delay-2 mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {profile.name}
        </h1>
        <p className="hero-fade hero-delay-2 mt-4 bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-300 bg-clip-text text-xl font-semibold tracking-tight text-transparent sm:text-2xl">
          Clear requirements → shipped products → honest metrics.
        </p>
        <p className="hero-fade hero-delay-3 mt-6 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          {profile.tagline}
        </p>
        <div className="hero-fade hero-delay-3 mt-10 flex flex-wrap gap-4">
          <Link
            href="/case-studies"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-400 active:scale-[0.98]"
          >
            View Case Studies
          </Link>
          <a
            href={profile.resumeUrl}
            download
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400/50 hover:text-white active:scale-[0.98]"
          >
            ↓ Download Resume
          </a>
        </div>
        <div className="hero-fade hero-delay-4 mt-12 flex flex-wrap gap-2">
          {heroChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400 transition-colors duration-300 hover:border-indigo-400/40 hover:text-zinc-200"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Product work across e-commerce"
          description="Discovery journeys, pricing logic, marketplace catalogs, analytics, and delivery — the full product lifecycle."
        />
        <ol className="ml-3 space-y-12 border-l border-white/10 pl-8">
          {experience.map((item) => (
            <Reveal key={item.company + item.role} className="relative">
              <li>
                <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-400 ring-4 ring-indigo-500/20" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold text-white">
                    {item.role}
                    <span className="text-indigo-300"> · {item.company}</span>
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    {item.period} · {item.location}
                  </p>
                </div>
                <ul className="mt-3 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-sm leading-6 text-zinc-400"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CaseStudiesPreview() {
  return (
    <section
      id="case-studies"
      className="scroll-mt-20 border-y border-white/5 bg-white/[0.02] py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Case Studies"
          title="How I break product problems down"
          description="Three hypothetical, independent product analyses — structured from problem statement to learnings, and labelled as exercises throughout."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 100} className="h-full">
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.35)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-bold tracking-tight text-white">
                    {cs.company}
                  </span>
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                    Hypothetical
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
                  {cs.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-6 text-zinc-400">
                  {cs.oneLiner}
                </p>
                <div className="mt-auto pt-5">
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
    </section>
  );
}

function AiProjects() {
  return (
    <section id="ai-projects" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="AI Projects"
          title="Building with AI-assisted development"
          description="Real, working outputs — each with the problem, the intended user, the AI approach, its limits, and how I'd evaluate it."
        />
        <div className="space-y-6">
          {aiProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-indigo-400/40 hover:shadow-[0_12px_40px_-16px_rgba(99,102,241,0.3)] sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      project.status === "Live"
                        ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "border border-sky-400/30 bg-sky-400/10 text-sky-300"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <dl className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {[
                    ["Problem", project.problem],
                    ["Intended user", project.intendedUser],
                    ["AI approach", project.approach],
                    ["Limitations", project.limitations],
                    ["Evaluation", project.evaluation],
                    ["Potential impact", project.impact],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                        {label}
                      </dt>
                      <dd className="mt-1 text-pretty text-sm leading-6 text-zinc-400">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-500 transition-colors duration-300 hover:border-indigo-400/40 hover:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-y border-white/5 bg-white/[0.02] py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[2fr,1.2fr]">
        <div>
          <SectionHeading eyebrow="About" title="A bit about me" />
          <Reveal className="space-y-4 text-pretty text-base leading-7 text-zinc-400">
            <p>
              I&apos;m Kunal, a product specialist in New Delhi working across
              e-commerce and customization products. I care about the parts of
              a shopping flow customers rarely notice when they work — a price
              that updates on time, a checkout that doesn&apos;t stall, a
              return that isn&apos;t a fight.
            </p>
            <p>
              Day to day I write PRDs and acceptance criteria, run sprints in
              Jira, dig through SQL and GA4 data, and define tracking with
              GTM/DataLayer. I also build fast with AI-assisted development —
              this site and my prototypes are proof, not claims.
            </p>
            <p>
              I&apos;m open to Product Manager, Associate PM, Product
              Operations, and AI Product Manager roles.
            </p>
          </Reveal>
        </div>
        <Reveal delay={120} className="h-fit space-y-6">
          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-indigo-400/30">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Quick facts
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li>
                <span className="font-semibold text-zinc-200">Based</span> —
                New Delhi, India
              </li>
              <li>
                <span className="font-semibold text-zinc-200">Toolkit</span> —
                SQL, GA4, GTM, Jira, A/B testing, Looker Studio
              </li>
              <li>
                <span className="font-semibold text-zinc-200">Edge</span> —
                AI-assisted speed from idea to working draft
              </li>
              {education.map((e) => (
                <li key={e.degree}>
                  <span className="font-semibold text-zinc-200">
                    Education
                  </span>{" "}
                  — {e.degree} ({e.detail}, {e.period})
                </li>
              ))}
            </ul>
          </aside>
          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-indigo-400/30">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Certifications
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              {certifications.map((cert) => (
                <li key={cert} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                  {cert}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl"
      />
      <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Contact
        </p>
        <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Let&apos;s talk
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-zinc-400">
          Open to Product Manager, Associate PM, Product Operations, and AI
          Product Manager roles. The fastest way to reach me is email — I reply
          within a day.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-400 active:scale-[0.98]"
          >
            Contact Me
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400/50 hover:text-white active:scale-[0.98]"
          >
            ↓ Download Resume
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400/50 hover:text-white active:scale-[0.98]"
          >
            LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <CaseStudiesPreview />
      <AiProjects />
      <About />
      <Contact />
    </>
  );
}
