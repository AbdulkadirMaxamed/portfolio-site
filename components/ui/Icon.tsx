// Line icons used throughout the OS chrome and apps (Lucide-style, 24×24 grid).

import type { ReactNode, SVGProps } from "react";

const paths: Record<string, ReactNode> = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </>
  ),
  "home-solid": <path d="M12 2.6 2.2 10.8l1.3 1.5L5 11v9.5A1.5 1.5 0 0 0 6.5 22H10v-6.5h4V22h3.5a1.5 1.5 0 0 0 1.5-1.5V11l1.5 1.3 1.3-1.5Z" fill="currentColor" stroke="none" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M7 3v2M10.5 3v2M14 3v2" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="m3 7 16-4 .8 3" />
      <path d="m7.5 5.9 2 3M12.5 4.6l2 3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  "chevron-left": <path d="m15 6-6 6 6 6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  refresh: (
    <>
      <path d="M20 11A8 8 0 1 0 18 17" />
      <path d="M20 4v7h-7" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="11" width="15" height="10" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </>
  ),
  "lock-solid": (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" fill="currentColor" stroke="none" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9Z" />,
  "more-vertical": (
    <>
      <circle cx="12" cy="5" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" />
    </>
  ),
  "more-horizontal": (
    <>
      <circle cx="5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="19" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
    </>
  ),
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  "file-text": (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6M9 9h2" />
    </>
  ),
  "file-solid": (
    <>
      <path d="M14 2.5H7A2.5 2.5 0 0 0 4.5 5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8Z" fill="currentColor" stroke="none" />
      <path d="M8.5 12.5h7M8.5 16h7M8.5 9h3" stroke="#2b2226" />
    </>
  ),
  "folder-solid": <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.6l2 2h8.4A1.5 1.5 0 0 1 21 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5Z" fill="currentColor" stroke="none" />,
  "image-solid": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" fill="currentColor" stroke="none" />
      <path d="m5.5 17 4.5-5 3 3 2-2 3.5 4" stroke="#2b2226" />
      <circle cx="15.5" cy="8.5" r="1.5" fill="#2b2226" stroke="none" />
    </>
  ),
  "archive-solid": (
    <>
      <rect x="3" y="4" width="18" height="5" rx="1.2" fill="currentColor" stroke="none" />
      <path d="M4.5 10h15v8.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5Z" fill="currentColor" stroke="none" />
      <path d="M10 13.5h4" stroke="#2b2226" />
    </>
  ),
  "trash-solid": (
    <>
      <path d="M4 6.5h16M9.5 6.5V4.5h5v2" />
      <path d="M5.5 8h13l-1 12a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4Z" fill="currentColor" stroke="none" />
      <path d="M10 11v7M14 11v7" stroke="#2b2226" />
    </>
  ),
  "writing-solid": (
    <>
      <path d="M5 3.5h9.5L19 8v12.5H5Z" fill="currentColor" stroke="none" />
      <path d="M8 9h5M8 12.5h7M8 16h4" stroke="#2b2226" />
      <path d="m15 17 5.5-5.5 1.5 1.5L16.5 18.5H15Z" fill="currentColor" stroke="#2b2226" strokeWidth="1" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9.5 7V4.5h5V7" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  github: (
    <path
      d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.2-1.2-3.2-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.4-1.1-4.4-4.8 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.6 0 3.7-2.3 4.6-4.4 4.8.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" fill="currentColor" stroke="none" />
      <path d="M8 10.5V17M8 7.5v.01M11.5 17v-6.5M11.5 13.2c0-1.6 1-2.7 2.4-2.7s2.1 1 2.1 2.6V17" stroke="#fff" strokeWidth="1.8" />
    </>
  ),
  "external-link": (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  "book-open": (
    <>
      <path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1Z" />
      <path d="M12 6.5V20" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  notes: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16Z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9Z" />
      <circle cx="7.5" cy="7.5" r="1.3" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" />
    </>
  ),
  history: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5V12h8.5" />
      <path d="M12 12 6 18" />
    </>
  ),
  droplet: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />,
  box: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </>
  ),
  cup: (
    <>
      <path d="M5 5h14l-1.5 12a3 3 0 0 1-3 2.5h-5a3 3 0 0 1-3-2.5Z" />
      <path d="M5.5 9.5h13" />
    </>
  ),
  dripper: (
    <>
      <path d="M3.5 5h17l-6 8h-5Z" />
      <path d="M9 17h6M10 13v4M14 13v4" />
    </>
  ),
  bean: (
    <>
      <ellipse cx="12" cy="12" rx="6" ry="8.5" transform="rotate(35 12 12)" />
      <path d="M15.5 5.5c-3 3-4 9-7 13" />
    </>
  ),
  thermometer: (
    <>
      <path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0Z" />
      <path d="M12 9v8" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M10 2.5h4M12 13.5V9.5M18.5 6.5l1.5-1.5" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18M7 21h10M4 7h16" />
      <path d="m4 7-2.5 6a3 3 0 0 0 5 0Zm16 0-2.5 6a3 3 0 0 0 5 0Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
      <path d="M5 19c3-4 6-7 10-9" />
    </>
  ),
  heart: <path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11Z" />,
  "heart-solid": <path d="M12 20.5s-8.5-5.2-8.5-11.4A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.5 2.9c0 6.2-8.5 11.4-8.5 11.4Z" fill="currentColor" stroke="none" />,
  bookmark: <path d="M6 3.5h12V21l-6-4.5L6 21Z" fill="currentColor" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" fill="#3b2420" stroke="#3b2420" />
    </>
  ),
  "clock-solid": (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
      <path d="M12 7.5V12l3 2" stroke="#1d1718" />
    </>
  ),
  download: <path d="M12 4v11M7 10l5 5 5-5M4 19.5h16" />,
  printer: (
    <>
      <path d="M7 9V3.5h10V9" />
      <rect x="3.5" y="9" width="17" height="8" rx="2" />
      <path d="M7 14h10v6.5H7Z" />
    </>
  ),
  "zoom-in": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.5-4.5M8 11h6M11 8v6" />
    </>
  ),
  "zoom-out": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.5-4.5M8 11h6" />
    </>
  ),
  presentation: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M12 16v4M8.5 20h7M10 8l4 2-4 2Z" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  ),
  "settings-solid": (
    <path
      d="M12 1.8 14 4.2l3.1-.5.9 3 2.8 1.4-.9 3 1.8 2.6-2.5 1.9.2 3.1-3.1.6-1.6 2.7-2.7-1.5-2.7 1.5-1.6-2.7-3.1-.6.2-3.1L2.3 14.2l1.8-2.6-.9-3L6 7.2l.9-3 3.1.5Zm0 6.7a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  chart: <path d="M4 4v16h16M8 15l3.5-4 3 2.5L20 7" />,
  phone: <path d="M5 3.5h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6.5 6.5l1.5-2.3 4.5 1.8V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2Z" fill="currentColor" stroke="none" />,
  "map-pin": (
    <>
      <path d="M12 21.5s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9.5" r="2.5" fill="#fff" stroke="none" />
    </>
  ),
  "mail-outline": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  "briefcase-solid": (
    <>
      <path d="M8.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v1.5" />
      <rect x="2.5" y="6.5" width="19" height="14" rx="2" fill="currentColor" stroke="none" />
      <path d="M2.5 12.5h19" stroke="#fff" strokeWidth="1.4" />
    </>
  ),
  "graduation-solid": (
    <>
      <path d="M12 4 1.5 9 12 14l10.5-5Z" fill="currentColor" stroke="none" />
      <path d="M6 11.5V16c2 2 10 2 12 0v-4.5L12 14.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  laptop: (
    <>
      <rect x="4.5" y="5" width="15" height="10" rx="1.5" />
      <path d="M2.5 18.5h19" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 16v-4a8 8 0 0 1 16 0v4" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" fill="currentColor" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" fill="currentColor" />
    </>
  ),
  wifi: (
    <>
      <path d="M2 8.8a15 15 0 0 1 20 0" />
      <path d="M5.2 12.2a10.5 10.5 0 0 1 13.6 0" />
      <path d="M8.5 15.5a6 6 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1.3" fill="currentColor" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" />
      <path d="M15.5 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8.5 8.5 0 0 1 0 11" />
    </>
  ),
  battery: (
    <>
      <rect x="2.5" y="6.5" width="17" height="11" rx="2.5" />
      <rect x="5" y="9" width="10" height="6" rx="1" fill="currentColor" />
      <path d="M21.5 10.5v3" />
    </>
  ),
  "shield-lock": (
    <>
      <rect x="6" y="10.5" width="12" height="9" rx="2" fill="currentColor" stroke="none" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  puzzle: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 4v4M12 12h4M9 10.5h1.5v3H9" />
    </>
  ),
  "app-grid": (
    <>
      {[5, 12, 19].flatMap((y) =>
        [5, 12, 19].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.9" fill="currentColor" stroke="none" />)
      )}
    </>
  ),
  "play-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8.5 5 3.5-5 3.5Z" />
    </>
  ),
  terminal: (
    <>
      <path d="m5 8 4 4-4 4M11 16h8" />
    </>
  ),
  folder: <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.6l2 2h8.4A1.5 1.5 0 0 1 21 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5Z" />,
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 18,
  strokeWidth = 1.8,
  ...rest
}: { name: string; size?: number; strokeWidth?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {paths[name] ?? null}
    </svg>
  );
}
