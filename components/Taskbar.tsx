"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useWindowManager } from "@/features/window-manager";

function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function updateTime() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-[11px] text-black whitespace-nowrap">{time}</span>;
}

function StartMenu({ onClose }: { onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: globalThis.MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute bottom-[30px] left-0 w-[200px] bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] shadow-[2px_2px_0_0_#000] z-[9999] animate-win-open"
    >
      {/* Blue sidebar */}
      <div className="flex">
        <div className="w-[24px] bg-gradient-to-b from-[#000080] to-[#1084d0] flex items-end justify-center py-2">
          <span className="text-white text-[10px] font-bold [writing-mode:vertical-lr] rotate-180 tracking-widest">
            Portfolio OS
          </span>
        </div>

        <div className="flex-1 py-1">
          {[
            { icon: "👤", label: "About Me" },
            { icon: "📁", label: "Projects" },
            { icon: "📝", label: "Blog" },
            { icon: "📄", label: "CV" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-2 w-full px-3 py-[6px] text-[12px] text-left hover:bg-[#000080] hover:text-white"
              onClick={() => onClose()}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div className="mx-2 my-1 border-t border-t-[#808080] border-b border-b-white" />

          <button className="flex items-center gap-2 w-full px-3 py-[6px] text-[12px] text-left hover:bg-[#000080] hover:text-white">
            <span>🔌</span>
            <span>Shut Down...</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function Taskbar() {
  const { state, focusWindow, restoreWindow, minimizeWindow } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);

  const handleTaskClick = useCallback(
    (id: string) => {
      const win = state.windows.find((w) => w.id === id);
      if (!win) return;

      if (win.isMinimized) {
        restoreWindow(id);
      } else if (state.activeWindowId === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [state.windows, state.activeWindowId, focusWindow, restoreWindow, minimizeWindow]
  );

  const toggleStart = useCallback(() => {
    setStartOpen((prev) => !prev);
  }, []);

  const closeStart = useCallback(() => {
    setStartOpen(false);
  }, []);

  return (
    <div className="relative h-[30px] bg-[#c0c0c0] border-t-2 border-t-white flex items-center px-[2px] gap-[2px] shrink-0 z-[9998]">
      {startOpen && <StartMenu onClose={closeStart} />}

      {/* Start button */}
      <button
        onClick={toggleStart}
        className={`h-[22px] px-1 sm:px-2 flex items-center gap-1 bg-[#c0c0c0] text-xs font-bold select-none shrink-0 border-2 ${
          startOpen
            ? "border-t-[#404040] border-l-[#404040] border-b-white border-r-white"
            : "border-t-white border-l-white border-b-[#404040] border-r-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white"
        }`}
      >
        <span className="text-sm">🪟</span>
        <span className="hidden sm:inline">Start</span>
      </button>

      {/* Separator */}
      <div className="w-px h-5 bg-[#808080] mx-[2px] shrink-0" />

      {/* Window buttons */}
      <div className="flex-1 flex items-center gap-[2px] overflow-hidden min-w-0">
        {state.windows.map((win) => (
          <button
            key={win.id}
            onClick={() => handleTaskClick(win.id)}
            className={`h-[22px] min-w-[32px] max-w-[140px] sm:max-w-[160px] px-1 sm:px-2 flex items-center gap-1 text-[11px] truncate border-2 select-none transition-colors duration-75 ${
              state.activeWindowId === win.id && !win.isMinimized
                ? "bg-white border-t-[#404040] border-l-[#404040] border-b-white border-r-white font-bold"
                : "bg-[#c0c0c0] border-t-white border-l-white border-b-[#404040] border-r-[#404040]"
            }`}
          >
            <span className="text-xs shrink-0">{win.icon}</span>
            <span className="truncate hidden xs:inline sm:inline">{win.title}</span>
          </button>
        ))}
      </div>

      {/* System tray */}
      <div className="h-[22px] px-1 sm:px-2 flex items-center gap-1 sm:gap-2 border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white shrink-0">
        <span className="text-xs hidden sm:inline">🔊</span>
        <Clock />
      </div>
    </div>
  );
}
