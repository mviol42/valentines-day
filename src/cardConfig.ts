import type { CardConfig } from "./types";

const basePath = import.meta.env.BASE_URL;

export const cards: CardConfig[] = [
  { id: "1", imageSrc: `${basePath}images/photo1.jpg`, emoji: "💖", alt: "Photo 1" },
  { id: "2", imageSrc: `${basePath}images/photo2.jpg`, emoji: "🦋", alt: "Photo 2" },
  { id: "3", imageSrc: `${basePath}images/photo3.jpg`, emoji: "💌", alt: "Photo 3" },
  { id: "4", imageSrc: `${basePath}images/photo4.jpg`, emoji: "🌹", alt: "Photo 4" },
  { id: "5", imageSrc: `${basePath}images/photo5.jpg`, emoji: "😘", alt: "Photo 5" },
  { id: "6", imageSrc: `${basePath}images/photo6.jpg`, emoji: "💝", alt: "Photo 6" },
];
