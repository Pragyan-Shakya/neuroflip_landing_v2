/** Blog categories. A post's `category` frontmatter must be one of these keys. */
export const CATEGORIES = {
  "exam-strategy": {
    name: "Exam strategy",
    description: "How to plan Medical PG revision around what past NEET-PG, INI-CET and FMGE papers actually test.",
  },
  "study-tips": {
    name: "Study tips",
    description: "Practical habits for revising faster and remembering more during Medical PG preparation.",
  },
} as const satisfies Record<string, { name: string; description: string }>;

export type CategorySlug = keyof typeof CATEGORIES;

export const isCategory = (s: string): s is CategorySlug => Object.prototype.hasOwnProperty.call(CATEGORIES, s);
