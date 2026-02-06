# Design

## Architecture

Single-page React application built with Vite, using TypeScript and TailwindCSS. The app renders a scrollable vertical page of flip cards connected by a dotted SVG path.

## Component Hierarchy

```
App
├── CardPath          (SVG dotted line connecting card positions)
└── CardList
    └── FlipCard[]    (individual interactive cards)
        ├── CardBack  (face-down state, decorative cover)
        ├── CardFront (revealed picture)
        └── EmojiAnimation (floating emoji effect)
```

## Key Components

### `App`

- Loads card configuration (image src, emoji, etc.)
- Generates randomized x-positions for each card with fixed y-spacing
- Renders the path and card list

### `CardPath`

- Takes an array of `{x, y}` card center positions
- Renders an SVG with a dotted curved line connecting all points
- Uses quadratic/cubic bezier curves for the meandering effect

### `FlipCard`

- Manages `flipped` (boolean) and `imageIndex` (number) state
- CSS 3D transform for the flip animation (`rotateY(180deg)`)
- Click behavior cycles through three phases:
  1. Back → first image: toggles `flipped` true (CSS transition fires, emoji burst)
  2. Image → next image: increments `imageIndex` while `flipped` stays true (no CSS transition, instant swap)
  3. Last image → back: toggles `flipped` false (CSS transition fires)
- On first flip, triggers the `EmojiAnimation`

### `EmojiAnimation`

- Spawns 15-25 copies of the configured emoji around the card
- Each emoji has randomized:
  - Starting position (spread around the card edges)
  - Float speed / duration
  - Horizontal drift
  - Size variation
- Emojis float upward with CSS `@keyframes` and fade out
- Cleans up DOM elements after animation completes

## Data Model

```typescript
interface CardConfig {
  id: string;
  imageSrcs: string[];  // supports multiple images per card
  emoji: string;
  alt?: string;
}
```

Card positions are computed at mount time:

```typescript
interface CardPosition {
  x: number; // random within page bounds (with padding)
  y: number; // index * VERTICAL_SPACING + offset
}
```

## Layout Strategy

- The page is a tall scrollable container
- Each card is absolutely positioned at its computed `{x, y}`
- X positions are randomized within a safe range (e.g., 15%-85% of viewport width)
- Y positions are evenly spaced (e.g., every 400-500px)
- The SVG path layer sits behind the cards (z-index layering)

## Flip Animation

- Use CSS `perspective` on the card container
- Card inner element uses `transform-style: preserve-3d`
- Front and back faces use `backface-visibility: hidden`
- Transition: `transform 0.6s ease-in-out`
- On click, toggle a `flipped` class that applies `rotateY(180deg)`

## Emoji Float Animation

CSS keyframes approach:

```css
@keyframes emojiFloat {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-300px) scale(0.5);
  }
}
```

Each emoji instance gets randomized `animation-duration`, `animation-delay`, and starting offsets via inline styles.

## Configuration

A single config file/array at the top of the project where images and emojis are defined:

```typescript
const cards: CardConfig[] = [
  { id: "1", imageSrcs: ["/images/photo1a.jpg", "/images/photo1b.jpg"], emoji: "❤️" },
  { id: "2", imageSrcs: ["/images/photo2a.jpg"], emoji: "😍" },
  // ...
];
```

## Responsive Design

- Cards scale down on smaller viewports
- X-position randomization respects current viewport width
- Touch events handled natively (click/tap both work)
- TailwindCSS breakpoints for any needed adjustments

## Deployment

- Vite build produces static assets in `dist/`
- GitHub Pages serves from `dist/` or via GitHub Actions
- Base path configured in `vite.config.ts` for the repo name
