"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
} from "react";
import { useWindowManager } from "@/features/window-manager";
import type { WindowState } from "@/features/window-manager";

// ── Chrome context ─────────────────────────────────────────────
// The window frame owns drag/focus/close/minimise. Each app draws its
// own header (browser tabs, file-manager bar, sidebar, …) and uses
// <DragRegion> + <TrafficLights> to hook into that behaviour.

interface WindowChrome {
  id: string;
  title: string;
  isActive: boolean;
  /** Current (viewport-fitted) window size — apps adapt their layout to this */
  width: number;
  height: number;
  close: () => void;
  minimize: () => void;
  onDragMouseDown: (e: MouseEvent) => void;
  onDragTouchStart: (e: TouchEvent) => void;
}

const WindowChromeContext = createContext<WindowChrome | null>(null);

export function useWindowChrome(): WindowChrome {
  const ctx = useContext(WindowChromeContext);
  if (!ctx) throw new Error("useWindowChrome must be used inside a <Window>");
  return ctx;
}

const NO_DRAG_SELECTOR = "button, a, input, textarea, select, [data-no-drag]";

function isInteractive(target: EventTarget | null): boolean {
  return target instanceof Element && !!target.closest(NO_DRAG_SELECTOR);
}

/** Any element that should move the window when dragged (title bars, sidebars headers…) */
export function DragRegion({ children, className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  const { onDragMouseDown, onDragTouchStart } = useWindowChrome();
  return (
    <div className={`select-none ${className}`} onMouseDown={onDragMouseDown} onTouchStart={onDragTouchStart} {...rest}>
      {children}
    </div>
  );
}

/** Close / minimise / zoom buttons */
export function TrafficLights({ className = "" }: { className?: string }) {
  const { close, minimize, isActive } = useWindowChrome();
  return (
    <div className={`flex items-center gap-[9px] group/tl ${className}`} data-no-drag>
      <button
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        className={`w-[13px] h-[13px] rounded-full flex items-center justify-center transition-colors ${
          isActive ? "bg-[#ff5f57]" : "bg-white/25"
        } group-hover/tl:bg-[#ff5f57]`}
      >
        <svg width="7" height="7" viewBox="0 0 6 6" className="opacity-0 group-hover/tl:opacity-100" stroke="#4a0000" strokeWidth="1.2">
          <line x1="1" y1="1" x2="5" y2="5" />
          <line x1="5" y1="1" x2="1" y2="5" />
        </svg>
      </button>
      <button
        aria-label="Minimise"
        onClick={(e) => {
          e.stopPropagation();
          minimize();
        }}
        className={`w-[13px] h-[13px] rounded-full flex items-center justify-center transition-colors ${
          isActive ? "bg-[#febc2e]" : "bg-white/25"
        } group-hover/tl:bg-[#febc2e]`}
      >
        <svg width="7" height="7" viewBox="0 0 6 6" className="opacity-0 group-hover/tl:opacity-100" stroke="#995700" strokeWidth="1.2">
          <line x1="1" y1="3" x2="5" y2="3" />
        </svg>
      </button>
      <span
        className={`w-[13px] h-[13px] rounded-full transition-colors ${
          isActive ? "bg-[#28c840]" : "bg-white/25"
        } group-hover/tl:bg-[#28c840]`}
      />
    </div>
  );
}

// ── Window frame ───────────────────────────────────────────────

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

    let settled = false;
    function settle() {
      if (settled) return;
      settled = true;
      if (win.animationState === "closing") {
        removeWindow(win.id);
      } else if (win.animationState === "opening" || win.animationState === "restoring" || win.animationState === "minimizing") {
        setAnimationState(win.id, "open");
      }
    }

    function onAnimEnd(e: AnimationEvent) {
      if (e.target === el) settle();
    }

    el.addEventListener("animationend", onAnimEnd);
    // Fallback: browsers pause CSS animations in background tabs, so make sure
    // transitions still complete even if `animationend` never fires.
    const fallback = win.animationState === "open" ? undefined : setTimeout(settle, 400);
    return () => {
      el.removeEventListener("animationend", onAnimEnd);
      clearTimeout(fallback);
    };
  }, [win.animationState, win.id, removeWindow, setAnimationState]);

  const handleMouseDown = useCallback(() => {
    focusWindow(win.id);
  }, [focusWindow, win.id]);

  const handleTitleBarMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button !== 0 || isInteractive(e.target)) return;
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
      if (!touch || isInteractive(e.target)) return;
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

  const chrome = useMemo<WindowChrome>(
    () => ({
      id: win.id,
      title: win.title,
      isActive,
      width: win.size.width,
      height: win.size.height,
      close: () => closeWindow(win.id),
      minimize: () => minimizeWindow(win.id),
      onDragMouseDown: handleTitleBarMouseDown,
      onDragTouchStart: handleTitleBarTouchStart,
    }),
    [win.id, win.title, isActive, win.size.width, win.size.height, closeWindow, minimizeWindow, handleTitleBarMouseDown, handleTitleBarTouchStart]
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
      <WindowChromeContext.Provider value={chrome}>
        <div
          className="os-window flex flex-col h-full overflow-hidden"
          data-active={isActive || undefined}
        >
          {children}
        </div>
      </WindowChromeContext.Provider>
    </div>
  );
}
