import { certifications, experience, profile } from "@/lib/content";

/*
 * Structured data (schema.org JSON-LD) so Google understands who the page
 * is about: a Person with a job title, location, employer, skills and
 * profile links, and the site as a ProfilePage for that person. This is
 * what lets a search for the name show a knowledge card and lets the
 * "Growth Marketer · New Delhi" facts count for ranking.
 */

const base = "https://kunal-farma.vercel.app";

export default function StructuredData() {
  const person = {
    "@type": "Person",
    "@id": `${base}/#person`,
    name: profile.name,
    jobTitle: profile.headline,
    description:
      "Growth Marketer with 4+ years in e-commerce: Meta Ads, Google Ads, conversion rate optimisation and GA4 analytics.",
    url: base,
    image: `${base}${profile.portrait}`,
    email: `mailto:${profile.email}`,
    telephone: profile.phoneHref.replace("tel:", ""),
    address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
    worksFor: { "@type": "Organization", name: experience[0].company },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Guru Gobind Singh Indraprastha University" },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: [
      "Growth marketing",
      "Performance marketing",
      "Meta Ads",
      "Facebook Ads",
      "Instagram Ads",
      "Google Ads",
      "Google Shopping Ads",
      "Conversion rate optimisation",
      "Funnel analysis",
      "Landing page optimisation",
      "Google Analytics 4",
      "Google Tag Manager",
      "Microsoft Clarity",
      "A/B testing",
      "Statsig",
      "ROAS",
      "CAC and LTV",
      "E-commerce marketing",
      "SEO",
    ],
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certificate",
    })),
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "ProfilePage",
        "@id": `${base}/#page`,
        url: base,
        name: `${profile.name} — ${profile.headline}`,
        mainEntity: { "@id": `${base}/#person` },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#site`,
        url: base,
        name: profile.name,
        publisher: { "@id": `${base}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; "<" is escaped so a
      // string can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
