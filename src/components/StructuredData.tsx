import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { FAQS } from "./Faq";
import { APP_STORE_URL, PLAY_STORE_URL } from "./StoreButtons";

const ORG_ID = `${SITE_URL}/#organization`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo.svg`,
      sameAs: [APP_STORE_URL, PLAY_STORE_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      "@type": "MobileApplication",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      operatingSystem: "Android, iOS",
      applicationCategory: "EducationalApplication",
      installUrl: [APP_STORE_URL, PLAY_STORE_URL],
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

/** schema.org JSON-LD for the landing page. FAQ text comes from the same source as the visible FAQ. */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
