export interface CardConfig {
  id: string;
  imageSrcs: string[];
  emoji: string;
  alt?: string;
  imageFit?: "contain" | "cover";
}

export interface CardPosition {
  x: number;
  y: number;
}
