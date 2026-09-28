"use client";

import { useCallback, useState } from "react";
import { WindowManager } from "./WindowManager";
import { TopBar } from "./TopBar";
import { Dock } from "./Dock";
import { DesktopIcon } from "./DesktopIcon";
import { Wallpaper } from "./Wallpaper";
import { AppGrid } from "./AppGrid";
import { desktopApps } from "@/lib/apps";

export function Desktop({ onLock }: { onLock: () => void }) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [showApps, setShowApps] = useState(false);

  const handleDesktopClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  }, []);

  const toggleApps = useCallback(() => setShowApps((v) => !v), []);
  const closeApps = useCallback(() => setShowApps(false), []);

  return (
    <div className="relative h-dvh w-full flex flex-col overflow-hidden select-none animate-desktop-enter">
      <Wallpaper />

      {/* Top bar */}
      <TopBar onLock={onLock} onActivities={toggleApps} />

      {/* Desktop area */}
      <div className="flex-1 relative" onClick={handleDesktopClick}>
        {/* Desktop icons — 3-column grid as in the design */}
        <div
          className="absolute top-[34px] left-[44px] grid grid-cols-3 gap-x-[13px] gap-y-[10px] max-sm:left-2 max-sm:top-3 max-sm:scale-90 max-sm:origin-top-left"
          onClick={handleDesktopClick}
        >
          {desktopApps.map((app) => (
            <DesktopIcon
              key={app.id}
              app={app}
              selected={selectedIcon === app.id}
              onSelect={setSelectedIcon}
            />
          ))}
        </div>

        {/* Windows */}
        <WindowManager />
      </div>

      {/* Dock */}
      <Dock onShowApps={toggleApps} />

      {showApps && <AppGrid onClose={closeApps} />}
    </div>
  );
}
