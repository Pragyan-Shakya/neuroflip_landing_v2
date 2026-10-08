import { Avatar } from "./Avatar";

const TESTIMONIALS = [
  {
    name: "Dr. Ayan Agrawal",
    initials: "AA",
    badge: "AIR 132",
    photo: "/testimonials/1.jpeg",
    quote:
      "“NeuroFlip transformed my study approach. Active recall and spaced repetition helped me master key topics. The flashcards were precise, covering everything essential for NEET PG success.”",
    foot: "NEET-PG learner feedback",
  },
  {
    name: "Dr. Pratha Gupta",
    initials: "PG",
    badge: "NEET 500",
    photo: "/testimonials/2.jpeg",
    quote:
      "“Managing multiple resources was tough until I found NeuroFlip. It simplified revision, keeping everything structured. The interactive format kept me engaged and improved my retention.”",
    foot: "NEET-PG learner feedback",
  },
  {
    name: "Dr. Gunal Kamal",
    initials: "GK",
    badge: "FMGE pass",
    photo: "/testimonials/3.jpeg",
    quote:
      "“Cramming was stressful, but NeuroFlip changed that. The strategic approach strengthened weak areas, boosting my confidence before the fmge exam. It is must for every FMGE aspirants.”",
    foot: "FMGE learner feedback",
  },
];

// The reference's nth-child rules out-rank its mobile overrides, so only the first card shrinks on narrow screens.
const CARD_LAYOUT = ["p-6 max-md:min-h-0 max-md:p-5", "p-[22px]", "p-[22px] max-lg:col-span-full max-md:col-auto"];

export function Testimonials() {
  return (
    <section className="py-11 max-md:py-8" id="testimonials">
      <div className="wrap overflow-hidden p-0">
        <div className="mb-8 grid grid-cols-[.82fr_1.18fr] items-end gap-11 max-lg:grid-cols-1 max-md:mb-6 max-md:gap-4">
          <div>
            <div className="kicker inline-flex items-center gap-[9px] text-[12px] font-bold tracking-[.10em] text-[#F4EAF8] uppercase">
              Learner stories
            </div>
            <h2 className="mt-3.5 mb-0 text-section leading-[1.08] font-bold tracking-[-.03em] text-balance text-white max-md:text-[30px] max-md:leading-[1.12] max-md:tracking-[-.025em]">
              What learners say about NeuroFlip.
            </h2>
          </div>
          <p className="m-0 max-w-[620px] text-[16px] leading-[1.65] text-pretty text-white/78 max-md:text-[15px]">
            Feedback from NeuroFlip users preparing for NEET-PG and FMGE.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className={`relative flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-white/14 bg-[rgba(255,255,255,.075)] text-white ${CARD_LAYOUT[i]}`}
            >
              <div className="relative z-1 flex items-center gap-3">
                <Avatar
                  src={t.photo}
                  alt={t.name}
                  initials={t.initials}
                  size={52}
                  wrapperClassName="inline-flex size-13 min-h-0 flex-none place-items-center items-center rounded-full text-[10px] font-bold text-[#F3EAF8]"
                  imageClassName="block size-13 rounded-full border-2 border-white/32 bg-white/10 object-cover [grid-area:1/1]"
                  fallbackClassName="grid size-13 place-items-center rounded-full border-2 border-white/24 bg-white/10 text-[12px] font-bold text-white [grid-area:1/1]"
                />
                <div>
                  <strong className="block text-[16px] leading-[1.3] font-bold text-white">{t.name}</strong>
                  <span className="mt-[5px] inline-flex min-h-6 items-center rounded-full border border-white/12 bg-white/8 px-[9px] text-[10px] leading-none font-bold text-[#F3EAF8]">
                    {t.badge}
                  </span>
                </div>
              </div>
              <p className="relative z-1 mt-5 mb-0 text-[16px] leading-[1.65] font-medium tracking-normal text-pretty text-white/94 max-md:text-[15px] max-md:leading-[1.68]">
                {t.quote}
              </p>
              <div className="mt-auto pt-5 text-[11px] leading-[1.45] text-white/74">{t.foot}</div>
            </article>
          ))}
        </div>

        <div className="proof-dot mt-[18px] flex items-center justify-center gap-[9px] text-[12px] text-white/74">
          These testimonials come from learner feedback already published by NeuroFlip.
        </div>
      </div>
    </section>
  );
}
