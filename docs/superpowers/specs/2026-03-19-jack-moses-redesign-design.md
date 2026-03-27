# Attune Website v4 — Jack Moses Redesign Spec

**Date:** 2026-03-19
**Scope:** Homepage (`/`) + Foundations landing page (`/foundations`)
**Reference:** [transcendenceuniverse.org](https://transcendenceuniverse.org/) (homepage) + [Lake Como retreat page](https://transcendenceuniverse.org/experiences/lake-como-writing-retreat) (Foundations structure)

> **Note:** This spec is the authoritative implementation target. It supersedes any prior implementation plans (e.g. gold/cream palette plans). Implement directly from this spec — do not execute intermediate plans first.

---

## Design Direction

The redesign adopts Jack Moses' aesthetic: dark near-black background, pure white typography, white-bordered frosted-glass card blocks, minimal navigation, and sharp typographic hierarchy. Cormorant Garamond (serif) is used for all headings with italic treatment for secondary lines. DM Sans handles body and UI text. Geist Mono handles micro-labels.

Gold accent is removed entirely. The system is white-on-black throughout.

---

## globals.css Changes

The existing `globals.css` is **partially replaced**:

- **Remove** all color custom properties: `--cream`, `--gold`, `--gold-cta`, `--muted`, `--rule`, and their `@theme inline` mappings
- **Remove** `html, body` color overrides that reference `--cream` and `--void`
- **Add** the new token set below
- **Keep verbatim**: the `body::after` grain texture block and the `@media (prefers-reduced-motion)` block

Full replacement for `globals.css` (keep the `@import` lines and grain/reduced-motion blocks, replace everything else):
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500&display=swap');
@import "tailwindcss";

:root {
  --void: #0A0A0A;
  --surface: #111110;
  --border: rgba(255,255,255,0.15);
  --border-subtle: rgba(255,255,255,0.08);
  --card-fill: rgba(255,255,255,0.03);
}

@theme inline {
  --color-void: var(--void);
  --color-surface: var(--surface);
  --font-serif: var(--font-serif);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
}

html, body {
  background-color: var(--void);
  color: #ffffff;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.9; }
}
```

The `body::after` grain texture block and `@media (prefers-reduced-motion)` block follow unchanged after the above.

---

## Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--void` | `#0A0A0A` | Page background |
| `--surface` | `#111110` | Card/section surface |
| Text primary | `#FFFFFF` | Headings, primary copy |
| Text muted | `rgba(255,255,255,0.50)` | Body paragraphs |
| Text dim | `rgba(255,255,255,0.25)` | Labels, captions |
| `--border` | `rgba(255,255,255,0.15)` | Standard card borders |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Inner dividers |
| `--card-fill` | `rgba(255,255,255,0.03)` | Card background fill |
| CTA bg | `#FFFFFF` | Primary CTA button bg |
| CTA text | `#000000` | Primary CTA button text |

### Typography
| Role | Font | Weight | Size | Treatment |
|------|------|--------|------|-----------|
| Display heading | Cormorant Garamond | 600 | `clamp(3rem, 8vw, 7rem)` | `letter-spacing: -0.02em`, `line-height: 1.05` |
| Section heading | Cormorant Garamond | 600 | `clamp(2rem, 5vw, 4rem)` | Italic secondary line in `rgba(255,255,255,0.35)` |
| Body | DM Sans | 400 | `clamp(0.9375rem, 1.3vw, 1.0625rem)` | `line-height: 1.78`, color `rgba(255,255,255,0.50)` |
| Micro-label | Geist Mono | 500 | `10px` | `letter-spacing: 0.2em`, `text-transform: uppercase`, color `rgba(255,255,255,0.25)` |
| Card sub-heading | DM Sans | 500 | `0.875rem` | color `#fff` |

### Card Treatment
All section cards share this base treatment — **2px border** matching Jack Moses' card style:
```css
border: 2px solid rgba(255,255,255,0.15);
background: rgba(255,255,255,0.03);
backdrop-filter: blur(4px);
```
Inner sub-cards (e.g. principle grid) use `border: 1px solid rgba(255,255,255,0.08)`.

### Focus States
All interactive elements (buttons, links, accordion triggers): `focus-visible: outline 2px solid rgba(255,255,255,0.4); outline-offset: 3px`

### Grain Texture
Keep existing `body::after` grain overlay (`opacity: 0.035`). No changes.

---

## Navigation

**Applies to:** Both pages

- Position: sticky top, `z-index: 50`
- Layout: flex row, `justify-content: space-between`, `align-items: center`
- Left: "Attune" text only in Cormorant Garamond 600, 15px, `#fff` — **no logo image**
- Right: "Foundations · Signal/Noise" in Geist Mono, 10px, `rgba(255,255,255,0.35)`, each word a link
- Border: `border-bottom: 1px solid rgba(255,255,255,0.1)`
- Padding: `px-8 py-5` desktop, `px-5 py-4` mobile
- Background: `rgba(10,10,10,0.85)` + `backdrop-filter: blur(12px)`
- **Mobile (< 768px):** Right-side nav links are hidden. Only "Attune" logo text is shown. No hamburger menu.
- **Foundations page mobile:** Left shows "← Attune" ghost link only. Right nav links hidden.

---

## Layout Container

All page section content is wrapped in a centered container:
```css
max-width: 900px;
margin: 0 auto;
padding: 0 clamp(1.5rem, 5vw, 4rem);
```

Each `<section>` is full-width; the inner container constrains content. Sections with right-aligned text (The Cost, The Source, The Choice) flip their text alignment and CTA alignment on desktop; the container stays centered.

---

## Primary CTA Button

```
background: #fff
color: #000
padding: 12px 28px
font: DM Sans 500, 11px, letter-spacing 0.12em, uppercase
border-radius: 0 (sharp edges)
hover: opacity 0.85, transition 0.2s
focus-visible: outline 2px solid rgba(255,255,255,0.4)
```

## Ghost Link

```
color: rgba(255,255,255,0.35)
font: Geist Mono 500, 10px, letter-spacing 0.14em, uppercase
border-bottom: 1px solid rgba(255,255,255,0.25)
hover: color rgba(255,255,255,0.7), transition 0.2s
```

---

## Homepage (`/`)

Vertical scroll. Full-width sections stacked. No horizontal scroll, no canvas animation.

### Section 1 — Hero

- Min-height: `100svh`
- Layout: flex column, `justify-content: center`
- Padding: `clamp(8rem, 15vh, 12rem)` top, standard container horizontal
- Content:
  - Micro-label: "00 — Attune"
  - H1 (Cormorant 600, display size): "Something / brought you here. / *That's not nothing.*" — third line italic in `rgba(255,255,255,0.35)`
  - Body paragraph (max-width 520px): "You produce. You learn. You optimize. And the gap between who you are and what you know you're capable of keeps the same width. That's not a discipline problem. That's a dynamics problem. And it has a name."
  - CTA row (flex, gap 16px, align flex-start): white button "Join Signal/Noise" (external, Substack) + ghost link "Begin Foundations →"
  - **No email form** — the existing inline email capture is removed; the CTA links directly to Substack
- No background canvas. Black + grain only.
- Scroll hint (desktop only, `aria-hidden`): thin 48px horizontal line (`rgba(255,255,255,0.22)`) + "scroll" mono label. Animation: `opacity` pulse 0.4→0.9 over 2.4s ease-in-out loop (`scrollPulse` keyframe). Positioned bottom-left above footer padding.

### Section 2 — Proof Bar

- `border-top: 1px solid rgba(255,255,255,0.1)`, `border-bottom: 1px solid rgba(255,255,255,0.1)`
- `padding: clamp(2rem, 4vh, 3rem) 0`
- 4-column grid (desktop), 2×2 grid (mobile)
- Each cell: number in Cormorant 600 `clamp(2.5rem, 5vw, 4rem)` `#fff`, mono label below in `rgba(255,255,255,0.30)`
- Stats: `2×` NCAA National Champion · `6×` All-American · `500+` Signal/Noise Readers · `5 yrs` Research Integrated
- Count-up animation: keep existing `CountUpStat` component logic, **restyled** — replace `text-gold` with `color: #fff`, replace `text-cream/30` with `color: rgba(255,255,255,0.30)`, replace `bg-surface` card wrapper with plain borderless cell
- Cell dividers: `border-right: 1px solid rgba(255,255,255,0.08)` (last cell no border)

### Section 3 — The Drift

- Full bordered card (2px border, `backdrop-filter: blur(4px)`)
- Section padding: `clamp(4rem, 8vh, 6rem)` vertical
- Micro-label: "01 — The Drift"
- H2: "You're not stuck. / *You're coupled.*"
- Two body paragraphs (existing copy)
- No CTA
- `data-reveal` on H2 and both paragraphs

### Section 4 — The Cost

- Full bordered card, **right-aligned** (desktop), left-aligned (mobile)
- Micro-label: "02 — The Cost"
- H2: "The years don't lie. / *You do.*"
- Two body paragraphs (existing copy)
- No CTA

### Section 5 — The Lens

- Full bordered card
- Micro-label: "03 — The Lens"
- H2: "One idea. / *Everything organizes.*"
- One body paragraph
- 2×2 inner grid of principle sub-cards (1px inner border):
  - Each sub-card: mono number label + DM Sans 500 title + 1-line body
  - 01 Attunement · 02 Constraints · 03 Perception Precedes Action · 04 The Stream vs. The Shores
- Inner grid gap: 8px

### Section 6 — The Source

- Full bordered card, right-aligned (desktop)
- Micro-label: "04 — The Source"
- H2: "2× National Champion. / 6× All-American. / *That's not the proof.*"
- Body paragraph (credentials + 5 post-title research years)
- 3-item outcome list:
  - `border-left: 1px solid rgba(255,255,255,0.18)`, `padding-left: 12px`
  - Items in `rgba(255,255,255,0.45)`, `font-size: 0.875rem`, `line-height: 1.65`
- Ghost link "Read Signal/Noise →" below list

### Section 7 — Foundations

- Full bordered card
- Micro-label: "05 — Foundations"
- H2: "Install the / *operating system.*"
- Body paragraph
- 5-item value stack (left-border accent, `border-left: 1px solid rgba(255,255,255,0.18)`, `padding-left: 16px`, `font-size: 0.75rem`, `rgba(255,255,255,0.42)`)
- White CTA: "Begin Foundations →"
- Price caption below CTA: "$97 · Eight modules · Lifetime access" in Geist Mono, 10px, `rgba(255,255,255,0.25)`

### Section 8 — The Choice

- Full bordered card, right-aligned (desktop)
- Micro-label: "06 — The Choice"
- H2: "Two feelings. / You already know / *both of them.*"
- Body paragraph
- Dual CTA (flex row desktop, flex column mobile): white button "Join Signal/Noise" + ghost link "Begin Foundations"

### Section 9 — Footer

- `border-top: 1px solid rgba(255,255,255,0.1)`
- `padding: 2rem 0`
- Left: "© 2026 Attune" — Geist Mono, 10px, `rgba(255,255,255,0.25)`
- Right: "Foundations · Signal/Noise" links — Geist Mono, 10px, `rgba(255,255,255,0.25)`
- Mobile: stacked, centered

---

## Foundations Landing Page (`/foundations`)

Same dark system as homepage. Long-form single-column sales page. File: `src/app/foundations/page.tsx` (new, replaces any existing file).

No sticky mobile CTA bar — the Pricing section (Section 9) is prominent enough and the page is not long enough to warrant a floating CTA. This is explicitly out of scope.

### Nav — Foundations Variant

Same base nav. On Foundations page:
- Left: "← Attune" ghost link (links to `/`)
- Right: "Foundations · Signal/Noise" (same as homepage)
- Mobile: left shows "← Attune" ghost link only, right links hidden

### Hero

- Min-height: `80svh`
- H1 (display size): "Install the / *operating system.*"
- Subtext (max-width 540px): "Five years. Four disciplines. Ecological psychology, Stoic philosophy, motor learning, complexity science — unified into one operating system. You can install it in eight hours."
- White CTA: "Enroll — $97 →" (links to `CHECKOUT_URL` — re-declare this constant at the top of `foundations/page.tsx`, same value as in `page.tsx`: `const CHECKOUT_URL = "https://attunemastery.com/checkout"`)
- Price caption: "Eight modules · Lifetime access · No refunds" — mono dim

### The Argument

- Bordered card (2px)
- Label: "Why This Exists"
- H2: "The model is broken. / *The research isn't.*"
- 2–3 body paragraphs: conventional learning (drill/repeat/transfer) is broken → ecological dynamics is the 40-year-old body of research that explains why → Attune is where that research becomes actionable

### What's Inside

- Bordered card
- Label: "The Curriculum"
- H2: "Five years in eight hours."
- 5-item value stack with left-border accent:
  1. The Attractor Model — why you keep moving toward what you want to leave, and how to change the landscape
  2. Perception-Action Coupling — how to read your environment the way a 2× national champion reads a field
  3. Constraint Architecture — how to engineer your practice so the right patterns emerge on their own
  4. Ecological Content — how to create signal in a world that runs on noise
  5. The Integration — all four domains unified into one operating system you will use for life

### The Principles

- Bordered card
- Label: "The Lens"
- No heading — goes straight to 2×2 principle sub-card grid (same treatment as Homepage Section 5)

### What Develops

- Bordered card
- Label: "What You Walk Away With"
- 4-item list, each item: DM Sans 500 title `#fff` + italic detail in `rgba(255,255,255,0.50)`, separated by thin `border-bottom: 1px solid rgba(255,255,255,0.06)`
  1. Perceptual accuracy — See market affordances before they're obvious
  2. Constraint design fluency — Engineer environments that produce behaviors without forcing
  3. Representative thinking — Know instantly if your practice matches your performance environment
  4. Signal/noise discrimination — Cut through the content flood and perceive what actually matters

### Testimonials

- Label: "What Practitioners Say"
- 3 bordered cards (2px), stacked full-width, `gap: 16px`
- Each card layout:
  - Quote in Cormorant 400 italic, `font-size: clamp(1rem, 2vw, 1.25rem)`, `rgba(255,255,255,0.85)`, `border-left: 2px solid rgba(255,255,255,0.15)`, `padding-left: 20px`
  - Attribution below: Name (DM Sans 500, `#fff`) + Role + Domain (Geist Mono, 10px, `rgba(255,255,255,0.35)`)
  - **Anonymous testimonial** (name: null): omit name line entirely; render Role as the primary identifier

### FAQ

- Label: "Questions"
- Restyled `FAQAccordion`:
  - Each `<li>` border: `1px solid rgba(255,255,255,0.08)`, **remove** the inline `style={{ background: "rgba(17,17,16,0.6)" }}` — use `background: transparent` instead
  - **Remove** mouse-tracking radial glow entirely: remove `onMouseMove`, `onMouseLeave` handlers and the glow `<div aria-hidden="true">` inside each `<li>`
  - **Remove** all gold/cream color references — replace with white equivalents: `text-gold/60` → `rgba(255,255,255,0.6)`, `outline-gold/40` → `rgba(255,255,255,0.4)`, gold `radial-gradient` → remove
  - Open state: border-color `rgba(255,255,255,0.2)`
  - Meta tag pill: `border: 1px solid rgba(255,255,255,0.12)`, color `rgba(255,255,255,0.3)`
  - Focus ring: `focus-visible: outline 2px solid rgba(255,255,255,0.4)`

### Pricing

- Large isolated bordered card (2px), `padding: clamp(3rem, 6vh, 5rem)`
- Label: "The Investment"
- `$97` in Cormorant 600, `clamp(4rem, 10vw, 8rem)`, `#fff`, centered
- 5-item include list below price:
  - "8 sessions that rewire how you read your environment"
  - "Applied examples across 5 domains"
  - "Constraint design exercises for your specific context"
  - "Lifetime access + all future updates"
  - "Signal/Noise ongoing access"
- Each item: `·` prefix in `rgba(255,255,255,0.35)`, body text `rgba(255,255,255,0.65)`, `font-size: 0.875rem`
- White CTA: "Enroll Now →" (links to `CHECKOUT_URL`), full-width on mobile
- Mono dim below: "No refunds. All purchases are final."
- Ghost link below that: "Questions? Message Sam on Substack →"

### Footer

Same as homepage.

---

## Scroll Reveal

Keep existing `useReveal` hook unchanged. Apply `data-reveal` attributes to:
- All H1/H2 elements
- All body paragraphs in section cards
- Card grids (staggered: first card `data-reveal="0"`, second `"1"`, third `"2"`)
- Value stack items individually (stagger 0–4)

---

## Responsive Breakpoints

- **Mobile** (`< 768px`): single column, all text left-aligned, nav links hidden, extra bottom padding for thumb reach. Cards are full-width with `mx-4` margin.
- **Desktop** (`≥ 768px`): alternating left/right text alignment on even/odd sections (The Cost, The Source, The Choice are right-aligned). Container max-width 900px centered.

---

## Component Restyle Summary

| Component | What Changes |
|-----------|-------------|
| `CountUpStat` | Remove `bg-surface px-8 py-10` wrapper. Remove `text-gold`. Number: `color: #fff`. Label: `color: rgba(255,255,255,0.30)`. |
| `FAQAccordion` | Remove radial glow (onMouseMove/onMouseLeave + glow div). Replace all gold/cream class references with white equivalents. Border: `1px solid rgba(255,255,255,0.08)`. |
| Nav | Remove `<Image>` logo. Text-only "Attune" in Cormorant Garamond. Mobile: hide right links. |

---

## What's NOT Changing

- Fonts in `layout.tsx` (Cormorant Garamond, DM Sans, Geist Mono)
- `body::after` grain texture in `globals.css`
- `useReveal` hook logic
- `CountUpStat` animation logic (numbers only, not styling)
- `FAQAccordion` open/close logic
- `CHECKOUT_URL` constant
- `SUBSTACK_URL` constant
- `layout.tsx` metadata

---

## Out of Scope

- Other pages (`/about`, `/method`, `/science`, `/contact`)
- Dashboard / course player
- Auth flow
- Any new backend or API work
- Sticky mobile CTA bar on Foundations page
- Hamburger / mobile menu
