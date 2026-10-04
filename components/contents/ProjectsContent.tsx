"use client";

import { useMemo, useState } from "react";
import { DragRegion, TrafficLights, useWindowChrome } from "../Window";
import { Icon } from "../ui/Icon";
import { Img } from "../ui/Img";
import { SidebarItem } from "../ui/SidebarItem";
import { projects, type Project } from "@/data/projects";
import { useOpenApp } from "@/lib/useOpenApp";

type Section = "home" | "projects";

const sidebar: { id: string; label: string; icon: string; section?: Section; app?: string }[] = [
  { id: "home", label: "Home", icon: "home-solid", section: "home" },
  { id: "projects", label: "Projects", icon: "folder-solid", section: "projects" },
  { id: "writing", label: "Writing", icon: "writing-solid", app: "writing" },
  { id: "cv", label: "CV", icon: "file-solid", app: "cv" },
];

const sectionTitle: Record<Section, string> = {
  home: "Home",
  projects: "Projects",
};

function Folder({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.83} viewBox="0 0 72 60" aria-hidden>
      <path d="M2 8a5 5 0 0 1 5-5h17l6 6h35a5 5 0 0 1 5 5v8H2Z" fill="#fb9a2f" />
      <rect x="2" y="13" width="68" height="45" rx="5" fill="#fdb549" />
      <rect x="2" y="13" width="68" height="4" rx="2" fill="#fed27f" opacity="0.7" />
    </svg>
  );
}

function ToolbarButton({ children, active, onClick, label }: { children: React.ReactNode; active?: boolean; onClick?: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`h-[40px] w-[44px] flex items-center justify-center rounded-[8px] text-white/90 transition-colors ${
        active ? "bg-white/[0.12]" : "hover:bg-white/[0.07]"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectDetail({ project, inline = false }: { project: Project; inline?: boolean }) {
  return (
    <div className={inline ? "flex flex-col" : "px-5 pt-5 pb-4 flex flex-col"}>
      <Img src={project.image} alt={project.name} className={`w-full aspect-[305/217] rounded-[8px] ${inline ? "max-w-[420px]" : ""}`} />
      <h2 className="mt-[18px] text-[23px] font-bold text-[#1d1b20] leading-tight">{project.name}</h2>
      <p className="mt-2 text-[17px] leading-[1.5] text-[#55524f]">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-[9px]">
        {project.tags.map((t) => (
          <span key={t} className="h-[36px] px-[13px] flex items-center rounded-[6px] text-[14px] tracking-[-0.01em] text-[#4a4c52]" style={{ background: "#e6e3df" }}>
            {t}
          </span>
        ))}
      </div>
      {(project.links.open ?? project.links.demo) && (
        <a
          href={project.links.open ?? project.links.demo}
          target="_blank"
          rel="noreferrer"
          className="mt-[15px] h-[44px] w-[175px] rounded-[6px] flex items-center gap-3 pl-[18px] text-[16px] font-medium text-white hover:brightness-105"
          style={{ background: "var(--os-accent)" }}
        >
          <Icon name="external-link" size={20} strokeWidth={1.8} />
          Open
        </a>
      )}
      <div className="mt-3 flex flex-wrap gap-x-[16px] gap-y-3">
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="h-[44px] px-4 rounded-[6px] flex items-center gap-3 whitespace-nowrap text-[15px] text-[#1d1b20] border bg-white/70 hover:bg-white"
            style={{ borderColor: "#ddd8d2" }}
          >
            <Icon name="globe" size={19} />
            Live demo
          </a>
        )}
        {project.links.source && (
          <a
            href={project.links.source}
            target="_blank"
            rel="noreferrer"
            className="h-[44px] px-4 rounded-[6px] flex items-center gap-3 whitespace-nowrap text-[15px] text-[#1d1b20] border bg-white/70 hover:bg-white"
            style={{ borderColor: "#ddd8d2" }}
          >
            <Icon name="github" size={20} />
            Source code
          </a>
        )}
      </div>
    </div>
  );
}

function EmptyFolder() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-[#8a8580] gap-3 pb-10">
      <Icon name="folder" size={56} strokeWidth={1.2} className="text-[#c9c3bc]" />
      <p className="text-[17px] font-medium text-[#55524f]">This folder is empty</p>
      <p className="text-[14px]">Nothing to see here yet.</p>
    </div>
  );
}

export function ProjectsContent({ initialSection = "projects" }: { initialSection?: Section }) {
  const openApp = useOpenApp();
  const [section, setSection] = useState<Section>(initialSection);
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id ?? "");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { width } = useWindowChrome();
  // Layout tiers: full sidebar + details (design) → icon rail + details → icon rail + inline details
  const fullSidebar = width - 201 - 347 >= 480;
  const rail = !fullSidebar;
  const sidePane = fullSidebar || width - 64 - 347 >= 440;

  const showsProjects = section === "projects" || section === "home";
  const items = useMemo(() => {
    if (!showsProjects) return [];
    const q = query.trim().toLowerCase();
    return q ? projects.filter((p) => `${p.name} ${p.stack} ${p.tags.join(" ")}`.toLowerCase().includes(q)) : projects;
  }, [showsProjects, query]);
  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];
  const title = sectionTitle[section];

  return (
    <div className="flex flex-col h-full">
      {/* Title bar */}
      <DragRegion className="h-[59px] shrink-0 flex items-center pl-[18px] pr-3 sm:pr-[24px] gap-3" style={{ background: "var(--os-titlebar)" }}>
        <TrafficLights className="mr-2 sm:mr-[26px]" />
        <Icon name="folder-solid" size={24} className="text-[#fbb13d]" />
        <span className="text-[16px] font-medium text-white">{title}</span>
        <div className="flex-1" />
        {searchOpen && (
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            className="h-[34px] w-[120px] sm:w-[200px] rounded-[8px] bg-white/10 px-3 text-[14px] text-white placeholder:text-white/40 outline-none focus:bg-white/15"
          />
        )}
        <ToolbarButton label="Search" active={searchOpen} onClick={() => { setSearchOpen((v) => !v); setQuery(""); }}>
          <Icon name="search" size={19} />
        </ToolbarButton>
        <div className="hidden sm:flex rounded-[8px] ml-3 overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
          <ToolbarButton label="Grid view" active={view === "grid"} onClick={() => setView("grid")}>
            <Icon name="grid" size={18} />
          </ToolbarButton>
          <ToolbarButton label="List view" active={view === "list"} onClick={() => setView("list")}>
            <Icon name="list" size={19} />
          </ToolbarButton>
        </div>
        <ToolbarButton label="More">
          <Icon name="more-vertical" size={19} />
        </ToolbarButton>
      </DragRegion>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={`shrink-0 pt-[13px] space-y-[8px] ${rail ? "w-[64px] px-[10px]" : "w-[201px] px-[11px]"}`}
          style={{ background: "var(--os-sidebar)" }}
        >
          {sidebar.map((item) => (
            <SidebarItem
              key={item.id}
              compact={rail}
              className="h-[44px] text-[16px]"
              icon={
                <Icon
                  name={item.icon}
                  size={22}
                  className={item.section === section && item.id === "projects" ? "text-[#ff8a5c]" : "text-white/90"}
                />
              }
              label={item.label}
              active={item.section === section}
              onClick={() => (item.section ? setSection(item.section) : item.app && openApp(item.app))}
            />
          ))}
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col" style={{ background: "var(--os-paper)" }}>
          <div className="h-[54px] shrink-0 flex items-center gap-5 px-[26px] border-b text-[15px]" style={{ borderColor: "#ebe7e2" }}>
            <Icon name="chevron-left" size={18} className="text-[#1d1b20]" strokeWidth={2} />
            <Icon name="chevron-right" size={18} className="text-[#1d1b20]" strokeWidth={2} />
            <span className="flex items-center gap-3 text-[#55524f]">
              <button onClick={() => setSection("home")} className="hover:text-[#1d1b20]">Home</button>
              {section !== "home" && (
                <>
                  <Icon name="chevron-right" size={14} strokeWidth={2} />
                  <span className="font-semibold text-[#1d1b20]">{title}</span>
                </>
              )}
            </span>
          </div>

          <div className="flex-1 overflow-auto light-scrollbar px-[20px] py-[18px]">
            {items.length === 0 ? (
              <EmptyFolder />
            ) : view === "grid" ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-[14px] gap-y-[19px]">
                {items.map((p) => {
                  const isSel = p.id === selected?.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      onDoubleClick={() => p.links.open && window.open(p.links.open, "_blank")}
                      className="h-[188px] min-w-0 rounded-[10px] text-left px-[14px] pt-[22px] flex flex-col justify-start transition-colors"
                      title={`${p.name} — ${p.stack}`}
                      style={{
                        background: isSel ? "#fdebe0" : "#f8f5f1",
                        border: `1.5px solid ${isSel ? "#fbb9a1" : "#efebe6"}`,
                      }}
                    >
                      <div className="flex justify-center">
                        <Folder />
                      </div>
                      <div className="mt-[14px] text-[16.5px] leading-[1.25] font-semibold text-[#1d1b20] line-clamp-2">{p.name}</div>
                      <div className="mt-[2px] text-[14px] leading-[1.3] tracking-[-0.015em] text-[#8a8580] line-clamp-2">{p.stack}</div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-[10px] border overflow-hidden" style={{ borderColor: "#efebe6" }}>
                {items.map((p) => {
                  const isSel = p.id === selected?.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className="w-full flex items-center gap-4 px-4 h-[52px] text-left border-b last:border-b-0"
                      style={{ background: isSel ? "#fdebe0" : "transparent", borderColor: "#efebe6" }}
                    >
                      <Folder size={30} />
                      <span className="flex-1 text-[15px] font-semibold text-[#1d1b20]">{p.name}</span>
                      <span className="text-[14px] text-[#8a8580]">{p.stack}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Narrow windows: details flow below the grid */}
            {!sidePane && showsProjects && selected && items.length > 0 && (
              <div className="mt-6 pt-6 border-t" style={{ borderColor: "#ebe7e2" }}>
                <ProjectDetail project={selected} inline />
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        {sidePane && showsProjects && selected && (
          <aside className="w-[347px] shrink-0 overflow-auto light-scrollbar border-l" style={{ background: "#f4f2ed", borderColor: "#ebe7e2" }}>
            <ProjectDetail project={selected} />
          </aside>
        )}
      </div>
    </div>
  );
}

