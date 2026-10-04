"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DragRegion, TrafficLights, useWindowChrome } from "../Window";
import { Icon } from "../ui/Icon";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { currentBag, currentBrew } from "@/data/coffee";
import { favouriteFilms } from "@/data/films";
import { nowCards } from "@/data/now";
import { cv } from "@/data/cv";
import { useOpenApp } from "@/lib/useOpenApp";

const C = {
  prompt: "#9ad869",
  cmd: "#62c6e6",
  accent: "#f3a24a",
  label: "#a9a6c6",
  dim: "#aaa2ad",
  text: "#ece7e4",
};

const commands: [string, string][] = [
  ["whoami", "Show who I am"],
  ["projects", "Things I've built"],
  ["skills", "Technologies I use"],
  ["coffee", "Current coffee & brewing setup"],
  ["movies", "My favourite films"],
  ["now", "What I'm working on right now"],
  ["contact", "How to reach me"],
  ["neofetch", "System information"],
  ["clear", "Clear the terminal"],
];

function Prompt({ children }: { children?: ReactNode }) {
  return (
    <div>
      <span style={{ color: C.prompt }}>guest@portfolio</span>
      <span style={{ color: C.text }}>:~$ </span>
      {children}
    </div>
  );
}

function Banner() {
  return (
    <div className="flex items-center gap-[34px] mb-[16px]">
      <pre className="leading-[1.3] text-[19px]" style={{ color: C.accent }}>{` /\\_/\\\n( •ω• )\n /  つ /`}</pre>
      <div>
        <div style={{ color: C.text }}>Portfolio OS Terminal</div>
        <div className="italic" style={{ color: C.dim }}>
          Type &apos;help&apos; to see available commands.
        </div>
      </div>
    </div>
  );
}

function Help() {
  return (
    <div>
      <div>Available commands:</div>
      {commands.map(([c, d]) => (
        <div key={c} className="flex">
          <span className="w-[127px] pl-[24px] shrink-0" style={{ color: C.cmd }}>
            {c}
          </span>
          <span>{d}</span>
        </div>
      ))}
    </div>
  );
}

function Coffee() {
  const rows: [string, string, string][] = [
    ["bean", "Bean", `${currentBag.name} (${currentBag.origin})`],
    ["cup", "Machine", currentBrew.machine],
    ["scale", "Dose", `${currentBrew.dose} coffee`],
    ["settings", "Grind", currentBrew.grind],
    ["timer", "Shot Time", currentBrew.shotTime],
    ["leaf", "Tasting Notes", currentBag.tastingNotes.map((n) => n.label).join(" · ")],
  ];
  return (
    <div>
      <div className="flex gap-[26px] mt-[10px]">
        <svg width="76" height="84" viewBox="0 0 76 84" className="mt-[2px] ml-[12px] shrink-0" fill="none" stroke={C.accent} strokeWidth="2.6" strokeLinecap="round" aria-hidden>
          <path d="M30 4c-3 4 3 6 0 10M38 2c-3 4 3 6 0 10M46 4c-3 4 3 6 0 10" />
          <path d="M10 26h46v14c0 13-10 22-23 22S10 53 10 40Z" />
          <path d="M56 32h5a7 7 0 0 1 0 14h-6" />
          <path d="M14 36h38" />
          <path d="M4 70h62M12 76h46" />
        </svg>
        <div className="border-l pl-[18px]" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
          <div className="mb-[4px]" style={{ color: C.accent }}>
            Currently Brewing
          </div>
          {rows.map(([icon, k, v]) => (
            <div key={k} className="flex items-center leading-[1.55]">
              <Icon name={icon} size={17} className="mr-[18px] shrink-0" style={{ color: C.label }} />
              <span className="w-[112px] shrink-0 font-sans" style={{ color: C.label }}>
                {k}
              </span>
              <span className="mr-[14px]">:</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
      {currentBag.quote && (
        <div className="mt-[12px] italic" style={{ color: C.dim }}>
          “{currentBag.quote}”
          <br />
          Good coffee fuels better code. ☕
        </div>
      )}
    </div>
  );
}

function List({ items }: { items: [string, string][] }) {
  return (
    <div>
      {items.map(([a, b]) => (
        <div key={a} className="flex">
          <span className="w-[200px] pl-[24px] shrink-0" style={{ color: C.cmd }}>
            {a}
          </span>
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}

function run(cmd: string, openApp: (id: string) => void): ReactNode {
  const [name, ...args] = cmd.trim().split(/\s+/);
  switch (name) {
    case "help":
      return <Help />;
    case "whoami":
      return (
        <div>
          <div style={{ color: C.accent }}>{profile.name}</div>
          <div>{profile.role}</div>
          <div style={{ color: C.dim }}>{profile.about.intro}</div>
        </div>
      );
    case "projects":
      return <List items={projects.map((p) => [p.name, p.stack])} />;
    case "skills":
      return <List items={cv.skills.map((s) => [s.label, s.value])} />;
    case "coffee":
      return <Coffee />;
    case "movies":
      return <List items={favouriteFilms.map((f) => [f.title, `${f.year}  ${"★".repeat(f.rating)}${"☆".repeat(5 - f.rating)}`])} />;
    case "now":
      return <List items={nowCards.map((n) => [n.label, n.title])} />;
    case "contact":
      return <List items={profile.socials.map((s) => [s.label, s.display])} />;
    case "neofetch":
      return (
        <div className="flex gap-8">
          <pre className="leading-[1.3]" style={{ color: C.accent }}>{` /\\_/\\\n( •ω• )\n /  つ /`}</pre>
          <div>
            <div>
              <span style={{ color: C.prompt }}>guest</span>@<span style={{ color: C.prompt }}>portfolio</span>
            </div>
            <div>───────────────</div>
            {[
              ["OS", "Portfolio OS 1.0"],
              ["Host", profile.name],
              ["Kernel", "next.js"],
              ["Shell", "portfolio-sh"],
              ["WM", "React window manager"],
              ["Theme", "Sunset [dark]"],
              ["Fuel", `${currentBag.name} (${currentBrew.method})`],
            ].map(([k, v]) => (
              <div key={k}>
                <span style={{ color: C.accent }}>{k}</span>: {v}
              </div>
            ))}
          </div>
        </div>
      );
    case "open":
      if (args[0]) {
        openApp(args[0]);
        return <div style={{ color: C.dim }}>Opening {args[0]}…</div>;
      }
      return <div>usage: open &lt;app&gt;</div>;
    case "":
      return null;
    default:
      return <div>{name}: command not found. Type &apos;help&apos; for a list of commands.</div>;
  }
}

interface Entry {
  id: number;
  cmd: string;
  output: ReactNode;
}

export function TerminalContent() {
  const { close } = useWindowChrome();
  const openApp = useOpenApp();
  const [entries, setEntries] = useState<Entry[]>(() => [
    { id: 0, cmd: "help", output: <Help /> },
    { id: 1, cmd: "coffee", output: <Coffee /> },
  ]);
  const [showBanner, setShowBanner] = useState(true);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["help", "coffee"]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [entries]);

  function submit() {
    const cmd = input;
    setInput("");
    setHistIndex(null);
    if (cmd.trim()) setHistory((h) => [...h, cmd]);
    if (cmd.trim() === "clear") {
      setEntries([]);
      setShowBanner(false);
      return;
    }
    setEntries((e) => [...e, { id: nextId.current++, cmd, output: run(cmd, openApp) }]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = histIndex === null ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === null) return;
      const i = histIndex + 1;
      if (i >= history.length) {
        setHistIndex(null);
        setInput("");
      } else {
        setHistIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
      setShowBanner(false);
    }
    // Keep Escape from closing the window while typing
    e.stopPropagation();
  }

  return (
    <div className="flex flex-col h-full os-glass" style={{ background: "rgba(30, 18, 30, 0.88)" }}>
      <DragRegion className="h-[48px] shrink-0 flex items-center pl-[17px] pr-[20px] border-b border-white/[0.06]" style={{ background: "rgba(22, 20, 34, 0.7)" }}>
        <TrafficLights className="mr-[22px]" />
        <div className="h-[36px] w-[190px] rounded-[8px] flex items-center gap-3 px-[12px] text-[15px] text-white/95" style={{ background: "rgba(255,255,255,0.07)" }}>
          <Icon name="folder" size={16} />
          <span className="flex-1 font-medium">Terminal</span>
          <button onClick={close} aria-label="Close tab" className="text-white/70 hover:text-white">
            <Icon name="x" size={15} strokeWidth={2} />
          </button>
        </div>
        <button className="ml-4 text-white/85" aria-label="New tab">
          <Icon name="plus" size={19} />
        </button>
        <div className="flex-1" />
        <Icon name="more-vertical" size={20} className="text-white/85" />
      </DragRegion>

      <div
        ref={scrollRef}
        className="flex-1 overflow-auto dark-scrollbar font-mono text-[16px] leading-[1.42] px-[25px] pt-[18px] pb-6 cursor-text"
        style={{ color: C.text }}
        onClick={() => inputRef.current?.focus()}
      >
        {showBanner && <Banner />}
        {entries.map((e) => (
          <div key={e.id} className="mb-[16px]">
            <Prompt>
              <span style={{ color: e.cmd.trim() === "help" ? C.text : C.cmd }}>{e.cmd}</span>
            </Prompt>
            {e.output}
          </div>
        ))}
        <Prompt>
          <span className="relative">
            <span>{input}</span>
            <span className="inline-block w-[10px] h-[20px] align-[-4px] ml-[2px] bg-[#ece7e4] animate-lock-pulse" />
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal input"
              spellCheck={false}
              autoComplete="off"
              className="absolute inset-0 opacity-0 w-full"
            />
          </span>
        </Prompt>
      </div>
    </div>
  );
}
