import { Download } from "@/components/Download";
import { Faq } from "@/components/Faq";
import { ForYou } from "@/components/ForYou";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Milestones } from "@/components/Milestones";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <a
        className="fixed top-3 left-4 z-[9999] flex min-h-11 [transform:translateY(-160%)] items-center rounded-[10px] bg-white px-4 text-[13px] font-bold text-purple-ink no-underline shadow-[0_8px_20px_rgba(30,18,36,.14)] transition-transform duration-[180ms] ease-[ease] focus-visible:[transform:translateY(0)]"
        href="#main"
      >
        Skip to main content
      </a>
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
    </>
  );
}
