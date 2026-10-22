import { profile, experience, caseStudies, aiProjects } from "@/lib/content";

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
    <div className="mb-10 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      )}
    </div>
  );
}

function Hero() {
  const chips = [
    "E-commerce",
    "Payments / UPI",
    "SQL",
    "JIRA",
    "AI-assisted building",
  ];
  return (
    <section
      id="home"
      className="scroll-mt-20 bg-gradient-to-b from-indigo-50 via-white to-white"
    >
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          {profile.role} · {profile.focus}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Hi, I&apos;m {profile.name}.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          {profile.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#case-studies"
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            View case studies
          </a>
          <a
            href="#contact"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
          >
            Get in touch
          </a>
        </div>
        <div className="mt-12 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
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
          title="Where I've worked"
          description="D2C e-commerce operations and product work, plus a structured self-directed specialization in e-commerce and payments."
        />
        <ol className="ml-3 space-y-12 border-l border-slate-200 pl-8">
          {experience.map((item) => (
            <li key={item.company} className="relative">
              <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-100" />
              <h3 className="text-lg font-semibold text-slate-900">
                {item.role}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-slate-500">
                {item.company}
                {item.period ? ` · ${item.period}` : ""}
              </p>
              <ul className="mt-3 space-y-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-sm leading-6 text-slate-600"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="case-studies" className="scroll-mt-20 bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Case Studies"
          title="How I break product problems down"
          description="These three are hypothetical case studies — product thinking exercises, not real client work. They show my approach: understand the customer, rank the causes, define the metric."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((cs) => (
            <article
              key={cs.company}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {cs.hypothetical && (
                <span className="mb-3 w-fit rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                  Hypothetical case study
                </span>
              )}
              <span className="text-base font-bold tracking-tight text-slate-900">
                {cs.company}
              </span>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900">
                {cs.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {cs.problem}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                <span className="font-semibold text-slate-700">
                  Approach &amp; metrics:{" "}
                </span>
                {cs.outcome}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {cs.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
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
          description="I ship fast by pairing with AI tools — real working outputs, not concepts. Each card below is something you can actually open or ask me about."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {aiProjects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  {project.title}
                </h3>
                <span
                  className={`mt-1 shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    project.status === "Live"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-sky-100 text-sky-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {project.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-slate-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-[2fr,1fr]">
        <div>
          <SectionHeading eyebrow="About" title="A bit about me" />
          <div className="space-y-4 text-base leading-7 text-slate-600">
            <p>
              I&apos;m Kunal, a product manager focused on e-commerce and
              payments in India. I care about the parts of online shopping
              customers rarely notice when they work — a price that updates on
              time, a checkout that doesn&apos;t stall, a return that
              isn&apos;t a fight.
            </p>
            <p>
              At VLE Bazaar, a D2C e-commerce platform, I owned a rule-based
              pricing flow and worked on making products easier to discover.
              I learn in public: I built a 315-lesson PM curriculum for my own
              specialization in e-commerce and payments, and I build working
              prototypes with AI-assisted development — this site included.
            </p>
          </div>
        </div>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Quick facts
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <span className="font-semibold text-slate-800">Focus</span> —
              e-commerce &amp; payments
            </li>
            <li>
              <span className="font-semibold text-slate-800">Toolkit</span> —
              SQL, JIRA, spreadsheets
            </li>
            <li>
              <span className="font-semibold text-slate-800">Edge</span> —
              AI-assisted speed from idea to working draft
            </li>
            <li>
              <span className="font-semibold text-slate-800">Currently</span>{" "}
              — open to Product Manager roles
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          Contact
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Let&apos;s talk
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          Open to Product Manager roles in e-commerce, payments, and consumer
          tech. The fastest way to reach me is email — I reply within a day.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Email me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <CaseStudies />
      <AiProjects />
      <About />
      <Contact />
    </>
  );
}
