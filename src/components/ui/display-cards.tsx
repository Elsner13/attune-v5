"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { modules } from "@/lib/modules";

/* ── Pull quotes — the hook on every card ────────────────────────── */

const PULL_QUOTES: Record<string, string> = {
  "01": "It's not a ceiling. It's a mismatch.",
  "02": "The environment teaches. You arrange the lesson.",
  "03": "You cannot transfer attunement through instruction.",
  "04": "The cue is the last resort.",
  "05": "We train the hand. The eye is assumed.",
  "06": "Knowledge about a place is not knowledge of it.",
  "07": "Once you have the lens, you stop figuring. You start seeing.",
  "08": "Run it. Don't study it.",
};

/* ── DisplayCards ────────────────────────────────────────────────── */

interface DisplayCardsProps {
  completedModules: string[];
}

export default function DisplayCards({ completedModules }: DisplayCardsProps) {
  const nextSlug = modules.find((m) => !completedModules.includes(m.slug))?.slug;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative z-10 w-full border-t border-white/[0.07]">
      {modules.map((mod, index) => (
        <ModuleCell
          key={mod.slug}
          slug={mod.slug}
          title={mod.title}
          duration={mod.duration}
          pullQuote={PULL_QUOTES[mod.slug]}
          index={index}
          isDone={completedModules.includes(mod.slug)}
          isCurrent={mod.slug === nextSlug}
          href={`/dashboard/${mod.slug}`}
        />
      ))}
    </div>
  );
}

/* ── ModuleCell ──────────────────────────────────────────────────── */

interface ModuleCellProps {
  slug: string;
  title: string;
  duration: string;
  pullQuote: string;
  index: number;
  isDone: boolean;
  isCurrent: boolean;
  href: string;
}

function ModuleCell({
  slug,
  title,
  duration,
  pullQuote,
  index,
  isDone,
  isCurrent,
  href,
}: ModuleCellProps) {
  return (
    <Link
      href={href}
      className={cn(
        // Grid structure
        "flex flex-col lg:border-r py-9 relative group/feature",
        // Border color — void-native
        "border-white/[0.07]",
        // Left border: first cell of each row on lg (creates full box)
        (index === 0 || index === 4) && "lg:border-l",
        // Bottom border: top row only on lg; all cells on sm/md
        index < 4 ? "border-b" : "border-b lg:border-b-0",
        // Completed — respectfully faded
        isDone && "opacity-40",
      )}
    >
      {/* Hover lift — gradient direction follows row position */}
      <div
        className={cn(
          "opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300",
          "absolute inset-0 h-full w-full pointer-events-none",
          index < 4
            ? "bg-gradient-to-t from-white/[0.03] to-transparent"
            : "bg-gradient-to-b from-white/[0.03] to-transparent",
        )}
      />

      {/* ── Slug + status ─── */}
      <div className="mb-6 relative z-10 px-6 lg:px-10 flex items-center justify-between">
        <span
          className="text-[9px] tracking-[0.38em] uppercase text-white/25 group-hover/feature:text-white/50 transition-colors duration-200"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {slug}
        </span>

        {isDone && (
          <span
            className="text-[9px] text-white/20"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ✓
          </span>
        )}

        {isCurrent && (
          <span
            className="text-[8px] tracking-[0.2em] uppercase px-1.5 py-[3px]"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(225,29,72,0.75)", border: "1px solid rgba(225,29,72,0.25)" }}
          >
            Up next
          </span>
        )}
      </div>

      {/* ── Title with left accent bar ─── */}
      <div className="relative z-10 px-6 lg:px-10 mb-4">
        {/* Accent bar — grows taller and brighter on hover */}
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-9 w-[1.5px] rounded-tr-full rounded-br-full bg-[rgba(225,29,72,0.15)] group-hover/feature:bg-[rgba(225,29,72,0.65)] transition-all duration-200 origin-center" />
        <h3
          className="group-hover/feature:translate-x-2 transition-transform duration-200 inline-block leading-[1.25] tracking-[-0.02em] text-white/75 group-hover/feature:text-white/95"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          {title}
        </h3>
      </div>

      {/* ── Pull quote — this is the real hook ─── */}
      <p
        className="relative z-10 px-6 lg:px-10 text-[11px] leading-[1.8] text-white/25 group-hover/feature:text-white/55 transition-colors duration-200 line-clamp-3"
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
      >
        {pullQuote}
      </p>

      {/* ── Duration ─── */}
      <p
        className="relative z-10 px-6 lg:px-10 mt-6 text-[9px] tracking-[0.15em] uppercase text-white/18 group-hover/feature:text-white/35 transition-colors duration-200"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {duration}
      </p>
    </Link>
  );
}
