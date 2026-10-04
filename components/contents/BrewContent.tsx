"use client";

import { useState } from "react";
import { DragRegion, TrafficLights, useWindowChrome } from "../Window";
import { AppIcon } from "../AppIcons";
import { Icon } from "../ui/Icon";
import { Img } from "../ui/Img";
import { Stars } from "../ui/Stars";
import { SidebarItem } from "../ui/SidebarItem";
import { brewStats, coffeeGear, coffeeHistory, coffeeMethods, coffeeNotes, currentBag, currentBrew } from "@/data/coffee";

type Section = "current" | "history" | "method" | "gear" | "notes";

const nav: { id: Section; label: string; icon: string }[] = [
  { id: "current", label: "Current", icon: "cup" },
  { id: "history", label: "History", icon: "history" },
  { id: "method", label: "Brew Method", icon: "droplet" },
  { id: "gear", label: "Gear", icon: "box" },
  { id: "notes", label: "Notes", icon: "book-open" },
];

const card = "rounded-[14px] border";
const cardStyle = { background: "#faf6f0", borderColor: "#efe8de", boxShadow: "0 1px 2px rgba(60,40,20,0.04)" };

// Static class names so Tailwind generates them
const statCols: Record<number, string> = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6" };

function Current({ row }: { row: boolean }) {
  return (
    <>
      <section className={`${card} p-[2px] flex ${row ? "flex-row" : "flex-col"}`} style={cardStyle}>
        <Img src={currentBag.image} alt={currentBag.name} className={`rounded-[11px] shrink-0 ${row ? "w-[299px] h-[363px]" : "w-full h-[300px]"}`} />
        <div className={`flex-1 min-w-0 pl-[24px] pr-[18px] pt-[16px] ${row ? "" : "pb-5"}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[15.5px] text-[#6b6560]">Current Bag</p>
              <h2 className="mt-[6px] text-[33px] font-bold text-[#1d1b20] leading-tight">{currentBag.name}</h2>
            </div>
            <Icon name="more-horizontal" size={22} className="text-[#6b6560] mt-1" />
          </div>
          <div className="mt-[12px] border-t" style={{ borderColor: "#ebe4da" }} />
          <dl className="mt-[14px] grid grid-cols-[134px_1fr] gap-y-[13px] items-center">
            {currentBag.details.map((d) => (
              <div key={d.label} className="contents">
                <dt className="text-[16px] text-[#6b6560]">{d.label}</dt>
                <dd className="text-[17px] text-[#1d1b20]">{d.value}</dd>
              </div>
            ))}
            <dt className="text-[16px] text-[#6b6560] pt-[10px]">Tasting Notes</dt>
            <dd className="flex flex-wrap gap-[7px] pt-[10px]">
              {currentBag.tastingNotes.map((n) => (
                <span
                  key={n.label}
                  className="h-[38px] px-[9px] rounded-[10px] flex items-center gap-[7px] whitespace-nowrap text-[13.5px] text-[#1d1b20]"
                  style={{ background: "#f5e7dc", border: "1px solid #efdccd" }}
                >
                  <span className="text-[16px] leading-none">{n.icon}</span>
                  {n.label}
                </span>
              ))}
            </dd>
            {currentBag.rating !== undefined && (
              <>
                <dt className="text-[16px] text-[#6b6560] pt-[18px]">Rating</dt>
                <dd className="pt-[18px]">
                  <Stars rating={currentBag.rating} size={25} emptyColor="#6b6560" gap={6} />
                </dd>
              </>
            )}
          </dl>
        </div>
      </section>

      <section className={`${card} mt-[16px] px-[24px] pt-[18px] pb-[22px]`} style={cardStyle}>
        <div className="flex items-center justify-between">
          <h3 className="text-[19.5px] font-semibold text-[#1d1b20]">
            My Brew
            <span className="ml-3 text-[15px] font-normal text-[#6b6560]">{currentBrew.machine}</span>
          </h3>
          <Icon name="more-horizontal" size={22} className="text-[#6b6560]" />
        </div>
        <div className={`mt-[16px] grid ${statCols[brewStats.length] ?? "grid-cols-4"}`}>
          {brewStats.map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center ${i > 0 ? "border-l" : ""}`} style={{ borderColor: "#e9e1d6" }}>
              <Icon name={s.icon} size={32} strokeWidth={1.5} className="text-[#2b2626]" />
              <span className="mt-[10px] text-[19px] font-bold text-[#1d1b20]">{s.value}</span>
              <span className="mt-[4px] text-[15px] text-[#6b6560] text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SimpleList({ title, items }: { title: string; items: { primary: string; secondary?: string; detail?: string; rating?: number }[] }) {
  return (
    <section className={`${card} px-[24px] py-[20px]`} style={cardStyle}>
      <h2 className="text-[22px] font-bold text-[#1d1b20]">{title}</h2>
      <ul className="mt-4 divide-y" style={{ borderColor: "#ebe4da" }}>
        {items.map((it) => (
          <li key={it.primary} className="py-3 flex items-center justify-between gap-4" style={{ borderColor: "#ebe4da" }}>
            <div>
              <div className="text-[17px] font-medium text-[#1d1b20]">{it.primary}</div>
              {it.secondary && <div className="text-[15px] text-[#6b6560]">{it.secondary}</div>}
              {it.detail && <div className="mt-[2px] text-[14px] text-[#8a8178]">{it.detail}</div>}
            </div>
            {it.rating !== undefined && <Stars rating={it.rating} size={18} emptyColor="#b5aca3" />}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BrewContent() {
  const [section, setSection] = useState<Section>("current");
  const { width } = useWindowChrome();
  const rail = width < 960;
  const mainWidth = width - (rail ? 64 : 201) - 48;

  return (
    <div className="flex flex-col h-full">
      <DragRegion className="h-[52px] shrink-0 flex items-center pl-[18px] pr-[18px]" style={{ background: "var(--os-titlebar)" }}>
        <TrafficLights className="mr-[30px]" />
        <AppIcon icon="brew" size={30} />
        <span className="ml-3 text-[17px] font-semibold text-white">Brew</span>
        <div className="flex-1" />
        <Icon name="more-vertical" size={20} className="text-white/85" />
      </DragRegion>

      <div className="flex flex-1 min-h-0">
        <aside
          className={`shrink-0 pt-[16px] space-y-[8px] ${rail ? "w-[64px] px-[9px]" : "w-[201px] px-[9px]"}`}
          style={{ background: "var(--os-sidebar)" }}
        >
          {nav.map((n) => (
            <SidebarItem
              key={n.id}
              compact={rail}
              className={`h-[46px] text-[16px] ${rail ? "" : "!gap-[20px] !px-[16px]"}`}
              icon={<Icon name={n.icon} size={24} strokeWidth={1.5} />}
              label={n.label}
              active={section === n.id}
              onClick={() => setSection(n.id)}
            />
          ))}
        </aside>

        <main className="flex-1 min-w-0 overflow-auto light-scrollbar px-[24px] pt-[16px] pb-[16px]" style={{ background: "#f6f0e7" }}>
          {section === "current" && <Current row={mainWidth >= 700} />}
          {section === "history" && (
            <SimpleList
              title="History"
              items={coffeeHistory.map((c) => ({
                primary: c.name,
                secondary: [c.roaster, c.origin].filter(Boolean).join(" · "),
                detail: [c.tastingNotes.join(", "), c.grind && `Grind ${c.grind}`].filter(Boolean).join("  ·  "),
                rating: c.rating,
              }))}
            />
          )}
          {section === "method" && (
            <SimpleList
              title="Brew Methods"
              items={coffeeMethods.map((m) => ({ primary: m, secondary: m === currentBrew.method ? "Current favourite" : undefined }))}
            />
          )}
          {section === "gear" && <SimpleList title="Gear" items={coffeeGear.map((g) => ({ primary: g }))} />}
          {section === "notes" && <SimpleList title="Notes" items={coffeeNotes.map((n) => ({ primary: n }))} />}
        </main>
      </div>
    </div>
  );
}
