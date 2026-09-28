"use client";

import { useState, type ReactNode } from "react";
import { DragRegion, TrafficLights, useWindowChrome } from "../Window";
import { Icon } from "../ui/Icon";
import { SidebarItem } from "../ui/SidebarItem";
import { cv } from "@/data/cv";

const ZOOMS = [50, 75, 90, 100, 125, 150];
const PAPER_WIDTH = 808;

const contactIcon: Record<string, string> = {
  email: "mail-outline",
  phone: "phone",
  location: "map-pin",
  linkedin: "linkedin",
  github: "github",
};

function SectionTitle({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-[14px] text-[20px] font-bold text-[#141a2e]">
      <Icon name={icon} size={24} className="text-[#141a2e]" />
      {children}
    </h2>
  );
}

function Paper() {
  return (
    <article className="bg-[#fdfcf9] text-[#1f2433] pl-[43px] pr-[30px] pt-[30px] pb-[30px] shadow-[0_6px_24px_rgba(0,0,0,0.35)]" style={{ width: PAPER_WIDTH }}>
      {/* Header */}
      <header className="flex gap-10">
        <div className="flex-1">
          <h1 className="text-[40px] font-bold leading-[1.1] text-[#141a2e] tracking-[-0.01em]">{cv.name}</h1>
          <p className="mt-[6px] text-[20px] font-semibold" style={{ color: "#2a73d9" }}>
            {cv.title}
          </p>
        </div>
        <p className="w-[312px] pt-[8px] text-[13.3px] leading-[1.45] text-[#3b4150]">{cv.summary}</p>
      </header>

      <div className="mt-[26px] -mr-[18px] flex flex-wrap items-center gap-x-[14px] gap-y-2 text-[10.6px] tracking-[-0.01em] text-[#2a3040] whitespace-nowrap">
        {cv.contacts.map((c) => (
          <span key={c.text} className="flex items-center gap-[8px]">
            <Icon name={contactIcon[c.kind]} size={16} className="text-[#1f2433]" />
            {c.href ? (
              <a href={c.href} target="_blank" rel="noreferrer" className="hover:underline">
                {c.text}
              </a>
            ) : (
              c.text
            )}
          </span>
        ))}
      </div>

      <div className="mt-[26px] mr-[13px] border-t border-[#c9ccd3]" />

      <div className="mt-[22px] grid grid-cols-[390px_1fr] gap-[40px]">
        {/* Experience */}
        <section>
          <SectionTitle icon="briefcase-solid">Experience</SectionTitle>
          <div className="relative mt-[12px]">
            <div className="absolute left-[6px] top-[8px] bottom-[10px] w-px bg-[#c9ccd3]" />
            {cv.experience.map((job) => (
              <div key={job.role + job.company} className="relative pl-[35px] mb-[20px] last:mb-0">
                <span className="absolute left-[2px] top-[5px] w-[9px] h-[9px] rounded-full border-2 border-[#8b909c] bg-[#fdfcf9]" />
                <div className="flex justify-between items-baseline">
                  <span className="text-[14px] font-semibold text-[#141a2e]">{job.role}</span>
                  <span className="text-[11.3px] text-[#3b4150]">{job.period}</span>
                </div>
                <div className="flex justify-between items-baseline mt-[2px]">
                  <span className="text-[12.5px] text-[#3b4150]">{job.company}</span>
                  <span className="text-[10px] text-[#6b7180]">{job.location}</span>
                </div>
                <ul className="mt-[8px] pl-[29px] list-disc text-[12px] leading-[1.45] text-[#2a3040] space-y-[2px] marker:text-[#1f2433]">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education + skills */}
        <div>
          <section>
            <SectionTitle icon="graduation-solid">Education</SectionTitle>
            {cv.education.map((ed) => (
              <div key={ed.degree} className="mt-[14px] pl-[11px]">
                <div className="flex justify-between items-baseline">
                  <span className="text-[13.3px] font-semibold text-[#141a2e]">{ed.degree}</span>
                  <span className="text-[11.3px] text-[#3b4150]">{ed.period}</span>
                </div>
                <div className="flex justify-between items-baseline mt-[2px]">
                  <span className="text-[12.3px] text-[#3b4150]">{ed.school}</span>
                  <span className="text-[10px] text-[#6b7180]">{ed.location}</span>
                </div>
                <p className="mt-[14px] text-[12px] leading-[1.45] text-[#2a3040]">{ed.summary}</p>
              </div>
            ))}
          </section>

          <section className="mt-[44px]">
            <SectionTitle icon="settings-solid">Technical Skills</SectionTitle>
            <dl className="mt-[14px] pl-[6px] grid grid-cols-[80px_1fr] gap-y-[9px] text-[11.5px] tracking-[-0.01em]">
              {cv.skills.map((s) => (
                <div key={s.label} className="contents">
                  <dt className="font-semibold text-[#141a2e]">{s.label}</dt>
                  <dd className="text-[#2a3040]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      {/* Projects */}
      <section className="mt-[28px]">
        <SectionTitle icon="folder-solid">Projects</SectionTitle>
        <div className="mt-[8px] border-t border-[#e1e3e8]" />
        <div className="mt-[10px] grid grid-cols-2 gap-[40px] pl-[21px]">
          {cv.projects.map((p) => (
            <div key={p.name}>
              <div className="text-[13.3px] font-semibold text-[#141a2e]">{p.name}</div>
              <p className="mt-[2px] text-[11.8px] leading-[1.45] text-[#2a3040] max-w-[250px]">{p.description}</p>
              <div className="mt-[9px] flex items-center gap-[8px] flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="h-[22px] px-[9px] rounded-[4px] flex items-center text-[10.5px] text-[#2a3040]" style={{ background: "#eef0f3" }}>
                    {t}
                  </span>
                ))}
                {p.href && (
                  <a href={p.href} target="_blank" rel="noreferrer" className="ml-1 text-[#1f2433]" aria-label={`Open ${p.name}`}>
                    <Icon name="external-link" size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

export function CVContent() {
  const { width } = useWindowChrome();
  const rail = width < 900;
  // Until the user picks a zoom level, fit the page to the available width (max 100%).
  const pageArea = width - (rail ? 64 : 177) - 20;
  const fitZoom = Math.min(100, Math.floor((pageArea / PAPER_WIDTH) * 100));
  const [chosenZoom, setChosenZoom] = useState<number | null>(null);
  const zoom = chosenZoom ?? fitZoom;
  const setZoom = setChosenZoom;
  const [zoomOpen, setZoomOpen] = useState(false);
  const smaller = [...ZOOMS].reverse().find((z) => z < zoom);
  const larger = ZOOMS.find((z) => z > zoom);
  const scale = zoom / 100;

  return (
    <div className="flex flex-col h-full os-glass" style={{ background: "rgba(29, 28, 36, 0.985)" }}>
      <DragRegion className="h-[56px] shrink-0 flex items-center pl-[18px]">
        <TrafficLights className="mr-[26px]" />
        <span className="w-[38px] h-[38px] rounded-[8px] flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
          <Icon name="file-solid" size={24} className="text-[#6fa8f0]" />
        </span>
        <div className="ml-[12px] leading-tight">
          <div className="text-[15px] font-medium text-white">CV</div>
          <div className="text-[13px] text-white/60">{cv.fileName}</div>
        </div>
      </DragRegion>

      <div className="flex flex-1 min-h-0">
        <aside className={`shrink-0 pt-[10px] space-y-[5px] ${rail ? "w-[64px] px-[10px]" : "w-[177px] px-[10px]"}`}>
          <SidebarItem compact={rail} className="h-[44px] text-[15px] !gap-[18px]" icon={<Icon name="file-text" size={22} strokeWidth={1.6} />} label="Preview" active />
          <a href={cv.pdfPath} download className="block">
            <SidebarItem compact={rail} className="h-[44px] text-[15px] !gap-[18px] pointer-events-none" icon={<Icon name="download" size={22} strokeWidth={1.6} />} label="Download" />
          </a>
          <SidebarItem
            compact={rail}
            className="h-[44px] text-[15px] !gap-[18px]"
            icon={<Icon name="printer" size={22} strokeWidth={1.6} />}
            label="Print"
            onClick={() => window.open(cv.pdfPath, "_blank")}
          />
        </aside>

        <div className="flex-1 min-w-0 flex flex-col" style={{ background: "rgba(33, 32, 41, 0.9)" }}>
          {/* Toolbar */}
          <div className="h-[56px] shrink-0 flex items-center justify-center gap-[18px] text-white/85 text-[15px] px-3">
            <Icon name="arrow-left" size={19} className="text-white/35" />
            <span className="h-[34px] w-[50px] rounded-[6px] flex items-center justify-center border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
              1
            </span>
            <span className="text-white/70">/ 1</span>
            <span className="w-px h-5 bg-white/15 mx-2" />
            <div className="relative">
              <button
                onClick={() => setZoomOpen((v) => !v)}
                className="h-[34px] w-[102px] rounded-[6px] flex items-center justify-center gap-3 border border-white/10"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {zoom}%
                <Icon name="chevron-down" size={15} />
              </button>
              {zoomOpen && (
                <div className="absolute top-[38px] left-0 w-[102px] py-1 rounded-[8px] bg-[#2a2833] border border-white/10 shadow-xl z-10">
                  {ZOOMS.map((z) => (
                    <button
                      key={z}
                      onClick={() => {
                        setZoom(z);
                        setZoomOpen(false);
                      }}
                      className={`w-full text-center py-1.5 hover:bg-white/10 ${z === zoom ? "text-white" : "text-white/70"}`}
                    >
                      {z}%
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button aria-label="Zoom out" disabled={smaller === undefined} onClick={() => smaller && setZoom(smaller)} className="disabled:opacity-40">
              <Icon name="zoom-out" size={21} />
            </button>
            <button aria-label="Zoom in" disabled={larger === undefined} onClick={() => larger && setZoom(larger)} className="disabled:opacity-40">
              <Icon name="zoom-in" size={21} />
            </button>
            <span className="w-px h-5 bg-white/15 mx-2" />
            <Icon name="presentation" size={21} />
            <span className="w-px h-5 bg-white/15 mx-2" />
            <Icon name="more-horizontal" size={22} />
          </div>

          {/* Page */}
          <div className="flex-1 overflow-auto dark-scrollbar px-[10px] pb-6">
            {/* CSS zoom (unlike transform) scales the layout box too, so scrolling stays exact */}
            <div className="mx-auto" style={{ width: PAPER_WIDTH, zoom: scale }}>
              <Paper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
