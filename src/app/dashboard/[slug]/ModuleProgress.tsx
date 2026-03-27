// src/app/dashboard/[slug]/ModuleProgress.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { modules, getNextModule, type Module } from "@/lib/modules";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";

/* ── Module icon: numbered circle ─────────────────────────────── */
function ModuleIcon({ slug, done, active }: { slug: string; done: boolean; active: boolean }) {
  return (
    <span
      className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border text-[9px] transition-colors"
      style={{
        borderColor: active
          ? "rgba(225,29,72,0.80)"
          : done
          ? "rgba(255,255,255,0.5)"
          : "rgba(255,255,255,0.15)",
        background: done ? "rgba(255,255,255,0.15)" : "transparent",
        color: active ? "rgba(225,29,72,0.95)" : "rgba(255,255,255,0.4)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {done ? "✓" : slug}
    </span>
  );
}

/* ── Logo shown when sidebar is expanded ──────────────────────── */
function SidebarLogo() {
  const { open, animate } = useSidebar();
  return (
    <Link href="/dashboard" className="flex items-center gap-3 px-2 py-1 mb-6">
      <Image
        src="/attune-logo.png"
        alt="Attune"
        width={24}
        height={24}
        style={{ filter: "invert(1)", objectFit: "contain", flexShrink: 0 }}
      />
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        transition={{ duration: 0.15 }}
        className="text-[10px] tracking-[0.25em] uppercase text-white/30 whitespace-pre !p-0 !m-0"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Foundations
      </motion.span>
    </Link>
  );
}

/* ── Main component ───────────────────────────────────────────── */
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setProgress(scrollHeight <= clientHeight ? 0 : scrollTop / (scrollHeight - clientHeight));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

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

  // Build sidebar links from modules
  const moduleLinks = modules.map((mod) => ({
    label: mod.title,
    href: `/dashboard/${mod.slug}`,
    icon: (
      <ModuleIcon
        slug={mod.slug}
        done={completed.includes(mod.slug)}
        active={mod.slug === currentSlug}
      />
    ),
    isActive: mod.slug === currentSlug,
  }));

  return (
    <div className="flex flex-1 min-h-0 flex-col md:flex-row">
      <Sidebar animate={true}>
        <SidebarBody className="justify-between gap-6">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <SidebarLogo />

            {/* Module links */}
            <div className="flex flex-col gap-0.5">
              {moduleLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  link={link}
                  className={
                    link.isActive
                      ? "bg-white/[0.04] !text-white border-r-2 border-[#E11D48]/70"
                      : ""
                  }
                />
              ))}
            </div>
          </div>

          {/* Bottom: back to dashboard */}
          <SidebarLink
            link={{
              label: "All Modules",
              href: "/dashboard",
              icon: <LayoutDashboard size={16} className="text-white/40 flex-shrink-0" />,
            }}
            className="border-t border-white/[0.06] pt-4 mt-2"
          />
        </SidebarBody>
      </Sidebar>

      {/* ── Content ─────────────────────────────────────────── */}
      <div ref={scrollRef} className="flex-1 px-[clamp(1.5rem,5vw,4rem)] py-10 overflow-y-auto">
        {/* Reading progress bar */}
        <div className="h-[2px] sticky top-0 z-10 bg-white/[0.05] -mx-[clamp(1.5rem,5vw,4rem)] mb-8">
          <div
            className="h-full transition-[width] duration-75"
            style={{ background: "rgba(225,29,72,0.65)", width: `${progress * 100}%` }}
          />
        </div>
        {children}

        {/* Action block */}
        <div className="relative mt-16 border border-white/[0.08] bg-[#111110] px-6 py-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent" />
          <div className="relative z-10">
            {error && <p className="text-red-400 text-[12px] mb-4">{error}</p>}
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
              <button
                onClick={handleComplete}
                disabled={marking}
                className="w-full text-[11px] font-semibold tracking-[0.1em] uppercase px-8 py-4 transition-colors disabled:opacity-50 cursor-pointer"
                style={{ background: "var(--crimson)", color: "#0A0907" }}
                onMouseEnter={e => !marking && (e.currentTarget.style.background = "var(--crimson-bright)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--crimson)")}
              >
                {nextModule
                  ? `Complete — continue to Module ${nextModule.slug} →`
                  : "Complete — return to dashboard →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
