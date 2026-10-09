export const SITE_URL = "https://neuroflip.com";
export const SITE_NAME = "Neuroflip";
export const SITE_TITLE = "Neuroflip — Know what to revise first for Medical PG";
export const COMPANY_NAME = "Neuroflip Private Limited";
export const SITE_DESCRIPTION =
  "Neuroflip uses past NEET-PG, INI-CET and FMGE questions to rank 1,619 Medical PG topics and turn them into clear revision milestones.";

/** Metadata for a secondary page. openGraph is replaced (not merged) per route, so restate the shared fields. */
export function pageMetadata(path: string, title: string, description: string) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website" as const, url: path, siteName: SITE_NAME, locale: "en_IN", title, description },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}
