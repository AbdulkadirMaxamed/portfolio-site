"use client";

import { useState, useCallback } from "react";
import { useWindowManager } from "@/features/window-manager";
import { dockApps, type AppDefinition } from "@/lib/apps";
import { AppIcon } from "./AppIcons";

function Tooltip({ label }: { label: string }) {
  return (
    <div className="[@media(hover:none)]:hidden absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1c1719]/95 text-white text-[13px] rounded-lg whitespace-nowrap shadow-lg pointer-events-none animate-lock-fade-in border border-white/10">
      {label}
    </div>
  );
}

function DockItem({ app }: { app: AppDefinition }) {
  const { state, openWindow, focusWindow, minimizeWindow, restoreWindow } =
    useWindowManager();
  const [hovered, setHovered] = useState(false);

  const win = state.windows.find((w) => w.id === app.id && w.animationState !== "closing");
  const isOpen = !!win;
  const isActive = state.activeWindowId === app.id && !!win && !win.isMinimized;

  const handleClick = useCallback(() => {
    if (!win) {
      openWindow(app.id, app.label, app.icon, app.contentType, app.size);
    } else if (win.isMinimized) {
      restoreWindow(app.id);
    } else if (isActive) {
      minimizeWindow(app.id);
    } else {
      focusWindow(app.id);
    }
  }, [win, isActive, app, openWindow, focusWindow, minimizeWindow, restoreWindow]);

  return (
    <div className="relative flex flex-col items-center w-[35px] sm:w-[62px] lg:w-[74px] shrink-0">
      {hovered && <Tooltip label={app.label} />}

      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={app.label}
        className={`w-[34px] h-[34px] sm:w-[52px] sm:h-[52px] lg:w-[56px] lg:h-[56px] rounded-[14px] flex items-center justify-center transition-all duration-150 ${
          isActive ? "bg-white/[0.13]" : "hover:bg-white/[0.08] active:scale-95"
        }`}
      >
        <span className="scale-[0.62] sm:scale-[0.88] lg:scale-100 drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]">
          <AppIcon icon={app.icon} size={48} />
        </span>
      </button>

      {/* Running indicator */}
      <div
        className={`w-[7px] h-[7px] rounded-full mt-[3px] transition-opacity duration-150 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "var(--os-dot)" }}
      />
    </div>
  );
}

export function Dock({ onShowApps }: { onShowApps: () => void }) {
  const [gridHovered, setGridHovered] = useState(false);

  return (
    <div className="fixed bottom-[18px] sm:bottom-[32px] left-1/2 -translate-x-1/2 z-[9998] max-w-[calc(100vw-16px)]">
      <div
        className="flex items-center px-1.5 sm:pl-3 sm:pr-4 pt-[8px] pb-[4px] sm:pt-[14px] sm:pb-[8px] rounded-[18px] sm:rounded-[24px] os-glass"
        style={{
          background: "var(--os-dock)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="relative flex flex-col items-center w-[35px] sm:w-[62px] lg:w-[74px] shrink-0">
          {gridHovered && <Tooltip label="Show Applications" />}
          <button
            onClick={onShowApps}
            onMouseEnter={() => setGridHovered(true)}
            onMouseLeave={() => setGridHovered(false)}
            aria-label="Show applications"
            className="w-[34px] h-[34px] sm:w-[52px] sm:h-[52px] lg:w-[56px] lg:h-[56px] rounded-[14px] flex items-center justify-center hover:bg-white/[0.08] transition-colors"
          >
            <span className="scale-[0.62] sm:scale-[0.88] lg:scale-100"><AppIcon icon="grid" size={44} /></span>
          </button>
          <div className="w-[7px] h-[7px] mt-[3px]" />
        </div>

        {dockApps.map((app) => (
          <DockItem key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
