# Foundations Reading Experience — Design Spec

**Date:** 2026-03-20
**Status:** Approved
**Scope:** Module reading pages (`/dashboard/[slug]`) and dashboard stale-progress fix

---

## Problem

The reading experience inside individual Foundations modules has two compounding issues:

1. **Typography (A)** — Body text is too small (15px), line-height is tight (1.85), and the article is constrained to 640px inside a padded card. The prose feels like a web app, not a premium long-form read.
2. **Layout (D)** — The article card, sidebar, and nav bar together leave the content column feeling squeezed. The glassmorphism card adds padding on top of an already-narrow max-width, making it worse.

Additionally, "The Move" section — the field assignment that ends every module — renders identically to the reading sections, making the most actionable part of the course invisible.

A secondary issue: the dashboard shows stale completion progress after returning from a module because `useUser()` returns cached Clerk data.

---

## Design

### 1. Typography Lift

**File:** `src/app/dashboard/[slug]/page.tsx`

| Property | Before | After |
|---|---|---|
| Font size | `text-[15px]` | `text-[17px]` |
| Line height | `leading-[1.85]` | `leading-[2.0]` |
| Text opacity | `text-white/75` | `text-white/80` |
| Paragraph spacing | `space-y-4` | `space-y-5` |

### 2. Article Breathing Room

**File:** `src/app/dashboard/[slug]/page.tsx`

| Property | Before | After |
|---|---|---|
| Max width | `max-w-[640px]` | `max-w-[700px]` |
| Horizontal padding | `px-8` | `px-10` |
| Vertical padding | `py-8` | `py-12` |

### 3. "The Move" Glass Card

**File:** `src/app/dashboard/[slug]/page.tsx`

Detect `section.heading === "The Move"` and render with a distinct glassmorphism card instead of the standard section layout.

**Card styles:**
- Wrapper: `rounded-2xl border border-white/[0.14] bg-white/[0.04] backdrop-blur-md px-7 py-6 mt-4`
- Label text: `"THE MOVE"` — `text-[9px] tracking-[0.3em] uppercase text-white/50 mb-4` with `fontFamily: var(--font-mono)` (distinct from the regular section label which is `text-white/25`)
- Body text: `text-[16px] text-white/85 leading-[1.9]` (slightly brighter, action-oriented, not essay)

The "The Move" card is rendered **inside the `<article>` element**, as the last section. The outer article provides `px-10 py-12` padding; the inner card has its own `px-7 py-6`. This is intentional — the card sits within the article's padded space as a contained block, not bleeding edge-to-edge.

All other sections render unchanged.

### 4. Reading Progress Bar

**File:** `src/app/dashboard/[slug]/ModuleProgress.tsx` — not `page.tsx`

A 2px bar at the top of the content scroll area tracking scroll progress. Must be placed as a **direct sibling before `{children}`** inside the `overflow-y-auto` content div in `ModuleProgress.tsx`. Placing it inside `page.tsx`'s `<article>` would break `sticky` scoping.

```tsx
// In ModuleProgress.tsx — inside the content div, before {children}
const scrollRef = useRef<HTMLDivElement>(null);
const [progress, setProgress] = useState(0);

useEffect(() => {
  const el = scrollRef.current;
  if (!el) return;
  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = el;
    setProgress(scrollHeight <= clientHeight ? 0 : scrollTop / (scrollHeight - clientHeight));
  };
  el.addEventListener("scroll", onScroll, { passive: true });
  return () => el.removeEventListener("scroll", onScroll);
}, []);
```

Attach `ref={scrollRef}` to the existing `overflow-y-auto` content div. Render the bar inside it before `{children}`:

```tsx
<div className="h-[2px] sticky top-0 z-10 bg-white/[0.05]">
  <div className="h-full bg-white/[0.28] transition-all duration-75" style={{ width: `${progress * 100}%` }} />
</div>
```

### 5. Dashboard Stale Progress Fix

**File:** `src/app/dashboard/page.tsx`

Call `user.reload()` on mount so returning users see accurate completion counts. `reload()` is async — handle the floating promise and suppress the ESLint exhaustive-deps warning:

```tsx
// eslint-disable-next-line react-hooks/exhaustive-deps
React.useEffect(() => {
  user?.reload().catch(() => {});
}, []);
```

The empty dep array is intentional — we only want this to fire once on mount, not re-run whenever `user` reference changes.

---

## Files Changed

| File | Change |
|---|---|
| `src/app/dashboard/[slug]/page.tsx` | Typography, article sizing, "The Move" card |
| `src/app/dashboard/[slug]/ModuleProgress.tsx` | Reading progress bar |
| `src/app/dashboard/page.tsx` | Stale progress fix via `user.reload()` |

## Files Unchanged

- `src/components/ui/sidebar.tsx`
- `src/components/ui/display-cards.tsx`
- `src/components/ui/glowing-effect.tsx`
- `src/app/dashboard/layout.tsx`
- `src/lib/modules.ts`
- `src/app/api/complete-module/route.ts`

---

## Success Criteria

- Body text reads comfortably at normal reading distance without squinting
- "The Move" is visually distinct — a user scanning the page can immediately identify the action section
- Progress bar updates smoothly as the user scrolls through a module
- Returning to `/dashboard` after completing a module shows the correct count immediately
- No regressions on mobile (sidebar overlay, content scroll)
