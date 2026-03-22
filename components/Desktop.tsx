"use client";

import { useCallback, useState } from "react";
import { WindowManager } from "./WindowManager";
import { TopBar } from "./TopBar";
import { Dock } from "./Dock";
import { DesktopIcon } from "./DesktopIcon";

const desktopApps = [
  { id: "about", label: "About Me", icon: "👤", contentType: "about" },
  { id: "projects", label: "Projects", icon: "📁", contentType: "projects" },
  { id: "blog", label: "Blog", icon: "📝", contentType: "blog" },
  { id: "cv", label: "CV", icon: "📄", contentType: "cv", size: { width: 600, height: 550 } },
];

export function Desktop() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleDesktopClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  }, []);

  return (
    <div className="h-dvh w-screen flex flex-col overflow-hidden select-none animate-desktop-enter">
      {/* Top bar */}
      <TopBar />

      {/* Desktop area */}
      <div
        className="flex-1 relative"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a4a5e 75%, #1b6b6d 100%)",
        }}
        onClick={handleDesktopClick}
      >
        {/* Subtle noise/texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(72, 185, 199, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 208, 133, 0.2) 0%, transparent 50%)",
          }}
        />

        {/* Desktop icons */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {desktopApps.map((app) => (
            <DesktopIcon
              key={app.id}
              id={app.id}
              label={app.label}
              icon={app.icon}
              contentType={app.contentType}
              size={app.size}
              selected={selectedIcon === app.id}
              onSelect={setSelectedIcon}
            />
          ))}
        </div>

        {/* Windows */}
        <WindowManager />
      </div>

      {/* Dock */}
      <Dock />
    </div>
  );
}
