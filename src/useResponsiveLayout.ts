import { useState, useEffect, useCallback } from "react";

export interface ResponsiveLayout {
  cardWidth: number;
  cardHeight: number;
  verticalSpacing: number;
  xMin: number;
  xMax: number;
}

/**
 * Computes responsive card dimensions and layout parameters based on
 * the current viewport width. On mobile screens, cards shrink and
 * spacing tightens so everything fits comfortably.
 *
 * Breakpoints:
 *   - < 480px  (small phone):   180 x 220,  spacing 340,  x 25-75
 *   - < 640px  (large phone):   200 x 250,  spacing 380,  x 22-78
 *   - < 768px  (small tablet):  220 x 270,  spacing 400,  x 20-80
 *   - >= 768px (tablet+):       250 x 300,  spacing 450,  x 15-85
 */
function computeLayout(width: number): ResponsiveLayout {
  if (width < 480) {
    return {
      cardWidth: 180,
      cardHeight: 220,
      verticalSpacing: 340,
      xMin: 25,
      xMax: 75,
    };
  }
  if (width < 640) {
    return {
      cardWidth: 200,
      cardHeight: 250,
      verticalSpacing: 380,
      xMin: 22,
      xMax: 78,
    };
  }
  if (width < 768) {
    return {
      cardWidth: 220,
      cardHeight: 270,
      verticalSpacing: 400,
      xMin: 20,
      xMax: 80,
    };
  }
  return {
    cardWidth: 250,
    cardHeight: 300,
    verticalSpacing: 450,
    xMin: 15,
    xMax: 85,
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
        prev.xMax === next.xMax
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
