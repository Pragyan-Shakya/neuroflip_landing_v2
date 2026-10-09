"use client";

import { Children, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 9;

/**
 * Grid with a "Load more" button. Every card is server-rendered (so crawlers see all links);
 * cards beyond the visible count are just hidden.
 */
export function PostGrid({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const listRef = useRef<HTMLUListElement>(null);
  const firstNew = useRef<number | null>(null);

  // After loading more, move focus to the first new card so keyboard users don't land on <body>.
  useEffect(() => {
    if (firstNew.current === null) return;
    listRef.current?.children[firstNew.current]?.querySelector("a")?.focus();
    firstNew.current = null;
  }, [visible]);

  if (items.length === 0) return null;

  const loadMore = () => {
    firstNew.current = visible;
    setVisible((v) => v + PAGE_SIZE);
  };

  return (
    <div className="wrap pb-16 max-md:pb-10">
      <ul
        ref={listRef}
        role="list"
        className="m-0 grid list-none grid-cols-3 gap-6 p-0 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-5"
      >
        {items.map((item, i) => (
          <li key={i} hidden={i >= visible}>
            {item}
          </li>
        ))}
      </ul>
      {visible < items.length && (
        <div className="mt-10 flex justify-center max-md:mt-8">
          <button
            type="button"
            onClick={loadMore}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange px-6 text-[14px] font-bold text-purple-ink shadow-hairline transition-[transform,box-shadow] duration-[180ms] ease-[ease] hover:[transform:translateY(-1px)] hover:shadow-[0_14px_24px_rgba(235,129,78,.28)] max-md:w-full"
          >
            Load more
          </button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {visible > PAGE_SIZE ? `Showing ${Math.min(visible, items.length)} of ${items.length} posts` : ""}
      </p>
    </div>
  );
}
