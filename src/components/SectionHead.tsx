/** Two-column section intro: heading on the left, lead paragraph on the right (stacks ≤980px). */
export function SectionHead({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="mb-8 grid grid-cols-[.82fr_1.18fr] items-end gap-11 max-lg:grid-cols-1 max-md:mb-6 max-md:gap-4">
      <div>
        <h2 className="m-0 text-section leading-[1.08] font-bold tracking-[-.03em] text-balance text-white max-md:text-[30px] max-md:leading-[1.12] max-md:tracking-[-.025em]">
          {title}
        </h2>
      </div>
      <p className="m-0 max-w-[680px] text-[16px] leading-[1.65] text-pretty text-white/80 max-md:text-[15px]">{lead}</p>
    </div>
  );
}
