import type { CardPosition } from "./types";

const TOP_OFFSET = 140;

export interface PositionOptions {
  verticalSpacing: number;
  xMin: number;
  xMax: number;
}

const DEFAULT_OPTIONS: PositionOptions = {
  verticalSpacing: 450,
  xMin: 15,
  xMax: 85,
};

/**
 * Generate card positions. The x-values (as % of viewport width) are
 * randomised once per seed and stored; they are then clamped to the
 * provided xMin/xMax range on subsequent calls so cards stay within
 * bounds when the viewport narrows.
 */
export function generatePositions(
  count: number,
  options: PositionOptions = DEFAULT_OPTIONS,
): CardPosition[] {
  const { verticalSpacing, xMin, xMax } = options;
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * (xMax - xMin) + xMin,
    y: i * verticalSpacing + TOP_OFFSET,
  }));
}

/**
 * Re-map a set of existing positions to new layout parameters.
 * Keeps each card's *relative* horizontal placement (normalised 0-1
 * within the old range) but maps it into the new xMin/xMax range,
 * and recalculates y with the new spacing.
 */
export function remapPositions(
  existing: CardPosition[],
  oldOptions: PositionOptions,
  newOptions: PositionOptions,
): CardPosition[] {
  const { xMin: oldMin, xMax: oldMax } = oldOptions;
  const { verticalSpacing, xMin: newMin, xMax: newMax } = newOptions;
  const oldRange = oldMax - oldMin || 1;

  return existing.map((pos, i) => {
    // Normalise x to 0-1 within the old range, then map to new range
    const t = Math.min(1, Math.max(0, (pos.x - oldMin) / oldRange));
    return {
      x: t * (newMax - newMin) + newMin,
      y: i * verticalSpacing + TOP_OFFSET,
    };
  });
}
