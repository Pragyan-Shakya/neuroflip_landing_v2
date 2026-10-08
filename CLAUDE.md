# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

There's no app scaffolded yet: no `package.json`, build, lint, or test setup, and no git repo. The only source is `reference/NEUROFLIP_LANDING_FINAL_RELEASE_V58.html`, a self-contained static landing page (about 2,560 lines: inline CSS, inline JS, base64 SVG assets). The directory name suggests the goal is to port this page to Next.js. When that's scaffolded, add the real commands here.

## Reference page architecture

`reference/NEUROFLIP_LANDING_FINAL_RELEASE_V58.html` is the source of truth for design, copy, and behavior. Treat it as read-only.

- **Product**: Neuroflip uses past NEET-PG, INI-CET and FMGE questions to rank 1,619 Medical PG topics into revision milestones (10% → 100% coverage).
- **Layout** (in DOM order): sticky `header.nav#nav` → `.hero` → `#how-pyts` → `#milestones` → `#for-you` → `#testimonials` → `#download` (`.close`) → `#faqs` → `footer`. Nav and footer links point at these anchors.
- **Design tokens**: CSS custom properties on `:root` (lines ~14–23): purple/orange/peach/lavender palette, `--max:1200px`, `--gutter:28px`. Container is `.wrap`.
- **Fonts**: Google Fonts. Manrope (400–700) for body text, Fraunces (opsz, 600) for display text.
- **Inline JS** (from line ~2396):
  - Hero exam rotator (`#heroExamRotator`): cycles `NEET-PG.` → `INI-CET.` → `FMGE.` twice, then stops. With `prefers-reduced-motion` it shows static text instead.
  - `EXAM_DATA` (keys `NEET_PG`, `INI_CET`, `FMGE`): each key has 10 milestone `rows` `[pct, cumulative topics, new topics]` plus matching `copy`. Port this data verbatim. `renderExam(mode)` draws the milestone bar chart (`#curve`) and the side panel (`#side*` ids) for the tab chosen in `.terrain-tabs` (`aria-pressed` state).
- **Accessibility details to keep**: skip link (`.skip`), `:focus-visible` outline, `aria-label`s on nav, reduced-motion handling, `translate="no"` on the brand name.
- **Copy constraint**: the footer disclaimer says past questions set revision priority but don't predict the next paper. Keep that framing in any copy changes.
