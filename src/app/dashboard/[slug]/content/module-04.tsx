"use client";

import {
  Label, P, BigQuote, KeyInsight, Analogy, ThinkAboutIt, Divider, Reveal, NumList, Visual,
} from "./shared";
import {
  CueToDesign, RepresentativenessSpectrum, ConstraintDesignMatrix, DesignIterations,
} from "./visuals-04";

export default function Module04() {
  return (
    <div className="space-y-2">

      {/* ── Section 1: The moment of reaching ───────────────── */}
      <Reveal>
        <Label>The moment you reach for it</Label>
        <P>
          There is a cue I gave for years that I didn&apos;t understand until I stopped giving it.
        </P>
        <P>
          &ldquo;Stay connected to the throw.&rdquo;
        </P>
        <P>
          Discus is a full-body rotation in a constrained space. The connection between your lower
          body leading and your upper body following is everything. I watched athletes break that
          connection constantly. I told them to stay connected. They&apos;d adjust. I&apos;d move
          on. Progress felt made.
        </P>
        <P>
          It took me an embarrassing number of years to ask the obvious question: why do they break
          connection in the first place?
        </P>
        <P>
          The answer wasn&apos;t technical. It was ecological. The drill I was running created
          conditions where breaking connection was the most available response — because I had
          stripped out the perceptual information that makes staying connected the right choice.
          The timing cue in competition, the moment when connection matters, comes from reading
          a specific configuration of environmental conditions that weren&apos;t present in the
          drill. I had removed the signal and then corrected the behavior that resulted from
          its absence.
        </P>
        <P>
          The verbal instruction was substituting for a design problem I hadn&apos;t solved.
        </P>
        <P>
          Every cue you give is doing the same thing. This module is about what the cue is actually
          telling you — and what to build instead of giving it again.
        </P>
      </Reveal>

      <BigQuote>
        The cue is not the teaching. It&apos;s the evidence that the environment failed to teach.
        Every cue you give is a diagnostic — a signal pointing back at the conditions you built.
      </BigQuote>

      <Divider />

      {/* ── Section 2: The cue as diagnostic ────────────────── */}
      <Reveal>
        <Label>The cue as a design diagnostic</Label>
        <P>
          This is not an argument against verbal instruction. There are moments where a cue
          is the right tool — when an athlete needs safety information, when a concept needs
          a shared name, when a debrief needs anchoring language. Instruction has a place.
        </P>
        <P>
          The argument is about sequencing and frequency. Most practitioners reach for instruction
          first. The ecological framework asks you to reach for it last — after you&apos;ve
          exhausted the question of whether environment design could have produced the behavior
          without it.
        </P>
        <P>
          When you reframe every cue as a diagnostic rather than a correction, something shifts.
          Instead of asking &ldquo;what should I tell them?&rdquo; you start asking &ldquo;what
          is the environment failing to demand?&rdquo; Those two questions lead to completely
          different practice sessions.
        </P>
        <P>
          The six cues below are among the most common in coaching and teaching across domains.
          Each one points to a specific environment design problem. The goal isn&apos;t to stop
          giving cues — it&apos;s to know what each cue is telling you about what needs to
          be redesigned.
        </P>
      </Reveal>

      <Visual label="Common cues — and the design problems they reveal">
        <CueToDesign />
      </Visual>

      <Reveal>
        <P>
          Work through the cues above. You&apos;ll likely recognize some of them as phrases
          you use. The point isn&apos;t guilt — the point is pattern recognition. Once you see
          that a cue about &ldquo;first touch&rdquo; is almost always a representativeness
          problem, and a cue about &ldquo;communication&rdquo; is almost always a task design
          problem, the cues become information rather than habit.
        </P>
        <P>
          You can still give the cue. But now you also know what to redesign.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 3: Constraints as the design medium ──────── */}
      <Reveal>
        <Label>What you&apos;re actually designing with</Label>
        <P>
          If the cue is the last resort, then what comes before it? What is the actual material
          of practice design — the thing you shape and manipulate to produce the behaviors you
          want?
        </P>
        <P>
          The answer is constraints.
        </P>
        <P>
          Not constraints in the restrictive sense — not things that limit and prevent. Constraints
          in the technical ecological sense: any boundary, rule, structure, or condition that shapes
          what behaviors are available and what the organism perceives as possible.
        </P>
        <P>
          The size of the space is a constraint. The number of players is a constraint. The
          scoring rule is a constraint. The equipment is a constraint. The presence or absence
          of a defender is a constraint. The time limit per possession is a constraint. The surface
          you play on is a constraint.
        </P>
        <P>
          Each of these can be added, removed, or modified. And each manipulation changes the
          information landscape — what the organism must perceive and respond to — without you
          saying a word.
        </P>
        <P>
          That&apos;s the power of constraint-led design. The behavior changes because the
          environment changed. Not because you told it to. And because the behavior was
          generated by the organism reading the environment, rather than by the organism
          following an instruction, it&apos;s more likely to transfer to environments where
          you aren&apos;t there to give the instruction.
        </P>
      </Reveal>

      <Analogy>
        <p>
          An architect who wants people to slow down and appreciate a garden doesn&apos;t
          stand at the entrance telling every visitor to walk slowly. They design a winding
          path. They place interesting things at irregular intervals. They create a space
          where the most natural behavior is the behavior they want.
        </p>
        <br />
        <p>
          The behavior emerges from the environment. The architect didn&apos;t coerce it.
          They designed for it. The constraint — the winding path — did the teaching.
        </p>
        <br />
        <p>
          This is your job at its highest level: not to tell, but to build environments where
          the right behavior is the most naturally available one.
        </p>
      </Analogy>

      <Visual label="The design matrix — your full toolkit of constraint manipulations">
        <ConstraintDesignMatrix />
      </Visual>

      <Reveal>
        <P>
          The matrix above is not a checklist to run through before every session. It&apos;s a
          map of the design space — a way of seeing the full range of tools available to you.
          Most practitioners habitually reach for one or two cells in this matrix. They modify
          task constraints constantly and rarely touch environment constraints. Or they add
          constraints and never think about removing them.
        </P>
        <P>
          Mastery of constraint-led design means fluency across the entire matrix — knowing when
          to add, when to remove, when to modify, and whether the manipulation should target the
          task or the environment. That fluency develops through deliberate practice of designing,
          observing, and adjusting.
        </P>
        <P>
          Which brings us to the most important concept in this module.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 4: Representative design ────────────────── */}
      <Reveal>
        <Label>The one question that changes everything</Label>
        <P>
          Every design decision you make in practice — every constraint you add, remove, or
          modify — should be evaluated against one question:
        </P>
        <P>
          Does this environment preserve the essential informational structure of the
          performance environment?
        </P>
        <P>
          This is the representative design principle. And it is the single most important
          idea in practice design.
        </P>
        <P>
          Not: does this environment look like the performance environment? Appearances
          aren&apos;t the point. A drill that perfectly mimics the spatial arrangement of
          a game situation can still be completely non-representative if it removes the
          perceptual information the athlete needs to navigate that situation.
        </P>
        <P>
          Not: does this environment have the same rules as the performance environment?
          Rules aren&apos;t the point either. You can use completely different rules and still
          preserve the essential informational structure. The conditioned game that forces
          wide play through a scoring rule is more representative of a game that demands
          width than a full-rules drill that allows direct play.
        </P>
        <P>
          The question is always: what information does the organism need to perceive and
          respond to in performance? Is any version of that information present in this
          practice environment?
        </P>
      </Reveal>

      <KeyInsight label="Representative design in one sentence">
        You can simplify. You can isolate. You can constrain. But you cannot remove the essential
        perception-action coupling of the performance environment and expect the skill you build
        to survive contact with it. The practice environment must contain some version of the
        information the organism will need to read in performance. That&apos;s the line.
      </KeyInsight>

      <Reveal>
        <P>
          Here&apos;s the diagnostic question applied to a common scenario. Your athletes need
          to improve their decision-making under pressure. You design a 1v0 finishing drill —
          no goalkeeper, no defender — to let them focus on technique without the noise of
          pressure.
        </P>
        <P>
          What information is present in a 1v0 finishing drill?
        </P>
        <P>
          The ball. The goal. Motor feedback from the movement itself. That&apos;s roughly it.
        </P>
        <P>
          What information is present in the actual performance context?
        </P>
        <P>
          The goalkeeper&apos;s body position. The defender&apos;s line of approach. The window
          that opens and closes based on movement. The decision: shoot now or wait? The
          physiological state from having just sprinted. The score, the clock, the social
          pressure of the moment.
        </P>
        <P>
          None of that is in the 1v0 drill. The technique being built is real. It&apos;s being
          built for an environment that doesn&apos;t exist. The skill will look excellent in
          the drill and dissolve the moment any of the absent information arrives.
        </P>
      </Reveal>

      <Visual label="The representativeness spectrum — where does your practice activity sit?">
        <RepresentativenessSpectrum />
      </Visual>

      <Reveal>
        <P>
          Move through the spectrum above. Notice how small constraint changes shift the
          representativeness dramatically. The difference between a blocked drill and a
          variable drill isn&apos;t fundamentally different in appearance — but the information
          present in each is categorically different.
        </P>
        <P>
          This is the skill: learning to see not what the activity looks like,
          but what information it contains. Two drills can look identical and have completely
          different representativeness. Two drills can look completely different and preserve
          the same essential informational structure.
        </P>
        <P>
          Train your eye on the information, not the form.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 5: The design iteration ─────────────────── */}
      <Reveal>
        <Label>Design in iterations — not overhauls</Label>
        <P>
          One of the most common misreadings of the constraints-led approach is that it requires
          throwing out everything you currently do and rebuilding from scratch. It doesn&apos;t.
        </P>
        <P>
          Representative design is not a binary. Activities don&apos;t jump from
          &ldquo;decontextualized&rdquo; to &ldquo;fully representative&rdquo; in one move.
          They improve through iteration — one constraint added, one piece of information
          reintroduced, one modification that brings the activity closer to the perceptual
          demands of performance.
        </P>
        <P>
          The practice below — a shooting drill — goes through three design iterations. The
          fundamental activity doesn&apos;t change. The information present does. This is how
          design actually works: incrementally, observationally, one constraint at a time.
        </P>
      </Reveal>

      <Visual label="One drill — three design iterations">
        <DesignIterations />
      </Visual>

      <Reveal>
        <P>
          Notice that going from Version 01 to Version 02 required one change: adding a
          goalkeeper who moves before the shot. One constraint. And the representativeness
          moved from roughly 12% to 45%. The fundamental activity — shooting — didn&apos;t
          change. The information the shooter has to read did.
        </P>
        <P>
          That&apos;s the design rhythm. Identify the largest gap between your practice
          environment and your performance environment. Add, remove, or modify one constraint
          to close that gap. Observe what changes in the behavior. Adjust again.
        </P>
        <P>
          You are not redesigning sessions. You are developing a design practice — an ongoing
          attunement to your own environments and what they&apos;re producing.
        </P>
      </Reveal>

      <ThinkAboutIt>
        Take the drill you use most often. Version 01 of it is what you currently run. What
        is the single largest gap between it and the performance context it&apos;s meant
        to prepare for? Not multiple gaps — the largest one. What piece of perceptual
        information is most critically absent? That gap is your first constraint change.
        You don&apos;t need to solve everything. You need to move the needle on that one thing.
      </ThinkAboutIt>

      <Divider />

      {/* ── Section 6: The freedom inside the constraint ─────── */}
      <Reveal>
        <Label>The freedom inside the constraint</Label>
        <P>
          There is something counterintuitive about constraint-led design that only becomes
          visible when you&apos;ve practiced it long enough to see the results.
        </P>
        <P>
          Constraints don&apos;t restrict behavior. They channel it. And when they channel
          behavior toward the right affordances, what emerges is not uniformity — it&apos;s
          diversity. Athletes solving the same constrained problem develop different solutions
          based on their individual organism characteristics. The constraint doesn&apos;t produce
          one answer. It produces the space in which each organism finds its own best answer.
        </P>
        <P>
          This is why Bernstein — whose work is as foundational to ecological dynamics as
          Gibson&apos;s — wrote about &ldquo;repetition without repetition.&rdquo; The problem
          looks the same each time. The solution is always slightly different. The organism
          explores the solution space and finds what works for it, in that moment, with those
          constraints. That exploration is where durable skill lives.
        </P>
        <P>
          Instruction produces the same answer every time. Constraints produce a different
          answer every time that converges on the same successful outcome. One is rigid.
          The other is adaptive. Performance environments are not rigid.
        </P>
      </Reveal>

      <BigQuote>
        Repetition without repetition. The problem is the same. The solution is always new.
        That&apos;s not inconsistency — that&apos;s a nervous system exploring the solution
        space. Let it explore. The constraint creates the channel. The organism finds the path.
      </BigQuote>

      <Divider />

      {/* ── Section 7: The practitioner's new job description ── */}
      <Reveal>
        <Label>What the job actually is now</Label>
        <P>
          Across the first four modules, the practitioner&apos;s role has been progressively
          redefined. Module 01 introduced the mismatch problem. Module 02 reframed the
          practitioner as an environment designer. Module 03 established observation —
          pattern-reading — as the practitioner&apos;s primary skill. This module makes
          the job concrete.
        </P>
        <P>
          The job is this: design environments whose informational structure matches the
          performance context you&apos;re preparing for. Use constraints as the design medium.
          Observe what the environment produces. Iterate. Use the cue only when the environment
          can&apos;t do the work alone.
        </P>
        <P>
          This is harder than instruction. It requires more preparation, more observation,
          more tolerance for ambiguity, and more patience with the development process.
          It produces results that are slower to appear and far more durable when they do.
        </P>
        <P>
          It also requires something that instruction doesn&apos;t: genuine knowledge of
          the performance environment. You cannot design representative practice if you
          don&apos;t deeply understand what information is present in performance. What
          the organism actually has to perceive and respond to. What the real constraints are.
        </P>
        <P>
          This is why Module 05 follows from Module 04. You cannot design representative
          environments for a performance context you haven&apos;t studied as carefully as
          a practitioner as you once studied it as a performer.
        </P>
      </Reveal>

      <NumList
        items={[
          "Before designing any practice activity, ask: what information is present in the performance environment that the athlete must perceive?",
          "Map your current activity against that list. What's present? What's absent?",
          "Identify the single largest gap — the most important absent information.",
          "Design one constraint change that reintroduces that information without abandoning the activity.",
          "Run it. Watch what changes in the behavior — not in the technique, in the decisions.",
          "After the session: did the environment do the teaching, or did you? What cues did you give? What do they tell you about the next design iteration?",
        ]}
      />

      <Reveal>
        <P>
          This process doesn&apos;t end. It&apos;s not a problem you solve once and move on from.
          It&apos;s a practice — an ongoing attunement to the environments you build and what
          they&apos;re producing. The practitioners who do this well have been doing it for years.
          They see their sessions differently from the inside because they&apos;ve learned to see
          them as designed environments rather than scheduled activities.
        </P>
        <P>
          That shift in seeing is what Module 05 is going to demand. Before you can train perception
          in your athletes, you need to have genuinely trained it in yourself.
        </P>
      </Reveal>

      <Divider />

      {/* ── The Move ─────────────────────────────────────────── */}
      <Reveal>
        <div className="border border-white/[0.14] bg-white/[0.04] px-7 py-6">
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-white/40 mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            The Move
          </p>
          <div className="space-y-4">
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Take the constraint map you built in Module 02 — the gap you identified between
              your practice environment and your performance environment. If you haven&apos;t
              built it yet, do it now before continuing. Identify your most-used practice
              activity and map both the practice constraints and the performance constraints
              across organism, task, and environment.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Pick the largest gap — the single piece of performance-environment information
              that is most critically absent from your practice. Design one modification to
              your next session that reintroduces that information. One constraint. Not a
              session overhaul.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Run it. Give zero instruction about the change you made. Don&apos;t tell them
              what to look for or what to do differently. Just change the environment and watch
              what happens to the behavior.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Write down: what changed in the behavior without you saying anything about it?
              What didn&apos;t change that you expected to? That gap between what you expected
              and what happened is the design feedback. Bring it to Module 05.
            </p>
          </div>
        </div>
      </Reveal>

    </div>
  );
}
