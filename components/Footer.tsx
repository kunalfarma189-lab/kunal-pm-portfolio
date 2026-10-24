import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0b0e]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-xl">
          © 2026 {profile.name}. Amazon, Flipkart, and Myntra case studies on
          this site are hypothetical, independent product analyses — not client
          work.
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
