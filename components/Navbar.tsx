"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

// Section ids match app/page.tsx.
const links = [
  { id: "how", href: "/#how", label: "How I work" },
  { id: "case-studies", href: "/#case-studies", label: "Case studies" },
  { id: "experience", href: "/#experience", label: "Experience" },
  { id: "skills", href: "/#skills", label: "Toolkit" },
];

/* Monogram, same mark as the app icon. */
function Mark() {
  return (
    <span
      aria-hidden
      className="grid size-8 place-items-center rounded-[9px] border border-white/15 bg-[#0b0f1a] font-serif text-[19px] italic leading-none text-[#c3cfff] shadow-[0_0_18px_-6px_rgba(169,188,255,0.9)]"
    >
      K
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Scroll spy: the link for the section under the top of the viewport
  // lights up. Only the homepage has these sections; elsewhere nothing
  // is observed and no link is highlighted.
  useEffect(() => {
    const targets = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070c]/85 backdrop-blur-md">
      <nav className="mx-auto grid h-16 max-w-[1360px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <Link
          href="/#top"
          className="flex items-center gap-2.5 justify-self-start rounded-md text-[17px] font-semibold tracking-[-0.02em] text-white focus-visible:outline-2 focus-visible:outline-indigo-400"
        >
          <Mark />
          <span className="leading-tight">
            Kunal Farma
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 sm:block">
              Product Manager
            </span>
          </span>
        </Link>

        {/* Desktop navigation — centered */}
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const on = active === link.id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={on ? "location" : undefined}
                  className={`relative rounded-md text-[15px] font-medium transition-colors after:absolute after:-bottom-1 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-[#a9bcff] after:transition-all after:duration-300 hover:text-white hover:after:w-full focus-visible:outline-2 focus-visible:outline-indigo-400 ${
                    on ? "text-white after:w-full" : "text-zinc-400 after:w-0"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 justify-self-end lg:flex">
          <span className="flex items-center gap-2 text-[13px] text-zinc-400">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Open to PM roles
          </span>
          <Link
            href="/#contact"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#05070c] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-indigo-400"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="col-start-3 flex h-10 w-10 items-center justify-center justify-self-end rounded-md text-zinc-300 transition-colors hover:bg-white/10 lg:hidden"
        >
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel — height + opacity animation via grid rows;
          inert keeps closed-menu links out of the a11y tree and tab order */}
      <div
        inert={!open}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-white/10 bg-[#05070c] px-5 pb-6 pt-3 sm:px-8">
            <ul className="divide-y divide-white/[0.06]">
              {links.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 py-3 text-[17px] font-medium transition-colors ${
                      active === link.id ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    <span className="w-6 font-mono text-[12px] text-zinc-600">0{i + 1}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white py-3 text-center text-[15px] font-semibold text-[#05070c]"
              >
                Get in touch
              </Link>
              <a
                href={profile.resumeUrl}
                download="Kunal_Farma_PM_Resume.pdf"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 py-3 text-center text-[15px] font-semibold text-white"
              >
                Resume (PDF)
              </a>
            </div>
            <p className="mt-4 flex items-center gap-2 text-[13px] text-zinc-500">
              <span aria-hidden className="size-2 rounded-full bg-emerald-400" />
              Open to PM roles · {profile.location}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
