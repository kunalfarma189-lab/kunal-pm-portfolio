import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © 2026 {profile.name}. Case studies on this
          site are hypothetical exercises, not client work.
        </p>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-indigo-600"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
