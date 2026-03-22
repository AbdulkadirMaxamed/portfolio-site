"use client";

import { useWindowManager } from "@/features/window-manager";
import { Window } from "./Window";
import { WindowContentRenderer } from "./WindowContentRenderer";

export function WindowManager() {
  const { state } = useWindowManager();

  return (
    <>
      {state.windows.map((win) => (
        <Window key={win.id} window={win} isActive={state.activeWindowId === win.id}>
          <WindowContentRenderer contentType={win.contentType} />
        </Window>
      ))}
    </>
  );
}
