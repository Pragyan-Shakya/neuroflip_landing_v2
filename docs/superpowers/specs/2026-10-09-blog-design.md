# Blog — Design Spec

Date: 2026-10-09
Status: Approved (pending spec review)

## Goal

Add a simple, SEO-friendly blog to the Neuroflip landing site, authored as MDX files in the repo, styled with the existing landing-page theme.

## Decisions

| Topic | Decision |
|---|---|
| Authoring | MDX files in `src/content/blog/` |
| Tooling | `next-mdx-remote/rsc` + `gray-matter` (2 new deps) |
| Routes | `/blog`, `/blog/category/[slug]`, `/blog/[slug]`, `/blog/rss.xml` |
| Categories | Exactly one per post; defined in `src/content/categories.ts` |
| Author | Plain name string in frontmatter (no author pages/files) |
| Pagination | Client "Load more": 9 initially, +9 per click |
| Related posts | Up to 3 newest in same category, topped up with newest overall |
| Share | X, LinkedIn, Facebook, WhatsApp, copy link (plain share URLs, no 3rd-party scripts) |
| Links to blog | "Blog" link in `SiteNav`; footer keeps only page links (Blog, Privacy Policy, Terms of Use) |
| Seed content | 3 sample posts, 2 categories, `draft: true` |
| Design | Simple; reuse landing tokens and `LegalPage` layout pattern |

## Content model

File: `src/content/blog/<slug>.mdx` — slug = filename.

```yaml
---
title: "…"                     # required
excerpt: "…"                   # required; card text + meta description
date: 2026-10-01               # required, ISO date
updated: 2026-10-05            # optional
category: "exam-strategy"      # required; key in categories.ts
author: "Priya Sharma"         # required; plain name
cover: "/blog/<slug>/cover.jpg"  # required
coverAlt: "…"                  # required
draft: true                    # optional; default false
---
```

`src/content/categories.ts`: `Record<slug, { name: string; description: string }>`.

Validation runs when posts are loaded (i.e. at build): missing required field, invalid date, or unknown category throws an error naming the file and field.

Images: `public/blog/<slug>/`.

## Data layer — `src/lib/blog.ts`

Server-only module.

- `getAllPosts(): PostMeta[]` — parse all `.mdx` frontmatter, validate, sort by `date` desc; exclude drafts when `process.env.NODE_ENV === "production"`.
- `getPost(slug): Post | null` — meta + raw MDX body; `null` if missing or (in production) draft.
- `getPostsByCategory(slug): PostMeta[]`
- `getRelated(post, n = 3): PostMeta[]` — same category newest first (excluding self), then newest overall, deduped.
- `readingTime(body)` — `ceil(words / 200)` minutes, min 1.
- `PostMeta` = frontmatter + `slug` + `readingMinutes`.

## Routes

All statically generated (`generateStaticParams`, `dynamicParams = false`).

- `src/app/blog/page.tsx` — index.
- `src/app/blog/category/[slug]/page.tsx` — same layout filtered; unknown category → `notFound()`.
- `src/app/blog/[slug]/page.tsx` — post; missing/draft → `notFound()`.
- `src/app/blog/rss.xml/route.ts` — RSS 2.0 of non-draft posts (static).

## SEO

- `generateMetadata` per page:
  - Post: title `"<title> | Neuroflip Blog"`, description = excerpt, canonical `/blog/<slug>`, OG `type: "article"` with `publishedTime`, `modifiedTime` (`updated ?? date`), `authors: [author]`, `section` = category name, `images` = cover; Twitter `summary_large_image`.
  - Index: title `"Blog | Neuroflip"`, own description, canonical `/blog`, `alternates.types["application/rss+xml"] = "/blog/rss.xml"`.
  - Category: title `"<Category> | Neuroflip Blog"`, description = category description, canonical `/blog/category/<slug>`.
- JSON-LD (via a `JsonLd` helper alongside `StructuredData.tsx`):
  - Post: `BlogPosting` (headline, description, image, datePublished, dateModified, author `Person{name}`, publisher → existing Organization `@id`, mainEntityOfPage) + `BreadcrumbList` (Home › Blog › Category › Post).
  - Category: `BreadcrumbList` (Home › Blog › Category).
  - Index: `Blog` with `blogPost` list (headline, url, datePublished).
- `src/app/sitemap.ts`: add `/blog`, each category with ≥1 post, each post (`lastModified` = `updated ?? date`). Drafts excluded.
- Crawlability: all post card links rendered in server HTML; Load more only toggles `hidden`.
- Semantics: one `<h1>` per page, `<article>`, `<time dateTime>`, MDX `h2`/`h3` get slug `id`s, `next/image` with required alt, `priority` on post cover.

## UI

Shared shell: `SkipLink` → `SiteNav` → `<main id="main">` → `SiteFooter`, purple page background, existing tokens only.

### Index / category pages
- Header (centred, white): `kicker` "Blog", Fraunces `<h1>` (index: "Revise smarter for Medical PG"; category: category name), one-line lead (white/72).
- `CategoryChips`: row of rounded pills linking to `/blog` ("All") and each category page; active = peach bg / purple-ink text, others = `bg-white/10` white text.
- `PostGrid`: 3 cols; 2 at `max-lg`; 1 at `max-md`.
- `PostCard`: `bg-warm` rounded-2xl, `shadow-hairline`, 16:9 cover, category label (small, uppercase, orange), bold title (purple-ink), 2-line clamped excerpt (muted), meta "Author · date · N min read" (quiet, 13px). Whole card is one link; subtle translate-y lift on hover (disabled under reduced motion).
- "Load more" centred pill button (landing CTA style); hidden when all shown.
- Empty state: "Posts coming soon." in white/80.

### Post page
- Breadcrumb "Blog / Category" (links, white/72) above centred Fraunces `<h1>`, meta line (author · date · reading time).
- Cover: rounded-2xl, max-w 820px, centred.
- Body: `bg-warm` article card (max-w 820px, same padding as `LegalPage`), MDX rendered with `.prose-blog` (unlayered, in `globals.css`): h2/h3, p, ul/ol, links (orange underline), blockquote (lavender left bar), img (rounded), code, hr.
- `ShareButtons` at bottom of card: X, LinkedIn, Facebook, WhatsApp (open in new tab with `rel="noopener noreferrer"`), copy link (shows "Copied" for 2s, `aria-live`).
- "More from the blog": up to 3 `PostCard`s in the same 820px column as the article (3 cols; 2 at ≤980 with the third hidden; 1 at ≤700).
- "← Back to blog" outline pill button at the bottom of the page.

### Nav / footer
- Add "Blog" (`/blog`) to `SiteNav` (desktop + mobile menu). Footer drops the in-page `/#section` links, keeping only Blog, Privacy Policy, Terms of Use. Both are deliberate deviations from the reference.

## Components

| Component | Type | Purpose |
|---|---|---|
| `BlogHeader` | server | kicker + h1 + lead |
| `CategoryChips` | server | category filter links |
| `PostCard` | server | single card |
| `PostGrid` | client | grid + Load more |
| `MdxContent` | server | `MDXRemote` + heading-id components |
| `ShareButtons` | client | share links + copy |
| `JsonLd` | server | `<script type="application/ld+json">` |

## Seed content

3 posts, `draft: true`, across 2 categories (e.g. `exam-strategy`, `study-tips`), with placeholder covers in `public/blog/<slug>/cover.jpg`. Visible in `npm run dev` only. Production shows the empty state until real posts are added.

## Verification

- `npm run lint`, `npm run build` (type-check + static generation).
- Browser check at 1440 / 980 / 700 / 390 / 340: index, category, post, Load more, copy link, mobile menu with Blog link.
- Validate a post's JSON-LD (Rich Results Test structure), check `/sitemap.xml` and `/blog/rss.xml`.
- Confirm landing page unchanged except the added nav/footer link.

## Out of scope

Author pages, tags, search, comments, CMS, numbered pagination, per-post generated OG images.
