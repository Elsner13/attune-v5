"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   PerceptionActionLoop
   Animated diagram: Organism perceives → Action → Environment changes
   → New perceptual info → Organism perceives again. Shows what breaks
   when you train action divorced from its perceptual context.
───────────────────────────────────────────────────────────────────── */
export function PerceptionActionLoop() {
  const [broken, setBroken] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Spotlight state
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);
  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const nodes = [
    { id: "perceive", label: "Organism perceives", sub: "reads environmental information", x: 50, y: 8 },
    { id: "decide",  label: "Decision forms",     sub: "action possibility selected",      x: 88, y: 42 },
    { id: "act",     label: "Action taken",        sub: "movement executed",                x: 68, y: 82 },
    { id: "change",  label: "Environment changes", sub: "new state created by action",      x: 32, y: 82 },
    { id: "info",    label: "New information",     sub: "environment responds",             x: 12, y: 42 },
  ];

  return (
    <div
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden p-6 sm:p-8"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.022,
        }}
      />
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: spotActive ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Toggle */}
        <div className="flex gap-0 mb-8 border border-white/[0.08]">
          <button
            onClick={() => setBroken(false)}
            className="relative flex-1 py-3 border-r border-white/[0.04] last:border-r-0"
          >
            {!broken && (
              <motion.div
                layoutId="pal-tab-pill"
                className="absolute inset-0 bg-white"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span
              className={`relative z-10 text-[10px] tracking-[0.2em] uppercase transition-colors ${
                !broken ? "text-black font-semibold" : "text-white/25"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Coupled loop
            </span>
          </button>
          <button
            onClick={() => setBroken(true)}
            className="relative flex-1 py-3 border-r border-white/[0.04] last:border-r-0"
          >
            {broken && (
              <motion.div
                layoutId="pal-tab-pill"
                className="absolute inset-0 bg-white"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span
              className={`relative z-10 text-[10px] tracking-[0.2em] uppercase transition-colors ${
                broken ? "text-black font-semibold" : "text-white/25"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Broken loop
            </span>
          </button>
        </div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative w-full"
          style={{ paddingBottom: "80%" }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* SVG filter for glow */}
            <defs>
              <filter id="glow-dot">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection arcs */}
            {nodes.map((node, i) => {
              const next = nodes[(i + 1) % nodes.length];
              const isBrokenEdge = broken && (i === 0 || i === 1);
              return (
                <motion.line
                  key={`edge-${i}`}
                  x1={node.x} y1={node.y + 4}
                  x2={next.x} y2={next.y + 4}
                  animate={{
                    stroke: isBrokenEdge ? "rgba(255,255,255,0.04)" : "rgba(225,29,72,0.20)",
                    strokeDasharray: isBrokenEdge ? "2 3" : "0",
                  }}
                  transition={{ duration: 0.4 }}
                  strokeWidth="0.4"
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node, i) => {
              const isFaded = broken && (i === 0 || i === 1);
              return (
                <motion.g key={node.id}>
                  <motion.rect
                    x={node.x - 14} y={node.y - 3}
                    width={28} height={7}
                    animate={{
                      fill: isFaded ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                      stroke: isFaded ? "rgba(255,255,255,0.04)" : "rgba(225,29,72,0.25)",
                    }}
                    transition={{ duration: 0.4 }}
                    strokeWidth="0.3"
                  />
                  <motion.text
                    x={node.x} y={node.y + 0.5}
                    textAnchor="middle"
                    fontSize="2.2"
                    animate={{ fill: isFaded ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.75)" }}
                    transition={{ duration: 0.4 }}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {node.label}
                  </motion.text>
                  <motion.text
                    x={node.x} y={node.y + 3}
                    textAnchor="middle"
                    fontSize="1.6"
                    animate={{ fill: isFaded ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.30)" }}
                    transition={{ duration: 0.4 }}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {node.sub}
                  </motion.text>
                </motion.g>
              );
            })}

            {/* Traveling gold dot — only when loop is coupled */}
            {!broken && (
              <motion.circle
                r="1.2"
                fill="rgba(225,29,72,0.9)"
                filter="url(#glow-dot)"
                animate={{
                  cx: [nodes[0].x, nodes[1].x, nodes[2].x, nodes[3].x, nodes[4].x, nodes[0].x],
                  cy: [nodes[0].y + 4, nodes[1].y + 4, nodes[2].y + 4, nodes[3].y + 4, nodes[4].y + 4, nodes[0].y + 4],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </svg>
        </motion.div>

        {/* Explanation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={broken ? "broken" : "coupled"}
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.06] pt-5 mt-2"
          >
            <p className="text-[13px] text-white/50 leading-[1.75]">
              {broken
                ? "When you train action divorced from its perceptual context — drills with pre-scripted responses, blocked practice, technique work with no environmental information — the perception and decision nodes atrophy. The action node is trained. The rest of the loop is not. Under pressure, the full loop is required. The trained fragment doesn't fill the gap."
                : "The full loop is always running in performance. Perception informs decision. Decision produces action. Action changes the environment. The changed environment generates new perceptual information. Each stage depends on the previous one. You cannot train one stage in isolation and expect the loop to function when reassembled under pressure."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CoupledVsDecoupled
   Side-by-side: what gets trained when you separate perception from
   action vs. when you train them together.
───────────────────────────────────────────────────────────────────── */
const DECOUPLED_TRAINS = [
  { label: "Motor pattern execution", trained: true },
  { label: "Movement consistency", trained: true },
  { label: "Physical conditioning", trained: true },
  { label: "Technique under no load", trained: true },
  { label: "Reading environmental information", trained: false },
  { label: "Decision under perceptual pressure", trained: false },
  { label: "Coupling movement to context", trained: false },
  { label: "Transfer to performance", trained: false },
];

const COUPLED_TRAINS = [
  { label: "Motor pattern execution", trained: true },
  { label: "Movement consistency", trained: true },
  { label: "Physical conditioning", trained: true },
  { label: "Technique under no load", trained: false },
  { label: "Reading environmental information", trained: true },
  { label: "Decision under perceptual pressure", trained: true },
  { label: "Coupling movement to context", trained: true },
  { label: "Transfer to performance", trained: true },
];

export function CoupledVsDecoupled() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Spotlight state
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
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden p-6 sm:p-8"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.022,
        }}
      />
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: spotActive ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Decoupled */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Decoupled training
            </p>
            <p className="text-[12px] text-white/35 mb-5 leading-[1.6]">
              Action trained without perceptual context. Blocked drills, pre-scripted responses, technique isolation.
            </p>
            <div className="space-y-2">
              {DECOUPLED_TRAINS.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 flex-shrink-0"
                    style={{
                      backgroundColor: item.trained
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(255,255,255,0.05)",
                      outline: item.trained ? "none" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                  <span
                    className="text-[12px] leading-[1.5]"
                    style={{ color: item.trained ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.18)" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Coupled */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Coupled training
            </p>
            <p className="text-[12px] text-white/35 mb-5 leading-[1.6]">
              Perception and action trained together. Movement is determined by reading environmental information.
            </p>
            <div className="space-y-2">
              {COUPLED_TRAINS.map((item) => {
                const isTransfer = item.label === "Transfer to performance";
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 flex-shrink-0"
                      style={{
                        backgroundColor: item.trained
                          ? "rgba(225,29,72,0.8)"
                          : "rgba(255,255,255,0.05)",
                        outline: item.trained ? "none" : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isTransfer && item.trained
                          ? "0 0 10px rgba(225,29,72,0.5)"
                          : "none",
                      }}
                    />
                    <span
                      className="text-[12px] leading-[1.5]"
                      style={{
                        color: isTransfer && item.trained
                          ? "rgba(255,255,255,0.90)"
                          : item.trained
                          ? "rgba(255,255,255,0.75)"
                          : "rgba(255,255,255,0.18)",
                        fontWeight: isTransfer && item.trained ? 500 : undefined,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   UncertaintySpectrum
   From fully predictable (zero perceptual demand) to fully uncertain
   (maximum perceptual demand). Shows what each level trains.
───────────────────────────────────────────────────────────────────── */
const UNCERTAINTY_LEVELS = [
  {
    id: "blocked",
    label: "Blocked",
    position: 5,
    description: "Same stimulus, same response, every rep. Ball machine at fixed speed and angle.",
    perceptualDemand: "None — the response is predetermined before the stimulus arrives.",
    trains: "Motor pattern consistency. Useful for early-stage movement acquisition only.",
    risk: "Athlete learns to initiate movement before reading the environment. Habit becomes liability under novel conditions.",
  },
  {
    id: "variable",
    label: "Variable",
    position: 28,
    description: "Same task, varied stimulus parameters. Ball machine at varying speeds and angles.",
    perceptualDemand: "Low — organism must read a variable but predictable class of stimuli.",
    trains: "Motor adaptability within a known stimulus category. Some perceptual calibration.",
    risk: "Variability is within a narrow range. Novel stimulus classes (performance conditions) still collapse the pattern.",
  },
  {
    id: "random",
    label: "Random",
    position: 52,
    description: "Unpredictable order of known conditions. Defender can go left or right — which is unknown until the last moment.",
    perceptualDemand: "Moderate — organism cannot predict stimulus, must read and respond in real time.",
    trains: "Decision speed, reading environmental information, coupling movement to context.",
    risk: "Still a closed set of known possibilities. Novel situations not yet represented.",
  },
  {
    id: "representative",
    label: "Representative",
    position: 75,
    description: "Performance-like uncertainty. Small-sided game where the environment evolves unpredictably based on all players' actions.",
    perceptualDemand: "High — stimulus class is open-ended. Organism must attune to complex, dynamic information.",
    trains: "Full perception-action coupling. Attunement to performance-level information density.",
    risk: "Can be cognitively overwhelming for novices. Must be calibrated to organism's current perceptual capacity.",
  },
  {
    id: "overload",
    label: "Overload",
    position: 95,
    description: "Maximum uncertainty. Conditions exceed current perceptual capacity deliberately.",
    perceptualDemand: "Very high — organism is pushed beyond current attunement. Error rates spike.",
    trains: "Perceptual stretch. Forces the system to seek new couplings. Short bursts only.",
    risk: "Too much time here produces avoidance and learned helplessness. Use sparingly, with recovery periods.",
  },
];

export function UncertaintySpectrum() {
  const [active, setActive] = useState(2);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const level = UNCERTAINTY_LEVELS[active];

  // Spotlight state
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
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden p-6 sm:p-8"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.022,
        }}
      />
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: spotActive ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Spectrum bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-[9px] text-white/20" style={{ fontFamily: "var(--font-mono)" }}>
              Predictable
            </span>
            <span className="text-[9px] text-white/20" style={{ fontFamily: "var(--font-mono)" }}>
              Uncertain
            </span>
          </div>
          <div className="relative h-[2px] bg-white/[0.06]">
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ background: "linear-gradient(90deg, rgba(225,29,72,0.4), rgba(225,29,72,0.7))" }}
              animate={{ width: `${level.position}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            {UNCERTAINTY_LEVELS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setActive(i)}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${l.position}%` }}
              >
                <motion.div
                  animate={{
                    width: active === i ? 12 : 7,
                    height: active === i ? 12 : 7,
                    backgroundColor: active === i ? "rgba(225,29,72,0.9)" : "rgba(255,255,255,0.2)",
                    boxShadow: active === i ? "0 0 12px rgba(225,29,72,0.6)" : "none",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            ))}
          </div>
          <div className="relative mt-4 h-6">
            {UNCERTAINTY_LEVELS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setActive(i)}
                className="absolute -translate-x-1/2"
                style={{ left: `${l.position}%` }}
              >
                <p
                  className={`text-[9px] tracking-[0.1em] uppercase whitespace-nowrap transition-colors ${
                    active === i ? "text-white/60" : "text-white/15"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {l.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={level.id}
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <p
              className="text-[14px] text-white/60 leading-[1.75] pl-4"
              style={{
                borderLeft: level.id === "representative"
                  ? "2px solid rgba(225,29,72,0.4)"
                  : "2px solid rgba(255,255,255,0.08)",
              }}
            >
              {level.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Perceptual demand", value: level.perceptualDemand },
                { label: "What it trains", value: level.trains },
                { label: "Risk if overused", value: level.risk },
              ].map(({ label, value }) => (
                <div key={label} className="border border-white/[0.06] bg-white/[0.01] px-4 py-4">
                  <p
                    className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {label}
                  </p>
                  <p className="text-[12px] text-white/50 leading-[1.7]">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PerceptionFirstExamples
   Four practice activities designed perception-first.
   Movement is determined entirely by reading environmental information.
───────────────────────────────────────────────────────────────────── */
const PERCEPTION_FIRST = [
  {
    id: "shadow",
    domain: "Team sport",
    activity: "Shadow defender",
    description:
      "An attacker moves freely in a defined space. A defender shadows them, maintaining a set distance without the ball. The attacker's movement is determined entirely by where the defender is and the space that opens.",
    whatTheyRead: [
      "Defender's body orientation",
      "Defender's weight distribution",
      "Distance to boundary",
      "Rate of defender's recovery",
    ],
    movementDetermined: "Where the space is — which changes continuously based on the defender's position.",
    noPreset: "There is no preset move. The movement that emerges is the correct one for the information present.",
  },
  {
    id: "reactive-finish",
    domain: "Individual sport",
    activity: "Reactive finishing",
    description:
      "Goalkeeper sets their position before the shot is taken. The shooter must read the goalkeeper's position and commit to a side based on what they see — not a predetermined target.",
    whatTheyRead: [
      "Goalkeeper's body position",
      "Weight distribution left vs. right",
      "Distance from post",
      "Timing of goalkeeper's movement",
    ],
    movementDetermined: "Which side of the goal to shoot at — the answer changes with every goalkeeper position.",
    noPreset: "Athletes who approach with a predetermined side chosen before reading will consistently hit the goalkeeper.",
  },
  {
    id: "go-nogo",
    domain: "Any",
    activity: "Go / No-Go decision",
    description:
      "Athlete prepares to execute a movement. A signal in the environment — a color, a sound, a person's position — determines in real time whether to proceed or abort. The action is identical either way if the signal says go. The decision is entirely perceptual.",
    whatTheyRead: [
      "The signal cue (color / sound / position)",
      "Timing of signal appearance",
      "Own momentum and body position",
    ],
    movementDetermined: "Whether to act at all — and when. The physical preparation is preset; the execution is gated by perception.",
    noPreset: "The athlete cannot know in advance whether to go. They must read and respond in real time. This is what competition demands.",
  },
  {
    id: "constraint-read",
    domain: "Education / professional",
    activity: "Information-gated response",
    description:
      "In a presentation or teaching context: the speaker has prepared three possible responses to the next question. Which one they deliver is determined by reading the audience's engagement signal — posture, facial cues, energy in the room.",
    whatTheyRead: [
      "Audience body language",
      "Energy level in the room",
      "Prior response to the material",
      "Questions asked vs. not asked",
    ],
    movementDetermined: "Which prepared response fits the audience's actual state — not the state you assumed they'd be in.",
    noPreset: "The content is prepared. The selection is perception-driven. This is professional attunement in non-sport domains.",
  },
];

export function PerceptionFirstExamples() {
  const [active, setActive] = useState(0);
  const example = PERCEPTION_FIRST[active];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Spotlight state
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
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{ borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined, transition: "border-color 0.4s ease" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.022,
        }}
      />
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: spotActive ? 1 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Tabs */}
        <div className="flex border-b border-white/[0.06] overflow-x-auto">
          {PERCEPTION_FIRST.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setActive(i)}
              className="relative flex-shrink-0 px-5 sm:px-6 py-4 text-left border-r border-white/[0.04] last:border-r-0"
            >
              {/* Spring pill for active tab background */}
              {active === i && (
                <motion.div
                  layoutId="pfe-tab-pill"
                  className="absolute inset-0 bg-white/[0.04]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              {/* Gold underline for active tab */}
              {active === i && (
                <motion.div
                  layoutId="pfe-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "rgba(225,29,72,0.6)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <p
                className={`relative z-10 text-[9px] tracking-[0.15em] uppercase mb-0.5 transition-colors ${
                  active === i ? "text-white/50" : "text-white/15"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {ex.domain}
              </p>
              <p
                className={`relative z-10 text-[12px] transition-colors whitespace-nowrap ${
                  active === i ? "text-white/75" : "text-white/25"
                }`}
              >
                {ex.activity}
              </p>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={example.id}
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 space-y-6"
          >
            <p className="text-[14px] text-white/60 leading-[1.8]">{example.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  What they must read
                </p>
                <div className="space-y-2">
                  {example.whatTheyRead.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 flex-shrink-0 mt-1"
                        style={{ backgroundColor: "rgba(225,29,72,0.8)" }}
                      />
                      <span className="text-[12px] text-white/55 leading-[1.6]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div
                  className="border px-4 py-4"
                  style={{
                    borderColor: "rgba(225,29,72,0.25)",
                    background: "rgba(225,29,72,0.03)",
                  }}
                >
                  <p
                    className="text-[9px] tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: "var(--font-mono)", color: "rgba(225,29,72,0.6)" }}
                  >
                    Movement determined by
                  </p>
                  <p className="text-[12px] text-white/60 leading-[1.7]">{example.movementDetermined}</p>
                </div>
                <div className="border-l-2 border-white/[0.10] pl-4">
                  <p
                    className="text-[12px] text-white/40 leading-[1.7] italic"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {example.noPreset}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
