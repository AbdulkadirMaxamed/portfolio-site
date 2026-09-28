"use client";

import { useCallback, useRef } from "react";
import { useWindowManager } from "@/features/window-manager";
import type { AppDefinition } from "@/lib/apps";
import { AppIcon } from "./AppIcons";

interface DesktopIconProps {
  app: AppDefinition;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function DesktopIcon({ app, selected, onSelect }: DesktopIconProps) {
  const { openWindow } = useWindowManager();
  const lastTapRef = useRef(0);

  const handleOpen = useCallback(() => {
    openWindow(app.id, app.label, app.icon, app.contentType, app.size);
  }, [openWindow, app]);

  const handleClick = useCallback(() => {
    onSelect(app.id);
  }, [onSelect, app.id]);

  // Touch double-tap detection
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTapRef.current < 350) {
        handleOpen();
        lastTapRef.current = 0;
      } else {
        onSelect(app.id);
        lastTapRef.current = now;
      }
    },
    [handleOpen, onSelect, app.id]
  );

  return (
    <button
      className={`flex flex-col items-center justify-start gap-[9px] w-[112px] h-[118px] pt-[6px] rounded-xl focus:outline-none touch-manipulation transition-colors duration-150 ${
        selected ? "bg-white/15" : "hover:bg-white/[0.07]"
      }`}
      onDoubleClick={handleOpen}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-[62px] h-[62px] flex items-center justify-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">
        <AppIcon icon={app.icon} size={app.icon === "about" ? 64 : 60} />
      </div>
      <span className="text-[16.5px] leading-tight text-white font-medium text-center text-shadow-desktop">
        {app.label}
      </span>
    </button>
  );
}
