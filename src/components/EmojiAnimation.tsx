import { useEffect, useRef, useState } from "react";
import "./EmojiAnimation.css";

interface EmojiParticle {
  id: number;
  emoji: string;
  style: React.CSSProperties;
}

interface EmojiAnimationProps {
  emoji: string;
  trigger: boolean;
  width: number;
  height: number;
}

/** Returns a random number between min and max (inclusive). */
function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate starting positions spread around the card edges.
 * We pick randomly from: top edge, bottom edge, left edge, right edge.
 */
function randomEdgePosition(width: number, height: number): { x: number; y: number } {
  const edge = Math.floor(Math.random() * 4);
  switch (edge) {
    case 0: // top edge
      return { x: rand(0, width), y: rand(-10, 10) };
    case 1: // bottom edge
      return { x: rand(0, width), y: rand(height - 10, height + 10) };
    case 2: // left edge
      return { x: rand(-10, 10), y: rand(0, height) };
    case 3: // right edge
      return { x: rand(width - 10, width + 10), y: rand(0, height) };
    default:
      return { x: width / 2, y: height / 2 };
  }
}

/** Reference card width used to compute proportional scaling factors. */
const BASE_CARD_WIDTH = 250;

function spawnParticles(
  emoji: string,
  width: number,
  height: number,
): EmojiParticle[] {
  // Scale particle count, distances, and font sizes relative to card size
  const scaleFactor = width / BASE_CARD_WIDTH; // 1.0 at 250px, ~0.72 at 180px

  const minCount = Math.max(8, Math.floor(15 * scaleFactor));
  const maxCount = Math.max(12, Math.floor(26 * scaleFactor));
  const count = Math.floor(rand(minCount, maxCount + 1));

  const particles: EmojiParticle[] = [];

  for (let i = 0; i < count; i++) {
    const pos = randomEdgePosition(width, height);
    const scale = rand(0.6, 1.5) * scaleFactor;
    const duration = rand(1.2, 2.6); // slightly longer for smoother feel
    const delay = rand(0, 0.5); // slightly more stagger
    const floatDistance = rand(-200, -420) * scaleFactor; // upward (negative Y)
    const drift = rand(-100, 100) * scaleFactor; // wider horizontal drift
    const fontSize = rand(1.2, 2.6) * scaleFactor; // rem
    const spin = rand(-40, 40); // rotation in degrees

    particles.push({
      id: i,
      emoji,
      style: {
        left: pos.x,
        top: pos.y,
        fontSize: `${fontSize}rem`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        "--emoji-scale": scale,
        "--float-distance": `${floatDistance}px`,
        "--drift": `${drift}px`,
        "--spin": `${spin}deg`,
      } as React.CSSProperties,
    });
  }

  return particles;
}

export function EmojiAnimation({ emoji, trigger, width, height }: EmojiAnimationProps) {
  const [particles, setParticles] = useState<EmojiParticle[]>([]);
  const prevTrigger = useRef(false);
  const animationKey = useRef(0);

  useEffect(() => {
    // Only spawn when trigger transitions from false to true (card flipped open)
    if (trigger && !prevTrigger.current) {
      animationKey.current += 1;

      // Delay particle spawn so the flip animation and image decode get priority
      const spawnTimer = setTimeout(() => {
        setParticles(spawnParticles(emoji, width, height));
      }, 300);

      // Clean up particles after the longest possible animation finishes
      // 300ms spawn delay + max duration (2.6s) + max delay (0.5s) + buffer = 3.8s
      const cleanupTimer = setTimeout(() => {
        setParticles([]);
      }, 3800);

      prevTrigger.current = trigger;
      return () => {
        clearTimeout(spawnTimer);
        clearTimeout(cleanupTimer);
      };
    }

    prevTrigger.current = trigger;
  }, [trigger, emoji, width, height]);

  if (particles.length === 0) return null;

  return (
    <div className="emoji-animation-container" key={animationKey.current}>
      {particles.map((p) => (
        <span key={p.id} className="emoji-particle" style={p.style}>
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
