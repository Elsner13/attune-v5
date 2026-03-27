"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { SignIn } from "@clerk/nextjs";
import { SparklesCore } from "@/components/ui/sparkles";

const CHECKOUT_URL = "https://buy.stripe.com/3cIcN5fCp1CR0qz2RBefC04";

const reminders = [
  { n: "01", text: "Perception precedes action." },
  { n: "02", text: "Constraints generate behavior." },
  { n: "03", text: "The stream is where skill emerges." },
];

/* ── Glow Panel ──────────────────────────────────────────────── */

function GlowPanel({
  children,
  className,
  glowSize = 500,
  glowOpacity = 0.035,
}: {
  children: React.ReactNode;
  className?: string;
  glowSize?: number;
  glowOpacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false });

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
      }}
      onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(${glowSize}px circle at ${glow.x}px ${glow.y}px, rgba(255,255,255,${glowOpacity}) 0%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ── Left Panel ──────────────────────────────────────────────── */

function LeftPanel() {
  return (
    <GlowPanel
      className="hidden lg:flex flex-col flex-1 relative border-r border-white/[0.06] overflow-hidden bg-[#0D0D0C]"
      glowSize={700}
      glowOpacity={0.03}
    >
      <div className="relative z-10 flex flex-col h-full px-16 py-16">
        {/* Logo */}
        <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity w-fit">
          <Image
            src="/attune-logo.png"
            alt="Attune"
            width={38}
            height={38}
            style={{ filter: "invert(1)", objectFit: "contain" }}
          />
        </Link>

        {/* Center */}
        <div className="flex-1 flex flex-col justify-center max-w-[26rem]">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-10"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ● Returning member
          </p>
          <h1
            className="text-[clamp(2.8rem,4vw,4.8rem)] leading-[0.92] tracking-[-0.02em] text-white mb-8"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            The lens is{" "}
            <em style={{ color: "rgba(255,255,255,0.28)", fontStyle: "italic" }}>
              installed.
            </em>
          </h1>
          <p className="text-[15px] text-white/45 leading-[1.85] mb-16 max-w-[38ch]">
            Pick up where you left off. The operating system compounds — every session builds on the last.
          </p>

          <div className="border-t border-white/[0.06] pt-10 space-y-7">
            {reminders.map((item) => (
              <div key={item.n} className="flex items-start gap-6">
                <span
                  className="text-[11px] text-white/20 mt-0.5 shrink-0 tabular-nums"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.n}
                </span>
                <p className="text-[14px] text-white/45 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-8">
          <p className="text-[12px] text-white/25">
            New here?{" "}
            <a
              href={CHECKOUT_URL}
              className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors"
            >
              Get Foundations →
            </a>
          </p>
        </div>
      </div>
    </GlowPanel>
  );
}

/* ── Right Panel ─────────────────────────────────────────────── */

function RightPanel() {
  return (
    <GlowPanel
      className="flex flex-col flex-1 lg:max-w-[520px] relative items-center justify-center px-8 py-16 overflow-hidden"
      glowSize={500}
      glowOpacity={0.04}
    >
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Mobile-only logo */}
        <div className="lg:hidden mb-10">
          <Link href="/">
            <Image
              src="/attune-logo.png"
              alt="Attune"
              width={40}
              height={40}
              style={{ filter: "invert(1)", objectFit: "contain" }}
            />
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5 lg:hidden"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ● Returning member
          </p>
          <h2
            className="text-[clamp(1.8rem,4vw,2.6rem)] text-white leading-[0.95] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            Welcome back.
          </h2>
          <p className="mt-3 text-[14px] text-white/40 leading-relaxed">
            Sign in to continue your practice.
          </p>
        </div>

        {/* Clerk */}
        <SignIn
          fallbackRedirectUrl="/dashboard"
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
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "none",
                background: "rgba(17,17,16,0.80)",
                backdropFilter: "blur(16px)",
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

        {/* Back link */}
        <Link
          href="/"
          className="mt-8 text-[12px] text-white/25 hover:text-white/50 transition-colors tracking-[0.05em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ← Back to Attune
        </Link>
      </div>
    </GlowPanel>
  );
}

/* ── Page ────────────────────────────────────────────────────── */

export default function SignInPage() {
  return (
    <main className="min-h-screen flex bg-[#0A0A0A] text-white relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="signin-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={0.9}
          particleDensity={35}
          particleColor="#ffffff"
          speed={0.5}
          className="w-full h-full"
        />
      </div>
      <LeftPanel />
      <RightPanel />
    </main>
  );
}
