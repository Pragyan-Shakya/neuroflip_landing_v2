import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/content/categories";
import type { PostMeta } from "@/lib/blog";
import { PostMetaLine } from "./PostMetaLine";

export function PostCard({ post, headingLevel: H = "h2" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="relative flex has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-peach-soft h-full flex-col overflow-hidden rounded-2xl border border-[#E7D8CC] bg-warm shadow-hairline transition-[transform,box-shadow] duration-[180ms] ease-[ease] hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(30,18,36,.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[16/9] bg-lav">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 384px"
          unoptimized={post.cover.endsWith(".svg")}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 pt-5 pb-6 max-md:px-5">
        <div className="mb-2 text-[11px] font-bold tracking-[.08em] text-[#A94E24] uppercase">
          {CATEGORIES[post.category].name}
        </div>
        <H className="m-0 mb-2 text-[19px] leading-[1.3] font-bold tracking-[-.015em] text-purple-ink text-balance">
          <Link href={`/blog/${post.slug}`} className="no-underline outline-none after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </H>
        <p className="m-0 mb-4 line-clamp-2 text-[14px] leading-[1.6] text-muted">{post.excerpt}</p>
        <PostMetaLine {...post} className="mt-auto text-[12.5px] text-quiet" />
      </div>
    </article>
  );
}
