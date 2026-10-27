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

// HYPOTHETICAL case studies — independent product analyses, written in
// the same four steps as the homepage: Discover → Define → Deliver →
// Measure, in plain words. I have NOT worked for Amazon, Flipkart or
// Myntra; every figure is a public benchmark or a stated guess, never
// internal data. The badge, the index note and the detail-page banner
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
  {
    slug: "flipkart-cod-rto",
    company: "Flipkart",
    kind: "practice",
    title: "Fewer cash-on-delivery parcels refused at the door",
    oneLiner: "A refused parcel travels twice and earns nothing. Ask the customer before shipping, not at the door.",
    tags: ["Cash on delivery", "Returns", "Delivery"],
    discover: {
      problem:
        "Cash on delivery is how much of India shops. But when a customer refuses the parcel at the door, it travels both ways, earns nothing, and often cannot be sold again. The job: cut refusals without making cash on delivery harder for honest buyers.",
      users: [
        "First-time buyers who do not trust online payment yet",
        "Impulse buyers who change their mind before delivery",
        "People ordering for family who may not be home",
      ],
      evidence: [
        "My guess: most refusals are a change of mind, not an inability to pay.",
        "My guess: delivery calls from unknown numbers go unanswered, so deliveries fail.",
        "Industry reports: cash parcels are refused far more often than prepaid ones.",
      ],
      rootCauses: [
        "We ask 'do you want this?' once, at order time, and never again",
        "Delivery calls come from numbers people ignore",
        "Unclear addresses make the first attempt fail",
        "Cancelling after shipping is harder than refusing at the door",
      ],
    },
    define: {
      goal: "Fewer cash-on-delivery parcels refused — and cash on delivery still easy for honest buyers.",
      bets: [
        "Day before delivery: 'Still want this?' One tap to confirm, free cancel before it ships",
        "Pick a delivery time slot when confirming, so someone is home",
        "Check address quality at order time; unclear ones get a quick confirm",
        "Small discount to pay online — 'skip the cash', never a penalty",
      ],
      whyFirst:
        "Ask before shipping. The parcel has not moved, so a cancellation costs almost nothing — and the customer gets a choice instead of a surprise.",
    },
    deliver: {
      flow: ["Cash order", "Address check", "'Still want this?'", "Time slot picked", "Shipped", "Delivered — cash paid"],
      now: [
        "'Still want this?' message with one-tap confirm and free cancel",
        "Time slot picker in the same message",
        "Unconfirmed orders are held, not shipped",
      ],
      later: ["Address quality check with a confirm step", "'Skip the cash' discount for repeat buyers"],
      risks: [
        "Every extra step loses a few honest buyers — keep it one tap",
        "Too many messages and people ignore them",
        "Judging addresses by area could be unfair to some regions",
      ],
    },
    measure: {
      metrics: ["Cash parcels refused", "Customers who reply", "Orders cancelled before shipping", "First-try delivery success"],
      experiment: {
        who: "10% of cash-on-delivery orders in two cities",
        check: "Fewer parcels refused at the door",
        guard: "Cancellations before shipping must not exceed the refusals they replace",
      },
      learnings: [
        "The cheapest time to stop a refusal is before shipping.",
        "'Still want this?' helps the customer and the business. Say both.",
      ],
    },
  },
  {
    slug: "myntra-size-fit",
    company: "Myntra",
    kind: "practice",
    title: "Fewer returns by helping people pick the right size",
    oneLiner: "Wrong size is the top reason clothes come back. Fix the first choice, not the return.",
    tags: ["Returns", "Sizing", "Fashion"],
    discover: {
      problem:
        "In online fashion, a big share of orders comes back — and 'wrong size' is the most common reason. Every size return costs shipping, repacking, and often the customer's next order. The job: help people pick the right size first time, without turning the product page into a quiz.",
      users: [
        "Shoppers aged 18–34 buying across brands with different sizing",
        "People buying for family and guessing the size",
        "New customers with no order history",
      ],
      evidence: [
        "My guess: the same 'M' fits differently in every brand — that, not carelessness, drives most size returns.",
        "My guess: people see the size chart but pick their usual size anyway.",
        "Reports: 25–40% of fashion orders in India come back, with size the top reason.",
      ],
      rootCauses: [
        "No way to translate sizes between brands",
        "Size charts show garment measurements people cannot relate to",
        "'Runs small' is buried in long review text",
        "Returning is easy, exchanging is hard",
      ],
    },
    define: {
      goal: "Fewer size returns — and the ones that still happen become exchanges.",
      bets: [
        "Fit tags from reviews — runs small / true to size / runs large — next to the size options",
        "One-tap exchange: swap the size, keep the order",
        "Remember each shopper's usual size and show a per-brand fit hint",
        "For new brands, use similar brands and say how sure we are",
      ],
      whyFirst:
        "Fit tags first. The review data already exists, the shopper does nothing, and it can be live in weeks. Remembering sizes is the bigger win, but it needs data the tags start collecting.",
    },
    deliver: {
      flow: ["Product page", "Fit tag + size hint", "Order", "Wrong size?", "One-tap exchange", "Right size kept"],
      now: ["Fit tags next to the size options", "One-tap exchange from the order page"],
      later: ["Remember the shopper's usual size everywhere", "Per-brand fit hint from past returns"],
      risks: [
        "New brands have little data — say how sure we are",
        "More than two taps and people stop using it",
        "'Did not like the style' often gets logged as 'wrong size'",
      ],
    },
    measure: {
      metrics: ["Returns because of size", "Exchanges vs returns", "Shoppers using fit tags", "Repeat orders after an exchange"],
      experiment: {
        who: "Half the shoppers, on the 200 products with the most size returns",
        check: "Fewer size returns",
        guard: "Add-to-cart must not drop",
      },
      learnings: [
        "Returns look like a design problem but are a data problem.",
        "An exchange keeps the sale, the shipping cost, and usually the customer.",
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
  eyebrow: "Product Management · 4+ years",
  subtitle:
    "I turn customer problems into products that move business numbers.",
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
    line: "Research and data show me which problem is worth solving.",
    proof: ["User research", "SQL + GA4", "Funnel analysis"],
  },
  {
    id: "define",
    icon: "strategy",
    step: "Define",
    title: "Decide what to build — and why.",
    line: "A clear plan: what comes first, what waits, and the reason.",
    proof: ["Prioritisation", "Roadmaps", "PRDs & user stories"],
  },
  {
    id: "deliver",
    icon: "execution",
    step: "Deliver",
    title: "Ship it with the team.",
    line: "Agile sprints with engineering and business. AI prototypes to test ideas early.",
    proof: ["Agile / Jira", "Stakeholders", "AI prototypes (Claude, Cursor)"],
  },
  {
    id: "measure",
    icon: "data",
    step: "Measure",
    title: "Prove the impact.",
    line: "Tracking goes in before launch, so every result has a number.",
  },
];

export const proofStats = [
  { value: "4+", label: "years in e-commerce" },
  { value: "+11%", label: "organic traffic", source: "VLE Bazaar" },
  { value: "+8%", label: "conversion", source: "VLE Bazaar" },
  { value: "+9%", label: "sales", source: "HoMafy" },
  { value: "~15%", label: "team productivity", source: "Mahattaart" },
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

// Toolkit, grouped. AI and PM tools confirmed by Kunal; the rest come
// from the resume and earlier site.
export const toolkit = [
  {
    title: "AI",
    icon: "ai",
    items: [
      { icon: "ai", label: "Claude / Claude Code" },
      { icon: "ai", label: "ChatGPT" },
      { icon: "code", label: "Cursor" },
      { icon: "design", label: "Lovable / v0 / Bolt" },
    ],
  },
  {
    title: "Product",
    icon: "strategy",
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
      { icon: "data", label: "SQL" },
      { icon: "chart", label: "GA4" },
      { icon: "chart", label: "GTM / DataLayer" },
      { icon: "chart", label: "Looker Studio" },
      { icon: "split", label: "Statsig A/B tests" },
    ],
  },
  {
    title: "Build & ship",
    icon: "code",
    items: [
      { icon: "code", label: "GitHub" },
      { icon: "cloud", label: "Render" },
      { icon: "cloud", label: "Netlify" },
    ],
  },
];

// Set to true to show a "Demo" badge on the homepage cards instead of
// "Hypothetical" (e.g. while swapping in new studies).
export const caseStudiesAreDemo = false;
