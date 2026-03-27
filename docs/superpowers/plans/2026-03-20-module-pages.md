# Module Pages, Sign-in, and Progress Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build individual module reading pages with a sidebar layout, a returning-member sign-in page, and Clerk-backed progress tracking (mark modules complete, persists across devices).

**Architecture:** Module data lives in `src/lib/modules.ts` as a typed static array. The module page is a server component that reads `currentUser()` from Clerk and passes `completedModules` down to a `"use client"` child that handles the interactive sidebar and complete button with optimistic UI. Progress is written via a Next.js API route that uses the Clerk backend SDK to update `publicMetadata`.

**Tech Stack:** Next.js 16.2 App Router, React 19, Clerk v7 (`@clerk/nextjs`), Tailwind CSS v4, TypeScript. No test framework is installed — verification is via `npm run build` and manual browser testing.

**Spec:** `docs/superpowers/specs/2026-03-20-module-pages-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/modules.ts` | Create | Single source of truth for all module data (slug, title, duration, sections) |
| `src/app/api/complete-module/route.ts` | Create | POST handler — auth check + append to Clerk `publicMetadata.completedModules` |
| `src/app/dashboard/[slug]/ModuleProgress.tsx` | Create | `"use client"` — sidebar state, complete button, optimistic update |
| `src/app/dashboard/[slug]/page.tsx` | Create | Server component — reads `currentUser()`, renders layout, passes data to `ModuleProgress` |
| `src/app/sign-in/page.tsx` | Create | Clerk `<SignIn>` styled identically to `/welcome` |
| `src/app/dashboard/page.tsx` | Modify | Add `completedModules` read + completion indicators to module rows |
| `src/app/page.tsx` | Modify | Add "Already a member? Sign in →" link near CTA |
| `src/middleware.ts` | No change | Already protects `/dashboard(.*)` — covers new `/dashboard/[slug]` routes |

---

## Task 1: Module data

**Files:**
- Create: `src/lib/modules.ts`

- [ ] **Step 1: Create `src/lib/modules.ts` with typed module array**

```ts
// src/lib/modules.ts

export type ModuleSection = {
  heading: string;
  body: string[];
};

export type Module = {
  slug: string;       // "01" .. "08"
  title: string;
  duration: string;
  sections: ModuleSection[];
};

export const modules: Module[] = [
  {
    slug: "01",
    title: "The Problem with Your Model",
    duration: "~45 min read",
    sections: [
      {
        heading: "The Inherited Map",
        body: [
          "Every practitioner starts with a model they didn't choose. It arrived through coaches, textbooks, certifications, and mentors — all of them passing down the same inherited map without questioning the terrain it was drawn for.",
          "The map isn't wrong. It's just incomplete. And when you build a practice on an incomplete map, you keep arriving at the right destination by accident rather than by design.",
        ],
      },
      {
        heading: "Why It Fails",
        body: [
          "The failure isn't visible at first. Early in your career the model feels like enough — you have frameworks, progressions, cues. But somewhere around year three or five something starts to feel thin.",
          "Athletes plateau. Clients hit invisible ceilings. You find yourself applying the same intervention to problems that look the same on the surface but are structurally different underneath.",
          "That friction is information. It's telling you the model needs to expand.",
        ],
      },
      {
        heading: "What This Course Does",
        body: [
          "This isn't a replacement for everything you know. It's a layer underneath — an operating system that makes everything else run better.",
          "Over eight sessions we'll install ecological dynamics as a lens, not a dogma. By the end you'll have a way of reading any performance problem that accounts for the organism, the environment, and the task — together, not in isolation.",
        ],
      },
    ],
  },
  {
    slug: "02",
    title: "Ecological Dynamics 101",
    duration: "~50 min read",
    sections: [
      {
        heading: "Where the Framework Comes From",
        body: [
          "Ecological dynamics emerged from the work of James Gibson and Nikolai Bernstein — two researchers working in parallel who arrived at the same insight from different directions. Gibson was studying perception. Bernstein was studying movement. Both concluded that you cannot understand either without understanding the relationship between the organism and its environment.",
          "The framework was later developed into sport science by Keith Davids and colleagues, who showed that the same principles governing how animals navigate their environments apply directly to how athletes develop skill.",
        ],
      },
      {
        heading: "The Core Idea",
        body: [
          "Skill is not stored in the brain and retrieved on demand. Skill is the emergent product of a system — athlete, task, environment — interacting in real time.",
          "This changes everything. If skill is emergent, you can't install it through repetition alone. You have to design the conditions that make the right skill the most available option.",
        ],
      },
    ],
  },
  {
    slug: "03",
    title: "Attunement",
    duration: "~55 min read",
    sections: [
      {
        heading: "Learning to See Affordances",
        body: [
          "Gibson's key concept was the affordance — a property of the environment that is relevant to the action capabilities of the organism perceiving it. A step is an affordance for climbing if you can climb it. A gap is an affordance for jumping if you can jump it.",
          "Attunement is the process of becoming increasingly sensitive to the affordances that matter for your domain. Expert practitioners don't see more — they see the right things faster.",
        ],
      },
      {
        heading: "What This Means for Coaching",
        body: [
          "Your job is to help athletes attune. Not to tell them what to do, but to arrange the environment so the relevant affordances become perceptible.",
          "This is why verbal instruction has limits. You can describe an affordance, but description is not attunement. Attunement requires experience in the relevant environment.",
        ],
      },
    ],
  },
  {
    slug: "04",
    title: "Constraints as Design",
    duration: "~50 min read",
    sections: [
      {
        heading: "The Constraints-Led Approach",
        body: [
          "Newell's model identifies three categories of constraints: organismic (athlete), environmental (context), and task (rules, equipment, objectives). Skill emerges from the interaction of all three.",
          "The practitioner's tool is constraint manipulation. By adjusting one constraint, you shift the entire system — and different behaviors become available or unavailable.",
        ],
      },
      {
        heading: "Designing With Constraints",
        body: [
          "The mistake most practitioners make is treating constraints as obstacles to route around. The ecological dynamics approach treats them as design levers.",
          "Want a different behavior? Don't cue it. Constrain for it. The behavior should feel like the path of least resistance, not an instruction being followed.",
        ],
      },
    ],
  },
  {
    slug: "05",
    title: "Perception Precedes Action",
    duration: "~45 min read",
    sections: [
      {
        heading: "The Perception-Action Cycle",
        body: [
          "Action without perception is blind. Every movement decision is downstream of a perceptual one — what the athlete sees, feels, and senses in the environment determines what action becomes available.",
          "Traditional coaching often focuses exclusively on the action. Ecological dynamics insists you must train the perception that precedes it.",
        ],
      },
      {
        heading: "Designing Perceptual Opportunities",
        body: [
          "This means your training environments need to contain the same informational structure as the performance environment. If the game contains certain visual cues, your practice must contain them too.",
          "Decontextualized repetition — drilling movements without their associated perceptual context — produces athletes who can perform the movement but can't find it when it matters.",
        ],
      },
    ],
  },
  {
    slug: "06",
    title: "The Stream vs. The Shores",
    duration: "~40 min read",
    sections: [
      {
        heading: "A Different Mental Model for Development",
        body: [
          "Most development frameworks imagine skill as something that accumulates in the athlete — a bucket that fills over time. The ecological framework imagines it differently: the athlete is a system that self-organizes toward functional solutions given the right environment.",
          "The stream metaphor: you don't push water. You shape the banks. The water finds its own path.",
        ],
      },
      {
        heading: "Implications for Long-Term Development",
        body: [
          "If the shores are the practitioner's domain, then the question shifts from 'what do I teach?' to 'what do I design?'",
          "This is a harder question. Design requires understanding the organism, the task, and the environment simultaneously — and it requires tolerating the uncertainty of emergent outcomes.",
        ],
      },
    ],
  },
  {
    slug: "07",
    title: "Applied Across Domains",
    duration: "~60 min read",
    sections: [
      {
        heading: "The Framework Travels",
        body: [
          "Ecological dynamics was formalized in sport science, but the underlying principles apply anywhere skill is developed — music, surgery, teaching, therapy, leadership.",
          "The organism, task, and environment vary. The logic of the framework doesn't.",
        ],
      },
      {
        heading: "Cross-Domain Examples",
        body: [
          "A surgeon developing tactile sensitivity to tissue resistance. A musician learning to feel the room and adjust dynamics in real time. A teacher reading the energy of a classroom and modulating accordingly.",
          "All of these are attunement. All of them emerge from repeated exposure to the relevant informational landscape — not from being told what to feel.",
        ],
      },
      {
        heading: "Applying This in Your Practice",
        body: [
          "The question to ask in any domain: what are the affordances that matter here, and am I designing environments that make them perceptible?",
          "Start with one practice. Map its constraints. Identify what perceptual information is present and what is absent. Then ask what one change would bring the practice environment closer to the performance environment.",
        ],
      },
    ],
  },
  {
    slug: "08",
    title: "Installing the OS",
    duration: "~45 min read",
    sections: [
      {
        heading: "From Framework to Lens",
        body: [
          "By this point you've been introduced to the major concepts: affordances, constraints, attunement, the perception-action cycle, representative design. The question now is how to actually use them.",
          "The answer is not to apply them as a checklist. The answer is to let them become the way you see.",
        ],
      },
      {
        heading: "The Practice of Noticing",
        body: [
          "Start with observation. Before your next session, watch your athletes without intervening. Ask: what affordances are they attuning to? What constraints are shaping their behavior? What perceptual information is available — and what is missing?",
          "You don't need to change anything yet. Just notice. The framework starts to install itself through the act of looking with different eyes.",
        ],
      },
      {
        heading: "What Comes Next",
        body: [
          "Foundations is the beginning, not the destination. The OS runs in the background while you continue building everything else — your domain knowledge, your relationships, your practice.",
          "The work is ongoing. But now you have a better model to work from.",
        ],
      },
    ],
  },
];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getNextModule(slug: string): Module | undefined {
  const idx = modules.findIndex((m) => m.slug === slug);
  return idx >= 0 && idx < modules.length - 1 ? modules[idx + 1] : undefined;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Desktop/attune/attune-website-v4
npm run build 2>&1 | head -30
```

Expected: no TypeScript errors on the new file (other errors unrelated to this file are ok for now since we haven't created the pages yet).

- [ ] **Step 3: Commit**

```bash
git add src/lib/modules.ts
git commit -m "feat: add module data with sections and helper functions"
```

---

## Task 2: API route — mark module complete

**Files:**
- Create: `src/app/api/complete-module/route.ts`

**Context:** Clerk v7 — `auth()` is async. `clerkClient()` is also async and returns the backend client. `updateUserMetadata` does a shallow merge at the top level, so we must spread the full existing `publicMetadata` before writing. Initialize `completedModules` to `[]` if not present.

- [ ] **Step 1: Create the API route**

```ts
// src/app/api/complete-module/route.ts
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const moduleNumber = body?.moduleNumber as string | undefined;
  if (!moduleNumber || typeof moduleNumber !== "string") {
    return NextResponse.json({ error: "Missing moduleNumber" }, { status: 400 });
  }

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const existingMeta = (user.publicMetadata ?? {}) as Record<string, unknown>;
  const completed = (existingMeta.completedModules as string[] | undefined) ?? [];

  if (!completed.includes(moduleNumber)) {
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...existingMeta,
        completedModules: [...completed, moduleNumber],
      },
    });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Run build to verify no TypeScript errors**

```bash
npm run build 2>&1 | grep -E "(error|Error)" | head -20
```

Expected: no errors on `src/app/api/complete-module/route.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/complete-module/route.ts
git commit -m "feat: add complete-module API route with Clerk metadata update"
```

---

## Task 3: ModuleProgress client component

**Files:**
- Create: `src/app/dashboard/[slug]/ModuleProgress.tsx`

**Context:** This is the only `"use client"` piece of the module page. It receives `completedModules` (from the server) and `currentSlug` as props, renders the sidebar module list and the complete button, and handles optimistic state updates. On button click: immediately update local state, call the API, then on failure revert and alert.

- [ ] **Step 1: Create `ModuleProgress.tsx`**

```tsx
// src/app/dashboard/[slug]/ModuleProgress.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { modules, getNextModule, type Module } from "@/lib/modules";

interface Props {
  currentSlug: string;
  initialCompleted: string[];
}

export default function ModuleProgress({ currentSlug, initialCompleted }: Props) {
  const [completed, setCompleted] = useState<string[]>(initialCompleted);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete = completed.includes(currentSlug);
  const nextModule: Module | undefined = getNextModule(currentSlug);

  async function handleComplete() {
    if (isComplete || marking) return;
    // Optimistic update
    setCompleted((prev) => [...prev, currentSlug]);
    setMarking(true);
    setError(null);

    try {
      const res = await fetch("/api/complete-module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleNumber: currentSlug }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      // Revert
      setCompleted((prev) => prev.filter((s) => s !== currentSlug));
      setError("Something went wrong. Try again.");
    } finally {
      setMarking(false);
    }
  }

  return (
    <>
      {/* ── SIDEBAR ── */}
      <aside
        className="hidden md:flex flex-col border-r border-white/[0.08] py-10"
        style={{ width: "220px", flexShrink: 0 }}
      >
        <p
          className="px-8 mb-6 text-[9px] tracking-[0.25em] uppercase text-white/20"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Foundations
        </p>
        <nav className="flex flex-col">
          {modules.map((mod) => {
            const done = completed.includes(mod.slug);
            const active = mod.slug === currentSlug;
            return (
              <Link
                key={mod.slug}
                href={`/dashboard/${mod.slug}`}
                className={[
                  "flex items-center gap-3 px-8 py-3 text-[13px] transition-colors",
                  active
                    ? "bg-white/[0.04] text-white/90 border-r-2 border-white/40"
                    : "text-white/30 hover:text-white/60",
                ].join(" ")}
              >
                {/* Circle indicator */}
                <span
                  className="shrink-0 w-3 h-3 rounded-full border transition-colors"
                  style={{
                    borderColor: done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
                    background: done ? "rgba(255,255,255,0.6)" : "transparent",
                  }}
                />
                <span className="truncate">{mod.slug} — {mod.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── COMPLETE BUTTON + ERROR (rendered at bottom of content area via portal-like placement) ── */}
      {/* This component only renders the sidebar and the action block.
          The parent page renders the lesson content above. */}
      <div className="mt-16 pt-8 border-t border-white/[0.06]">
        {error && (
          <p className="text-red-400 text-[12px] mb-4">{error}</p>
        )}
        {isComplete ? (
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] tracking-[0.15em] uppercase text-white/30"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Completed ✓
            </span>
            {nextModule && (
              <Link
                href={`/dashboard/${nextModule.slug}`}
                className="text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Continue to Module {nextModule.slug} →
              </Link>
            )}
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={handleComplete}
              disabled={marking}
              className="bg-white text-black text-[11px] font-semibold tracking-[0.1em] uppercase px-8 py-4 hover:bg-white/85 transition-colors disabled:opacity-50"
            >
              {nextModule
                ? `Complete — continue to Module ${nextModule.slug} →`
                : "Complete — return to dashboard →"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Run build to check types**

```bash
npm run build 2>&1 | grep -E "(error TS|Error)" | head -20
```

Expected: no errors on the new file.

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/[slug]/ModuleProgress.tsx
git commit -m "feat: add ModuleProgress client component with optimistic complete button"
```

---

## Task 4: Module page (server component)

**Files:**
- Create: `src/app/dashboard/[slug]/page.tsx`

**Context:** Server component. Uses `currentUser()` from `@clerk/nextjs/server`. Reads `completedModules` from `publicMetadata`. If slug doesn't match a module, calls `notFound()`. Renders two-column layout: sidebar (via `ModuleProgress`) + content area (lesson content). `ModuleProgress` handles the sidebar and complete button — the page only needs to pass it `currentSlug` and `initialCompleted` and render the lesson text.

**Note on layout:** The sidebar lives inside `ModuleProgress` (a client component). To avoid prop-drilling the lesson content into the client component, the page renders a flex row where the left column is `<ModuleProgress>` (sidebar only portion) and the right column is the lesson content + the complete button portion. Since `ModuleProgress` renders both the sidebar AND the bottom action block, we split the layout with CSS: `ModuleProgress` renders its sidebar as `position: static` within the flex, and the page renders the content. The complete button is at the bottom of the right column — but since it's inside `ModuleProgress`, we need the page to put `ModuleProgress` in a way that its bottom block appears in the right column.

**Revised approach for clean layout:** Split `ModuleProgress` into two exports:
- Default export: `ModuleProgress` — the full sidebar + action block wrapper (used by the page to wrap the layout)
- We'll restructure so that `ModuleProgress` accepts a `children` prop and renders the two-column layout itself (sidebar left, children + action right). This keeps all interactive state in one client component and avoids splitting state across the tree.

Update `ModuleProgress.tsx` to accept `children` and render the full two-column layout:

- [ ] **Step 1: Update `ModuleProgress.tsx` to accept children and own the layout**

Replace the entire file content with:

```tsx
// src/app/dashboard/[slug]/ModuleProgress.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { modules, getNextModule, type Module } from "@/lib/modules";

interface Props {
  currentSlug: string;
  initialCompleted: string[];
  children: React.ReactNode; // lesson content
}

export default function ModuleProgress({ currentSlug, initialCompleted, children }: Props) {
  const [completed, setCompleted] = useState<string[]>(initialCompleted);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete = completed.includes(currentSlug);
  const nextModule: Module | undefined = getNextModule(currentSlug);

  async function handleComplete() {
    if (isComplete || marking) return;
    setCompleted((prev) => [...prev, currentSlug]);
    setMarking(true);
    setError(null);

    try {
      const res = await fetch("/api/complete-module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleNumber: currentSlug }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      setCompleted((prev) => prev.filter((s) => s !== currentSlug));
      setError("Something went wrong. Try again.");
    } finally {
      setMarking(false);
    }
  }

  return (
    <div className="flex flex-1 min-h-0">

      {/* SIDEBAR */}
      <aside
        className="hidden md:flex flex-col border-r border-white/[0.08] py-10 shrink-0"
        style={{ width: "220px" }}
      >
        <p
          className="px-8 mb-6 text-[9px] tracking-[0.25em] uppercase text-white/20"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Foundations
        </p>
        <nav className="flex flex-col">
          {modules.map((mod) => {
            const done = completed.includes(mod.slug);
            const active = mod.slug === currentSlug;
            return (
              <Link
                key={mod.slug}
                href={`/dashboard/${mod.slug}`}
                className={[
                  "flex items-center gap-3 px-8 py-[10px] text-[12px] transition-colors leading-snug",
                  active
                    ? "bg-white/[0.04] text-white/90 border-r-2 border-white/40"
                    : "text-white/30 hover:text-white/60",
                ].join(" ")}
              >
                <span
                  className="shrink-0 w-[10px] h-[10px] rounded-full border transition-colors"
                  style={{
                    borderColor: done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
                    background: done ? "rgba(255,255,255,0.6)" : "transparent",
                  }}
                />
                <span className="truncate">{mod.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 px-[clamp(1.75rem,5vw,4rem)] py-10 overflow-y-auto">
        {children}

        {/* ACTION BLOCK */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          {error && (
            <p className="text-red-400 text-[12px] mb-4">{error}</p>
          )}
          {isComplete ? (
            <div className="flex items-center justify-between">
              <span
                className="text-[11px] tracking-[0.15em] uppercase text-white/30"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Completed ✓
              </span>
              {nextModule && (
                <Link
                  href={`/dashboard/${nextModule.slug}`}
                  className="text-[11px] tracking-[0.12em] uppercase text-white/50 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Continue to Module {nextModule.slug} →
                </Link>
              )}
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={handleComplete}
                disabled={marking}
                className="bg-white text-black text-[11px] font-semibold tracking-[0.1em] uppercase px-8 py-4 hover:bg-white/85 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {nextModule
                  ? `Complete — continue to Module ${nextModule.slug} →`
                  : "Complete — return to dashboard →"}
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
```

- [ ] **Step 2: Create the module page server component**

```tsx
// src/app/dashboard/[slug]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getModule } from "@/lib/modules";
import ModuleProgress from "./ModuleProgress";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const user = await currentUser();
  const completedModules = (user?.publicMetadata?.completedModules as string[] | undefined) ?? [];

  return (
    <main className="bg-void text-white min-h-screen flex flex-col">

      {/* NAV */}
      <nav className="px-[clamp(1.75rem,6vw,5rem)] py-5 flex items-center justify-between border-b border-white/[0.08] shrink-0">
        <Link href="/dashboard" className="opacity-70 hover:opacity-100 transition-opacity">
          <Image
            src="/attune-logo.png"
            alt="Attune"
            width={32}
            height={32}
            style={{ filter: "invert(1)", objectFit: "contain" }}
          />
        </Link>
        <div className="flex items-center gap-5">
          <p
            className="hidden sm:block text-[10px] tracking-[0.2em] uppercase text-white/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Foundations
          </p>
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 32, height: 32 } },
            }}
          />
        </div>
      </nav>

      {/* TWO-COLUMN BODY — ModuleProgress owns the layout */}
      <ModuleProgress currentSlug={slug} initialCompleted={completedModules}>

        {/* Lesson header */}
        <div className="mb-10">
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-white/20 mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Module {mod.slug}
          </p>
          <h1
            className="text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] tracking-[-0.02em] text-white mb-3"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            {mod.title}
          </h1>
          <p
            className="text-[11px] tracking-[0.15em] uppercase text-white/20"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {mod.duration}
          </p>
        </div>

        <hr className="border-white/[0.06] mb-10" />

        {/* Lesson content */}
        <article className="max-w-[640px] space-y-10">
          {mod.sections.map((section) => (
            <section key={section.heading}>
              <p
                className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {section.heading}
              </p>
              <div className="space-y-4">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-[15px] text-white/75 leading-[1.85]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

      </ModuleProgress>

    </main>
  );
}
```

- [ ] **Step 3: Run build to verify no errors**

```bash
npm run build 2>&1 | grep -E "(error TS|Error:)" | head -20
```

Expected: no TypeScript errors on the new files.

- [ ] **Step 4: Start dev server and manually test**

```bash
npm run dev -- --port 3006
```

Visit `http://localhost:3006/dashboard/01` (must be signed in — sign up via `/welcome` first if needed). Verify:
- Two-column layout: sidebar left with 8 modules, content right
- Active module highlighted in sidebar
- Lesson content renders with section headings and paragraphs
- "Complete — continue to Module 02 →" button visible at bottom

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/[slug]/ModuleProgress.tsx src/app/dashboard/[slug]/page.tsx
git commit -m "feat: add module reading pages with sidebar layout and lesson content"
```

---

## Task 5: Sign-in page

**Files:**
- Create: `src/app/sign-in/page.tsx`

**Context:** Clone of `/welcome` structure, swap `<SignUp>` for `<SignIn>`, update copy. `afterSignInUrl="/dashboard"` redirects after login. Middleware doesn't protect `/sign-in` — it's public by default since it's not under `/dashboard`.

- [ ] **Step 1: Create `src/app/sign-in/page.tsx`**

```tsx
// src/app/sign-in/page.tsx
"use client";

import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="bg-void text-white min-h-screen flex flex-col items-center justify-center px-6 py-20">

      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/attune-logo.png"
          alt="Attune"
          width={56}
          height={56}
          style={{ filter: "invert(1)", objectFit: "contain" }}
          priority
        />
      </div>

      {/* Heading */}
      <div className="text-center mb-12 max-w-lg">
        <p
          className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Returning member
        </p>
        <h1
          className="text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] tracking-[-0.02em] text-white mb-5"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
        >
          Welcome back.
        </h1>
        <p className="text-[15px] text-white/45 leading-[1.8]">
          Sign in to continue where you left off.
        </p>
      </div>

      {/* Clerk SignIn */}
      <SignIn
        afterSignInUrl="/dashboard"
        appearance={{
          variables: {
            colorBackground: "#111110",
            colorText: "#ffffff",
            colorTextSecondary: "rgba(255,255,255,0.45)",
            colorInputBackground: "#0A0A0A",
            colorInputText: "#ffffff",
            colorPrimary: "#ffffff",
            borderRadius: "0px",
            fontFamily: "var(--font-sans)",
          },
          elements: {
            card: {
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "none",
              background: "#111110",
            },
            headerTitle: { display: "none" },
            headerSubtitle: { display: "none" },
            formButtonPrimary: {
              background: "#ffffff",
              color: "#000000",
              fontWeight: "600",
              fontSize: "12px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: "0px",
              "&:hover": { background: "rgba(255,255,255,0.85)" },
            },
            footerActionLink: { color: "rgba(255,255,255,0.5)" },
            identityPreviewText: { color: "rgba(255,255,255,0.7)" },
            formFieldInput: {
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "0px",
            },
          },
        }}
      />

    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

Visit `http://localhost:3006/sign-in`. Verify:
- Dark styling matches `/welcome`
- "RETURNING MEMBER" label, "Welcome back." heading
- Clerk sign-in form renders
- After signing in, redirects to `/dashboard`

- [ ] **Step 3: Commit**

```bash
git add src/app/sign-in/page.tsx
git commit -m "feat: add returning member sign-in page"
```

---

## Task 6: Dashboard — completion indicators

**Files:**
- Modify: `src/app/dashboard/page.tsx`

**Context:** The dashboard is a `"use client"` component using `useUser()`. Read `completedModules` from `user.publicMetadata` and show a filled dot + line-through title for completed modules. Make the module rows into `<Link>` tags pointing to `/dashboard/[slug]`.

- [ ] **Step 1: Update `src/app/dashboard/page.tsx`**

Replace the file with:

```tsx
// src/app/dashboard/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { modules } from "@/lib/modules";

export default function Dashboard() {
  const { user } = useUser();
  const completed = (user?.publicMetadata?.completedModules as string[] | undefined) ?? [];

  return (
    <main className="bg-void text-white min-h-screen">

      {/* NAV */}
      <nav className="px-[clamp(1.75rem,6vw,5rem)] py-5 flex items-center justify-between border-b border-white/[0.08]">
        <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">
          <Image
            src="/attune-logo.png"
            alt="Attune"
            width={32}
            height={32}
            style={{ filter: "invert(1)", objectFit: "contain" }}
          />
        </Link>
        <div className="flex items-center gap-5">
          <p
            className="hidden sm:block text-[10px] tracking-[0.2em] uppercase text-white/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Foundations
          </p>
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 32, height: 32 } },
            }}
          />
        </div>
      </nav>

      {/* HEADER */}
      <section className="px-[clamp(1.75rem,6vw,5rem)] py-16 border-b border-white/[0.06]">
        <p
          className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {user?.firstName ? `Welcome, ${user.firstName}` : "Welcome"}
        </p>
        <h1
          className="text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em] text-white"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
        >
          Attune Foundations
        </h1>
        <p className="text-[15px] text-white/40 leading-relaxed mt-4 max-w-lg">
          Eight sessions. One operating system. Work through them in order — each one builds on the last.
        </p>
      </section>

      {/* MODULE LIST */}
      <section className="px-[clamp(1.75rem,6vw,5rem)] py-12">
        <div className="max-w-3xl space-y-2">
          {modules.map((mod) => {
            const done = completed.includes(mod.slug);
            return (
              <Link
                key={mod.slug}
                href={`/dashboard/${mod.slug}`}
                className="group flex items-center gap-8 border border-white/[0.08] px-8 py-6 hover:border-white/[0.20] hover:bg-white/[0.02] transition-all duration-200"
              >
                <span
                  className="text-[2rem] text-white/10 leading-none group-hover:text-white/20 transition-colors shrink-0 w-12"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
                >
                  {mod.slug}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={[
                      "text-[15px] font-medium leading-snug transition-colors",
                      done ? "text-white/30 line-through" : "text-white/80 group-hover:text-white",
                    ].join(" ")}
                  >
                    {mod.title}
                  </p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  {done ? (
                    <span
                      className="text-[9px] tracking-[0.15em] uppercase text-white/25"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Done ✓
                    </span>
                  ) : (
                    <span
                      className="text-[10px] tracking-[0.15em] uppercase text-white/20"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {mod.duration}
                    </span>
                  )}
                  <span className="text-white/20 group-hover:text-white/50 transition-colors text-[18px]">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-[clamp(1.75rem,6vw,5rem)] py-10 border-t border-white/[0.06] mt-8">
        <p
          className="text-[11px] text-white/15 tracking-[0.12em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          © 2026 Attune · Questions? Reply to any Signal/Noise email.
        </p>
      </footer>

    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

Visit `http://localhost:3006/dashboard`. Verify:
- Module rows are now clickable links
- Completed modules show "Done ✓" + line-through title
- Non-completed modules show duration label

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: wire dashboard module rows to pages and show completion state"
```

---

## Task 7: Homepage sign-in link

**Files:**
- Modify: `src/app/page.tsx`

**Context:** Add a small "Already a member? Sign in →" link near the main CTA. Needs to be subtle — not competing with the buy button.

- [ ] **Step 1: Read the current homepage CTA section**

Read `src/app/page.tsx` and find the primary CTA button (the Stripe checkout link). Add the sign-in link immediately below it.

- [ ] **Step 2: Add the sign-in link below the primary CTA**

Find the Stripe CTA button (e.g. `buy.stripe.com` link) in `page.tsx` and add directly after it:

```tsx
<p className="mt-4 text-center text-[12px] text-white/30">
  Already a member?{" "}
  <a
    href="/sign-in"
    className="text-white/50 hover:text-white underline underline-offset-2 transition-colors"
  >
    Sign in →
  </a>
</p>
```

Adjust container styling as needed to keep it visually secondary.

- [ ] **Step 3: Verify in browser**

Visit `http://localhost:3006`. Verify the sign-in link appears below the CTA, is visually muted, and links to `/sign-in`.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add returning member sign-in link to homepage CTA"
```

---

## Task 8: Full flow verification and push

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: exits with code 0, no errors.

- [ ] **Step 2: Manual end-to-end test**

1. Open `http://localhost:3006` — sign-in link visible below CTA
2. Navigate to `/sign-in` — dark form, correct copy, redirects to `/dashboard` after login
3. From dashboard, click Module 01 — two-column layout loads, lesson content renders
4. Click "Complete — continue to Module 02 →" — button immediately shows "Completed ✓", sidebar dot fills
5. Return to `/dashboard` — Module 01 shows "Done ✓" with line-through title
6. Navigate to Module 08, complete it — button reads "Complete — return to dashboard →"

- [ ] **Step 3: Push to main**

```bash
git push origin main
```

Expected: Vercel picks up the push and auto-deploys.
