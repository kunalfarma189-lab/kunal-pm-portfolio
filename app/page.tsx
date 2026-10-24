import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  profile,
  heroBlock,
  heroStats,
  journeyCards,
  experience,
  caseStudies,
  aiProjects,
  certifications,
  education,
} from "@/lib/content";

/* ---------------------------------- icons --------------------------------- */

const icons: Record<string, React.ReactNode> = {
  person: (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="8" r="3.5" strokeLinecap="round" />
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" strokeLinecap="round" />
    </svg>
  ),
  folder: (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 7a2 2 0 0 1 2-2h4l2 2.5h6a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" strokeLinecap="round" />
    </svg>
  ),
  briefcase: (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" strokeLinecap="round" />
    </svg>
  ),
  bolt: (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M13 3 5 13.5h5L10.5 21 19 10.5h-5L13 3Z" strokeLinejoin="round" />
    </svg>
  ),
  doc: (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
      <path d="M14 3v4h4M9.5 12h5M9.5 16h5" strokeLinecap="round" />
    </svg>
  ),
  send: (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 11.5 20 4l-7.5 16-2-6.5L4 11.5Z" strokeLinejoin="round" />
    </svg>
  ),
};

/* ---------------------------------- hero ---------------------------------- */

function HeadlineLine({ line, gradient }: { line: string; gradient?: string }) {
  if (!gradient || !line.includes(gradient)) {
    return <span className="block">{line}</span>;
  }
  const [before, after] = line.split(gradient);
  return (
    <span className="block">
      {before}
      <span className="bg-gradient-to-r from-[#A5C8F0] via-[#BCCBF4] to-[#D8CFF5] bg-clip-text text-transparent">
        {gradient}
      </span>
      {after}
    </span>
  );
}

function Portrait() {
  return (
    <div className="hero-fade hero-delay-3 relative mx-auto h-60 w-48 sm:h-80 sm:w-60 lg:h-[23rem] lg:w-[17.5rem]">
      {/* ambient purple glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-[1.45] rounded-full bg-violet-500/30 blur-3xl"
      />
      {/* amber orbit arc */}
      <svg
        aria-hidden
        className="absolute -inset-9 h-[calc(100%+4.5rem)] w-[calc(100%+4.5rem)]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <ellipse
          cx="50"
          cy="50"
          rx="49"
          ry="49"
          stroke="url(#amberArc)"
          strokeWidth="0.55"
          strokeDasharray="95 213"
          strokeLinecap="round"
          transform="rotate(-135 50 50)"
        />
        <defs>
          <linearGradient id="amberArc" x1="0" y1="0" x2="100" y2="100">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#FCD34D" />
          </linearGradient>
        </defs>
      </svg>
      {/* Portrait slot — swap the monogram for <Image src="/portrait.jpg" />
          once a real photo is available (drop the file in public/). */}
      <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-[#1a1f2b] to-[#0d1117] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <span className="text-5xl font-bold tracking-tight text-white/75 sm:text-6xl">
          KF
        </span>
      </div>
    </div>
  );
}

function StatItem({ stat, large }: { stat: (typeof heroStats)[number]; large?: boolean }) {
  return (
    <div>
      <p
        className={`bg-gradient-to-r from-[#A5C8F0] to-[#D8CFF5] bg-clip-text font-bold text-transparent ${
          large ? "text-3xl" : "text-2xl"
        }`}
      >
        {stat.value}
      </p>
      <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {stat.label}
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden">
      {/* subtle gradient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-36 left-1/3 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-28 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 sm:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] xl:grid-cols-[minmax(0,1fr)_auto_auto]">
          {/* text block */}
          <div>
            <p className="hero-fade hero-delay-1 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300">
              <span className="pulse-dot h-2 w-2 rounded-full bg-teal-400" />
              {heroBlock.badge}
            </p>
            <h1 className="hero-fade hero-delay-2 mt-8 text-balance text-[42px] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[56px] xl:text-[60px]">
              {heroBlock.headlineLines.map((line, i) => (
                <HeadlineLine
                  key={line}
                  line={line}
                  gradient={heroBlock.gradientWords[i - 1]}
                />
              ))}
            </h1>
            <p className="hero-fade hero-delay-4 mt-8 max-w-xl text-pretty text-lg leading-8 text-zinc-400">
              {heroBlock.subtitle}
            </p>
            <div className="hero-fade hero-delay-4 mt-11 flex flex-wrap gap-4">
              <Link
                href="/case-studies"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0a0d12] transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
              >
                View Case Studies →
              </Link>
              <a
                href={profile.resumeUrl}
                download
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400/50 hover:text-white active:scale-[0.98]"
              >
                ↓ Download Resume
              </a>
            </div>

            {/* stats — horizontal row below xl, far-right column from xl */}
            <div className="hero-fade hero-delay-5 mt-12 flex items-start gap-10 xl:hidden">
              {heroStats.map((stat) => (
                <StatItem key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* portrait */}
          <Portrait />

          {/* stats column (xl+) */}
          <div className="hero-fade hero-delay-5 hidden flex-col gap-10 border-l border-white/10 pl-10 xl:flex">
            {heroStats.map((stat) => (
              <StatItem key={stat.label} stat={stat} large />
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div className="hero-fade hero-delay-6 pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <div className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/20 p-1.5">
            <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-zinc-400" />
          </div>
          <span className="text-[11px] tracking-wide text-zinc-600">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ journey cards ----------------------------- */

function JourneyCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3">
        {journeyCards.map((card, i) => (
          <Reveal key={card.n} delay={i * 70} className="h-full">
            <Link
              href={card.href}
              {...("download" in card && card.download ? { download: true } : {})}
              className="group flex h-full flex-col rounded-2xl border border-[#232830] bg-[#10141A] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.3)] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition-colors duration-300 group-hover:border-indigo-400/40 group-hover:text-indigo-300">
                  {icons[card.icon]}
                </span>
                <span className="font-mono text-xs text-zinc-600">
                  {card.n}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-zinc-400">
                {card.description}
              </p>
              <span
                aria-hidden
                className="mt-auto translate-y-1 pt-4 text-indigo-300 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ other sections ----------------------------- */

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
      <h2 className="mt-3 text-balance text-[34px] font-bold leading-tight tracking-tight text-white sm:text-[42px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-lg leading-8 text-zinc-400">
          {description}
        </p>
      )}
    </Reveal>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Product work across e-commerce"
          description="Discovery journeys, pricing logic, marketplace catalogs, analytics, and delivery — the full product lifecycle."
        />
        <ol className="ml-3 space-y-14 border-l border-white/10 pl-8">
          {experience.map((item) => (
            <Reveal key={item.company + item.role} className="relative">
              <li>
                <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-400 ring-4 ring-indigo-500/20" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-xl font-semibold text-white">
                    {item.role}
                    <span className="text-indigo-300"> · {item.company}</span>
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    {item.period} · {item.location}
                  </p>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-base leading-7 text-zinc-400"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
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
      className="scroll-mt-20 border-y border-white/5 bg-white/[0.02] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Case Studies"
          title="How I break product problems down"
          description="Three hypothetical, independent product analyses — structured from problem statement to learnings, and labelled as exercises throughout."
        />
        <div className="grid gap-7 md:grid-cols-3">
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
                <h3 className="mt-4 text-xl font-semibold leading-snug text-white">
                  {cs.title}
                </h3>
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
    </section>
  );
}

function AiProjects() {
  return (
    <section id="ai-projects" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="AI Projects"
          title="Building with AI-assisted development"
          description="Real, working outputs — each with the problem, the intended user, the AI approach, its limits, and how I'd evaluate it."
        />
        <div className="space-y-7">
          {aiProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <article className="rounded-2xl border border-[#232830] bg-[#10141A] p-7 transition-all duration-300 hover:border-indigo-400/40 hover:shadow-[0_12px_40px_-16px_rgba(99,102,241,0.3)] sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white">
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
                <dl className="mt-6 grid gap-x-12 gap-y-5 sm:grid-cols-2">
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
                      <dd className="mt-1.5 text-pretty text-base leading-7 text-zinc-400">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap gap-2">
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
      className="scroll-mt-20 border-y border-white/5 bg-white/[0.02] py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[2fr,1.2fr]">
        <div>
          <SectionHeading eyebrow="About" title="A bit about me" />
          <Reveal className="space-y-5 text-pretty text-lg leading-8 text-zinc-400">
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
          <aside className="h-fit rounded-2xl border border-[#232830] bg-[#10141A] p-7 transition-colors duration-300 hover:border-indigo-400/30">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Quick facts
            </h3>
            <ul className="mt-5 space-y-3.5 text-base text-zinc-400">
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
          <aside className="rounded-2xl border border-[#232830] bg-[#10141A] p-7 transition-colors duration-300 hover:border-indigo-400/30">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Certifications
            </h3>
            <ul className="mt-5 space-y-3 text-base text-zinc-400">
              {certifications.map((cert) => (
                <li key={cert} className="flex gap-2.5">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
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
      className="relative scroll-mt-20 overflow-hidden py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl"
      />
      <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Contact
        </p>
        <h2 className="mt-3 text-balance text-[34px] font-bold leading-tight tracking-tight text-white sm:text-[42px]">
          Let&apos;s talk
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-8 text-zinc-400">
          Open to Product Manager, Associate PM, Product Operations, and AI
          Product Manager roles. The fastest way to reach me is email — I reply
          within a day.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0a0d12] transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
          >
            Contact Me
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400/50 hover:text-white active:scale-[0.98]"
          >
            ↓ Download Resume
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400/50 hover:text-white active:scale-[0.98]"
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
      <JourneyCards />
      <Experience />
      <CaseStudiesPreview />
      <AiProjects />
      <About />
      <Contact />
    </>
  );
}
