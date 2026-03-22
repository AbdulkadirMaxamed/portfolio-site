"use client";

import { createContext, useReducer, useCallback, useEffect, type ReactNode } from "react";
import type {
  WindowId,
  WindowManagerState,
  WindowManagerAction,
  WindowAnimationState,
  WindowSize,
} from "./types";

const CASCADE_STEP = 30;
const TASKBAR_HEIGHT = 30;

function getResponsiveDefaults(): WindowSize {
  if (typeof window === "undefined") return { width: 700, height: 500 };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw < 640) return { width: vw - 16, height: vh - TASKBAR_HEIGHT - 60 };
  if (vw < 1024) return { width: Math.min(600, vw - 40), height: Math.min(450, vh - 80) };
  return { width: 700, height: 500 };
}

function getInitialPosition(windowCount: number): { x: number; y: number } {
  if (typeof window === "undefined") return { x: 60, y: 60 };
  const vw = window.innerWidth;
  if (vw < 640) return { x: 8, y: 8 };
  const offset = 40 + (windowCount % 6) * CASCADE_STEP;
  return { x: offset, y: offset };
}

function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } {
  if (typeof window === "undefined") return { x, y };
  const vw = window.innerWidth;
  const vh = window.innerHeight - TASKBAR_HEIGHT;
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
      if (existing) {
        let next = state;
        if (existing.isMinimized) {
          next = windowManagerReducer(next, { type: "RESTORE_WINDOW", payload: { id: action.payload.id } });
        }
        return windowManagerReducer(next, { type: "FOCUS_WINDOW", payload: { id: action.payload.id } });
      }

      const defaults = getResponsiveDefaults();
      const size = {
        width: action.payload.size?.width ?? defaults.width,
        height: action.payload.size?.height ?? defaults.height,
      };
      const pos = getInitialPosition(state.windows.length);

      return {
        ...state,
        windows: [
          ...state.windows,
          {
            id: action.payload.id,
            title: action.payload.title,
            icon: action.payload.icon,
            position: clampPosition(pos.x, pos.y, size.width, size.height),
            size,
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
      const clamped = clampPosition(
        action.payload.position.x,
        action.payload.position.y,
        win.size.width,
        win.size.height
      );
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id ? { ...w, position: clamped } : w
        ),
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
