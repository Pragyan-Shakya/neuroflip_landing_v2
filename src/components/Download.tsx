import { StoreButtons } from "./StoreButtons";

export function Download() {
  return (
    <section className="pt-11 pb-[52px] max-md:pt-8 max-md:pb-11" id="download">
      <div className="wrap">
        <div className="relative grid grid-cols-[minmax(0,1.2fr)_minmax(330px,.8fr)] items-center gap-11 overflow-hidden rounded-2xl border border-[#E7D8CC] bg-warm p-8 text-purple-ink shadow-hairline max-lg:grid-cols-1 max-md:gap-6 max-md:px-5 max-md:py-6">
          <div className="relative z-1 min-w-0">
            <h2 className="mt-0 mb-4 max-w-[720px] text-[clamp(34px,3.7vw,48px)] leading-[1.06] font-bold tracking-[-.035em] text-balance text-purple-ink max-md:text-[32px] max-md:leading-[1.08]">
              Used by 93K+ registered students.
            </h2>
            <p className="m-0 max-w-[660px] text-[16px] leading-[1.65] text-pretty text-[#665C58] max-md:text-[15px]">
              Start with one clear target, not the whole syllabus. NeuroFlip uses past questions to build 10 milestones, so
              you know what to revise next.
            </p>
          </div>

          <div className="relative z-1 flex min-w-0 flex-col items-stretch gap-3 max-md:gap-2.5">
            <div className="text-[19px] leading-[1.3] font-bold tracking-[-.02em] text-purple-ink">Start Milestone 1</div>
            <div className="mt-1.5 max-w-[34ch] text-[13px] leading-[1.55] text-[#6D626B] max-lg:max-w-none">
              Download NeuroFlip and start with your first set of topics.
            </div>
            <div
              className="relative z-2 mt-4 grid grid-cols-2 items-center gap-2.5 max-md:grid-cols-1 max-md:items-stretch"
              aria-label="Download Neuroflip"
            >
              <StoreButtons variant="close" />
            </div>
            <div className="mt-2.5 text-[11px] leading-[1.4] text-[#6D626B]">Available on iOS and Android.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
