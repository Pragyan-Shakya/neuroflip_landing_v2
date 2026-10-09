export function SkipLink() {
  return (
    <a
      className="fixed top-3 left-4 z-[9999] flex min-h-11 [transform:translateY(-160%)] items-center rounded-[10px] bg-white px-4 text-[13px] font-bold text-purple-ink no-underline shadow-[0_8px_20px_rgba(30,18,36,.14)] transition-transform duration-[180ms] ease-[ease] focus-visible:[transform:translateY(0)]"
      href="#main"
    >
      Skip to main content
    </a>
  );
}
