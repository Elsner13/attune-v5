# Jack Moses Redesign — Attune v4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the Attune v4 website from a charcoal/rose editorial aesthetic to a near-black/gold "premium dark direct response" aesthetic aligned with Jack Moses's conversion-first design philosophy.

**Architecture:** All homepage content lives in `src/app/page.tsx` (one file, ~367 lines). We swap design tokens in `globals.css` and `layout.tsx`, then refactor `page.tsx` in place — reordering sections to match the Moses conversion funnel, updating colors throughout, and adding two new sections (Proof Bar, FAQ). No new component files needed; the page stays as one self-contained file.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Google Fonts (next/font/google)

---

## File Map

| File | Action | What Changes |
|------|--------|--------------|
| `src/app/globals.css` | Modify | Swap color tokens (charcoal/rose/pearl → void/gold/cream), swap font imports (Instrument Serif → Cormorant Garamond, Clash Grotesk → DM Sans), remove rose glow, update button hover to gold |
| `src/app/layout.tsx` | Modify | Import Cormorant_Garamond + DM_Sans via next/font/google instead of Instrument_Serif; update CSS variable names; update metadata title/description |
| `src/app/page.tsx` | Modify | Full overhaul: swap all color classes (rose→gold, charcoal→void, pearl→cream), reorder sections to Moses funnel, add Proof Bar section, add FAQ section, update hero + CTA copy |

---

## Task 1: Design Tokens — globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Open and read the file**

  Confirm it has: `--charcoal`, `--rose`, `--pearl`, Clash Grotesk import, Instrument Serif import.

- [ ] **Step 2: Replace the entire file contents**

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500&display=swap');
@import "tailwindcss";

:root {
  --void: #080806;
  --surface: #111110;
  --cream: #F2EDD7;
  --gold: #C8A96E;
  --gold-cta: #D4AF37;
  --muted: #7A7560;
  --rule: #1E1D1A;
}

@theme inline {
  --color-void: var(--void);
  --color-surface: var(--surface);
  --color-cream: var(--cream);
  --color-gold: var(--gold);
  --color-gold-cta: var(--gold-cta);
  --color-muted: var(--muted);
  --color-rule: var(--rule);
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'DM Sans', system-ui, sans-serif;
  --font-mono: var(--font-geist-mono);
}

html,
body {
  background-color: var(--void);
  color: var(--cream);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* ── Grain texture ──────────────────────────────────────── */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px 300px;
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 3: Verify the file saved correctly**

  Run: `cat src/app/globals.css | head -20`
  Expected: `@import url('...Cormorant+Garamond...')` on line 1.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/attune/attune-website-v4
git add src/app/globals.css
git commit -m "feat: swap design tokens to near-black/gold/cream (Moses palette)"
```

---

## Task 2: Font Setup — layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attune — Skill is forged, not taught.",
  description:
    "A program for practitioners done with generic advice. Install the ecological dynamics operating system and rebuild your practice from it.",
  openGraph: {
    title: "Attune — Skill is forged, not taught.",
    description:
      "A program for practitioners done with generic advice. Install the ecological dynamics operating system and rebuild your practice from it.",
    url: "https://attunemastery.com",
    siteName: "Attune",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Start dev server and verify fonts load**

```bash
npm run dev -- --port 3008
```

  Open `http://localhost:3008`. Expected: Cormorant Garamond loading for headings, no console font errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: swap to Cormorant Garamond + DM Sans font stack"
```

---

## Task 3: Full Page Overhaul — page.tsx

This is the largest task. Replace the entire `src/app/page.tsx` with the Moses-method funnel structure. Read the current file first to confirm line count (~367 lines), then replace.

**Files:**
- Modify: `src/app/page.tsx`

**Moses funnel order:**
1. Nav
2. Hero (transformation headline, warm gold glow, grain bg)
3. Proof Bar (new — numbers only, gold)
4. The Problem (The Drift content, reframed)
5. The Insight (Operating System + Shift merged, copy condensed)
6. Signal/Noise (newsletter)
7. The Offer (Foundations — existing, restyled)
8. About Sam (new — authority bio)
9. Final CTA + FAQ (The Choice expanded)
10. Footer

- [ ] **Step 1: Replace page.tsx with the Moses-method version**

```tsx
import Image from "next/image";
import Link from "next/link";

const CHECKOUT_URL = "https://attunemastery.com/checkout";
const SUBSTACK_URL = "https://findthesignal.substack.com/";

/* ── Data ─────────────────────────────────────────────────────── */

const proofStats = [
  { n: "2×", label: "NCAA National Champion" },
  { n: "6×", label: "All-American" },
  { n: "500+", label: "Signal/Noise Readers" },
  { n: "5 yrs", label: "Research Integrated" },
];

const principles = [
  {
    n: "01",
    title: "Attunement, Not Acquisition",
    body: "Skill is not something you acquire. It's a relationship you develop. You don't get good at coaching by learning techniques. You attune to your athletes' performance environments until you can design constraints that produce the behaviors they need without forcing them. Knowledge ABOUT a place lets you answer questions. Knowledge OF a place lets you navigate it in the dark.",
  },
  {
    n: "02",
    title: "Constraints Shape Emergence",
    body: "You don't need more freedom. You need better constraints. Every system self-organizes within the boundaries that define it. The constraint is not limiting the behavior. The constraint is generating it. Most people design by adding options. The skilled designer subtracts. Removes the noise. Creates space. Then introduces constraints that favor the emergence they want.",
  },
  {
    n: "03",
    title: "Perception Precedes Action",
    body: "You can't act on information you don't perceive. The expert doesn't have better technique. The expert perceives affordances sooner. Wayne Gretzky didn't skate to where the puck was going because he had better legs. He perceived where it would be before anyone else could. Training perception requires you to get IN the environment.",
  },
  {
    n: "04",
    title: "The Stream vs. The Shores",
    body: "Money flows in the stream. Skills emerge in the stream. The stream is the current of value exchange: client conversations, offers sent, content shipped, problems solved. The shores are where most creators rot. Scrolling. Consuming. Researching. Perfecting in private. At some point you must enter the water.",
  },
];

const foundationsIncludes = [
  { item: "8 sessions that rewire how you read your environment", detail: "Self-paced, lifetime access." },
  { item: "Applied examples across 5 domains", detail: "Coaching, content, business, parenting, performance — the same lens, every domain." },
  { item: "Constraint design exercises for your specific context", detail: "Not the generic case. Your environment." },
  { item: "The knowledge OF shift", detail: "From understanding frameworks to navigating your environment in the dark." },
  { item: "Lifetime access + all future updates", detail: "This is not a cohort. It compounds." },
  { item: "Signal/Noise ongoing access", detail: "Stay coupled to the lens after the course ends." },
];

const whatDevelops = [
  { skill: "Perceptual accuracy", detail: "See market affordances before they're obvious" },
  { skill: "Constraint design fluency", detail: "Engineer environments that produce behaviors without forcing" },
  { skill: "Representative thinking", detail: "Know instantly if your practice matches your performance environment" },
  { skill: "Signal/noise discrimination", detail: "Cut through the content flood and perceive what actually matters" },
];

const recentIssues = [
  { title: "The Noise You're Listening To is Shaping Your Becoming", date: "MAR 2, 2026" },
  { title: "The Split", date: "MAR 1, 2026" },
  { title: "Simplicity Comes Last, Not First", date: "FEB 25, 2026" },
];

const faqs = [
  {
    q: "I don't have a sport or coaching background. Is this for me?",
    a: "Yes. Ecological dynamics describes how all living systems couple with their environments — not just athletes. Creators, coaches, consultants, parents, and practitioners of any kind will find this lens immediately applicable. Sam uses examples across every domain.",
  },
  {
    q: "How is this different from other skill acquisition or mindset courses?",
    a: "Most courses teach you what to do. Foundations installs the operating system you run all decisions through. It's not a list of tactics. It's a unified lens that makes all your existing knowledge suddenly cohere.",
  },
  {
    q: "How long does it take?",
    a: "The 8 modules take most people one focused week. The operating system installs faster than you'd expect. Applications — reading your environment, designing constraints, perceiving affordances in real time — compound over months.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "If you complete the course and don't feel the lens shift, reach out directly. Sam stands behind this work.",
  },
  {
    q: "Is this the right time to do this?",
    a: "You're on this page for a reason. The drift has a voice — you recognize it. The question is whether you're done listening to it.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="bg-void text-cream">

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-[clamp(1.75rem,6vw,5rem)] py-5 flex items-center justify-between border-b border-cream/[0.06] bg-void/90 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="Attune" width={40} height={40} className="opacity-70 group-hover:opacity-100 transition-opacity" style={{ objectFit: "contain" }} />
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-cream/45 group-hover:text-cream/80 transition-colors" style={{ fontFamily: "var(--font-mono)" }}>Attune</span>
        </Link>
        <div className="flex items-center gap-8">
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="text-[13px] text-cream/45 hover:text-cream transition-colors">Signal/Noise</a>
          <a
            href={CHECKOUT_URL}
            className="border border-gold-cta bg-gold-cta text-void text-[12px] font-medium px-5 py-2.5 tracking-[0.05em] uppercase hover:bg-transparent hover:text-gold-cta transition-colors"
          >
            Get Foundations →
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-[clamp(1.75rem,6vw,5rem)] pt-44 pb-28 border-b border-cream/[0.06] bg-void">
        {/* Ambient gold glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-[8%] w-[600px] h-[600px] rounded-full bg-gold blur-[180px] opacity-[0.06]" />
        </div>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-10" style={{ fontFamily: "var(--font-mono)" }}>
          ● Attune — Ecological Dynamics Applied
        </p>
        <h1 className="font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] tracking-[-0.02em] text-cream mb-12 max-w-[18ch]" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
          Skill is forged,<br />not taught.
        </h1>
        <div className="grid md:grid-cols-2 gap-10 border-t border-cream/[0.06] pt-10 max-w-5xl">
          <p className="text-[15px] leading-[1.85] text-cream/55">
            Most training advice treats skill like a download. Add the right drills, follow the right program, repeat until it sticks.
          </p>
          <div className="space-y-5 text-[15px] leading-[1.85] text-cream/55">
            <p>But skill doesn't transfer like a file. It emerges from the relationship between the performer and the environment. When the environment is wrong, all the reps in the world won't produce mastery.</p>
            <p>When it's right, learning becomes inevitable.</p>
          </div>
        </div>
        <div className="mt-14">
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center gap-3 border border-gold-cta bg-gold-cta text-void font-medium px-10 py-5 text-[13px] tracking-[0.06em] uppercase hover:bg-transparent hover:text-gold-cta transition-colors"
          >
            Stop Training in the Wrong Environment →
          </a>
        </div>
      </section>

      {/* ── PROOF BAR ───────────────────────────────────────────── */}
      <section className="border-b border-cream/[0.06] bg-surface">
        <div className="px-[clamp(1.75rem,6vw,5rem)] py-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/[0.06]">
          {proofStats.map((s) => (
            <div key={s.n} className="bg-surface px-8 py-10 flex flex-col gap-2">
              <span className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gold leading-none" style={{ fontFamily: "var(--font-serif)" }}>{s.n}</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/35" style={{ fontFamily: "var(--font-mono)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ─────────────────────────────────────────── */}
      <section className="px-[clamp(1.75rem,6vw,5rem)] py-24 border-b border-cream/[0.06] bg-void">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-10" style={{ fontFamily: "var(--font-mono)" }}>The Problem</p>
        <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.97] tracking-[-0.02em] text-cream mb-16 max-w-[30ch]" style={{ fontFamily: "var(--font-serif)" }}>
          You've put in the work.<br />Something still isn't clicking.
        </h2>
        <div className="grid md:grid-cols-2 gap-0 border-t border-cream/[0.06]">
          <div className="py-12 md:pr-16 md:border-r border-cream/[0.06] space-y-5">
            <p className="text-[15px] leading-[1.85] text-cream/55">You scroll for "research." You save frameworks you'll never implement. You consume podcasts about people who are doing what you keep saying you'll do.</p>
            <p className="text-[15px] leading-[1.85] text-cream/55">Meanwhile, your best ideas stay locked in your head. Your offers never launch. Your content feels like noise because you're operating from fragmentation, not signal.</p>
            <p className="text-[15px] leading-[1.85] text-cream/55">This is drift. The low-energy attractor state where consumption replaces creation, analysis replaces action, and you numb the question that won't leave you alone: <em className="text-cream/80">Am I wasting this?</em></p>
          </div>
          <div className="py-12 md:pl-16 border-t md:border-t-0 border-cream/[0.06] space-y-5">
            <p className="text-[15px] leading-[1.85] text-cream/55">You're not lazy. You're in the wrong environment. Modern digital spaces are engineered to keep you drifting. Infinite scroll. Algorithmic feeds. Dopamine on demand.</p>
            <p className="text-[15px] leading-[1.85] text-cream/55">The shores are comfortable. Nothing grows there.</p>
            <p className="text-[15px] leading-[1.85] text-cream/55">The problem is not missing information. It's too much information and no operating system to organize it. What you need is not another framework. It's the lens that makes all of them suddenly cohere.</p>
          </div>
        </div>
      </section>

      {/* ── THE INSIGHT ─────────────────────────────────────────── */}
      <section className="px-[clamp(1.75rem,6vw,5rem)] py-24 border-b border-cream/[0.06] bg-surface">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-10" style={{ fontFamily: "var(--font-mono)" }}>The Insight</p>
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.97] tracking-[-0.02em] text-cream" style={{ fontFamily: "var(--font-serif)" }}>
            One lens.<br />Everything organizes.
          </h2>
          <div className="space-y-5 text-[15px] leading-[1.85] text-cream/55 flex flex-col justify-end">
            <p>Ecological dynamics is not a model for skill acquisition. It's a complete description of how living systems couple with their environments to generate intelligent behavior.</p>
            <p>Practice design. Content creation. Business building. Parenting. Consciousness itself. These are all examples of the same underlying process: organisms attune to affordances within constraints through perception-action coupling.</p>
            <p>When you SEE the operating system, you can design from it.</p>
          </div>
        </div>

        {/* Gold pull quote */}
        <div className="border-t border-l-4 border-l-gold border-t-cream/[0.06] pt-10 pl-8 mb-16">
          <p className="font-serif italic text-[clamp(1.5rem,3.5vw,2.8rem)] text-gold leading-[1.2] max-w-[32ch]" style={{ fontFamily: "var(--font-serif)" }}>
            "When the environment is wrong, all the reps in the world won't produce mastery. When it's right, learning becomes inevitable."
          </p>
        </div>

        <div>
          {principles.map((p) => (
            <div key={p.n} className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-16 py-12 border-t border-cream/[0.07] group">
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-gold/50 block mb-2" style={{ fontFamily: "var(--font-mono)" }}>Principle</span>
                <span className="font-serif text-[3rem] text-cream/10 leading-none group-hover:text-gold/25 transition-colors" style={{ fontFamily: "var(--font-serif)" }}>{p.n}</span>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-serif text-[1.5rem] text-cream mb-4 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>{p.title}</h3>
                <p className="text-[14px] text-cream/45 leading-[1.85] max-w-[65ch]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SIGNAL / NOISE ──────────────────────────────────────── */}
      <section className="px-[clamp(1.75rem,6vw,5rem)] py-24 border-b border-cream/[0.06] bg-void">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-10" style={{ fontFamily: "var(--font-mono)" }}>Signal / Noise</p>
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.97] tracking-[-0.02em] text-cream mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              This is where attunement happens.
            </h2>
            <p className="font-serif italic text-[1.2rem] text-cream/45 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
              Most newsletters teach tactics. This one trains perception.
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <p className="font-serif text-[clamp(3.5rem,7vw,6rem)] leading-none text-gold mb-3" style={{ fontFamily: "var(--font-serif)" }}>500+</p>
            <p className="text-[13px] text-cream/35 leading-snug max-w-[30ch]">coaches, creators, and practitioners. Not for information. To stay coupled to signal.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-16 border-t border-cream/[0.06] pt-14">
          <div className="space-y-5 text-[15px] leading-[1.85] text-cream/55">
            <p>Every Sunday I send one essay to practitioners who are done consuming frameworks and ready to operate from a unified lens.</p>
            <p>Each piece takes one concept from ecological dynamics and shows you how it applies to your actual work. Not theory. Not abstraction. The exact perception-action coupling you need to redesign your practice, your content, your offers, your constraints.</p>
            <p>You don't read Signal/Noise to collect information. You read it to attune.</p>
            <div className="pt-4">
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-cream/25 text-cream/70 font-medium px-8 py-4 text-[13px] tracking-[0.06em] uppercase hover:border-gold hover:text-gold transition-colors"
              >
                Join Signal/Noise →
              </a>
              <p className="mt-4 font-mono text-[10px] text-cream/20 tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Free · Weekly · Unsubscribe anytime if it's not signal</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-cream/25 mb-8" style={{ fontFamily: "var(--font-mono)" }}>What develops over time</p>
            <div className="space-y-0">
              {whatDevelops.map((w) => (
                <div key={w.skill} className="py-5 border-b border-cream/[0.06]">
                  <p className="text-[14px] text-cream/75 font-medium mb-1">{w.skill}</p>
                  <p className="text-[13px] text-cream/35 leading-relaxed">{w.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 space-y-0">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-cream/25 mb-5" style={{ fontFamily: "var(--font-mono)" }}>Recent issues</p>
              {recentIssues.map((issue) => (
                <div key={issue.title} className="py-4 border-b border-cream/[0.06] flex items-center justify-between gap-6">
                  <p className="text-[13px] text-cream/50 leading-snug">{issue.title}</p>
                  <span className="font-mono text-[10px] text-cream/20 whitespace-nowrap" style={{ fontFamily: "var(--font-mono)" }}>{issue.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE OFFER ───────────────────────────────────────────── */}
      <section className="px-[clamp(1.75rem,6vw,5rem)] py-24 border-b border-cream/[0.06] bg-surface">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-10" style={{ fontFamily: "var(--font-mono)" }}>The Work</p>
        <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.97] tracking-[-0.02em] text-cream mb-6 max-w-[26ch]" style={{ fontFamily: "var(--font-serif)" }}>
          Install the operating system.<br />Rebuild your practice from it.
        </h2>
        <p className="text-[15px] text-cream/50 leading-[1.85] mb-16 max-w-[65ch]">
          I spent five years integrating ecological psychology, Stoic philosophy, motor learning, complexity science, and creator business models into a single operating system. You can install it in eight hours. Or spend five years doing what I did.
        </p>

        <div className="border border-cream/[0.1] p-10 md:p-14">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-3" style={{ fontFamily: "var(--font-mono)" }}>● Attune Foundations</p>
              <h3 className="font-serif text-[clamp(1.8rem,4vw,3rem)] text-cream leading-[1.0]" style={{ fontFamily: "var(--font-serif)" }}>The complete ecological<br />operating system.</h3>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-serif text-[3.5rem] text-gold leading-none" style={{ fontFamily: "var(--font-serif)" }}>$97</p>
              <p className="font-mono text-[10px] text-cream/25 tracking-[0.15em] uppercase mt-1" style={{ fontFamily: "var(--font-mono)" }}>Self-paced · 8 modules · Lifetime access</p>
            </div>
          </div>

          {/* Entry / Exit state */}
          <div className="grid md:grid-cols-2 gap-0 border-t border-b border-cream/[0.08] mb-12">
            <div className="py-8 md:pr-10 md:border-r border-cream/[0.08]">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/25 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Entry state</p>
              <p className="text-[14px] text-cream/45 leading-[1.8]">I understand ecological dynamics conceptually but can't apply it consistently. I'm consuming frameworks but they don't connect.</p>
            </div>
            <div className="py-8 md:pl-10 border-t md:border-t-0 border-cream/[0.08]">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold mb-3" style={{ fontFamily: "var(--font-mono)" }}>Exit state</p>
              <p className="text-[14px] text-cream/70 leading-[1.8]">I perceive coupling, constraints, and affordances in real time and design from that perception. I operate from one coherent lens across all my work.</p>
            </div>
          </div>

          {/* What's inside */}
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-cream/25 mb-6" style={{ fontFamily: "var(--font-mono)" }}>What's inside</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/[0.06] mb-12">
            {foundationsIncludes.map((inc) => (
              <div key={inc.item} className="bg-surface p-6 hover:bg-void transition-colors">
                <h4 className="text-cream font-medium text-[14px] mb-1.5 leading-snug">{inc.item}</h4>
                <p className="text-[13px] text-cream/35 leading-relaxed">{inc.detail}</p>
              </div>
            ))}
          </div>

          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center gap-3 border border-gold-cta bg-gold-cta text-void font-medium px-10 py-5 text-[13px] tracking-[0.06em] uppercase hover:bg-transparent hover:text-gold-cta transition-colors"
          >
            Get Foundations →
          </a>
        </div>
      </section>

      {/* ── ABOUT SAM ───────────────────────────────────────────── */}
      <section className="px-[clamp(1.75rem,6vw,5rem)] py-24 border-b border-cream/[0.06] bg-void">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-10" style={{ fontFamily: "var(--font-mono)" }}>The Source</p>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,4rem)] leading-[0.97] tracking-[-0.02em] text-cream mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              Sam Elsner
            </h2>
            <div className="space-y-5 text-[15px] leading-[1.85] text-cream/55">
              <p>I'm a 2× NCAA National Champion and 6× All-American discus thrower who spent a decade trying to understand why elite athletes can't transfer their skill to the next level.</p>
              <p>The answer wasn't in biomechanics or technique. It was in ecological dynamics — the science of how organisms couple with their environments. That discovery reorganized everything I thought I knew about performance, creation, and human development.</p>
              <p>I've spent five years integrating Gibson's affordance theory, Bernstein's degrees of freedom problem, Stoic philosophy, and creator business models into one coherent operating system. Signal/Noise and Foundations are what that integration looks like in practice.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {["2× NCAA Champion", "6× All-American", "Ecological Psychologist", "Signal/Noise Author", "Attune Founder"].map((tag) => (
                <span key={tag} className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/60 border border-gold/20 px-3 py-1.5" style={{ fontFamily: "var(--font-mono)" }}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="border-l-4 border-l-gold pl-8">
              <p className="font-serif italic text-[clamp(1.2rem,2.5vw,1.8rem)] text-cream/70 leading-[1.4]" style={{ fontFamily: "var(--font-serif)" }}>
                "Skill is forged, not taught. The environment is the teacher. Perception-action coupling is the mechanism. The practitioner who understands this operates from a different world than the one who doesn't."
              </p>
              <p className="mt-6 font-mono text-[10px] tracking-[0.2em] uppercase text-cream/25" style={{ fontFamily: "var(--font-mono)" }}>— Sam Elsner, Signal/Noise</p>
            </div>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 text-[13px] text-gold/60 hover:text-gold transition-colors tracking-[0.05em] uppercase font-medium">
              Read Signal/Noise →
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────── */}
      <section className="px-[clamp(1.75rem,6vw,5rem)] py-24 border-b border-cream/[0.06] bg-surface">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-10" style={{ fontFamily: "var(--font-mono)" }}>The Choice</p>
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.97] tracking-[-0.02em] text-cream" style={{ fontFamily: "var(--font-serif)" }}>
            Stop training in the wrong environment.
          </h2>
          <div className="flex flex-col justify-end space-y-5 text-[15px] leading-[1.85] text-cream/55">
            <p>This isn't for everyone. It's for the practitioner who knows something is wrong and is ready to find out what.</p>
            <p>If you've been waiting for permission to stop consuming and start operating from a unified lens — this is it.</p>
            <div className="pt-4 flex flex-col sm:flex-row items-start gap-5">
              <a
                href={CHECKOUT_URL}
                className="inline-flex items-center gap-3 border border-gold-cta bg-gold-cta text-void font-medium px-10 py-5 text-[13px] tracking-[0.06em] uppercase hover:bg-transparent hover:text-gold-cta transition-colors"
              >
                Begin with Foundations →
              </a>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-cream/[0.2] text-cream/50 font-medium px-10 py-5 text-[13px] tracking-[0.06em] uppercase hover:border-gold/40 hover:text-gold/60 transition-colors"
              >
                Start with Signal/Noise →
              </a>
            </div>
            <p className="font-mono text-[10px] text-cream/20 tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>$97. Eight modules. Lifetime access. Install it this week and Monday looks different.</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="px-[clamp(1.75rem,6vw,5rem)] py-24 border-b border-cream/[0.06] bg-void">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-10" style={{ fontFamily: "var(--font-mono)" }}>Questions</p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[0.97] tracking-[-0.02em] text-cream mb-16 max-w-[24ch]" style={{ fontFamily: "var(--font-serif)" }}>
          The objections answered before you ask them.
        </h2>
        <div>
          {faqs.map((faq) => (
            <div key={faq.q} className="grid md:grid-cols-[1fr_1.5fr] gap-6 md:gap-16 py-10 border-t border-cream/[0.06]">
              <p className="text-[15px] text-cream/70 font-medium leading-snug">{faq.q}</p>
              <p className="text-[14px] text-cream/45 leading-[1.85]">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="px-[clamp(1.75rem,6vw,5rem)] py-14 border-t border-cream/[0.06]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Attune" width={28} height={28} className="opacity-25" style={{ objectFit: "contain" }} />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/20" style={{ fontFamily: "var(--font-mono)" }}>Attune</span>
          </Link>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.12em] uppercase text-cream/18" style={{ fontFamily: "var(--font-mono)" }}>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cream/45 transition-colors">Signal/Noise</a>
            <a href={CHECKOUT_URL} className="hover:text-cream/45 transition-colors">Foundations</a>
          </div>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-cream/15" style={{ fontFamily: "var(--font-mono)" }}>© 2026 Attune</p>
        </div>
        <div className="border-t border-cream/[0.04] pt-8">
          <p className="font-serif italic text-[1.05rem] text-cream/20 leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
            Yours in rebellion,<br />Sam ~~<br />Signal/Noise
          </p>
        </div>
      </footer>

    </main>
  );
}
```

- [ ] **Step 2: Verify the dev server compiles without errors**

```bash
# Dev server should already be running at port 3008
# Check terminal for any TypeScript/Tailwind errors
```

  Expected: No errors. Page renders at `http://localhost:3008`.

- [ ] **Step 3: Visual spot-check**

  Verify in browser:
  - Background is near-black (`#080806`), not charcoal
  - Hero headline is italic Cormorant Garamond, large
  - Proof bar shows gold numbers on dark surface
  - All CTAs are gold (dark text on gold bg, gold border)
  - No rose/pink anywhere
  - Grain texture visible (subtle)
  - FAQ section exists at bottom before footer
  - About Sam section exists

- [ ] **Step 4: Check mobile at 375px**

  Browser DevTools → 375px width. Verify:
  - No horizontal scroll
  - Hero text doesn't overflow
  - Proof bar stacks to 2×2 grid
  - CTAs don't clip

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: Moses-method homepage — gold palette, proof bar, about section, FAQ, reordered funnel"
```

---

## Task 4: Final Verification + Deploy

- [ ] **Step 1: Full production build check**

```bash
npm run build
```

  Expected: `✓ Compiled successfully`. No TypeScript errors. No missing font warnings.

- [ ] **Step 2: Cross-browser spot-check**

  Open `http://localhost:3008` in Safari and Chrome. Verify:
  - Cormorant Garamond italic renders correctly in both
  - Gold CTA button hover state works (bg disappears, text turns gold)
  - Grain texture doesn't create horizontal scroll

- [ ] **Step 3: Commit package files if changed**

```bash
git status
# If package.json or package-lock.json changed:
git add package.json package-lock.json
git commit -m "chore: update dependencies"
```

- [ ] **Step 4: Push to main (triggers Vercel auto-deploy)**

```bash
git push origin main
```

  Expected: Vercel build succeeds at `attunemastery.com`.

---

## Summary of Changes

| What | Before | After |
|------|--------|-------|
| Background | Charcoal `#2f2f33` | Near-black `#080806` |
| Accent | Fiery Rose `#ff4d73` | Gold `#C8A96E` / `#D4AF37` |
| Text | Pearl `#f5f6f7` | Warm Cream `#F2EDD7` |
| Heading font | Instrument Serif | Cormorant Garamond (italic) |
| Body font | Clash Grotesk | DM Sans |
| CTA style | Solid rose | Gold-border, dark text; hover inverts |
| Hero copy | "You already know..." | "Skill is forged, not taught." |
| Sections | 7 (no proof, no about, no FAQ) | 10 (proof bar, about sam, FAQ added) |
| Funnel order | Editorial → offer | Problem → insight → proof → offer → FAQ |
| Animations | Rose glow breathe | Gold ambient glow (no animation) |
