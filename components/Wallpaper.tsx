import { images } from "@/data/images";

/**
 * The shared OS wallpaper. `blurred` (lock screen) uses a pre-blurred image
 * instead of a live CSS filter, which is far cheaper to draw and animate.
 */
export function Wallpaper({ blurred = false }: { blurred?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${blurred ? images.wallpaperBlurred : images.wallpaper})` }}
      />
    </div>
  );
}
