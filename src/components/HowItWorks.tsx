import { SectionHead } from "./SectionHead";

const stage =
  "pyt-stage relative flex min-h-[286px] min-w-0 flex-col rounded-2xl border border-white/34 p-6 text-purple-ink shadow-[0_12px_30px_rgba(34,20,40,.06)] max-lg:min-h-0 max-md:p-5";
const step =
  "mb-5 inline-flex min-h-7 w-max items-center rounded-[44px] px-2.5 text-[10px] font-bold tracking-[.08em] uppercase";
const metric = "mb-3 text-[48px] leading-[.94] font-bold tracking-[-.04em] tabular-nums max-md:text-[38px]";
const title =
  "m-0 mb-[9px] text-[21px] leading-[1.18] font-bold tracking-[-.03em] text-balance text-purple-ink max-md:text-[19px] max-md:leading-[1.25]";
const body = "m-0 max-w-[31ch] text-[14px] leading-[1.6] text-muted max-lg:max-w-none";
const breakdown = "mt-auto border-t border-line pt-4 text-[11px] leading-[1.5] font-bold text-purple";
const landmark = "text-[11px] leading-[1.4] font-bold whitespace-nowrap text-purple";

export function HowItWorks() {
  return (
    <section className="py-11 max-md:py-8" id="how-pyts">
      <div className="wrap overflow-visible rounded-2xl border border-white/14 bg-white/7 p-11 shadow-[0_18px_44px_rgba(34,20,40,.06)] max-md:px-5 max-md:py-6 max-sm:px-4">
        <SectionHead
          title="How NeuroFlip decides what you should revise first."
          lead="We map past exam questions to 1,619 topics, rank those topics for each exam, and turn that order into 10 clear revision milestones."
        />
        <div
          className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-4 overflow-visible max-lg:grid-cols-1"
          aria-label="How Neuroflip decides Previous Year Topics"
        >
          <article className={`${stage} bg-[rgba(255,247,241,.95)]`}>
            <div className={`${step} bg-[rgba(235,129,78,.10)] text-[#A94E24]`}>Step 01 · Map</div>
            <div className={`${metric} text-orange`}>15,443</div>
            <h3 className={title}>Past-question records mapped</h3>
            <p className={body}>Each record is linked to one of 1,619 topics.</p>
            <div className={breakdown}>4,143 NEET-PG · 4,715 INI-CET · 6,585 FMGE</div>
          </article>
          <article className={`${stage} bg-white/93`}>
            <div className={`${step} bg-[rgba(99,74,114,.08)] text-purple`}>Step 02 · Rank</div>
            <div className={`${metric} text-purple`}>1,619</div>
            <h3 className={title}>Topics ranked</h3>
            <p className={body}>Topics with more support from past questions come first.</p>
            <div className={breakdown}>Helps you prioritize. Does not predict the next exam.</div>
          </article>
          <article className={`${stage} bg-[rgba(248,244,250,.95)]`}>
            <div className={`${step} bg-[rgba(99,74,114,.08)] text-purple`}>Step 03 · Milestones</div>
            <div className={`${metric} text-purple`}>10</div>
            <h3 className={title}>Ranked topics become 10 milestones</h3>
            <p className={body}>
              Each milestone adds another 10% of what past questions have tested. For NEET-PG, M7 has 452 topics and
              M10 has all 1,162 topics found in the current past-question data.
            </p>
            <div
              className={`${breakdown} milestone-summary flex flex-wrap items-center gap-x-3.5 gap-y-2 max-md:gap-x-2.5 max-md:gap-y-[7px]`}
              aria-label="Exam coverage landmarks"
            >
              <span className="text-[10px] font-bold tracking-[.07em] text-quiet uppercase">Past-question coverage</span>
              <strong className={landmark}>M1 · 10%</strong>
              <strong className={`${landmark} relative`}>M5 · Halfway</strong>
              <strong className={`${landmark} relative`}>M10 · 100%</strong>
            </div>
          </article>
        </div>
        <div className="mx-0.5 mt-3.5 mb-0 text-[11px] leading-[1.5] text-white/72">
          FMGE has its own 10-milestone path built only from FMGE past-question data. It is not mixed with NEET-PG or
          INI-CET.
        </div>
      </div>
    </section>
  );
}
