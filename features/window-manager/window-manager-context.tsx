"use client";

import { createContext, useReducer, useCallback, useEffect, type ReactNode } from "react";
import type {
  WindowId,
  WindowManagerState,
  WindowManagerAction,
  WindowAnimationState,
  WindowSize,
} from "./types";

const CASCADE_STEP = 28;
/** Height of the GNOME-style top bar (desktop area starts below it) */
export const TOP_BAR_HEIGHT = 40;
/** Space reserved at the bottom of the desktop for the dock when centring windows */
export const DOCK_RESERVE = 92;
/**
 * Windows may not extend further down than this distance from the bottom of
 * the desktop area, so their content never disappears behind the dock.
 * (The design lets windows overlap the dock by ~12px.)
 */
const DOCK_CLEARANCE = 112;
const EDGE_GAP = 8;

function getDesktopArea(): { width: number; height: number } {
  if (typeof window === "undefined") return { width: 1586, height: 952 };
  return { width: window.innerWidth, height: window.innerHeight - TOP_BAR_HEIGHT };
}

/** Fit a preferred (design) size into the current desktop area. */
function fitSize(preferred: WindowSize): WindowSize {
  const area = getDesktopArea();
  if (area.width < 640) return { width: area.width - 16, height: area.height - DOCK_RESERVE };
  const width = Math.min(preferred.width, area.width - 24);
  // A window narrower than its design width reflows taller, so let it grow
  // (useful on portrait tablets) — still capped so it stays clear of the dock.
  const reflowHeight = preferred.height * Math.min(1.6, preferred.width / width);
  return {
    width,
    height: Math.max(320, Math.min(Math.round(reflowHeight), area.height - EDGE_GAP - DOCK_CLEARANCE)),
  };
}

/** Centre a window in the free desktop area (above the dock), with an optional cascade offset. */
function centredPosition(size: WindowSize, cascade = 0): { x: number; y: number } {
  const area = getDesktopArea();
  if (area.width < 640) return { x: 8, y: 8 };
  const offset = (cascade % 5) * CASCADE_STEP;
  const maxX = Math.max(EDGE_GAP, area.width - size.width - EDGE_GAP);
  const maxY = Math.max(EDGE_GAP, area.height - DOCK_CLEARANCE - size.height);
  const x = Math.round((area.width - size.width) / 2) + offset;
  const y = Math.max(EDGE_GAP, Math.round((area.height - DOCK_RESERVE - size.height) / 2)) + offset;
  return { x: Math.min(x, maxX), y: Math.min(y, maxY) };
}

/** Keep an existing (possibly user-moved) window fully reachable after a viewport change. */
function keepInside(pos: { x: number; y: number }, size: WindowSize): { x: number; y: number } {
  const area = getDesktopArea();
  return {
    x: Math.max(0, Math.min(pos.x, area.width - size.width)),
    y: Math.max(0, Math.min(pos.y, area.height - size.height)),
  };
}

function clampPosition(
  x: number,
  y: number,
  width: number
): { x: number; y: number } {
  if (typeof window === "undefined") return { x, y };
  const vw = window.innerWidth;
  const vh = window.innerHeight - TOP_BAR_HEIGHT;
  const minVisible = 80;
  return {
    x: Math.max(-width + minVisible, Math.min(x, vw - minVisible)),
    y: Math.max(0, Math.min(y, vh - 30)),
  };
}

const initialState: WindowManagerState = {
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,
};

function findNextActiveId(windows: { id: WindowId; zIndex: number; isMinimized: boolean }[], excludeId?: WindowId): WindowId | null {
  return windows
    .filter((w) => !w.isMinimized && w.id !== excludeId)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;
}

function windowManagerReducer(
  state: WindowManagerState,
  action: WindowManagerAction
): WindowManagerState {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const existing = state.windows.find((w) => w.id === action.payload.id);
      if (existing && existing.animationState === "closing") {
        // Re-opened while its close animation was still running: revive it
        return {
          ...state,
          windows: state.windows.map((w) =>
            w.id === existing.id
              ? (() => {
                  const size = fitSize(w.preferredSize);
                  return {
                    ...w,
                    size,
                    position: centredPosition(size),
                    userMoved: false,
                    animationState: "opening" as const,
                    isMinimized: false,
                    zIndex: state.nextZIndex,
                  };
                })()
              : w
          ),
          activeWindowId: existing.id,
          nextZIndex: state.nextZIndex + 1,
        };
      }
      if (existing) {
        let next = state;
        if (existing.isMinimized) {
          next = windowManagerReducer(next, { type: "RESTORE_WINDOW", payload: { id: action.payload.id } });
        }
        return windowManagerReducer(next, { type: "FOCUS_WINDOW", payload: { id: action.payload.id } });
      }

      const preferredSize: WindowSize = {
        width: action.payload.size?.width ?? 900,
        height: action.payload.size?.height ?? 600,
      };
      const size = fitSize(preferredSize);
      const visibleCount = state.windows.filter((w) => !w.isMinimized && w.animationState !== "closing").length;
      const pos = centredPosition(size, visibleCount);

      return {
        ...state,
        windows: [
          ...state.windows,
          {
            id: action.payload.id,
            title: action.payload.title,
            icon: action.payload.icon,
            position: pos,
            size,
            preferredSize,
            userMoved: false,
            zIndex: state.nextZIndex,
            isMinimized: false,
            animationState: "opening",
            contentType: action.payload.contentType,
          },
        ],
        activeWindowId: action.payload.id,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "CLOSE_WINDOW": {
      // Start close animation — actual removal happens via REMOVE_WINDOW
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id ? { ...w, animationState: "closing" as const } : w
        ),
        activeWindowId:
          state.activeWindowId === action.payload.id
            ? findNextActiveId(state.windows, action.payload.id)
            : state.activeWindowId,
      };
    }

    case "REMOVE_WINDOW": {
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.payload.id),
      };
    }

    case "FOCUS_WINDOW": {
      if (state.activeWindowId === action.payload.id) return state;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id ? { ...w, zIndex: state.nextZIndex } : w
        ),
        activeWindowId: action.payload.id,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "MINIMIZE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id ? { ...w, animationState: "minimizing" as const } : w
        ),
        activeWindowId:
          state.activeWindowId === action.payload.id
            ? findNextActiveId(state.windows, action.payload.id)
            : state.activeWindowId,
      };
    }

    case "RESTORE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMinimized: false, animationState: "restoring" as const, zIndex: state.nextZIndex }
            : w
        ),
        activeWindowId: action.payload.id,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "SET_ANIMATION_STATE": {
      // When minimize animation finishes, mark as actually minimized
      if (action.payload.animationState === "open") {
        const win = state.windows.find((w) => w.id === action.payload.id);
        const shouldMinimize = win?.animationState === "minimizing";
        return {
          ...state,
          windows: state.windows.map((w) =>
            w.id === action.payload.id
              ? { ...w, animationState: "open", isMinimized: shouldMinimize ? true : w.isMinimized }
              : w
          ),
        };
      }
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id ? { ...w, animationState: action.payload.animationState } : w
        ),
      };
    }

    case "MOVE_WINDOW": {
      const win = state.windows.find((w) => w.id === action.payload.id);
      if (!win) return state;
      const clamped = clampPosition(action.payload.position.x, action.payload.position.y, win.size.width);
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id ? { ...w, position: clamped, userMoved: true } : w
        ),
      };
    }

    case "FIT_TO_VIEWPORT": {
      // Viewport resized / tablet rotated: re-fit every window to the new desktop area.
      return {
        ...state,
        windows: state.windows.map((w) => {
          const size = fitSize(w.preferredSize);
          const position = w.userMoved ? keepInside(w.position, size) : centredPosition(size);
          return { ...w, size, position };
        }),
      };
    }

    case "CLOSE_ACTIVE_WINDOW": {
      if (!state.activeWindowId) return state;
      return windowManagerReducer(state, {
        type: "CLOSE_WINDOW",
        payload: { id: state.activeWindowId },
      });
    }

    default:
      return state;
  }
}

export interface WindowManagerContextValue {
  state: WindowManagerState;
  openWindow: (id: WindowId, title: string, icon: string, contentType: string, size?: Partial<WindowSize>) => void;
  closeWindow: (id: WindowId) => void;
  removeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, x: number, y: number) => void;
  setAnimationState: (id: WindowId, animationState: WindowAnimationState) => void;
}

export const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowManagerReducer, initialState);

  const openWindow = useCallback(
    (id: WindowId, title: string, icon: string, contentType: string, size?: Partial<WindowSize>) =>
      dispatch({ type: "OPEN_WINDOW", payload: { id, title, icon, contentType, size } }),
    []
  );

  const closeWindow = useCallback(
    (id: WindowId) => dispatch({ type: "CLOSE_WINDOW", payload: { id } }),
    []
  );

  const removeWindow = useCallback(
    (id: WindowId) => dispatch({ type: "REMOVE_WINDOW", payload: { id } }),
    []
  );

  const focusWindow = useCallback(
    (id: WindowId) => dispatch({ type: "FOCUS_WINDOW", payload: { id } }),
    []
  );

  const minimizeWindow = useCallback(
    (id: WindowId) => dispatch({ type: "MINIMIZE_WINDOW", payload: { id } }),
    []
  );

  const restoreWindow = useCallback(
    (id: WindowId) => dispatch({ type: "RESTORE_WINDOW", payload: { id } }),
    []
  );

  const moveWindow = useCallback(
    (id: WindowId, x: number, y: number) =>
      dispatch({ type: "MOVE_WINDOW", payload: { id, position: { x, y } } }),
    []
  );

  const setAnimationState = useCallback(
    (id: WindowId, animationState: WindowAnimationState) =>
      dispatch({ type: "SET_ANIMATION_STATE", payload: { id, animationState } }),
    []
  );

  useEffect(() => {
    let frame = 0;
    function handleResize() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => dispatch({ type: "FIT_TO_VIEWPORT" }));
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        dispatch({ type: "CLOSE_ACTIVE_WINDOW" });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        state,
        openWindow,
        closeWindow,
        removeWindow,
        focusWindow,
        minimizeWindow,
        restoreWindow,
        moveWindow,
        setAnimationState,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}
