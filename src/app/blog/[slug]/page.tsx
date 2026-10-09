import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogShell } from "@/components/blog/BlogShell";
import { JsonLd } from "@/components/blog/JsonLd";
import { MdxContent } from "@/components/blog/MdxContent";
import { PostCard } from "@/components/blog/PostCard";
import { PostMetaLine } from "@/components/blog/PostMetaLine";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { CATEGORIES } from "@/content/categories";
import { getAllPosts, getPost, getRelated, lastModified, shareImage } from "@/lib/blog";
import { ORG_ID, SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  const title = `${post.title} | Neuroflip Blog`;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: path },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description: post.excerpt,
      publishedTime: post.date,
      modifiedTime: lastModified(post),
      authors: [post.author],
      section: CATEGORIES[post.category].name,
      images: [shareImage(post)],
    },
    twitter: { card: "summary_large_image", title, description: post.excerpt, images: [shareImage(post).url] },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const category = CATEGORIES[post.category];
  const related = getRelated(post);

  return (
    <BlogShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              image: new URL(shareImage(post).url, SITE_URL).href,
              datePublished: post.date,
              dateModified: lastModified(post),
              author: { "@type": "Person", name: post.author },
              publisher: { "@id": ORG_ID },
              articleSection: category.name,
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
              url,
              inLanguage: "en",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
                { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/blog/category/${post.category}` },
                { "@type": "ListItem", position: 4, name: post.title, item: url },
              ],
            },
          ],
        }}
      />
      <article>
        <header className="wrap pt-14 pb-8 text-center text-white max-md:pt-10 max-md:pb-6">
          <nav aria-label="Breadcrumb" className="text-[13px] font-bold text-white/72">
            <ol role="list" className="m-0 inline-flex list-none flex-wrap justify-center gap-2 p-0">
              <li>
                <Link href="/blog" className="no-underline hover:text-white">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/blog/category/${post.category}`} className="no-underline hover:text-white">
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="mx-auto mt-4 mb-4 max-w-[900px] font-display text-[clamp(36px,4.2vw,52px)] leading-[1.08] font-semibold tracking-[-.02em] text-balance max-md:text-[32px]">
            {post.title}
          </h1>
          <PostMetaLine {...post} className="justify-center text-[14px] text-white/72" />
        </header>

        <div className="wrap pb-14 max-md:pb-10">
          <div className="relative mx-auto mb-8 aspect-[16/9] w-full max-w-[820px] overflow-hidden rounded-2xl bg-lav max-md:mb-6">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 820px"
              unoptimized={post.cover.endsWith(".svg")}
              className="object-cover"
            />
          </div>
          <div className="mx-auto w-full max-w-[820px] rounded-2xl border border-[#E7D8CC] bg-warm px-11 py-10 shadow-hairline max-md:px-5 max-md:py-7">
            <MdxContent source={post.body} />
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="wrap pb-12 max-md:pb-8">
          {/* Same 820px column as the article above. */}
          <div className="mx-auto w-full max-w-[820px]">
            <h2
              id="related-heading"
              className="m-0 mb-6 text-[28px] leading-[1.15] font-bold tracking-[-.02em] text-white max-md:mb-5 max-md:text-[24px]"
            >
              More from the blog
            </h2>
            <ul role="list" className="m-0 grid list-none grid-cols-3 gap-5 p-0 max-lg:grid-cols-2 max-md:grid-cols-1">
              {related.map((p, i) => (
                // Two columns at tablet width: drop the third card rather than leave it alone on a row.
                <li key={p.slug} className={i === 2 ? "max-lg:hidden max-md:block" : undefined}>
                  <PostCard post={p} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="wrap flex justify-center pb-16 max-md:pb-10">
        <Link
          href="/blog"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-[14px] font-bold text-white no-underline transition-colors duration-[180ms] hover:border-white hover:bg-white/10 max-md:w-full"
        >
          <span aria-hidden="true">←</span> Back to blog
        </Link>
      </div>
    </BlogShell>
  );
}
