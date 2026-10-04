import type { WindowSize } from "@/features/window-manager";

export interface AppDefinition {
  /** Window id — one window per app */
  id: string;
  label: string;
  /** Key into WindowContentRenderer */
  contentType: string;
  /** Key into AppIcon */
  icon: string;
  /** Default window size, measured from the design mock-ups (1586×992 viewport) */
  size: WindowSize;
  /** Vertical offset of the window centre relative to the free desktop area */
  offsetY?: number;
}

export const apps: Record<string, AppDefinition> = {
  about: { id: "about", label: "About Me", contentType: "about", icon: "about", size: { width: 1160, height: 662 } },
  projects: { id: "projects", label: "Projects", contentType: "projects", icon: "projects", size: { width: 1096, height: 630 } },
  writing: { id: "writing", label: "Writing", contentType: "writing", icon: "writing", size: { width: 1338, height: 796 } },
  brew: { id: "brew", label: "Brew", contentType: "brew", icon: "brew", size: { width: 1020, height: 662 }, offsetY: -20 },
  cinema: { id: "cinema", label: "Cinema", contentType: "cinema", icon: "cinema", size: { width: 1086, height: 784 } },
  cv: { id: "cv", label: "CV", contentType: "cv", icon: "cv", size: { width: 1018, height: 810 } },
  terminal: { id: "terminal", label: "Terminal", contentType: "terminal", icon: "terminal", size: { width: 826, height: 754 } },
  now: { id: "now", label: "Now", contentType: "now", icon: "now", size: { width: 1040, height: 760 } },
};

/** Desktop icon grid, row by row (3 columns) — matches the design layout */
export const desktopApps: AppDefinition[] = [
  apps.about, apps.projects, apps.writing,
  apps.brew, apps.cinema, apps.cv,
  apps.terminal, apps.now,
];

/** Dock order — matches the design */
export const dockApps: AppDefinition[] = [
  apps.about, apps.projects, apps.writing, apps.brew, apps.cinema, apps.cv, apps.terminal, apps.now,
];
