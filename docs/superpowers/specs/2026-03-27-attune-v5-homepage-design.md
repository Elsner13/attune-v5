# Attune v5 Homepage — Design Spec
**Date:** 2026-03-27
**Status:** Approved
**Prototype:** `.superpowers/brainstorm/2496-1774604461/content/anatomy-moses-v3.html`

---

## Overview

A complete replacement of the current Attune homepage (`attunemastery.com`) with a Jack Moses "Premium Dark Direct Response" design. The page uses the Moses Method funnel structure: Headline → Problem → Shift → Proof → Offer Stack → CTA → FAQ. The animated topographic terrain runs as a full-page fixed background throughout.

This replaces the current v4 design (void/gold/cream) with a new void/crimson/cream palette and a significantly more aggressive conversion architecture.

---

## Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--void` | `#030303` | Page background |
| `--surface` | `#0d0d0c` | Card/section backgrounds |
| `--surface2` | `#141413` | Elevated card surfaces |
| `--crimson` | `#E11D48` | Primary accent, CTAs, highlights |
| `--crimson-b` | `#F43F5E` | Hover/lighter crimson |
| `--crimson-glow` | `rgba(225,29,72,0.18)` | Button glow, ambient effects |
| `--cream` | `#F2EDD7` | Primary text |
| `--cream-b` | `rgba(242,237,215,0.65)` | Secondary text |
| `--cream-c` | `rgba(242,237,215,0.35)` | Tertiary/muted text |
| `--cream-d` | `rgba(242,237,215,0.12)` | Very subtle tints |
| `--line` | `rgba(242,237,215,0.08)` | Borders, dividers |
| `--line-b` | `rgba(242,237,215,0.14)` | Stronger borders |

### Typography
- **Headings:** Cormorant Garamond, italic, weights 300–600 (via next/font/google)
- **Body/UI:** DM Sans, weights 300–600
- **Labels/Eyebrows:** DM Sans uppercase, letter-spacing 0.1–0.2em
- **Hero size:** `clamp(56px, 9vw, 136px)`, `line-height: 0.9`
- **Section heads:** `clamp(40px, 6vw, 88px)`

### Layout
- Max content width: 1100px, centered
- Section padding: `clamp(80px, 10vw, 140px)` vertical
- Mobile breakpoint: 768px (hamburger nav, stacked layouts, single-column grids)

---

## Global Layers (z-index stack, bottom to top)

1. **Topographic terrain canvas** (`#topo-canvas`) — `z-index: 0`, fixed, full viewport
2. **Vignette overlay** (`#vignette`) — `z-index: 1`, radial gradient darkening edges
3. **Scroll fade overlay** (`#scroll-fade`) — `z-index: 2`, linear gradient fade at bottom
4. **Grain texture** (`body::after`) — `z-index: 3`, SVG fractalNoise, `opacity: 0.04`, `180px` tile
5. **Site content** (`.site`) — `z-index: 10`
6. **Nav** — `z-index: 200`
7. **Ticker bar** — `z-index: 300`
8. **Scroll progress bar** (`#scroll-progress`) — `z-index: 9999`, `3px` crimson bar at very top

---

## Animated Topographic Background

**Algorithm:** Marching Squares with proper saddle case disambiguation (cases 5 and 10 use center-point average to decide which diagonal to draw).

**Implementation details:**
- Grid: `GW=140`, `GH=110` cells
- 72 contour levels, range `[-112, +112]`
- Height field: layered sine waves (Perlin noise approximation)
  - 4 wave layers with different frequencies/amplitudes/phase offsets
  - `animT` incremented by `0.006` per frame (targeting 30fps via `setTimeout`)
- Line rendering: `strokeStyle = rgba(242,237,215,0.055)`, `lineWidth = 0.9`
- **Parallax on scroll:** canvas `translateY(scrollY * -0.3)` for depth
- Canvas resizes on window resize

---

## Sections

### 0. Scroll Progress Bar
- Fixed, 3px tall, top of viewport above ticker
- Crimson gradient with glow shadow
- Fills `0%` → `100%` as user scrolls

### 1. Social Proof Ticker
- Fixed, 30px tall, sits between scroll bar and nav
- Scrolling marquee (36s loop, pauses on hover)
- Content: 5 rotating social proof statements (e.g., "Francesco Fonte — doubled performance in 3 weeks", "500+ practitioners trained", etc.)
- Crimson bullet separators between items

### 2. Nav
- Fixed below ticker, 60px tall
- Logo: "Attune" in Cormorant Garamond italic, with crimson period or accent
- Links: "Method", "Results", "About", "Newsletter" — uppercase 12px, crimson underline on active
- **Section-aware highlighting:** IntersectionObserver sets `.nav-active` as sections enter viewport
- CTA button: "Start Here →" in crimson
- **Scroll behavior:** starts `rgba(3,3,3,0.7)` blur, transitions to `rgba(3,3,3,0.92)` after 80px
- Mobile: hamburger reveals full-width dropdown menu

### 3. Hero
- Full viewport height
- **Eyebrow:** pulsing crimson dot + "Ecological Dynamics · Skill Acquisition · Attune"
- **Headline (cycling):** Two static lines + one cycling crimson word
  - "Skill is" [crimson cycling word] "not [dimmed cycling word]."
  - Cycling pairs: forged/taught, built/talked, earned/given, felt/explained, embodied/memorized
  - Vertical wipe transition (translateY), 3s interval
- **Word-by-word reveal:** Static headline words stagger in on load (60ms offset, translateY 18px → 0)
- **Subheadline:** "Most athletes train movement patterns. You need to train perception..."
- **CTAs:** Primary (crimson magnetic button) + Ghost button
- **Crimson particle drift:** 30 small particles floating upward in hero canvas
- **Magnetic button behavior:** cursor proximity pulls button up to 8px

### 4. Proof Bar
- 4 statistics in a horizontal row (2-col on mobile)
- Stats: 2× Performance gains, 6× All-American athlete background, 500+ practitioners, 5 years of applied research
- **Countup animation:** numbers count up from 0 when section enters viewport (IntersectionObserver, once)
- Crimson number styling, cream label below

### 5. The Problem
- Section title: "You've been training wrong."
- Two-column layout: Pain (left) / Root cause diagnosis (right)
- **Scenario-based pain copy:** Specific, concrete scenarios (not abstract):
  - "You've rewatched film 40 times. Your mechanics look perfect in warmups. Then the moment arrives — and you revert."
  - "You hire a new coach. New drills. Same plateau."
  - "Your competitors aren't working harder. They're reading something you can't see yet."
- Root cause: external focus, decontextualized reps, noise mistaken for signal

### 6. The Insight
- Section title: "The environment is the teacher."
- 3-card principles grid: Affordances / Constraints / Attunement
- Each card: crimson icon top, title, 2-sentence explanation
- Pull quote blockquote: "Repetition without repetition." — Bernstein
- Brief explanation of ecological dynamics applied to skill acquisition

### 7. Signal/Noise (Newsletter Inline)
- Section introducing the newsletter as the entry point
- Email capture form inline (opens Substack subscribe, no backend needed)
- "Join 500+ practitioners reading Signal/Noise weekly"
- Recent issue previews (3 titles)
- Input + crimson submit button, "no spam, unsubscribe anytime"

### 8. Results (Testimonials)
- Section title: "What changes when you train this way."
- 3 testimonials in card layout:
  - Francesco Fonte — sport performance
  - Jay Pages — transfer to business/life
  - Anonymous BJJ coach — tactical application
- Each card: quote, attribution, crimson accent border-left

### 9. The Offer (Foundations)
- Section title: "Foundations — The Entry Point"
- What's inside: 6-item grid (modules/components)
- Entry state copy / Exit state copy (before → after)
- Price: $97 with anchor pricing crossed out at $197
- CTA: "Enroll in Foundations →" (large magnetic crimson button)
- No guarantee/refund section (explicitly excluded)

### 10. About Sam
- Brief bio (3–4 sentences)
- Credential tags: 2× NCAA National Champion, 6× All-American, Ecological Psychologist, Signal/Noise Author
- Pull quote: "I don't teach skills. I build environments that make skill inevitable."
- Profile image placeholder (or no image, text-only)

### 11. Who This Is NOT For
- Inverted section (cream background, dark text) — pattern interrupt
- Bulleted list of exclusions (not for casual dabblers, not for people who want quick fixes, not for those who won't do the work)
- Ends with positive reframe CTA

### 12. Final CTA
- Large centered section
- Headline: "Stop training in the wrong environment."
- Two-path buttons: Primary ("Enroll in Foundations") + Ghost ("Read Signal/Noise")

### 13. FAQ
- Accessible accordion (aria-expanded, aria-controls)
- 6–8 questions covering: what is ecological dynamics, who is this for, how long, what format, etc.
- Crimson glow on hover, +/× icon toggle

### 14. Footer
- Minimal: logo, nav links, copyright
- "Yours in rebellion, Sam ~~ Signal/Noise" sign-off

### 15. Sticky Mobile CTA
- Slides up from bottom after 600px scroll
- Hidden on desktop (display: none above 768px)
- "Enroll in Foundations — $97" with crimson background

---

## Scroll Reveal Animations

All content sections use `IntersectionObserver` with a `data-reveal` attribute:
- Initial state: `opacity: 0; transform: translateY(32px)`
- Triggered state: `opacity: 1; transform: translateY(0); transition: 0.7s ease`
- Threshold: 0.12 (12% visibility triggers reveal)

---

## Implementation Notes for Next.js

- **Fonts:** Use `next/font/google` for Cormorant Garamond and DM Sans (already configured in v4)
- **Canvas:** Wrap topographic terrain in a `useEffect` with cleanup on unmount. Use `requestAnimationFrame` or `setTimeout` targeting 30fps.
- **Parallax:** Add `scroll` event listener, update canvas `transform` directly (no React state — direct DOM manipulation for performance).
- **Magnetic buttons:** Custom hook `useMagneticButton(ref)` that adds/removes mousemove listener.
- **Countup:** Custom hook `useCountup(target, duration)` triggered by IntersectionObserver entry.
- **Cycling headline:** `useState` + `setInterval`, CSS transitions handle wipe animation.
- **Section-aware nav:** Single IntersectionObserver watching all section IDs, updates active link.
- **Ticker:** CSS animation only — no JS needed.
- **Mobile nav:** `useState` for open/closed, conditional className.
- **Email capture:** Form with `action` pointing to Substack subscribe URL (no backend).
- **Tailwind:** Use CSS custom properties for the color tokens, extend in `tailwind.config.ts`.

---

## Out of Scope

- No backend/database
- No authentication
- No guarantee/refund section
- No course platform integration (links point to external checkout)
- No blog section
- No video embeds

---

## Success Criteria

1. Animated terrain renders at 30fps without jank on modern devices
2. All sections follow Moses Method funnel flow without deviation
3. Mobile layout is fully functional at 375px and 768px breakpoints
4. Scroll reveal, countup, cycling headline, and magnetic CTAs all work
5. Page loads in < 3s (LCP) on 4G connection
6. Passes basic a11y: semantic HTML, aria-expanded on accordions, alt text on any images
