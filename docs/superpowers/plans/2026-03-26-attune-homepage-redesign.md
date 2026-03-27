# Attune Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing homepage with a modern minimalist SaaS design featuring a fixed animated topographic terrain background and 10 glass-panel sections scrolling over it.

**Architecture:** `TerrainCanvas.tsx` renders a fixed HTML5 Canvas animation at z-index 0. `page.tsx` is a full rewrite — all 10 homepage sections in one file using a top-level `<div>` (not `<main>`) to avoid the global `max-width: 760px` rule in globals.css. Sections use `glass-section` and `glass-card` CSS classes added to globals.css for the 25% opacity + blur treatment.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, HTML5 Canvas API, Clerk (existing)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/TerrainCanvas.tsx` | **Create** | Animated terrain canvas, `position: fixed`, z-index 0 |
| `src/app/globals.css` | **Modify** | Add `.glass-section`, `.glass-card`, new keyframe animations |
| `src/app/page.tsx` | **Rewrite** | Full homepage: all 10 sections composing TerrainCanvas |

`src/app/layout.tsx` — no changes needed. It is clean (ClerkProvider + fonts only, no conflicting nav).

---

### Task 1: Create TerrainCanvas component

**Files:**
- Create: `src/components/TerrainCanvas.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useEffect, useRef } from 'react';

const NUM_LINES = 90;
const SPEED = 0.00014;

const WAVES = [
  { f: 1.6, a: 0.26, p: 0.0 },
  { f: 3.1, a: 0.14, p: 1.3 },
  { f: 0.8, a: 0.20, p: 2.7 },
  { f: 5.8, a: 0.06, p: 0.5 },
  { f: 2.4, a: 0.10, p: 3.9 },
  { f: 7.2, a: 0.04, p: 1.6 },
  { f: 0.4, a: 0.18, p: 4.2 },
];

function envelope(t: number): number {
  return (
    Math.exp(-Math.pow((t - 0.40) * 3.0, 2)) +
    Math.exp(-Math.pow((t - 0.58) * 4.5, 2)) * 0.55
  );
}

function lineAlpha(t: number): number {
  const env = envelope(t);
  return Math.min(
    (0.07 + env * 0.52) * Math.min(t * 10, 1) * Math.min((1 - t) * 6, 1),
    0.78,
  );
}

function calcDisp(nx: number, t: number, T: number): number {
  let d = 0;
  for (const w of WAVES) {
    d += Math.sin(nx * w.f * Math.PI * 2 + w.p + t * 3.8 + T * (1 + w.f * 0.12)) * w.a;
  }
  return d;
}

export default function TerrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, DPR = 1;
    let rafId: number;
    let t0: number | null = null;

    function resize() {
      DPR = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      // Reset transform before re-scaling to avoid compound scaling on each resize
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw(ts: number) {
      if (!t0) t0 = ts;
      const T = ((ts - t0) / 1000) * SPEED * 1000;

      ctx.clearRect(0, 0, W, H);

      // Draw bottom-to-top so peak lines (brighter) render on top of valley lines
      for (let i = NUM_LINES - 1; i >= 0; i--) {
        const t = i / (NUM_LINES - 1);
        const env = envelope(t);
        const dispScale = H * (0.055 + env * 0.35);
        const alpha = lineAlpha(t);
        const crimsonStrength = Math.max(0, env - 0.72) * 3.5;

        if (crimsonStrength > 0) {
          const r = 225 + Math.round(30 * crimsonStrength);
          const g = Math.round(29 * (1 - crimsonStrength));
          const b = Math.round(72 * (1 - crimsonStrength * 0.6));
          ctx.strokeStyle = `rgba(${r},${g},${b},${Math.min(alpha * 1.5, 0.9)})`;
        } else {
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        }
        ctx.lineWidth = 0.35 + env * 0.75;
        ctx.beginPath();

        const steps = Math.ceil(W / 3);
        for (let s = 0; s <= steps; s++) {
          const nx = s / steps;
          const cx = Math.abs(nx - 0.5) * 2;
          const mtn = env * Math.exp(-cx * cx * 2.2) * H * 0.16;
          const y = t * H - calcDisp(nx, t, T) * dispScale - mtn;
          if (s === 0) ctx.moveTo(nx * W, y);
          else ctx.lineTo(nx * W, y);
        }
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/samelsner/Desktop/attune/attune-website-v4
npx tsc --noEmit
```

Expected: no errors related to `TerrainCanvas.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/components/TerrainCanvas.tsx
git commit -m "feat: add TerrainCanvas animated topographic terrain background"
```

---

### Task 2: Update globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add glass utility classes and new keyframes**

Add the following to the end of `src/app/globals.css`:

```css
/* ── Homepage glass panels ─────────────────────────────── */
/* Terrain stays visible through all sections at 25% opacity */
.glass-section {
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.glass-card {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 14px;
  transition: border-color 0.3s;
}

.glass-card:hover {
  border-color: rgba(225, 29, 72, 0.30);
}

/* ── Homepage animations ────────────────────────────────── */
@keyframes badgePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.8); }
}

@keyframes scrollBobble {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}
```

- [ ] **Step 2: Verify dev server still compiles**

```bash
cd /Users/samelsner/Desktop/attune/attune-website-v4
npm run dev -- --port 3006
```

Expected: server starts, no CSS errors in terminal

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add glass-section, glass-card utilities and homepage animations to globals.css"
```

---

### Task 3: Rewrite page.tsx — full homepage

**Files:**
- Rewrite: `src/app/page.tsx`

Note: The page uses a top-level `<div>` (not `<main>`) to avoid the `main { max-width: 760px }` rule in globals.css. TerrainCanvas renders fixed at z-index 0; all content is z-index 2.

- [ ] **Step 1: Replace the full contents of `src/app/page.tsx`**

```tsx
'use client';

import TerrainCanvas from '@/components/TerrainCanvas';

const CHECKOUT_URL = 'https://buy.stripe.com/3cIcN5fCp1CR0qz2RBefC04';
const SUBSTACK_URL = 'https://findthesignal.substack.com/';

// ── Shared style tokens ───────────────────────────────────
const S = {
  eyebrow: {
    fontSize: '10px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: '#E11D48',
    marginBottom: '14px',
  },
  sectionHeader: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  h2: {
    fontSize: 'clamp(28px, 3.5vw, 36px)',
    fontWeight: 300,
    letterSpacing: '-0.025em',
    marginBottom: '12px',
    fontFamily: 'var(--font-serif)',
  },
  subText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.48)',
    maxWidth: '400px',
    margin: '0 auto',
    lineHeight: 1.65,
  },
  sectionInner: {
    maxWidth: '920px',
    margin: '0 auto',
    padding: '88px 52px',
  },
};

export default function HomePage() {
  return (
    <div style={{ position: 'relative', background: '#000', minHeight: '100vh' }}>

      {/* ── FIXED TERRAIN BACKGROUND ── */}
      <TerrainCanvas />

      {/* ── SCROLLABLE CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ①  NAVBAR */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 52px',
          background: 'rgba(0,0,0,0.52)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '15px', fontWeight: 500, letterSpacing: '0.05em' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', color: 'rgba(255,255,255,0.7)',
            }}>◎</div>
            Attune
          </div>
          <ul style={{ display: 'flex', gap: '28px', listStyle: 'none', margin: 0, padding: 0 }}>
            {['Signal', 'How It Works', 'Testimonials', 'Pricing', 'FAQ'].map((item) => (
              <li key={item} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em', cursor: 'pointer' }}>
                {item}
              </li>
            ))}
          </ul>
          <a
            href={CHECKOUT_URL}
            style={{
              background: '#E11D48', color: 'white',
              fontSize: '12px', padding: '9px 20px',
              borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontWeight: 500, textDecoration: 'none', letterSpacing: '0.03em',
            }}
          >
            Get Foundations →
          </a>
        </nav>

        {/* ②  HERO */}
        <section style={{
          minHeight: '92vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '80px 52px 100px',
          position: 'relative',
        }}>
          {/* Radial scrim — keeps terrain visible at edges but text readable at center */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 65% 60% at 50% 48%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.30) 55%, transparent 100%)',
          }} />

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(225,29,72,0.12)', border: '1px solid rgba(225,29,72,0.3)',
            borderRadius: '100px', padding: '5px 14px 5px 9px',
            fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em',
            marginBottom: '32px', position: 'relative',
          }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%', background: '#E11D48',
              animation: 'badgePulse 2.2s ease-in-out infinite',
              display: 'inline-block',
            }} />
            500+ readers building in alignment
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(40px, 5.5vw, 66px)', fontWeight: 300,
            lineHeight: 1.09, letterSpacing: '-0.04em',
            maxWidth: '680px', marginBottom: '20px',
            fontFamily: 'var(--font-serif)',
            textShadow: '0 2px 48px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6)',
            position: 'relative',
          }}>
            The operating system<br />
            for <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.42)' }}>real work.</em>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65,
            maxWidth: '420px', marginBottom: '36px',
            textShadow: '0 1px 24px rgba(0,0,0,0.95)',
            position: 'relative',
          }}>
            Stop performing for the wrong environment. Attune is the system for people who want to do their best work — not look like they are.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
            <a
              href={CHECKOUT_URL}
              style={{
                background: '#E11D48', color: 'white', fontSize: '13px',
                padding: '12px 26px', borderRadius: '9px', border: 'none',
                cursor: 'pointer', fontWeight: 500, textDecoration: 'none',
                boxShadow: '0 4px 28px rgba(225,29,72,0.4)',
              }}
            >
              Get Foundations →
            </a>
            <a
              href={SUBSTACK_URL}
              style={{
                background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.7)',
                fontSize: '13px', padding: '12px 26px', borderRadius: '9px',
                border: '1px solid rgba(255,255,255,0.18)', cursor: 'pointer',
                backdropFilter: 'blur(8px)', textDecoration: 'none',
              }}
            >
              Read Signal (Free)
            </a>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            animation: 'scrollBobble 3s ease-in-out infinite',
          }}>
            <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(225,29,72,0.7), transparent)' }} />
            Scroll
          </div>
        </section>

        {/* ③  SOCIAL PROOF BAR */}
        <div className="glass-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', padding: '26px 52px', gap: 0 }}>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '24px', whiteSpace: 'nowrap' }}>
            Built by a
          </span>
          {['2× NCAA Champion', '6× All-American', '5 Yrs Ecological Research', '500+ Readers'].map((item, i, arr) => (
            <span key={item} style={{
              fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.28)',
              letterSpacing: '0.04em', padding: '0 20px',
              borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              {item}
            </span>
          ))}
        </div>

        {/* ④  BENEFITS BENTO */}
        <div className="glass-section">
          <div style={S.sectionInner}>
            <div style={S.sectionHeader}>
              <p style={S.eyebrow}>Benefits</p>
              <h2 style={S.h2}>Not more habits.<br />A better environment.</h2>
              <p style={S.subText}>Your environment shapes your output more than your willpower ever will.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {/* Tall card — spans 2 rows */}
              <div className="glass-card" style={{ gridRow: 'span 2', padding: '28px 24px' }}>
                <span style={{ fontSize: '20px', marginBottom: '16px', display: 'block' }}>🎯</span>
                <h3 style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '-0.01em', marginBottom: '10px' }}>Alignment Over Effort</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
                  Stop pushing harder in the wrong direction. Orient first, then move. The reps that don&apos;t work aren&apos;t the problem — the environment is.
                </p>
                <div style={{ fontSize: '44px', fontWeight: 300, color: '#E11D48', letterSpacing: '-0.04em', marginTop: '20px', lineHeight: 1 }}>
                  2×
                  <small style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', marginTop: '4px' }}>output, same hours</small>
                </div>
              </div>
              <div className="glass-card" style={{ padding: '28px 24px' }}>
                <span style={{ fontSize: '20px', marginBottom: '16px', display: 'block' }}>🌊</span>
                <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '10px' }}>Signal Over Noise</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>Filter the inputs shaping your thinking. Weekly newsletter. Zero fluff.</p>
              </div>
              <div className="glass-card" style={{ padding: '28px 24px' }}>
                <span style={{ fontSize: '20px', marginBottom: '16px', display: 'block' }}>🏗️</span>
                <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '10px' }}>Systems That Stick</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>Not another productivity hack. A complete identity-level operating system.</p>
              </div>
              {/* Wide card — spans 2 cols */}
              <div className="glass-card" style={{ gridColumn: 'span 2', padding: '28px 24px' }}>
                <span style={{ fontSize: '20px', marginBottom: '16px', display: 'block' }}>⚡</span>
                <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '10px' }}>Built for High Performers Who Feel Off</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
                  You&apos;re not behind. You&apos;re in the wrong environment. Foundations gives you the framework to rebuild from the inside out — so your outer results match your real capacity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ⑤  HOW IT WORKS */}
        <div className="glass-section">
          <div style={S.sectionInner}>
            <div style={S.sectionHeader}>
              <p style={S.eyebrow}>How It Works</p>
              <h2 style={S.h2}>Three steps to aligned performance</h2>
              <p style={S.subText}>Simple entry. Deep system. Lasting change.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { num: 'Step 01', title: 'Subscribe to Signal', body: 'Free weekly newsletter. One idea that matters. Cut through the noise — free forever.', arrow: true },
                { num: 'Step 02', title: 'Join Foundations', body: '8-module course. Build your aligned operating system. Go at your own pace.', arrow: true },
                { num: 'Step 03', title: 'Do the Real Work', body: 'Apply the system. Watch your output shift. Not because you grinded harder — because you aligned.', arrow: false },
              ].map((step) => (
                <div key={step.num} className="glass-card" style={{ padding: '30px 24px', position: 'relative' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E11D48', marginBottom: '16px', fontWeight: 500 }}>{step.num}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '-0.01em', marginBottom: '10px' }}>{step.title}</h3>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{step.body}</p>
                  {step.arrow && (
                    <span style={{ position: 'absolute', right: '-18px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: 'rgba(225,29,72,0.55)', zIndex: 2 }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ⑥  PRICING */}
        <div className="glass-section">
          <div style={S.sectionInner}>
            <div style={S.sectionHeader}>
              <p style={S.eyebrow}>Pricing</p>
              <h2 style={S.h2}>Simple, honest pricing</h2>
              <p style={S.subText}>Start free. Go deeper when you&apos;re ready.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>

              {/* Free tier */}
              <div className="glass-card" style={{ padding: '30px 26px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: '12px' }}>Signal</div>
                <div style={{ fontSize: '42px', fontWeight: 300, letterSpacing: '-0.04em', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '2px' }}>
                  <sup style={{ fontSize: '18px', marginTop: '8px', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>$</sup>0
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.32)', marginBottom: '22px' }}>Free forever</div>
                <a href={SUBSTACK_URL} style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginBottom: '22px', background: 'transparent', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.14)', textDecoration: 'none' }}>
                  Subscribe Free
                </a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Weekly newsletter', 'One high-signal idea per issue', 'Archive access'].map(f => (
                    <li key={f} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', display: 'flex', gap: '9px' }}>
                      <span style={{ color: '#E11D48', fontSize: '11px', flexShrink: 0, marginTop: '1px' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured tier */}
              <div className="glass-card" style={{ padding: '30px 26px', display: 'flex', flexDirection: 'column', position: 'relative', background: 'rgba(225,29,72,0.10)', borderColor: 'rgba(225,29,72,0.42)' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#E11D48', color: 'white', fontSize: '9px', padding: '3px 14px', borderRadius: '100px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>Most Popular</div>
                <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: '12px' }}>Foundations</div>
                <div style={{ fontSize: '42px', fontWeight: 300, letterSpacing: '-0.04em', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '2px' }}>
                  <sup style={{ fontSize: '18px', marginTop: '8px', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>$</sup>197
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.32)', marginBottom: '22px' }}>One-time · lifetime access</div>
                <a href={CHECKOUT_URL} style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginBottom: '22px', background: '#E11D48', color: 'white', border: 'none', textDecoration: 'none' }}>
                  Get Foundations →
                </a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Everything in Signal', '8-module course', 'Identity-level framework', 'Environment design playbook', 'Lifetime updates', 'Private community access'].map(f => (
                    <li key={f} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', display: 'flex', gap: '9px' }}>
                      <span style={{ color: '#E11D48', fontSize: '11px', flexShrink: 0, marginTop: '1px' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coaching tier */}
              <div className="glass-card" style={{ padding: '30px 26px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: '12px' }}>Coaching</div>
                <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '4px' }}>Coming<br />Soon</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.32)', marginBottom: '22px' }}>1:1 with Sam</div>
                <button style={{ display: 'block', width: '100%', textAlign: 'center', padding: '11px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginBottom: '22px', background: 'transparent', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.14)' }}>
                  Join Waitlist
                </button>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Everything in Foundations', 'Direct access to Sam', 'Custom environment audit'].map(f => (
                    <li key={f} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', display: 'flex', gap: '9px' }}>
                      <span style={{ color: '#E11D48', fontSize: '11px', flexShrink: 0, marginTop: '1px' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* ⑦  TESTIMONIALS */}
        <div className="glass-section">
          <div style={S.sectionInner}>
            <div style={S.sectionHeader}>
              <p style={S.eyebrow}>Testimonials</p>
              <h2 style={S.h2}>Loved by people doing real work</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { quote: '"Signal is the one newsletter I actually read. Sam cuts through noise I didn\'t even know was there."', name: 'Jordan M.', role: 'Founder & athlete', featured: false },
                { quote: '"Foundations reframed how I think about performance. Not hustle — alignment. Module 3 alone was worth it."', name: 'Alex R.', role: 'Graduate student', featured: true },
                { quote: '"I\'ve read a lot of productivity content. This is different. Sam writes from lived experience. You feel it."', name: 'Casey T.', role: 'Coach & entrepreneur', featured: false },
              ].map((t) => (
                <div key={t.name} className="glass-card" style={{ padding: '24px', borderColor: t.featured ? 'rgba(225,29,72,0.25)' : undefined }}>
                  <div style={{ color: '#E11D48', fontSize: '12px', letterSpacing: '3px', marginBottom: '14px' }}>★★★★★</div>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.7, marginBottom: '18px' }}>{t.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(225,29,72,0.15)', border: '1px solid rgba(225,29,72,0.25)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 500 }}>{t.name}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.32)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ⑧  FAQ */}
        <div className="glass-section">
          <div style={S.sectionInner}>
            <div style={S.sectionHeader}>
              <p style={S.eyebrow}>FAQ</p>
              <h2 style={S.h2}>Frequently Asked Questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '640px', margin: '0 auto' }}>
              {[
                'What exactly is Foundations?',
                'How long does the course take to complete?',
                'Is there a refund policy?',
                'How is Attune different from other productivity courses?',
                'Do I need Signal to buy Foundations?',
              ].map((q) => (
                <div key={q} className="glass-card" style={{ padding: '17px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '9px' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.82)' }}>{q}</span>
                  <span style={{ fontSize: '18px', color: 'rgba(225,29,72,0.7)' }}>+</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ⑨  FINAL CTA */}
        <div className="glass-section">
          <div style={{ maxWidth: '920px', margin: '0 auto', padding: '96px 52px', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', width: '560px', height: '260px', background: 'radial-gradient(ellipse, rgba(225,29,72,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <h2 style={{ ...S.h2, fontSize: 'clamp(32px, 4vw, 42px)', marginBottom: '14px', position: 'relative', zIndex: 2, textShadow: '0 2px 40px rgba(0,0,0,0.8)' }}>
              You&apos;re not behind.<br />You&apos;re in the wrong environment.
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.52)', marginBottom: '32px', position: 'relative', zIndex: 2 }}>
              Join 500+ readers choosing signal over noise.
            </p>
            <a
              href={CHECKOUT_URL}
              style={{
                display: 'inline-block', background: '#E11D48', color: 'white',
                fontSize: '14px', padding: '14px 38px', borderRadius: '10px',
                border: 'none', cursor: 'pointer', fontWeight: 500, letterSpacing: '0.02em',
                boxShadow: '0 8px 40px rgba(225,29,72,0.4)', textDecoration: 'none',
                position: 'relative', zIndex: 2,
              }}
            >
              Get Foundations — $197 →
            </a>
          </div>
        </div>

        {/* ⑩  FOOTER */}
        <div className="glass-section">
          <div style={{ maxWidth: '920px', margin: '0 auto', padding: '52px 52px 0', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px' }}>

            {/* Brand col */}
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>◎ Attune</div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.65, maxWidth: '200px', marginBottom: '20px' }}>
                Signal over noise. Built for people doing real work in alignment with who they are.
              </p>
              <form style={{ display: 'flex', gap: '6px' }} onSubmit={(e) => { e.preventDefault(); window.location.href = SUBSTACK_URL; }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px', padding: '8px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.6)', outline: 'none', flex: 1 }}
                />
                <button type="submit" style={{ background: '#E11D48', color: 'white', border: 'none', borderRadius: '7px', padding: '8px 12px', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Subscribe →
                </button>
              </form>
            </div>

            {/* Link cols */}
            {[
              { title: 'Product', links: ['Signal Newsletter', 'Foundations', 'Pricing', 'Dashboard'] },
              { title: 'Company', links: ['About Sam', 'Writing', 'Contact'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Refund Policy'] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.24)', marginBottom: '16px' }}>{col.title}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {col.links.map(link => (
                    <li key={link} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', cursor: 'pointer' }}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer bottom */}
          <div style={{ maxWidth: '920px', margin: '0 auto', padding: '24px 52px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '48px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)' }}>© 2026 Attune. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['𝕏', 'in', '▶'].map(icon => (
                <div key={icon} style={{ width: '30px', height: '30px', borderRadius: '7px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.38)', cursor: 'pointer' }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>{/* end scrollable content */}
    </div>
  );
}
```

- [ ] **Step 2: Verify the dev server loads the page without errors**

```bash
cd /Users/samelsner/Desktop/attune/attune-website-v4
npm run dev -- --port 3006
```

Open `http://localhost:3006` in a browser. Expected:
- Terrain animation visible and flowing
- All 10 sections render
- No console errors
- Terrain visible through all sections while scrolling

- [ ] **Step 3: Fix any TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: 0 errors. If errors appear, fix them before committing.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: redesign homepage with terrain background and SaaS layout"
```

---

### Task 4: Visual QA pass

**Files:** No code changes — verification only

- [ ] **Step 1: Check all 10 sections render correctly at localhost:3006**

Scroll through the full page and verify:
- [ ] Navbar is sticky at top while scrolling
- [ ] Hero: terrain visible through edges, headline text crisp
- [ ] Social proof bar renders inline
- [ ] Benefits bento: 3-col grid with tall card on left, wide card on bottom-right
- [ ] How It Works: 3 cards with arrows between them
- [ ] Pricing: middle card has "Most Popular" tag + crimson tint
- [ ] Testimonials: 3 cards, center one has crimson border
- [ ] FAQ: 5 items with + icons
- [ ] Final CTA: crimson glow behind block
- [ ] Footer: 4-col grid + bottom bar

- [ ] **Step 2: Verify terrain shows through all sections**

Scroll slowly. At every point on the page the animated terrain lines should be visible through the 25% opacity glass sections.

- [ ] **Step 3: Check "Get Foundations" links go to Stripe**

Click both the navbar CTA and the hero + final CTA buttons. All should navigate to `https://buy.stripe.com/3cIcN5fCp1CR0qz2RBefC04`.

- [ ] **Step 4: Check "Read Signal" link goes to Substack**

Click "Read Signal (Free)" in the hero. Should navigate to `https://findthesignal.substack.com/`.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: attune homepage redesign complete — terrain background + SaaS layout"
```
