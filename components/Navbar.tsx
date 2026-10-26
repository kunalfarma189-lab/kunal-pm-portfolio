"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/lib/content";

// Section ids match app/page.tsx.
const links = [
  { href: "/#how", label: "How I work" },
  { href: "/#case-studies", label: "Case studies" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Toolkit" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070c]/75 backdrop-blur-xl">
      <nav className="mx-auto grid h-16 max-w-[1360px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <Link
          href="/#top"
          className="flex items-center gap-2.5 justify-self-start rounded-md text-[17px] font-semibold tracking-[-0.02em] text-white focus-visible:outline-2 focus-visible:outline-indigo-400"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-[#a9bcff] shadow-[0_0_10px_#a9bcff]" />
          Kunal Farma
        </Link>

        {/* Desktop navigation — centered */}
        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative rounded-md text-[15px] font-medium text-zinc-400 transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-white/70 after:transition-all after:duration-300 hover:text-white hover:after:w-full focus-visible:outline-2 focus-visible:outline-indigo-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="justify-self-end hidden lg:block">
          <Link
            href="/#contact"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-indigo-400"
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
          <ul className="border-t border-white/10 bg-[#05070c] px-5 pb-5 pt-2 sm:px-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href={profile.resumeUrl}
                download
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-indigo-300 transition-colors hover:bg-white/5"
              >
                ↓ Download Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
