"use client";

import { useEffect, useState } from "react";

type Props = { url: string; title: string };

const ICONS: Record<string, React.ReactNode> = {
  X: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />,
  LinkedIn: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4V9.75Z" />,
  Facebook: <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.27 4.3c-2.3 0-3.87 1.4-3.87 3.98v2.22H8v3h2.4V21h3.1Z" />,
  WhatsApp: <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.94 9.94 0 1 0 12.04 2Zm0 18.13c-1.5 0-2.98-.4-4.26-1.17l-.3-.18-3.07.9.92-2.99-.2-.31a8.2 8.2 0 1 1 6.91 3.75Zm4.5-6.13c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.46-.6 1.66-1.18.2-.57.2-1.07.15-1.17-.06-.1-.22-.16-.47-.29Z" />,
};

function shareLinks(url: string, title: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return [
    { name: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
  ];
}

const btn =
  "inline-flex size-10 items-center justify-center rounded-full border border-[#E2D5CB] bg-white text-purple no-underline transition-colors duration-[180ms] hover:border-purple hover:bg-purple hover:text-white";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}

export function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const onCopy = async () => {
    try {
      await copyText(url);
      setCopied(true);
    } catch {
      /* clipboard blocked: leave the button as is */
    }
  };

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#EAD9CC] pt-6 max-md:mt-8">
      <span className="mr-1 text-[13px] font-bold text-purple-ink">Share this post</span>
      {shareLinks(url, title).map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`Share on ${s.name}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[18px]">
            {ICONS[s.name]}
          </svg>
        </a>
      ))}
      <button type="button" onClick={onCopy} className={`${btn} w-auto px-4 text-[13px] font-bold`}>
        {copied ? "Copied" : "Copy link"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
