"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   FrameworkInstallation
   The three phases of framework internalization.
   Translation → Recognition → Perception.
   Shows what each phase looks like in practice and how long it takes.
───────────────────────────────────────────────────────────────────── */
const PHASES = [
  {
    id: "translation",
    number: "01",
    label: "Translation",
    timeframe: "Weeks 1–8",
    description:
      "You understand the framework. You can explain it. But applying it requires conscious effort — you think through organism, task, environment deliberately before each design decision.",
    inPractice: [
      "You set up a drill and then pause to ask: 'Is this representative?'",
      "You catch yourself giving a cue and think: 'What design problem am I papering over?'",
      "You observe a session and consciously scan for the three constraints.",
      "The framework is a checklist you run. It's working. But it's not yet fast.",
    ],
    signal:
      "You're in translation when the framework feels like a second step — something you apply after you've already had your first instinct.",
    tabGoldOpacity: 0.2,
    isPerception: false,
  },
  {
    id: "recognition",
    number: "02",
    label: "Recognition",
    timeframe: "Months 2–6",
    description:
      "The framework starts running faster. You begin seeing mismatches before you consciously diagnose them. The three constraints become a background scan, not a deliberate checklist.",
    inPractice: [
      "You walk into a practice environment and immediately feel something is off — before you can name it.",
      "A cue impulse arrives and you hesitate — not because you remember the rule, but because something feels wrong about it.",
      "You modify a constraint mid-session based on what you're observing, without stopping to theorize.",
      "You're still translating sometimes, but the gaps between translations are shortening.",
    ],
    signal:
      "You're in recognition when you start trusting the discomfort — when the feeling of mismatch arrives before the explanation.",
    tabGoldOpacity: 0.4,
    isPerception: false,
  },
  {
    id: "perception",
    number: "03",
    label: "Perception",
    timeframe: "Year 1+",
    description:
      "The framework disappears into the seeing. You stop applying ecological dynamics and start perceiving through it. The translation is over. The lens is installed.",
    inPractice: [
      "You walk into a performance environment and immediately read the constraint landscape — organism state, task demands, environmental affordances — without naming any of it.",
      "Your design decisions feel intuitive, but they are disciplined. The discipline is no longer conscious.",
      "You can articulate your reasoning afterward, but the decision didn't require articulation to be made.",
      "You notice when others are solving instruction problems that are actually environment problems. You can't not see it.",
    ],
    signal:
      "You're in perception when you stop consulting the framework and start inhabiting it. When the surgeon's hands know before the mind speaks.",
    tabGoldOpacity: 0.7,
    isPerception: true,
  },
];

export function FrameworkInstallation() {
  const [active, setActive] = useState(0);
  const phase = PHASES[active];
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
        style={{
          borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined,
          transition: "border-color 0.4s ease",
        }}
      >
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
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
          {/* Phase tabs */}
          <div className="flex border-b border-white/[0.06]">
            {PHASES.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className="relative flex-1 py-4 border-r border-white/[0.04] last:border-r-0"
              >
                {active === i && (
                  <motion.div
                    layoutId="pill-framework-install"
                    className="absolute inset-0"
                    style={{
                      borderBottom: `2px solid rgba(225,29,72,${p.tabGoldOpacity})`,
                      background: "rgba(225,29,72,0.03)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <p
                  className={`relative z-10 text-[9px] tracking-[0.2em] uppercase text-center mb-0.5 transition-colors ${active === i ? "text-white/55" : "text-white/18"}`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {p.number}
                </p>
                <p
                  className={`relative z-10 text-[10px] tracking-[0.15em] uppercase text-center transition-colors ${active === i ? "text-white/70" : "text-white/22"}`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {p.label}
                </p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p
                    className="text-[22px] text-white/80 mb-2"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontWeight: 600,
                    }}
                  >
                    {phase.label}
                  </p>
                  <p className="text-[12px] text-white/40 leading-[1.75]">
                    {phase.description}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 px-3 py-2 text-center border"
                  style={{ borderColor: "rgba(225,29,72,0.2)" }}
                >
                  <p
                    className="text-[8px] tracking-[0.2em] uppercase text-white/20 mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Typical timeframe
                  </p>
                  <p
                    className="text-[11px] text-white/50"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {phase.timeframe}
                  </p>
                </div>
              </div>

              {/* What it looks like */}
              <div>
                <p
                  className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  What this looks like in practice
                </p>
                <div className="space-y-2">
                  {phase.inPractice.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, filter: "blur(8px)", x: -8 }}
                      animate={
                        inView
                          ? { opacity: 1, filter: "blur(0px)", x: 0 }
                          : {}
                      }
                      transition={{
                        delay: i * 0.08,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-1 h-1 flex-shrink-0 mt-2"
                        style={{
                          backgroundColor: "rgba(225,29,72,0.5)",
                          boxShadow: "0 0 4px rgba(225,29,72,0.25)",
                        }}
                      />
                      <p className="text-[12px] text-white/55 leading-[1.7]">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Signal / How you know */}
              <div
                className="pl-4"
                style={{
                  borderLeft: "2px solid rgba(225,29,72,0.4)",
                }}
              >
                <p
                  className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  How you know you&apos;re here
                </p>
                <p
                  className="text-[13px] leading-[1.75] italic"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: phase.isPerception
                      ? "rgba(225,29,72,0.65)"
                      : "rgba(255,255,255,0.6)",
                  }}
                >
                  {phase.signal}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CourseThread
   The one argument running through all 8 modules.
   Each module's core contribution shown as a step in the single idea.
───────────────────────────────────────────────────────────────────── */
const THREAD = [
  {
    slug: "01",
    title: "Why the Reps Aren't Working",
    contribution:
      "The problem isn't effort. It's the mismatch between where skill is built and where it needs to operate.",
    hinge: "Skill is organism × task × environment — not reps alone.",
  },
  {
    slug: "02",
    title: "The Environment Is the Teacher",
    contribution:
      "The practitioner's job is not to install behaviors. It's to design environments where the right affordances are available.",
    hinge: "Constraints are the design medium.",
  },
  {
    slug: "03",
    title: "How to See What You've Been Missing",
    contribution:
      "Attunement is biological and cannot be transferred through instruction. You can only design environments where it develops.",
    hinge:
      "You cannot give someone attunement. You can only build the conditions for it.",
  },
  {
    slug: "04",
    title: "Stop Teaching. Start Designing.",
    contribution:
      "A cue is an admission that the environment wasn't rich enough. Design solves what instruction only papers over.",
    hinge: "If you removed every cue, would the behavior still emerge?",
  },
  {
    slug: "05",
    title: "Train the Eye Before the Hand",
    contribution:
      "Action is the last thing that happens. Perception must be trained in the environment where it needs to operate.",
    hinge:
      "You cannot break the perception-action loop and expect it to reassemble under pressure.",
  },
  {
    slug: "06",
    title: "The Difference Between Collecting and Building",
    contribution:
      "Knowing about a framework is not the same as knowing through it. The lens installs through application, not comprehension.",
    hinge: "The shore is comfortable. The stream requires you to step in.",
  },
  {
    slug: "07",
    title: "The Same Problem, Your Domain",
    contribution:
      "The framework travels because it describes something real that is present in every domain where a living system performs.",
    hinge:
      "Organism-environment coupling is not a coaching philosophy. It's how organisms work.",
  },
  {
    slug: "08",
    title: "Run It. Don't Study It.",
    contribution:
      "You already understand enough to change how you work. The question is whether you will use it or keep studying it.",
    hinge: "This is not the end. This is the beginning of the practice.",
  },
];

export function CourseThread() {
  const [active, setActive] = useState<number | null>(null);
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
        className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden p-6 sm:p-8"
        style={{
          borderColor: spotActive ? "rgba(225,29,72,0.18)" : undefined,
          transition: "border-color 0.4s ease",
        }}
      >
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
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
          <p
            className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            The one argument — 8 modules
          </p>

          <div className="relative">
            {/* Vertical connector line — gradient gold → white/06 */}
            <div
              className="absolute left-[11px] top-3 bottom-3 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(225,29,72,0.25) 0%, rgba(255,255,255,0.06) 100%)",
              }}
            />

            <div className="space-y-1">
              {THREAD.map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, filter: "blur(8px)", x: -8 }}
                  animate={
                    inView ? { opacity: 1, filter: "blur(0px)", x: 0 } : {}
                  }
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    onClick={() => setActive(active === i ? null : i)}
                    className="w-full text-left flex items-start gap-4 py-3 group"
                  >
                    <div
                      className="w-[22px] h-[22px] flex-shrink-0 flex items-center justify-center border transition-all duration-200"
                      style={{
                        borderColor:
                          active === i
                            ? "rgba(225,29,72,0.5)"
                            : "rgba(255,255,255,0.08)",
                        backgroundColor:
                          active === i
                            ? "rgba(225,29,72,0.06)"
                            : "#0d0d0c",
                      }}
                    >
                      <p
                        className="text-[8px] transition-colors"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color:
                            active === i
                              ? "rgba(225,29,72,0.7)"
                              : "rgba(255,255,255,0.2)",
                        }}
                      >
                        {item.slug}
                      </p>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p
                        className={`text-[12px] transition-colors leading-tight ${active === i ? "text-white/80" : "text-white/35 group-hover:text-white/50"}`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </button>

                  <AnimatePresence>
                    {active === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden ml-[38px]"
                      >
                        <div className="pb-4 space-y-3">
                          <p className="text-[12px] text-white/50 leading-[1.75]">
                            {item.contribution}
                          </p>
                          <div
                            className="pl-3"
                            style={{
                              borderLeft: "2px solid rgba(225,29,72,0.35)",
                            }}
                          >
                            <p
                              className="text-[11px] leading-[1.7] italic"
                              style={{
                                fontFamily: "var(--font-serif)",
                                color: "rgba(225,29,72,0.55)",
                              }}
                            >
                              {item.hinge}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SessionDesignBackward
   The backward design process for The Move.
   Start with the performance environment, work backward to the session.
   Interactive step-by-step design canvas.
───────────────────────────────────────────────────────────────────── */
const DESIGN_STEPS = [
  {
    id: "performance",
    number: "01",
    label: "Performance environment",
    question:
      "What is the actual context where the performance that matters happens?",
    prompt:
      "Name it specifically. Not 'competition' — the championship game in the final minute with the score tied. Not 'the real world' — the boardroom presentation with three stakeholders who disagree.",
    examples: [
      "A basketball player in the final possession with full defensive pressure and consequence.",
      "A surgeon making the first incision on a patient variant they haven't encountered before.",
      "A creator publishing to a cold audience with no prior relationship and no social proof.",
      "A teacher explaining a concept to a student who's convinced they already understand it.",
    ],
    instruction:
      "Be as specific as possible. The more generic your description, the less useful the design process becomes.",
  },
  {
    id: "affordances",
    number: "02",
    label: "Affordances present",
    question:
      "What information is available in that environment that the performer needs to perceive and act on?",
    prompt:
      "Not what they should do — what information is there for them to read. The defender's positioning. The tissue's resistance. The audience's engagement signal. The student's face when they don't understand but haven't said so.",
    examples: [
      "The defender is reading the dribbler's hips to predict direction — the dribbler can feel this and use it.",
      "The tissue tells the surgeon through resistance and color that the dissection plane is wrong.",
      "The creator can see engagement signals in the first 60 seconds that indicate whether the hook is landing.",
      "The teacher can read confusion in the student's delay before answering — even when the words say 'I get it.'",
    ],
    instruction:
      "List the 3-5 most critical pieces of information the performer must be attuned to. These must be present in your session.",
  },
  {
    id: "constraints",
    number: "03",
    label: "Constraints to design",
    question:
      "What task and environmental constraints will make those affordances available without scripting the response?",
    prompt:
      "You're not designing what the performer does. You're designing what information is present so the performer can develop the perception that produces the right action.",
    examples: [
      "Small-sided game where the defense is live and the shot clock matters — not a scripted closeout drill.",
      "Supervised live tissue with a variable anatomy — not a standardized simulation model.",
      "Publishing to a real audience with real analytics — not drafting in private and getting feedback from friends.",
      "An authentic question the student has to work out in front of you — not a practice problem with a known answer.",
    ],
    instruction:
      "Design the constraints to produce the affordance structure, not the movement. The movement will emerge from the right information.",
  },
  {
    id: "session",
    number: "04",
    label: "The session",
    question:
      "What does the session actually look like — built backward from this?",
    prompt:
      "Now that you know what information needs to be present, what's the simplest environment that preserves it? What do you need to remove? What do you need to add? What do you not say?",
    examples: [
      "Two teams, full pressure, live defense, consequence built into the scoring — 4 minutes. Then debrief what they perceived, not what they did.",
      "The resident handles the first ten minutes of the case solo, with supervision available but not directing. Debrief the decisions, not the technique.",
      "The creator publishes a deliberately imperfect piece to a real audience, reads the response, then identifies what the response revealed about the audience's actual information landscape.",
      "The teacher poses a question that has no clean answer, steps back, and lets the discomfort of genuine not-knowing become the environment.",
    ],
    instruction:
      "Start here. This week. One session. Designed from scratch, working backward from what the performance environment actually demands.",
  },
];

export function SessionDesignBackward() {
  const [active, setActive] = useState(0);
  const step = DESIGN_STEPS[active];
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

  // suppress unused warning — inView used in entrance animations
  useEffect(() => {}, [inView]);

  return (
    <div ref={ref}>
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
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
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
          {/* Step tabs */}
          <div className="flex border-b border-white/[0.06]">
            {DESIGN_STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="relative flex-1 py-3.5 border-r border-white/[0.04] last:border-r-0"
              >
                {active === i && (
                  <motion.div
                    layoutId="pill-session-design"
                    className="absolute inset-0 bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <p
                  className={`relative z-10 text-[10px] tracking-[0.2em] uppercase text-center transition-colors ${
                    active === i ? "text-black font-semibold" : "text-white/25"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {s.number}
                </p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 space-y-6"
            >
              {/* Header */}
              <div>
                <p
                  className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Step {step.number}
                </p>
                <p
                  className="text-[19px] text-white/75 mb-3"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 600,
                  }}
                >
                  {step.label}
                </p>
                <p className="text-[13px] text-white/45 leading-[1.75]">
                  {step.question}
                </p>
              </div>

              {/* Prompt */}
              <div className="border-l-2 border-white/[0.1] pl-4">
                <p className="text-[12px] text-white/40 leading-[1.75]">
                  {step.prompt}
                </p>
              </div>

              {/* Examples */}
              <div>
                <p
                  className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Examples across domains
                </p>
                <div className="space-y-2">
                  {step.examples.map((ex, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, filter: "blur(8px)", x: -8 }}
                      animate={
                        inView ? { opacity: 1, filter: "blur(0px)", x: 0 } : {}
                      }
                      transition={{
                        delay: i * 0.08,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-1 h-1 flex-shrink-0 mt-2"
                        style={{
                          backgroundColor: "rgba(225,29,72,0.5)",
                          boxShadow: "0 0 4px rgba(225,29,72,0.25)",
                        }}
                      />
                      <p className="text-[11px] text-white/45 leading-[1.65]">
                        {ex}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Instruction / Your task */}
              <div
                className="px-4 py-3 border"
                style={{
                  border: "1px solid rgba(225,29,72,0.2)",
                  background: "rgba(225,29,72,0.03)",
                }}
              >
                <p
                  className="text-[9px] tracking-[0.2em] uppercase mb-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "rgba(225,29,72,0.5)",
                  }}
                >
                  Your task
                </p>
                <p className="text-[12px] text-white/55 leading-[1.7]">
                  {step.instruction}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="text-[10px] tracking-[0.15em] uppercase disabled:opacity-20 transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "rgba(255,255,255,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== 0)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(225,29,72,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.25)";
                  }}
                >
                  ← Previous
                </button>
                <div className="flex gap-1.5">
                  {DESIGN_STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="w-1.5 h-1.5 transition-all duration-200"
                      style={{
                        backgroundColor:
                          i === active
                            ? "rgba(225,29,72,0.7)"
                            : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() =>
                    setActive(Math.min(DESIGN_STEPS.length - 1, active + 1))
                  }
                  disabled={active === DESIGN_STEPS.length - 1}
                  className="text-[10px] tracking-[0.15em] uppercase disabled:opacity-20 transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "rgba(255,255,255,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== DESIGN_STEPS.length - 1)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(225,29,72,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.25)";
                  }}
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
