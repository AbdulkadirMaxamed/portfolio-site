"use client";

import { useEffect } from "react";
import { useWindowManager } from "@/features/window-manager";
import { dockApps } from "@/lib/apps";
import { AppIcon } from "./AppIcons";

/** GNOME-style "Show Applications" overlay (dock grid button / Activities) */
export function AppGrid({ onClose }: { onClose: () => void }) {
  const { openWindow } = useWindowManager();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9997] flex items-center justify-center os-glass animate-lock-fade-in"
      style={{ background: "rgba(12, 8, 16, 0.55)" }}
      onClick={onClose}
    >
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-10 gap-y-8 -translate-y-10" onClick={(e) => e.stopPropagation()}>
        {dockApps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              openWindow(app.id, app.label, app.icon, app.contentType, app.size);
              onClose();
            }}
            className="flex flex-col items-center gap-3 w-[112px] py-3 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <AppIcon icon={app.icon} size={72} />
            <span className="text-[15px] font-medium text-white text-shadow-desktop">{app.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
