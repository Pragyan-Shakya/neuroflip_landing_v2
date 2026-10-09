# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (Turbopack) on :3000
npm run build    # production build (also type-checks); emits .next/standalone
npm run start    # serve the production build
npm run lint     # ESLint (next/core-web-vitals + typescript)

docker build -t neuroflip-landing . && docker run -p 3000:3000 neuroflip-landing
```

No test suite. Don't run `npm run build` while `npm run dev` is running, because both write to `.next/`.

## What this is

A single-page Next.js 15 (App Router, TypeScript, Tailwind v4) port of `reference/NEUROFLIP_LANDING_FINAL_RELEASE_V58.html`. That static page is the **source of truth** for design, copy and behaviour, and the port is meant to match it pixel for pixel. Don't edit the reference. Deployment: Vercel first, then self-hosted Docker (`output: "standalone"`).

## Architecture

- `src/app/page.tsx` composes the sections in reference order: skip link → `SiteNav` → `<main>` (Hero, HowItWorks, Milestones, ForYou, Testimonials, Download, Faq) → `SiteFooter`. Keep every id/anchor (`#top`, `#how-pyts`, `#milestones`, `#for-you`, `#testimonials`, `#download`, `#faqs`), aria attribute and piece of copy identical to the reference.
- Client components only where there is interactivity: `SiteNav` (mobile menu, Escape to close), `HeroExamRotator` (cycles exam names twice, static under reduced motion), `MilestoneExplorer` (exam tabs + milestone bars + side panel), `Avatar` (falls back to initials if the image fails to load). Everything else is a Server Component.
- SEO: site constants (domain `https://neuroflip.com`, title, description) live in `src/lib/site.ts` and feed `layout.tsx` metadata (canonical, Open Graph, Twitter), `robots.ts`, `sitemap.ts` and `opengraph-image.tsx` (`twitter-image.tsx` reuses it). `StructuredData.tsx` emits JSON-LD: Organization, WebSite, MobileApplication and FAQPage. The FAQPage entries are built from the same `FAQS` array as the visible FAQ, so they can't drift.
- Legal pages: `/privacy-policy` and `/terms-of-use` render `src/content/legal.ts` through `LegalPage.tsx`.
  - The copy is the client's existing wording from neuroflip.com, kept verbatim. Only factual errors were fixed: company name Neuroflip Private Limited, the Pollachi address, info@neuroflip.com, and India instead of Nepal.
  - Don't rewrite the copy without being asked. Source headings are ALL CAPS and are displayed in sentence case via CSS.
- Nav and footer links use `next/link` with `/#section` hrefs so they work from the legal pages too.
- `src/lib/exam-data.ts` holds `EXAM_DATA`, copied verbatim from the reference script. Rows are `[coverage %, total topics, topics added]`.
- Styling lives in `src/app/globals.css`:
  - `@theme` defines the colour tokens, fonts (`--font-manrope`/`--font-fraunces` from `next/font`), `text-section`, `shadow-hairline`, and **custom breakpoints**.
  - Styles are desktop-first, using `max-lg:` (≤980px), `max-md:` (≤700px) and `max-sm:` (≤359px) to mirror the reference's max-width queries. Don't use min-width variants.
  - `wrap` is a custom utility (container width driven by `--gutter`, which changes per breakpoint).
  - Pseudo-element decorations and DOM-state rules (`.bar*`, `.bar-col`, `.pain-card`, `.pyt-stage`, `.faq-item`, `.nav.open`, `.kicker`, `.proof-dot`, `.milestone-summary`) are deliberately **unlayered** CSS. Tailwind v4 utilities beat layered component CSS, but these state overrides must win, as they do in the reference.
- The reference CSS stacks about 15 versions of overrides (V14…V58). Some quirks are intentional and preserved. For example, only the first testimonial card shrinks on mobile, because the reference's `:nth-child` rules out-rank its media query.

## Verifying fidelity

Compare against the reference in a browser at widths around 1440, 980, 700, 390 and 340, including states: exam tab, selected bar, FAQ open, mobile menu open. One effective method: copy the reference to `public/__ref.html` (git-excluded and docker-ignored; don't commit it). Load it and `/` into same-origin iframes of equal width, then diff `getComputedStyle` and `getBoundingClientRect` element by element.
