import Image from "next/image";

const LINKS = [
  { href: "#milestones", label: "Milestones" },
  { href: "#for-you", label: "Why NeuroFlip" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faqs", label: "FAQs" },
];

export function SiteFooter() {
  return (
    <footer className="pt-8 pb-11 max-md:pb-10">
      <div className="wrap flex items-center justify-between gap-6 max-md:flex-col max-md:items-start">
        <div className="flex items-center gap-2.5 font-bold text-white">
          <Image src="/brand/logo.svg" width={23} height={29} alt="" className="h-[29px] w-[23px] object-contain" />
          <span translate="no">Neuroflip</span>
        </div>
        <div className="flex flex-wrap gap-5 text-[12px] text-white/78">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="no-underline">
              {l.label}
            </a>
          ))}
        </div>
        <div className="max-w-[520px] text-right text-[11px] leading-[1.55] text-white/74 max-md:text-left">
          Past exam questions help set revision priority. They do not predict the next paper or replace full-syllabus
          study.
        </div>
      </div>
    </footer>
  );
}
