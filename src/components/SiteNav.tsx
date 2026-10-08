"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#milestones", label: "Milestones" },
  { href: "#for-you", label: "Why NeuroFlip" },
  { href: "#testimonials", label: "Testimonials" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const link = "no-underline transition-colors duration-[180ms] ease-[ease] hover:text-white";

  return (
    <header
      className={`nav sticky top-0 z-30 bg-purple transition-[background-color,box-shadow] duration-[220ms] ease-[ease]${open ? " open" : ""}`}
      id="nav"
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-7 max-md:h-[70px]">
        <a
          href="#top"
          className="flex items-center gap-[11px] text-[18px] font-bold tracking-[-.03em] text-white no-underline"
          aria-label="Neuroflip home"
        >
          <Image src="/brand/logo.svg" width={28} height={36} alt="" priority className="h-9 w-7 object-contain" />
          <span translate="no">Neuroflip</span>
        </a>
        <nav
          className="nav-links flex items-center gap-7 text-[14px] font-bold text-white/86 max-lg:hidden"
          id="navLinks"
          aria-label="Primary navigation"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={link} onClick={close}>
              {l.label}
            </a>
          ))}
          <a
            href="#download"
            className={`nav-action ${link} inline-flex min-h-11 items-center justify-center rounded-[44px] bg-orange px-[18px] font-bold text-purple-ink!`}
            onClick={close}
          >
            Download NeuroFlip
          </a>
        </nav>
        <button
          ref={menuRef}
          type="button"
          className="hidden size-11 items-center justify-center rounded-xl border border-white/18 bg-white/8 px-1.5 py-px text-white max-lg:flex"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
