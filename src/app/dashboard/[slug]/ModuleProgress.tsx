// src/app/dashboard/[slug]/ModuleProgress.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { modules, getNextModule, type Module } from "@/lib/modules";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)" };

interface Props {
  currentSlug: string;
  initialCompleted: string[];
  children: React.ReactNode;
}

export default function ModuleProgress({ currentSlug, initialCompleted, children }: Props) {
  const [completed, setCompleted] = useState<string[]>(initialCompleted);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? el.scrollTop / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isComplete = completed.includes(currentSlug);
  const nextModule: Module | undefined = getNextModule(currentSlug);
  const currentIndex = modules.findIndex((m) => m.slug === currentSlug);

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
    <>
      {/* Reading progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(255,255,255,0.05)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: "100%",
            background: "var(--crimson)",
            width: `${progress * 100}%`,
            transition: "width 0.1s linear",
            opacity: 0.7,
          }}
        />
      </div>

      <div ref={contentRef}>
        {children}

        {/* Module nav */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            marginTop: "3rem",
            paddingTop: "2rem",
          }}
        >
          {error && (
            <p style={{ fontSize: "0.8125rem", color: "#f43f5e", marginBottom: "1rem" }}>
              {error}
            </p>
          )}

          {isComplete ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
              <span style={{ ...mono, fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
                Completed ✓
              </span>
              {nextModule && (
                <Link
                  href={`/dashboard/${nextModule.slug}`}
                  style={{ ...mono, fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  Continue to Module {nextModule.slug} →
                </Link>
              )}
            </div>
          ) : (
            <button
              onClick={handleComplete}
              disabled={marking}
              style={{
                width: "100%",
                background: "var(--crimson)",
                color: "#ffffff",
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.875rem 1.75rem",
                border: "none",
                cursor: marking ? "not-allowed" : "pointer",
                opacity: marking ? 0.5 : 1,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => !marking && (e.currentTarget.style.background = "var(--crimson-bright)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--crimson)")}
            >
              {nextModule
                ? `Mark complete — continue to Module ${nextModule.slug} →`
                : "Mark complete — return to all modules →"}
            </button>
          )}
        </div>

        {/* Module list nav */}
        <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem" }}>
          <p style={{ ...mono, fontSize: "0.575rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "1rem" }}>
            All modules
          </p>
          {modules.map((mod, i) => {
            const done = completed.includes(mod.slug);
            const active = mod.slug === currentSlug;
            return (
              <Link
                key={mod.slug}
                href={`/dashboard/${mod.slug}`}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  padding: "0.75rem 0",
                  borderTop: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  color: "inherit",
                  opacity: active ? 1 : done ? 0.38 : 0.6,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.opacity = done ? "0.38" : "0.6"; }}
              >
                <span style={{ ...mono, fontSize: "0.575rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.28)", flexShrink: 0 }}>
                  {mod.slug}
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: active ? "#ffffff" : done ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.65)",
                    textDecoration: done && !active ? "line-through" : "none",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {mod.title}
                </span>
                {active && (
                  <span style={{ ...mono, fontSize: "0.525rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--crimson)", marginLeft: "auto" }}>
                    Current
                  </span>
                )}
                {done && !active && (
                  <span style={{ ...mono, fontSize: "0.525rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginLeft: "auto" }}>
                    Done ✓
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
