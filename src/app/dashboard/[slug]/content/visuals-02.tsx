"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   AffordanceRelation
   Shows how the SAME environment offers different affordances depending
   on who is perceiving it. Toggle between novice / developing / expert.
───────────────────────────────────────────────────────────────────── */
const ORGANISM_LEVELS = [
  {
    id: "novice",
    label: "Novice",
    description: "Six months in. Still building movement vocabulary.",
    affordances: [
      { label: "The goal", visible: true },
      { label: "The ball", visible: true },
      { label: "Open space", visible: false },
      { label: "Teammate runs", visible: false },
      { label: "Defensive gaps", visible: false },
      { label: "Pressure angles", visible: false },
      { label: "Timing windows", visible: false },
    ],
    color: "rgba(255,255,255,0.15)",
    subtext: "2 of 7 affordances available",
  },
  {
    id: "developing",
    label: "Developing",
    description: "Three years in. The game is starting to slow down.",
    affordances: [
      { label: "The goal", visible: true },
      { label: "The ball", visible: true },
      { label: "Open space", visible: true },
      { label: "Teammate runs", visible: true },
      { label: "Defensive gaps", visible: false },
      { label: "Pressure angles", visible: false },
      { label: "Timing windows", visible: false },
    ],
    color: "rgba(255,255,255,0.40)",
    subtext: "4 of 7 affordances available",
  },
  {
    id: "expert",
    label: "Expert",
    description: "A decade in. Time doesn't exist the same way.",
    affordances: [
      { label: "The goal", visible: true },
      { label: "The ball", visible: true },
      { label: "Open space", visible: true },
      { label: "Teammate runs", visible: true },
      { label: "Defensive gaps", visible: true },
      { label: "Pressure angles", visible: true },
      { label: "Timing windows", visible: true },
    ],
    color: "rgba(255,255,255,0.75)",
    subtext: "7 of 7 affordances available",
  },
];

export function AffordanceRelation() {
  const [active, setActive] = useState(0);
  const level = ORGANISM_LEVELS[active];

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
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.022 }} />
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />
      <div className="relative z-10 p-6 sm:p-8">

        {/* Organism selector */}
        <div className="flex gap-0 mb-8 border border-white/[0.08]">
          {ORGANISM_LEVELS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setActive(i)}
              className="relative flex-1 py-3.5 border-r border-white/[0.04] last:border-r-0"
            >
              {active === i && (
                <motion.div
                  layoutId="pill-affordance"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 text-[10px] tracking-[0.2em] uppercase transition-colors ${active === i ? "text-black font-semibold" : "text-white/25"}`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {l.label}
              </span>
            </button>
          ))}
        </div>

        {/* Same environment — different affordances */}
        <div className="mb-6">
          <p
            className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Same environment. What it offers this organism:
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={level.id}
              initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {level.affordances.map((aff, i) => (
                  <motion.div
                    key={aff.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 py-2 border-b border-white/[0.05]"
                  >
                    <div className="relative flex items-center justify-center" style={{ width: 8, height: 8, flexShrink: 0 }}>
                      <motion.div
                        animate={{
                          backgroundColor: aff.visible
                            ? "rgba(225,29,72,0.9)"
                            : "rgba(255,255,255,0.07)",
                          scale: aff.visible ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: 8,
                          height: 8,
                          flexShrink: 0,
                          boxShadow: aff.visible
                            ? "0 0 10px rgba(225,29,72,0.55), 0 0 24px rgba(225,29,72,0.18)"
                            : "none",
                        }}
                      />
                    </div>
                    <span
                      className="text-[13px] transition-colors duration-300"
                      style={{
                        color: aff.visible
                          ? "rgba(225,29,72,0.85)"
                          : "rgba(255,255,255,0.18)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {aff.label}
                    </span>
                    {!aff.visible && (
                      <span
                        className="text-[9px] text-white/15 ml-auto"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        not yet visible
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="flex items-start justify-between border-t border-white/[0.06] pt-5">
          <p className="text-[13px] text-white/50 leading-[1.7] max-w-[30ch]">
            {level.description}
          </p>
          <p
            className="text-[10px] tracking-[0.15em] text-white/30 text-right"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {level.subtext}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ConstraintLevers
   Shows the practitioner's three levers. Organism = locked.
   Task + Environment = adjustable. Behavior output changes.
───────────────────────────────────────────────────────────────────── */
type ConstraintLevel = "low" | "medium" | "high";

const TASK_OPTIONS: Record<ConstraintLevel, { label: string; example: string }> = {
  low: { label: "Open / undirected", example: "Just play. No rules, no objectives." },
  medium: { label: "Structured goal", example: "Score within 30 seconds. 4v4." },
  high: { label: "Tightly constrained", example: "One-touch only. Must cross the line." },
};

const ENV_OPTIONS: Record<ConstraintLevel, { label: string; example: string }> = {
  low: { label: "Sterile / decontextualized", example: "Empty gym. No opponents. Cones." },
  medium: { label: "Partial context", example: "Half-sized space. Passive defenders." },
  high: { label: "Representative", example: "Full game context. Live pressure. Crowd." },
};

const BEHAVIOR_OUTPUTS: Record<string, string> = {
  "low-low": "Minimal decision-making. Motor patterns dominate. No transfer.",
  "low-medium": "Some problem-solving. Still context-free. Limited transfer.",
  "low-high": "Organism overwhelmed — too much environment, not enough structure.",
  "medium-low": "Structured execution. Good for repetition. Poor perceptual training.",
  "medium-medium": "Solid training zone. Developing decision-making with some context.",
  "medium-high": "High representativeness. Perceptual coupling begins to develop.",
  "high-low": "Artificial complexity. Difficult without environmental information.",
  "high-medium": "Demanding but manageable. Forces rapid adaptation.",
  "high-high": "Competition-level. High stress, high transfer. Use sparingly.",
};

export function ConstraintLevers() {
  const [task, setTask] = useState<ConstraintLevel>("low");
  const [env, setEnv] = useState<ConstraintLevel>("low");

  const behaviorKey = `${task}-${env}`;
  const behavior = BEHAVIOR_OUTPUTS[behaviorKey];

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
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.022 }} />
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />
      <div className="relative z-10 p-6 sm:p-8">
        <div className="space-y-6 mb-8">

          {/* Organism — locked */}
          <div className="opacity-30">
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-[9px] tracking-[0.25em] uppercase text-white/40"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Organism constraint
              </p>
              <span
                className="text-[9px] tracking-[0.15em] uppercase text-white/20 border border-white/[0.10] px-2 py-0.5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                fixed — you can&apos;t change this directly
              </span>
            </div>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as ConstraintLevel[]).map((l) => (
                <div
                  key={l}
                  className="flex-1 py-2 text-center text-[10px] text-white/20 border border-white/[0.06]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* Task constraint */}
          <div>
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/40 mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Task constraint — adjust this
            </p>
            <div className="flex gap-0 mb-3 border border-white/[0.08]">
              {(["low", "medium", "high"] as ConstraintLevel[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setTask(l)}
                  className="relative flex-1 py-3.5 border-r border-white/[0.04] last:border-r-0"
                >
                  {task === l && (
                    <motion.div
                      layoutId="pill-task"
                      className="absolute inset-0 bg-white"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-10 text-[10px] tracking-[0.2em] uppercase transition-colors ${task === l ? "text-black font-semibold" : "text-white/25"}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {l}
                  </span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`task-${task}`}
                initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12px] text-white/40 leading-[1.6]"
              >
                {TASK_OPTIONS[task].example}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Environment constraint */}
          <div>
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/40 mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Environment constraint — adjust this
            </p>
            <div className="flex gap-0 mb-3 border border-white/[0.08]">
              {(["low", "medium", "high"] as ConstraintLevel[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setEnv(l)}
                  className="relative flex-1 py-3.5 border-r border-white/[0.04] last:border-r-0"
                >
                  {env === l && (
                    <motion.div
                      layoutId="pill-env"
                      className="absolute inset-0 bg-white"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-10 text-[10px] tracking-[0.2em] uppercase transition-colors ${env === l ? "text-black font-semibold" : "text-white/25"}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {l}
                  </span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`env-${env}`}
                initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12px] text-white/40 leading-[1.6]"
              >
                {ENV_OPTIONS[env].example}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Behavior output */}
        <AnimatePresence mode="wait">
          <motion.div
            key={behaviorKey}
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.08] pt-6"
            style={{
              borderLeft: "2px solid rgba(225,29,72,0.3)",
              background: "rgba(225,29,72,0.02)",
              paddingLeft: "1rem",
              marginLeft: "-1px",
            }}
          >
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Emerging behavior
            </p>
            <p className="text-[15px] text-white/70 leading-[1.75]">{behavior}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   EnvironmentTeaching
   Animated flow diagram: Instruction-led vs. Environment-led coaching.
───────────────────────────────────────────────────────────────────── */
function FlowNode({ label, dim = false, gold = false }: { label: string; dim?: boolean; gold?: boolean }) {
  return (
    <div
      className={`px-4 py-2.5 border text-center text-[11px] tracking-[0.1em] uppercase transition-all ${
        dim
          ? "border-white/[0.06] text-white/20"
          : gold
          ? "text-white/65"
          : "border-white/[0.18] text-white/65"
      }`}
      style={{
        fontFamily: "var(--font-mono)",
        borderColor: gold && !dim ? "rgba(225,29,72,0.25)" : undefined,
        color: gold && !dim ? "rgba(225,29,72,0.75)" : undefined,
      }}
    >
      {label}
    </div>
  );
}

function Arrow({ vertical = false, gold = false }: { vertical?: boolean; gold?: boolean }) {
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-center`}>
      <div
        className={`${vertical ? "w-[1px] h-6" : "h-[1px] w-6"}`}
        style={{ backgroundColor: gold ? "rgba(225,29,72,0.2)" : "rgba(255,255,255,0.12)" }}
      />
      <div
        className={`text-[8px]`}
        style={{ lineHeight: 1, color: gold ? "rgba(225,29,72,0.35)" : "rgba(255,255,255,0.20)" }}
      >
        {vertical ? "▼" : "▶"}
      </div>
    </div>
  );
}

export function EnvironmentTeaching() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-60px" });

  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);
  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={(el) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.022 }} />
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />
      <div className="relative z-10 p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* Instruction-led */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-5 text-center"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Traditional — instruction-led
            </p>
            <div className="flex flex-col items-center gap-2">
              <FlowNode label="Coach / teacher" />
              <Arrow vertical />
              <FlowNode label="Verbal instruction" />
              <Arrow vertical />
              <FlowNode label="Athlete processes" />
              <Arrow vertical />
              <FlowNode label="Movement output" />
              <div className="mt-4 w-full border border-white/[0.06] bg-white/[0.01] px-4 py-3">
                <p className="text-[11px] text-white/30 leading-[1.6] text-center">
                  Information flows from coach. Athlete is a receiver. Environment is a backdrop.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Environment-led */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-5 text-center"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Ecological — environment-led
            </p>
            <div className="flex flex-col items-center gap-2">
              <FlowNode label="Practitioner designs" gold />
              <Arrow vertical gold />
              <FlowNode label="Environment contains info" gold />
              <Arrow vertical gold />
              <FlowNode label="Organism perceives" gold />
              <Arrow vertical gold />
              <FlowNode label="Action emerges" gold />
              <div
                className="mt-4 w-full px-4 py-3"
                style={{
                  border: "1px solid rgba(225,29,72,0.2)",
                  background: "rgba(225,29,72,0.03)",
                }}
              >
                <p
                  className="text-[11px] leading-[1.6] text-center"
                  style={{ color: "rgba(225,29,72,0.65)" }}
                >
                  Information flows from environment. Athlete is an active agent. Coach designs the conditions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   InformationLandscape
   A visual showing an "environment" as a field of information nodes.
   An attunement slider reveals more nodes as skill develops.
   Shows that information was always there — the organism learns to see it.
───────────────────────────────────────────────────────────────────── */
const INFO_NODES = [
  { id: 1, x: 12, y: 18, label: "Opponent's weight", tier: 1 },
  { id: 2, x: 35, y: 28, label: "Open channel", tier: 1 },
  { id: 3, x: 62, y: 15, label: "Teammate's run", tier: 1 },
  { id: 4, x: 80, y: 35, label: "Defensive shape", tier: 2 },
  { id: 5, x: 22, y: 55, label: "Timing window", tier: 2 },
  { id: 6, x: 50, y: 50, label: "Space behind line", tier: 2 },
  { id: 7, x: 75, y: 62, label: "Pressure direction", tier: 3 },
  { id: 8, x: 10, y: 75, label: "Recovery angle", tier: 3 },
  { id: 9, x: 40, y: 78, label: "Transition trigger", tier: 3 },
  { id: 10, x: 88, y: 80, label: "Scoring probability", tier: 3 },
];

export function InformationLandscape() {
  const [attunement, setAttunement] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-60px" });

  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);
  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const labels = ["Novice", "Developing", "Expert"];

  // suppress useEffect lint warning — kept for potential side-effect hooks
  useEffect(() => {}, [attunement]);

  return (
    <div
      ref={(el) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.022 }} />
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />
      <div className="relative z-10 p-6 sm:p-8">
        <p
          className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          The information was always there. Attunement is the ability to perceive it.
        </p>

        {/* Attunement selector */}
        <div className="flex gap-0 mb-6 border border-white/[0.08]">
          {[1, 2, 3].map((level) => (
            <button
              key={level}
              onClick={() => setAttunement(level)}
              className="relative flex-1 py-3.5 border-r border-white/[0.04] last:border-r-0"
            >
              {attunement === level && (
                <motion.div
                  layoutId="pill-attunement"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 text-[10px] tracking-[0.2em] uppercase transition-colors ${attunement === level ? "text-black font-semibold" : "text-white/25"}`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {labels[level - 1]}
              </span>
            </button>
          ))}
        </div>

        {/* The "environment" — information nodes */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full bg-[#080806] border border-white/[0.06]"
          style={{ paddingBottom: "50%" }}
        >
          {INFO_NODES.map((node) => {
            const visible = node.tier <= attunement;
            return (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                animate={{
                  opacity: visible ? 1 : 0.08,
                  scale: visible ? 1 : 0.7,
                }}
                transition={{ duration: 0.4, delay: node.tier * 0.05 }}
              >
                {/* Gold glow dot */}
                <div className="relative flex items-center justify-center mb-1" style={{ width: 8, height: 8 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      flexShrink: 0,
                      backgroundColor: visible
                        ? "rgba(225,29,72,0.8)"
                        : "rgba(255,255,255,0.07)",
                      boxShadow: visible
                        ? "0 0 10px rgba(225,29,72,0.55), 0 0 24px rgba(225,29,72,0.18)"
                        : "none",
                    }}
                  />
                  {/* Pulsing ring for visible nodes */}
                  {visible && (
                    <motion.div
                      className="absolute"
                      style={{
                        width: 12,
                        height: 12,
                        border: "1px solid rgba(225,29,72,0.5)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.0,
                        ease: "easeOut",
                        repeatDelay: 0.5,
                      }}
                    />
                  )}
                </div>
                <p
                  className="text-[8px] text-center whitespace-nowrap hidden sm:block"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: visible
                      ? "rgba(225,29,72,0.5)"
                      : "rgba(255,255,255,0.08)",
                  }}
                >
                  {node.label}
                </p>
              </motion.div>
            );
          })}

          {/* Attunement level overlay */}
          <div className="absolute bottom-3 right-3">
            <p
              className="text-[9px] tracking-[0.15em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.20)",
              }}
            >
              {INFO_NODES.filter((n) => n.tier <= attunement).length}/{INFO_NODES.length} signals visible
            </p>
          </div>
        </motion.div>

        <p className="text-[12px] text-white/30 leading-[1.65] mt-4">
          The environment doesn&apos;t change as the athlete develops. The athlete&apos;s ability to
          perceive the information within it does. Attunement is the expansion of what you can see.
        </p>
      </div>
    </div>
  );
}
