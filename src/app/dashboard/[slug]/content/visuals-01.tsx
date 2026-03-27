"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useAnimationFrame } from "framer-motion";

/* ── Animated counter helper ─────────────────────────────────────── */
function AnimatedNum({ value, inView }: { value: number; inView: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) { setN(0); return; }
    let start = 0;
    const d = 900;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / d, 1);
      setN(Math.round(p * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <>{n}</>;
}

/* ── Container vs Coupling — animated 3D flip cards ─────────────── */
export function ContainerVsCoupling() {
  const [flipped, setFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);

  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden p-8"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.022 }} />
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />

      <div className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* The Old Model — Container */}
          <div className="flex flex-col items-center gap-5">
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/30"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Old model
            </p>
            <div className="relative w-full" style={{ perspective: "800px" }}>
              <motion.div
                className="w-full border border-white/[0.12] bg-[#111110] px-6 py-8 flex flex-col items-center gap-4"
                whileHover={{ rotateY: 5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Brain/container icon via CSS */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="w-16 h-14 rounded-[40%] border-2 border-white/20 bg-white/[0.04] flex items-center justify-center">
                    <div className="w-8 h-6 border border-white/15 rounded-[30%] bg-white/[0.03]" />
                  </div>
                  {/* Arrow going IN */}
                  <motion.div
                    className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  >
                    <div className="w-[1px] h-4 bg-white/25" />
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/25" />
                  </motion.div>
                </div>
                <p
                  className="text-[13px] text-white/70 text-center leading-[1.6]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Skill is a thing you acquire and store inside yourself.
                </p>
                <p className="text-[10px] text-white/30 text-center leading-snug">
                  More reps = more stored = better performance.
                </p>
              </motion.div>
            </div>
            <p className="text-[10px] text-red-400/60 text-center leading-snug max-w-[20ch]">
              Explains why practice works. Doesn&apos;t explain why it sometimes doesn&apos;t transfer.
            </p>
          </div>

          {/* The New Model — Coupling */}
          <div className="flex flex-col items-center gap-5">
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/30"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Ecological model
            </p>
            <div className="relative w-full" style={{ perspective: "800px" }}>
              <motion.div
                className="w-full px-6 py-8 flex flex-col items-center gap-4"
                style={{
                  border: "1px solid rgba(225,29,72,0.2)",
                  background: "rgba(255,255,255,0.03)",
                  boxShadow: "inset 0 0 30px rgba(225,29,72,0.03)",
                }}
                whileHover={{ rotateY: -5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Organism ↔ Environment coupling icon */}
                <div className="flex items-center gap-3 w-full justify-center">
                  <div className="w-10 h-10 rounded-full border border-white/25 bg-white/[0.05] flex items-center justify-center">
                    <span className="text-[8px] text-white/50" style={{ fontFamily: "var(--font-mono)" }}>you</span>
                  </div>
                  {/* Bidirectional arrows */}
                  <div className="flex flex-col gap-1">
                    <motion.div
                      className="flex items-center gap-0.5"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    >
                      <div className="w-8 h-[1px] bg-white/35" />
                      <div className="w-0 h-0 border-l-3 border-y-2 border-l-white/35 border-y-transparent" style={{ borderLeftWidth: 6, borderTopWidth: 3, borderBottomWidth: 3 }} />
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-0.5 flex-row-reverse"
                      animate={{ x: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut", delay: 0.7 }}
                    >
                      <div className="w-8 h-[1px] bg-white/35" />
                      <div className="w-0 h-0 border-r-3 border-y-2 border-r-white/35 border-y-transparent" style={{ borderRightWidth: 6, borderTopWidth: 3, borderBottomWidth: 3 }} />
                    </motion.div>
                  </div>
                  <div className="w-10 h-10 border border-white/25 bg-white/[0.05] flex items-center justify-center">
                    <span className="text-[8px] text-white/50" style={{ fontFamily: "var(--font-mono)" }}>env</span>
                  </div>
                </div>
                <p
                  className="text-[13px] text-white/70 text-center leading-[1.6]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Skill is what emerges when you interact with a specific environment.
                </p>
                <p className="text-[10px] text-white/30 text-center leading-snug">
                  Change the environment → the skill changes with it.
                </p>
              </motion.div>
            </div>
            <p className="text-[10px] text-white/40 text-center leading-snug max-w-[22ch]">
              Explains both why practice works AND why it sometimes doesn&apos;t transfer.
            </p>
          </div>
        </div>

        <button
          onClick={() => setFlipped(!flipped)}
          className="mt-6 w-full text-[10px] tracking-[0.2em] uppercase text-white/25 hover:text-white/50 transition-colors border-t border-white/[0.06] pt-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {flipped ? "← back" : "Why does this distinction matter? →"}
        </button>
        <motion.div
          animate={{ height: flipped ? "auto" : 0, opacity: flipped ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden"
        >
          <p className="text-[14px] text-white/55 leading-[1.8] pt-4" style={{ fontFamily: "var(--font-serif)" }}>
            If skill is stored in you, then when it doesn&apos;t show up in performance, the problem is you.
            You didn&apos;t practice enough. You weren&apos;t disciplined enough. You let nerves get in the way.
            <br /><br />
            If skill is what emerges between you and an environment, then when it doesn&apos;t show up in
            performance, the problem is the environment mismatch. The skill is real. It was built in the
            wrong context. That&apos;s not a character flaw. That&apos;s a design problem — and design problems
            can be fixed.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Three Variables — animated triangle ────────────────────────── */
export function ThreeVariables() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);

  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const vars = [
    {
      id: "organism",
      label: "Organism",
      sub: "The person",
      desc: "Their physical attributes, emotional state, experience level, fatigue, attention, beliefs about themselves. Everything they bring to the moment.",
      examples: ["Height and wingspan", "Anxiety or calm", "Years of experience", "Confidence today"],
      color: "rgba(255,255,255,0.7)",
    },
    {
      id: "task",
      label: "Task",
      sub: "The goal",
      desc: "What they're trying to accomplish. The rules, objectives, constraints, and metrics that define what counts as success.",
      examples: ["Scoring a goal", "Hitting a target", "Writing 1,000 words", "Convincing a client"],
      color: "rgba(255,255,255,0.5)",
    },
    {
      id: "environment",
      label: "Environment",
      sub: "The context",
      desc: "Everything around them — the space, the people watching, the surface underfoot, the noise, the lighting, the stakes, the opponent.",
      examples: ["Empty gym vs. packed stadium", "Silence vs. crowd noise", "Training vs. competition", "Safe vs. judged"],
      color: "rgba(255,255,255,0.35)",
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden p-8"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.022 }} />
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />

      <div ref={ref} className="relative z-10">
        <p
          className="text-[11px] text-white/40 text-center mb-8 leading-[1.7]"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          Behavior is the product of all three interacting. None of them alone tells the full story.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {vars.map((v, i) => (
            <motion.button
              key={v.id}
              initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
              animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActive(active === v.id ? null : v.id)}
              className="text-left px-5 py-5 transition-colors duration-200"
              style={{
                borderLeft: active === v.id ? "2px solid rgba(225,29,72,0.5)" : "1px solid rgba(255,255,255,0.08)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: active === v.id ? "rgba(225,29,72,0.03)" : "transparent",
              }}
            >
              <p
                className="text-[9px] tracking-[0.25em] uppercase mb-2"
                style={{ fontFamily: "var(--font-mono)", color: v.color }}
              >
                {v.label}
              </p>
              <p className="text-[12px] text-white/40">{v.sub}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active && (() => {
            const v = vars.find((x) => x.id === active)!;
            return (
              <motion.div
                key={active}
                initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-white/[0.07] pt-6"
              >
                <p className="text-[15px] text-white/70 leading-[1.8] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                  {v.desc}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {v.examples.map((ex) => (
                    <div key={ex} className="flex items-start gap-2">
                      <div style={{
                        width: 8, height: 8, flexShrink: 0, marginTop: 4,
                        backgroundColor: "rgba(225,29,72,0.5)",
                        boxShadow: "none",
                      }} />
                      <span className="text-[13px] text-white/50">{ex}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        <p
          className="text-[10px] text-white/20 text-center mt-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          tap each variable to explore
        </p>
      </div>
    </div>
  );
}

/* ── Practice vs Performance — animated split ────────────────────── */
export function PracticeVsPerformance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);

  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const practiceFactors = [
    "Empty facility", "Familiar people", "No consequences", "Predictable drill", "Constant cues", "Safe to fail",
  ];
  const performanceFactors = [
    "Packed stadium", "Strangers judging", "High stakes", "Unpredictable chaos", "No cues", "Failure is visible",
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden p-6 sm:p-8"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.022 }} />
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />

      <div ref={ref} className="relative z-10">
        <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
          {/* Practice */}
          <motion.div
            className="bg-[#0d0d0c] px-4 sm:px-6 py-6"
            initial={{ opacity: 0, filter: "blur(8px)", x: -16 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Practice environment
            </p>
            <div className="space-y-3">
              {practiceFactors.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div style={{
                    width: 8, height: 8, flexShrink: 0,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    boxShadow: "none",
                  }} />
                  <span className="text-[13px] text-white/55">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance */}
          <motion.div
            className="bg-[#0d0d0c] px-4 sm:px-6 py-6"
            initial={{ opacity: 0, filter: "blur(8px)", x: 16 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Performance environment
            </p>
            <div className="space-y-3">
              {performanceFactors.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div style={{
                    width: 8, height: 8, flexShrink: 0,
                    backgroundColor: "rgba(225,29,72,0.9)",
                    boxShadow: "0 0 10px rgba(225,29,72,0.55), 0 0 24px rgba(225,29,72,0.18)",
                  }} />
                  <span className="text-[13px] text-white/75">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 border-t border-white/[0.07] pt-6"
        >
          <p
            className="text-[14px] text-white/55 leading-[1.8] text-center"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            The skill that developed in the left column was built for the left column.
            <br />
            Why would we expect it to transfer to the right?
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Mismatch Meter — animated ───────────────────────────────────── */
export function MismatchMeter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);

  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const examples = [
    { label: "Free throws in empty gym → game winning FT", match: 25 },
    { label: "Pitch deck rehearsed alone → live investor room", match: 20 },
    { label: "Blog post written in calm → published under criticism", match: 40 },
    { label: "Game-speed training with defenders → actual game", match: 85 },
    { label: "Debate club with opponents → real debate", match: 80 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden px-6 sm:px-8 py-8"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.022 }} />
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />

      <div ref={ref} className="relative z-10">
        <p
          className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Practice → Performance representativeness
        </p>
        <div className="space-y-5">
          {examples.map((ex, i) => (
            <div key={i}>
              <p className="text-[13px] text-white/55 mb-2 leading-snug">{ex.label}</p>
              <div className="h-[3px] bg-white/[0.05] w-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: "linear-gradient(90deg, rgba(225,29,72,0.55), rgba(225,29,72,0.88))" }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${ex.match}%` } : {}}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
              <p
                className="text-[9px] text-white/20 mt-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <AnimatedNum value={ex.match} inView={inView} />% representative
              </p>
            </div>
          ))}
        </div>
        <p
          className="text-[11px] text-white/30 mt-8 leading-[1.7]"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          The lower the representativeness, the larger the gap between what you built and what gets called upon.
        </p>
      </div>
    </div>
  );
}

/* ── Cycling loop animation — organism ↔ environment ─────────────── */
export function CouplingLoop() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);

  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  // Traveling dot: moves you → right (perceive) → world → left (act) → back
  // Path: x goes 0 → 160 → 0, y stays centered (0)
  // We offset the dot from center using relative positioning inside the loop area
  const travelingDotAnim = {
    x: [0, 80, 160, 80, 0],
    y: [0, -14, 0, 14, 0],
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden py-10 px-6 flex flex-col items-center gap-8"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.022 }} />
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />

      <div ref={ref} className="relative z-10 flex flex-col items-center gap-8 w-full">
        <p
          className="text-[11px] text-white/40 text-center max-w-[38ch] leading-[1.7]"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          Skill doesn&apos;t live in you. It lives in the loop between you and the world.
        </p>

        <div className="relative flex items-center justify-center w-full max-w-xs mx-auto h-32">
          {/* Organism node */}
          <motion.div
            className="absolute left-0 w-20 h-20 rounded-full border border-white/25 bg-white/[0.04] flex items-center justify-center"
            animate={inView ? { scale: [1, 1.04, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <span className="text-[9px] text-white/50 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>you</span>
          </motion.div>

          {/* Arrows */}
          <div className="flex flex-col gap-3 mx-auto">
            {/* perceive → */}
            <motion.div
              className="flex flex-col items-center"
              animate={inView ? { x: [0, 6, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <span className="text-[8px] text-white/25 mb-1" style={{ fontFamily: "var(--font-mono)" }}>perceive</span>
              <div className="flex items-center">
                <div className="w-16 h-[1px] bg-white/20" />
                <div className="border-l-4 border-y-[3px] border-l-white/20 border-y-transparent" />
              </div>
            </motion.div>
            {/* ← act */}
            <motion.div
              className="flex flex-col items-center"
              animate={inView ? { x: [0, -6, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.8 }}
            >
              <div className="flex items-center">
                <div className="border-r-4 border-y-[3px] border-r-white/20 border-y-transparent" />
                <div className="w-16 h-[1px] bg-white/20" />
              </div>
              <span className="text-[8px] text-white/25 mt-1" style={{ fontFamily: "var(--font-mono)" }}>act</span>
            </motion.div>
          </div>

          {/* Traveling gold dot */}
          {inView && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 6,
                height: 6,
                backgroundColor: "rgba(225,29,72,0.8)",
                boxShadow: "0 0 8px rgba(225,29,72,0.7), 0 0 18px rgba(225,29,72,0.3)",
                left: "calc(50% - 80px - 3px)",
                top: "calc(50% - 3px)",
              }}
              animate={travelingDotAnim}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />
          )}

          {/* Environment node */}
          <motion.div
            className="absolute right-0 w-20 h-20 border border-white/20 bg-white/[0.03] flex items-center justify-center"
            animate={inView ? { scale: [1, 1.03, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 1.2 }}
          >
            <span className="text-[9px] text-white/40 tracking-[0.15em] uppercase text-center" style={{ fontFamily: "var(--font-mono)" }}>world</span>
          </motion.div>
        </div>

        <p className="text-[12px] text-white/30 text-center max-w-[34ch] leading-[1.7]">
          Every action changes the environment. The changed environment generates new perceptions.
          Those perceptions generate new actions. The loop never stops.
        </p>
      </div>
    </div>
  );
}
