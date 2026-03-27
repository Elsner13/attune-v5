# Design Spec: Module Pages, Sign-in, and Progress Tracking

**Date:** 2026-03-20
**Project:** attune-website-v4
**Status:** Approved

---

## Overview

Three additions to the Attune Foundations members area:

1. Individual module reading pages at `/dashboard/[slug]`
2. Returning member sign-in page at `/sign-in`
3. Progress tracking stored in Clerk user public metadata

---

## 1. Module Pages — `/dashboard/[slug]`

### Route

`/dashboard/[slug]/page.tsx` — slug format is the module number: `01`, `02`, ... `08`.

Example: `/dashboard/01` renders Module 01.

### Layout

Two-column layout consistent with the existing Jack Moses white-on-black aesthetic (`bg-void`, white text, `border-white/[0.08]`).

**Sidebar (left, ~220px wide):**
- "Foundations" label at top (monospace uppercase, muted)
- All 8 modules listed vertically
- Each row: small circle indicator + module title (truncated if needed)
- Circle states:
  - Empty border = not yet complete
  - Filled white = complete
  - Highlighted row = current module
- Clicking a row navigates to that module's page

**Content area (right, flex-1):**
- Module number label (e.g., `MODULE 01` — monospace, muted, uppercase)
- Module title in large Cormorant Garamond serif
- Duration label (e.g., `~45 min read` — monospace, muted)
- Divider
- Lesson content: section headings (small caps, muted) + body paragraphs (DM Sans, `text-white/75`)
- At bottom: "Complete — continue to Module 02 →" white button (full-width or right-aligned)
  - Last module (08): "Complete — return to dashboard →"
  - Once marked complete: button replaced with "Completed ✓" state

**Nav:**
- Same nav as dashboard — logo left, `UserButton` right, `FOUNDATIONS` label center

### Content

Lesson content is authored as a static data structure in a shared `lib/modules.ts` file. Each module exports:

Lesson content bodies are placeholder text for now — real content to be written separately. The implementation only needs to wire the data structure, not produce final copy.

```ts
type Module = {
  slug: string;       // "01"
  title: string;
  duration: string;
  sections: {
    heading: string;
    body: string[];   // array of paragraphs
  }[];
}
```

This is the single source of truth for both the dashboard list and the module pages. Content is written directly in code — no CMS.

---

## 2. Sign-in Page — `/sign-in`

### Route

`/sign-in/page.tsx`

### Layout

Identical structure to `/welcome`:
- Centered logo (attune-logo.png, inverted)
- Label: `RETURNING MEMBER` (monospace uppercase, muted)
- Heading: `Welcome back.` (Cormorant Garamond serif)
- Subtext: `Sign in to continue where you left off.` (muted body text)
- Clerk `<SignIn>` component with same dark appearance variables as `/welcome`

### Redirect

After successful sign-in, Clerk redirects to `/dashboard`. Set via `afterSignInUrl="/dashboard"` on the `<SignIn>` component.

### Link from Homepage

Add a subtle "Already a member? Sign in →" link on the homepage CTA section pointing to `/sign-in`.

---

## 3. Progress Tracking

### Storage

Progress stored in Clerk user public metadata:

```ts
// Shape
publicMetadata: {
  completedModules: string[] // e.g., ["01", "03", "04"]
}
```

### Reading Progress

The module page (`/dashboard/[slug]/page.tsx`) is a **server component** that renders the static layout and lesson content. Interactive elements (sidebar completion circles, "Complete" button, optimistic state) are extracted into a `"use client"` component (`ModuleProgress`) that receives `completedModules` as a prop.

On the server, read `completedModules` from Clerk's `currentUser()` server helper:
```ts
const user = await currentUser();
const completedModules = (user?.publicMetadata?.completedModules as string[]) ?? [];
```

Pass `completedModules` to `<ModuleProgress>` which handles:
- Rendering sidebar circle states
- Showing "Completed ✓" if current module is already in the array
- Handling the "Complete" button and optimistic update

### Marking Complete

"Complete" button calls a Next.js API route:

**`POST /api/complete-module`**
- Body: `{ moduleNumber: "01" }`
- Auth: verify request is from signed-in user via Clerk's `auth()` helper
- Action: read the user's full existing `publicMetadata` first, then merge — `clerkClient.users.updateUserMetadata(userId, { publicMetadata: { ...existingPublicMetadata, completedModules: [...existingCompleted, moduleNumber] } })`. Reading the full metadata first is required to avoid silently overwriting any other keys.
- Response: `{ success: true }`

**Optimistic UI:** On button click, immediately update local state to show "Completed ✓" and update sidebar circles without waiting for the API response. If the API call fails, revert to the button state and surface an error. This avoids a flicker from `user.reload()` and makes the UI feel instant.

### Dashboard List

The dashboard `page.tsx` module list rows also read `completedModules` and show a filled circle or checkmark for completed modules.

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `src/lib/modules.ts` | Create — module data (titles, durations, content) |
| `src/app/dashboard/[slug]/page.tsx` | Create — module reading page |
| `src/app/sign-in/page.tsx` | Create — returning member sign-in |
| `src/app/api/complete-module/route.ts` | Create — API route to update Clerk metadata |
| `src/app/dashboard/page.tsx` | Modify — add completion state to module rows |
| `src/app/page.tsx` | Modify — add "Already a member?" sign-in link |
| `src/middleware.ts` | Verify/Modify — ensure `/dashboard/[slug]` is protected |

---

## Design Constraints

- Match existing aesthetic: `bg-void` (#0A0A0A), white text, `border-white/[0.08]`, Cormorant Garamond headings, DM Sans body
- No new dependencies — use Clerk SDK already installed
- Mobile: sidebar collapses to a top horizontal dropdown (a `<select>`-style or button that reveals the module list) — not a drawer
- No video, no file uploads — written content only
