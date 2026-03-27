"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { modules, type Module } from "@/lib/modules";

const AUTO_PLAY_DURATION = 6000;

interface VerticalTabsProps {
  completedModules: string[];
}

export function VerticalTabs({ completedModules }: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % modules.length);
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  };

  const activeModule: Module = modules[activeIndex];
  const isDone = completedModules.includes(activeModule.slug);

  // First non-"The Move" section body paragraph as preview
  const preview = activeModule.sections.find(
    (s) => s.heading !== "The Move"
  )?.body[0] ?? "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

      {/* LEFT: Module tabs */}
      <div className="lg:col-span-5 order-2 lg:order-1">
        <div className="flex flex-col space-y-0">
          {modules.map((mod, index) => {
            const isActive = activeIndex === index;
            const done = completedModules.includes(mod.slug);
            return (
              <button
                key={mod.slug}
                onClick={() => handleTabClick(index)}
                className={cn(
                  "group relative flex items-start gap-4 py-5 text-left transition-all duration-500 border-t border-white/[0.06] first:border-0",
                  isActive ? "text-white" : "text-white/30 hover:text-white/60"
                )}
              >
                {/* Progress bar on left edge */}
                <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-white/[0.08]">
                  {isActive && (
                    <motion.div
                      key={`progress-${index}-${isPaused}`}
                      className="absolute top-0 left-0 w-full bg-white/60 origin-top"
                      initial={{ height: "0%" }}
                      animate={isPaused ? { height: "0%" } : { height: "100%" }}
                      transition={{
                        duration: AUTO_PLAY_DURATION / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>

                {/* Module number */}
                <span
                  className="text-[9px] font-medium mt-1.5 tabular-nums opacity-40 shrink-0"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  /{mod.slug}
                </span>

                {/* Title + completion */}
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <span
                    className={cn(
                      "text-[1.1rem] md:text-[1.3rem] leading-tight tracking-[-0.01em] transition-colors duration-500",
                      done && !isActive && "line-through text-white/20"
                    )}
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
                  >
                    {mod.title}
                  </span>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-[11px] text-white/35 pb-1"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {mod.duration}
                          {done && (
                            <span className="ml-3 text-white/50">Done ✓</span>
                          )}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Active module detail card */}
      <div
        className="lg:col-span-7 order-1 lg:order-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative overflow-hidden border border-white/[0.10] bg-white/[0.02] aspect-[4/3] lg:aspect-[16/11]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", stiffness: 260, damping: 32 },
                opacity: { duration: 0.4 },
              }}
              className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 md:p-10"
            >
              {/* Top: module label */}
              <div className="flex items-center justify-between">
                <p
                  className="text-[10px] tracking-[0.3em] uppercase text-white/25"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Module {activeModule.slug}
                </p>
                {isDone && (
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase text-white/40 border border-white/[0.12] px-3 py-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Completed ✓
                  </span>
                )}
              </div>

              {/* Center: title + preview */}
              <div className="space-y-5">
                <h3
                  className="text-[clamp(1.5rem,4vw,2.6rem)] leading-[0.97] tracking-[-0.02em] text-white"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
                >
                  {activeModule.title}
                </h3>
                <p className="text-[14px] text-white/45 leading-[1.8] max-w-[52ch] line-clamp-3">
                  {preview}
                </p>
              </div>

              {/* Bottom: CTA */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/dashboard/${activeModule.slug}`}
                  className="bg-white text-black text-[11px] font-semibold tracking-[0.1em] uppercase px-7 py-3.5 hover:bg-white/85 transition-colors"
                >
                  {isDone ? "Review Module →" : "Start Module →"}
                </Link>

                {/* Prev/Next arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setDirection(-1);
                      setActiveIndex((prev) => (prev - 1 + modules.length) % modules.length);
                      setIsPaused(true);
                    }}
                    className="w-9 h-9 border border-white/[0.12] flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/30 transition-all"
                    aria-label="Previous module"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 2L4 7l5 5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setDirection(1);
                      handleNext();
                      setIsPaused(true);
                    }}
                    className="w-9 h-9 border border-white/[0.12] flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/30 transition-all"
                    aria-label="Next module"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 2l5 5-5 5" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

export default VerticalTabs;
