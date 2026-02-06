# Tasks

## 1. Project Setup

- [x] Initialize React + TypeScript project with Vite
- [x] Install and configure TailwindCSS
- [x] Configure `vite.config.ts` for GitHub Pages (set `base` path)
- [x] Set up project folder structure (`src/components/`, `public/images/`)

## 2. Card Configuration

- [x] Define `CardConfig` interface
- [x] Create config file with card data (image paths, emojis)
- [x] Add placeholder images for development

## 3. Layout Engine

- [x] Implement position generation (random x, fixed y-spacing)
- [x] Create scrollable container with absolute-positioned cards
- [x] Ensure positions respect viewport bounds with padding

## 4. FlipCard Component

- [x] Build card structure (front face, back face, inner wrapper)
- [x] Implement CSS 3D flip animation with `perspective` and `backface-visibility`
- [x] Handle click/tap to toggle flipped state
- [x] Style the card back (decorative face-down design)

## 5. Emoji Animation

- [x] Create `EmojiAnimation` component
- [x] Implement emoji spawning logic (15-25 copies per flip)
- [x] Randomize per-emoji: position, float speed, drift, size
- [x] CSS `@keyframes` for float-up and fade-out
- [x] Clean up emoji elements after animation ends

## 6. Dotted Path Line

- [x] Create `CardPath` SVG component
- [x] Generate bezier curve path through card positions
- [x] Style as a fun dotted/dashed line

## 7. Responsive / Mobile

- [x] Test and adjust layout for mobile viewports
- [x] Ensure touch interactions work properly
- [x] Scale cards and spacing for smaller screens

## 8. Polish and Content

- [x] Add real photos and choose emojis per card
- [x] Tweak animation timing and feel
- [x] Add page background / overall styling

## 9. Deployment

- [x] Build and verify static output
- [x] Configure GitHub Pages deployment (Actions or branch-based)
- [ ] Test deployed site on mobile and desktop
