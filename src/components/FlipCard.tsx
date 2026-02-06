import { useState, useEffect } from "react";
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
  const [imageIndex, setImageIndex] = useState(0);

  // Preload the next image in the sequence so it's ready on click
  useEffect(() => {
    let nextSrc: string | undefined;
    if (!flipped) {
      nextSrc = card.imageSrcs[0];
    } else if (imageIndex < card.imageSrcs.length - 1) {
      nextSrc = card.imageSrcs[imageIndex + 1];
    }
    if (nextSrc) {
      const img = new Image();
      img.src = nextSrc;
    }
  }, [flipped, imageIndex, card.imageSrcs]);

  const handleClick = () => {
    if (!flipped) {
      // Flip to reveal first image (with animation + emoji burst)
      setImageIndex(0);
      setFlipped(true);
    } else if (imageIndex < card.imageSrcs.length - 1) {
      // Cycle to next image (no animation — flipped stays true, just swap src)
      setImageIndex((prev) => prev + 1);
    } else {
      // After last image, flip back to backside (with animation)
      setFlipped(false);
    }
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
            src={card.imageSrcs[imageIndex]}
            alt=""
            aria-hidden="true"
            className="flip-card-image-bg"
          />
          <img
            src={card.imageSrcs[imageIndex]}
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
