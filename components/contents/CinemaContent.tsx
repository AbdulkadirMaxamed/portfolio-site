"use client";

import { useState } from "react";
import { DragRegion, TrafficLights, useWindowChrome } from "../Window";
import { AppIcon } from "../AppIcons";
import { Icon } from "../ui/Icon";
import { Img } from "../ui/Img";
import { Stars } from "../ui/Stars";
import { SidebarItem } from "../ui/SidebarItem";
import { cinemaHeroes, favouriteFilms, recentlyWatched, watchlist, type Film } from "@/data/films";

type Section = "discover" | "favourites" | "watchlist" | "recent";

const nav: { id: Section; label: string; icon: string }[] = [
  { id: "discover", label: "Discover", icon: "compass" },
  { id: "favourites", label: "Favourites", icon: "heart-solid" },
  { id: "watchlist", label: "Watchlist", icon: "bookmark" },
  { id: "recent", label: "Recently Watched", icon: "clock-solid" },
];

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[19px] font-semibold text-white">{title}</h2>
      {onSeeAll && (
        <button onClick={onSeeAll} className="flex items-center gap-1.5 text-[14px] font-medium hover:brightness-110" style={{ color: "#f2703d" }}>
          See All <Icon name="arrow-right" size={15} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

function Poster({ film }: { film: Film }) {
  return (
    <div className="min-w-0">
      <div className="relative">
        <Img src={film.image} alt={film.title} className="w-full aspect-[200/173] rounded-[8px] border border-white/10" />
        <span className="absolute top-[9px] right-[9px] w-[30px] h-[30px] rounded-full flex items-center justify-center" style={{ background: "rgba(20,16,18,0.72)" }}>
          <Icon name="heart-solid" size={17} style={{ color: "#ff6a3d" }} />
        </span>
      </div>
      <div className="mt-[8px] text-[15.5px] font-semibold text-white truncate">{film.title}</div>
      <div className="mt-[2px] text-[14px] text-[#b2aaa8]">{film.year}</div>
      <div className="mt-[2px]">
        <Stars rating={film.rating} size={13} color="#f6953a" emptyColor="rgba(255,255,255,0.55)" gap={2} />
      </div>
    </div>
  );
}

function Still({ film }: { film: Film }) {
  return (
    <div className="min-w-0">
      <Img src={film.image} alt={film.title} className="w-full aspect-[264/95] rounded-[6px]" />
      <div className="mt-[8px] text-[15px] font-semibold text-white truncate">{film.title}</div>
      <div className="mt-[3px] flex items-center gap-4 text-[14px] text-[#b2aaa8]">
        {film.year}
        {film.rating > 0 && <Stars rating={film.rating} size={13} color="#f6953a" emptyColor="rgba(255,255,255,0.55)" gap={2} />}
      </div>
    </div>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const hero = cinemaHeroes[index];
  const go = (d: number) => setIndex((i) => (i + d + cinemaHeroes.length) % cinemaHeroes.length);

  return (
    <div className="relative h-[240px] rounded-[12px] overflow-hidden">
      <Img src={hero.image} alt="" className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(16,10,14,0.72) 0%, rgba(16,10,14,0.35) 45%, rgba(16,10,14,0) 70%)" }} />
      <div className="relative pl-[39px] pt-[25px] max-w-[420px]">
        <p className="text-[10.5px] font-medium tracking-[0.42em] text-white/85 leading-[1.6]">
          {hero.eyebrow[0]}
          <br />
          {hero.eyebrow[1]}
        </p>
        <h1 className="mt-[14px] text-[31px] font-bold text-white leading-[1.16] max-w-[285px]">{hero.title}</h1>
        <p className="mt-[10px] text-[15.5px] text-white/85 leading-[1.4] max-w-[330px]">{hero.subtitle}</p>
      </div>
      <div className="absolute right-[14px] bottom-[16px] flex items-center gap-[14px]">
        <div className="flex gap-[6px] mr-3">
          {cinemaHeroes.map((_, i) => (
            <span key={i} className={`w-[7px] h-[7px] rounded-full ${i === index ? "bg-white" : "bg-white/40"}`} />
          ))}
        </div>
        {[-1, 1].map((d) => (
          <button
            key={d}
            onClick={() => go(d)}
            aria-label={d < 0 ? "Previous" : "Next"}
            className="w-[37px] h-[37px] rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/10"
            style={{ background: "rgba(20,14,18,0.5)" }}
          >
            <Icon name={d < 0 ? "chevron-left" : "chevron-right"} size={19} strokeWidth={2} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function CinemaContent() {
  const [section, setSection] = useState<Section>("discover");
  const { width } = useWindowChrome();
  const rail = width < 960;
  const mainWidth = width - (rail ? 80 : 201) - 45;
  const posterCols = mainWidth >= 640 ? "grid-cols-4" : "grid-cols-3";
  const stillCols = mainWidth >= 560 ? "grid-cols-3" : "grid-cols-2";

  return (
    <div className="flex h-full os-glass" style={{ background: "var(--os-surface)" }}>
      <DragRegion
        className={`flex flex-col shrink-0 ${rail ? "w-[80px] px-[10px]" : "w-[201px] pl-[15px] pr-[9px]"}`}
        style={{ background: "rgba(48, 28, 28, 0.5)" }}
      >
        <TrafficLights className={rail ? "mt-[17px] mx-auto" : "mt-[17px] ml-[3px]"} />
        <div className={`flex items-center gap-[14px] mt-[24px] ${rail ? "justify-center" : "ml-[14px]"}`}>
          <AppIcon icon="cinema" size={32} />
          {!rail && <span className="text-[19px] font-semibold text-white">Cinema</span>}
        </div>
        <div className="mt-[21px] space-y-[5px]" data-no-drag>
          {nav.map((n) => (
            <SidebarItem
              key={n.id}
              compact={rail}
              className={`h-[44px] text-[14px] tracking-[-0.01em] ${rail ? "" : "!px-[11px] !gap-[9px]"}`}
              icon={<Icon name={n.icon} size={20} className="text-white/90" />}
              label={n.label}
              active={section === n.id}
              onClick={() => setSection(n.id)}
            />
          ))}
        </div>
      </DragRegion>

      <main className="flex-1 min-w-0 overflow-auto dark-scrollbar pl-[4px] pr-[20px] pt-[35px] pb-[6px]" style={{ background: "rgba(24, 18, 22, 0.5)" }}>
        {section === "discover" && (
          <>
            <Hero />
            <div className="pl-[21px] pr-[3px]">
              <div className="mt-[14px]">
                <SectionHeader title="Favourite Films" onSeeAll={() => setSection("favourites")} />
              </div>
              <div className={`mt-[12px] grid ${posterCols} gap-[19px]`}>
                {favouriteFilms.map((f) => (
                  <Poster key={f.id} film={f} />
                ))}
              </div>
              <div className="mt-[14px]">
                <SectionHeader title="Recently Watched" onSeeAll={() => setSection("recent")} />
              </div>
              <div className={`mt-[8px] grid ${stillCols} gap-[21px]`}>
                {recentlyWatched.map((f) => (
                  <Still key={f.id} film={f} />
                ))}
              </div>
            </div>
          </>
        )}
        {section !== "discover" && (
          <div className="pl-[21px]">
            <SectionHeader title={nav.find((n) => n.id === section)!.label} />
            {section === "favourites" ? (
              <div className={`mt-[14px] grid ${posterCols} gap-[19px]`}>
                {favouriteFilms.map((f) => (
                  <Poster key={f.id} film={f} />
                ))}
              </div>
            ) : (
              <div className={`mt-[14px] grid ${stillCols} gap-[21px]`}>
                {(section === "watchlist" ? watchlist : recentlyWatched).map((f) => (
                  <Still key={f.id} film={f} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
