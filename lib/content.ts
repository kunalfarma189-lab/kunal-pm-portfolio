// ------------------------------------------------------------------
// SITE CONTENT — everything editable lives in this one file.
// Lines marked TODO are placeholders: replace them before sharing
// the site publicly. No secrets belong in this file — it gets
// committed to GitHub.
// ------------------------------------------------------------------

export const profile = {
  name: "Kunal Farma",
  role: "Product Manager",
  focus: "E-commerce & Payments",
  tagline:
    "I work on online shopping flows for Indian customers — small changes in the flow, honest metrics, and AI-assisted speed.",
  // TODO: replace with your real email and LinkedIn URL before sharing
  email: "your.email@example.com",
  linkedin: "https://www.linkedin.com/in/your-handle",
  github: "https://github.com/kunalfarma189-lab",
};

// TODO: add real date ranges, e.g. period: "Jan 2024 — Present"
export const experience = [
  {
    company: "VLE Bazaar",
    role: "Product & Operations — D2C E-commerce",
    period: "",
    points: [
      "Owned a rule-based pricing flow used across the product catalog",
      "Improved product discovery end-to-end — from listing quality to findability",
      "Worked directly with sellers and the operations team to close workflow gaps",
    ],
  },
  {
    company: "Self-directed PM specialization",
    role: "E-commerce & Payments",
    period: "",
    points: [
      "Built and worked through a 315-lesson PM curriculum — strategy, SQL, and JIRA",
      "Payments deep-dive: UPI flows, fraud and risk basics, and unit economics",
    ],
  },
];

// HYPOTHETICAL case studies — thinking exercises, NOT real client work.
// The site labels them "Hypothetical case study" wherever they appear,
// in the section intro and in the footer disclaimer. Keep it that way.
export const caseStudies = [
  {
    company: "Amazon",
    title: "Cutting cart drop-off for tier-2 shoppers",
    problem:
      "Shoppers add items to the cart but leave before paying. The exercise: map the drop-off points, rank the likely causes — payment failures, cash-on-delivery trust, address entry friction — and decide what to measure first.",
    outcome:
      "A prioritized experiment list plus a metrics framework: cart-to-order conversion, payment success rate, and time to first order.",
    tags: ["Conversion", "Payments", "Metrics"],
    hypothetical: true,
  },
  {
    company: "Flipkart",
    title: "Reducing RTO losses on cash-on-delivery orders",
    problem:
      "Cash-on-delivery orders refused at the door (return to origin) eat into margins. The exercise: find signals of low purchase intent and design confirmation steps that do not add friction for genuine buyers.",
    outcome:
      "A flow concept with address quality checks, delivery-slot confirmation, and light intent nudges — with RTO rate and order completion rate as north-star metrics.",
    tags: ["COD", "Unit economics", "Operations"],
    hypothetical: true,
  },
  {
    company: "Myntra",
    title: "Fewer returns through better size and fit guidance",
    problem:
      "Fashion returns are driven by wrong sizes. The exercise: redesign size selection so customers pick the right size the first time, without making the product page feel heavy.",
    outcome:
      "A size-recommendation experience plus a returns-friendly exchange flow, judged on return rate and repeat purchase rate.",
    tags: ["Returns", "UX", "Personalization"],
    hypothetical: true,
  },
];

export const aiProjects = [
  {
    title: "This portfolio",
    description:
      "Designed and shipped with AI-assisted development — Next.js, TypeScript, and Tailwind, deployed on Render. Built in days, not weeks.",
    tags: ["Next.js", "TypeScript", "AI-assisted"],
    status: "Live",
  },
  {
    title: "Full-stack product prototypes",
    description:
      "Working drafts of product ideas built end-to-end with AI pair-programming — from data model to working UI. I use them to think with my hands.",
    tags: ["Prototyping", "Vibe coding"],
    status: "Ongoing",
  },
  {
    title: "PM curriculum builder",
    description:
      "A 315-lesson interactive product management curriculum in Hinglish — SQL, JIRA, UPI payments, and fraud basics — built for my own e-commerce and payments specialization.",
    tags: ["Curriculum", "Interactive", "Hinglish"],
    status: "Ongoing",
  },
];
