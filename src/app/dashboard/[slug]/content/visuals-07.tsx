"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   DomainMap
   Same ecological framework across 4 domains.
   Toggle between domains — shows organism/task/environment per domain.
───────────────────────────────────────────────────────────────────── */
const DOMAINS = [
  {
    id: "sport",
    label: "Sport",
    context: "A basketball coach preparing athletes for high-stakes competition.",
    organism: ["Fatigue level going into practice", "Anxiety state", "Current skill stage", "Injury history", "Motivation and focus"],
    task: ["Scoring rules", "Time constraints per possession", "Defensive objectives", "Win/loss consequences"],
    environment: ["Space dimensions", "Number of defenders", "Crowd noise", "Opponent quality", "Time of season"],
    transferProblem: "Athlete performs brilliantly in practice, disappears in the championship game. Skills were built for practice constraints, not competition constraints.",
    fix: "Increase representativeness — bring competition-level environmental information (crowd simulation, consequence structure, fatigue) into practice.",
  },
  {
    id: "creator",
    label: "Creator",
    context: "A content creator building an audience on social platforms.",
    organism: ["Current audience size and warmth", "Energy and creative state", "Clarity on positioning", "Belief in the work"],
    task: ["Platform algorithm constraints", "Format requirements (length, hook, CTA)", "Publishing frequency", "Monetization goals"],
    environment: ["Current audience attention landscape", "Competing content in the feed", "Cultural moment and relevance", "Platform's current reach mechanics"],
    transferProblem: "Content that performs brilliantly in private drafting, tested on friends, falls flat in public. Created in decontextualized conditions — no real audience pressure, no real feed competition.",
    fix: "Practice creating in conditions representative of publication. Publish before you feel ready. Let real audience response be the environment that shapes the work.",
  },
  {
    id: "medicine",
    label: "Medicine",
    context: "A surgical resident developing operative competence.",
    organism: ["Level of fatigue on this shift", "Emotional state entering the OR", "Prior experience with this procedure", "Stress from other cases"],
    task: ["Operative objectives", "Time pressure of the case", "Patient-specific anatomy", "Team coordination requirements"],
    environment: ["The actual patient's tissue", "OR team dynamics", "Equipment available", "Attending's supervision style", "Consequence structure (real patient, real outcomes)"],
    transferProblem: "Simulation performance is excellent. First live cases expose gaps that simulation never revealed — tissue behaves differently, the stakes change the organism, the team dynamics are new information.",
    fix: "Simulation is the shore. Supervised live cases are the stream. More simulation doesn't close the gap. Progressive exposure to the real environment does.",
  },
  {
    id: "education",
    label: "Education",
    context: "A teacher developing students who can think, not just recall.",
    organism: ["Student's current knowledge state", "Motivation and engagement", "Prior misconceptions", "Emotional safety in the room"],
    task: ["Learning objectives", "Assessment structure", "Time constraints of the lesson", "Curriculum requirements"],
    environment: ["Classroom social dynamics", "Information available to students during tasks", "Authenticity of the problem being solved", "Consequences of getting it right or wrong"],
    transferProblem: "Students ace the test, cannot apply the knowledge outside the test context. The test environment contains almost none of the information present in the real world where the knowledge needs to function.",
    fix: "Design tasks where the information the student needs to read is present in the task itself — not recalled from memory. Make the problem representative of the actual world where the knowledge matters.",
  },
];

export function DomainMap() {
  const [active, setActive] = useState(0);
  const domain = DOMAINS[active];
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
    <div ref={ref}>
      <div
        ref={containerRef}
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
          {/* Domain tabs — spring pill */}
          <div className="flex border-b border-white/[0.06]">
            {DOMAINS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setActive(i)}
                className="relative flex-1 py-3.5 border-r border-white/[0.04] last:border-r-0"
              >
                {active === i && (
                  <motion.div
                    layoutId="pill-domain-map"
                    className="absolute inset-0 bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 text-[10px] tracking-[0.2em] uppercase transition-colors ${active === i ? "text-black font-semibold" : "text-white/25 hover:text-white/50"}`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {d.label}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 space-y-6"
            >
              <motion.p
                initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
                animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13px] text-white/45 leading-[1.7] border-l-2 border-white/[0.08] pl-4"
              >
                {domain.context}
              </motion.p>

              {/* Three constraints */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Organism constraints", items: domain.organism, opacity: "text-white/55" },
                  { label: "Task constraints", items: domain.task, opacity: "text-white/60" },
                  { label: "Environment constraints", items: domain.environment, opacity: "text-white/65" },
                ].map(({ label, items, opacity }) => (
                  <div key={label} className="border border-white/[0.06] bg-white/[0.01] px-4 py-4">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                      {label}
                    </p>
                    <div className="space-y-1.5">
                      {items.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          {/* Gold dot — Pattern 4 */}
                          <div
                            className="flex-shrink-0 mt-1.5"
                            style={{
                              width: 6,
                              height: 6,
                              backgroundColor: "rgba(225,29,72,0.5)",
                              boxShadow: "0 0 6px rgba(225,29,72,0.3)",
                            }}
                          />
                          <p className={`text-[11px] leading-[1.55] ${opacity}`}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Transfer problem + fix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-l-2 border-white/[0.06] pl-4">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-white/15 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    The transfer problem in this domain
                  </p>
                  <p className="text-[12px] text-white/35 leading-[1.75]">{domain.transferProblem}</p>
                </div>
                {/* Gold treatment for ecological fix column */}
                <div className="pl-4" style={{ borderLeft: "2px solid rgba(225,29,72,0.35)" }}>
                  <p
                    className="text-[9px] tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: "var(--font-mono)", color: "rgba(225,29,72,0.6)" }}
                  >
                    The ecological fix
                  </p>
                  <p className="text-[12px] leading-[1.75]" style={{ color: "rgba(255,255,255,0.72)" }}>
                    {domain.fix}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CrossDomainPatterns
   Four patterns that appear identically across every domain.
   Shows that the framework describes something real, not a metaphor.
───────────────────────────────────────────────────────────────────── */
const PATTERNS = [
  {
    id: "transfer",
    number: "01",
    title: "The transfer problem",
    description: "Skill built in one environment doesn't automatically appear in another. The gap shows up at the highest-stakes moment — competition, live patient, real audience, high-stakes presentation.",
    sport: "Athlete dominates practice, disappears in finals.",
    creator: "Content performs with warm audience, dies in cold traffic.",
    medicine: "Simulation scores are perfect. First real case exposes everything the simulation didn't.",
    education: "Students ace the exam. Cannot apply the knowledge outside the exam.",
  },
  {
    id: "attunement",
    title: "Attunement lag",
    number: "02",
    description: "Expertise always lags behind the environment change. Every time the environment changes — new opponent, new platform algorithm, new patient population, new student cohort — the practitioner must re-attune.",
    sport: "Coach who excelled with one generation of athletes struggles with the next.",
    creator: "Creator whose format worked for three years suddenly stops landing as the platform changes.",
    medicine: "Surgeon who trained on one anatomy encounters a variant and must adapt in real time.",
    education: "Teacher whose approach worked for one cohort meets a different learning culture and has to rebuild.",
  },
  {
    id: "constraint",
    title: "Constraint as the lever",
    number: "03",
    description: "In every domain, the practitioner's real tool is not instruction but the constraints they impose or remove. Change the constraint, change the behavior — without saying a word.",
    sport: "Shrink the space, watch decisions sharpen. Add a defender, watch positioning emerge.",
    creator: "Remove the follower count from your view while creating. Watch the anxiety change what you make.",
    medicine: "Change the supervision structure, watch the resident's decision-making shift.",
    education: "Remove access to Google during the task. Watch students engage differently with what they already know.",
  },
  {
    id: "representative",
    title: "Representativeness",
    number: "04",
    description: "In every domain, the practice environment must preserve the essential informational structure of the performance environment. When it doesn't, the skill that develops is real — for the wrong context.",
    sport: "Technique drill with no opposition pressure builds technique for no-opposition situations.",
    creator: "Drafting in private builds writing for private. Publishing in public is a different perceptual environment.",
    medicine: "Simulation builds skill for simulation. The patient is a different organism-task-environment configuration.",
    education: "Homework builds recall in a homework context. The real world demands different information.",
  },
];

export function CrossDomainPatterns() {
  const [active, setActive] = useState(0);
  const pattern = PATTERNS[active];
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
    <div ref={ref}>
      <div
        ref={containerRef}
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
          {/* Pattern selector — spring pill */}
          <div className="flex border-b border-white/[0.06]">
            {PATTERNS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className="relative flex-1 py-4 border-r border-white/[0.04] last:border-r-0"
              >
                {active === i && (
                  <motion.div
                    layoutId="pill-cross-domain"
                    className="absolute inset-0 bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <p
                  className="relative z-10 text-[9px] tracking-[0.15em] uppercase text-center transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: active === i ? "rgba(225,29,72,0.7)" : "rgba(255,255,255,0.18)",
                  }}
                >
                  {p.number}
                </p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 space-y-5"
            >
              <motion.div
                initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
                animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[18px] text-white/80 mb-3" style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                  {pattern.title}
                </p>
                <p className="text-[13px] text-white/60 leading-[1.8]">{pattern.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Sport", value: pattern.sport },
                  { label: "Creator", value: pattern.creator },
                  { label: "Medicine", value: pattern.medicine },
                  { label: "Education", value: pattern.education },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="border px-4 py-3 transition-colors duration-300"
                    style={{ borderColor: "rgba(225,29,72,0.12)" }}
                  >
                    <p className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                      {label}
                    </p>
                    <p className="text-[12px] text-white/60 leading-[1.65]">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   DecisionDiagnostic
   The practitioner's diagnostic from The Move.
   Three decisions — identify what environmental information triggered each.
   Shows the difference between reading the environment vs. applying a rule.
───────────────────────────────────────────────────────────────────── */
const DECISION_EXAMPLES = [
  {
    id: "env-read",
    decision: "I shortened the drill from 20 minutes to 12 because the athletes were flat.",
    source: "environment",
    trigger: "I read the athletes' energy and attention — body language, effort quality, engagement level. The environment told me the activity had run its useful life.",
    verdict: "This is reading the environment. You coupled to the information present in the session and responded to it. This is the stream.",
  },
  {
    id: "rule-applied",
    decision: "I corrected the athlete's technique because it didn't match the correct model.",
    source: "rule",
    trigger: "I consulted an internal template of what the movement should look like. The decision came from a stored model, not from what the environment was producing.",
    verdict: "This is applying an external rule. Not necessarily wrong — but it's worth asking: did the environment's consequence structure not correct this on its own? If not, why not?",
  },
  {
    id: "hybrid",
    decision: "I increased the space size after noticing the drill was producing overcrowding rather than decision-making.",
    source: "environment",
    trigger: "I observed what the constraint was producing — not the behavior I hoped for, but the behavior that was actually emerging. I adjusted the design based on what the environment showed me.",
    verdict: "This is pattern-reading leading to a design decision. The environment told you the constraint wasn't working. You changed the environment, not the athlete. This is the practice.",
  },
];

export function DecisionDiagnostic() {
  const [active, setActive] = useState(0);
  const example = DECISION_EXAMPLES[active];
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

  const isEnv = example.source === "environment";

  return (
    <div ref={ref}>
      <div
        ref={containerRef}
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
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Three decisions — where did they come from?
          </motion.p>

          {/* Tab buttons — spring pill */}
          <div className="flex gap-0 mb-6 border border-white/[0.08] relative overflow-hidden">
            {DECISION_EXAMPLES.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setActive(i)}
                className="relative flex-1 py-3 border-r border-white/[0.04] last:border-r-0"
              >
                {active === i && (
                  <motion.div
                    layoutId="pill-decision-diagnostic"
                    className="absolute inset-0 bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 text-[10px] tracking-[0.15em] uppercase transition-colors ${active === i ? "text-black font-semibold" : "text-white/25 hover:text-white/50"}`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
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
              className="space-y-5"
            >
              {/* The decision box — gold bg tint for environment reads */}
              <div
                className="border px-5 py-4 transition-colors duration-400"
                style={{
                  borderColor: isEnv ? "rgba(225,29,72,0.18)" : "rgba(255,255,255,0.08)",
                  backgroundColor: isEnv ? "rgba(225,29,72,0.03)" : "rgba(255,255,255,0.02)",
                }}
              >
                <p className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  The decision
                </p>
                <p className="text-[14px] text-white/65 leading-[1.75]">{example.decision}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    What triggered it
                  </p>
                  <p className="text-[13px] text-white/50 leading-[1.75]">{example.trigger}</p>
                </div>

                {/* Verdict — gold treatment for environment-read decisions */}
                <div
                  className="pl-4 transition-all duration-300"
                  style={{
                    borderLeft: isEnv ? "2px solid rgba(225,29,72,0.5)" : "2px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p
                    className="text-[12px] leading-[1.75] italic transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: isEnv ? "rgba(225,29,72,0.7)" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {example.verdict}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
