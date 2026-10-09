export const FAQS = [
  {
    q: "What is a PYT?",
    a: "PYT means Previous Year Topic. It is a topic connected to past exam questions. NeuroFlip uses that past-question history to help decide what you should revise first.",
  },
  {
    q: "How does NeuroFlip decide what I should revise first?",
    a: "We map past exam questions to 1,619 Medical-PG topics. For each exam, topics with more support from past questions come first. Then we group them into 10 milestones.",
  },
  {
    q: "Are the NEET-PG, INI-CET and FMGE rankings the same?",
    a: "No. NEET-PG, INI-CET, and FMGE each use their own past-question data, so the topic order can change from one exam to another.",
  },
  {
    q: "How were the FMGE milestones calculated?",
    a: "FMGE uses 6,585 mapped past-question records across 1,240 topics. NeuroFlip ranks those topics using FMGE data only, while making sure all 19 subjects are represented from Milestone 1. Each milestone adds another 10% of what past FMGE questions have tested.",
  },
  {
    q: "What does a milestone percentage mean?",
    a: "It shows how much of what past questions have tested is covered by the topics in that milestone. It does not mean a topic has the same chance of appearing in the next exam.",
  },
  {
    q: "Does completing the final milestone mean I have finished the full syllabus?",
    a: "No. Milestone 10 covers all topics found in the past-question data for that exam. The full Medical-PG syllabus has 1,619 topics, including topics not seen in that exam’s current past-question data.",
  },
  {
    q: "What if I forget a Topic after completing a milestone?",
    a: "Completing a milestone means you finished that set once. If a topic becomes due again, feels weak, or you miss it, it can return for review.",
  },
  {
    q: "Does NeuroFlip replace notes, videos or GTs?",
    a: "No. NeuroFlip helps you decide what to revise first and what to review next. Keep using your main notes, question practice, and GTs for full exam prep.",
  },
];

export function Faq() {
  return (
    <section className="py-11 max-md:py-8" id="faqs">
      <div className="wrap grid grid-cols-[.72fr_1.28fr] items-start gap-11 overflow-hidden rounded-2xl border border-white/14 bg-white/7 p-11 shadow-[0_18px_44px_rgba(34,20,40,.06)] max-lg:grid-cols-1 max-lg:gap-6 max-md:gap-5 max-md:px-5 max-md:py-6 max-sm:px-4">
        <div className="sticky top-[112px] max-lg:static">
          <h2 className="m-0 max-w-[9ch] text-section leading-[1.08] font-bold tracking-[-.03em] text-balance text-white max-lg:max-w-none max-md:text-[30px] max-md:leading-[1.12] max-md:tracking-[-.025em]">
            Frequently asked questions.
          </h2>
          <p className="mt-4 mb-0 max-w-[34ch] text-[15px] leading-[1.65] text-white/76">
            Simple answers about Previous Year Topics (PYTs), milestones, and how NeuroFlip uses past exam questions.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {FAQS.map(({ q, a }) => (
            <details
              key={q}
              className="faq-item overflow-hidden rounded-2xl border border-white/14 bg-[rgba(255,255,255,.075)] focus-within:border-[rgba(255,226,200,.52)]"
            >
              <summary className="relative flex min-h-16 cursor-pointer list-none items-center py-4 pr-[52px] pl-5 text-[16px] leading-[1.35] font-bold text-white max-md:min-h-[60px] max-md:py-3.5 max-md:pr-12 max-md:pl-4 max-md:text-[15px]">
                {q}
              </summary>
              <p className="m-0 max-w-[72ch] pt-0 pr-[52px] pb-5 pl-5 text-[14px] leading-[1.68] text-white/76 max-md:pr-12 max-md:pb-[18px] max-md:pl-4">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
