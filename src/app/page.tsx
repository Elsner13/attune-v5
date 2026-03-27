"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const CHECKOUT_URL = "https://buy.stripe.com/3cIcN5fCp1CR0qz2RBefC04";
const SUBSTACK_URL = "https://findthesignal.substack.com/";
const COACHING_URL = "https://t.me/samelsner";

/* ─────────────────────────────────────────── DATA ─── */

const stats = [
  { value: "2×", label: "NCAA National Champion" },
  { value: "6×", label: "All-American Honors" },
  { value: "500+", label: "Practitioners trained" },
  { value: "5 yrs", label: "Deep study: Gibson, Bernstein, Davids" },
];

const principles = [
  {
    num: "01",
    title: "Perception precedes action",
    body: "Skill is not stored in the athlete and retrieved on demand. It is the emergent product of an organism interacting with a specific environment on a specific task.",
  },
  {
    num: "02",
    title: "Constraints generate behavior",
    body: "You stop prescribing movement. You design the environment. The solution emerges from the constraint — autonomous, transferable, real.",
  },
  {
    num: "03",
    title: "Affordances, not instructions",
    body: "Athletes don't respond to your cues. They respond to what the environment offers them. Change what the environment affords. Change what they do.",
  },
  {
    num: "04",
    title: "Transfer requires representation",
    body: "Every rep builds skill for the environment it was built in. When practice mirrors performance, the gap between Tuesday and Saturday closes.",
  },
];

const modules = [
  { slug: "01", title: "Why the Reps Aren't Working", time: "~40 min" },
  { slug: "02", title: "The Environment Is the Teacher", time: "~45 min" },
  { slug: "03", title: "Affordances — What Athletes Actually Perceive", time: "~40 min" },
  { slug: "04", title: "Constraints as the Language of Coaching", time: "~50 min" },
  { slug: "05", title: "Designing for Transfer", time: "~45 min" },
  { slug: "06", title: "Repetition Without Repetition", time: "~40 min" },
  { slug: "07", title: "Applying the Framework Across Domains", time: "~45 min" },
  { slug: "08", title: "The Practitioner's Toolkit", time: "~35 min" },
];

const testimonials = [
  {
    quote: "Six weeks after Module 2, my athletes were reading the game differently — fewer cues from me, more autonomous responses from them. I stopped prescribing and started designing environments.",
    name: "Francesco Fonte",
    role: "Performance Coach",
  },
  {
    quote: "Three weeks in, I stopped forcing outcomes and started designing conditions. First month: signed two new partnerships without 'closing' either. The environment was right.",
    name: "Jay Pages",
    role: "Entrepreneur & Athlete",
  },
  {
    quote: "My students felt the difference in their first session. 15 years of coaching — this framework collapsed everything I thought I knew into something that actually works.",
    name: "Head Coach",
    role: "BJJ Academy (Anonymous)",
  },
  {
    quote: "One drill with manipulation constraints instead of prescriptive cues. I was reading the play two steps earlier. Four weeks later, that's my new baseline.",
    name: "NCAA Track Athlete",
    role: "Division I (Anonymous)",
  },
];

const faqs = [
  {
    q: "Who is Foundations for?",
    a: "Coaches, athletes, and creators who are having some success — but something is still off. They've read the books, done the programs, tried everything — and still can't bridge the gap between what they know and what they're producing. If you feel the gap between your practice and your performance, this is for you.",
  },
  {
    q: "I've tried frameworks before. Why is this different?",
    a: "Most frameworks are prescriptive — here's the drill, here's the sequence. Foundations is explanatory. It gives you the model that makes every protocol make sense. When you understand why skill transfers (or doesn't), you can evaluate any drill, any method. You stop needing someone to tell you what to do.",
  },
  {
    q: "Do I need a science background?",
    a: "No. Sam teaches from lived experience, not the lab. The science is there because it explains what practitioners have intuitively known — it gives you language for what you've already felt. You won't memorize research papers.",
  },
  {
    q: "How long until I see results?",
    a: "Module 1 shifts how you see. Module 4 shifts how you design. Most students report measurable differences in their athletes within 4–6 weeks of applying the framework.",
  },
  {
    q: "Is $197 worth it?",
    a: "If this framework changes how you see every session you coach for the rest of your career — and it will, if you apply it — the answer is obvious. If you're not sure, read Signal/Noise first. If that doesn't resonate, this won't either.",
  },
];

/* ─────────────────────────────────── COMPONENTS ─── */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 14px",
        border: "1px solid rgba(225,29,72,0.35)",
        background: "rgba(225,29,72,0.08)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(225,29,72,0.9)",
        borderRadius: "9999px",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--crimson)", flexShrink: 0 }} />
      {children}
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: open ? "#ffffff" : "rgba(255,255,255,0.75)", transition: "color 0.2s", lineHeight: 1.5 }}>
          {q}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: open ? "var(--crimson)" : "rgba(255,255,255,0.3)", flexShrink: 0, transition: "color 0.2s, transform 0.25s", transform: open ? "rotate(45deg)" : "rotate(0deg)", display: "block" }}>
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, paddingBottom: "1.25rem" }}>
          {a}
        </p>
      </div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = el.dataset.delay ?? "0";
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, parseInt(delay));
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => {
      const e = el as HTMLElement;
      e.style.opacity = "0";
      e.style.transform = "translateY(20px)";
      e.style.transition = "opacity 0.65s ease, transform 0.65s ease";
      obs.observe(e);
    });
    return () => obs.disconnect();
  }, []);
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setP(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.05)", zIndex: 200 }}>
      <div style={{ height: "100%", width: `${p * 100}%`, background: "var(--crimson)", transition: "width 0.1s linear", opacity: 0.7 }} />
    </div>
  );
}

/* ─────────────────────────────────────── PAGE ─── */

export default function Home() {
  useReveal();
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "var(--void)", color: "#ffffff", fontFamily: "var(--font-sans)", overflowX: "hidden" }}>
      <ScrollProgress />

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(1.25rem,5vw,3rem)",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navScrolled ? "rgba(0,0,0,0.9)" : "transparent",
          backdropFilter: navScrolled ? "blur(16px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "1.125rem",
            color: "#ffffff",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Attune
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem,3vw,2rem)" }}>
          {[
            { label: "Signal/Noise", href: SUBSTACK_URL, external: true },
            { label: "Coaching", href: COACHING_URL, external: true },
            { label: "Sign In", href: "/sign-in" },
          ].map(({ label, href, external }) =>
            external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                {label}
              </Link>
            )
          )}
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "7px 18px",
              background: "var(--crimson)",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--crimson-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--crimson)")}
          >
            Enroll
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px clamp(1.25rem,5vw,3rem) clamp(5rem,10vw,8rem)",
          overflow: "hidden",
        }}
      >
        {/* Radial glow — Launch UI top-glow pattern */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            maxWidth: "900px",
            height: "60vh",
            background: "radial-gradient(ellipse at top, rgba(225,29,72,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        {/* Subtle grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        <div data-reveal style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          {/* Launch UI badge pattern */}
          <div style={{ marginBottom: "2rem" }}>
            <Badge>Foundations · Attune</Badge>
          </div>

          {/* Headline — Cormorant Garamond display */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(3.5rem,9vw,8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: "clamp(1.5rem,3vw,2.5rem)",
            }}
          >
            Stop training
            <br />
            the pattern.
            <br />
            <span style={{ color: "var(--crimson)" }}>Train the perception.</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "clamp(1rem,2vw,1.175rem)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "520px",
              margin: "0 auto clamp(2rem,4vw,3rem)",
            }}
          >
            You already know the drill isn&apos;t the problem. The problem shows up
            somewhere between the locker room and the field. That gap has a name.
            This is where you learn it.
          </p>

          {/* Dual CTA — Launch UI pattern */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "var(--crimson)",
                color: "#ffffff",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--crimson-bright)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--crimson)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Enroll in Foundations — $197 →
            </a>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "transparent",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.875rem",
                border: "1px solid rgba(255,255,255,0.14)",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              Read Signal/Noise first →
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          data-reveal
          data-delay="600"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{ width: 1, height: "40px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
            Scroll
          </span>
        </div>
      </section>

      {/* ── STATS BAR — Launch UI stats pattern ──────────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "clamp(2.5rem,6vw,4rem) clamp(1.25rem,5vw,3rem)",
        }}
      >
        <div
          data-reveal
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "clamp(1.5rem,3vw,2rem) clamp(1rem,2.5vw,2rem)",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "clamp(2rem,4vw,3.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.5))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.575rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(5rem,12vw,9rem) clamp(1.25rem,5vw,3rem)",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <div data-reveal>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              marginBottom: "2.5rem",
            }}
          >
            The Problem
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(2.5rem,7vw,6rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "0.1em",
            }}
          >
            Every rep builds skill
          </h2>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(2.5rem,7vw,6rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "var(--crimson)",
              marginBottom: "clamp(2rem,4vw,3rem)",
            }}
          >
            for the environment it was built in.
          </h2>
          <p
            style={{
              fontSize: "clamp(0.9375rem,1.8vw,1.0625rem)",
              lineHeight: 1.78,
              color: "rgba(255,255,255,0.48)",
              maxWidth: "500px",
            }}
          >
            The athlete who performs brilliantly in practice and disappears in competition isn&apos;t weak-minded. Their skill emerged in the wrong environment. Of course it doesn&apos;t transfer. It was never built for the environment it needed to operate in.
          </p>
        </div>
      </section>

      {/* ── PRINCIPLES GRID — Launch UI items pattern ────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "clamp(4rem,10vw,7rem) clamp(1.25rem,5vw,3rem)",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "1rem" }}>
              The Framework
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(2rem,4vw,3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Four principles that replace everything you thought you knew about skill.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px",
              background: "rgba(255,255,255,0.07)",
            }}
          >
            {principles.map((p, i) => (
              <div
                key={i}
                data-reveal
                data-delay={`${i * 80}`}
                style={{
                  background: "var(--void)",
                  padding: "clamp(1.5rem,3.5vw,2.5rem)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--void)")}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.575rem",
                    letterSpacing: "0.18em",
                    color: "var(--crimson)",
                    display: "block",
                    marginBottom: "1.25rem",
                  }}
                >
                  {p.num}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "clamp(1.25rem,2.2vw,1.625rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#ffffff",
                    marginBottom: "0.875rem",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(255,255,255,0.48)" }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULE LIST — Launch UI feature section adapted ───── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "clamp(4rem,10vw,7rem) clamp(1.25rem,5vw,3rem)",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,6rem)", alignItems: "start" }}>
          {/* Left: sticky heading */}
          <div data-reveal style={{ position: "sticky", top: "calc(60px + 2rem)" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "1.5rem" }}>
              The Curriculum
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(2rem,3.5vw,3rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#ffffff",
                marginBottom: "1.5rem",
              }}
            >
              8 sessions. A permanent shift in how you see.
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(255,255,255,0.45)", marginBottom: "2rem" }}>
              Work through them in order. Each one builds on the last. Module 1 shifts how you see. Module 4 shifts how you design.
            </p>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "var(--crimson)",
                color: "#ffffff",
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--crimson-bright)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--crimson)")}
            >
              Enroll — $197 →
            </a>
          </div>

          {/* Right: scrolling module list */}
          <div data-reveal data-delay="150">
            {modules.map((mod, i) => (
              <div
                key={mod.slug}
                style={{
                  padding: "1.375rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  borderTop: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1.25rem",
                  transition: "padding-left 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "0.5rem")}
                onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.575rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>
                  {mod.slug}
                </span>
                <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, flex: 1 }}>
                  {mod.title}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>
                  {mod.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — Launch UI masonry/grid pattern ────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "clamp(4rem,10vw,7rem) clamp(1.25rem,5vw,3rem)",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: "clamp(2.5rem,5vw,4rem)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "1rem" }}>
              Results
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(2rem,4vw,3.25rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              What practitioners say.
            </h2>
          </div>

          {/* Masonry-style testimonials */}
          <div
            style={{
              columns: "2",
              columnGap: "1px",
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                data-reveal
                data-delay={`${i * 80}`}
                style={{
                  breakInside: "avoid",
                  marginBottom: "1px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "clamp(1.5rem,3vw,2.25rem)",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <blockquote
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(1rem,1.8vw,1.175rem)",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.75)",
                    marginBottom: "1.25rem",
                    fontWeight: 400,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>{t.name}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.575rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: "2px" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION — Launch UI box/glow pattern ─────────── */}
      <section
        style={{
          padding: "clamp(4rem,10vw,7rem) clamp(1.25rem,5vw,3rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Bottom glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60vw",
            maxWidth: "700px",
            height: "50vh",
            background: "radial-gradient(ellipse at bottom, rgba(225,29,72,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          data-reveal
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Badge>Today&apos;s Investment</Badge>

          <div style={{ margin: "2rem 0 0.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(4rem,10vw,8rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                display: "block",
              }}
            >
              $197
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              one-time · no subscription · lifetime access
            </span>
          </div>

          {/* Includes */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "2.5rem auto",
              maxWidth: "380px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {[
              "8 modules — complete in 4 weeks",
              "The Foundations Workbook (constraint design tool)",
              "Lifetime access + all future updates",
              "Works for coaches, athletes, and creators",
            ].map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "0.875rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.6)",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "var(--crimson)", flexShrink: 0 }}>→</span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "16px 40px",
              background: "#ffffff",
              color: "#000000",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.15s",
              minWidth: "280px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.88)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Begin Foundations →
          </a>

          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.3)",
              fontStyle: "italic",
            }}
          >
            If Module 1 doesn&apos;t shift how you see your training environment, email Sam for a full refund. Same day.
          </p>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "clamp(4rem,10vw,7rem) clamp(1.25rem,5vw,3rem)",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div
            data-reveal
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2.5rem,5vw,5rem)",
              alignItems: "start",
            }}
          >
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "1.5rem" }}>
                Sam Elsner
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "clamp(1.75rem,3vw,2.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  marginBottom: "1.5rem",
                }}
              >
                Every other ecological dynamics teacher came from the lab.
              </h2>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.78, color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem" }}>
                Sam came from the field and won twice before he had a name for any of it. 2× NCAA National Champion discus thrower. 6× All-American. Then 5 years studying the science that explained why it worked.
              </p>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.78, color: "rgba(255,255,255,0.55)" }}>
                Gibson, Bernstein, Davids — not in a lab. Applied to elite throwing, business decision-making, and coaching practice design. The framework travels because skill is always an ecological problem.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.07)" }}>
              {[
                { icon: "2×", label: "NCAA National Champion", sub: "Discus throw" },
                { icon: "6×", label: "All-American Honors", sub: "5 years elite performance" },
                { icon: "5yr", label: "Deep Study", sub: "Gibson, Bernstein, Davids" },
                { icon: "SN", label: "Signal/Noise Newsletter", sub: "500+ practitioners weekly" },
              ].map((cred) => (
                <div
                  key={cred.icon}
                  style={{
                    background: "var(--void)",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontWeight: 600,
                      fontSize: "1.25rem",
                      color: "rgba(255,255,255,0.2)",
                      minWidth: "36px",
                      textAlign: "center",
                    }}
                  >
                    {cred.icon}
                  </span>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{cred.label}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: "2px" }}>
                      {cred.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ — Launch UI accordion pattern ────────────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "clamp(4rem,10vw,7rem) clamp(1.25rem,5vw,3rem)",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: "clamp(2.5rem,5vw,4rem)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "1rem" }}>
              FAQ
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(1.875rem,4vw,3rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Real questions, honest answers.
            </h2>
          </div>

          <div data-reveal data-delay="150">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "clamp(3rem,8vw,5rem) clamp(1.25rem,5vw,3rem)",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          {/* Sign-off */}
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(1.25rem,3.5vw,2.25rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.08)",
              marginBottom: "3rem",
            }}
          >
            The environment is the teacher.
            <br />
            Your job is to attune.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "1.5rem",
            }}
          >
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { label: "Signal/Noise", href: SUBSTACK_URL, external: true },
                { label: "1:1 Coaching", href: COACHING_URL, external: true },
                { label: "X", href: "https://x.com/samelsner", external: true },
                { label: "Instagram", href: "https://instagram.com/sam.elsner", external: true },
              ].map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.28)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
                >
                  {label}
                </a>
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.575rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.15)" }}>
              © 2026 Attune
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
