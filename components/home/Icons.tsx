// Thin outline icons for the homepage — white/soft-grey strokes, no fills.
// Drawn on a 24px grid so they share one visual weight.

import type { ReactNode, SVGProps } from "react";

function Icon({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const capabilityIcons: Record<string, (p: SVGProps<SVGSVGElement>) => ReactNode> = {
  // compass rose — direction
  strategy: (p) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" />
      <path d="m15.2 8.8-2 4.4-4.4 2 2-4.4z" />
    </Icon>
  ),
  // person + lens — listening to users
  research: (p) => (
    <Icon {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.7-3.3 2.8-5 5.5-5 1.3 0 2.4.4 3.3 1.1" />
      <circle cx="16.5" cy="15.5" r="3" />
      <path d="m18.7 17.7 2.3 2.3" />
    </Icon>
  ),
  // axis + bars + trend
  data: (p) => (
    <Icon {...p}>
      <path d="M3.5 3.5v17h17" />
      <path d="M8 16.5v-4M12 16.5v-7M16 16.5v-5.5" />
      <path d="m7 8.5 4-3 3.5 2L20 4" />
    </Icon>
  ),
  // launch flag on a pole
  execution: (p) => (
    <Icon {...p}>
      <path d="M5 21V3.5" />
      <path d="M5 4h11.5l-2.5 4 2.5 4H5" />
      <circle cx="5" cy="21" r=".6" />
    </Icon>
  ),
  // milestones along a route
  roadmap: (p) => (
    <Icon {...p}>
      <circle cx="5" cy="18" r="2" />
      <circle cx="12" cy="7" r="2" />
      <circle cx="19" cy="15" r="2" />
      <path d="M6.3 16.4 10.7 8.6M13.6 8.4l4.1 5" />
    </Icon>
  ),
  // spark — AI
  ai: (p) => (
    <Icon {...p}>
      <path d="M12 3.5c.6 4.3 2.2 5.9 6.5 6.5-4.3.6-5.9 2.2-6.5 6.5-.6-4.3-2.2-5.9-6.5-6.5 4.3-.6 5.9-2.2 6.5-6.5Z" />
      <path d="M18.5 15.5v4M16.5 17.5h4" />
    </Icon>
  ),
};

export function ArrowRight(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p} strokeWidth={1.5}>
      <path d="M4 12h15M14 7l5 5-5 5" />
    </Icon>
  );
}

export function ArrowDown(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p} strokeWidth={1.5}>
      <path d="M12 4v15M7 14l5 5 5-5" />
    </Icon>
  );
}

export const contactIcons: Record<string, (p: SVGProps<SVGSVGElement>) => ReactNode> = {
  email: (p) => (
    <Icon {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Icon>
  ),
  phone: (p) => (
    <Icon {...p}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </Icon>
  ),
  linkedin: (p) => (
    <Icon {...p}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-2 1.2-3 2.6-3S17 11.5 17 13.5V17" />
    </Icon>
  ),
  resume: (p) => (
    <Icon {...p}>
      <path d="M6 2.5h8l4 4v15H6z" />
      <path d="M14 2.5v4h4M12 10v7M9 14l3 3 3-3" />
    </Icon>
  ),
};
