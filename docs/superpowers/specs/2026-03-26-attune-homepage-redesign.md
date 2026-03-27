# Attune Homepage Redesign — Design Spec
**Date:** 2026-03-26
**Status:** Approved

---

## Overview

A modern minimalist SaaS-style homepage for the Attune personal brand. The defining feature is a **fixed animated topographic terrain background** — white contour lines on black, flowing slowly like a breathing landscape — with all page content rendered in semi-transparent glass panels that scroll over it. The terrain never moves; the page slides past it.

The design embodies "attunement": unhurried, flowing, oriented. Black void, white signal, cosmic crimson accent.

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Void | `#000000` | Page background, terrain bg |
| Surface | `#0f0f0f` | Deep card backgrounds |
| White | `#ffffff` | Primary text |
| Text dim | `rgba(255,255,255,0.55)` | Body copy, descriptions |
| Text muted | `rgba(255,255,255,0.28)` | Labels, footnotes |
| Crimson | `#E11D48` | Primary CTA, accents, terrain peak glow |
| Crimson bright | `#F43F5E` | Hover states |
| Crimson dim | `rgba(225,29,72,0.12)` | Badge backgrounds, card tints |
| Border | `rgba(255,255,255,0.09)` | Card borders |
| Border accent | `rgba(225,29,72,0.35)` | Featured card border |

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Headings | Cormorant Garamond | 300 (light) | 36–68px |
| Body | DM Sans | 400 | 12–15px |
| Labels/eyebrows | DM Sans | 500 | 10px, uppercase, tracked |
| Buttons | DM Sans | 500 | 12–14px |

---

## Animated Terrain Background

**Implementation:** HTML5 Canvas, `position: fixed`, `z-index: 0`. Renders continuously via `requestAnimationFrame`. Never scrolls.

**Algorithm:**
- 90 horizontal contour lines drawn bottom-to-top (so peak lines render on top)
- Each line is a sum of 7 sine wave components with different frequencies, amplitudes, and phases
- A Gaussian "mountain envelope" concentrates line displacement around `t = 0.40` (40% from top), creating a peak silhouette
- Lines bunch together where the terrain is steep (near the peak), spread apart near the base — replicating topographic map density
- Animation: sine phases advance slowly over time (`SPEED = 0.00014`) — meditative, not frantic
- Crimson bleed: at the very mountain tip (envelope > 0.72), line color shifts from white → crimson
- Line opacity: `0.07 + envelope * 0.52`, faded at top/bottom edges
- Line width: `0.35 + envelope * 0.75px`

**Key params:**
```js
NUM_LINES = 90
SPEED = 0.00014          // ~12s full cycle — slow & meditative
WAVES = 7 components     // frequencies: 0.4, 0.8, 1.6, 2.4, 3.1, 5.8, 7.2
```

---

## Layout Architecture

All sections use the **glass panel** pattern:
- `background: rgba(0,0,0,0.25)` — 25% opacity, terrain visible through
- `backdrop-filter: blur(10px)` — softens terrain behind text for legibility
- `border-top: 1px solid rgba(255,255,255,0.07)`

Cards within sections use the same 25% opacity treatment.

### Z-index Stack
```
terrain canvas     z-index: 0   (fixed)
page content       z-index: 2   (scrollable)
navbar             z-index: 200 (sticky)
```

---

## Page Sections (in order)

### 1. Navbar — Sticky
- Logo mark (◎) + "Attune" wordmark
- Nav links: Signal · How It Works · Testimonials · Pricing · FAQ
- CTA button: "Get Foundations →" (crimson)
- Background: `rgba(0,0,0,0.52)` + `blur(20px)` — slightly more opaque than sections for focus
- Sticky top, always visible

### 2. Hero — Terrain fully visible
- **Social proof badge:** pulsing crimson dot + "500+ readers building in alignment"
- **Headline:** "The operating system for *real work.*" (italic em = dimmed)
- **Subhead:** "Stop performing for the wrong environment. Attune is the system for people who want to do their best work — not look like they are."
- **CTAs:** Primary "Get Foundations →" (crimson) + Ghost "Read Signal (Free)"
- **Scroll indicator:** crimson line fading to transparent + "Scroll" label, bobbing animation
- **Dark scrim:** radial gradient `rgba(0,0,0,0.78→0.30→0)` centered behind text — keeps terrain visible at edges
- **Text shadows** on headline + sub for legibility over terrain

### 3. Social Proof Bar
- "Built by a" label + credential pills:
  - 2× NCAA Champion · 6× All-American · 5 Yrs Ecological Research · 500+ Readers
- Glass panel, compact (26px padding)

### 4. Benefits — Bento Grid
- Eyebrow: "Benefits"
- Headline: "Not more habits. A better environment."
- **Bento layout (3-col):**
  - Tall card (row span 2): Alignment Over Effort + "2×" stat in crimson
  - Signal Over Noise
  - Systems That Stick
  - Wide card (col span 2): Built for High Performers Who Feel Off

### 5. How It Works — 3 Steps
- Eyebrow: "How It Works"
- Headline: "Three steps to aligned performance"
- **Step 01:** Subscribe to Signal (free)
- **Step 02:** Join Foundations (course)
- **Step 03:** Do the Real Work
- Arrow connectors between step cards

### 6. Pricing — 3 Tiers
- Eyebrow: "Pricing"
- Headline: "Simple, honest pricing"
- **Free:** Signal Newsletter — $0/forever — "Subscribe Free"
- **Pro (featured):** Foundations — $197 one-time — "Get Foundations →" (crimson CTA, crimson border, "Most Popular" tag)
- **Coming Soon:** Coaching — "Join Waitlist"
- Middle card: `rgba(225,29,72,0.10)` background tint + crimson border

### 7. Testimonials — 3 Cards
- Eyebrow: "Testimonials"
- Headline: "Loved by people doing real work"
- 3 cards: star rating + quote + avatar + name/role
- Center card: subtle crimson border

### 8. FAQ — Accordion
- Eyebrow: "FAQ"
- Headline: "Frequently Asked Questions"
- 5 questions, card-base style, "+" icon right-aligned
- Questions: What is Foundations · How long · Refund policy · How different · Do I need Signal first

### 9. Final CTA — Stand-out block
- Headline: "You're not behind. You're in the wrong environment."
- Sub: "Join 500+ readers choosing signal over noise."
- CTA: "Get Foundations — $197 →" (crimson, large, crimson box-shadow)
- Crimson radial glow behind the block

### 10. Footer
- 4-column grid: Brand (logo + desc + email subscribe) · Product · Company · Legal
- Email subscribe input + crimson "Subscribe →" button
- Bottom row: copyright + social icons (X, LinkedIn, YouTube)

---

## Component Specs

### Buttons
| Style | Background | Text | Border | Radius |
|-------|-----------|------|--------|--------|
| Primary | `#E11D48` | white | none | 8–10px |
| Ghost | `rgba(0,0,0,0.45)` | `rgba(255,255,255,0.7)` | `rgba(255,255,255,0.18)` | 9px |
| Outline | transparent | `rgba(255,255,255,0.55)` | `rgba(255,255,255,0.14)` | 8px |

Hover: Primary → `#F43F5E` + `translateY(-1px)` + stronger box-shadow

### Cards (`.card-base`)
- Background: `rgba(0,0,0,0.25)`
- Border: `1px solid rgba(255,255,255,0.10)`
- Border-radius: 14px
- Hover: border → `rgba(225,29,72,0.30)`

### Section Eyebrows
- 10px, uppercase, letter-spacing 0.14em, color `#E11D48`

---

## Interactions

| Element | Interaction |
|---------|-------------|
| Terrain | Continuous slow animation, fixed in place |
| Hero badge dot | Pulse animation (2.2s ease-in-out) |
| Scroll hint | Bob up/down (3s ease-in-out) |
| Nav links | Hover → white |
| Cards | Hover → crimson border tint |
| Primary buttons | Hover → brighter crimson + lift + glow |
| FAQ items | Hover → slight bg lighten |
| Social icons | Hover → crimson border + crimson color |

---

## Implementation Notes

- Canvas must resize on `window.resize` and re-scale for `devicePixelRatio`
- `backdrop-filter` requires `-webkit-backdrop-filter` for Safari
- Terrain draws lines bottom-to-top so peak (brighter) lines render above valley lines
- `text-shadow` on hero headlines is critical for legibility when terrain lines pass behind
- Pricing "featured" card uses `!important` to override `.card-base` bg with crimson tint
- Navbar must be `position: sticky` with its own higher opacity so it stays readable at all scroll positions

---

## Files Referenced

- Live prototype: `.superpowers/brainstorm/40625-1774545841/content/terrain-v3.html`
- Color system: `src/app/globals.css`
- Existing page: `src/app/page.tsx`
