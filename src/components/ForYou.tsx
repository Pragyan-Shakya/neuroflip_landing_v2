const PILLS = ["Syllabus feels too big", "Too many “high-yield” lists", "Not sure what to revise next"];

const PAINS = [
  "You’re worried you won’t finish the syllabus in time.",
  "Different “high-yield” lists tell you different things.",
  "Your GT scores are low or stuck.",
  "You sit down to revise but still don’t know where to start.",
  "Everything feels important, so your revision list keeps growing.",
  "You spend more time planning than revising.",
  "You’ve studied a lot, but you still forget what you learned.",
  "The exam is close, and you need a plan you can actually finish.",
];

export function ForYou() {
  return (
    <section className="py-11 max-md:py-8" id="for-you">
      <div className="wrap overflow-hidden rounded-2xl border border-white/14 bg-white/7 p-11 shadow-[0_18px_44px_rgba(34,20,40,.06)] max-md:px-5 max-md:py-6 max-sm:px-4">
        {/* Unstyled wrapper kept for structural parity with the reference (.for-you-shell). */}
        <div>
          <div className="grid grid-cols-[.66fr_1.34fr] items-start gap-6 max-lg:grid-cols-1 max-md:gap-5">
            <div className="sticky top-[112px] max-lg:static">
              <div className="rounded-2xl border border-[#E8D8CB] bg-[#F6EFE7] p-6 shadow-hairline max-md:p-5">
                <h2 className="mt-3.5 mb-0 max-w-[7.5ch] text-section leading-[1.08] font-bold tracking-[-.03em] text-balance text-purple-ink max-lg:max-w-[12ch] max-md:text-[30px] max-md:leading-[1.12] max-md:tracking-[-.025em]">
                  Use NeuroFlip if…
                </h2>
                <p className="mt-4 mb-0 max-w-[38ch] text-[16px] leading-[1.65] text-pretty text-[#6C5E59] max-md:text-[15px]">
                  You know you need to revise, but you are not sure what to do first. NeuroFlip turns a huge syllabus into a
                  clear next step.
                </p>
                <div className="mt-6 flex! flex-wrap gap-2.5 max-md:mt-[22px] max-md:gap-2">
                  {PILLS.map((p) => (
                    <span
                      key={p}
                      className="inline-flex min-h-[34px] items-center rounded-full border border-[#E5D6C8] bg-[#F8F2EC] px-3 text-[12px] leading-none font-bold whitespace-nowrap text-[#6A5A55] shadow-[inset_0_1px_0_rgba(255,255,255,.75)] max-md:text-[11px]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-3 max-md:grid-cols-1">
              {PAINS.map((text) => (
                <article
                  key={text}
                  className="pain-card relative flex min-h-24 items-center rounded-2xl border border-white/12 bg-[rgba(255,255,255,.075)] p-5 transition-[transform,border-color,background-color,box-shadow] duration-[180ms] ease-[ease] hover:[transform:translateY(-2px)] hover:border-white/18 hover:bg-white/10 max-md:min-h-[84px] max-md:p-4"
                >
                  <h3 className="m-0 pl-6 text-[17px] leading-[1.28] font-bold tracking-[-.025em] text-balance text-white max-md:text-[16px] max-md:leading-[1.32]">
                    {text}
                  </h3>
                </article>
              ))}

              <div className="col-span-full mt-1 flex items-center justify-between gap-5 rounded-2xl border border-white/42 bg-white p-5 shadow-hairline max-md:flex-col max-md:items-stretch max-md:px-4 max-md:py-[18px]">
                <div>
                  <strong className="block text-[18px] leading-[1.3] tracking-[-.02em] text-purple-ink">Sound familiar?</strong>
                  <span className="mt-[5px] block max-w-[42ch] text-[13px] leading-[1.55] text-muted">
                    Start with Milestone 1 instead of restarting the whole syllabus.
                  </span>
                </div>
                <a
                  href="#download"
                  className="inline-flex min-h-12 flex-none items-center justify-center rounded-full bg-orange px-5 text-[14px] font-bold text-purple-ink no-underline shadow-hairline hover:[transform:translateY(-1px)] hover:shadow-[0_14px_24px_rgba(235,129,78,.26)] max-md:w-full"
                >
                  Start Milestone 1
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
