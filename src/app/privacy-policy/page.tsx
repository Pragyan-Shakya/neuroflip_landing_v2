import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";
import { PRIVACY_POLICY } from "@/content/legal";

export const metadata: Metadata = pageMetadata(
  "/privacy-policy",
  "Privacy Policy — Neuroflip",
  "How Neuroflip Private Limited collects, uses and protects your personal information.",
);

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" sections={PRIVACY_POLICY} />;
}
