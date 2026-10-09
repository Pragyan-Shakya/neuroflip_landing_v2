import Link from "next/link";
import { CATEGORIES, type CategorySlug } from "@/content/categories";

const chip = "inline-flex min-h-10 items-center rounded-full px-4 text-[13px] font-bold no-underline transition-colors duration-[180ms]";
const idle = `${chip} bg-white/10 text-white hover:bg-white/18`;
const active = `${chip} bg-peach text-purple-ink`;

export function CategoryChips({ categories, current }: { categories: CategorySlug[]; current?: CategorySlug }) {
  if (categories.length === 0) return null;
  return (
    <nav aria-label="Blog categories" className="wrap mb-8 max-md:mb-6">
      <ul role="list" className="m-0 flex list-none flex-wrap justify-center gap-2.5 p-0">
        <li>
          <Link href="/blog" className={current ? idle : active} aria-current={current ? undefined : "page"}>
            All
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c}>
            <Link
              href={`/blog/category/${c}`}
              className={c === current ? active : idle}
              aria-current={c === current ? "page" : undefined}
            >
              {CATEGORIES[c].name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
