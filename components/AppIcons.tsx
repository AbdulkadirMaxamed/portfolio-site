// Illustrated application icons used on the desktop, dock and in app headers.
// Drawn as SVG to match the design's glossy, slightly-3D icon set.

import { useId } from "react";

type IconProps = { size?: number };

function AboutIcon({ size = 56 }: IconProps) {
  // Pixel-art developer holding a laptop
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="5" y="0.5" width="6" height="1" fill="#6b3f26" />
      <rect x="4" y="1.5" width="8" height="1.5" fill="#6b3f26" />
      <rect x="4" y="3" width="1" height="2" fill="#6b3f26" />
      <rect x="11" y="3" width="1" height="2" fill="#6b3f26" />
      <rect x="5" y="3" width="6" height="3.5" fill="#f6c9a0" />
      <rect x="6" y="4" width="1" height="1" fill="#2b1d16" />
      <rect x="9" y="4" width="1" height="1" fill="#2b1d16" />
      <rect x="7" y="5.5" width="2" height="0.5" fill="#d98a6e" />
      <rect x="4.5" y="6.5" width="7" height="1" fill="#3f8fd8" />
      <rect x="2.5" y="7.5" width="11" height="4" fill="#4aa3ea" />
      <rect x="1.5" y="8" width="1.5" height="2.5" fill="#f6c9a0" />
      <rect x="13" y="8" width="1.5" height="2.5" fill="#f6c9a0" />
      <rect x="3.5" y="7.5" width="9" height="4" fill="#8fb5d6" />
      <rect x="3.5" y="7.5" width="9" height="0.5" fill="#b6d2ea" />
      <rect x="7.5" y="9" width="1" height="1" fill="#e9f2fa" />
      <rect x="4.5" y="11.5" width="7" height="1.5" fill="#34425f" />
      <rect x="4.5" y="13" width="2.5" height="1" fill="#2a3450" />
      <rect x="9" y="13" width="2.5" height="1" fill="#2a3450" />
      <rect x="4" y="14" width="3" height="1" fill="#d6453a" />
      <rect x="9" y="14" width="3" height="1" fill="#d6453a" />
    </svg>
  );
}

function ProjectsIcon({ size = 56 }: IconProps) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7a53a" />
          <stop offset="1" stopColor="#ee8a22" />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd46a" />
          <stop offset="1" stopColor="#fbb13d" />
        </linearGradient>
      </defs>
      <path d="M5 14a4 4 0 0 1 4-4h14l5 5h27a4 4 0 0 1 4 4v28H5Z" fill={`url(#${id}b)`} />
      <rect x="5" y="20" width="54" height="36" rx="4" fill={`url(#${id}f)`} />
      <rect x="5" y="20" width="54" height="3" rx="1.5" fill="#fff" opacity="0.35" />
      <path d="m27 31-6 6 6 6M37 31l6 6-6 6M34 29l-4 16" stroke="#8a3fd1" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WritingIcon({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="12" y="5" width="42" height="54" rx="3" fill="#f7f8fb" />
      <rect x="12" y="5" width="42" height="54" rx="3" fill="none" stroke="#dfe3ea" />
      {[13, 22, 31, 40, 49].map((y) => (
        <g key={y}>
          <rect x="8" y={y} width="8" height="3.2" rx="1.6" fill="#ec4f8a" />
        </g>
      ))}
      <rect x="20" y="13" width="18" height="3" rx="1.5" fill="#9aa9bf" />
      <rect x="20" y="21" width="24" height="2.5" rx="1.25" fill="#c9d1dd" />
      <rect x="20" y="28" width="20" height="2.5" rx="1.25" fill="#c9d1dd" />
      <rect x="20" y="35" width="16" height="2.5" rx="1.25" fill="#c9d1dd" />
      <rect x="20" y="42" width="12" height="2.5" rx="1.25" fill="#c9d1dd" />
      <g transform="rotate(40 46 32)">
        <rect x="42" y="6" width="8" height="40" rx="1.5" fill="#f5a524" />
        <rect x="42" y="6" width="3" height="40" fill="#fbc75a" />
        <rect x="42" y="4" width="8" height="5" rx="1.5" fill="#ef6f6c" />
        <rect x="42" y="8.5" width="8" height="2.5" fill="#c9ced6" />
        <path d="M42 46h8l-4 8Z" fill="#f3d6b0" />
        <path d="M44.6 51.2h2.8L46 54Z" fill="#3b3b45" />
      </g>
    </svg>
  );
}

function BrewIcon({ size = 56 }: IconProps) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf3" />
          <stop offset="1" stopColor="#ecdccb" />
        </linearGradient>
      </defs>
      <path d="M25 4c-2 2.5 2 3.5 0 6M32 3c-2 2.5 2 3.5 0 6M39 4c-2 2.5 2 3.5 0 6" stroke="#e5893a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="31" cy="53" rx="26" ry="6.5" fill="#c9844d" />
      <ellipse cx="31" cy="51.5" rx="22" ry="4.5" fill="#dc9a60" />
      <path d="M50 26a8 8 0 0 1 0 16h-3" stroke="#eadbc9" strokeWidth="5" fill="none" />
      <path d="M10 20h42v14c0 11-9 18-21 18S10 45 10 34Z" fill={`url(#${id}c)`} />
      <ellipse cx="31" cy="20" rx="21" ry="5" fill="#f4e8da" />
      <ellipse cx="31" cy="20.5" rx="18" ry="3.6" fill="#5a2f1a" />
    </svg>
  );
}

function CinemaIcon({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <g transform="rotate(-10 8 22)">
        <rect x="6" y="12" width="52" height="10" rx="1.5" fill="#1f2735" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${12 + i * 12} 12h6l-5 10h-6Z`} fill="#f4f5f7" />
        ))}
      </g>
      <rect x="6" y="24" width="52" height="10" rx="1" fill="#1f2735" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${12 + i * 12} 24h6l-5 10h-6Z`} fill="#f4f5f7" />
      ))}
      <rect x="6" y="34" width="52" height="24" rx="3" fill="#243044" />
      <rect x="6" y="34" width="52" height="3" fill="#2f3d55" />
      <path d="m28 40 10 6-10 6Z" fill="#fff" />
    </svg>
  );
}

function CVIcon({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <path d="M11 4h34l8 8v48H11Z" fill="#f9fafc" />
      <path d="M45 4v8h8" fill="#dfe4ec" />
      <rect x="16" y="11" width="11" height="11" rx="1.5" fill="#b9d2ea" />
      <circle cx="21.5" cy="15.2" r="2.3" fill="#6f95bf" />
      <path d="M17.5 21c1-3 7-3 8 0" fill="#6f95bf" />
      <rect x="30" y="12" width="17" height="3" rx="1.5" fill="#4aaee6" />
      <rect x="30" y="18" width="12" height="2.5" rx="1.25" fill="#c8d0dc" />
      <rect x="16" y="27" width="32" height="3.5" rx="1.75" fill="#4aaee6" />
      <rect x="16" y="34" width="28" height="2.5" rx="1.25" fill="#c8d0dc" />
      <rect x="16" y="40" width="30" height="2.5" rx="1.25" fill="#c8d0dc" />
      <rect x="16" y="46" width="20" height="2.5" rx="1.25" fill="#c8d0dc" />
      <path d="m44 47 3 5 5-7" stroke="#f08a3a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="41" cy="52" r="2" fill="#ef5f8f" />
    </svg>
  );
}

function TerminalIcon({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="4" y="9" width="56" height="46" rx="5" fill="#9aa1ad" />
      <rect x="6" y="11" width="52" height="42" rx="3.5" fill="#161a24" />
      <path d="m15 24 9 7-9 7" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 40h14" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

function NowIcon({ size = 56 }: IconProps) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5fd0e6" />
          <stop offset="1" stopColor="#3aaec9" />
        </linearGradient>
      </defs>
      <rect x="5" y="7" width="54" height="50" rx="5" fill={`url(#${id}s)`} />
      <circle cx="46" cy="20" r="6" fill="#ffc53d" />
      <path d="M5 46 22 28l13 13 8-8 16 16v3a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5Z" fill="#2b8a9a" />
      <path d="M5 50 22 33l15 15 6-6 16 13v2a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5Z" fill="#23707f" opacity="0.8" />
    </svg>
  );
}

function GridIcon({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {[16, 32, 48].flatMap((y) => [16, 32, 48].map((x) => <circle key={`${x}${y}`} cx={x} cy={y} r="4.2" fill="#f4f1f3" />))}
    </svg>
  );
}

const iconMap: Record<string, (p: IconProps) => React.ReactElement> = {
  about: AboutIcon,
  projects: ProjectsIcon,
  writing: WritingIcon,
  blog: WritingIcon,
  brew: BrewIcon,
  cinema: CinemaIcon,
  cv: CVIcon,
  terminal: TerminalIcon,
  now: NowIcon,
  grid: GridIcon,
};

export function AppIcon({ icon, size = 56 }: { icon: string; size?: number }) {
  const Component = iconMap[icon] ?? ProjectsIcon;
  return <Component size={size} />;
}
