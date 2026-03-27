"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   AttunementTimeline
   Four stages of perceptual development. Animated progression showing
   what the organism perceives at each stage — and how time "changes."
───────────────────────────────────────────────────────────────────── */
const STAGES = [
  {
    id: 1,
    label: "Stage 01",
    title: "Object level",
    timeFeeling: "Everything is fast",
    description:
      "The ball. The goal. The basic task. Surface features dominate. Processing is effortful because nothing is yet automatic.",
    perceives: ["The object", "The immediate task", "Basic spatial position"],
    misses: ["Teammate movement", "Defensive shape", "Timing windows", "Transition triggers"],
    barWidth: "20%",
  },
  {
    id: 2,
    label: "Stage 02",
    title: "Structural level",
    timeFeeling: "Moments of clarity",
    description:
      "Relationships between elements begin to register. Teammates exist as more than bodies — they're options. The situation has structure.",
    perceives: ["The object", "The immediate task", "Basic spatial position", "Teammate positions", "Basic defensive shape"],
    misses: ["Defensive movement intention", "Timing windows", "Transition triggers"],
    barWidth: "45%",
  },
  {
    id: 3,
    label: "Stage 03",
    title: "Pattern level",
    timeFeeling: "The game slows",
    description:
      "Patterns become visible before they fully materialize. The defender's weight shift tells you what they're going to do before they do it.",
    perceives: ["The object", "The immediate task", "Basic spatial position", "Teammate positions", "Defensive shape", "Movement intention", "Timing windows"],
    misses: ["Transition triggers"],
    barWidth: "75%",
  },
  {
    id: 4,
    label: "Stage 04",
    title: "Flow level",
    timeFeeling: "Time barely exists",
    description:
      "The game reads as a living system. Information arrives pre-consciously. Action happens before the decision is consciously formed.",
    perceives: ["The object", "The immediate task", "Basic spatial position", "Teammate positions", "Defensive shape", "Movement intention", "Timing windows", "Transition triggers"],
    misses: [],
    barWidth: "100%",
  },
];

export function AttunementTimeline() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const stage = STAGES[active];

  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);

  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{
        borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined,
        transition: "border-color 0.4s ease",
      }}
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

      <div className="relative z-10 p-6 sm:p-8">
        {/* Stage selector */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-0 mb-8 border border-white/[0.08] relative"
        >
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="relative flex-1 py-3 border-r border-white/[0.04] last:border-r-0"
            >
              {active === i && (
                <motion.div
                  layoutId="timeline-pill"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors ${
                  active === i ? "text-black font-semibold" : "text-white/25"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {s.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Stage content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <p
                className="text-[18px] text-white/80"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
              >
                {stage.title}
              </p>
              <span
                className="text-[10px] tracking-[0.15em] text-white/30 border px-3 py-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  borderColor: "rgba(225,29,72,0.25)",
                }}
              >
                {stage.timeFeeling}
              </span>
            </div>

            <p className="text-[14px] text-white/55 leading-[1.75] mb-6">{stage.description}</p>

            {/* Gold perception bar */}
            <div className="mb-6">
              <p
                className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Perceptual richness
              </p>
              <div className="h-[3px] bg-white/[0.05] w-full">
                <motion.div
                  className="h-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(225,29,72,0.55), rgba(225,29,72,0.88))",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: stage.barWidth }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </div>

            {/* What the organism perceives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Perceivable
                </p>
                <div className="space-y-1.5">
                  {stage.perceives.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div
                        className="rounded-full flex-shrink-0"
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: "rgba(225,29,72,0.85)",
                          boxShadow: "0 0 8px rgba(225,29,72,0.5)",
                        }}
                      />
                      <span className="text-[12px] text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Not yet visible
                </p>
                <div className="space-y-1.5">
                  {stage.misses.length === 0 ? (
                    <p className="text-[12px] text-white/25 italic">
                      Nothing. The game is fully legible.
                    </p>
                  ) : (
                    stage.misses.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div
                          className="rounded-full flex-shrink-0"
                          style={{
                            width: 8,
                            height: 8,
                            backgroundColor: "rgba(255,255,255,0.08)",
                          }}
                        />
                        <span className="text-[12px] text-white/22">{item}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   AttunementBlockers
   Three expandable cards — the three things that silently block
   the development of perceptual attunement.
───────────────────────────────────────────────────────────────────── */
const BLOCKERS = [
  {
    id: "instruction",
    number: "01",
    title: "Premature instruction",
    short: "The coach who answers the question before the athlete can ask it.",
    long:
      "When you describe what to perceive before the organism has had the chance to encounter and struggle with the situation, you interrupt the discovery process. The athlete learns the description, not the perception. They can articulate what to look for. They cannot yet see it.",
    consequence:
      "Athletes become dependent on instruction for orientation. Remove the coach and they lose the thread. They never developed the perceptual antenna — they borrowed yours.",
    instead:
      "Let the situation generate the question first. When an athlete makes a decision you'd have made differently, resist the urge to explain. Let them play through the consequence. The experience is the instruction.",
  },
  {
    id: "repetition",
    number: "02",
    title: "Decontextualized repetition",
    short: "Getting very good at the wrong thing.",
    long:
      "When the practice environment strips out the perceptual information present in the performance environment, the organism attunes to the stripped environment. Repetition runs. The neurology adapts. But it adapts to a version of the task that doesn't exist in competition. The skill that develops is real — for that context.",
    consequence:
      "The athlete becomes expert at performing in the absence of the information they'll need in competition. They've attuned to silence. Performance environments are not silent.",
    instead:
      "Preserve the essential perceptual structure of the performance environment even when simplifying. You can reduce complexity — fewer players, smaller space, slower tempo. You cannot remove the informational structure without building attunement to its absence.",
  },
  {
    id: "noise",
    number: "03",
    title: "Noise",
    short: "Competing for attention with the environment.",
    long:
      "Every verbal cue a coach delivers during activity is noise competing with the environment's signal. The athlete who is processing your instruction is not processing what the environment is offering. You can only attend to one information source at a time. Most coaches have never considered that they might be the primary source of distortion in their athletes' perceptual development.",
    consequence:
      "Athletes who train in high-instruction environments develop a particular kind of learned helplessness: they wait for the signal from outside rather than reading the environment for themselves. Put them in a game with no coach narrating it and they struggle not because they lack skill but because they've never learned to read the world without a translator.",
    instead:
      "Deliberate periods of practitioner silence are not passive. They are the active withdrawal of noise so the environment's signal can be heard. Start with ten minutes. Then twenty. Notice what the athletes begin to perceive when they have no choice but to look.",
  },
];

export function AttunementBlockers() {
  const [expanded, setExpanded] = useState<string | null>(null);
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
      style={{
        borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined,
        transition: "border-color 0.4s ease",
      }}
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
        {BLOCKERS.map((blocker) => (
          <div
            key={blocker.id}
            className="border-b border-white/[0.06] last:border-b-0"
          >
            <button
              onClick={() => setExpanded(expanded === blocker.id ? null : blocker.id)}
              className="w-full text-left px-6 sm:px-8 py-5 flex items-start gap-5 hover:bg-white/[0.02] transition-colors"
            >
              <span
                className="text-[9px] tracking-[0.2em] text-white/25 flex-shrink-0 mt-0.5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {blocker.number}
              </span>
              <div className="flex-1">
                <p
                  className="text-[15px] text-white/75 mb-1"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
                >
                  {blocker.title}
                </p>
                <p className="text-[12px] text-white/35 leading-[1.6]">{blocker.short}</p>
              </div>
              <span
                className="text-[14px] flex-shrink-0 mt-1 transition-colors"
                style={{
                  color:
                    expanded === blocker.id ? "rgba(225,29,72,0.85)" : "rgba(255,255,255,0.2)",
                }}
              >
                {expanded === blocker.id ? "−" : "+"}
              </span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expanded === blocker.id ? "auto" : 0,
                opacity: expanded === blocker.id ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 pb-6 pl-[calc(1.5rem+2rem+1.25rem)] sm:pl-[calc(2rem+2rem+1.25rem)]">
                <p className="text-[14px] text-white/60 leading-[1.8] mb-5">{blocker.long}</p>

                <div className="mb-5 border-l-2 border-white/[0.10] pl-4">
                  <p
                    className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    What it produces
                  </p>
                  <p
                    className="text-[13px] text-white/45 leading-[1.75] italic"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {blocker.consequence}
                  </p>
                </div>

                <div
                  className="bg-white/[0.02] px-5 py-4"
                  style={{
                    borderLeft: "2px solid rgba(225,29,72,0.3)",
                  }}
                >
                  <p
                    className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Instead
                  </p>
                  <p className="text-[13px] text-white/60 leading-[1.75]">{blocker.instead}</p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SignalNoiseSplit
   A field of information. Slider adjusts attunement.
   Signal brightens. Noise stays dim. Shows perceptual discrimination.
───────────────────────────────────────────────────────────────────── */
const FIELD_NODES = [
  // Signal nodes — relevant perceptual information
  { id: 1, x: 15, y: 20, type: "signal", label: "Defender weight shift" },
  { id: 2, x: 42, y: 15, type: "signal", label: "Passing lane open" },
  { id: 3, x: 70, y: 25, type: "signal", label: "Teammate's run" },
  { id: 4, x: 28, y: 60, type: "signal", label: "Transition moment" },
  { id: 5, x: 60, y: 65, type: "signal", label: "Pressure angle" },
  { id: 6, x: 85, y: 50, type: "signal", label: "Scoring window" },
  // Noise nodes — irrelevant or low-priority information
  { id: 7, x: 8, y: 50, type: "noise", label: "Crowd movement" },
  { id: 8, x: 35, y: 38, type: "noise", label: "Coach's voice" },
  { id: 9, x: 55, y: 40, type: "noise", label: "Scoreboard" },
  { id: 10, x: 78, y: 72, type: "noise", label: "Previous play" },
  { id: 11, x: 20, y: 80, type: "noise", label: "Opponent chatter" },
  { id: 12, x: 90, y: 20, type: "noise", label: "Weather" },
];

export function SignalNoiseSplit() {
  const [attunement, setAttunement] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);

  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const labels = ["Undifferentiated", "Emerging discrimination", "Clean signal"];

  const getSignalNodeStyle = (att: number) => {
    if (att === 3) return { backgroundColor: "rgba(225,29,72,0.9)", boxShadow: "0 0 12px rgba(225,29,72,0.6)" };
    if (att === 2) return { backgroundColor: "rgba(225,29,72,0.5)" };
    return { backgroundColor: "rgba(255,255,255,0.25)" };
  };

  return (
    <div
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{
        borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined,
        transition: "border-color 0.4s ease",
      }}
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

      <div className="relative z-10 p-6 sm:p-8">
        {/* Attunement level tabs — spring pill */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-0 mb-6 border border-white/[0.08] relative"
        >
          {[1, 2, 3].map((level) => (
            <button
              key={level}
              onClick={() => setAttunement(level)}
              className="relative flex-1 py-3 border-r border-white/[0.04] last:border-r-0"
            >
              {attunement === level && (
                <motion.div
                  layoutId="signal-pill"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 text-[10px] tracking-[0.1em] uppercase transition-colors ${
                  attunement === level ? "text-black font-semibold" : "text-white/25"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {labels[level - 1]}
              </span>
            </button>
          ))}
        </motion.div>

        {/* The field */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative w-full bg-[#080806] border border-white/[0.06] mb-4"
          style={{ paddingBottom: "45%" }}
        >
          {/* Legend */}
          <div className="absolute top-3 right-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "rgba(225,29,72,0.85)",
                  boxShadow: "0 0 8px rgba(225,29,72,0.5)",
                }}
              />
              <span
                className="text-[8px] text-white/30"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                signal
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  outline: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              <span
                className="text-[8px] text-white/20"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                noise
              </span>
            </div>
          </div>

          {FIELD_NODES.map((node) => {
            const isSignal = node.type === "signal";
            const noiseOpacity = [0.25, 0.12, 0.06][attunement - 1];
            const nodeStyle = isSignal
              ? getSignalNodeStyle(attunement)
              : { backgroundColor: "rgba(255,255,255,0.06)" };
            const labelOpacity = isSignal
              ? [0.25, 0.55, 0.85][attunement - 1]
              : noiseOpacity;

            return (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  opacity: isSignal ? [0.25, 0.55, 0.85][attunement - 1] : noiseOpacity,
                  scale: isSignal && attunement === 3 ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative mb-1 flex-shrink-0">
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: isSignal ? (attunement === 3 ? 10 : 8) : 6,
                      height: isSignal ? (attunement === 3 ? 10 : 8) : 6,
                      ...nodeStyle,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ flexShrink: 0 }}
                  />
                  {/* Pulsing ring for clean signal nodes */}
                  {isSignal && attunement === 3 && (
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: 0,
                        border: "1px solid rgba(225,29,72,0.4)",
                        borderRadius: "50%",
                      }}
                      animate={{ scale: [1, 2.0], opacity: [0.6, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.0,
                        ease: "easeOut",
                        repeatDelay: 0.4,
                      }}
                    />
                  )}
                </div>
                <p
                  className="text-[7px] text-center whitespace-nowrap hidden sm:block"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: `rgba(255,255,255,${labelOpacity * 0.7})`,
                  }}
                >
                  {node.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="text-[12px] text-white/30 leading-[1.65]">
          The information field doesn&apos;t change. Signal and noise are always both present.
          Attunement is the nervous system&apos;s ability to amplify what matters and suppress what
          doesn&apos;t. This discrimination is not cognitive — it&apos;s perceptual. It develops through
          time in environments where the distinction between signal and noise has real consequences.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ObservationLens
   Two observation modes: error-scanning vs. pattern-reading.
   Animated to show how the same practice session looks different
   depending on what lens the practitioner is wearing.
───────────────────────────────────────────────────────────────────── */
const ERROR_LENS = [
  "Player arrived late to the ball",
  "Poor first touch — too heavy",
  "Didn't call for the pass",
  "Wrong foot on the turn",
  "Lost their mark on the corner",
  "Looked down instead of up",
];

const PATTERN_LENS = [
  "When pressure came left, the team defaulted to long",
  "Transition speed was high in the first 10 minutes, dropped after",
  "The left channel opened every time the right midfielder committed",
  "Set pieces collapsed — not technique, informational — no one scanning",
  "Ball-carrier consistently read pressure well but teammates weren't moving to create options",
  "Fatigue affected decision speed more than movement quality",
];

export function ObservationLens() {
  const [mode, setMode] = useState<"error" | "pattern">("error");
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);

  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{
        borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined,
        transition: "border-color 0.4s ease",
      }}
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

      <div className="relative z-10 p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Same practice session — two different lenses
          </p>

          {/* Spring pill tab toggle */}
          <div className="flex gap-0 mb-6 border border-white/[0.08] relative">
            <button
              onClick={() => setMode("error")}
              className="relative flex-1 py-3 border-r border-white/[0.04]"
            >
              {mode === "error" && (
                <motion.div
                  layoutId="lens-pill"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  mode === "error" ? "text-black font-semibold" : "text-white/25"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Error-scanning lens
              </span>
            </button>
            <button
              onClick={() => setMode("pattern")}
              className="relative flex-1 py-3"
            >
              {mode === "pattern" && (
                <motion.div
                  layoutId="lens-pill"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  mode === "pattern" ? "text-black font-semibold" : "text-white/25"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Pattern-reading lens
              </span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            {(mode === "error" ? ERROR_LENS : PATTERN_LENS).map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: mode === "error" ? -8 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="flex items-start gap-4 py-2.5 border-b border-white/[0.04] last:border-b-0"
                style={
                  mode === "pattern"
                    ? { borderLeft: "1px solid rgba(225,29,72,0.2)", paddingLeft: "12px" }
                    : undefined
                }
              >
                <span
                  className="text-[9px] text-white/20 flex-shrink-0 mt-0.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className={`text-[13px] leading-[1.65] ${
                    mode === "error" ? "text-white/40" : "text-white/65"
                  }`}
                >
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={mode + "-desc"}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.25 }}
              className="text-[12px] text-white/30 leading-[1.65]"
            >
              {mode === "error"
                ? "Error-scanning produces a list of corrections. Each one is locally true and globally incomplete. You end the session knowing what went wrong. You don't know why the environment produced it."
                : "Pattern-reading produces a map of the system. You see cause-effect chains, not isolated errors. Each observation connects to the environment that generated it. You leave knowing what to design differently."}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
