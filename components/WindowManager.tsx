"use client";

import { memo } from "react";
import { useWindowManager } from "@/features/window-manager";
import { Window } from "./Window";
import { WindowContentRenderer } from "./WindowContentRenderer";

// Memoised so an app's contents only re-render when its own props/context change,
// not every time any window in the OS is opened, focused or moved.
const WindowContent = memo(WindowContentRenderer);

export function WindowManager() {
  const { state } = useWindowManager();

  return (
    <>
      {state.windows.map((win) => (
        <Window key={win.id} window={win} isActive={state.activeWindowId === win.id}>
          <WindowContent contentType={win.contentType} />
        </Window>
      ))}
    </>
  );
}
