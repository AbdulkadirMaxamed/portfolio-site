import { Icon } from "./Icon";

export function Stars({
  rating,
  size = 14,
  color = "#fca41b",
  emptyColor = "rgba(255,255,255,0.45)",
  gap = 2,
}: {
  rating: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  gap?: number;
}) {
  return (
    <span className="inline-flex items-center" style={{ gap }} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="star"
          size={size}
          strokeWidth={1.6}
          style={{ color: i < rating ? color : emptyColor }}
          fill={i < rating ? color : "none"}
        />
      ))}
    </span>
  );
}
