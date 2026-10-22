// ------------------------------------------------------------------
// SITE CONTENT — everything editable lives in this one file.
// Sourced from the master resume (Kunal_Farma_PM_Resume_V13) — do
// not add claims that are not already resume-backed. Case studies
// are HYPOTHETICAL independent analyses; keep their labels.
// ------------------------------------------------------------------

export const profile = {
  name: "Kunal Farma",
  headline: "Product Specialist",
  focus: "Product Management · Product Analytics · Product Delivery",
  tagline:
    "4+ years turning business problems into clear product requirements and shipped digital solutions — PRDs, SQL & GA4 analytics, Jira/Agile delivery, and AI-assisted workflows.",
  location: "New Delhi, India",
  email: "kunalfarma189@gmail.com",
  linkedin: "https://www.linkedin.com/in/kunal-farma/",
  github: "https://github.com/kunalfarma189-lab",
  resumeUrl: "/Kunal_Farma_Resume.pdf",
};

export const heroChips = [
  "PRDs & User Flows",
  "SQL · GA4 · A/B Testing",
  "Jira / Agile Delivery",
  "AI-assisted Workflows",
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Growth & Product Specialist",
    company: "Mahattaart",
    period: "Jan 2024 — Present",
    location: "New Delhi",
    points: [
      "Designed the product discovery journey and trigger logic — results first, preferences (space, size, style, references) captured progressively for personalized recommendations",
      "Found gaps in the pricing model and defined a rule-based pricing flow around material specifications, consumption, and wastage — translated business rules into implementation requirements",
      "Write PRDs, user stories, and acceptance criteria; run backlog and sprints in Jira, assign engineering work, and track dependencies, timelines, and stakeholders to launch",
      "Use SQL with GA4 data to investigate behaviour, form hypotheses, and evaluate UI/UX versions through A/B tests",
      "Defined GA4/GTM/DataLayer tracking across listing, customization, and checkout journeys; built AI-assisted workflows that improved team productivity by about 15%",
    ],
  },
  {
    role: "Product Catalog Specialist",
    company: "VLE Bazaar",
    period: "Sep 2023 — Dec 2023",
    location: "New Delhi",
    points: [
      "Managed product catalog operations across Amazon and Flipkart marketplaces",
      "Catalog and search-visibility work contributed to about 11% organic traffic growth and an 8% conversion improvement",
    ],
  },
  {
    role: "Customer Product Experience Executive",
    company: "HoMafy",
    period: "Jan 2022 — Aug 2023",
    location: "New Delhi",
    points: [
      "Gathered customer product-usage feedback and translated it into catalog, content, and listing improvements",
      "Ran e-commerce product operations that contributed to about 9% sales growth",
    ],
  },
];

// HYPOTHETICAL case studies — independent product analyses.
// I have NOT worked for Amazon, Flipkart, or Myntra. The badge, the
// index-page note, and the detail-page banner all say so — keep them.
export interface CaseStudy {
  slug: string;
  company: string;
  title: string;
  oneLiner: string;
  problem: string;
  targetUsers: string[];
  evidence: string[];
  rootCauses: string[];
  solution: string[];
  flow: string[];
  metrics: string[];
  risks: string[];
  learnings: string[];
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "amazon-cart-dropoff",
    company: "Amazon",
    title: "Cutting cart drop-off for tier-2 shoppers",
    oneLiner:
      "Carts fill up but orders don't. A teardown of checkout friction, payment failure handling, and cash-on-delivery trust.",
    problem:
      "A shopper on a mid-range Android phone adds a ₹1,200 item to the cart on a tier-2 city connection, starts checkout, and never pays. Multiplied across millions of sessions, the cart-to-order gap is the largest revenue leak in Indian e-commerce. The exercise: locate where the drop happens, rank the causes, and decide what a product team should fix first.",
    targetUsers: [
      "Price-conscious tier-2/3 shoppers, often first-generation online buyers",
      "Mid-range Android users on intermittent 4G connections",
      "Shoppers who prefer cash-on-delivery while card/UPI trust is still building",
    ],
    evidence: [
      "Assumption: drop-off concentrates between payment initiation and confirmation — failure handling, not purchase intent, is the biggest leak.",
      "Assumption: address entry is the second leak — long forms with pincode lookups punish one-handed, low-bandwidth use.",
      "Assumption: COD unavailability revealed late in checkout breaks the trust built on the product page.",
      "Context: public benchmarks put Indian cart abandonment above 70%, with payment failures a known contributor — figures here are directional, to be validated with funnel data.",
    ],
    rootCauses: [
      "Payment failures surface as dead ends — a failed UPI debit ends the journey instead of routing to a fallback instrument",
      "Address forms ask for permanent-home fields when a pincode plus map pin would do",
      "COD eligibility appears only at the last step, so COD-first shoppers abandon when the option vanishes",
      "Price shifts late — coupons, delivery fees, and GST stack up at checkout, moving the perceived price after the decision was made",
    ],
    solution: [
      "One-tap payment retry with automatic fallback to a second instrument (UPI → card → COD if eligible)",
      "Progressive address: pincode or map pin first, full details only when needed for delivery",
      "COD eligibility badge on the product page and cart — visible before the commitment, not after",
      "Price breakdown locked from the cart onward — no new charges after that point",
    ],
    flow: [
      "Product",
      "Cart — price locked",
      "Address (pincode/map first)",
      "Payment (retry + fallback)",
      "Confirmation",
    ],
    metrics: [
      "Cart → order conversion",
      "Payment success rate",
      "Time from cart to order",
      "COD share of completed orders",
      "Checkout support tickets per 1,000 orders",
    ],
    risks: [
      "A COD uplift raises return-to-origin (RTO) risk — confirmation flows must absorb it",
      "Automatic fallbacks can mask a deeper payment-provider issue and delay the real fix",
      "Shorter address capture may reduce delivery precision in dense informal-address areas",
    ],
    learnings: [
      "Cart drop-off is rarely one cause — instrument every checkout step before shipping fixes, or you optimize the wrong step.",
      "Trust features (COD badge, locked price) must be visible before the cart, not after it.",
    ],
    tags: ["Conversion", "Payments", "Metrics"],
  },
  {
    slug: "flipkart-cod-rto",
    company: "Flipkart",
    title: "Reducing RTO losses on cash-on-delivery orders",
    oneLiner:
      "Refused COD parcels travel twice and earn nothing. Re-confirming intent before dispatch, not at the door.",
    problem:
      "Cash-on-delivery remains the trust backbone of Indian e-commerce — but when a customer refuses the parcel at the door, the shipment travels twice, earns zero, and often returns unsellable. For a thin-margin marketplace, RTO (return to origin) on COD orders is a structural cost leak. The exercise: reduce COD refusals without punishing genuine buyers.",
    targetUsers: [
      "First-time COD buyers with low digital-payment trust",
      "Impulse purchasers whose intent cools during the 2–4 day fulfilment window",
      "Buyers purchasing for family members who may not be home to receive",
    ],
    evidence: [
      "Assumption: a large share of refusals is buyer's remorse in the order-to-delivery gap, not inability to pay.",
      "Assumption: delivery coordination over unknown-number calls goes unanswered and drives a meaningful refusal slice.",
      "Context: industry commentary consistently places COD RTO rates well above prepaid RTO; exact figures vary by category and are treated as directional.",
    ],
    rootCauses: [
      "Intent is captured once at order and never re-confirmed during fulfilment",
      "Delivery coordination happens via unknown-number calls that shoppers ignore",
      "Weak one-line informal addresses make first-attempt failure common",
      "Cancelling after dispatch is harder than refusing at the door — a perverse incentive",
    ],
    solution: [
      "Day-before-delivery confirmation over WhatsApp/SMS — one tap to confirm or cancel free of charge before dispatch",
      "Delivery-slot picker at confirmation, so someone is actually home",
      "Address quality score at order time; low-confidence COD addresses get a quick verify step or a prepaid nudge",
      "A small prepaid incentive framed as 'skip the cash', never as a COD penalty",
    ],
    flow: [
      "COD order",
      "Address quality check",
      "Dispatch",
      "Day-before WhatsApp confirm",
      "Slot picked",
      "Delivered — cash collected",
    ],
    metrics: [
      "COD RTO rate",
      "Confirmation reply rate",
      "Pre-dispatch cancellation rate",
      "First-attempt delivery success",
      "Margin per COD order",
    ],
    risks: [
      "Every extra step converts away some genuine buyers — the confirm nudge must stay one tap, never a form",
      "Over-messaging trains users to ignore confirmations entirely",
      "Risk-scoring by address can systematically disadvantage some regions — it needs bias monitoring",
    ],
    learnings: [
      "The cheapest RTO reduction happens before dispatch, not at the door.",
      "Re-confirming intent is a feature for customers (control) and for the business (margin) — frame it as both.",
    ],
    tags: ["COD", "Unit economics", "Operations"],
  },
  {
    slug: "myntra-size-fit",
    company: "Myntra",
    title: "Fewer returns through better size & fit guidance",
    oneLiner:
      "Wrong size is the most avoidable reason a fashion order comes back. Fixing the first decision.",
    problem:
      "Fashion e-commerce lives and dies on returns. Among return reasons, 'wrong size' is the most predictable — and therefore the most fixable. Every size-driven return costs reverse logistics, refurbishing, and often the customer's next purchase. The exercise: help shoppers pick the right size the first time without turning the product page into a fitting-room quiz.",
    targetUsers: [
      "Fashion shoppers aged 18–34 buying across brands with inconsistent sizing",
      "Shoppers buying for family members with only rough size knowledge",
      "First-time buyers on the platform with no size history",
    ],
    evidence: [
      "Assumption: most size returns come from brand-to-brand variance, not shopper carelessness — the same 'M' fits three different ways.",
      "Assumption: size charts are read but not trusted — shoppers default to their habitual size anyway.",
      "Context: fashion return rates in India are widely reported in the 25–40% band, with size/fit consistently the top reason — directional, to be validated with category data.",
    ],
    rootCauses: [
      "Brand-specific sizing variance with no translation layer ('your M in Brand X ≈ L here')",
      "Static size charts show garment measurements shoppers can't map to their own bodies",
      "Reviews aren't size-structured — 'runs small' is buried in prose",
      "Returns are friction-free but exchanges aren't, so a right-garment-wrong-size becomes a full return",
    ],
    solution: [
      "A lightweight size profile ('usually wears M in shirts') plus a per-brand fit signal computed from return data",
      "Structured review tags — runs small / true to size / runs large — surfaced next to the size selector",
      "Exchange-first flow: one tap to swap size, keeping the sale and usually the customer",
      "Cold start handled honestly: for new brands, borrow sibling-brand signals and label the confidence",
    ],
    flow: [
      "PDP",
      "Size advisor (profile + brand fit signal)",
      "Order",
      "Wrong size?",
      "One-tap exchange",
      "Right size kept",
    ],
    metrics: [
      "Size-related return rate",
      "Exchange-to-return ratio",
      "Size advisor adoption",
      "Repeat purchase after exchange",
      "Refurbishment cost per order",
    ],
    risks: [
      "Cold start for new brands makes early recommendations noisy — confidence labels matter",
      "The advisor adds friction; anything beyond two taps collapses adoption",
      "Return-reason data is messy — style dissatisfaction gets mislabelled as size",
    ],
    learnings: [
      "Returns are a data problem wearing a UX costume — the durable fix is the fit-signal data loop.",
      "An exchange saved is worth more than a return refunded: margin, logistics, and usually the customer.",
    ],
    tags: ["Returns", "UX", "Personalization"],
  },
];

export interface AiProject {
  title: string;
  status: "Live" | "Ongoing";
  problem: string;
  intendedUser: string;
  approach: string;
  limitations: string;
  evaluation: string;
  impact: string;
  tags: string[];
}

export const aiProjects: AiProject[] = [
  {
    title: "This portfolio",
    status: "Live",
    problem:
      "A PM's product thinking lives in private docs and Jira tickets — invisible to recruiters. I needed public, credible proof of how I structure problems.",
    intendedUser:
      "Recruiters and hiring managers evaluating me for PM / APM / AI-PM roles.",
    approach:
      "AI pair-programming end-to-end: I owned structure and content decisions; AI handled scaffolding and implementation — Next.js, TypeScript, Tailwind, deployed on Render via GitHub.",
    limitations:
      "Design taste and content judgment stay mine to own — AI-written copy gets the same review as a junior's draft. Analytics aren't wired yet, so recruiter engagement is unmeasured.",
    evaluation:
      "Production build passes type checks; responsive layout verified at mobile and desktop widths; the real test is recruiter feedback in live applications.",
    impact:
      "A portfolio live in days instead of months — doubling as proof of the AI-assisted delivery speed I bring to product teams.",
    tags: ["Next.js", "TypeScript", "AI-assisted"],
  },
  {
    title: "AI-assisted workflow automation",
    status: "Live",
    problem:
      "Recurring team workflows around tracking, reporting, and content ops consumed hours that should go to product thinking.",
    intendedUser: "My own team at Mahattaart — people doing repetitive operational work around the product.",
    approach:
      "Mapped the manual steps first, then built AI-assisted workflows that automate the repetitive slices while keeping humans on judgment calls.",
    limitations:
      "Automation is only as good as its inputs — bad data becomes confidently-automated bad output, so human review stays in the loop.",
    evaluation: "Before/after time-on-task for the recurring workflows.",
    impact: "About 15% productivity improvement for the team.",
    tags: ["Workflows", "Team productivity"],
  },
  {
    title: "Full-stack product prototypes",
    status: "Ongoing",
    problem:
      "Product ideas die in slide decks — stakeholders (and I) can't feel a flow without touching it.",
    intendedUser:
      "Me and my stakeholders — anyone who needs to click through a concept instead of imagining it.",
    approach:
      "Vibe coding: working drafts built end-to-end (frontend, backend, APIs) with AI pair-programming, deployed on Render and Netlify, then iterated on real usage.",
    limitations:
      "Prototypes, not production systems — security hardening, scale, and edge cases are consciously out of scope.",
    evaluation:
      "The bar is simple: can a first-time user complete the core task with no hand-holding? If yes, the prototype has told me something.",
    impact:
      "Faster concept testing — flows get validated before a line of production code or a sprint gets committed.",
    tags: ["Prototyping", "Vibe coding"],
  },
  {
    title: "PM curriculum builder",
    status: "Ongoing",
    problem:
      "PM learning material in India is English-heavy and theory-first. I learn best in Hinglish, by doing.",
    intendedUser: "Me — and Hindi/English-mix learners who want structured PM content.",
    approach:
      "AI-generated, human-curated interactive HTML lessons — 315 lessons across core PM plus an e-commerce & payments specialization (SQL, JIRA, UPI, fraud basics).",
    limitations:
      "No instructor feedback loop yet — it's a personal knowledge base, not a course with assessment.",
    evaluation: "Lesson completion and self-test recall; the durable output is my specialization depth.",
    impact:
      "A living personal curriculum that keeps my e-commerce and payments fundamentals sharp.",
    tags: ["Curriculum", "Interactive", "Hinglish"],
  },
];

export const certifications = [
  "IBM Product Manager Professional Certificate",
  "Microsoft AI Product Manager",
  "Digital Product Management: Modern Fundamentals — University of Virginia",
  "Generative AI for Product Strategy, UX & Launch — SkillUp",
  "Google Data Analytics",
  "Google Project Management — Professional Certificate",
  "Microsoft Business Analyst",
  "IBM UI/UX Designer",
];

export const education = [
  {
    degree: "BBA — IP University (Regular)",
    detail: "CGPA 8.5",
    period: "2020 — 2023",
  },
];
