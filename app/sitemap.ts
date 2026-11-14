import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";

const base = "https://kunal-pm-portfolio.vercel.app";

// Every page, with the homepage first so crawlers rank it as the entry.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((cs) => ({
      url: `${base}/case-studies/${cs.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: cs.kind === "work" ? 0.7 : 0.5,
    })),
  ];
}
