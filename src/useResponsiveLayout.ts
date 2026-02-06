import { useState, useEffect, useCallback } from "react";

export interface ResponsiveLayout {
  cardWidth: number;
  cardHeight: number;
  verticalSpacing: number;
  xMin: number;
  xMax: number;
  columns: number;
}

/**
 * Computes responsive card dimensions and layout parameters based on
 * the current viewport width. Cards use a 3:4 aspect ratio (matching
 * the source photos). On mobile screens, cards shrink and spacing
 * tightens so everything fits comfortably.
 *
 * Breakpoints (all cards 3:4):
 *   - < 480px  (small phone):   180 x 240,  spacing 360,  x 25-75
 *   - < 640px  (large phone):   200 x 267,  spacing 397,  x 22-78
 *   - < 768px  (small tablet):  220 x 293,  spacing 423,  x 20-80
 *   - < 1024px (tablet):        250 x 333,  spacing 483,  x 15-85
 *   - < 1440px (desktop):       300 x 400,  spacing 470,  x 20-80
 *   - >= 1440px (large):        340 x 453,  spacing 523,  x 18-82
 */
function computeLayout(width: number): ResponsiveLayout {
  if (width < 480) {
    return {
      cardWidth: 180,
      cardHeight: 240,
      verticalSpacing: 360,
      xMin: 25,
      xMax: 75,
      columns: 1,
    };
  }
  if (width < 640) {
    return {
      cardWidth: 200,
      cardHeight: 267,
      verticalSpacing: 397,
      xMin: 22,
      xMax: 78,
      columns: 1,
    };
  }
  if (width < 768) {
    return {
      cardWidth: 220,
      cardHeight: 293,
      verticalSpacing: 423,
      xMin: 20,
      xMax: 80,
      columns: 1,
    };
  }
  if (width < 1024) {
    return {
      cardWidth: 250,
      cardHeight: 333,
      verticalSpacing: 483,
      xMin: 15,
      xMax: 85,
      columns: 1,
    };
  }
  if (width < 1440) {
    return {
      cardWidth: 300,
      cardHeight: 400,
      verticalSpacing: 470,
      xMin: 20,
      xMax: 80,
      columns: 2,
    };
  }
  return {
    cardWidth: 340,
    cardHeight: 453,
    verticalSpacing: 523,
    xMin: 18,
    xMax: 82,
    columns: 2,
  };
}

/**
 * Hook that returns responsive layout values and re-renders the
 * component when the viewport width crosses a breakpoint boundary.
 */
export function useResponsiveLayout(): ResponsiveLayout {
  const [layout, setLayout] = useState<ResponsiveLayout>(() =>
    computeLayout(window.innerWidth)
  );

  const handleResize = useCallback(() => {
    setLayout((prev) => {
      const next = computeLayout(window.innerWidth);
      // Only update state if values actually changed (avoids unnecessary re-renders)
      if (
        prev.cardWidth === next.cardWidth &&
        prev.cardHeight === next.cardHeight &&
        prev.verticalSpacing === next.verticalSpacing &&
        prev.xMin === next.xMin &&
        prev.xMax === next.xMax &&
        prev.columns === next.columns
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return layout;
}
