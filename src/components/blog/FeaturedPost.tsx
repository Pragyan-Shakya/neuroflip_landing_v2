import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/content/categories";
import type { PostMeta } from "@/lib/blog";
import { PostMetaLine } from "./PostMetaLine";

/** Hero card for the featured post on /blog: cover left, text right; stacks at ≤700px. */
export function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <div className="wrap mb-8 max-md:mb-6">
      <article className="relative grid grid-cols-[1.15fr_1fr] overflow-hidden rounded-2xl border border-[#E7D8CC] bg-warm shadow-hairline transition-[transform,box-shadow] duration-[180ms] ease-[ease] hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(30,18,36,.22)] has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-peach-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-md:grid-cols-1">
        <div className="relative min-h-[320px] bg-lav max-lg:min-h-[260px] max-md:aspect-[16/9] max-md:min-h-0">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            priority
            sizes="(max-width: 700px) 100vw, 640px"
            unoptimized={post.cover.endsWith(".svg")}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-10 py-9 max-lg:px-7 max-lg:py-7 max-md:px-5 max-md:py-6">
          <div className="mb-3 flex flex-wrap items-center gap-2.5 text-[11px] font-bold tracking-[.08em] uppercase">
            <span className="rounded-full bg-orange px-2.5 py-1 text-purple-ink">Featured</span>
            <span className="text-[#A94E24]">{CATEGORIES[post.category].name}</span>
          </div>
          <h2 className="m-0 mb-3 font-display text-[clamp(26px,2.6vw,34px)] leading-[1.15] font-semibold tracking-[-.02em] text-balance text-purple-ink max-md:text-[24px]">
            <Link href={`/blog/${post.slug}`} className="no-underline outline-none after:absolute after:inset-0 after:content-['']">
              {post.title}
            </Link>
          </h2>
          <p className="m-0 mb-5 line-clamp-3 text-[15px] leading-[1.65] text-muted">{post.excerpt}</p>
          <PostMetaLine {...post} className="text-[13px] text-quiet" />
        </div>
      </article>
    </div>
  );
}
