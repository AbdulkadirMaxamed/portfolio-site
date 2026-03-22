"use client";

import { useRef, useCallback, useEffect, type ReactNode, type MouseEvent, type TouchEvent } from "react";
import { useWindowManager } from "@/features/window-manager";
import type { WindowState } from "@/features/window-manager";

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  children: ReactNode;
}

export function Window({ window: win, isActive, children }: WindowProps) {
  const { closeWindow, removeWindow, focusWindow, minimizeWindow, moveWindow, setAnimationState } =
    useWindowManager();
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    function onAnimEnd() {
      if (win.animationState === "closing") {
        removeWindow(win.id);
      } else if (win.animationState === "opening" || win.animationState === "restoring" || win.animationState === "minimizing") {
        setAnimationState(win.id, "open");
      }
    }

    el.addEventListener("animationend", onAnimEnd);
    return () => el.removeEventListener("animationend", onAnimEnd);
  }, [win.animationState, win.id, removeWindow, setAnimationState]);

  const handleMouseDown = useCallback(() => {
    focusWindow(win.id);
  }, [focusWindow, win.id]);

  const handleTitleBarMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      focusWindow(win.id);

      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: win.position.x,
        origY: win.position.y,
      };

      function onMouseMove(ev: globalThis.MouseEvent) {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        moveWindow(win.id, dragRef.current.origX + dx, dragRef.current.origY + dy);
      }

      function onMouseUp() {
        dragRef.current = null;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [focusWindow, moveWindow, win.id, win.position.x, win.position.y]
  );

  const handleTitleBarTouchStart = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      focusWindow(win.id);

      dragRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        origX: win.position.x,
        origY: win.position.y,
      };

      function onTouchMove(ev: globalThis.TouchEvent) {
        if (!dragRef.current) return;
        const t = ev.touches[0];
        if (!t) return;
        ev.preventDefault();
        const dx = t.clientX - dragRef.current.startX;
        const dy = t.clientY - dragRef.current.startY;
        moveWindow(win.id, dragRef.current.origX + dx, dragRef.current.origY + dy);
      }

      function onTouchEnd() {
        dragRef.current = null;
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
      }

      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd);
    },
    [focusWindow, moveWindow, win.id, win.position.x, win.position.y]
  );

  function getAnimationClass(): string {
    switch (win.animationState) {
      case "opening":
        return "animate-win-open";
      case "closing":
        return "animate-win-close";
      case "minimizing":
        return "animate-win-minimize";
      case "restoring":
        return "animate-win-restore";
      default:
        return "";
    }
  }

  if (win.isMinimized && win.animationState === "open") return null;

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col ${getAnimationClass()}`}
      style={{
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
        willChange: "transform, opacity",
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="flex flex-col h-full overflow-hidden"
        style={{
          borderRadius: 12,
          boxShadow: isActive
            ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)"
            : "0 4px 16px rgba(0, 0, 0, 0.25), 0 1px 4px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Header bar */}
        <div
          className={`flex items-center h-9 px-3 select-none shrink-0 cursor-grab active:cursor-grabbing transition-opacity duration-150 ${
            isActive ? "opacity-100" : "opacity-70"
          }`}
          style={{ background: "#2d2d2d" }}
          onMouseDown={handleTitleBarMouseDown}
          onTouchStart={handleTitleBarTouchStart}
        >
          {/* Traffic light buttons — left side */}
          <div className="flex items-center gap-[7px] mr-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(win.id);
              }}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all duration-100 flex items-center justify-center group"
            >
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                stroke="#4a0000"
                strokeWidth="1.2"
              >
                <line x1="1" y1="1" x2="5" y2="5" />
                <line x1="5" y1="1" x2="1" y2="5" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(win.id);
              }}
              className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all duration-100 flex items-center justify-center group"
            >
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                stroke="#995700"
                strokeWidth="1.2"
              >
                <line x1="1" y1="3" x2="5" y2="3" />
              </svg>
            </button>
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all duration-100" />
          </div>

          {/* Title */}
          <div className="flex-1 flex items-center justify-center min-w-0">
            <span className="text-[13px] text-white/80 font-medium truncate">
              {win.title}
            </span>
          </div>

          {/* Spacer to balance the traffic lights */}
          <div className="w-[55px]" />
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto light-scrollbar" style={{ background: "#f5f5f5" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
