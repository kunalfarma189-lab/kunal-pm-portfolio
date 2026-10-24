"use client";

import { useEffect, useRef, useState } from "react";

// Floating back-to-top button, fixed to the viewport (bottom-right).
// Appears only after the visitor has scrolled past the top of the page,
// so it never sits over the hero CTAs. One IntersectionObserver on a
// top sentinel — no scroll listeners. Hidden buttons are `invisible`,
// keeping them out of the tab order and screen-reader flow.
export default function ScrollTopButton() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[40vh] w-px"
      />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches
              ? "auto"
              : "smooth",
          })
        }
        className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#10141A]/85 text-zinc-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-300 hover:scale-105 hover:border-indigo-400/50 hover:text-indigo-300 hover:shadow-[0_8px_28px_rgba(99,102,241,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 active:scale-95 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-3 opacity-0"
        }`}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19V5M5 12l7-7 7 7"
          />
        </svg>
      </button>
    </>
  );
}
