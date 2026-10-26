// A case study's proposed flow as a small zig-zag diagram: numbered nodes
// joined by dotted arrows, with only the first and last step named so the
// card stays light. Built from the study's own `flow`.

export default function FlowPreview({ steps }: { steps: string[] }) {
  const n = steps.length;
  const W = 300;
  const H = 96;
  const pad = 18;
  const pts = steps.map((_, i) => ({
    x: pad + (i * (W - pad * 2)) / Math.max(1, n - 1),
    y: i % 2 === 0 ? 30 : 70,
  }));

  return (
    <figure className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Flow: ${steps.join(" → ")}`}
        className="h-auto w-full overflow-visible"
      >
        {pts.slice(1).map((b, i) => {
          const a = pts[i];
          const len = Math.hypot(b.x - a.x, b.y - a.y);
          const ux = (b.x - a.x) / len;
          const uy = (b.y - a.y) / len;
          const s = { x: a.x + ux * 14, y: a.y + uy * 14 };
          const e = { x: b.x - ux * 15, y: b.y - uy * 15 };
          const ang = (Math.atan2(uy, ux) * 180) / Math.PI;
          return (
            <g key={i}>
              <line x1={s.x} y1={s.y} x2={e.x} y2={e.y} className="stroke-white/45" strokeWidth={1.2} strokeDasharray="1 4" strokeLinecap="round" />
              <path
                d="M -5 -3.5 L 0 0 L -5 3.5"
                transform={`translate(${e.x} ${e.y}) rotate(${ang})`}
                className="fill-none stroke-white/70"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
        {pts.map((p, i) => {
          const last = i === n - 1;
          return (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={12}
                className={last ? "fill-[#a9bcff]/15 stroke-[#a9bcff]" : "fill-[#05070c] stroke-white/40"}
                strokeWidth={1}
              />
              <text
                x={p.x}
                y={p.y + 3.5}
                textAnchor="middle"
                className={`font-mono text-[10px] ${last ? "fill-white" : "fill-zinc-400"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex items-start justify-between gap-4 text-[13px] leading-snug">
        <span className="text-zinc-500">{steps[0]}</span>
        <span className="text-right text-white">{steps[n - 1]}</span>
      </figcaption>
    </figure>
  );
}
