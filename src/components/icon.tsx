import type { SVGProps } from "react";

export type IconName =
  | "book"
  | "arrow"
  | "chevron"
  | "clock"
  | "lock"
  | "unlock"
  | "stopwatch"
  | "person"
  | "people"
  | "globe"
  | "message"
  | "question"
  | "trophy"
  | "document"
  | "play"
  | "pause"
  | "check"
  | "plus"
  | "minus"
  | "wide"
  | "expand"
  | "shrink";

const paths: Record<IconName, React.ReactNode> = {
  pause: <path d="M9 5v14M15 5v14" />,
  book: (
    <>
      <path d="M3 4h7a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H3z" />
      <path d="M13 7a3 3 0 0 1 3-3h5v15h-4a4 4 0 0 0-4 2" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15m-5-5 5 5-5 5" />
    </>
  ),
  chevron: <path d="m9 5 7 7-7 7" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  lock: (
    <>
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <rect x="6" y="10" width="12" height="12" rx="6" />
      <path d="M12 15v3" />
    </>
  ),
  unlock: (
    <>
      <path d="M8 10V7a4 4 0 0 1 8 0" />
      <rect x="6" y="10" width="12" height="12" rx="6" />
      <path d="M12 15v3" />
    </>
  ),
  stopwatch: (
    <>
      <circle cx="12" cy="14" r="8" />
      <path d="M9 2h6m-3 0v4m6 2 2-2M12 10v4l-2 2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21v-4a7 7 0 0 1 14 0v4M9 14l3 3 3-3" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3m2-16a3 3 0 0 1 0 6m2 10v-3a6 6 0 0 0-2-4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
  message: (
    <path d="M21 11a8 8 0 0 1-8 8H7l-5 3V11a8 8 0 0 1 8-8h3a8 8 0 0 1 8 8Z" />
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8a3 3 0 0 1 6 1c0 2-3 2-3 4m0 3v.1" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 3h8v5a4 4 0 0 1-8 0Zm4 9v6m-4 3h8m-4-3a4 4 0 0 0-4 3m4-3a4 4 0 0 1 4 3M8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4" />
    </>
  ),
  document: (
    <>
      <path d="M5 2h9l5 5v15H5zM14 2v6h5M8 12h8m-8 4h6" />
    </>
  ),
  play: <path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none" />,
  check: <path d="m5 12 4 4L19 6" />,
  plus: <path d="M5 12h14M12 5v14" />,
  minus: <path d="M5 12h14" />,
  wide: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="1" />
      <path d="m6 10-2 2 2 2m12-4 2 2-2 2" />
    </>
  ),
  expand: <path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" />,
  shrink: <path d="M3 9h6V3m6 0v6h6M9 21v-6H3m12 6v-6h6" />,
};

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
