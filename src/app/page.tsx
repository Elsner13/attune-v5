"use client";

import Link from "next/link";
import Image from "next/image";

const SUBSTACK_URL = "https://findthesignal.substack.com/";
const CHECKOUT_URL = "https://buy.stripe.com/3cIcN5fCp1CR0qz2RBefC04";
const COACHING_URL = "https://t.me/samelsner";

/* ── Types ───────────────────────────────────────────────────── */
type Card = {
  tag: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
  closed?: boolean;
};

/* ── Offerings ───────────────────────────────────────────────── */
const cards: Card[] = [
  {
    tag: "Course · $197",
    title: "Foundations",
    description:
      "The operating system for ecological skill acquisition. 8 sessions that permanently rewire how you see training, learning, and performance.",
    cta: "Enroll in Foundations",
    href: CHECKOUT_URL,
    external: true,
  },
  {
    tag: "Newsletter · Free",
    title: "Signal/Noise",
    description:
      "Weekly letters on ecological psychology, skill acquisition, and the philosophy of performance. The signal inside the noise.",
    cta: "Subscribe to Signal/Noise",
    href: SUBSTACK_URL,
    external: true,
  },
  {
    tag: "Private · $500–$888/mo",
    title: "1:1 Coaching",
    description:
      "Work directly with Sam in a private coaching container. Ecological dynamics applied to your specific plateau — sport, business, or creative practice.",
    cta: "Begin the Conversation",
    href: COACHING_URL,
    external: true,
  },
  {
    tag: "Writing · Free",
    title: "Articles",
    description:
      "Essays and frameworks on ecological dynamics, skill acquisition, and perception-action theory. The science behind everything Attune teaches.",
    cta: "Read the Writing",
    href: SUBSTACK_URL,
    external: true,
  },
  {
    tag: "Cohort · Coming Soon",
    title: "Foundations Live",
    description:
      "A live cohort experience with group accountability, weekly sessions, and direct access. Built for practitioners who want to apply the framework in real time.",
    cta: "Currently closed — stay tuned",
    href: "#",
    closed: true,
  },
  {
    tag: "Members · Included",
    title: "Course Access",
    description:
      "Already enrolled? Sign in to access your Foundations modules, track your progress, and continue where you left off.",
    cta: "Go to Dashboard",
    href: "/dashboard",
  },
];

/* ── Page ────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--void)",
        color: "#ffffff",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem clamp(1.25rem,5vw,3rem)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo mark */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Image
            src="/attune-logo.png"
            alt="Attune"
            width={28}
            height={28}
            style={{ filter: "invert(1)", objectFit: "contain", opacity: 0.9 }}
          />
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "1.125rem",
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            Attune
          </span>
        </Link>

        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        >
          Signal/Noise →
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          textAlign: "center",
          padding: "clamp(4rem,10vw,7rem) clamp(1.25rem,5vw,3rem) clamp(3rem,8vw,5rem)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(3rem,10vw,7rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "1.5rem",
          }}
        >
          Attune
        </h1>

        {/* Logo mark centered below title */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", opacity: 0.6 }}>
          <Image
            src="/attune-logo.png"
            alt=""
            aria-hidden="true"
            width={44}
            height={44}
            style={{ filter: "invert(1)", objectFit: "contain" }}
          />
        </div>

        <p
          style={{
            fontSize: "clamp(0.9375rem,1.8vw,1.0625rem)",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.52)",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          Courses, coaching, and writing to develop perception, build skill, and
          operate at your edge.
        </p>
      </section>

      {/* ── CARD GRID ────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "clamp(2.5rem,6vw,4rem) clamp(1.25rem,4vw,2rem) clamp(4rem,10vw,6rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {cards.map((card) => (
            <CardItem key={card.title} card={card} />
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "2rem clamp(1.25rem,5vw,3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.32)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}
        >
          About Sam →
        </a>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.575rem",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          © 2026 Attune. All rights reserved.
        </span>
      </footer>
    </main>
  );
}

/* ── Card component ──────────────────────────────────────────── */
function CardItem({ card }: { card: Card }) {
  const Tag = card.external ? "a" : Link;
  const linkProps = card.external
    ? { href: card.closed ? undefined : card.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: card.href };

  return (
    <div
      style={{
        background: "var(--void)",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(1.5rem,4vw,2.5rem)",
        minHeight: "280px",
      }}
    >
      {/* Tag header — mimics the teal icon block on Jack's site */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          paddingBottom: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.575rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: card.closed ? "rgba(255,255,255,0.22)" : "var(--crimson)",
          }}
        >
          {card.tag}
        </span>
      </div>

      {/* Content */}
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "clamp(1.375rem,2.5vw,1.75rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: card.closed ? "rgba(255,255,255,0.38)" : "#ffffff",
          marginBottom: "0.875rem",
        }}
      >
        {card.title}
      </h3>

      <p
        style={{
          fontSize: "0.9rem",
          lineHeight: 1.72,
          color: card.closed ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.52)",
          flex: 1,
          marginBottom: "1.75rem",
        }}
      >
        {card.description}
      </p>

      {/* CTA Button — mirrors Jack's full-width card button */}
      {card.closed ? (
        <button
          disabled
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "not-allowed",
            textAlign: "center",
          }}
        >
          {card.cta}
        </button>
      ) : (
        // @ts-expect-error — dynamic tag
        <Tag
          {...linkProps}
          style={{
            display: "block",
            width: "100%",
            padding: "0.75rem 1rem",
            background: "#ffffff",
            color: "#000000",
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
            textAlign: "center",
            transition: "background 0.18s, color 0.18s",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.88)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
            e.currentTarget.style.background = "#ffffff";
          }}
        >
          {card.cta}
        </Tag>
      )}
    </div>
  );
}
