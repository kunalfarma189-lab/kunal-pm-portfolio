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
  location: "New Delhi, India",
  email: "kunalfarma189@gmail.com",
  linkedin: "https://www.linkedin.com/in/kunal-farma/",
  github: "https://github.com/kunalfarma189-lab",
  phone: "+91 85058 78277",
  phoneHref: "tel:+918505878277",
  resumeUrl: "/Kunal_Farma_Resume.pdf",
  portrait: "/kunal-farma.jpg",
};

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

// ------------------------------------------------------------------
// HOMEPAGE — copy carried over from the previous homepage and the
// resume. Every number below already appeared on the site or resume.
// ------------------------------------------------------------------

export const hero = {
  eyebrow: "Product Specialist · 4+ years · New Delhi",
  subtitle:
    "I'm Kunal. I find the problem, prototype the fix with AI, ship it and measure it — across e-commerce discovery, pricing, analytics and delivery.",
};

// The six nodes that draw in around the portrait as the hero scrolls.
// `x`/`y` are % positions inside the portrait stage (desktop only).
export const capabilities = [
  {
    key: "strategy",
    label: "Product Strategy",
    line: "Find the real problem — drop-offs, pricing gaps, unmet needs",
    x: 18,
    y: 15,
  },
  {
    key: "research",
    label: "User Research",
    line: "Customer feedback turned into product and catalog fixes",
    x: 14,
    y: 48,
  },
  {
    key: "data",
    label: "Data Analysis",
    line: "SQL cross-checked with GA4 — no blind dashboards",
    x: 18,
    y: 81,
  },
  {
    key: "execution",
    label: "Execution",
    line: "Jira sprints, acceptance criteria, dependencies to launch",
    x: 82,
    y: 81,
  },
  {
    key: "roadmap",
    label: "Roadmap Planning",
    line: "Prioritised backlog and PRDs: what to build, why, in which order",
    x: 87,
    y: 48,
  },
  {
    key: "ai",
    label: "AI & Innovation",
    line: "Working prototypes built with AI coding tools",
    x: 82,
    y: 15,
  },
] as const;

export const differentiators = [
  {
    title: "I build the prototype myself.",
    body: "Most PMs write a spec and wait weeks for a demo. I build the working prototype with AI coding tools — frontend, backend, APIs — deploy it, then hand engineering something real.",
  },
  {
    title: "I pull the data myself.",
    body: "SQL cross-checked against GA4 to find the discrepancies, and GA4 / GTM / DataLayer events defined before build — so every filter, preview and price change is measured.",
  },
  {
    title: "I started on the floor.",
    body: "Catalog, listings and customer feedback at HoMafy and VLE Bazaar came first. Now I turn complex configuration and pricing rules into flows customers can self-serve.",
  },
];

export const proofStats = [
  { value: "4+", label: "years in product & e-commerce", source: "" },
  { value: "+11%", label: "organic traffic", source: "VLE Bazaar" },
  { value: "+8%", label: "conversion", source: "VLE Bazaar" },
  { value: "+9%", label: "sales", source: "HoMafy" },
  { value: "~15%", label: "team productivity", source: "Mahattaart · AI workflows" },
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
      "Designed the product discovery journey and trigger logic — results first, preferences (space, size, style, references) captured progressively for personalised recommendations",
      "Found gaps in the pricing model and defined a rule-based pricing flow around material specifications, consumption and wastage — translated business rules into implementation requirements",
      "Write PRDs, user stories and acceptance criteria; run backlog and sprints in Jira and track dependencies, timelines and stakeholders to launch",
      "Use SQL with GA4 data to investigate behaviour, form hypotheses and evaluate UI/UX versions through A/B tests",
      "Defined GA4 / GTM / DataLayer tracking across listing, customisation and checkout journeys; built AI-assisted workflows that improved team productivity by about 15%",
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
      "Gathered customer product-usage feedback and translated it into catalog, content and listing improvements",
      "Ran e-commerce product operations that contributed to about 9% sales growth",
    ],
  },
];

export const education = {
  degree: "BBA — IP University",
  detail: "CGPA 8.5",
  period: "2020 — 2023",
};

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

export const skillGroups = [
  {
    title: "Product",
    items: ["PRDs & user stories", "Acceptance criteria", "Backlog prioritisation", "Personalisation logic"],
  },
  {
    title: "Data & experiments",
    items: ["SQL", "GA4", "GTM / DataLayer", "Looker Studio", "Statsig A/B tests"],
  },
  {
    title: "Delivery",
    items: ["Jira", "Agile sprints", "Dependency & stakeholder tracking"],
  },
  {
    title: "Build",
    items: ["AI coding tools", "GitHub", "Render", "Netlify"],
  },
];
