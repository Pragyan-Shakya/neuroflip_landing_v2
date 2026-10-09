"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "/#milestones", label: "Milestones" },
  { href: "/#for-you", label: "Why NeuroFlip" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const openedByKeyboard = useRef(false);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = { overflow: root.style.overflow, gutter: root.style.scrollbarGutter };
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    if (openedByKeyboard.current) linksRef.current?.querySelector("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !headerRef.current) return;
      const items = [...headerRef.current.querySelectorAll<HTMLElement>("a[href], button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(width >= 981px)");
    const onResize = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = prev.overflow;
      root.style.scrollbarGutter = prev.gutter;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const dismiss = () => {
    setOpen(false);
    menuRef.current?.focus();
  };
  const link = "no-underline transition-colors duration-[180ms] ease-[ease] hover:text-white";

  return (
    <header
      ref={headerRef}
      className={`nav sticky top-0 z-30 bg-purple transition-[background-color,box-shadow] duration-[220ms] ease-[ease]${open ? " open" : ""}`}
      id="nav"
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-7 max-md:h-[70px]">
        <Link
          href="/#top"
          className="flex items-center gap-[11px] text-[18px] font-bold tracking-[-.03em] text-white no-underline"
          aria-label="Neuroflip home"
        >
          <Image src="/brand/logo.svg" width={28} height={36} alt="" priority className="h-9 w-7 object-contain" />
          <span translate="no">Neuroflip</span>
        </Link>
        <nav
          ref={linksRef}
          className="nav-links flex items-center gap-7 text-[14px] font-bold text-white/86 max-lg:hidden"
          id="navLinks"
          aria-label="Primary navigation"
        >
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={link} onClick={close}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/#download"
            className={`nav-action ${link} inline-flex min-h-11 items-center justify-center rounded-[44px] bg-orange px-[18px] font-bold text-purple-ink!`}
            onClick={close}
          >
            Download NeuroFlip
          </Link>
        </nav>
        <button
          ref={menuRef}
          type="button"
          className="hidden size-11 items-center justify-center rounded-xl border border-white/18 bg-white/8 px-1.5 py-px text-white max-lg:flex"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={(e) => {
            openedByKeyboard.current = e.detail === 0;
            setOpen((o) => !o);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="menu-icon size-5">
            <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && <div className="nav-scrim" aria-hidden="true" onClick={dismiss} />}
    </header>
  );
}
