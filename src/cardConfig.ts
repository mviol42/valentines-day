import type { CardConfig } from "./types";

const basePath = import.meta.env.BASE_URL;

export const cards: CardConfig[] = [
  {
    id: "1",
    imageSrcs: [
      `${basePath}images/gaming/IMG_0498.jpeg`,
      `${basePath}images/gaming/grounded-review_jgf4.jpg`,
      `${basePath}images/gaming/lp_image.jpeg`,
    ],
    emoji: "🎮",
    alt: "Gaming",
  },
  {
    id: "2",
    imageSrcs: [
      `${basePath}images/hilo/7E2AC520-5658-47AF-AF8C-E6B6C9C5D9AF_1_105_c.jpeg`,
      `${basePath}images/hilo/yup.jpg`,
      `${basePath}images/hilo/934306C5-B7BF-4F03-9D02-E3121095666B_1_105_c.jpeg`,
      `${basePath}images/hilo/Screenshot-2026-02-05.png`,
    ],
    emoji: "🃏",
    alt: "Hilo",
  },
  {
    id: "3",
    imageSrcs: [
      `${basePath}images/general/IMG_8334.jpeg`,
      `${basePath}images/general/FullSizeRender.jpeg`,
      `${basePath}images/general/IMG_0323.jpeg`,
      `${basePath}images/general/IMG_4075.jpeg`,
      `${basePath}images/general/IMG_6114.jpeg`,
      `${basePath}images/general/IMG_7631.jpeg`,
    ],
    emoji: "💖",
    alt: "General",
  },
  {
    id: "4",
    imageSrcs: [
      `${basePath}images/jazz/27FF4C3D-758B-4F19-AE6F-736151621C8D_1_105_c.jpeg`,
      `${basePath}images/jazz/BCEB6C52-0FE0-4D45-A97F-F3109B10F2D0_1_105_c.jpeg`,
    ],
    emoji: "🎵",
    alt: "Jazz",
  },
  {
    id: "5",
    imageSrcs: [
      `${basePath}images/conclusion/happy_valentines.jpg`,
      `${basePath}images/conclusion/ily.jpg`,
    ],
    emoji: "💝",
    alt: "Conclusion",
  },
];
