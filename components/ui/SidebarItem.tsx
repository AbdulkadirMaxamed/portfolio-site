import type { ReactNode } from "react";

/** Sidebar navigation row shared by the app windows. */
export function SidebarItem({
  icon,
  label,
  active,
  onClick,
  trailing,
  tone = "dark",
  compact = false,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  trailing?: ReactNode;
  tone?: "dark" | "light";
  /** Icon-only rail mode used when the window is narrow (tablets) */
  compact?: boolean;
  className?: string;
}) {
  const base =
    tone === "dark"
      ? active
        ? "text-white"
        : "text-white/85 hover:bg-white/[0.06]"
      : active
        ? "text-[#1d1b20] font-semibold"
        : "text-[#3f3b3b] hover:bg-black/[0.04]";

  return (
    <button
      onClick={onClick}
      title={compact ? label : undefined}
      aria-label={compact ? label : undefined}
      className={`w-full flex items-center rounded-[9px] text-left transition-colors ${base} ${
        compact ? "justify-center !px-0 !gap-0" : "gap-[14px] px-[13px]"
      } ${className}`}
      style={
        active
          ? {
              background: tone === "dark" ? "var(--os-selected-dark)" : "#fbe0cf",
            }
          : undefined
      }
    >
      <span className="shrink-0 flex items-center justify-center w-6">{icon}</span>
      {!compact && <span className="flex-1 truncate">{label}</span>}
      {!compact && trailing}
    </button>
  );
}
