import { useState, useRef, useMemo } from "react";
import { cards } from "./cardConfig";
import { generatePositions, remapPositions } from "./generatePositions";
import type { PositionOptions } from "./generatePositions";
import { FlipCard } from "./components/FlipCard";
import { CardPath } from "./components/CardPath";
import type { CardPosition } from "./types";
import { useResponsiveLayout } from "./useResponsiveLayout";

const BOTTOM_PADDING = 200;

function App() {
  const layout = useResponsiveLayout();
  const { cardWidth, cardHeight, verticalSpacing, xMin, xMax, columns } = layout;

  // Build position options object from the current layout
  const currentOptions: PositionOptions = useMemo(
    () => ({ verticalSpacing, xMin, xMax, columns }),
    [verticalSpacing, xMin, xMax, columns],
  );

  // Store initial positions + the options they were generated with
  const [positions, setPositions] = useState<CardPosition[]>(() =>
    generatePositions(cards.length, currentOptions),
  );
  const prevOptions = useRef<PositionOptions>(currentOptions);

  // When the responsive layout changes, remap positions to the new range
  const mappedPositions = useMemo(() => {
    if (
      prevOptions.current.verticalSpacing === currentOptions.verticalSpacing &&
      prevOptions.current.xMin === currentOptions.xMin &&
      prevOptions.current.xMax === currentOptions.xMax &&
      prevOptions.current.columns === currentOptions.columns
    ) {
      return positions;
    }
    const remapped = remapPositions(positions, prevOptions.current, currentOptions);
    // Update refs / state so the next comparison starts from here
    prevOptions.current = currentOptions;
    setPositions(remapped);
    return remapped;
  }, [positions, currentOptions]);

  const lastY =
    mappedPositions.length > 0
      ? mappedPositions[mappedPositions.length - 1].y
      : 0;
  const containerHeight = lastY + cardHeight + BOTTOM_PADDING;

  return (
    <div
      className="relative min-h-screen"
      style={{ height: containerHeight }}
    >
      {/* Header section */}
      <div className="relative z-10 pt-8 sm:pt-10 pb-2 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 drop-shadow-sm">
          Happy Valentine's Day
        </h1>
        <p className="mt-2 text-sm sm:text-base text-pink-400 font-medium tracking-wide">
          Tap each card to reveal a surprise
        </p>
      </div>

      <CardPath
        positions={mappedPositions}
        cardHeight={cardHeight}
        containerHeight={containerHeight}
      />

      {cards.map((card, i) => {
        const pos = mappedPositions[i];
        return (
          <div
            key={card.id}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: pos.y,
              width: cardWidth,
              height: cardHeight,
              transform: "translateX(-50%)",
            }}
          >
            <FlipCard card={card} width={cardWidth} height={cardHeight} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
