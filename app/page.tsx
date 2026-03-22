"use client";

import { useState, useCallback } from "react";
import { WindowManagerProvider } from "@/features/window-manager";
import { Desktop } from "@/components/Desktop";
import { LockScreen } from "@/components/LockScreen";

export default function Home() {
  const [locked, setLocked] = useState(true);

  const handleUnlock = useCallback(() => {
    setLocked(false);
  }, []);

  if (locked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  );
}
