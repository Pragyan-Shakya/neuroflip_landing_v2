import type { MetadataRoute } from "next";
import { getActiveCategories, getAllPosts, lastModified } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static route: lastModified is the build time unless a post date is known.
  const now = new Date();
  const posts = getAllPosts();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: posts[0] ? lastModified(posts[0]) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...getActiveCategories().map((c) => ({
      url: `${SITE_URL}/blog/category/${c}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: lastModified(p),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-of-use`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
