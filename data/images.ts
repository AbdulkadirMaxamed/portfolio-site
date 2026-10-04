// ─────────────────────────────────────────────────────────────
// Central image registry.
// Every image used by the OS lives here so it can be swapped
// without touching component code. Files under /placeholders
// were cropped from the design mock-ups — replace them with
// your own photos/artwork (keep the same keys).
// ─────────────────────────────────────────────────────────────

export const images = {
  wallpaper: "/wallpapers/sunset-workspace.jpg",
  /** Pre-blurred copy for the lock screen (cheaper than a live CSS blur filter) */
  wallpaperBlurred: "/wallpapers/sunset-workspace-blur.jpg",

  // Your photo (source: new-design/profile_image.jpeg)
  avatar: "/profile/avatar.jpg",
  aboutHero: "/profile/about.jpg",

  // Project screenshots: add a path here and set `image` on the project in data/projects.ts
  projects: {} as Record<string, string>,

  writing: {
    hero: "/placeholders/post-hero.jpg",
    thumb1: "/placeholders/post-thumb-1.jpg",
    thumb2: "/placeholders/post-thumb-2.jpg",
    thumb3: "/placeholders/post-thumb-3.jpg",
    thumb4: "/placeholders/post-thumb-4.jpg",
  },

  coffee: {
    // Illustrated Nkora bag (no product photo exists online)
    currentBag: "/coffee/nkora-bag.svg",
  },

  films: {
    hero: "/placeholders/film-hero.jpg",
    pastLives: "/placeholders/still-past-lives.jpg",
    her: "/placeholders/still-her.jpg",
  },

  now: {
    building: "/placeholders/now-building.jpg",
    learning: "/placeholders/now-learning.jpg",
    reading: "/placeholders/now-reading.jpg",
    listening: "/placeholders/now-listening.jpg",
  },
} as const;
