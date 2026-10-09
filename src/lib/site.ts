import type { Metadata } from "next";

export const SITE_URL = "https://neuroflip.com";
export const SITE_NAME = "Neuroflip";
export const SITE_TITLE = "Neuroflip — Know what to revise first for Medical PG";
export const COMPANY_NAME = "Neuroflip Private Limited";
export const SITE_DESCRIPTION =
  "Neuroflip uses past NEET-PG, INI-CET and FMGE questions to rank 1,619 Medical PG topics and turn them into clear revision milestones.";

/** Metadata for a secondary page. openGraph/twitter are replaced (not merged) per route, so restate the shared fields and images. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
  };
}

export const ORG_ID = `${SITE_URL}/#organization`;
export const BLOG_NAME = "Neuroflip Blog";
export const BLOG_DESCRIPTION =
  "Medical PG revision strategy and study tips for NEET-PG, INI-CET and FMGE, from the Neuroflip team.";
