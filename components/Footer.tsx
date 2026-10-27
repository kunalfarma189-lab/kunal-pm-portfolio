import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070c]">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-3 px-5 pb-24 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-8 sm:pr-24">
        <p className="max-w-xl">
          © 2026 {profile.name} · {profile.location}. Mahattaart is real work; the
          Amazon, FinBridge and CareLoop studies are practice (FinBridge and
          CareLoop are illustrative companies).
        </p>
        <div className="flex gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-white"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
