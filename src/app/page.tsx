import { Download } from "@/components/Download";
import { Faq } from "@/components/Faq";
import { ForYou } from "@/components/ForYou";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Milestones } from "@/components/Milestones";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SkipLink } from "@/components/SkipLink";
import { StructuredData } from "@/components/StructuredData";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <SkipLink />
      <SiteNav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Milestones />
        <ForYou />
        <Testimonials />
        <Download />
        <Faq />
      </main>
      <SiteFooter />
      <StructuredData />
    </>
  );
}
