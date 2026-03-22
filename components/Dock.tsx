"use client";

import { useState, useCallback } from "react";
import { useWindowManager } from "@/features/window-manager";
import type { WindowSize } from "@/features/window-manager";

interface DockApp {
  id: string;
  label: string;
  icon: string;
  contentType: string;
  size?: Partial<WindowSize>;
}

const dockApps: DockApp[] = [
  { id: "about", label: "About Me", icon: "👤", contentType: "about" },
  { id: "projects", label: "Projects", icon: "📁", contentType: "projects" },
  { id: "blog", label: "Blog", icon: "📝", contentType: "blog" },
  { id: "cv", label: "CV", icon: "📄", contentType: "cv", size: { width: 600, height: 550 } },
];

function DockItem({ app }: { app: DockApp }) {
  const { state, openWindow, focusWindow, minimizeWindow, restoreWindow } =
    useWindowManager();
  const [hovered, setHovered] = useState(false);

  const win = state.windows.find((w) => w.id === app.id);
  const isOpen = !!win;
  const isActive = state.activeWindowId === app.id && !win?.isMinimized;

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
    <div className="relative flex flex-col items-center">
      {/* Tooltip */}
      {hovered && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1a1a1a] text-white text-xs rounded-md whitespace-nowrap shadow-lg pointer-events-none animate-lock-fade-in">
          {app.label}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#1a1a1a] rotate-45" />
        </div>
      )}

      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl transition-all duration-150 ${
          isActive
            ? "bg-white/15 scale-105"
            : "hover:bg-white/10 hover:scale-110 active:scale-95"
        }`}
      >
        {app.icon}
      </button>

      {/* Active indicator dot */}
      {isOpen && (
        <div
          className={`w-1 h-1 rounded-full mt-0.5 transition-colors duration-150 ${
            isActive ? "bg-[#48b9c7]" : "bg-white/40"
          }`}
        />
      )}
    </div>
  );
}

export function Dock() {
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998]">
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl"
        style={{
          background: "rgba(30, 30, 30, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        {dockApps.map((app) => (
          <DockItem key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
