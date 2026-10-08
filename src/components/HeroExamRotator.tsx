"use client";

import { useEffect, useState } from "react";

const HERO_EXAMS = ["NEET-PG.", "INI-CET.", "FMGE."];
const STATIC_TEXT = "NEET-PG, INI-CET & FMGE.";

/** Cycles the exam name twice, then rests on the last one. Shows all three at once under reduced motion. */
export function HeroExamRotator() {
  const [index, setIndex] = useState(0);
  const [changing, setChanging] = useState(false);
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsStatic(true);
      return;
    }
    let changes = 0;
    let swap: number | undefined;
    const timer = window.setInterval(() => {
      setChanging(true);
      swap = window.setTimeout(() => {
        setIndex((i) => i + 1);
        setChanging(false);
        changes += 1;
        if (changes >= 2) window.clearInterval(timer);
      }, 180);
    }, 2200);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(swap);
    };
  }, []);

  const base =
    "text-[#FFD9C4] transition-[opacity,transform] duration-[180ms] ease-[ease] will-change-[opacity,transform]";
  const className = isStatic
    ? `${base} inline min-w-0 whitespace-normal`
    : `${base} inline-block min-w-[7.4ch] text-left align-baseline${changing ? " opacity-0 [transform:translateY(.12em)]" : ""}`;

  return (
    <span className={className} aria-hidden="true">
      {isStatic ? STATIC_TEXT : HERO_EXAMS[index]}
    </span>
  );
}
