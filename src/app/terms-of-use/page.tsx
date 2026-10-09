import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";
import { TERMS_OF_USE } from "@/content/legal";

export const metadata: Metadata = pageMetadata(
  "/terms-of-use",
  "Terms of Use — Neuroflip",
  "Terms for using the Neuroflip app and neuroflip.com, operated by Neuroflip Private Limited.",
);

export default function TermsOfUsePage() {
  return <LegalPage title="Terms of Use" sections={TERMS_OF_USE} />;
}
