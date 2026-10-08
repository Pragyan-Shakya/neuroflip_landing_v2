import { Avatar } from "./Avatar";
import { HeroExamRotator } from "./HeroExamRotator";
import { StoreButtons } from "./StoreButtons";

function Sparkle() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-[15px] flex-none max-sm:size-3">
      <path
        d="M10 1.7c.7 4.8 3.5 7.6 8.3 8.3-4.8.7-7.6 3.5-8.3 8.3-.7-4.8-3.5-7.6-8.3-8.3C6.5 9.3 9.3 6.5 10 1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

const PROOF_AVATARS = [
  { src: "/testimonials/1.jpeg", initials: "AA" },
  { src: "/testimonials/2.jpeg", initials: "PG" },
  { src: "/testimonials/3.jpeg", initials: "GK" },
];

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-purple text-white" id="top">
      <section className="relative z-2 pt-[86px] pb-[92px] max-lg:pt-16 max-md:pt-[54px] max-md:pb-[52px]">
        <div className="wrap block">
          <div className="relative mx-auto max-w-[980px] text-center">
            <div
              className="inline-flex min-h-10 items-center justify-center gap-[9px] rounded-full border border-[rgba(255,212,150,.82)] bg-[rgba(255,214,166,.045)] px-4 text-[13px] leading-none font-bold tracking-[-0.01em] whitespace-nowrap text-[#FFD7A6] shadow-[inset_0_0_0_1px_rgba(255,255,255,.04)] max-md:min-h-[38px] max-md:px-3.5 max-md:text-[12px] max-sm:min-h-9 max-sm:gap-1.5 max-sm:px-2.5 max-sm:text-[10.5px]"
              aria-label="Evidence-led revision for Medical PG"
            >
              <Sparkle />
              <span>Evidence-led revision for Medical PG</span>
              <Sparkle />
            </div>
            <h1
              className="mx-auto mt-[26px] mb-[22px] max-w-[920px] font-display text-[clamp(48px,4.6vw,64px)] leading-[1.04] font-semibold tracking-[-.02em] text-balance [font-optical-sizing:auto] max-md:mt-5 max-md:mb-[18px] max-md:max-w-[14ch] max-md:text-[clamp(38px,10.2vw,48px)] max-md:leading-[1.06] max-md:tracking-[-.018em] max-sm:text-[36px]"
              aria-label="Not every topic matters equally in NEET-PG, INI-CET and FMGE."
            >
              Not every topic matters equally in <HeroExamRotator />
            </h1>
            <p className="mx-auto my-0 max-w-[68ch] text-[18px] leading-[1.65] text-pretty text-white/82 max-md:text-[16px]">
              Past questions show a clear pattern: some topics are tested far more often than others. NeuroFlip ranks
              them by what each exam has actually tested, so you know where to start.
            </p>
            <div className="mt-[30px] flex flex-wrap items-center justify-center gap-2.5" aria-label="Download Neuroflip">
              <StoreButtons variant="hero" />
            </div>
            {/* First-party social-proof snapshot: 93,674 registered students, verified 2026-10-06. Display intentionally rounded to 93K+. */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center text-[15px] leading-[1.35] font-bold text-white/88 max-md:gap-2.5 max-md:text-[14px]">
              <div className="flex items-center pl-2.5" aria-hidden="true">
                {PROOF_AVATARS.map((a, i) => (
                  <Avatar
                    key={a.src}
                    src={a.src}
                    alt=""
                    initials={a.initials}
                    size={36}
                    wrapperClassName={`relative grid size-9 place-items-center rounded-full text-[#FFD9C3] max-md:size-8 ${i === 0 ? "ml-0" : "-ml-2.5"}`}
                    imageClassName="block size-9 rounded-full border-2 border-white/68 bg-[#E9E0ED] object-cover text-transparent shadow-[0_7px_16px_rgba(30,18,36,.16)] [grid-area:1/1]"
                    fallbackClassName="grid size-9 place-items-center rounded-full border-2 border-[rgba(99,74,114,.55)] bg-[#F3E8F7] text-[10px] font-bold text-purple shadow-[0_8px_18px_rgba(30,18,36,.18)] [grid-area:1/1] max-md:size-8"
                  />
                ))}
              </div>
              <div>
                Used by <span className="text-[#FFD9C3]">93K+ registered students</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
