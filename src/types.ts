export interface CardConfig {
  id: string;
  imageSrcs: string[];
  emoji: string;
  alt?: string;
}

export interface CardPosition {
  x: number;
  y: number;
}
