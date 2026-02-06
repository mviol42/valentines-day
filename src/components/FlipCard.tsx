import { useState } from "react";
import type { CardConfig } from "../types";
import { EmojiAnimation } from "./EmojiAnimation";
import "./FlipCard.css";

interface FlipCardProps {
  card: CardConfig;
  width: number;
  height: number;
}

export function FlipCard({ card, width, height }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div
      className="flip-card"
      style={{ width, height }}
      onClick={handleClick}
    >
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        {/* Back face — shown by default (face-down / decorative cover) */}
        <div className="flip-card-back">
          <div className="back-pattern">
            <div className="back-border">
              <span className="back-emoji">{card.emoji}</span>
            </div>
          </div>
        </div>

        {/* Front face — revealed picture */}
        <div className="flip-card-front">
          <img
            src={card.imageSrc}
            alt={card.alt ?? "Valentine photo"}
            className="flip-card-image"
          />
        </div>
      </div>

      {/* Emoji burst animation — renders above the card, overflows visibly */}
      <EmojiAnimation
        emoji={card.emoji}
        trigger={flipped}
        width={width}
        height={height}
      />
    </div>
  );
}
