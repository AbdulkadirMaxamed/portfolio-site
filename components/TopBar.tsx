"use client";

import { useState, useEffect } from "react";
import { useWindowManager } from "@/features/window-manager";

function TopBarClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }) +
          "  " +
          now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
      );
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-[13px] text-white/90 font-medium">{time}</span>;
}

export function TopBar() {
  const { state } = useWindowManager();

  const activeWindow = state.windows.find(
    (w) => w.id === state.activeWindowId && !w.isMinimized
  );

  return (
    <div
      className="h-8 flex items-center justify-between px-3 shrink-0 select-none z-[9998]"
      style={{ background: "#2d2d2d" }}
    >
      {/* Left: Activities */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <button className="text-[13px] text-white/80 hover:text-white font-medium transition-colors duration-150 px-2 py-0.5 rounded hover:bg-white/10">
          Activities
        </button>
        {activeWindow && (
          <span className="text-[13px] text-white/60 truncate">
            {activeWindow.title}
          </span>
        )}
      </div>

      {/* Center: Clock */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <TopBarClock />
      </div>

      {/* Right: System tray */}
      <div className="flex items-center gap-3 text-white/70">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
          <line x1="23" y1="10" x2="23" y2="14" />
        </svg>
        <button className="hover:text-white transition-colors duration-150">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}
