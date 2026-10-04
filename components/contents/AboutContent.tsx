"use client";

import { useState } from "react";
import { DragRegion, TrafficLights, useWindowChrome } from "../Window";
import { Icon } from "../ui/Icon";
import { Img } from "../ui/Img";
import { SidebarItem } from "../ui/SidebarItem";
import { profile } from "@/data/profile";
import { useOpenApp } from "@/lib/useOpenApp";

type Page = "home" | "contact";

const nav: { id: string; label: string; icon: string; app?: string; page?: Page }[] = [
  { id: "home", label: "Home", icon: "home", page: "home" },
  { id: "work", label: "Work", icon: "briefcase", app: "projects" },
  { id: "now", label: "Now", icon: "clock", app: "now" },
  { id: "coffee", label: "Coffee", icon: "coffee", app: "brew" },
  { id: "films", label: "Films", icon: "film", app: "cinema" },
  { id: "contact", label: "Contact", icon: "mail", page: "contact" },
];

function BrowserChrome({ title, url }: { title: string; url: string }) {
  const { close } = useWindowChrome();
  return (
    <div className="shrink-0" style={{ background: "#1d1b20" }}>
      {/* Tab strip */}
      <DragRegion className="h-[45px] flex items-end pl-[18px] pr-3 gap-3">
        <TrafficLights className="self-center mr-[22px]" />
        <div
          className="relative h-[38px] w-[227px] flex items-center gap-3 px-4 rounded-t-[10px] text-[15px] text-white"
          style={{ background: "#2c292e" }}
        >
          <span className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </span>
          <span className="flex-1 truncate font-medium">{title}</span>
          <button onClick={close} className="text-white/70 hover:text-white" aria-label="Close tab">
            <Icon name="x" size={15} strokeWidth={2} />
          </button>
        </div>
        <button className="self-center text-white/80 hover:text-white px-1" aria-label="New tab">
          <Icon name="plus" size={20} strokeWidth={1.8} />
        </button>
      </DragRegion>

      {/* Toolbar */}
      <DragRegion className="h-[45px] flex items-center gap-[22px] pl-[18px] pr-5" style={{ background: "#2c292e" }}>
        <Icon name="arrow-left" size={20} className="text-white/85" />
        <Icon name="arrow-right" size={20} className="text-white/45" />
        <Icon name="refresh" size={19} className="text-white/85" />
        <div
          className="flex-1 h-[34px] rounded-full flex items-center gap-3 pl-3 pr-3 text-[15px] text-white/75"
          style={{ background: "#1f1d22" }}
        >
          <span className="w-[22px] h-[22px] rounded-full bg-white/10 flex items-center justify-center">
            <Icon name="shield-lock" size={13} />
          </span>
          <span className="flex-1 truncate">{url}</span>
          <Icon name="star" size={19} className="text-white/85" />
        </div>
        <Icon name="puzzle" size={20} className="text-white/85 ml-2" />
        <Icon name="more-vertical" size={20} className="text-white/85" />
      </DragRegion>
    </div>
  );
}

function CurrentlyIcon({ kind }: { kind: "coffee" | "laptop" | "book" }) {
  if (kind === "coffee")
    return (
      <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden>
        <path d="M19 6c-1.5 2 1.5 3 0 5M24 5c-1.5 2 1.5 3 0 5" stroke="#e38a3e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M36 21a5 5 0 0 1 0 10h-2" stroke="#2b2626" strokeWidth="2.4" fill="none" />
        <path d="M7 16h29v11c0 8-6 13-14.5 13S7 35 7 27Z" fill="#fff" stroke="#2b2626" strokeWidth="2" />
        <ellipse cx="21.5" cy="16.5" rx="14.5" ry="3" fill="#8b4a25" stroke="#2b2626" strokeWidth="2" />
        <path d="M9 41h26" stroke="#2b2626" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (kind === "laptop")
    return (
      <svg width="48" height="44" viewBox="0 0 52 48" aria-hidden>
        <rect x="8" y="9" width="36" height="24" rx="2" fill="#2d3b4f" stroke="#1b1e24" strokeWidth="2" />
        <rect x="11" y="12" width="30" height="18" rx="1" fill="#3d7fd6" />
        <path d="M3 36h46l-3 5H6Z" fill="#9aa3ad" stroke="#1b1e24" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg width="48" height="44" viewBox="0 0 52 48" aria-hidden>
      <path d="M4 10c7-2 15-2 22 3 7-5 15-5 22-3v28c-7-2-15-2-22 3-7-5-15-5-22-3Z" fill="#fff" stroke="#2b2626" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M26 13v28" stroke="#2b2626" strokeWidth="2.2" />
      <path d="M9 17c4-1 8-1 12 1M9 23c4-1 8-1 12 1M31 18c4-2 8-2 12-1M31 24c4-2 8-2 12-1" stroke="#c9423a" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function HomePage({ onContact, wide }: { onContact: () => void; wide: boolean }) {
  const openApp = useOpenApp();
  const { about, currently } = profile;
  return (
    <div className={`pt-[34px] pb-6 ${wide ? "pl-10 pr-[27px]" : "px-8"}`}>
      <div className={`flex gap-[30px] ${wide ? "flex-row" : "flex-col"}`}>
        <div className={wide ? "w-[440px] shrink-0" : "max-w-[560px]"}>
          <p className="text-[19px] font-medium" style={{ color: "#c2643d" }}>
            {about.greeting}
          </p>
          <h1 className="mt-[14px] text-[36px] leading-[1.17] font-bold tracking-[-0.025em] text-[#1d1b20]">
            {about.headline}
          </h1>
          <p className="mt-[14px] text-[17px] leading-[1.48] tracking-[-0.01em] text-[#4a4c52]">{about.intro}</p>
          <div className="mt-[22px] flex flex-wrap gap-4">
            <button
              onClick={() => openApp("projects")}
              className="h-[51px] px-7 rounded-[8px] flex items-center gap-2.5 text-[16px] font-semibold text-white transition-colors hover:brightness-105"
              style={{ background: "var(--os-accent)", boxShadow: "0 6px 16px rgba(255,90,31,0.25)" }}
            >
              <Icon name="play-circle" size={17} strokeWidth={2} />
              See my work
              <Icon name="arrow-right" size={18} strokeWidth={2} />
            </button>
            <button
              onClick={onContact}
              className="h-[51px] px-[26px] rounded-[8px] flex items-center gap-3 text-[16px] font-semibold text-[#1d1b20] border transition-colors hover:bg-[#efebe5]"
              style={{ background: "#f4f1ec", borderColor: "#e6e1da" }}
            >
              <Icon name="mail-outline" size={20} strokeWidth={1.9} />
              Get in touch
            </button>
          </div>
        </div>
        <Img
          src={about.heroImage}
          alt=""
          className={`rounded-[12px] ${wide ? "flex-1 min-w-0 h-[385px]" : "w-full aspect-[444/300]"}`}
        />
      </div>

      <div className={`mt-[21px] grid gap-[22px] ${wide ? "mr-[10px] grid-cols-[266fr_288fr_300fr]" : "grid-cols-1"}`}>
        {currently.map((c) => (
          <div
            key={c.label}
            className="h-[100px] rounded-[10px] border flex items-center gap-5 px-6"
            style={{ background: "#fbfaf8", borderColor: "var(--os-card-border)" }}
          >
            <CurrentlyIcon kind={c.icon} />
            <div className="min-w-0">
              <div className="text-[15px] text-[#6b6560]">{c.label}</div>
              <div className="text-[18px] font-bold text-[#1d1b20] leading-tight mt-0.5">{c.title}</div>
              <div className="text-[15px] text-[#4a4c52] mt-0.5 truncate">{c.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="px-10 pt-[34px] pb-8 max-w-[640px]">
      <p className="text-[19px] font-medium" style={{ color: "#c2643d" }}>
        Say hello
      </p>
      <h1 className="mt-3 text-[36px] leading-[1.17] font-bold text-[#1d1b20]">Get in touch</h1>
      <p className="mt-3 text-[17px] leading-[1.48] text-[#4a4c52]">
        You can find my work on GitHub, or reach out to me on LinkedIn.
      </p>
      <div className="mt-6 space-y-3">
        {profile.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 h-[60px] px-5 rounded-[10px] border hover:bg-white transition-colors"
            style={{ background: "#fbfaf8", borderColor: "var(--os-card-border)" }}
          >
            <Icon name={s.kind === "email" ? "mail-outline" : s.kind} size={20} className="text-[#1d1b20]" />
            <span className="text-[15px] text-[#6b6560] w-20">{s.label}</span>
            <span className="text-[16px] font-medium text-[#1d1b20]">{s.display}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function AboutContent() {
  const [page, setPage] = useState<Page>("home");
  const openApp = useOpenApp();
  const { width } = useWindowChrome();
  const rail = width < 1080;
  const mainWidth = width - (rail ? 64 : 184);
  const wide = mainWidth >= 860;
  const url = page === "home" ? profile.about.url : profile.about.url.replace(/about$/, "contact");

  return (
    <div className="flex flex-col h-full">
      <BrowserChrome title={page === "home" ? "About Me" : "Contact"} url={url} />
      <div className="flex flex-1 min-h-0" style={{ background: "var(--os-paper)" }}>
        <aside
          className={`shrink-0 pt-6 space-y-[5px] ${rail ? "w-[64px] px-2" : "w-[184px] px-4"}`}
          style={{ background: "var(--os-paper-2)" }}
        >
          {nav.map((item) => (
            <SidebarItem
              key={item.id}
              tone="light"
              compact={rail}
              className="h-[44px] text-[15px]"
              icon={
                <Icon
                  name={item.icon}
                  size={20}
                  strokeWidth={1.7}
                  style={{ color: item.page === page ? "#e2582a" : "#3f3b3b" }}
                />
              }
              label={item.label}
              active={item.page === page}
              onClick={() => (item.page ? setPage(item.page) : item.app && openApp(item.app))}
            />
          ))}
        </aside>
        <main className="flex-1 min-w-0 overflow-auto light-scrollbar">
          {page === "home" ? <HomePage wide={wide} onContact={() => setPage("contact")} /> : <ContactPage />}
        </main>
      </div>
    </div>
  );
}
