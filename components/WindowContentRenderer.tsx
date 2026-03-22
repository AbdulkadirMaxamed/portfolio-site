"use client";

import { AboutContent } from "./contents/AboutContent";
import { ProjectsContent } from "./contents/ProjectsContent";
import { BlogContent } from "./contents/BlogContent";
import { CVContent } from "./contents/CVContent";

interface WindowContentRendererProps {
  contentType: string;
}

const contentMap: Record<string, React.ComponentType> = {
  about: AboutContent,
  projects: ProjectsContent,
  blog: BlogContent,
  cv: CVContent,
};

export function WindowContentRenderer({ contentType }: WindowContentRendererProps) {
  const Component = contentMap[contentType];

  if (!Component) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Unknown content type: {contentType}
      </div>
    );
  }

  return <Component />;
}
