"use client";

import { AboutContent } from "./contents/AboutContent";
import { ProjectsContent } from "./contents/ProjectsContent";
import { BlogContent } from "./contents/BlogContent";
import { CVContent } from "./contents/CVContent";
import { BrewContent } from "./contents/BrewContent";
import { CinemaContent } from "./contents/CinemaContent";
import { NowContent } from "./contents/NowContent";
import { TerminalContent } from "./contents/TerminalContent";

interface WindowContentRendererProps {
  contentType: string;
}

const contentMap: Record<string, React.ComponentType> = {
  about: AboutContent,
  projects: ProjectsContent,
  writing: BlogContent,
  blog: BlogContent,
  cv: CVContent,
  brew: BrewContent,
  cinema: CinemaContent,
  now: NowContent,
  terminal: TerminalContent,
};

export function WindowContentRenderer({ contentType }: WindowContentRendererProps) {
  const Component = contentMap[contentType];

  if (!Component) {
    return (
      <div className="p-4 text-sm text-white/60 bg-[#1e181c] h-full">
        Unknown content type: {contentType}
      </div>
    );
  }

  return <Component />;
}
