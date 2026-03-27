"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   AnimatedNum — animated counter that counts up when inView
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
   ShoreVsStream
   Two zones: the shore (collecting, comfortable) vs. the stream
   (applying, building). Shows what each produces across time.
───────────────────────────────────────────────────────────────────── */
const SHORE_ACTIVITIES = [
  "Read another book on the framework",
  "Attended a conference session",
  "Annotated the paper",
  "Saved the article to read later",
  "Explained the concept to a colleague",
  "Rewatched the lecture",
  "Built a better reference system",
];

const STREAM_ACTIVITIES = [
  "Applied the constraint change in today's session",
  "Observed what the environment produced",
  "Adjusted the activity based on what you saw",
  "Made a decision from the environment, not the notes",
  "Ran the silent session",
  "Tested the representativeness of one drill",
  "Let an error run its consequence instead of correcting it",
];

const TIME_OUTCOMES = [
  {
    label: "After 1 year",
    shore: "Large collection of frameworks. Clear articulable understanding. Little change in practice.",
    stream: "Messy, imperfect application of a few ideas. Clearer picture of what actually works.",
  },
  {
    label: "After 3 years",
    shore: "Deep theoretical knowledge. Capable of explaining the framework to anyone. Practice largely unchanged.",
    stream: "Genuine knowing of. Ideas are embedded in the session design, not stored in notes. Transfer is visible.",
  },
  {
    label: "After 5 years",
    shore: "Expert in the literature. Consultant on paper. The gap between knowledge and practice has widened.",
    stream: "The framework has disappeared into the work. You don't apply ecological dynamics — you coach through it.",
  },
];

export function ShoreVsStream() {
  const [timeIndex, setTimeIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{ borderColor: spotActive ? 'rgba(225,29,72,0.18)' : undefined, transition: 'border-color 0.4s ease' }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.022 }} />
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: 'opacity 0.3s ease', background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />

      <div className="relative z-10">
        {/* Activities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-white/[0.06]">
          {/* Shore */}
          <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-white/[0.06]">
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              On the shore
            </p>
            <div className="space-y-2">
              {SHORE_ACTIVITIES.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 flex-shrink-0 mt-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
                  <p className="text-[12px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.30)' }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stream */}
          <div className="p-6 sm:p-8" style={{ background: 'linear-gradient(180deg, rgba(225,29,72,0.03) 0%, transparent 100%)' }}>
            <p
              className="text-[9px] tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-mono)", color: 'rgba(225,29,72,0.6)' }}
            >
              In the stream
            </p>
            <div className="space-y-2">
              {STREAM_ACTIVITIES.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.06 + 0.2, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 flex-shrink-0 mt-1.5" style={{ backgroundColor: 'rgba(225,29,72,0.7)' }} />
                  <p className="text-[12px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.75)' }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Time outcomes */}
        <div className="p-6 sm:p-8">
          <p
            className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            What each produces over time
          </p>
          <div className="flex gap-0 mb-6 border border-white/[0.08]">
            {TIME_OUTCOMES.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setTimeIndex(i)}
                className="relative flex-1 py-2.5"
              >
                {timeIndex === i && (
                  <motion.div
                    layoutId="shorestream-tab-pill"
                    className="absolute inset-0 bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 text-[9px] tracking-[0.15em] uppercase transition-colors ${timeIndex === i ? 'text-black font-semibold' : 'text-white/25'}`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t.label}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={timeIndex}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(3px)', y: -4 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div className="border-l-2 border-white/[0.06] pl-4">
                <p
                  className="text-[9px] tracking-[0.2em] uppercase text-white/15 mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Shore
                </p>
                <p className="text-[13px] text-white/35 leading-[1.75]">
                  {TIME_OUTCOMES[timeIndex].shore}
                </p>
              </div>
              <div className="pl-4" style={{ borderLeft: '2px solid rgba(225,29,72,0.35)' }}>
                <p
                  className="text-[9px] tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: "var(--font-mono)", color: 'rgba(225,29,72,0.55)' }}
                >
                  Stream
                </p>
                <p className="text-[13px] text-white/65 leading-[1.75]">
                  {TIME_OUTCOMES[timeIndex].stream}
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
   KnowledgeTypes
   Knowing about vs. knowing of. Domain examples across sport,
   surgery, navigation, music, coaching. Toggle between domains.
───────────────────────────────────────────────────────────────────── */
const KNOWLEDGE_DOMAINS = [
  {
    id: "navigation",
    domain: "Navigation",
    about: "Can describe the chart, the currents, the trade winds. Can explain dead reckoning to a student with perfect accuracy. Has never been at sea.",
    of: "Reads the water's surface and knows the current's direction before checking the chart. Feels the ship's drift through the deck. Navigates by direct perception of environmental information accumulated over years at sea.",
    aboutBuilt: "Books, charts, classroom instruction, simulation.",
    ofBuilt: "Time on the water where reading wrong has real consequences.",
  },
  {
    id: "surgery",
    domain: "Surgery",
    about: "Can name every structure in the operative field. Can describe the correct technique with precision. Can pass any written examination. Has never held a scalpel in a live patient.",
    of: "Knows by touch when the tissue plane is correct. Perceives resistance change before a complication develops. Makes decisions from direct information, not from recalled protocol.",
    aboutBuilt: "Anatomy textbooks, lectures, simulation models, observation.",
    ofBuilt: "Time in the operative environment where mistakes have irreversible consequences.",
  },
  {
    id: "coaching",
    domain: "Coaching",
    about: "Can explain ecological dynamics fluently. Knows Newell's constraints model, Gibson's affordance theory, representative design principle. Has not changed a single session design because of it.",
    of: "Walks into a practice and perceives within five minutes what the environment is producing and why. Design decisions emerge from direct reading of the session, not from consulting the framework.",
    aboutBuilt: "This course, books, podcasts, seminars, conference talks.",
    ofBuilt: "Running sessions where the design is tested against real athlete behavior and adjusted in real time.",
  },
  {
    id: "music",
    domain: "Music",
    about: "Can analyze the harmonic structure of a piece. Knows music theory at an advanced level. Can explain what makes a performance expressive. Cannot produce that expressiveness on demand.",
    of: "Feels the audience's energy before adjusting dynamics. Knows without thinking when the tempo should breathe. The music is not executed — it is perceived and responded to in real time.",
    aboutBuilt: "Music theory, analysis, observation of performances.",
    ofBuilt: "Performing in environments where the music has to respond to what is actually happening, not what was rehearsed.",
  },
  {
    id: "writing",
    domain: "Writing",
    about: "Knows the principles of good prose. Can identify what makes a piece work or fail in someone else's writing. Knows the rules of rhythm, structure, voice. Writes like they know the rules.",
    of: "Voice has settled into something that doesn't require rules. The sentence comes out right because the ear has been calibrated by years of writing and reading in environments where the distinction between good and bad mattered.",
    aboutBuilt: "Books on craft, MFA programs, reading criticism, analysis.",
    ofBuilt: "Writing consistently in public where readers respond — and the distinction between resonant and flat has real consequences.",
  },
];

export function KnowledgeTypes() {
  const [active, setActive] = useState(2);
  const domain = KNOWLEDGE_DOMAINS[active];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden"
      style={{ borderColor: spotActive ? 'rgba(225,29,72,0.18)' : undefined, transition: 'border-color 0.4s ease' }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.022 }} />
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: 'opacity 0.3s ease', background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />

      <div className="relative z-10">
        {/* Domain selector */}
        <div className="flex overflow-x-auto border-b border-white/[0.06]">
          {KNOWLEDGE_DOMAINS.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActive(i)}
              className="relative flex-shrink-0 px-5 py-3.5 text-[10px] tracking-[0.15em] uppercase border-r border-white/[0.04] last:border-r-0 transition-all duration-200"
              style={{
                fontFamily: "var(--font-mono)",
                color: active === i ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.20)',
              }}
            >
              {active === i && (
                <motion.div
                  layoutId="knowledge-domain-tab"
                  className="absolute inset-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{d.domain}</span>
              {active === i && (
                <motion.div
                  layoutId="knowledge-domain-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: 'rgba(225,29,72,0.55)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            exit={{ opacity: 0, filter: 'blur(3px)', y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2"
          >
            {/* Knowing about */}
            <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-white/[0.06]">
              <p
                className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Knowing about
              </p>
              <p className="text-[13px] text-white/40 leading-[1.8] mb-5 italic" style={{ fontFamily: "var(--font-serif)" }}>
                {domain.about}
              </p>
              <div className="border-t border-white/[0.06] pt-4">
                <p
                  className="text-[9px] tracking-[0.2em] uppercase text-white/15 mb-1.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Built through
                </p>
                <p className="text-[11px] text-white/25 leading-[1.6]">{domain.aboutBuilt}</p>
              </div>
            </div>

            {/* Knowing of */}
            <div className="p-6 sm:p-8" style={{ borderLeft: undefined }}>
              <p
                className="text-[9px] tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: "var(--font-mono)", color: 'rgba(225,29,72,0.7)' }}
              >
                Knowing of
              </p>
              <p className="text-[13px] leading-[1.8] mb-5 italic" style={{ fontFamily: "var(--font-serif)", color: 'rgba(255,255,255,0.80)' }}>
                {domain.of}
              </p>
              <div className="pt-4" style={{ borderTop: '1px solid rgba(225,29,72,0.10)' }}>
                <p
                  className="text-[9px] tracking-[0.2em] uppercase mb-1.5"
                  style={{ fontFamily: "var(--font-mono)", color: 'rgba(225,29,72,0.5)' }}
                >
                  Built through
                </p>
                <p className="text-[11px] text-white/50 leading-[1.6]">{domain.ofBuilt}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ApplicationGap
   Visualizes the gap between understanding and use.
   Shows how the gap closes — and what closes it (not more study).
───────────────────────────────────────────────────────────────────── */
const GAP_PATHS = [
  {
    id: "more-study",
    label: "More study",
    description: "You understand the idea more deeply. You can explain it with more nuance. The gap between understanding and use does not close.",
    understanding: 95,
    applicationGap: 80,
    color: "rgba(255,255,255,0.18)",
  },
  {
    id: "imperfect-apply",
    label: "Imperfect application",
    description: "The first attempt is messy. The gap is exposed — you realize you didn't fully understand how it worked in practice. The gap begins to close.",
    understanding: 72,
    applicationGap: 45,
    color: "rgba(255,255,255,0.55)",
  },
  {
    id: "iterated-apply",
    label: "Iterated application",
    description: "Third or fourth attempt. The idea is no longer a concept you apply — it's a lens through which you see. The gap has closed. Knowing of has emerged.",
    understanding: 85,
    applicationGap: 8,
    color: "rgba(255,255,255,0.80)",
  },
];

export function ApplicationGap() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const path = GAP_PATHS[active];

  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);
  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const isIteratedApply = path.id === "iterated-apply";

  return (
    <div
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      onMouseMove={handleSpotMove}
      onMouseEnter={() => setSpotActive(true)}
      onMouseLeave={() => setSpotActive(false)}
      className="relative border border-white/[0.08] bg-[#0d0d0c] overflow-hidden p-6 sm:p-8"
      style={{ borderColor: spotActive ? 'rgba(225,29,72,0.18)' : undefined, transition: 'border-color 0.4s ease' }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.022 }} />
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: 'opacity 0.3s ease', background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />

      <div className="relative z-10">
        <p
          className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          The gap between understanding and use — what closes it
        </p>

        <div className="flex gap-0 mb-8 border border-white/[0.08]">
          {GAP_PATHS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className="relative flex-1 py-3 text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase transition-all duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {active === i && (
                <motion.div
                  layoutId="appgap-tab-pill"
                  className="absolute inset-0 bg-white"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className={`relative z-10 transition-colors ${active === i ? 'text-black font-semibold' : 'text-white/25'}`}>
                {p.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={path.id}
            initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            exit={{ opacity: 0, filter: 'blur(3px)', y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5 mb-6"
          >
            {/* Understanding bar */}
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-[9px] text-white/25" style={{ fontFamily: "var(--font-mono)" }}>
                  Depth of understanding
                </p>
                <p className="text-[9px] text-white/35" style={{ fontFamily: "var(--font-mono)" }}>
                  {isIteratedApply ? <><AnimatedNum value={path.understanding} inView={inView} />%</> : `${path.understanding}%`}
                </p>
              </div>
              <div className="h-[3px] bg-white/[0.06]">
                <motion.div
                  className="h-full"
                  style={isIteratedApply
                    ? { background: 'linear-gradient(90deg, rgba(225,29,72,0.9) 0%, rgba(225,29,72,0.5) 100%)' }
                    : { backgroundColor: path.color }
                  }
                  initial={{ width: 0 }}
                  animate={{ width: `${path.understanding}%` }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </div>

            {/* Application gap bar */}
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-[9px] text-white/25" style={{ fontFamily: "var(--font-mono)" }}>
                  Gap between understanding and use
                </p>
                <p className="text-[9px] text-white/35" style={{ fontFamily: "var(--font-mono)" }}>
                  {isIteratedApply ? <><AnimatedNum value={path.applicationGap} inView={inView} />%</> : `${path.applicationGap}%`}
                </p>
              </div>
              {isIteratedApply ? (
                <div className="h-[3px] bg-white/[0.06]">
                  <motion.div
                    className="h-full"
                    style={{
                      width: `${path.applicationGap}%`,
                      backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 4px, transparent 4px, transparent 8px)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                </div>
              ) : (
                <div className="h-[3px] bg-white/[0.06]">
                  <motion.div
                    className="h-full bg-white/[0.15]"
                    initial={{ width: 0 }}
                    animate={{ width: `${path.applicationGap}%` }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                  />
                </div>
              )}
            </div>

            <p
              className="text-[13px] leading-[1.75]"
              style={{ color: isIteratedApply ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.50)' }}
            >
              {path.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ImperfectApplicationCurve
   What actually happens across the first few imperfect attempts.
   Normalizes the mess of first application and shows the trajectory.
───────────────────────────────────────────────────────────────────── */
const ATTEMPTS = [
  {
    id: "zero",
    label: "No attempt",
    sublabel: "Perfect understanding, perfect non-application",
    competence: 0,
    knowing: 85,
    description:
      "You know the idea inside out. You can teach it. You feel ready to apply it — just not yet. The conditions aren't quite right. You want to be more confident first.",
    reality: "The confidence never arrives without the attempt. This is the shore. It is comfortable. It produces nothing.",
  },
  {
    id: "first",
    label: "First attempt",
    sublabel: "Messy. Wrong in ways you didn't expect.",
    competence: 22,
    knowing: 55,
    description:
      "It doesn't go the way you planned. The athletes respond in ways your understanding didn't account for. You make corrections mid-session that undermine the constraint. You learn more in this session than in the last month of reading.",
    reality: "Your understanding actually drops — because you discover how much the model you held was incomplete. Competence begins to build from real soil.",
  },
  {
    id: "second",
    label: "Second attempt",
    sublabel: "Cleaner. You know what to watch for.",
    competence: 50,
    knowing: 70,
    description:
      "You've learned from the first failure. You design it differently. You know which variable to hold and which to adjust. The session produces something recognizable. You see the framework doing what it promised.",
    reality: "The model and the reality are converging. Understanding has grown not through study but through correction. The gap is closing.",
  },
  {
    id: "iterated",
    label: "Third to fifth",
    sublabel: "The idea starts disappearing into the work",
    competence: 82,
    knowing: 88,
    description:
      "You stop thinking about applying the framework. You just design. The principles are no longer concepts you consult — they're the lens you see through. The knowing of has emerged.",
    reality: "This is what getting in the stream produces. Not in a year. In five attempts. The shore had nothing to offer that the stream couldn't surpass in a single session.",
  },
];

export function ImperfectApplicationCurve() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const attempt = ATTEMPTS[active];

  const containerRef = useRef<HTMLDivElement>(null);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotActive, setSpotActive] = useState(false);
  const handleSpotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const isLastStage = attempt.id === "iterated";

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
      style={{ borderColor: spotActive ? 'rgba(225,29,72,0.18)' : undefined, transition: 'border-color 0.4s ease' }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.022 }} />
      <div className="pointer-events-none absolute inset-0" style={{ opacity: spotActive ? 1 : 0, transition: 'opacity 0.3s ease', background: `radial-gradient(320px circle at ${spotPos.x}px ${spotPos.y}px, rgba(225,29,72,0.07), transparent 60%)` }} />

      <div className="relative z-10">
        {/* Stage selector */}
        <div className="flex border-b border-white/[0.06] overflow-x-auto">
          {ATTEMPTS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setActive(i)}
              className="relative flex-shrink-0 flex-1 py-4 px-4 sm:px-5 text-left border-r border-white/[0.04] last:border-r-0 transition-all duration-200 min-w-[120px]"
              style={{ background: active === i ? 'rgba(255,255,255,0.04)' : undefined }}
            >
              <p
                className="text-[10px] tracking-[0.15em] uppercase mb-0.5 transition-colors"
                style={{ fontFamily: "var(--font-mono)", color: active === i ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.20)' }}
              >
                {a.label}
              </p>
              <p
                className="text-[9px] leading-[1.4] transition-colors"
                style={{ fontFamily: "var(--font-mono)", color: active === i ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.12)' }}
              >
                {a.sublabel}
              </p>
              {/* Gold bottom indicator for "Third to fifth" when active */}
              {active === i && a.id === "iterated" && (
                <motion.div
                  layoutId="iterated-gold-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: 'rgba(225,29,72,0.6)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={attempt.id}
            initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            exit={{ opacity: 0, filter: 'blur(3px)', y: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 space-y-5"
          >
            {/* Bars */}
            <div className="space-y-4">
              {[
                { label: "Real-world competence", value: attempt.competence },
                { label: "Depth of knowing", value: attempt.knowing },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="flex justify-between mb-2">
                    <p className="text-[9px] text-white/25" style={{ fontFamily: "var(--font-mono)" }}>
                      {label}
                    </p>
                    <p className="text-[9px] text-white/35" style={{ fontFamily: "var(--font-mono)" }}>
                      {isLastStage ? <><AnimatedNum value={value} inView={inView} />%</> : `${value}%`}
                    </p>
                  </div>
                  <div className="h-[3px] bg-white/[0.06]">
                    <motion.div
                      className="h-full"
                      style={isLastStage
                        ? { background: 'linear-gradient(90deg, rgba(225,29,72,0.9) 0%, rgba(225,29,72,0.5) 100%)' }
                        : { backgroundColor: 'rgba(255,255,255,0.50)' }
                      }
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[13px] text-white/55 leading-[1.8]">{attempt.description}</p>

            <div className="border-l-2 border-white/[0.10] pl-4">
              <p className="text-[12px] text-white/40 leading-[1.75] italic" style={{ fontFamily: "var(--font-serif)" }}>
                {attempt.reality}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
