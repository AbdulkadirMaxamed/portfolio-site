import { images } from "@/data/images";

/** The shared OS wallpaper. `blurred` is used by the lock screen. */
export function Wallpaper({ blurred = false }: { blurred?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images.wallpaper})`,
          ...(blurred
            ? { filter: "blur(4px) brightness(0.88) saturate(1.05)", transform: "scale(1.02)" }
            : null),
        }}
      />
    </div>
  );
}
