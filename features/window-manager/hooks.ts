"use client";

import { useContext } from "react";
import { WindowManagerContext, type WindowManagerContextValue } from "./window-manager-context";

export function useWindowManager(): WindowManagerContextValue {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error("useWindowManager must be used within a WindowManagerProvider");
  }
  return ctx;
}
