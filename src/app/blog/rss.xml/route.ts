import { CATEGORIES } from "@/content/categories";
import { getAllPosts, lastModified } from "@/lib/blog";
import { BLOG_DESCRIPTION, BLOG_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const rfc822 = (iso: string) => new Date(`${iso}T00:00:00Z`).toUTCString();

export function GET() {
  const posts = getAllPosts();
  const items = posts.map((p) => {
    const url = `${SITE_URL}/blog/${p.slug}`;
    return [
      "    <item>",
      `      <title>${esc(p.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <description>${esc(p.excerpt)}</description>`,
      `      <dc:creator>${esc(p.author)}</dc:creator>`,
      `      <category>${esc(CATEGORIES[p.category].name)}</category>`,
      `      <pubDate>${rfc822(p.date)}</pubDate>`,
      "    </item>",
    ].join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${esc(BLOG_NAME)}</title>`,
    `    <link>${SITE_URL}/blog</link>`,
    `    <description>${esc(BLOG_DESCRIPTION)}</description>`,
    "    <language>en-in</language>",
    `    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>`,
    ...(posts.length ? [`    <lastBuildDate>${rfc822(posts.map(lastModified).sort().at(-1)!)}</lastBuildDate>`] : []),
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
