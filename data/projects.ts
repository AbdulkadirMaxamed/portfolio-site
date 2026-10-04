// Projects shown in the Projects file manager and the terminal `projects` command.

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
    id: "hooyos-recipe",
    name: "Hooyo's Recipe",
    stack: "React Router v7, Convex",
    description: "A web app built with React Router v7 and Convex. Currently in progress.",
    tags: ["React Router v7", "Convex"],
    links: {},
  },
  {
    id: "gradr",
    name: "Gradr",
    stack: "React Router v7, Convex",
    description:
      "An AI-powered platform that helps educators turn their teaching material into interactive assessments in minutes. Currently in progress.",
    tags: ["React Router v7", "Convex", "AI"],
    links: { open: "https://gradr.net/", demo: "https://gradr.net/" },
  },
  {
    id: "vivace",
    name: "Vivace",
    stack: "React Native",
    description: "A mobile app built with React Native. Currently in progress.",
    tags: ["React Native", "Mobile"],
    links: {},
  },
];
