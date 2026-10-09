/** Centred white page intro, matching the legal pages. */
export function BlogHeader({ kicker, title, lead }: { kicker: React.ReactNode; title: string; lead?: string }) {
  return (
    <header className="wrap pt-16 pb-10 text-center text-white max-md:pt-11 max-md:pb-8">
      <div className="kicker inline-flex items-center gap-[9px] text-[12px] font-bold tracking-[.10em] text-[#F4EAF8] uppercase">
        {kicker}
      </div>
      <h1 className="mx-auto mt-4 mb-3 max-w-[900px] font-display text-[clamp(40px,4.6vw,56px)] leading-[1.06] font-semibold tracking-[-.02em] text-balance max-md:text-[34px]">
        {title}
      </h1>
      {lead && <p className="mx-auto m-0 max-w-[620px] text-[16px] leading-[1.6] text-pretty text-white/72 max-md:text-[15px]">{lead}</p>}
    </header>
  );
}
