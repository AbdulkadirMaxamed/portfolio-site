"use client";

interface Project {
  name: string;
  description: string;
  tech: string[];
  icon: string;
}

const projects: Project[] = [
  {
    name: "Portfolio OS",
    description: "A retro desktop OS-style portfolio built with Next.js and TypeScript.",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    icon: "🖥️",
  },
  {
    name: "Task Manager",
    description: "A full-stack task management application with real-time updates.",
    tech: ["React", "Node.js", "PostgreSQL"],
    icon: "📋",
  },
  {
    name: "CLI Tool",
    description: "A developer productivity CLI tool for scaffolding projects.",
    tech: ["Rust", "CLI"],
    icon: "⚡",
  },
];

export function ProjectsContent() {
  return (
    <div className="p-2 font-[Arial] text-[13px] text-black">
      {/* Toolbar */}
      <div className="flex items-center gap-1 mb-2 px-1">
        <span className="text-[11px] text-[#808080]">📁 C:\Users\Projects</span>
      </div>

      <div className="border border-t-[#808080] border-l-[#808080] border-b-white border-r-white mb-2" />

      {/* Project list */}
      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex gap-3 p-2 hover:bg-[#000080] hover:text-white group cursor-pointer border border-transparent hover:border-[#000080]"
          >
            <span className="text-2xl shrink-0">{project.icon}</span>
            <div className="min-w-0">
              <h3 className="font-bold text-[12px] group-hover:text-white">{project.name}</h3>
              <p className="text-[11px] text-[#404040] group-hover:text-[#c0c0c0] mt-[2px]">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-1 bg-[#c0c0c0] group-hover:bg-[#000060] border border-t-white border-l-white border-b-[#808080] border-r-[#808080]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-[11px] text-[#808080]">
        {projects.length} object(s)
      </div>
    </div>
  );
}
