// src/app/dashboard/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { modules } from "@/lib/modules";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)" };

export default function Dashboard() {
  const { user } = useUser();
  const completed =
    (user?.publicMetadata?.completedModules as string[] | undefined) ?? [];

  // Reload Clerk user on mount so returning from a module shows fresh progress
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { user?.reload().catch(() => {}); }, []);

  // Trigger welcome email on first dashboard visit (idempotent — server checks metadata)
  React.useEffect(() => {
    if (!user) return;
    if (user.publicMetadata?.welcomeEmailSent) return;
    fetch("/api/send-welcome", { method: "POST" }).catch(() => {});
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextMod = modules.find((m) => !completed.includes(m.slug));

  const headline =
    completed.length === 0
      ? "You know the problem. Now install the lens."
      : completed.length === modules.length
      ? "Operating system installed."
      : `${modules.length - completed.length} sessions left. Stay in the stream.`;

  return (
    <main
      className="text-white min-h-screen"
      style={{ maxWidth: "760px", margin: "0 auto", padding: "clamp(2rem,6vw,4rem) 1.5rem clamp(4rem,10vw,6rem)" }}
    >

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "clamp(3.5rem,9vw,6rem)",
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
            opacity: 0.7,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
        >
          Attune
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <span
            style={{ ...mono, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}
          >
            Foundations
          </span>
          <UserButton appearance={{ elements: { avatarBox: { width: 28, height: 28 } } }} />
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: "clamp(3rem,8vw,5rem)" }}>
        <p
          style={{ ...mono, fontSize: "0.625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.5rem" }}
        >
          {user?.firstName ? `Welcome back, ${user.firstName}` : "Welcome back"}
          <span style={{ margin: "0 0.75rem", color: "rgba(255,255,255,0.15)" }}>·</span>
          {completed.length} of {modules.length} complete
        </p>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(2.25rem,6vw,4.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            color: "#ffffff",
            marginBottom: "1.5rem",
          }}
        >
          {headline}
        </h1>

        {nextMod && (
          <Link
            href={`/dashboard/${nextMod.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--crimson)",
              color: "#ffffff",
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "0.75rem 1.75rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--crimson-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--crimson)")}
          >
            Continue → Module {nextMod.slug}
          </Link>
        )}
      </section>

      {/* ── MODULE LIST ──────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <p
          style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", padding: "1.25rem 0" }}
        >
          Curriculum
        </p>

        {modules.map((mod) => {
          const done = completed.includes(mod.slug);
          return (
            <Link
              key={mod.slug}
              href={`/dashboard/${mod.slug}`}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "1.5rem",
                padding: "1.25rem 0",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                textDecoration: "none",
                color: "inherit",
                transition: "padding-left 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "0.375rem")}
              onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem", flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    ...mono,
                    fontSize: "0.625rem",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.22)",
                    flexShrink: 0,
                  }}
                >
                  {mod.slug}
                </span>
                <span
                  style={{
                    fontSize: "0.9375rem",
                    color: done ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.75)",
                    textDecoration: done ? "line-through" : "none",
                    transition: "color 0.2s",
                    lineHeight: 1.4,
                  }}
                >
                  {mod.title}
                </span>
              </div>
              <span
                style={{
                  ...mono,
                  fontSize: "0.575rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: done ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)",
                  flexShrink: 0,
                }}
              >
                {done ? "Done ✓" : mod.duration}
              </span>
            </Link>
          );
        })}
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          marginTop: "clamp(4rem,10vw,6rem)",
          paddingTop: "2rem",
        }}
      >
        <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.5rem" }}>
          Questions?{" "}
          <a
            href="https://t.me/+16128453855"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.75)", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            Message Sam on Telegram
          </a>
        </p>
        <p style={{ ...mono, fontSize: "0.625rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.18)" }}>
          © 2026 Attune
        </p>
      </footer>

    </main>
  );
}
