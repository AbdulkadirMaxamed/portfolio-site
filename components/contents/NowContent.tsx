"use client";

import { useEffect, useState } from "react";
import { DragRegion, TrafficLights, useWindowChrome } from "../Window";
import { AppIcon } from "../AppIcons";
import { Icon } from "../ui/Icon";
import { Img } from "../ui/Img";
import { SidebarItem } from "../ui/SidebarItem";
import { nowCards, nowTagline, type NowAccent, type NowCard } from "@/data/now";

const accents: Record<NowAccent, { bar: string; badge: string }> = {
  orange: { bar: "#fb885a", badge: "#2f5da8" },
  blue: { bar: "#3a73ed", badge: "#2f5da8" },
  green: { bar: "#3baa78", badge: "#c0403a" },
  purple: { bar: "#8d53f1", badge: "#3a3f4d" },
  amber: { bar: "#f0a04b", badge: "#5a3a2a" },
  red: { bar: "#e0445c", badge: "#c0403a" },
};

const badgeBg: Record<NowCard["icon"], string> = {
  laptop: "#2e5aa6",
  graduation: "#2e5aa6",
  book: "#b93a38",
  clapper: "#3a4150",
  coffee: "#3a2a26",
  headphones: "#b93a48",
};

const progressColor: Record<string, string> = {
  building: "#fb885a",
  learning: "#3a73ed",
  reading: "#3baa78",
  watching: "#8d53f1",
};

const nav = [
  { id: "home", label: "Home", icon: "home" },
  { id: "today", label: "Today", icon: "calendar" },
  { id: "stats", label: "Stats", icon: "chart" },
  { id: "archive", label: "Archive", icon: "notes" },
  { id: "settings", label: "Settings", icon: "settings" },
];

function CardBadge({ card }: { card: NowCard }) {
  const inner =
    card.icon === "coffee" ? (
      <AppIcon icon="brew" size={24} />
    ) : card.icon === "clapper" ? (
      <AppIcon icon="cinema" size={24} />
    ) : (
      <Icon name={card.icon === "graduation" ? "graduation-solid" : card.icon === "book" ? "book-open" : card.icon} size={20} className="text-white" />
    );
  return (
    <span className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0" style={{ background: badgeBg[card.icon] }}>
      {inner}
    </span>
  );
}

function Equaliser() {
  const bars = [6, 11, 16, 9, 13, 18, 7, 12, 15, 8, 17, 10, 6, 14, 18, 9, 12, 16, 7, 13, 10, 15, 8, 12, 17, 9, 11, 14, 7, 12];
  return (
    <div className="flex items-end justify-between h-[20px]">
      {bars.map((h, i) => (
        <span key={i} className="w-[3px] rounded-full" style={{ height: h, background: "#e0445c" }} />
      ))}
    </div>
  );
}

function Card({ card }: { card: NowCard }) {
  const color = progressColor[card.id] ?? accents[card.accent].bar;
  return (
    <div className="rounded-[12px] border px-[13px] pt-[12px] pb-[12px] flex flex-col" style={{ background: "rgba(24, 20, 24, 0.8)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="flex items-center gap-[16px]">
        <CardBadge card={card} />
        <span className="flex items-center gap-2 text-[16.5px] font-semibold text-white">
          {card.label}
          <Icon name="chevron-right" size={16} strokeWidth={2.2} />
        </span>
        <span className="flex-1" />
        <Icon name="more-horizontal" size={20} className="text-white/85" />
      </div>
      <Img src={card.image} alt="" className="mt-[9px] w-full h-[100px] rounded-[8px]" />
      <h3 className="mt-[9px] text-[15.5px] font-semibold text-white leading-[1.18] tracking-[-0.015em]">{card.title}</h3>
      {card.byline && <p className="mt-[3px] text-[13.5px] text-[#c9c1c4]">{card.byline}</p>}
      {card.description && <p className="mt-[3px] text-[12.5px] leading-[1.45] tracking-[-0.005em] text-[#c9c1c4]">{card.description}</p>}
      <div className="flex-1" />
      {card.progress !== undefined && (
        <div className="mt-[10px] flex items-center gap-[16px]">
          <div className="flex-1 h-[7px] rounded-full" style={{ background: "#2e2a30" }}>
            <div className="h-full rounded-full" style={{ width: `${card.progress}%`, background: color }} />
          </div>
          <span className="text-[14px] text-[#d6ced1] w-[34px] text-right">{card.progress}%</span>
        </div>
      )}
      {card.footnote && <p className="mt-[4px] text-[13.5px] text-[#d6ced1] whitespace-pre">{card.footnote}</p>}
      {card.status && (
        <div className="mt-[12px] h-[36px] rounded-[8px] flex items-center gap-3 px-[14px] text-[13.5px] text-[#d6ced1]" style={{ background: "rgba(255,255,255,0.05)" }}>
          <Icon name="refresh" size={17} style={{ color: "#f0a04b" }} />
          {card.status}
        </div>
      )}
      {card.equaliser && (
        <div className="mt-[10px]">
          <Equaliser />
        </div>
      )}
    </div>
  );
}

function greeting(hour: number) {
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}

export function NowContent() {
  const [now, setNow] = useState<Date | null>(null);
  const [active, setActive] = useState("home");
  const { width, height } = useWindowChrome();
  const rail = width < 900;
  const mainWidth = width - (rail ? 80 : 172) - 47;
  const cols = mainWidth >= 760 ? "grid-cols-3" : mainWidth >= 480 ? "grid-cols-2" : "grid-cols-1";
  // At the design height everything fits, so the scrollbar is hidden as in the mock-up;
  // on shorter screens show a scrollbar so it's clear the page scrolls.
  const scrollbar = height >= 760 ? "no-scrollbar" : "dark-scrollbar";

  useEffect(() => {
    const t = setTimeout(() => setNow(new Date()), 0);
    return () => clearTimeout(t);
  }, []);

  const dateLabel = now?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) ?? "";

  return (
    <div className="flex flex-col h-full os-glass" style={{ background: "var(--os-surface)" }}>
      <DragRegion className="h-[56px] shrink-0 flex items-center">
        <div className={`shrink-0 ${rail ? "w-[80px] flex justify-center" : "w-[172px] pl-[21px]"}`}>
          <TrafficLights />
        </div>
        <div className="flex-1 h-full flex items-center gap-[20px] pl-[2px] border-b border-white/[0.07]">
          <AppIcon icon="now" size={34} />
          <span className="text-[17px] font-semibold text-white">Now</span>
        </div>
      </DragRegion>

      <div className="flex flex-1 min-h-0">
        <aside className={`shrink-0 pt-[14px] space-y-[6px] ${rail ? "w-[80px] px-[14px]" : "w-[172px] px-[12px]"}`}>
          {nav.map((n) => (
            <SidebarItem
              key={n.id}
              compact={rail}
              className={`h-[42px] text-[15px] ${rail ? "" : "!gap-[14px]"}`}
              icon={<Icon name={n.icon} size={20} strokeWidth={1.6} />}
              label={n.label}
              active={active === n.id}
              onClick={() => setActive(n.id)}
            />
          ))}
        </aside>

        <main className={`flex-1 min-w-0 overflow-auto ${scrollbar} pl-[25px] pr-[22px] pt-[20px] pb-[10px] border-l border-white/[0.07]`} style={{ background: "rgba(26, 20, 24, 0.4)" }}>
          <div className="flex items-start justify-between gap-4 pl-[6px]">
            <div>
              <h1 className="text-[34px] font-bold text-white leading-tight">{now ? greeting(now.getHours()) : "Hello!"}</h1>
              <p className="mt-[4px] text-[17px] text-[#a79fa3]">{nowTagline}</p>
            </div>
            <div className="mt-[8px] h-[36px] px-[16px] rounded-[8px] flex items-center gap-3 text-[14px] text-white/90 border border-white/[0.14]" style={{ background: "rgba(255,255,255,0.03)" }}>
              <Icon name="calendar" size={16} />
              {dateLabel}
            </div>
          </div>

          <div className={`mt-[20px] grid ${cols} gap-[15px]`}>
            {nowCards.map((c) => (
              <Card key={c.id} card={c} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
