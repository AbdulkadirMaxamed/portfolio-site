"use client";

import { useCallback } from "react";
import { useWindowActions } from "@/features/window-manager";
import { apps } from "./apps";

/** Open (or focus) another app by id — used for cross-app links like "See my work". */
export function useOpenApp() {
  const { openWindow } = useWindowActions();
  return useCallback(
    (id: keyof typeof apps | string) => {
      const app = apps[id];
      if (app) openWindow(app.id, app.label, app.icon, app.contentType, app.size);
    },
    [openWindow]
  );
}
