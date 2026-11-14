// ------------------------------------------------------------------
// SITE CONTENT — everything editable lives in this one file.
// Sourced from the master resume (Kunal_Farma_Growth_Marketing_Resume)
// — do not add claims that are not already resume-backed. Case studies
// are HYPOTHETICAL independent analyses; keep their labels.
// ------------------------------------------------------------------

export const profile = {
  name: "Kunal Farma",
  headline: "Growth Marketer",
  focus: "Meta Ads · Google Ads · E-commerce CRO · GA4 Analytics",
  location: "New Delhi, India",
  email: "kunalfarma189@gmail.com",
  linkedin: "https://www.linkedin.com/in/kunal-farma/",
  github: "https://github.com/kunalfarma189-lab",
  phone: "+91 85058 78277",
  phoneHref: "tel:+918505878277",
  portrait: "/kunal-farma.jpg",
};

// HYPOTHETICAL case studies — independent growth analyses, written in
// the same four steps as the homepage: Find → Plan → Run → Measure, in
// plain words. StepKart, FinBridge and CareLoop are made-up companies
// standing in for e-commerce, fintech and healthcare. Every figure is a
// public benchmark or a stated guess, never internal data. The badge,
// the index note and the detail-page banner say so — keep them.
//
// The chapter keys (discover / define / deliver / measure) are internal
// names; the pages label them Find / Plan / Run / Measure.
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
  // Real work at Mahattaart (2024 — now), written from the resume. The
  // only number is the resume's own estimate; everything else is kept
  // general and no internal data is shared.
  {
    slug: "mahattaart-custom-wall-decor",
    company: "Mahattaart",
    kind: "work",
    title: "Finding where custom wallpaper buyers drop, and fixing it",
    oneLiner:
      "Ads brought people to custom wallpapers and frames, but the funnel from product page to checkout was a black box. I built the tracking, found the biggest drop, and tested the fix.",
    tags: ["Meta & Google Ads", "GA4 + GTM", "CRO"],
    discover: {
      problem:
        "Custom wallpapers and frames are not a one-click buy: a visitor picks a design, enters a wall size, changes the mockup, sees a price and only then reaches checkout. Meta and Google Ads were sending traffic, but nobody could say which step lost it, so ad spend and site fixes were both guesses.",
      users: [
        "Homeowners buying custom wall décor online for the first time",
        "Interior designers pricing a wall for a client",
        "The team deciding where ad budget and dev time should go",
      ],
      evidence: [
        "No events existed for filters, mockup changes, wall-size input, preview or pricing updates, so GA4 only saw page views and purchases.",
        "Microsoft Clarity recordings showed visitors going back and forth at the customisation and quote step.",
        "Campaign ROAS and CPA were tracked, but not against the on-site steps that actually turned a click into an order.",
      ],
      rootCauses: [
        "The funnel had no tracking between landing and purchase",
        "The price appeared late, after the visitor had already done the work",
        "Wall-size input and preview were easy to get wrong and slow to redo",
        "Ad and site decisions were made separately, on separate numbers",
      ],
    },
    define: {
      goal: "See every step of the funnel in GA4, then raise the share of visitors who go from customisation to checkout, with ROAS and CPA tied to real purchases.",
      bets: [
        "Build the full tracking layer in GA4 and GTM: filters, mockup changes, wall-size input, preview, pricing updates, purchase",
        "Find the biggest drop and A/B test fixes on Statsig: pricing display, wall-size input, preview flow",
        "Point ad traffic at the step that converts, and read ROAS and CPA against GA4 conversions",
        "Retarget visitors who customised but did not check out",
      ],
      whyFirst:
        "Tracking first. Without events on each step every other fix is a guess, and the ad budget cannot be judged on what it actually brings. Once the funnel was visible, the biggest drop was obvious.",
    },
    deliver: {
      flow: ["Ad click", "Product page", "Customise", "See price", "Checkout", "Purchase"],
      now: [
        "GA4 and GTM events on every customisation step, so the team saw the funnel for the first time",
        "A/B tests on pricing display, wall-size input and preview flow at the customisation and quote step",
        "Campaign structure, audience and lookalike targeting, creative and copy tests, with ROAS and CPA tracked against GA4 conversions",
      ],
      later: [
        "Retargeting audiences built from customisation events",
        "Budget moved toward the campaigns whose traffic reaches checkout",
      ],
      risks: [
        "A wrong event fires on the wrong step and the funnel lies — test every tag before trusting it",
        "A pricing change can lift checkout and lower margin — watch average order value",
        "Small daily traffic makes tests slow — run them long enough to be sure",
      ],
    },
    measure: {
      metrics: [
        "Customisation-to-checkout rate",
        "ROAS and CPA against GA4 purchases",
        "Add-to-cart and checkout rate",
        "Average order value",
      ],
      experiment: {
        who: "Visitors reaching the customisation step, split on Statsig",
        check: "More of them reach checkout; the resume estimate for the tested fixes is a 12% lift",
        guard: "Average order value and purchase rate must not fall",
      },
      learnings: [
        "Track the step before you fix the step. Opinions ended the day the events went live.",
        "Ads and the site are one funnel. Judge the campaign on purchases, not clicks.",
      ],
    },
  },
  // StepKart is a made-up D2C footwear brand, used as a stand-in for the category.
  {
    slug: "stepkart-roas-drop",
    company: "StepKart (a D2C footwear brand)",
    kind: "practice",
    title: "Why Meta Ads spend went up and ROAS went down",
    oneLiner: "The brand doubled its Meta budget and return on ad spend fell by a third. Where the money leaks, and what to fix first.",
    tags: ["Meta Ads", "ROAS", "Landing pages"],
    discover: {
      problem:
        "A D2C footwear brand doubles its monthly Meta Ads budget to grow faster. Clicks go up, but orders barely move and ROAS drops from about 3 to about 2. The founder wants to cut spend; the agency wants to scale further. The job: find where the extra spend stops turning into orders, and fix the biggest leak first.",
      users: [
        "First-time buyers who click an Instagram reel and land on the homepage",
        "Past visitors who added to cart and left, with no retargeting running",
        "The founder, who sees spend and revenue but nothing in between",
      ],
      evidence: [
        "My guess: the new budget went to broad audiences and the same three creatives, so frequency rose and click quality fell.",
        "My guess: half the ad traffic lands on the homepage, not the product, and leaves before seeing a price.",
        "Public reports: creative fatigue and broad targeting are the usual causes of falling ROAS when a Meta account scales. I would confirm in Ads Manager and GA4 first.",
      ],
      rootCauses: [
        "Budget scaled before the audiences were split: broad, lookalike and retargeting all in one campaign",
        "Three creatives running for two months, so the same people saw them again and again",
        "Ads land on the homepage, so the shopper has to find the shoe the ad showed",
        "No retargeting, so an abandoned cart is a lost cart",
      ],
    },
    define: {
      goal: "ROAS back above 3 at the higher budget, measured on GA4 purchases, not on Meta's reported conversions alone.",
      bets: [
        "Restructure the account: prospecting (broad and lookalike) and retargeting (cart and product viewers) with their own budgets",
        "Every ad lands on the product it shows, with price, size guide and reviews above the fold",
        "A creative test each week: new hook, same offer; pause anything below the account's average CTR after enough spend",
        "Retargeting with a dynamic product ad for the exact shoe left in the cart",
      ],
      whyFirst:
        "The account structure first. Retargeting is the cheapest revenue in the account, and it cannot be judged while it shares a budget with cold traffic. Once it is separate, the ROAS of each layer tells you where the next rupee should go.",
    },
    deliver: {
      flow: ["Reel ad", "Product landing page", "Size and price", "Add to cart", "Checkout", "Retarget if left"],
      now: [
        "Prospecting and retargeting split into separate campaigns with separate budgets",
        "Ad links changed from homepage to the matching product page",
        "GA4 purchase events checked against Meta's conversions so both report the same orders",
      ],
      later: [
        "Weekly creative tests with a kill rule for tired ads",
        "Dynamic product ads for cart and product-view audiences",
        "Lookalikes built from buyers, not from all visitors",
      ],
      risks: [
        "Meta over-reports conversions — reconcile with GA4 and actual orders before trusting any ROAS",
        "Cutting broad spend too fast starves the retargeting pool",
        "A better landing page can lift conversion and attract more returns — watch the return rate",
      ],
    },
    measure: {
      metrics: ["ROAS on GA4 purchases", "Cost per purchase (CPA)", "Landing-page-to-cart rate", "Ad frequency and CTR", "Average order value"],
      experiment: {
        who: "The whole account for four weeks, old structure versus new, same total budget",
        check: "ROAS on GA4 purchases goes up at the same spend",
        guard: "Returns and average order value must not get worse",
      },
      learnings: [
        "Scaling spend before splitting audiences just buys the same people twice.",
        "Send the shopper to the shoe they clicked. The homepage is where ad money goes to die.",
      ],
    },
  },
  // FinBridge is a made-up fintech platform, used as a stand-in for the category.
  {
    slug: "finbridge-loan-leads",
    company: "FinBridge (an NBFC loans, payments & insurance platform)",
    kind: "practice",
    title: "Why loan leads from Google Ads never become loans",
    oneLiner: "Search ads bring thousands of loan enquiries, but few are approved and fewer stay. Where the funnel leaks, from keyword to EMI to policy renewal.",
    tags: ["Google Search Ads", "Lead quality", "Retention"],
    discover: {
      problem:
        "An NBFC runs Google Search Ads for personal loans. Cost per lead looks fine, but most leads are rejected, the sales team chases the wrong ones, and customers who do get a loan rarely take the wallet or renew the insurance policy sold with it. Marketing is judged on leads; the business needs disbursed loans that pay their EMIs. The job: find where the funnel leaks, and fix the biggest cause first.",
      users: [
        "Small-town salaried people searching 'instant personal loan' on their phones",
        "Existing borrowers paying EMIs who also hold a policy or a wallet",
        "The sales and back-office team that calls, verifies and approves",
      ],
      evidence: [
        "My guess: broad keywords like 'loan' bring people the NBFC cannot lend to, so the rejection rate is a targeting problem, not a sales problem.",
        "My guess: the landing form asks for everything before showing eligibility, so good leads leave and bad leads fill it anyway.",
        "Public reports: lending funnels lose most of their paid leads between enquiry and disbursal, and renewals leak when reminders are manual. I would confirm with the CRM and GA4 first.",
      ],
      rootCauses: [
        "Campaigns optimise for form fills, so the algorithm finds people who fill forms, not people who qualify",
        "No eligibility check before the form, so every search becomes a lead",
        "Call-back is next day; by then the customer has taken a loan elsewhere",
        "EMI, wallet and policy renewal messages run from different sheets, so no one reminds the customer in time",
      ],
    },
    define: {
      goal: "Lower cost per disbursed loan, not cost per lead, and more borrowers who pay on time and renew.",
      bets: [
        "Optimise campaigns to a qualified-lead event (eligibility passed) sent back to Google Ads, with negative keywords for what the NBFC cannot fund",
        "A two-step landing page: pincode, income and employer first, eligibility shown instantly, then the form",
        "Same-hour call-back for qualified leads, tracked as an event",
        "Lifecycle messages on WhatsApp and SMS: EMI due in 3 days, policy renewal 30 and 7 days out, wallet offers after the first EMI",
      ],
      whyFirst:
        "The qualified-lead event first. Everything downstream is wasted while the ads are buying rejections, and changing the optimisation goal is a one-week change that moves every later number.",
    },
    deliver: {
      flow: ["Search ad", "Eligibility check", "Short form", "Call within the hour", "Loan disbursed", "EMI and renewal reminders"],
      now: [
        "Eligibility-passed event in GTM, imported to Google Ads as the conversion to optimise",
        "Negative keyword list for unfundable intent (student, no income, bad credit)",
        "Two-step landing page with instant eligibility",
      ],
      later: [
        "Same-hour call-back SLA with tracking",
        "EMI, renewal and wallet reminder journeys with open and click tracking",
        "Cohorts by campaign: which keywords bring borrowers who pay on time",
      ],
      risks: [
        "An eligibility check that is too strict turns away good customers — tune it against actual approvals",
        "Fewer leads looks like failure to anyone still watching cost per lead — change the dashboard first",
        "Reminder messages about loans and policies are regulated — get compliance to sign off the copy",
      ],
    },
    measure: {
      metrics: ["Cost per disbursed loan", "Lead-to-approval rate", "EMIs paid on time, by campaign", "Policies renewed before expiry", "Wallet activation after first EMI"],
      experiment: {
        who: "Half the search campaigns on the new conversion goal and landing page, for one month",
        check: "Cost per disbursed loan falls",
        guard: "Disbursed volume and on-time EMI rate must not fall",
      },
      learnings: [
        "Optimise the ad to the event the business is paid for, not the one that is easiest to count.",
        "Retention is a marketing channel. A reminder on time is cheaper than any new lead.",
      ],
    },
  },
  // CareLoop is a made-up clinic-booking app, used as a stand-in for the category.
  {
    slug: "careloop-first-booking",
    company: "CareLoop (a clinic-booking app)",
    kind: "practice",
    title: "Why app installs never become a first booking",
    oneLiner: "Installs are cheap, bookings are rare. Where new users drop between the app store and the doctor, and what to fix first.",
    tags: ["App installs", "Onboarding", "Lifecycle"],
    discover: {
      problem:
        "A clinic-booking app buys installs on Meta and Google at a low cost per install, and celebrates the number. But fewer than one in ten installs ever books a consult, so the real cost per booking is huge and most of the budget buys an icon on a phone that is never opened again. The job: find where new users drop between install and first booking, and fix the biggest cause first.",
      users: [
        "People who search for a doctor once, when they are unwell, and need an answer today",
        "Family members booking for parents who do not use apps",
        "Clinics that only see no-shows, not the users who never got that far",
      ],
      evidence: [
        "My guess: install campaigns optimise for installs, so they find people who install things, not people who need a doctor this week.",
        "My guess: the app asks for sign-up, location and phone verification before showing a single doctor, so most users leave on the first screen.",
        "Public reports: most health apps lose the majority of new users in the first days, and the first session decides it. I would confirm with the app analytics first.",
      ],
      rootCauses: [
        "Campaigns are optimised to installs, not to first bookings",
        "Sign-up comes before value: no doctors or slots shown until the user registers",
        "No message after install; a user who leaves at sign-up is never brought back",
        "The ad promises 'doctor in 10 minutes' and the app opens on a blank search",
      ],
    },
    define: {
      goal: "Lower cost per first booking, with more installs that book within seven days.",
      bets: [
        "Optimise install campaigns to the first-booking event, sent from the app to Meta and Google",
        "Show doctors, slots and price before sign-up; ask for the phone number only to confirm a booking",
        "Deep-link each ad to the speciality it shows (fever, skin, child) instead of the home screen",
        "Three lifecycle messages in the first week for users who did not book, with the next slot in the message",
      ],
      whyFirst:
        "The first-booking event first. While the ads optimise for installs, every other fix is diluted by users who were never going to book. Changing the goal costs nothing and improves the audience for everything after it.",
    },
    deliver: {
      flow: ["Ad for a speciality", "Deep link into that speciality", "See doctors and slots", "Pick a slot", "Verify phone", "Booked"],
      now: [
        "First-booking event wired to the Meta and Google SDKs, campaigns switched to it",
        "Sign-up moved to the last step, after the slot is chosen",
        "Deep links per speciality from each ad group",
      ],
      later: [
        "Day 1, 3 and 6 messages for users who installed but did not book",
        "Lookalike audiences built from users who booked, not from installers",
        "Reminder before the consult with a one-tap join link, so the first booking also happens",
      ],
      risks: [
        "Optimising to bookings needs enough events a week for the platforms to learn — start with the biggest city",
        "Showing doctors before sign-up can be scraped — rate-limit the public search",
        "Health messages must not reveal why someone booked — keep the copy generic",
      ],
    },
    measure: {
      metrics: ["Cost per first booking", "Install-to-booking rate within 7 days", "First-screen drop-off", "Bookings that actually happen", "Users who book again in 90 days"],
      experiment: {
        who: "New installs in one city, half on the new goal, deep links and sign-up order, for three weeks",
        check: "More installs book within seven days",
        guard: "No-show rate and cost per install must not blow up",
      },
      learnings: [
        "A cheap install is expensive if it never opens. Buy the action, not the icon.",
        "Show the value before the form. People will sign up to confirm a doctor, not to see one.",
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
  eyebrow: "Kunal Farma · Growth Marketer",
  subtitle:
    "I’m a Growth Marketer with 4+ years in e-commerce. I run Meta and Google Ads, bring the right traffic, and fix the funnel so more visitors buy — tracked in GA4, proven with A/B tests.",
};

// Static icons around the portrait. x/y = % position in the portrait
// stage (desktop). Order = the loop the dotted arrows follow.
export const capabilities = [
  { key: "send", label: "Meta Ads", x: 18, y: 15 },
  { key: "research", label: "Google Ads", x: 12, y: 48 },
  { key: "chart", label: "GA4 & GTM", x: 18, y: 81 },
  { key: "split", label: "A/B Testing", x: 82, y: 81 },
  { key: "strategy", label: "Conversion (CRO)", x: 88, y: 48 },
  { key: "data", label: "ROAS · CAC · LTV", x: 82, y: 15 },
] as const;

// "How I work" — the four stations on the homepage spine. Each claim is
// backed by the resume or the work listed under experience.
export const stations = [
  {
    id: "find",
    icon: "research",
    step: "Find",
    title: "Find where growth leaks.",
    points: [
      "Track every funnel step in GA4 and GTM: landing, product, add-to-cart, checkout, purchase.",
      "Watch Microsoft Clarity recordings and cohorts to see where and why people drop.",
      "Write one testable hypothesis: “X visitors drop at Y because Z.”",
      "No spend or site change until the leak has a number.",
    ],
    proof: ["GA4 + GTM events", "Microsoft Clarity", "Cohort analysis"],
  },
  {
    id: "plan",
    icon: "strategy",
    step: "Plan",
    title: "Decide what to test, and why.",
    points: [
      "Rank every fix by revenue impact against effort. The biggest leak goes first.",
      "One-page test plan: hypothesis, success metric, today’s baseline, target.",
      "Split the budget by funnel stage: prospecting, retargeting, retention.",
    ],
    proof: ["Hypothesis building", "Campaign planning", "Metric · baseline · target"],
  },
  {
    id: "run",
    icon: "send",
    step: "Run",
    title: "Run the ads and the tests.",
    points: [
      "Meta (Facebook, Instagram) and Google (Search, Shopping) campaigns: structure, audience and lookalike targeting, creative and copy tests, retargeting.",
      "A/B tests on Statsig for landing pages, pricing display and checkout steps.",
      "Ship the smallest change that can prove or kill the hypothesis.",
    ],
    proof: ["Meta Ads", "Google Ads", "Statsig A/B tests", "Landing pages"],
  },
  {
    id: "measure",
    icon: "data",
    step: "Measure",
    title: "Prove it in revenue.",
    points: [
      "ROAS and CPA read against GA4 purchases, not platform-reported clicks.",
      "CAC, LTV and AOV reported every week. The numbers decide, not opinions.",
    ],
  },
];

// Outcomes, named the way a growth team reads them: the metric that
// moved, what it was in plain words, and where. Numbers come from the
// resume — never add one without a source.
export const proofStats = [
  { value: "4+", metric: "Experience", label: "years in e-commerce growth" },
  { value: "+11%", metric: "Traffic", label: "website traffic from ads", source: "VLE Bazaar" },
  { value: "+8%", metric: "Conversion", label: "visitors who bought", source: "VLE Bazaar" },
  { value: "+9%", metric: "Sales", label: "sales growth via on-page SEO", source: "Homafy" },
  { value: "~12%", metric: "Checkout", label: "est. lift, customisation to checkout", source: "Mahattaart" },
];

export const experience = [
  {
    icon: "send",
    company: "Mahattaart",
    role: "Growth Marketer",
    period: "Jan 2024 — now",
    highlight: "Meta & Google Ads · funnel tracking in GA4/GTM · A/B tests on Statsig",
    solved: [
      {
        icon: "send",
        title: "Ads with no link to purchases",
        body: "Meta and Google campaigns for custom wallpapers and frames: structure, audience and lookalike targeting, creative tests, retargeting — ROAS and CPA tracked against GA4 conversions.",
      },
      {
        icon: "chart",
        title: "A funnel nobody could see",
        body: "Built the full tracking layer in GA4 and GTM: filters, mockup changes, wall-size input, preview, pricing updates, purchase. Funnel visibility for the first time.",
      },
      {
        icon: "split",
        title: "A drop at the customisation step",
        body: "Found the biggest drop at customisation and quote; tested pricing display, wall-size input and preview flow on Statsig. Estimated 12% lift in customisation-to-checkout.",
      },
    ],
    focus: "ROAS · CPA · add-to-cart and checkout rate",
    caseStudy: "mahattaart-custom-wall-decor",
  },
  {
    icon: "research",
    company: "VLE Bazaar",
    role: "Growth Specialist (Product Catalog)",
    period: "Sep — Dec 2023",
    highlight: "Meta & Google Ads · +11% website traffic · +8% conversion",
    solved: [
      {
        icon: "send",
        title: "Campaigns across Meta and Google",
        body: "Facebook, Instagram, Google Search and Shopping campaigns for the website: keyword and audience targeting, bid and budget management, ROAS tracking.",
      },
      {
        icon: "data",
        title: "Traffic that had to convert",
        body: "Contributed to about 11% website traffic growth and an 8% conversion improvement over the engagement.",
      },
    ],
    focus: "Traffic · conversion rate · ROAS",
  },
  {
    icon: "doc",
    company: "Homafy",
    role: "E-commerce Executive",
    period: "Jan 2022 — Aug 2023",
    highlight: "On-page SEO for product and category pages · +9% sales",
    solved: [
      {
        icon: "research",
        title: "Pages search engines could not find",
        body: "Keyword research, titles and meta descriptions, product content for e-commerce product and category pages.",
      },
      {
        icon: "checklist",
        title: "Indexing and crawling errors",
        body: "Fixed indexing and crawling issues through Google Search Console and sitemaps; contributed to about 9% sales growth.",
      },
    ],
    focus: "Organic traffic · indexed pages · sales",
  },
];

export const credentials = [
  "BBA, GGSIPU (MERI) · CGPA 8.5",
  "Certifications on LinkedIn Learning · Google Ads · Meta Ads · Digital Marketing",
];

// Certifications as listed on the resume and on LinkedIn.
export const certifications = [
  { name: "Advanced Google Ads", issuer: "LinkedIn Learning · 2023" },
  { name: "Meta Ads", issuer: "LinkedIn Learning · 2023" },
  { name: "Marketing on Instagram", issuer: "LinkedIn Learning · 2023" },
  { name: "Digital Marketing Specialist", issuer: "LinkedIn Learning · 2021" },
  { name: "Canva: Web and Digital Design Projects", issuer: "LinkedIn Learning" },
];

// Toolkit, grouped from the resume's core skills. AI tools confirmed by Kunal.
export const toolkit = [
  {
    title: "Paid acquisition",
    icon: "send",
    items: [
      { icon: "send", label: "Meta Ads (Facebook & Instagram)" },
      { icon: "research", label: "Google Search Ads" },
      { icon: "box", label: "Google Shopping Ads" },
      { icon: "roadmap", label: "Retargeting & lookalikes" },
      { icon: "design", label: "Creative & copy testing" },
      { icon: "chart", label: "Bid & budget management" },
    ],
  },
  {
    title: "Conversion (CRO)",
    icon: "strategy",
    items: [
      { icon: "data", label: "Funnel analysis" },
      { icon: "doc", label: "Landing page optimisation" },
      { icon: "split", label: "A/B testing (Statsig)" },
      { icon: "bulb", label: "Hypothesis building" },
      { icon: "support", label: "Retention & repeat purchase" },
    ],
  },
  {
    title: "Analytics & tracking",
    icon: "chart",
    items: [
      { icon: "chart", label: "Google Analytics 4" },
      { icon: "code", label: "GTM & event tracking" },
      { icon: "research", label: "Microsoft Clarity" },
      { icon: "data", label: "Cohort analysis" },
      { icon: "checklist", label: "Google Search Console" },
    ],
  },
  {
    title: "Numbers I report",
    icon: "data",
    items: [
      { icon: "data", label: "ROAS & CPA" },
      { icon: "data", label: "CAC / LTV" },
      { icon: "chart", label: "AOV & conversion rate" },
      { icon: "doc", label: "Excel / Google Sheets" },
    ],
  },
  {
    title: "SEO & content",
    icon: "doc",
    items: [
      { icon: "research", label: "Keyword research" },
      { icon: "doc", label: "On-page SEO" },
      { icon: "checklist", label: "Indexing & sitemaps" },
      { icon: "design", label: "Product content" },
    ],
  },
  {
    title: "AI tools",
    icon: "ai",
    items: [
      { icon: "ai", label: "Claude / ChatGPT for copy & analysis" },
      { icon: "code", label: "Cursor" },
      { icon: "design", label: "Lovable / v0 for landing pages" },
    ],
  },
];

// Set to true to show a "Demo" badge on the homepage cards instead of
// "Hypothetical" (e.g. while swapping in new studies).
export const caseStudiesAreDemo = false;
