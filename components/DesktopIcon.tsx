"use client";

import { useCallback, useRef } from "react";
import { useWindowManager } from "@/features/window-manager";
import type { WindowSize } from "@/features/window-manager";

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string;
  contentType: string;
  size?: Partial<WindowSize>;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function DesktopIcon({ id, label, icon, contentType, size, selected, onSelect }: DesktopIconProps) {
  const { openWindow } = useWindowManager();
  const lastTapRef = useRef(0);

  const handleOpen = useCallback(() => {
    openWindow(id, label, icon, contentType, size);
  }, [openWindow, id, label, icon, contentType, size]);

  const handleDoubleClick = useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  const handleClick = useCallback(() => {
    onSelect(id);
  }, [onSelect, id]);

  // Touch double-tap detection
  const handleTouchEnd = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      handleOpen();
      lastTapRef.current = 0;
    } else {
      onSelect(id);
      lastTapRef.current = now;
    }
  }, [handleOpen, onSelect, id]);

  return (
    <button
      className="flex flex-col items-center gap-1 w-[75px] p-1 rounded-sm focus:outline-none group touch-manipulation"
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`text-3xl w-12 h-12 flex items-center justify-center transition-colors duration-75 ${
          selected ? "bg-[#000080]/30 outline outline-1 outline-dashed outline-white" : ""
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-[11px] text-center leading-tight px-[2px] transition-colors duration-75 ${
          selected
            ? "bg-[#000080] text-white"
            : "text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.8)]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
