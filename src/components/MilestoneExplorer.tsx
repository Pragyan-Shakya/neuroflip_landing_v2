"use client";

import { useState, type CSSProperties } from "react";
import { EXAM_DATA, EXAM_KEYS, type ExamKey } from "@/lib/exam-data";

function barTone(i: number, halfwayIndex: number, count: number) {
  if (i === 0) return "first";
  if (i === halfwayIndex) return "mid";
  if (i === count - 2) return "fourth";
  if (i === count - 1) return "last";
  return "";
}

export function MilestoneExplorer() {
  const [mode, setMode] = useState<ExamKey>("NEET_PG");
  const [active, setActive] = useState(0);

  const data = EXAM_DATA[mode];
  const max = Math.max(...data.rows.map((r) => Number(r[1])));
  const halfwayIndex = data.rows.findIndex((r) => r[0] === "50%");
  const [pct, title, body] = data.copy[active];
  const [, cumulative, added] = data.rows[active];
  const isFirst = active === 0;

  const selectExam = (key: ExamKey) => {
    setMode(key);
    setActive(0);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/44 bg-white/93 shadow-hairline">
      <div className="flex items-center justify-between gap-[18px] border-b border-[#E8E1EA] bg-[linear-gradient(180deg,rgba(247,242,249,.76),rgba(255,255,255,.88))] px-6 py-5 max-md:flex-col max-md:items-start max-md:gap-3 max-md:p-5">
        <div>
          <strong className="block text-[16px] leading-[1.2] tracking-[-.02em] text-purple-ink max-md:text-[14px]" id="terrainTitle">
            Topics needed at each milestone
          </strong>
          <span className="mt-1 block text-[11px] text-quiet max-md:text-[10px]" id="terrainSubtitle">
            {data.subtitle}
          </span>
        </div>
        <div
          className="flex flex-wrap gap-2 max-md:grid max-md:w-full max-md:grid-cols-[repeat(3,minmax(0,1fr))]"
          aria-label="Exam target"
        >
          {EXAM_KEYS.map((key) => {
            const pressed = key === mode;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={pressed}
                onClick={() => selectExam(key)}
                className={`min-h-11 cursor-pointer rounded-full border px-3.5 text-[12px] font-bold transition-[background-color,border-color,color] duration-[180ms] ease-[ease] max-md:w-full max-md:min-w-0 max-md:flex-1 max-md:px-2 ${
                  pressed
                    ? "border-purple bg-purple text-white"
                    : "border-[#DDD6E0] bg-white text-[#6C626F] hover:border-[#BDAFC5]"
                }`}
              >
                {EXAM_DATA[key].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid min-h-[450px] grid-cols-[minmax(0,1.64fr)_minmax(300px,.56fr)] max-lg:grid-cols-1">
        <div className="min-w-0 border-r border-[#EBE2E5] bg-[linear-gradient(180deg,rgba(255,255,255,.55),rgba(249,245,251,.15))] p-6 max-lg:border-r-0 max-lg:border-b max-lg:border-b-line max-md:overflow-visible max-md:p-5">
          <div className="mb-4 flex justify-between gap-5 text-[11px] text-quiet max-md:mb-3">
            <span>Fewer topics</span>
            <span>More topics</span>
          </div>
          <div className="flex flex-col gap-2 py-0.5 max-md:min-w-0 max-md:p-0" id="curve">
            {data.rows.map((r, i) => {
              const total = Number(r[1]);
              const width = Math.max(8, (total / max) * 100);
              const pressed = i === active;
              const midway = i === halfwayIndex;
              const tone = barTone(i, halfwayIndex, data.rows.length);
              return (
                <button
                  key={`${mode}-${r[0]}`}
                  type="button"
                  aria-pressed={pressed}
                  aria-label={`${data.label} milestone ${i + 1}: ${r[0]} of past-question coverage, ${r[1]} topics total`}
                  onClick={() => setActive(i)}
                  className={`bar-col${midway ? " midway" : ""} relative grid min-h-[50px] min-w-0 cursor-pointer appearance-none grid-cols-[64px_minmax(0,1fr)] items-center gap-3.5 rounded-xl border-0 px-2.5 py-2 text-inherit transition-[background-color,border-color,box-shadow,transform] duration-[180ms] ease-[ease] focus-visible:rounded-[10px] max-md:min-h-12 max-md:grid-cols-[54px_minmax(0,1fr)] max-md:gap-[9px] max-md:p-2 ${
                    pressed
                      ? "bg-white shadow-[0_14px_28px_rgba(34,20,40,.10)]"
                      : "bg-transparent hover:bg-white hover:shadow-[0_10px_20px_rgba(34,20,40,.06)]"
                  }`}
                >
                  <span className="flex min-w-0 flex-col items-start gap-[3px] text-left whitespace-nowrap">
                    <strong className="block text-[18px] leading-[1.05] font-bold text-purple-ink max-md:text-[16px]">
                      {r[0]}
                    </strong>
                    <span className={`text-[10px] leading-[1.2] font-bold ${midway ? "text-[#B95B32]" : "text-quiet"}`}>
                      M{i + 1}
                    </span>
                  </span>
                  <span className="relative h-8 overflow-hidden rounded-full border border-[#E7E3E8] bg-[linear-gradient(180deg,#F5F0F7,#F1EDF4)] shadow-[inset_0_1px_1px_rgba(255,255,255,.8)] max-md:h-[30px]">
                    <span
                      className={`bar ${tone} relative box-border flex h-full w-(--pct) min-w-14 items-center justify-end rounded-full px-2.5 [transition:width_.3s_ease,background-color_.25s_ease,border-color_.25s_ease] max-md:px-2`}
                      style={{ "--pct": `${width}%` } as CSSProperties}
                      data-topics={r[1]}
                    >
                      <span
                        className={`relative z-2 min-w-max text-right text-[13px] leading-none font-bold whitespace-nowrap tabular-nums max-md:text-[12px] ${
                          tone === "last" ? "text-[#234331]" : "text-purple-ink"
                        }`}
                      >
                        {r[1]}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <aside
          className="flex min-w-0 flex-col justify-between gap-5 bg-[linear-gradient(180deg,#FAF0E7_0%,#F8EFE6_58%,#FFF8F2_100%)] p-6 max-md:p-5"
          aria-live="polite"
        >
          <div>
            <div
              className="text-[56px] leading-[.96] font-bold tracking-[-.04em] text-purple tabular-nums max-md:text-[44px]"
              id="sidePercent"
            >
              {pct}
            </div>
            <h3
              className="mt-3 mb-2.5 text-[24px] leading-[1.2] font-bold tracking-[-.025em] text-purple-ink max-md:text-[22px]"
              id="sideTitle"
            >
              {title}
            </h3>
            <p className="m-0 text-[14px] leading-[1.65] text-[#665C58]" id="sideCopy">
              {body}
            </p>
            <div className="mt-[18px] grid grid-cols-2 gap-2.5 max-sm:grid-cols-1" id="sideStats">
              <div className={chip}>
                <strong className={chipValue} id="sideCumulative">
                  {cumulative}
                </strong>
                <span className={chipLabel} id="sideCumulativeLabel">
                  {isFirst ? "topics to revise" : "total topics so far"}
                </span>
              </div>
              <div className={chip}>
                <strong className={chipValue} id="sideNew">
                  {isFirst ? pct : `+${added}`}
                </strong>
                <span className={chipLabel} id="sideNewLabel">
                  {isFirst ? "of past questions covered" : "topics added in this milestone"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 pt-0.5">
            <div className="border-t border-[#EBCDBB] pt-4 text-[12px] leading-[1.55] text-[#725E55]" id="sideRule">
              Milestone {active + 1} covers {pct} of what past {data.label} questions have tested.
            </div>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange px-4 text-[14px] font-bold text-purple-ink no-underline shadow-hairline transition-[transform,box-shadow,filter] duration-[180ms] ease-[ease] hover:[transform:translateY(-1px)] hover:shadow-[0_14px_24px_rgba(235,129,78,.28)] hover:saturate-[1.02] max-md:w-full"
              id="sideCta"
              href="#download"
            >
              Start Milestone 1
            </a>
            <div className="text-center text-[12px] leading-[1.5] text-[#725E55]" id="sideNote">
              Open NeuroFlip and start with Milestone 1 for {data.label}.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const chip =
  "rounded-[14px] border border-[rgba(235,205,187,.84)] bg-white/64 px-3 pt-3 pb-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,.75)]";
const chipValue = "block text-[22px] leading-none tracking-[-.03em] text-purple-ink tabular-nums";
const chipLabel = "mt-1.5 block text-[11px] leading-[1.35] font-bold text-[#7A655D]";
