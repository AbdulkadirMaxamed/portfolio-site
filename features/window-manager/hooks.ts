"use client";

import { useContext } from "react";
import {
  WindowActionsContext,
  WindowManagerContext,
  type WindowManagerActions,
  type WindowManagerContextValue,
} from "./window-manager-context";

/** Window state + actions. Re-renders whenever any window changes. */
export function useWindowManager(): WindowManagerContextValue {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error("useWindowManager must be used within a WindowManagerProvider");
  }
  return ctx;
}

/** Actions only (stable) — use this when you don't need to read window state. */
export function useWindowActions(): WindowManagerActions {
  const ctx = useContext(WindowActionsContext);
  if (!ctx) {
    throw new Error("useWindowActions must be used within a WindowManagerProvider");
  }
  return ctx;
}
