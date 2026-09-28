// Projects shown in the Projects file manager and the terminal.
// PLACEHOLDER content — replace with your own work.

import { images } from "./images";

export interface Project {
  id: string;
  name: string;
  /** Short stack summary shown under the folder name */
  stack: string;
  description: string;
  tags: string[];
  image?: string;
  links: {
    open?: string;
    demo?: string;
    source?: string;
  };
}

export const projects: Project[] = [
  {
    id: "portfolio-os",
    name: "Portfolio OS",
    stack: "Next.js, TypeScript",
    description:
      "A retro desktop OS-style portfolio built with Next.js and TypeScript. A personal hub for my work, writing and experiments.",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
    image: images.projects.portfolioOs,
    links: { open: "#", demo: "#", source: "https://github.com/you/portfolio-os" },
  },
  {
    id: "task-manager",
    name: "Task Manager",
    stack: "React, Node.js",
    description: "A full-stack task management application with real-time collaboration.",
    tags: ["React", "Node.js", "PostgreSQL"],
    links: { demo: "#", source: "#" },
  },
  {
    id: "cli-tool",
    name: "CLI Tool",
    stack: "Rust",
    description: "A developer productivity CLI tool for scaffolding projects.",
    tags: ["Rust", "CLI"],
    links: { source: "#" },
  },
  {
    id: "ai-experiment",
    name: "AI Experiment",
    stack: "Python",
    description: "Small experiments with language models and embeddings.",
    tags: ["Python", "ML"],
    links: { source: "#" },
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    stack: "React Native",
    description: "A cross-platform mobile companion app.",
    tags: ["React Native", "Expo"],
    links: { demo: "#" },
  },
  {
    id: "open-source",
    name: "Open Source",
    stack: "TypeScript",
    description: "Contributions to open-source libraries and tooling.",
    tags: ["TypeScript", "OSS"],
    links: { source: "#" },
  },
];
