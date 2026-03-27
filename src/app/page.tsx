"use client";

import Link from "next/link";
import { useEffect } from "react";

const SUBSTACK_URL = "https://findthesignal.substack.com/";
const CHECKOUT_URL = "https://buy.stripe.com/3cIcN5fCp1CR0qz2RBefC04";

/* ── Scroll reveal ───────────────────────────────────────────── */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(28px)";
      (el as HTMLElement).style.transition =
        "opacity 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.16,1,0.3,1)";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

/* ── Data ────────────────────────────────────────────────────── */

const stats = [
  { number: "2×", label: "NCAA Champion" },
  { number: "6×", label: "All-American" },
  { number: "500+", label: "Readers" },
  { number: "5 yrs", label: "Ecological Research" },
];

const recentIssues = [
  {
    title: "The Noise You're Listening To is Shaping Your Becoming",
    date: "Mar 2, 2026",
    url: "https://findthesignal.substack.com/p/the-noise-youre-listening-to",
  },
  {
    title: "The Split",
    date: "Mar 1, 2026",
    url: "https://findthesignal.substack.com/p/the-split",
  },
  {
    title: "Simplicity Comes Last, Not First",
    date: "Feb 25, 2026",
    url: "https://findthesignal.substack.com/p/simplicity-comes-last",
  },
  {
    title: "Repetition Without Repetition",
    date: "Feb 18, 2026",
    url: "https://findthesignal.substack.com/p/repetition-without-repetition",
  },
  {
    title: "The Environment Is the Teacher",
    date: "Feb 11, 2026",
    url: "https://findthesignal.substack.com/p/the-environment-is-the-teacher",
  },
];

/* ── Shared token styles ─────────────────────────────────────── */

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.625rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.3)",
  marginBottom: "2.5rem",
};

const divider: React.CSSProperties = {
  borderTop: "1px solid rgba(255,255,255,0.07)",
};

/* ── Page ────────────────────────────────────────────────────── */

export default function Home() {
  useReveal();

  return (
    <main className="text-white">

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          padding: "1.375rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "760px",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#ffffff",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Attune
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
            }
          >
            Foundations
          </a>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
            }
          >
            Signal/Noise →
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        data-reveal
        style={{
          position: "relative",
          paddingTop: "clamp(8rem, 22vw, 14rem)",
          paddingBottom: "clamp(5rem, 13vw, 9rem)",
          overflow: "hidden",
        }}
      >
        {/* ambient crimson glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "30%",
            left: "-10%",
            width: "65%",
            height: "55%",
            background:
              "radial-gradient(ellipse, rgba(225,29,72,0.07) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />

        <p style={{ ...eyebrow, marginBottom: "2rem" }}>
          Sam Elsner · Ecological Dynamics · Attune
        </p>

        {/* The idea is the hero — not the person */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(3.5rem, 13vw, 9.5rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "0.15em",
          }}
        >
          The environment
        </h1>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(3.5rem, 13vw, 9.5rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.28)",
            marginBottom: "clamp(2rem, 6vw, 3.5rem)",
          }}
        >
          is the teacher.
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.175rem)",
            lineHeight: 1.74,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "500px",
            marginBottom: "2.75rem",
          }}
        >
          2× NCAA National Champion. Ecological psychologist. I write{" "}
          <em style={{ color: "#ffffff", fontStyle: "italic" }}>
            Signal/Noise
          </em>{" "}
          — weekly letters on skill acquisition, ecological dynamics, and why
          everything you were taught about learning is wrong. Join 500+
          practitioners who changed how they see everything.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "var(--crimson)",
              color: "#ffffff",
              fontSize: "0.9375rem",
              fontWeight: 500,
              padding: "0.75rem 1.875rem",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Read Signal/Noise →
          </a>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
            }
          >
            Enroll in Foundations →
          </a>
        </div>
      </section>

      {/* ── PROOF BAR ────────────────────────────────────────── */}
      <section
        data-reveal
        style={{
          ...divider,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "clamp(2.5rem, 7vw, 4rem)",
          paddingBottom: "clamp(2.5rem, 7vw, 4rem)",
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "0.75rem 0",
                paddingLeft: i % 2 !== 0 ? "1.5rem" : "0",
                borderLeft:
                  i % 2 !== 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
              className={i >= 2 ? "mt-6 sm:mt-0" : ""}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
                  color: "#ffffff",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  marginBottom: "0.45rem",
                }}
              >
                {stat.number}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)",
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
        data-reveal
        style={{
          paddingTop: "clamp(7rem, 18vw, 12rem)",
          paddingBottom: "clamp(7rem, 18vw, 12rem)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(2.75rem, 10vw, 8rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.75)",
            marginBottom: "0.08em",
          }}
        >
          Skill is forged,
        </h2>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(2.75rem, 10vw, 8rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "var(--crimson)",
            marginBottom: "clamp(2rem, 5vw, 3rem)",
          }}
        >
          not taught.
        </h2>
        <p
          style={{
            fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.48)",
            maxWidth: "460px",
          }}
        >
          Every coach and educator tells you to practice harder, focus more,
          trust the process. Nobody tells you about the environment. That is the
          problem I have dedicated my life to solving.
        </p>
      </section>

      {/* ── THE WORK ─────────────────────────────────────────── */}
      <section
        data-reveal
        style={{
          ...divider,
          paddingTop: "clamp(4rem, 10vw, 6.5rem)",
          paddingBottom: "clamp(4rem, 10vw, 6.5rem)",
        }}
      >
        <p style={eyebrow}>The Work</p>

        {/* Foundations row */}
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            padding: "1.875rem 0",
            textDecoration: "none",
            color: "inherit",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            transition: "padding-left 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.paddingLeft = "0.5rem")
          }
          onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "0.625rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 500,
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              Foundations
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Course · $97 →
            </span>
          </div>
          <p
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.52)",
              maxWidth: "520px",
            }}
          >
            The operating system for ecological skill acquisition. 8 sessions
            that rewire how you read your environment — applied across coaching,
            business, creativity, and performance.
          </p>
        </a>

        {/* Signal/Noise row */}
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            padding: "1.875rem 0",
            textDecoration: "none",
            color: "inherit",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            transition: "padding-left 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.paddingLeft = "0.5rem")
          }
          onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "0.625rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 500,
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              Signal/Noise
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Newsletter · Free →
            </span>
          </div>
          <p
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.52)",
              maxWidth: "520px",
            }}
          >
            Weekly letters on ecological psychology, skill acquisition, and the
            philosophy of performance. The signal inside the noise. 500+
            practitioners, every Tuesday.
          </p>
        </a>
      </section>

      {/* ── RECENT LETTERS ───────────────────────────────────── */}
      <section
        data-reveal
        style={{
          paddingTop: "clamp(4rem, 10vw, 6.5rem)",
          paddingBottom: "clamp(4rem, 10vw, 6.5rem)",
        }}
      >
        <p style={eyebrow}>Recent Letters</p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {recentIssues.map((issue, i) => (
            <a
              key={i}
              href={issue.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "1.5rem",
                padding: "1.125rem 0",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom:
                  i === recentIssues.length - 1
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "none",
                textDecoration: "none",
                color: "inherit",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget.querySelector(
                  ".issue-title"
                ) as HTMLElement;
                if (t) t.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget.querySelector(
                  ".issue-title"
                ) as HTMLElement;
                if (t) t.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              <span
                className="issue-title"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.65)",
                  transition: "color 0.2s",
                  flex: 1,
                }}
              >
                {issue.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.22)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {issue.date}
              </span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: "1.75rem" }}>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.32)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.32)")
            }
          >
            View all issues →
          </a>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section
        data-reveal
        style={{
          ...divider,
          paddingTop: "clamp(4rem, 10vw, 6.5rem)",
          paddingBottom: "clamp(4rem, 10vw, 6.5rem)",
        }}
      >
        <p style={eyebrow}>Sam Elsner</p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.35rem",
            marginBottom: "2.25rem",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              lineHeight: 1.76,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            I won two national championships by doing what I was told. Specific
            drills. Isolated repetitions. Pattern memorization. Then I found
            ecological psychology and realized I had been training in the wrong
            environment for years.
          </p>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              lineHeight: 1.76,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            I built Attune for the coaches, creators, and performers who feel
            it — something is wrong with how we train and how we build.
            Gibson&apos;s ecological psychology, Bernstein&apos;s movement
            science, and Stoic philosophy all pointed to the same truth: the
            environment shapes everything. That is what I teach.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "var(--crimson)",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.625rem 1.5rem",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Read Signal/Noise →
          </a>
          <a
            href="https://x.com/samelsner"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.38)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.38)")
            }
          >
            X / Twitter →
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        style={{
          ...divider,
          paddingTop: "clamp(4rem, 10vw, 6rem)",
          paddingBottom: "clamp(3rem, 8vw, 5rem)",
        }}
      >
        {/* closing statement */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(1.375rem, 4vw, 2.625rem)",
            color: "rgba(255,255,255,0.08)",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
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
            gap: "1.75rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Signal/Noise", href: SUBSTACK_URL },
            { label: "Foundations", href: CHECKOUT_URL },
            { label: "X", href: "https://x.com/samelsner" },
            {
              label: "Instagram",
              href: "https://instagram.com/sam.elsner",
            },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.28)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.65)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.28)")
              }
            >
              {label}
            </a>
          ))}
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.15)",
              fontFamily: "var(--font-mono)",
            }}
          >
            © 2026 Attune
          </span>
        </div>
      </footer>
    </main>
  );
}
