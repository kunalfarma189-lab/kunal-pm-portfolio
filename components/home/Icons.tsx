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
  // document — PRDs
  doc: (p) => (
    <Icon {...p}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </Icon>
  ),
  // line chart — analytics tools
  chart: (p) => (
    <Icon {...p}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="m7 15 3.5-4 3 2.5L17 9" />
    </Icon>
  ),
  // split — A/B tests
  split: (p) => (
    <Icon {...p}>
      <path d="M12 21v-7M12 14 6 8M12 14l6-6" />
      <path d="M4 5h4v4M20 5h-4v4" />
    </Icon>
  ),
  // checklist — structured order details
  checklist: (p) => (
    <Icon {...p}>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="m7.5 8.5 1.5 1.5 2.5-2.5M13.5 9h3M7.5 14.5l1.5 1.5 2.5-2.5M13.5 15h3" />
    </Icon>
  ),
  // truck — delivery tracking
  truck: (p) => (
    <Icon {...p}>
      <path d="M3 6.5h11v9H3zM14 9.5h3.5l3 3v3H14" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </Icon>
  ),
  // headset — customer support
  support: (p) => (
    <Icon {...p}>
      <path d="M4.5 13v-1.5a7.5 7.5 0 0 1 15 0V13" />
      <rect x="3.5" y="13" width="4" height="5.5" rx="1.5" />
      <rect x="16.5" y="13" width="4" height="5.5" rx="1.5" />
      <path d="M18.5 18.5c0 1.4-1.8 2.5-5 2.5" />
    </Icon>
  ),
  // box — catalogue & stock
  box: (p) => (
    <Icon {...p}>
      <path d="M12 3 20 7v10l-8 4-8-4V7z" />
      <path d="m4 7 8 4 8-4M12 11v10" />
    </Icon>
  ),
  // brackets — code / dev tools
  code: (p) => (
    <Icon {...p}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5.5l-3 13" />
    </Icon>
  ),
  // cloud — hosting
  cloud: (p) => (
    <Icon {...p}>
      <path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 10a4.25 4.25 0 0 1-.25 8.5z" />
    </Icon>
  ),
  // pen nib — design tools
  design: (p) => (
    <Icon {...p}>
      <path d="M12 3.5 18 10l-3.5 9.5h-5L6 10z" />
      <circle cx="12" cy="11" r="1.6" />
      <path d="M12 3.5v6" />
    </Icon>
  ),
  // bulb — a guess / hypothesis
  bulb: (p) => (
    <Icon {...p}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
    </Icon>
  ),
  // alert — a risk
  alert: (p) => (
    <Icon {...p}>
      <path d="M12 3.5 21 19.5H3z" />
      <path d="M12 9.5v4.5M12 17v.5" />
    </Icon>
  ),
  // paper plane — contact
  send: (p) => (
    <Icon {...p}>
      <path d="M4 11.5 20 4l-7.5 16-2-6.5z" />
      <path d="m10.5 13.5 4-4" />
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
