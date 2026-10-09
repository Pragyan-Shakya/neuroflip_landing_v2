import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogShell } from "@/components/blog/BlogShell";
import { CategoryChips } from "@/components/blog/CategoryChips";
import { JsonLd } from "@/components/blog/JsonLd";
import { PostCard } from "@/components/blog/PostCard";
import { PostGrid } from "@/components/blog/PostGrid";
import { CATEGORIES, isCategory } from "@/content/categories";
import { getActiveCategories, getPostsByCategory } from "@/lib/blog";
import { SITE_URL, pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getActiveCategories().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategory(slug)) return {};
  const c = CATEGORIES[slug];
  return pageMetadata(`/blog/category/${slug}`, `${c.name} | Neuroflip Blog`, c.description);
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!isCategory(slug)) notFound();
  const posts = getPostsByCategory(slug);
  if (posts.length === 0) notFound();
  const c = CATEGORIES[slug];

  return (
    <BlogShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_URL}/blog/category/${slug}` },
          ],
        }}
      />
      <BlogHeader kicker="Blog" title={c.name} lead={c.description} />
      <CategoryChips categories={getActiveCategories()} current={slug} />
      <PostGrid>
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </PostGrid>
    </BlogShell>
  );
}
