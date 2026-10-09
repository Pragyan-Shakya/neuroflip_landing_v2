import type { LegalSection } from "@/content/legal";
import { COMPANY_NAME } from "@/lib/site";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Headings in the source copy are ALL CAPS; show them in sentence case without altering the text. */
const headingCase = "lowercase first-letter:uppercase";

export function LegalPage({ title, sections }: { title: string; sections: readonly LegalSection[] }) {
  return (
    <>
      <SiteNav />
      <main id="main">
        <header className="wrap pt-16 pb-12 text-center text-white max-md:pt-11 max-md:pb-9">
          <div className="kicker inline-flex items-center gap-[9px] text-[12px] font-bold tracking-[.10em] text-[#F4EAF8] uppercase">
            Legal
          </div>
          <h1 className="mx-auto mt-4 mb-3 font-display text-[clamp(40px,4.6vw,56px)] leading-[1.06] font-semibold tracking-[-.02em] text-balance">
            {title}
          </h1>
          <p className="m-0 text-[14px] text-white/72">{COMPANY_NAME} · Pollachi, Tamil Nadu, India</p>
        </header>

        <div className="wrap grid grid-cols-[220px_minmax(0,1fr)] items-start gap-8 pb-16 max-lg:grid-cols-1 max-md:pb-10">
          <nav className="sticky top-[100px] max-lg:hidden" aria-label="On this page">
            <div className="mb-3 text-[11px] font-bold tracking-[.08em] text-white/60 uppercase">On this page</div>
            <ol className="m-0 flex list-none flex-col gap-2 p-0 text-[13px] leading-[1.4]">
              {sections.map((s) => (
                <li key={s.heading}>
                  <a
                    href={`#${slug(s.heading)}`}
                    className={`block text-white/78 no-underline transition-colors duration-[180ms] hover:text-white ${headingCase}`}
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="mx-auto w-full max-w-[820px] rounded-2xl border border-[#E7D8CC] bg-warm px-11 py-10 text-[#4A4350] shadow-hairline max-md:px-5 max-md:py-7">
            {sections.map((s, i) => (
              <section
                key={s.heading}
                id={slug(s.heading)}
                className={i === 0 ? "" : "mt-8 border-t border-[#EAD9CC] pt-8 max-md:mt-6 max-md:pt-6"}
              >
                <h2 className={`m-0 mb-3 text-[20px] leading-[1.3] font-bold tracking-[-.015em] text-purple-ink ${headingCase}`}>
                  {s.heading}
                </h2>
                {s.paragraphs.map((p, j) =>
                  typeof p === "string" ? (
                    <p key={j} className="m-0 mb-3 text-[15px] leading-[1.75] last:mb-0">
                      {p}
                    </p>
                  ) : (
                    <address
                      key={j}
                      className="my-4 rounded-xl border border-[#E2D5CB] bg-white px-5 py-4 text-[14px] leading-[1.7] not-italic text-purple-ink"
                    >
                      {p.address.map((line) =>
                        line.includes("@") ? (
                          <a key={line} href={`mailto:${line}`} className="block font-bold text-[#A94E24]">
                            {line}
                          </a>
                        ) : (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ),
                      )}
                    </address>
                  ),
                )}
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
