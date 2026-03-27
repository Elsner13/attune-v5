"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   AnimatedNum helper — counts up to value when inView
───────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────
   CueToDesign
   Reverse-engineers common verbal cues into environment design problems.
   Pick a cue → see what it reveals → get the design alternative.
───────────────────────────────────────────────────────────────────── */
const CUES = [
  {
    id: "head-up",
    cue: '"Head up!"',
    domain: "Sport",
    reveals:
      "The drill doesn't require the athlete to read anything. There's no information in the environment that demands heads-up scanning — so the head stays down. The cue is substituting for the environmental pressure that would make the behavior necessary.",
    design:
      "Introduce an element the athlete must scan for before acting. A defender whose position determines the pass. A target that appears only when the athlete looks up. Scoring that rewards decisions made from information gathered by scanning.",
  },
  {
    id: "communicate",
    cue: '"Communicate!"',
    domain: "Team sport",
    reveals:
      "Communication isn't demanded by the environment. Players can succeed in the drill without talking because the activity doesn't create situations where shared information is required for the task to succeed.",
    design:
      "Design tasks where a player can only proceed with information another player has. Restricted vision drills where one player calls movement for another. Activities where miscommunication has an immediate, visible consequence — not a correction from you afterward.",
  },
  {
    id: "first-touch",
    cue: '"Better first touch!"',
    domain: "Technical",
    reveals:
      "The ball is arriving in conditions unlike the performance environment — no pressure, predictable flight, controlled pace. The organism has learned a first touch for that context. The performance context delivers the ball differently. The technique is correct for the wrong environment.",
    design:
      "Vary ball delivery to match performance conditions. Introduce a passive defender at the point of reception. Change the angle, pace, and height of delivery. Make the first touch decision-dependent: where the touch goes is determined by environmental information present at the moment of reception.",
  },
  {
    id: "move-to-space",
    cue: '"Move to space!"',
    domain: "Team sport",
    reveals:
      "Movement off the ball isn't demanded by task structure. The activity can be completed without creating or using space, so players don't. This isn't laziness — it's the rational response to an environment that doesn't make space-creation necessary.",
    design:
      "Constrain the activity so that movement creates the only path to success. One-touch rule forces anticipatory movement. Small spaces with numerical disadvantage make space creation the survival mechanism. Scoring rules that reward width or depth.",
  },
  {
    id: "decision-making",
    cue: '"Think faster!"',
    domain: "Any",
    reveals:
      "Decision speed in practice is fine — it's decision speed under novel environmental information that collapses. The practice environment is too familiar. Players have learned the patterns, so their decisions are retrievals, not readings. Put them in a genuinely novel constraint and watch decision speed drop.",
    design:
      "Vary the environment randomly enough that no drill can be solved by pattern retrieval. Change the defensive structure mid-activity. Introduce unknown variables — a joker player, changing scoring zones, modified rules announced mid-play. Make reading mandatory.",
  },
  {
    id: "dont-rush",
    cue: '"Don\'t rush it!"',
    domain: "Any",
    reveals:
      "Time pressure in the practice environment doesn't match the performance environment. Either there's too much time and players are learning a slow tempo, or the time pressure is artificial (a clock) rather than ecological (a defender closing). The behavior is a rational response to the actual constraints present.",
    design:
      "Replace artificial time pressure with ecological time pressure. A defender who actively closes. A scoring window that opens and closes based on movement. Delayed support that makes quick action the only viable option. Time pressure that emerges from the environment rather than being imposed from outside it.",
  },
];

export function CueToDesign() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);
  const cue = CUES[active];

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
      {/* Dot grid overlay */}
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
        {/* Cue selector */}
        <div className="border-b border-white/[0.06]">
          {CUES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className={`w-full text-left px-6 sm:px-8 py-3.5 flex items-center gap-4 transition-colors border-b border-white/[0.04] last:border-b-0 ${
                active === i ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
              }`}
            >
              <div
                className="w-1 h-4 flex-shrink-0 transition-colors"
                style={{
                  backgroundColor:
                    active === i ? "rgba(225,29,72,0.6)" : "rgba(255,255,255,0.08)",
                }}
              />
              <span
                className={`text-[13px] transition-colors ${
                  active === i ? "text-white/80" : "text-white/30"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {c.cue}
              </span>
              <span
                className="text-[9px] text-white/15 ml-auto"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {c.domain}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cue.id}
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 space-y-6"
          >
            <div>
              <p
                className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                What this cue reveals
              </p>
              <p className="text-[14px] text-white/55 leading-[1.8]">{cue.reveals}</p>
            </div>

            <div
              className="px-5 sm:px-6 py-5"
              style={{
                border: "1px solid rgba(225,29,72,0.2)",
                background: "rgba(225,29,72,0.02)",
              }}
            >
              <p
                className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                The design alternative
              </p>
              <p className="text-[14px] text-white/70 leading-[1.8]">{cue.design}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   RepresentativenessSpectrum
   Five practice activities on a spectrum from decontextualized → representative.
   Click each to see what information is present and absent.
───────────────────────────────────────────────────────────────────── */
const SPECTRUM = [
  {
    id: "isolated",
    label: "Isolated technique",
    position: 8,
    example: "Ball machine serving to a stationary receiver. No opponent, no consequence, predictable delivery.",
    present: ["Object (ball)", "Motor pattern repetition"],
    absent: ["Opponent information", "Tactical context", "Decision pressure", "Spatial awareness demand", "Social pressure"],
    score: 10,
  },
  {
    id: "blocked",
    label: "Blocked drill",
    position: 28,
    example: "Repeated 1v0 finishing drill. Same starting position, same movement, no defender.",
    present: ["Object (ball)", "Target (goal)", "Movement pattern", "Outcome feedback"],
    absent: ["Defensive information", "Tactical context", "Time pressure (ecological)", "Positioning decisions"],
    score: 28,
  },
  {
    id: "variable",
    label: "Variable drill",
    position: 50,
    example: "1v1 finishing from varied starting positions. Some defensive pressure, controlled setup.",
    present: ["Object (ball)", "Target", "Movement variation", "Basic defensive information", "Some decision-making"],
    absent: ["Full tactical context", "Team coordination demands", "Multiple simultaneous decisions"],
    score: 50,
  },
  {
    id: "conditioned",
    label: "Conditioned game",
    position: 72,
    example: "4v4 with modified rules that emphasize the target behavior. Ecological pressure present.",
    present: ["Object", "Target", "Teammates", "Opponents", "Tactical decisions", "Social pressure", "Ecological time pressure"],
    absent: ["Full team dynamics", "Full game consequence structure"],
    score: 72,
  },
  {
    id: "representative",
    label: "Representative practice",
    position: 92,
    example: "Small-sided game preserving full informational structure of the performance context. Authentic consequences.",
    present: ["Object", "Target", "Teammates", "Opponents", "Full tactical decisions", "Social pressure", "Ecological time pressure", "Full consequence structure", "Perceptual demands of competition"],
    absent: [],
    score: 92,
  },
];

export function RepresentativenessSpectrum() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);
  const item = SPECTRUM[active];

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
      {/* Dot grid overlay */}
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

      <div ref={ref} className="relative z-10 p-6 sm:p-8">
        {/* The spectrum bar */}
        <div className="relative mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-[9px] text-white/20" style={{ fontFamily: "var(--font-mono)" }}>
              Decontextualized
            </span>
            <span className="text-[9px] text-white/20" style={{ fontFamily: "var(--font-mono)" }}>
              Representative
            </span>
          </div>
          <div className="relative h-[2px] bg-white/[0.06]">
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ background: "linear-gradient(90deg, rgba(225,29,72,0.4), rgba(225,29,72,0.7))" }}
              animate={{ width: `${item.score}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Activity dots */}
            {SPECTRUM.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${s.position}%` }}
              >
                <motion.div
                  animate={{
                    width: active === i ? 12 : 7,
                    height: active === i ? 12 : 7,
                    backgroundColor: active === i ? "rgba(225,29,72,0.9)" : "rgba(255,255,255,0.2)",
                    boxShadow: active === i ? "0 0 12px rgba(225,29,72,0.6)" : "none",
                  }}
                  transition={{ duration: 0.2 }}
                  className="rounded-none"
                />
              </button>
            ))}
          </div>

          {/* Activity labels below dots */}
          <div className="relative mt-4 h-6">
            {SPECTRUM.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="absolute -translate-x-1/2"
                style={{ left: `${s.position}%` }}
              >
                <p
                  className={`text-[8px] sm:text-[9px] tracking-[0.1em] uppercase whitespace-nowrap transition-colors ${
                    active === i ? "text-white/60" : "text-white/15"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {s.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <p
              className="text-[13px] text-white/50 leading-[1.75] pl-4"
              style={{
                borderLeft: item.score >= 90
                  ? "2px solid rgba(225,29,72,0.45)"
                  : "2px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.4s ease",
              }}
            >
              {item.example}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Information present
                </p>
                <div className="space-y-1.5">
                  {item.present.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 flex-shrink-0"
                        style={{ backgroundColor: "rgba(225,29,72,0.7)" }}
                      />
                      <span className="text-[12px] text-white/55">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Information absent
                </p>
                <div className="space-y-1.5">
                  {item.absent.length === 0 ? (
                    <p className="text-[12px] text-white/25 italic">
                      None — this environment is fully representative.
                    </p>
                  ) : (
                    item.absent.map((a) => (
                      <div key={a} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 flex-shrink-0"
                          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                        />
                        <span className="text-[12px] text-white/22">{a}</span>
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
   ConstraintDesignMatrix
   The full design toolkit: Task + Environment × Add / Remove / Modify.
   Click any cell to see the manipulation, what it produces, and why.
───────────────────────────────────────────────────────────────────── */
type MatrixKey = `${"task" | "env"}-${"add" | "remove" | "modify"}`;

const MATRIX: Record<MatrixKey, { title: string; example: string; produces: string }> = {
  "task-add": {
    title: "Add a task constraint",
    example: "Introduce a scoring rule: goals only count from crosses. Or add a time limit per possession.",
    produces: "Forces new behaviors by changing what constitutes success. Players who were direct now have to build wide. The behavior emerges from the rule, not from being told.",
  },
  "task-remove": {
    title: "Remove a task constraint",
    example: "Remove the offside rule from a drill to allow deeper runs. Or remove the out-of-bounds line.",
    produces: "Expands the solution space. Players discover options that the previous rule prevented. Useful for unlocking conservative behavior that's become habitual.",
  },
  "task-modify": {
    title: "Modify a task constraint",
    example: "Change scoring so width is worth double. Or require two players to touch the ball before a shot.",
    produces: "Redirects behavior without eliminating the task. Players learn to find the same objective through a different route, building new movement patterns around the original goal.",
  },
  "env-add": {
    title: "Add an environment constraint",
    example: "Add a defender in an area that was previously undefended. Add a neutral player who plays for the team in possession.",
    produces: "Changes the informational landscape. New defender = new pressure information. The organism must now read and respond to an element that didn't exist before.",
  },
  "env-remove": {
    title: "Remove an environment constraint",
    example: "Remove cones and replace with a passive defender. Remove a zone boundary and let positions be fluid.",
    produces: "Reduces artificial structure and increases ecological validity. The organism now navigates with information that resembles performance conditions rather than practice simplifications.",
  },
  "env-modify": {
    title: "Modify an environment constraint",
    example: "Compress the space to force quicker decisions under pressure. Or expand it to create more time and highlight positioning.",
    produces: "Changes what the environment affords without changing the fundamental activity. Compressed space increases pressure information. Expanded space reduces it. Both change what behaviors emerge.",
  },
};

type Row = "add" | "remove" | "modify";
type Col = "task" | "env";

const ROWS: { key: Row; label: string }[] = [
  { key: "add", label: "Add" },
  { key: "remove", label: "Remove" },
  { key: "modify", label: "Modify" },
];

const COLS: { key: Col; label: string }[] = [
  { key: "task", label: "Task constraint" },
  { key: "env", label: "Environment constraint" },
];

export function ConstraintDesignMatrix() {
  const [active, setActive] = useState<MatrixKey | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);
  const item = active ? MATRIX[active] : null;

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
      {/* Dot grid overlay */}
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
        {/* Organism row — locked */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 opacity-25">
            <span
              className="text-[9px] tracking-[0.2em] uppercase text-white/40 w-16 flex-shrink-0"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Organism
            </span>
            <div className="flex-1 py-2 border border-white/[0.06] text-center">
              <span
                className="text-[10px] text-white/30 tracking-[0.15em]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Fixed — cannot be changed directly
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-16 sm:w-20" />
                {COLS.map((col) => (
                  <th
                    key={col.key}
                    className="py-4 px-3 text-[9px] tracking-[0.2em] uppercase text-white/30 font-normal text-center border-l border-white/[0.06]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key} className="border-t border-white/[0.06]">
                  <td
                    className="py-4 px-4 sm:px-6 text-[9px] tracking-[0.2em] uppercase text-white/25"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {row.label}
                  </td>
                  {COLS.map((col) => {
                    const key: MatrixKey = `${col.key}-${row.key}`;
                    const isActive = active === key;
                    return (
                      <td key={key} className="border-l border-white/[0.06] p-2">
                        <button
                          onClick={() => setActive(isActive ? null : key)}
                          className="w-full py-3 px-3 text-[11px] text-left transition-all duration-200"
                          style={
                            isActive
                              ? {
                                  background: "rgba(225,29,72,0.12)",
                                  color: "rgba(255,255,255,0.9)",
                                  border: "1px solid rgba(225,29,72,0.35)",
                                  fontWeight: 600,
                                  fontFamily: "var(--font-mono)",
                                }
                              : {
                                  color: "rgba(255,255,255,0.35)",
                                  border: "1px solid rgba(255,255,255,0.06)",
                                  fontFamily: "var(--font-mono)",
                                }
                          }
                        >
                          {MATRIX[key].title}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {item && (
            <motion.div
              key={active}
              initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 space-y-4"
              style={{ borderTop: "1px solid rgba(225,29,72,0.18)" }}
            >
              <div>
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Example
                </p>
                <p className="text-[14px] text-white/55 leading-[1.75]">{item.example}</p>
              </div>
              <div className="border-l-2 border-white/[0.10] pl-4">
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  What it produces
                </p>
                <p className="text-[13px] text-white/65 leading-[1.8]">{item.produces}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   DesignIterations
   A practice activity across three design iterations.
   Shows how constraint manipulation progressively increases
   representativeness without changing the fundamental activity.
───────────────────────────────────────────────────────────────────── */
const ITERATIONS = [
  {
    id: "v1",
    label: "Version 01",
    sublabel: "As originally designed",
    activity: "Shooting drill: players line up and take turns shooting from the penalty spot. Coach feeds the ball. No goalkeeper, no defender.",
    representativeness: 12,
    constraintChange: null,
    informationPresent: ["The ball", "The goal", "Target (net)"],
    informationAbsent: [
      "Goalkeeper body language",
      "Defensive pressure",
      "Decision: when to shoot vs. pass",
      "Physiological state from prior play",
      "Social pressure of live consequences",
    ],
    verdict: "Builds a motor pattern for an environment that doesn't exist in competition. Technical skill develops. Decision-making and perceptual skill don't.",
  },
  {
    id: "v2",
    label: "Version 02",
    sublabel: "One constraint added",
    activity: "Same drill, but: goalkeeper added. Shot is only taken when the player reads the goalkeeper has committed to one side.",
    representativeness: 45,
    constraintChange: "Added: goalkeeper who moves before the shot. Task modified: shooting is now information-dependent.",
    informationPresent: [
      "The ball",
      "The goal",
      "Goalkeeper body language (must be read)",
      "Decision: which side to shoot",
      "Outcome feedback with consequence",
    ],
    informationAbsent: [
      "Defensive pressure before the shot",
      "Decision: when to shoot vs. pass",
      "Physiological state from prior play",
    ],
    verdict: "Now perception is required. The motor pattern must be coupled to the goalkeeper's movement information. Transfer improves significantly.",
  },
  {
    id: "v3",
    label: "Version 03",
    sublabel: "Fully representative",
    activity: "1v1 finishing from live play: player receives a pass under pressure, must beat the defender, read the goalkeeper, and finish. Emerges from a small-sided game.",
    representativeness: 88,
    constraintChange: "Environment: defensive pressure added before shot. Task: shooting decision emerges from live play rather than a set-up. Physiological: player arrives with energy expenditure.",
    informationPresent: [
      "The ball",
      "The goal",
      "Goalkeeper body language",
      "Defender pressure (directional)",
      "Decision: dribble, pass, or shoot",
      "Timing: when is the window open?",
      "Physiological challenge",
      "Social consequence structure",
    ],
    informationAbsent: [],
    verdict: "The technique now exists in the same informational context where it must perform. Attunement to the full perceptual landscape of finishing develops.",
  },
];

export function DesignIterations() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);
  const iter = ITERATIONS[active];

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
      {/* Dot grid overlay */}
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
        {/* Version tabs */}
        <div className="flex border-b border-white/[0.06]">
          {ITERATIONS.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setActive(i)}
              className="relative flex-1 py-4 text-center border-r border-white/[0.06] last:border-r-0"
            >
              {active === i && (
                <motion.div
                  layoutId="design-iterations-pill"
                  className="absolute inset-0 bg-white/[0.05]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <p
                  className={`text-[10px] tracking-[0.2em] uppercase mb-0.5 transition-colors ${
                    active === i ? "text-white/70" : "text-white/25"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {it.label}
                  {i === 2 && (
                    <span
                      className="inline-block w-1.5 h-1.5 ml-1.5 mb-0.5 rounded-full align-middle"
                      style={{ backgroundColor: active === 2 ? "rgba(225,29,72,0.8)" : "rgba(225,29,72,0.25)" }}
                    />
                  )}
                </p>
                <p
                  className={`text-[9px] transition-colors ${
                    active === i ? "text-white/35" : "text-white/15"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {it.sublabel}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div ref={ref}>
          <AnimatePresence mode="wait">
            <motion.div
              key={iter.id}
              initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 space-y-6"
            >
              {/* Activity */}
              <p className="text-[14px] text-white/65 leading-[1.8]">{iter.activity}</p>

              {/* Representativeness bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <p
                    className="text-[9px] tracking-[0.25em] uppercase text-white/20"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Representativeness
                  </p>
                  <p
                    className="text-[9px] text-white/35"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <AnimatedNum value={iter.representativeness} inView={inView} />%
                  </p>
                </div>
                <div className="h-[3px] bg-white/[0.05]">
                  <motion.div
                    className="h-full"
                    style={{ background: "linear-gradient(90deg, rgba(225,29,72,0.55), rgba(225,29,72,0.88))" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${iter.representativeness}%` }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </div>

              {/* What changed */}
              {iter.constraintChange && (
                <div
                  className="px-5 py-4"
                  style={{
                    border: "1px solid rgba(225,29,72,0.2)",
                    background: "rgba(225,29,72,0.02)",
                  }}
                >
                  <p
                    className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Constraint change from previous version
                  </p>
                  <p className="text-[12px] text-white/50 leading-[1.7]">{iter.constraintChange}</p>
                </div>
              )}

              {/* Present / Absent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p
                    className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Information present
                  </p>
                  <div className="space-y-1.5">
                    {iter.informationPresent.map((it) => (
                      <div key={it} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 flex-shrink-0"
                          style={{ backgroundColor: "rgba(225,29,72,0.7)" }}
                        />
                        <span className="text-[12px] text-white/55">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p
                    className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Information absent
                  </p>
                  {iter.informationAbsent.length === 0 ? (
                    <p className="text-[12px] text-white/25 italic">
                      None — this environment is representative.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {iter.informationAbsent.map((it) => (
                        <div key={it} className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 flex-shrink-0"
                            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                          />
                          <span className="text-[12px] text-white/22">{it}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Verdict */}
              <div className="border-t border-white/[0.06] pt-5">
                <p
                  className="text-[13px] text-white/50 leading-[1.75] italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {iter.verdict}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
