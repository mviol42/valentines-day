# Requirements

## Project Overview

A Valentine's Day gift website featuring interactive flip-card pictures with emoji animations, hosted as a static page on GitHub Pages.

## Tech Stack

- React with TypeScript
- TailwindCSS for styling
- Static site deployable to GitHub Pages

## Functional Requirements

### Flip Cards

- Each picture starts face-down (hidden)
- Clicking or tapping a card flips it over to reveal the picture
- Flip animation should feel smooth and natural

### Emoji Animation

- When a card is flipped, an emoji animation triggers
- The emoji is configurable per card
- Animation mimics an iOS Messages "screen effect":
  - Multiple copies of the emoji spawn around the picture
  - The emojis float upward and fade out over time

### Card Layout

- Support 5-10 pictures (flexible/configurable count)
- Cards are arranged in a meandering vertical path:
  - Random horizontal (x-axis) positions
  - Constant vertical (y-axis) spacing between cards
- A fun dotted line connects the cards along the meandering path

## Non-Functional Requirements

- Must work on mobile (touch interactions, responsive layout)
- Must be hostable as a static site on GitHub Pages
- Keep configuration simple (image sources, emojis) so content is easy to swap
