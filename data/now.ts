// "Now" page cards. PLACEHOLDER content — replace with what you're up to.

import { images } from "./images";

export type NowAccent = "orange" | "blue" | "green" | "purple" | "amber" | "red";

export interface NowCard {
  id: string;
  label: string;
  icon: "laptop" | "graduation" | "book" | "clapper" | "coffee" | "headphones";
  accent: NowAccent;
  image?: string;
  title: string;
  description?: string;
  byline?: string;
  /** 0–100 */
  progress?: number;
  /** Extra line under the progress bar */
  footnote?: string;
  /** Renders the "Currently brewing" pill */
  status?: string;
  /** Renders an audio equaliser */
  equaliser?: boolean;
}

export const nowTagline = "A little progress each day adds up to big things.";

export const nowCards: NowCard[] = [
  {
    id: "building",
    label: "Building",
    icon: "laptop",
    accent: "orange",
    image: images.now.building,
    title: "Portfolio OS",
    description: "A retro desktop OS-style portfolio built with Next.js and TypeScript.",
    progress: 70,
  },
  {
    id: "learning",
    label: "Learning",
    icon: "graduation",
    accent: "blue",
    image: images.now.learning,
    title: "System design & distributed systems",
    description: "Studying architectures, scaling patterns, and real-world trade-offs.",
    progress: 60,
  },
  {
    id: "reading",
    label: "Reading",
    icon: "book",
    accent: "red",
    image: images.now.reading,
    title: "Designing Distributed Systems",
    byline: "by Brendan Burns",
    progress: 40,
    footnote: "Chapter 4 — Consistency Models",
  },
  {
    id: "watching",
    label: "Watching",
    icon: "clapper",
    accent: "purple",
    title: "The X-Men films",
    description: "Working through the whole saga in release order.",
  },
  {
    id: "drinking",
    label: "Drinking",
    icon: "coffee",
    accent: "amber",
    image: images.coffee.currentBag,
    title: "Nkora",
    description: "Colombian  •  Espresso  •  Barista Express",
    status: "Currently brewing",
  },
  {
    id: "listening",
    label: "Listening",
    icon: "headphones",
    accent: "red",
    image: images.now.listening,
    title: "Focus Mix",
    description: "Lo-fi, ambient, and cinematic for deep work.",
    equaliser: true,
  },
];
