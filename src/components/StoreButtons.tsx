export const APP_STORE_URL = "https://apps.apple.com/us/app/neuroflip-neet-pg-flashcards/id6474674721";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.neuroflip.neetpg";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="block size-[22px]">
      <path
        d="M15.8 12.7c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.7 0-1.8-.9-3-.9-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3.1-.7 1.4 0 1.8.7 3.1.7 1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-3.3Z"
        fill="currentColor"
      />
      <path
        d="M13.4 5.5c.6-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="block size-[23px]">
      <path d="M3.3 3.1c-.2.3-.3.7-.3 1.2v15.4c0 .5.1.9.4 1.2L13 12 3.3 3.1Z" fill="#20C5F5" />
      <path d="M13 12 4.4 3.6c.4-.2.9-.1 1.4.2l10.1 5.8L13 12Z" fill="#34D058" />
      <path d="m13 12 2.9-2.4 3.5 2c.8.5.8 1.2 0 1.7l-3.4 2L13 12Z" fill="#FFCC3D" />
      <path d="m13 12 3 3.3-10.2 5.9c-.5.3-.9.3-1.3.1L13 12Z" fill="#F45164" />
    </svg>
  );
}

const iconTile =
  "grid size-[38px] flex-[0_0_38px] place-items-center rounded-[10px] border border-[#E4DEE7] bg-[#F8F6F9] shadow-[inset_0_1px_0_rgba(255,255,255,.85)] max-md:size-10 max-md:basis-10";

const variants = {
  hero: {
    link:
      "flex min-h-14 items-center gap-3 rounded-xl border border-white/62 bg-white/98 px-[17px] text-purple-ink no-underline shadow-[0_8px_22px_rgba(30,18,36,.09)] transition-[transform,background-color,border-color,box-shadow] duration-[180ms] ease-[ease] hover:[transform:translateY(-2px)] hover:border-[#F1D2BC] hover:bg-[#FFF7F1] hover:shadow-[0_12px_28px_rgba(39,24,47,.16)]",
    small: "block text-[10px] leading-[1.15] tracking-[.01em] text-[#7A727F]",
    strong: "mt-[3px] block text-[13px] leading-[1.15]",
  },
  close: {
    link:
      "flex min-h-[58px] w-full min-w-0 items-center justify-start gap-3 rounded-[10px] border border-[#D9D2DC] bg-white px-3.5 text-purple-ink no-underline transition-[transform,border-color,background-color] duration-[180ms] ease-[ease] hover:[transform:translateY(-1px)] hover:border-[#C7BACD] hover:bg-[#FCFCFC] active:[transform:translateY(0)]",
    small: "block text-[10px] leading-[1.15] text-[#6D626B]",
    strong: "mt-0.5 block text-[13px] leading-[1.2] text-purple-ink",
  },
} as const;

export function StoreButtons({ variant }: { variant: keyof typeof variants }) {
  const v = variants[variant];
  return (
    <>
      <a className={v.link} href={APP_STORE_URL} aria-label="Download Neuroflip on the App Store">
        <span className={`${iconTile} text-[#2F2734]`} aria-hidden="true">
          <AppleIcon />
        </span>
        <span className="min-w-0 text-left">
          <small className={v.small}>Download on the</small>
          <strong className={v.strong}>App Store</strong>
        </span>
      </a>
      <a className={v.link} href={PLAY_STORE_URL} aria-label="Get Neuroflip on Google Play">
        <span className={iconTile} aria-hidden="true">
          <PlayIcon />
        </span>
        <span className="min-w-0 text-left">
          <small className={v.small}>Get it on</small>
          <strong className={v.strong}>Google Play</strong>
        </span>
      </a>
    </>
  );
}
