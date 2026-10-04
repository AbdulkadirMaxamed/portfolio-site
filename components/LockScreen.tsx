"use client";

import { useState, useEffect, useCallback } from "react";
import { Wallpaper } from "./Wallpaper";
import { TopBar } from "./TopBar";
import { Icon } from "./ui/Icon";
import { AppIcon } from "./AppIcons";
import { profile } from "@/data/profile";
import { currentBag } from "@/data/coffee";
import { images } from "@/data/images";

interface LockScreenProps {
  onUnlock: () => void;
}

function LockClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  if (!now) return <div className="h-[128px]" />;

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const date = `${now.toLocaleDateString("en-GB", { weekday: "long" })}, ${now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  })}`;

  return (
    <div className="text-center">
      <div className="text-[23px] short:text-[20px] text-white/95 font-medium tracking-[0.01em]">{date}</div>
      <div
        className="text-[88px] short:text-[72px] shorter:text-[60px] leading-[1.05] font-bold text-white tracking-[-0.01em] mt-1"
        style={{ textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
      >
        {time}
      </div>
    </div>
  );
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [unlocking, setUnlocking] = useState(false);

  const handleUnlock = useCallback(() => {
    if (unlocking) return;
    setUnlocking(true);
    setTimeout(onUnlock, 500);
  }, [onUnlock, unlocking]);

  // Download + decode the full desktop wallpaper while the lock screen is up,
  // so unlocking doesn't stall on a large image decode.
  useEffect(() => {
    const img = new Image();
    img.src = images.wallpaper;
    img.decode?.().catch(() => {});
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUnlock);
    window.addEventListener("mousedown", handleUnlock);
    window.addEventListener("touchstart", handleUnlock);
    return () => {
      window.removeEventListener("keydown", handleUnlock);
      window.removeEventListener("mousedown", handleUnlock);
      window.removeEventListener("touchstart", handleUnlock);
    };
  }, [handleUnlock]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col overflow-hidden select-none transition-all duration-500 ${
        unlocking ? "opacity-0 scale-[1.03]" : "opacity-100"
      }`}
    >
      <Wallpaper blurred />

      <TopBar variant="lock" />

      <div className="relative flex-1 flex items-center justify-center px-4">
        <div className="flex flex-col items-center -translate-y-[90px] short:-translate-y-[60px] shorter:-translate-y-[30px] animate-lock-slide-up">
          <LockClock />

          <div
            className="mt-9 short:mt-7 shorter:mt-5 w-[166px] h-[166px] short:w-[130px] short:h-[130px] shorter:w-[104px] shorter:h-[104px] rounded-full overflow-hidden border-2 border-white/40"
            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
          </div>

          <p className="mt-5 shorter:mt-4 text-[24px] short:text-[22px] font-semibold text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            {profile.lockTagline}
          </p>

          <div
            className="mt-9 short:mt-7 shorter:mt-5 flex items-center justify-center gap-3 w-[356px] max-w-[88vw] h-[60px] shorter:h-[52px] rounded-full border border-white/30 os-glass text-[19px] text-white"
            style={{ background: "rgba(44, 34, 58, 0.42)" }}
          >
            Click anywhere to enter
            <Icon name="arrow-right" size={20} strokeWidth={2} />
          </div>
        </div>

        {/* Currently drinking widget */}
        <div
          className="absolute left-4 sm:left-10 bottom-[70px] short:bottom-10 shorter:bottom-6 flex items-center gap-5 pl-6 pr-7 h-[90px] rounded-[22px] border border-white/20 os-glass"
          style={{ background: "rgba(34, 26, 34, 0.5)" }}
        >
          <AppIcon icon="brew" size={52} />
          <div>
            <div className="text-[15px] text-white/85">Currently drinking</div>
            <div className="text-[19px] font-semibold text-white mt-0.5">
              {currentBag.name}, {currentBag.origin}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
