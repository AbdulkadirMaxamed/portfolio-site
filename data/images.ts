// ─────────────────────────────────────────────────────────────
// Central image registry.
// Every image used by the OS lives here so it can be swapped
// without touching component code. Files under /placeholders
// were cropped from the design mock-ups — replace them with
// your own photos/artwork (keep the same keys).
// ─────────────────────────────────────────────────────────────

export const images = {
  wallpaper: "/wallpapers/sunset-workspace.jpg",

  avatar: "/placeholders/avatar.jpg",
  aboutHero: "/placeholders/about-hero.jpg",

  projects: {
    portfolioOs: "/placeholders/project-portfolio-os.jpg",
  },

  writing: {
    hero: "/placeholders/post-hero.jpg",
    thumb1: "/placeholders/post-thumb-1.jpg",
    thumb2: "/placeholders/post-thumb-2.jpg",
    thumb3: "/placeholders/post-thumb-3.jpg",
    thumb4: "/placeholders/post-thumb-4.jpg",
  },

  coffee: {
    currentBag: "/placeholders/coffee-bag.jpg",
  },

  films: {
    hero: "/placeholders/film-hero.jpg",
    interstellar: "/placeholders/poster-interstellar.jpg",
    darkKnight: "/placeholders/poster-dark-knight.jpg",
    inception: "/placeholders/poster-inception.jpg",
    spiritedAway: "/placeholders/poster-spirited-away.jpg",
    dune: "/placeholders/still-dune.jpg",
    pastLives: "/placeholders/still-past-lives.jpg",
    her: "/placeholders/still-her.jpg",
  },

  now: {
    building: "/placeholders/now-building.jpg",
    learning: "/placeholders/now-learning.jpg",
    reading: "/placeholders/now-reading.jpg",
    watching: "/placeholders/now-watching.jpg",
    drinking: "/placeholders/now-drinking.jpg",
    listening: "/placeholders/now-listening.jpg",
  },
} as const;
