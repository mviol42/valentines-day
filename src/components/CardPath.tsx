import type { CardPosition } from "../types";

interface CardPathProps {
  positions: CardPosition[];
  cardHeight: number;
  containerHeight: number;
}

/**
 * Build an SVG cubic-bezier path with swoopy, nonlinear curves.
 *
 * - Diagonal / vertical segments get an S-curve: control points are
 *   pushed sideways (alternating direction) so the line overshoots
 *   before arriving at the next card.
 * - Same-row segments (2-column layout) get a downward arc that dips
 *   between the pair of cards.
 */
function buildPath(
  centers: { cx: number; cy: number }[]
): string {
  if (centers.length === 0) return "";
  if (centers.length === 1)
    return `M ${centers[0].cx} ${centers[0].cy}`;

  /** Horizontal overshoot for S-curves (viewBox x units, 0-100) */
  const SWOOP_X = 10;
  /** Vertical dip for same-row arcs (pixels) */
  const ARC_DIP = 80;

  const parts: string[] = [];
  parts.push(`M ${centers[0].cx} ${centers[0].cy}`);

  for (let i = 1; i < centers.length; i++) {
    const prev = centers[i - 1];
    const curr = centers[i];
    const dy = curr.cy - prev.cy;
    const swoopDir = i % 2 === 0 ? 1 : -1;

    if (Math.abs(dy) < 10) {
      // Same-row pair: arc downward between the two cards
      const dipY = prev.cy + ARC_DIP;
      const cp1x = prev.cx + (curr.cx - prev.cx) * 0.25;
      const cp2x = prev.cx + (curr.cx - prev.cx) * 0.75;
      parts.push(`C ${cp1x} ${dipY}, ${cp2x} ${dipY}, ${curr.cx} ${curr.cy}`);
    } else {
      // Diagonal / vertical: S-curve with horizontal overshoot
      const sx = SWOOP_X * swoopDir;
      const cp1x = prev.cx + sx;
      const cp1y = prev.cy + dy * 0.4;
      const cp2x = curr.cx - sx;
      const cp2y = prev.cy + dy * 0.6;
      parts.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.cx} ${curr.cy}`);
    }
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
