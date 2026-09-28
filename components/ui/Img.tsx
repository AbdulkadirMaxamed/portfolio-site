/* eslint-disable @next/next/no-img-element */

/**
 * Image with a warm gradient fallback, so missing personal imagery
 * still renders as a tidy placeholder. Paths come from data/images.ts.
 */
export function Img({ src, alt = "", className = "" }: { src?: string; alt?: string; className?: string }) {
  if (!src) {
    return (
      <div
        className={`bg-gradient-to-br from-[#3a2433] via-[#6b3a3a] to-[#e0763d] ${className}`}
        role="img"
        aria-label={alt || "Image placeholder"}
      />
    );
  }
  return <img src={src} alt={alt} className={`object-cover ${className}`} draggable={false} />;
}
