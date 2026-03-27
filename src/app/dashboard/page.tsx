// src/app/dashboard/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { modules } from "@/lib/modules";
import DisplayCards from "@/components/ui/display-cards";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";
import type { Variants } from "framer-motion";

/* ─── Variants ────────────────────────────────────────────────── */
const blurSlide: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { type: "spring" as const, bounce: 0.25, duration: 1.6 },
  },
};

/* ─── Dashboard ──────────────────────────────────────────────── */
export default function Dashboard() {
  const { user } = useUser();
  const completed =
    (user?.publicMetadata?.completedModules as string[] | undefined) ?? [];
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Reload Clerk user on mount so returning from a module shows fresh progress
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { user?.reload().catch(() => {}); }, []);

  // Trigger welcome email on first dashboard visit (idempotent — server checks metadata)
  React.useEffect(() => {
    if (!user) return;
    if (user.publicMetadata?.welcomeEmailSent) return;
    fetch("/api/send-welcome", { method: "POST" }).catch(() => {});
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const remaining = modules.length - completed.length;
  const nextMod = modules.find((m) => !completed.includes(m.slug));

  return (
    <main className="text-white min-h-screen overflow-x-hidden">

      {/* ── Ambient glow ────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden hidden lg:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] rounded-full opacity-[0.035] bg-white blur-[140px]" />
      </div>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        className={cn(
          "fixed z-50 w-full px-[clamp(1.75rem,6vw,5rem)] transition-all duration-300",
          isScrolled
            ? "py-3 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/[0.06]"
            : "py-5 bg-transparent"
        )}
      >
        <div className="flex items-center justify-between">
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
              appearance={{ elements: { avatarBox: { width: 32, height: 32 } } }}
            />
          </div>
        </div>
      </nav>

      {/* ── HERO — full-width, centered ──────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[44vh] px-6 pt-24 pb-20">

        <AnimatedGroup
          variants={{
            container: {
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
            },
            item: blurSlide,
          }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <p
            className="text-[11px] tracking-[0.35em] uppercase text-white/25 mb-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {user?.firstName ? `Welcome back, ${user.firstName}` : "Welcome back"}
            <span className="mx-3 text-white/15">·</span>
            <span className="text-white/45">{completed.length} of {modules.length} complete</span>
          </p>

          {/* Headline */}
          <h1
            className="text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.03em] text-white mb-6 max-w-[16ch]"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            {completed.length === 0 ? (
              <>
                You know the problem.{" "}
                <em style={{ color: "rgba(225,29,72,0.70)", fontStyle: "italic" }}>
                  Now install the lens.
                </em>
              </>
            ) : completed.length === modules.length ? (
              <>
                Operating system{" "}
                <em style={{ color: "rgba(225,29,72,0.70)", fontStyle: "italic" }}>
                  installed.
                </em>
              </>
            ) : (
              <>
                {remaining} session{remaining !== 1 ? "s" : ""} left.{" "}
                <em style={{ color: "rgba(225,29,72,0.70)", fontStyle: "italic" }}>
                  Stay in the stream.
                </em>
              </>
            )}
          </h1>

          {/* Subtext */}
          <p className="text-[16px] text-white/40 leading-[1.8] max-w-[48ch] mb-8">
            {completed.length === 0
              ? "Work through them in order. Each one builds on the last. The operating system installs faster than you expect."
              : completed.length === modules.length
              ? "You've been through all eight. Now design one session from scratch using only what you learned. That's the real module nine."
              : "The lens develops through application, not comprehension. Pick up where you left off."}
          </p>

          {/* CTA */}
          {nextMod && (
            <Link
              href={`/dashboard/${nextMod.slug}`}
              className="text-[12px] font-semibold tracking-[0.1em] uppercase px-10 py-4 transition-colors"
              style={{ background: "var(--crimson)", color: "#0A0907" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--crimson-bright)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--crimson)")}
            >
              Continue → Module {nextMod.slug}
            </Link>
          )}
        </AnimatedGroup>
      </section>

      {/* ── CURRICULUM GRID — full-width structural element ─────── */}
      <AnimatedGroup
        variants={{
          container: { visible: { transition: { delayChildren: 0.55 } } },
          item: {
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring" as const, bounce: 0.18, duration: 1.6 },
            },
          },
        }}
      >
        <DisplayCards completedModules={completed} />
      </AnimatedGroup>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="px-[clamp(1.75rem,6vw,5rem)] py-16 border-t border-white/[0.07] text-center flex flex-col items-center">
        <p
          className="text-[clamp(1.2rem,2.5vw,1.6rem)] text-white mb-3"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
        >
          Questions?
        </p>
        <p className="text-[13px] text-white/40 mb-7 max-w-xs">
          Message Sam directly — or reach out on any platform below.
        </p>
        {/* Telegram — preferred */}
        <a
          href="https://t.me/+16128453855"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-7 text-[12px] text-white/65 hover:text-white transition-colors border border-white/[0.10] hover:border-white/[0.22] px-4 py-2"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
        >
          Telegram
          <span className="text-white/30 text-[9px] tracking-[0.15em] uppercase">preferred</span>
        </a>
        {/* Other platforms */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-[12px] text-white/40">
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/sam-elsner" },
            { label: "X", href: "https://x.com/samelsner" },
            { label: "Instagram", href: "https://instagram.com/sam.elsner" },
            { label: "Substack", href: "https://findthesignal.substack.com/" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
        <p
          className="text-[10px] text-white/15 tracking-[0.12em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          © 2026 Attune
        </p>
      </footer>

    </main>
  );
}
