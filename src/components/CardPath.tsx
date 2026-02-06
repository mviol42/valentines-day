import type { CardPosition } from "../types";

interface CardPathProps {
  positions: CardPosition[];
  cardHeight: number;
  containerHeight: number;
}

/**
 * Build an SVG cubic-bezier path string that meanders through the
 * center of each card. Control points are placed at the vertical
 * midpoint between consecutive cards, using each card's own x so
 * the curve sweeps left/right naturally.
 */
function buildPath(
  centers: { cx: number; cy: number }[]
): string {
  if (centers.length === 0) return "";
  if (centers.length === 1)
    return `M ${centers[0].cx} ${centers[0].cy}`;

  const parts: string[] = [];
  parts.push(`M ${centers[0].cx} ${centers[0].cy}`);

  for (let i = 1; i < centers.length; i++) {
    const prev = centers[i - 1];
    const curr = centers[i];

    // Control-point y is the vertical midpoint between the two cards
    const midY = (prev.cy + curr.cy) / 2;

    // Use cubic bezier: first control point keeps the previous card's
    // x (so the line departs vertically), second control point keeps
    // the next card's x (so the line arrives vertically).
    parts.push(`C ${prev.cx} ${midY}, ${curr.cx} ${midY}, ${curr.cx} ${curr.cy}`);
  }

  return parts.join(" ");
}

export function CardPath({
  positions,
  cardHeight,
  containerHeight,
}: CardPathProps) {
  if (positions.length < 2) return null;

  // Card centers: x is already a percentage (0-100), y is in pixels.
  // We offset y by half the card height to get the vertical center.
  const centers = positions.map((pos) => ({
    cx: pos.x,
    cy: pos.y + cardHeight / 2,
  }));

  const d = buildPath(centers);

  // The viewBox x-axis goes 0-100 (matching the percentage positions).
  // The viewBox y-axis matches the pixel height of the container.
  // preserveAspectRatio="none" stretches the viewBox to fill the SVG.
  // vector-effect="non-scaling-stroke" keeps the stroke width and dash
  // pattern at a consistent pixel size regardless of the stretch.
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width="100%"
      height={containerHeight}
      viewBox={`0 0 100 ${containerHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#f9a8d4" />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth={3}
        strokeDasharray="14 10"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.7}
      />
    </svg>
  );
}
