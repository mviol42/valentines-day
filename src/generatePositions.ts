import type { CardPosition } from "./types";

const TOP_OFFSET = 140;

/** Minimum gap (in %) between the two column zones */
const COLUMN_GAP = 15;

export interface PositionOptions {
  verticalSpacing: number;
  xMin: number;
  xMax: number;
  columns: number;
}

const DEFAULT_OPTIONS: PositionOptions = {
  verticalSpacing: 450,
  xMin: 15,
  xMax: 85,
  columns: 1,
};

function getColumnRanges(xMin: number, xMax: number, columns: number) {
  if (columns === 1) {
    return [{ min: xMin, max: xMax }];
  }
  const mid = (xMin + xMax) / 2;
  return [
    { min: xMin, max: mid - COLUMN_GAP },
    { min: mid + COLUMN_GAP, max: xMax },
  ];
}

/**
 * Generate card positions. With 1 column each card gets its own row.
 * With 2 columns, cards are paired into rows (card 0 & 1 share row 0, etc.)
 * with each card randomised within its column zone.
 */
export function generatePositions(
  count: number,
  options: PositionOptions = DEFAULT_OPTIONS,
): CardPosition[] {
  const { verticalSpacing, xMin, xMax, columns } = options;
  const ranges = getColumnRanges(xMin, xMax, columns);

  return Array.from({ length: count }, (_, i) => {
    const col = columns > 1 ? i % columns : 0;
    const row = columns > 1 ? Math.floor(i / columns) : i;
    const range = ranges[col];
    return {
      x: Math.random() * (range.max - range.min) + range.min,
      y: row * verticalSpacing + TOP_OFFSET,
    };
  });
}

/**
 * Re-map existing positions to new layout parameters.
 * If the column count changed the layout is fundamentally different,
 * so we regenerate from scratch. Otherwise we preserve each card's
 * relative x-placement within its column zone.
 */
export function remapPositions(
  existing: CardPosition[],
  oldOptions: PositionOptions,
  newOptions: PositionOptions,
): CardPosition[] {
  if (oldOptions.columns !== newOptions.columns) {
    return generatePositions(existing.length, newOptions);
  }

  const { verticalSpacing, columns } = newOptions;
  const oldRanges = getColumnRanges(oldOptions.xMin, oldOptions.xMax, columns);
  const newRanges = getColumnRanges(newOptions.xMin, newOptions.xMax, columns);

  return existing.map((pos, i) => {
    const col = columns > 1 ? i % columns : 0;
    const row = columns > 1 ? Math.floor(i / columns) : i;
    const oldRange = oldRanges[col];
    const newRange = newRanges[col];
    const oldSpan = oldRange.max - oldRange.min || 1;

    const t = Math.min(1, Math.max(0, (pos.x - oldRange.min) / oldSpan));
    return {
      x: t * (newRange.max - newRange.min) + newRange.min,
      y: row * verticalSpacing + TOP_OFFSET,
    };
  });
}
