// ------------------------------------------------------------------
// SITE CONTENT — everything editable lives in this one file.
// Sourced from the master resume (Kunal_Farma_PM_Resume_V13) — do
// not add claims that are not already resume-backed. Case studies
// are HYPOTHETICAL independent analyses; keep their labels.
// ------------------------------------------------------------------

export const profile = {
  name: "Kunal Farma",
  headline: "Product Manager",
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

// HYPOTHETICAL case studies — independent product analyses, written in
// the same four steps as the homepage: Discover → Define → Deliver →
// Measure, in plain words. I have NOT worked for Amazon; FinBridge and
// CareLoop are made-up companies standing in for fintech and healthcare.
// Every figure is a public benchmark or a stated guess, never internal data. The badge, the index note and the detail-page banner
// say so — keep them.
export interface CaseStudy {
  slug: string;
  company: string;
  // "work" = something I actually did; "practice" = my own thinking exercise
  kind: "work" | "practice";
  title: string;
  oneLiner: string;
  tags: string[];
  discover: {
    problem: string;
    users: string[];
    evidence: string[];
    rootCauses: string[];
  };
  define: {
    goal: string;
    bets: string[]; // in priority order
    whyFirst: string; // why bets[0] goes first
  };
  deliver: {
    flow: string[];
    now: string[]; // first release
    later: string[]; // follow-ups once the first release has data
    risks: string[];
  };
  measure: {
    metrics: string[]; // metrics[0] is the primary one
    experiment: { who: string; check: string; guard: string };
    learnings: string[];
  };
}

export const caseStudies: CaseStudy[] = [
  // Real work at Mahattaart (2024 — now), written from the problem brief.
  // Details are kept general and no internal numbers are shared; the
  // metrics are what the work is measured on, not claimed results.
  {
    slug: "mahattaart-custom-wall-decor",
    company: "Mahattaart",
    kind: "work",
    title: "Turning a seven-step custom order into one journey",
    oneLiner:
      "Custom wall décor needs a design, a wall size, a material, a price, a consultation and installation. I joined the steps into one flow that sells on its own.",
    tags: ["Customisation", "Pricing", "Conversion"],
    discover: {
      problem:
        "Buying customised wall décor took seven separate steps: design, material, wall measurement, price, consultation, payment, installation. The steps were not connected, so customers repeated their details, waited for staff, or gave up before ordering. And the website explained too little, so even a simple purchase needed a consultation.",
      users: [
        "Homeowners decorating a wall for the first time",
        "Interior designers ordering for clients",
        "Staff answering the same basic questions on every enquiry",
      ],
      evidence: [
        "The same details were asked more than once, so enquiry-to-order took long",
        "Visitors browsed but did not buy — price and process were unclear",
        "Simple orders still needed a consultation, so staff time went to basic questions",
      ],
      rootCauses: [
        "Each step lived in a different place, so nothing carried over",
        "No price until a person worked it out",
        "Product pages showed designs, not how to buy them",
        "Consultation was the default, even for simple orders",
      ],
    },
    define: {
      goal: "A customer can go from design to confirmed order on their own — and experts stay for complex, high-value projects.",
      bets: [
        "One connected journey: design → wall size → material → price → install or consult → details → pay or get a quote → track",
        "Instant price from size and material, using rule-based pricing",
        "Product pages that sell: finished installations, material comparisons, size guidance, delivery estimates",
        "Clear 'Buy now' and 'Book a consultation' on every product",
      ],
      whyFirst:
        "The connected journey first. Every other fix depends on it — a price calculator or a better product page is wasted if the customer still has to start over at the next step.",
    },
    deliver: {
      flow: ["Discover design", "Enter wall size", "Pick material", "See price", "Install or consult", "Pay or get a quote", "Track order"],
      now: [
        "Details carried across every step — entered once",
        "Rule-based price from material, size and wastage",
        "Buy now and Book a consultation on product pages",
      ],
      later: [
        "Material and surface comparisons on product pages",
        "Installation availability and charges by location",
        "Order tracking with clear next steps",
      ],
      risks: [
        "Complex projects still need a person — automate only the simple ones",
        "A wrong price formula is worse than no price — check it against real quotes",
        "More self-service means fewer conversations — keep customer feedback flowing",
      ],
    },
    measure: {
      metrics: [
        "Enquiry-to-order conversion",
        "Journey abandonment",
        "Time to order confirmation",
        "Self-service order share",
        "Support contacts per order",
      ],
      experiment: {
        who: "Every step of the journey, tracked in GA4 / GTM before launch",
        check: "Enquiry-to-order up and abandonment down, step by step",
        guard: "Consultation-to-order, and support contacts per order",
      },
      learnings: [
        "Connect the steps before polishing any one of them.",
        "Let the website answer the basic questions, so people get the hard ones.",
      ],
    },
  },
  {
    slug: "amazon-cart-dropoff",
    company: "Amazon",
    kind: "practice",
    title: "Why small-city shoppers leave their cart",
    oneLiner: "They add to cart, start to pay, and leave. Where they give up — and what to fix first.",
    tags: ["Checkout", "Payments", "Conversion"],
    discover: {
      problem:
        "A shopper in a small city adds a ₹1,200 item on a basic phone, starts to pay, and leaves. Multiply that by millions of sessions and it is one of the biggest leaks in Indian e-commerce. The job: find where people give up, and fix the biggest cause first.",
      users: [
        "Small-city shoppers, many buying online for the first time",
        "Basic Android phones on slow internet",
        "People who prefer cash on delivery over paying online",
      ],
      evidence: [
        "My guess: most people leave when a payment fails — not because they changed their mind.",
        "My guess: the long address form is the second leak on a slow phone.",
        "Public reports: over 70% of carts in India end without an order. I would confirm with real data first.",
      ],
      rootCauses: [
        "A failed payment is a dead end — no other way to pay",
        "The address form asks for far more than it needs",
        "'Pay on delivery' appears only at the last step",
        "Fees and taxes get added after the shopper has decided",
      ],
    },
    define: {
      goal: "More small-city shoppers finish their order — without more parcels refused at the door.",
      bets: [
        "Failed payment? One-tap retry, then another way to pay (UPI → card → cash)",
        "Show 'pay on delivery available' before the shopper decides",
        "Lock the price from the cart — no surprises after",
        "Shorter address form: pincode or map pin first",
      ],
      whyFirst:
        "Payment retry first. The shopper has already decided to buy, so this is the cheapest order to save. No change to products or delivery, and results show in days.",
    },
    deliver: {
      flow: ["Product", "Cart — price locked", "Address", "Payment — retry if it fails", "Order done"],
      now: [
        "One-tap retry with the next payment option ready",
        "'Pay on delivery' label on product and cart pages",
        "Price locked from the cart",
      ],
      later: ["Pincode-first address with a map pin", "Saved payment options, best one first"],
      risks: [
        "More cash orders means more parcels refused — a confirm step handles that",
        "Auto-retry can hide a real payment-provider problem",
        "A shorter address form can cause wrong deliveries",
      ],
    },
    measure: {
      metrics: ["Carts that become orders", "Payments that succeed", "Orders paid on delivery", "Checkout complaints per 1,000 orders"],
      experiment: {
        who: "Half the shoppers in small-city pincodes, for two weeks",
        check: "More carts become orders",
        guard: "Refused parcels and complaints must not rise",
      },
      learnings: [
        "Lost carts never have one cause. Measure every step before fixing any.",
        "Trust signals belong before the cart, not after.",
      ],
    },
  },
  // FinBridge is a made-up fintech platform, used as a stand-in for the category.
  {
    slug: "finbridge-agent-platform",
    company: "FinBridge (an NBFC loans, payments & insurance platform)",
    kind: "practice",
    title: "One agent journey for EMIs, wallets, commission and policies",
    oneLiner: "Field agents collect loan EMIs, top up wallets, earn commission and renew insurance. Today each lives in a different tool. Join them — and fix the biggest leak first.",
    tags: ["Loans & EMIs", "Payments & commission", "InsurTech"],
    discover: {
      problem:
        "A field agent visits a small-town customer to collect a loan EMI, tops up their wallet, and offers to renew their insurance. Then the EMI is logged a day late, the commission is argued over on WhatsApp, and the renewal is forgotten. Multiply that across thousands of agents and the lender loses collections, trust and policies. The job: find where the agent journey breaks, and fix the biggest cause first.",
      users: [
        "Field agents and partners who collect EMIs and sell policies door to door",
        "Loan customers who pay in cash and want proof on the spot",
        "Back-office staff who approve payouts and check policy paperwork",
      ],
      evidence: [
        "My guess: most late EMIs are collected on time but logged late — not unpaid.",
        "My guess: payout disputes come from approvals done over WhatsApp and Excel, with no record of who said yes.",
        "Public reports: NBFC collections and policy renewals leak badly when done by hand. I would confirm with real data first.",
      ],
      rootCauses: [
        "No live EMI schedule, so agents and customers disagree on what is due",
        "A customer who cannot pay this month has no way to reschedule, so they just skip",
        "Wallet top-ups, redemptions and commission run on separate sheets",
        "Renewal dates live with the insurer, so no one reminds the customer in time",
      ],
    },
    define: {
      goal: "More EMIs collected on time, payouts no one disputes, and policies that renew — all from one agent app.",
      bets: [
        "Live EMI tracking with an EMI calculator and a repayment reschedule the customer can ask for in the app",
        "Wallet top-up and redemption with commission payouts that go through a back-office approval queue",
        "Renewal reminders 30 and 7 days out, with policy issuance through insurer APIs",
        "One agent dashboard: today's collections, pending payouts, policies due",
      ],
      whyFirst:
        "EMI tracking first. Collections are the lender's cash flow, the agent is already at the door, and a reschedule turns a skipped EMI into a late but paid one. Results show in one collection cycle.",
    },
    deliver: {
      flow: ["Visit customer", "Collect EMI — receipt on the spot", "Reschedule if needed", "Top up or redeem wallet", "Commission queued for approval", "Policy renewal", "Payout"],
      now: [
        "EMI schedule and calculator in the agent app, receipt sent to the customer",
        "Reschedule request with new EMI shown before the customer agrees",
        "Wallet top-up and redemption logged per customer",
        "Approval queue for commission payouts, with who approved and when",
        "Insurer API integration tested end to end before any policy goes live",
      ],
      later: ["Renewal reminders to customer and agent", "Policy issuance in the app, tested per insurer", "Agent dashboard with collections, payouts and renewals due"],
      risks: [
        "Easy reschedules can hide real defaults — cap them and flag repeat requests",
        "An approval queue slows payouts if no one owns it — set a time limit",
        "Insurer APIs fail in different ways — test issuance with dummy policies first",
        "Agents work offline — a receipt must not depend on a signal",
      ],
    },
    measure: {
      metrics: ["EMIs collected on time", "Commission payouts disputed", "Policies renewed before expiry", "Time from payout request to approval", "Policies issued without a manual fix"],
      experiment: {
        who: "Agents in two branches, for one full collection cycle",
        check: "More EMIs collected on time",
        guard: "Rescheduled EMIs that later default, and payout approval time, must not rise",
      },
      learnings: [
        "Most 'late' collections are a logging problem. Fix the record, then the behaviour.",
        "An approval that no one can trace will always be disputed. Put it in a queue.",
      ],
    },
  },
  // CareLoop is a made-up clinic-booking app, used as a stand-in for the category.
  {
    slug: "careloop-missed-consults",
    company: "CareLoop (a clinic-booking app)",
    kind: "practice",
    title: "Why patients miss the video consult they booked",
    oneLiner: "They book, they pay, and they never join the call. Where it goes wrong — and what to fix first.",
    tags: ["Appointments", "Reminders", "Healthcare"],
    discover: {
      problem:
        "A patient books a video consult, pays, and never joins the call. The doctor waits, the slot is wasted, and the patient still has the problem they booked for. Multiply that across every clinic on the app and it is one of the biggest leaks in telehealth. The job: find why patients miss the call, and fix the biggest cause first.",
      users: [
        "Patients booking a doctor online for the first time",
        "Working people who book during the day and forget by evening",
        "Family members booking for parents who do not use the app",
      ],
      evidence: [
        "My guess: most no-shows forget the time — not because they changed their mind.",
        "My guess: the second leak is a join link that fails on the first try, so people give up.",
        "Public reports: a large share of booked telehealth slots go unused. I would confirm with real data first.",
      ],
      rootCauses: [
        "One reminder, sent the night before, and nothing on the day",
        "The join link sits deep inside the app, not in the reminder",
        "A patient who cannot make it has no easy way to move the slot",
        "The person who booked is not always the person who needs the call",
      ],
    },
    define: {
      goal: "More booked consults actually happen — without annoying patients with messages.",
      bets: [
        "Reminder 15 minutes before, with the join link right in the message",
        "One-tap 'move my slot' in every reminder, free up to an hour before",
        "Let the booker add the patient's phone, so the right person gets the link",
        "Doctor can start the call and the patient gets a ring, like a normal call",
      ],
      whyFirst:
        "The 15-minute reminder with the link first. The patient has already paid, so this is the cheapest consult to save. No change to doctors or booking, and results show in days.",
    },
    deliver: {
      flow: ["Book", "Pay", "Reminder — day before", "Reminder — 15 min, with link", "Join call", "Consult done"],
      now: [
        "15-minute reminder with a one-tap join link",
        "'Move my slot' in the same message",
        "Reminder sent to the patient's number, if given",
      ],
      later: ["Doctor-started call that rings the patient", "Follow-up reminder for lab reports after the consult"],
      risks: [
        "Easy rescheduling can create a wave of last-minute moves — cap it at once per booking",
        "Too many messages and people mute the app",
        "Health reminders must not reveal the reason for the visit",
      ],
    },
    measure: {
      metrics: ["Booked consults that happen", "Patients joining within five minutes of the slot", "Slots moved vs slots missed", "Patients who book again"],
      experiment: {
        who: "Half the patients at 20 clinics, for two weeks",
        check: "More booked consults happen",
        guard: "Reminder opt-outs and last-minute moves must not rise",
      },
      learnings: [
        "A missed call is usually a reminder problem, not a patient problem.",
        "Put the next action inside the message. Do not make people find it.",
      ],
    },
  },
];

// ------------------------------------------------------------------
// HOMEPAGE — kept deliberately short: a visitor should know what I do
// within ~12 seconds. Every number already appears on the resume.
// `icon` keys map to components/home/Icons.tsx.
// ------------------------------------------------------------------

export const hero = {
  eyebrow: "Kunal Farma · Product Manager",
  subtitle:
    "I’m a Product Manager with 4+ years in e-commerce. I find the real customer problem, decide what to build, ship it with the team, and prove it with numbers.",
};

// Static icons around the portrait. x/y = % position in the portrait
// stage (desktop). Order = the loop the dotted arrows follow.
export const capabilities = [
  { key: "strategy", label: "Product Strategy", x: 18, y: 15 },
  { key: "research", label: "User Research", x: 12, y: 48 },
  { key: "data", label: "Data Analysis", x: 18, y: 81 },
  { key: "execution", label: "Execution", x: 82, y: 81 },
  { key: "roadmap", label: "Roadmap Planning", x: 88, y: 48 },
  { key: "ai", label: "AI & Innovation", x: 82, y: 15 },
] as const;

// "How I work" — the four stations on the homepage spine. Each claim is
// backed by the resume or the work listed under experience.
export const stations = [
  {
    id: "discover",
    icon: "research",
    step: "Discover",
    title: "Understand the user and the business.",
    points: [
      "Pull the funnel in SQL and GA4: where users drop, and what it costs.",
      "Talk to 5–8 of those users to learn why.",
      "Write one testable hypothesis: “X users drop at Y because Z.”",
      "No build until the problem has a number.",
    ],
    proof: ["Funnel in SQL + GA4", "5–8 user interviews", "One problem hypothesis"],
  },
  {
    id: "define",
    icon: "strategy",
    step: "Define",
    title: "Decide what to build — and why.",
    points: [
      "Score every fix on reach, impact, confidence, effort (RICE). Top one first.",
      "One-page PRD: hypothesis, success metric, today’s baseline, target.",
      "Ship the smallest version that can prove or kill the hypothesis.",
    ],
    proof: ["RICE prioritisation", "One-page PRD", "Metric · baseline · target"],
  },
  {
    id: "deliver",
    icon: "execution",
    step: "Deliver",
    title: "Ship it with the team.",
    points: [
      "Two-week sprints in Jira with engineering and business in the same room.",
      "A working AI prototype (Claude, Cursor) before the first sprint, so we test the idea, not a slide.",
    ],
    proof: ["Agile / Jira", "Stakeholders", "AI prototypes (Claude, Cursor)"],
  },
  {
    id: "measure",
    icon: "data",
    step: "Measure",
    title: "Prove the impact.",
    points: [
      "Success metric, baseline and tracking go in before launch.",
      "A/B test where possible. Then the numbers decide, not opinions.",
    ],
  },
];

// Outcomes, named the way a product team reads them: the metric that
// moved, what it was in plain words, and where. Numbers come from the
// resume — never add one without a source.
export const proofStats = [
  { value: "4+", metric: "Experience", label: "years in product & e-commerce" },
  { value: "+11%", metric: "Acquisition", label: "organic traffic", source: "VLE Bazaar" },
  { value: "+8%", metric: "Conversion", label: "visitors who bought", source: "VLE Bazaar" },
  { value: "+9%", metric: "Revenue", label: "sales after fixing custom orders", source: "HoMafy" },
  { value: "~15%", metric: "Team velocity", label: "faster delivery", source: "Mahattaart" },
];

export const experience = [
  {
    icon: "roadmap",
    company: "Mahattaart",
    role: "Growth & Product Specialist",
    period: "2024 — now",
    highlight: "Product discovery · pricing rules · tracking · A/B tests",
    solved: [
      {
        icon: "strategy",
        title: "A fragmented customer journey",
        body: "Seven disconnected steps — design, size, material, price, consultation, payment, tracking — joined into one flow. Details entered once.",
      },
      {
        icon: "doc",
        title: "A website that did not sell",
        body: "Product pages that answer the buying questions: previews, materials, size guidance, instant price, Buy now or Book a consultation.",
      },
    ],
    focus: "Enquiry-to-order conversion · self-service orders · fewer support contacts",
    caseStudy: "mahattaart-custom-wall-decor",
  },
  {
    icon: "data",
    company: "VLE Bazaar",
    role: "Product Catalog Specialist",
    period: "2023",
    highlight: "Catalog, orders and support · +11% organic traffic · +8% conversion",
    // Problems Kunal solved there (his account). Public review stats about
    // the company are deliberately left out.
    solved: [
      {
        icon: "truck",
        title: "Orders stuck and not shipped",
        body: "Listed only real stock, checked suppliers before payment, set shipping deadlines, escalated late orders.",
      },
      {
        icon: "support",
        title: "Support not fixing issues",
        body: "One view of order and refund status for agents. Tickets closed only when the problem was really fixed.",
      },
    ],
    focus: "Faster shipping · fewer repeat complaints · more trust",
  },
  {
    icon: "research",
    company: "HoMafy",
    role: "Customer Product Experience",
    period: "2022 — 23",
    highlight: "Custom orders, delivery and catalog · +9% sales",
    // Problems Kunal solved there (his account). No outcome metrics were
    // given, so `focus` names what the work was for, not a result.
    solved: [
      {
        icon: "checklist",
        title: "Mistakes in custom orders",
        body: "Photos and text from email and chat moved into the order itself, with a checklist before production.",
      },
      {
        icon: "truck",
        title: "Unclear delivery dates",
        body: "Promised date saved on every order, each step tracked, late orders flagged early.",
      },
      {
        icon: "box",
        title: "Messy catalog and suppliers",
        body: "Product details, stock, options and delivery times kept consistent across the catalog.",
      },
    ],
    focus: "Fewer mistakes · clear delivery dates · clear ownership",
  },
];

export const credentials = [
  "BBA, IP University · CGPA 8.5",
  "8 certifications · IBM · Microsoft · Google · UVA",
];

// All eight certifications, exactly as listed on the resume.
export const certifications = [
  { name: "IBM Product Manager Professional Certificate", issuer: "IBM" },
  { name: "Microsoft AI Product Manager", issuer: "Microsoft" },
  { name: "Google Project Management Professional Certificate", issuer: "Google" },
  { name: "Google Data Analytics", issuer: "Google" },
  { name: "Digital Product Management: Modern Fundamentals", issuer: "University of Virginia" },
  { name: "Generative AI for Product Strategy, UX & Launch", issuer: "SkillUp" },
  { name: "Microsoft Business Analyst", issuer: "Microsoft" },
  { name: "IBM UI/UX Designer", issuer: "IBM" },
];

// Toolkit, grouped. AI and PM tools confirmed by Kunal; the rest come
// from the resume and earlier site.
export const toolkit = [
  {
    title: "AI tools",
    icon: "ai",
    items: [
      { icon: "ai", label: "Claude / Claude Code" },
      { icon: "ai", label: "ChatGPT" },
      { icon: "code", label: "Cursor" },
      { icon: "design", label: "Lovable / v0 / Bolt" },
    ],
  },
  {
    title: "AI product management",
    icon: "bulb",
    items: [
      { icon: "ai", label: "LLMs & prompt engineering" },
      { icon: "doc", label: "RAG" },
      { icon: "execution", label: "AI agents & tool calling" },
      { icon: "checklist", label: "AI evals & hallucination testing" },
    ],
  },
  {
    title: "Product strategy & metrics",
    icon: "strategy",
    items: [
      { icon: "bulb", label: "Product-market fit" },
      { icon: "chart", label: "Pricing & unit economics" },
      { icon: "data", label: "CAC / LTV" },
      { icon: "roadmap", label: "Competitive analysis & GTM" },
    ],
  },
  {
    title: "Product",
    icon: "roadmap",
    items: [
      { icon: "doc", label: "PRDs & user stories" },
      { icon: "execution", label: "Jira" },
      { icon: "design", label: "Figma" },
      { icon: "doc", label: "Notion / Confluence" },
    ],
  },
  {
    title: "Data & experiments",
    icon: "data",
    items: [
      { icon: "data", label: "Advanced SQL" },
      { icon: "chart", label: "Product analytics" },
      { icon: "chart", label: "GA4" },
      { icon: "chart", label: "GTM / DataLayer" },
      { icon: "chart", label: "Looker Studio" },
      { icon: "split", label: "Statsig A/B tests" },
    ],
  },
  {
    title: "Build, test & ship",
    icon: "code",
    items: [
      { icon: "code", label: "APIs & Postman" },
      { icon: "checklist", label: "Playwright / QA automation" },
      { icon: "code", label: "GitHub" },
      { icon: "cloud", label: "Render" },
      { icon: "cloud", label: "Netlify" },
    ],
  },
];

// Set to true to show a "Demo" badge on the homepage cards instead of
// "Hypothetical" (e.g. while swapping in new studies).
export const caseStudiesAreDemo = false;
