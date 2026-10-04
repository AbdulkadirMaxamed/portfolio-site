// Personal profile — PLACEHOLDER content taken from the design mock-ups.
// Replace with your own details.

import { images } from "./images";

export interface Social {
  label: string;
  href: string;
  display: string;
  kind: "email" | "phone" | "location" | "linkedin" | "github" | "web";
}

export interface CurrentlyItem {
  label: string;
  title: string;
  subtitle: string;
  icon: "coffee" | "laptop" | "book";
}

export interface Profile {
  name: string;
  role: string;
  /** Short line under the avatar on the lock screen */
  lockTagline: string;
  avatar: string;
  about: {
    greeting: string;
    headline: string;
    intro: string;
    heroImage: string;
    url: string;
  };
  currently: CurrentlyItem[];
  email: string;
  socials: Social[];
}

export const profile: Profile = {
  name: "Abdulkadir Maxamed",
  role: "Software Engineer",
  lockTagline: "Full-stack developer",
  avatar: images.avatar,
  about: {
    greeting: "Hey, I'm",
    headline: "A full-stack developer who loves building things (and good coffee).",
    intro:
      "I build web applications with a focus on great user experience and real-world impact. I care about clean code, useful products, and continuous learning, always exploring new tools and ideas to make things better.",
    heroImage: images.aboutHero,
    url: "https://portfolio.local/about",
  },
  currently: [
    { label: "Currently drinking", title: "Nkora", subtitle: "Colombian · Espresso", icon: "coffee" },
    { label: "Currently building", title: "Hooyo's Recipe", subtitle: "(ask me about it!)", icon: "laptop" },
    { label: "Currently learning", title: "System design", subtitle: "and distributed systems", icon: "book" },
  ],
  email: "abdulkadir.q12@gmail.com",
  socials: [
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/AbdulkadirMaxamed",
      display: "github.com/AbdulkadirMaxamed",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdulkadir-maxamed/",
      display: "linkedin.com/in/abdulkadir-maxamed",
    },
  ],
};
