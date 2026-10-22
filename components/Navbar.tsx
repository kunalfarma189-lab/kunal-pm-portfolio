"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/#ai-projects", label: "AI Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0d10]/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/#home"
          className="rounded-md text-base font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-indigo-400"
        >
          {profile.name}
          <span className="ml-2 hidden text-xs font-medium text-zinc-500 sm:inline">
            {profile.headline}
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative rounded-md text-sm font-medium text-zinc-400 transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-indigo-400 after:transition-all after:duration-300 hover:text-white hover:after:w-full focus-visible:outline-2 focus-visible:outline-indigo-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={profile.resumeUrl}
              download
              className="rounded-md text-sm font-medium text-zinc-300 transition-colors hover:text-indigo-300 focus-visible:outline-2 focus-visible:outline-indigo-400"
            >
              ↓ Resume
            </a>
          </li>
          <li>
            <Link
              href="/#contact"
              className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/25 focus-visible:outline-2 focus-visible:outline-indigo-400"
            >
              Let&apos;s talk
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-white/10 lg:hidden"
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
          <ul className="border-t border-white/10 bg-[#0c0d10] px-4 pb-4 pt-2">
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
