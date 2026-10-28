import Link from "next/link";
import { profile } from "@/lib/content";
import { contactIcons } from "@/components/home/Icons";

const pages = [
  { href: "/#how", label: "How I work" },
  { href: "/#case-studies", label: "Case studies" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Toolkit" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  const connect = [
    // short label on phones (the two-column footer has no room for the address)
    { key: "email", label: profile.email, short: "Email", href: `mailto:${profile.email}` },
    { key: "phone", label: profile.phone, short: "Call", href: profile.phoneHref },
    { key: "linkedin", label: "LinkedIn", href: profile.linkedin, external: true },
    { key: "resume", label: "Resume (PDF)", href: profile.resumeUrl, download: true },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#05070c]">
      <div className="mx-auto max-w-[1360px] px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-14">
        {/* phones: brand on top, then Pages and Connect side by side */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-10">
          {/* brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/#top" className="inline-flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.02em] text-white">
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-[9px] border border-white/15 bg-[#0b0f1a] font-serif text-[19px] italic leading-none text-[#c3cfff]"
              >
                K
              </span>
              {profile.name}
            </Link>
            <p className="mt-3 max-w-xs text-[15px] leading-6 text-zinc-400 sm:mt-4">
              Product Manager. I turn customer problems into products that move business numbers.
            </p>
            <p className="mt-4 flex items-center gap-2 text-[13px] text-zinc-500">
              <span aria-hidden className="size-2 rounded-full bg-emerald-400" />
              Open to PM roles · {profile.location}
            </p>
          </div>

          {/* pages */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Pages</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[15px] text-zinc-300 transition-colors hover:text-white">
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/case-studies" className="text-[15px] text-zinc-300 transition-colors hover:text-white">
                  All case studies
                </Link>
              </li>
            </ul>
          </div>

          {/* connect */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Connect</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
              {connect.map((c) => (
                <li key={c.key}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(c.download ? { download: "Kunal_Farma_PM_Resume.pdf" } : {})}
                    className="group inline-flex items-center gap-2.5 text-[15px] text-zinc-300 transition-colors hover:text-white"
                  >
                    <span className="grid size-7 place-items-center rounded-full border border-white/15 text-zinc-400 transition-colors group-hover:border-white/40 group-hover:text-white">
                      {contactIcons[c.key]({ className: "size-3.5" })}
                    </span>
                    {c.short ? (
                      <>
                        <span className="sm:hidden">{c.short}</span>
                        <span className="hidden sm:inline">{c.label}</span>
                      </>
                    ) : (
                      c.label
                    )}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-[15px] text-zinc-300 transition-colors hover:text-white"
                >
                  <span className="grid size-7 place-items-center rounded-full border border-white/15 font-mono text-[11px] text-zinc-400 transition-colors group-hover:border-white/40 group-hover:text-white">
                    {"</>"}
                  </span>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1.5 border-t border-white/10 pt-5 text-[13px] text-zinc-500 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p>© 2026 {profile.name}</p>
          <p className="max-w-xl sm:text-right">
            Mahattaart is real work; Amazon, FinBridge and CareLoop are practice studies
            <span className="hidden sm:inline"> (FinBridge and CareLoop are illustrative companies)</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
