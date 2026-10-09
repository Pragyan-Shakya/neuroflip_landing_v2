import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { CATEGORIES, isCategory, type CategorySlug } from "@/content/categories";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");
const WORDS_PER_MINUTE = 200;

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  updated?: string;
  category: CategorySlug;
  author: string;
  cover: string;
  coverAlt: string;
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { body: string };

function fail(file: string, field: string, problem: string): never {
  throw new Error(`[blog] ${file}: "${field}" ${problem}`);
}

function requireString(data: Record<string, unknown>, file: string, field: string): string {
  const v = data[field];
  if (typeof v !== "string" || !v.trim()) fail(file, field, "is required and must be a non-empty string");
  return v.trim();
}

/** gray-matter turns unquoted YAML dates into Date objects; accept both and normalise to YYYY-MM-DD. */
function toIsoDate(v: unknown, file: string, field: string): string {
  const s = v instanceof Date && !Number.isNaN(v.getTime()) ? v.toISOString().slice(0, 10) : v;
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s) || Number.isNaN(Date.parse(s))) {
    fail(file, field, "must be a valid date (YYYY-MM-DD)");
  }
  return s;
}

export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function parse(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
  const category = requireString(data, file, "category");
  if (!isCategory(category)) fail(file, "category", `"${category}" is not in src/content/categories.ts`);
  if (data.draft !== undefined && typeof data.draft !== "boolean") fail(file, "draft", "must be true or false");
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: requireString(data, file, "title"),
    excerpt: requireString(data, file, "excerpt"),
    date: toIsoDate(data.date, file, "date"),
    updated: data.updated === undefined ? undefined : toIsoDate(data.updated, file, "updated"),
    category,
    author: requireString(data, file, "author"),
    cover: requireString(data, file, "cover"),
    coverAlt: requireString(data, file, "coverAlt"),
    draft: data.draft === true,
    readingMinutes: readingTime(content),
    body: content,
  };
}

const showDrafts = process.env.NODE_ENV !== "production";

const loadPosts = cache((): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- strip the body
const toMeta = ({ body, ...meta }: Post): PostMeta => meta;

/** Published posts, newest first (drafts included only outside production). */
export function getAllPosts(): PostMeta[] {
  return loadPosts().map(toMeta);
}

export function getPost(slug: string): Post | null {
  return loadPosts().find((p) => p.slug === slug) ?? null;
}

export function getPostsByCategory(category: CategorySlug): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

/** Categories that have at least one visible post, in categories.ts order. */
export function getActiveCategories(): CategorySlug[] {
  const used = new Set(getAllPosts().map((p) => p.category));
  return (Object.keys(CATEGORIES) as CategorySlug[]).filter((c) => used.has(c));
}

/** Up to `n` posts: newest in the same category first, then newest overall. */
export function getRelated(post: PostMeta, n = 3): PostMeta[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, n);
}

export const lastModified = (p: PostMeta) => p.updated ?? p.date;

/** Social/JSON-LD image: the cover, unless it's an SVG (unsupported by share previews), then the site OG image. */
export function shareImage(p: PostMeta): { url: string; alt: string; width?: number; height?: number } {
  return p.cover.toLowerCase().endsWith(".svg")
    ? { url: "/opengraph-image", alt: p.coverAlt, width: 1200, height: 630 }
    : { url: p.cover, alt: p.coverAlt };
}
