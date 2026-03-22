"use client";

import { useState, useEffect, useCallback } from "react";

interface LockScreenProps {
  onUnlock: () => void;
}

function LockClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-center mb-8">
      <div className="text-7xl sm:text-8xl font-normal text-white tracking-tight">
        {time}
      </div>
      <div className="text-lg sm:text-xl text-white/70 mt-2 font-light">
        {date}
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
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center font-[family-name:var(--font-bungee)] transition-opacity duration-500 ${
        unlocking ? "opacity-0 scale-105" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, #1a1a3e 0%, #0d0d1f 40%, #0a0a15 100%)",
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 80%, rgba(72, 185, 199, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <LockClock />

        <p className="text-white/50 text-sm animate-lock-pulse">
          Press any key to unlock
        </p>
      </div>
    </div>
  );
}
