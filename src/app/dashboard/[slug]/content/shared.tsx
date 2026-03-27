"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Fade-in wrapper — triggers when scrolled into view ─────────── */
export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section label ──────────────────────────────────────────────── */
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] tracking-[0.3em] uppercase mb-5"
      style={{ fontFamily: "var(--font-mono)", color: "rgba(225,29,72,0.70)" }}
    >
      {children}
    </p>
  );
}

/* ── Body paragraph ─────────────────────────────────────────────── */
export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[17px] text-white/80 leading-[1.85] mb-5">
      {children}
    </p>
  );
}

/* ── Large pull quote ───────────────────────────────────────────── */
export function BigQuote({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <blockquote
        className="border-l-2 pl-6 my-10"
        style={{ borderColor: "rgba(225,29,72,0.40)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
      >
        <p className="text-[22px] sm:text-[26px] leading-[1.35] tracking-[-0.01em] text-white/70">
          {children}
        </p>
      </blockquote>
    </Reveal>
  );
}

/* ── Key insight — highlighted callout ──────────────────────────── */
export function KeyInsight({
  label = "Key Insight",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="my-10 border border-white/[0.14] bg-white/[0.03] px-7 py-6">
        <p
          className="text-[9px] tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(225,29,72,0.65)" }}
        >
          {label}
        </p>
        <div
          className="text-[16px] text-white/85 leading-[1.8]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Analogy bridge ─────────────────────────────────────────────── */
export function Analogy({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="my-10 bg-white/[0.02] border-t border-b border-white/[0.08] px-6 py-6">
        <p
          className="text-[9px] tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(225,29,72,0.55)" }}
        >
          Think of it this way
        </p>
        <div className="text-[15px] text-white/65 leading-[1.85]">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Reflection prompt ──────────────────────────────────────────── */
export function ThinkAboutIt({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="my-10 border border-white/[0.10] px-7 py-6">
        <p
          className="text-[9px] tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(225,29,72,0.60)" }}
        >
          Pause here
        </p>
        <div className="text-[15px] text-white/60 leading-[1.85] italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Visual container ───────────────────────────────────────────── */
export function Visual({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="my-12">
        <p
          className="text-[9px] tracking-[0.3em] uppercase mb-4 text-center"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(225,29,72,0.50)" }}
        >
          {label}
        </p>
        {children}
      </div>
    </Reveal>
  );
}

/* ── Numbered list ──────────────────────────────────────────────── */
export function NumList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3 my-6">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 text-[16px] text-white/75 leading-[1.7]">
          <span
            className="flex-shrink-0 text-[10px] mt-[6px] tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(225,29,72,0.60)" }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

/* ── Section divider ────────────────────────────────────────────── */
export function Divider() {
  return <hr className="border-white/[0.06] my-12" />;
}
