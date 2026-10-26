// A schematic preview of a case study's proposed user flow: numbered nodes
// joined by a hairline with arrowheads, on a faint dotted grid. Built from
// the case study's own `flow` steps, so the preview never says more than
// the study does.

export default function FlowPreview({
  steps,
  company,
}: {
  steps: string[];
  company: string;
}) {
  return (
    <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080b13] p-6 sm:p-8 lg:p-11">
      <div aria-hidden className="dot-grid absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5b6bff]/15 blur-3xl"
      />
      <figcaption className="relative flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        <span>Proposed flow</span>
        <span>{company}</span>
      </figcaption>
      {/* compact: steps flow inline below lg */}
      <ol className="relative mt-5 flex flex-wrap items-center gap-x-2 gap-y-2.5 lg:hidden">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1.5 text-[14px] leading-tight ${
                i === steps.length - 1
                  ? "border-[#a9bcff]/50 bg-[#a9bcff]/10 text-white"
                  : "border-white/15 bg-[#080b13] text-zinc-300"
              }`}
            >
              {step}
            </span>
            {i < steps.length - 1 && (
              <svg aria-hidden viewBox="0 0 16 10" className="h-2.5 w-4 shrink-0 text-zinc-500">
                <path d="M1 5h13M10 1l4 4-4 4" className="fill-none stroke-current" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <ol className="relative mt-9 hidden lg:block">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={step} className="relative flex items-start gap-5 pb-8 last:pb-0">
              {!last && (
                <span aria-hidden className="absolute left-[21px] top-11 bottom-1.5 w-px bg-white/20">
                  <svg viewBox="0 0 10 6" className="absolute -bottom-1 left-1/2 h-1.5 w-2.5 -translate-x-1/2 overflow-visible">
                    <path d="M1 1 5 5 9 1" className="fill-none stroke-white/50" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
              <span
                className={`relative grid size-11 shrink-0 place-items-center rounded-full border font-mono text-[13px] ${
                  last
                    ? "border-[#a9bcff]/60 bg-[#a9bcff]/10 text-[#d5deff]"
                    : "border-white/25 bg-[#080b13] text-zinc-400"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`pt-2.5 text-[17px] leading-snug ${last ? "text-white" : "text-zinc-300"}`}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
