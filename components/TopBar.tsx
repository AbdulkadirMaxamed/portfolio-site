"use client";

import { useState, useEffect } from "react";
import { Icon } from "./ui/Icon";

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

  return (
    <span className="text-[14px] sm:text-[16px] text-white font-medium whitespace-pre">
      <span className="hidden sm:inline">{time}</span>
      <span className="sm:hidden">{time.split("  ")[1]}</span>
    </span>
  );
}

interface TopBarProps {
  onLock?: () => void;
  onActivities?: () => void;
  /** Lock-screen variant: no Activities button, slightly shorter */
  variant?: "desktop" | "lock";
}

export function TopBar({ onLock, onActivities, variant = "desktop" }: TopBarProps) {
  const isLock = variant === "lock";

  return (
    <div
      className={`relative flex items-center justify-between px-3 sm:px-6 shrink-0 select-none z-[9998] os-glass ${
        isLock ? "h-[35px]" : "h-10"
      }`}
      style={{ background: "var(--os-topbar)" }}
    >
      {/* Left: Activities */}
      <div className="flex items-center min-w-0 flex-1">
        {!isLock && (
          <button
            onClick={onActivities}
            className="text-[16.5px] text-white font-medium -ml-2 px-2 py-0.5 rounded-full hover:bg-white/10 transition-colors duration-150"
          >
            Activities
          </button>
        )}
      </div>

      {/* Center: Clock */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <TopBarClock />
      </div>

      {/* Right: System tray */}
      <div className="flex items-center gap-4 sm:gap-[26px] text-white">
        <Icon name="wifi" size={21} strokeWidth={2} className="hidden sm:block" />
        <Icon name="volume" size={21} strokeWidth={1.9} className="hidden sm:block" />
        <Icon name="battery" size={22} strokeWidth={1.8} className="hidden sm:block" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLock?.();
          }}
          className="hover:opacity-80 transition-opacity duration-150"
          title="Lock Screen"
          aria-label="Lock screen"
        >
          <Icon name="lock" size={20} strokeWidth={1.9} />
        </button>
      </div>
    </div>
  );
}
