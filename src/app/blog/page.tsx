import type { Metadata } from "next";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogShell } from "@/components/blog/BlogShell";
import { CategoryChips } from "@/components/blog/CategoryChips";
import { JsonLd } from "@/components/blog/JsonLd";
import { PostCard } from "@/components/blog/PostCard";
import { PostGrid } from "@/components/blog/PostGrid";
import { getActiveCategories, getAllPosts } from "@/lib/blog";
import { BLOG_DESCRIPTION, BLOG_NAME, ORG_ID, SITE_URL, pageMetadata } from "@/lib/site";

const base = pageMetadata("/blog", "Blog | Neuroflip", BLOG_DESCRIPTION);
export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: BLOG_NAME }] } },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <BlogShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          url: `${SITE_URL}/blog`,
          name: BLOG_NAME,
          description: BLOG_DESCRIPTION,
          publisher: { "@id": ORG_ID },
          inLanguage: "en",
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }}
      />
      <BlogHeader kicker="Blog" title="Revise smarter for Medical PG" lead={BLOG_DESCRIPTION} />
      <CategoryChips categories={getActiveCategories()} />
      {posts.length > 0 ? (
        <PostGrid>
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </PostGrid>
      ) : (
        <p className="wrap m-0 pb-20 text-center text-[16px] text-white/80">Posts coming soon.</p>
      )}
    </BlogShell>
  );
}
