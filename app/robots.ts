import type { MetadataRoute } from "next";

// Let every search engine crawl the whole site and find the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kunal-farma.vercel.app/sitemap.xml",
  };
}
