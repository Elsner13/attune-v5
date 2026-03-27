"use client";

import {
  Label, P, BigQuote, KeyInsight, Analogy, ThinkAboutIt, Divider, Reveal, NumList, Visual,
} from "./shared";
import {
  AttunementTimeline, AttunementBlockers, SignalNoiseSplit, ObservationLens,
} from "./visuals-03";

export default function Module03() {
  return (
    <div className="space-y-2">

      {/* ── Section 1: The scout ─────────────────────────────── */}
      <Reveal>
        <Label>How seeing changes</Label>
        <P>
          Three years into coaching, I started watching sessions differently than I had at the start.
        </P>
        <P>
          Not dramatically. Not the day I read Gibson. Gradually, over months of being in environments
          where observation had consequences — where what I saw, or missed, actually affected the
          people I was working with.
        </P>
        <P>
          Early on, I watched the way most practitioners do: scanning for errors. Who&apos;s out of
          position. What technique deviation do I need to correct. I was watching to find my lines.
        </P>
        <P>
          Somewhere in year three, the same session started to look different. An athlete consistently
          out of position wasn&apos;t a correction problem — it was a symptom of an activity structure
          that kept producing that outcome. The same wrong decision made repeatedly wasn&apos;t a
          decision problem — it was the environment failing to make the right decision feel available.
        </P>
        <P>
          I stopped seeing errors. I started seeing what the environment was producing.
        </P>
        <P>
          I can&apos;t tell you exactly when it happened. I know it didn&apos;t happen through reading.
          It happened through being in enough sessions where I was watching instead of waiting to speak.
          The calibration was biological, not intellectual. At some point the session organized itself
          differently in my perception — slower, more legible, more structural — without any conscious
          effort to make that happen.
        </P>
        <P>
          That restructuring is called attunement. And it is the central subject of this module.
        </P>
      </Reveal>

      <BigQuote>
        The expert doesn&apos;t think faster. They perceive earlier. The analysis that looks like
        intuition is a nervous system that has been trained to pick up information before it becomes
        obvious to everyone else.
      </BigQuote>

      <Divider />

      {/* ── Section 2: What expertise actually is ────────────── */}
      <Reveal>
        <Label>The expert advantage — what it actually is</Label>
        <P>
          The standard model of expertise goes like this: you practice, you accumulate correct
          motor patterns, you get faster at retrieving them, and at some point your performance
          becomes automatic. The expert is a finely-tuned machine executing well-stored programs
          with high efficiency.
        </P>
        <P>
          This model has a problem. It doesn&apos;t explain why experts consistently report
          that things seem to slow down as they develop. The basketball player who says the game
          got slower. The surgeon who says the procedure &ldquo;opened up.&rdquo; The trader
          who says the market &ldquo;started speaking.&rdquo; If expertise were just faster
          processing, the experience should be of acceleration — not deceleration.
        </P>
        <P>
          What actually changes is not processing speed. It&apos;s the timing of information
          pickup. The expert perceives relevant information earlier in the sequence of events.
          They see the defender&apos;s weight shift before the move begins. They feel the
          tissue&apos;s resistance change before the complication develops. They read the
          market&apos;s posture before the move materializes.
        </P>
        <P>
          Earlier perception means more time to respond. Not because time has slowed — because
          the information that tells you what to do arrived earlier in the clock. The game didn&apos;t
          get slower. Their perceptual system got earlier.
        </P>
        <P>
          This is what attunement is: the progressive calibration of your perceptual system to
          pick up information earlier, more precisely, and with less conscious effort than it
          could before.
        </P>
      </Reveal>

      <Analogy>
        <p>
          A master sommelier can identify a wine&apos;s region, grape, and approximate vintage
          from a single sip. Not through molecular analysis — through perceptual attunement built
          over years of tasting in environments where the distinction between wines had real
          consequences for their work.
        </p>
        <br />
        <p>
          A novice tasting the same wine perceives the same molecules. The information is
          identical. The attunement is not. The novice tastes wine. The master tastes everything
          the wine contains. Same environment. Vastly different perception.
        </p>
        <br />
        <p>
          The sommelier didn&apos;t build this by reading about wine. They built it by being in
          environments where the distinction between wines mattered — and where getting it wrong
          had consequences.
        </p>
      </Analogy>

      <Reveal>
        <P>
          Here&apos;s the implication that most practitioners miss: attunement is not a trait.
          It is not something you have or don&apos;t have. It is a biological process — a literal
          restructuring of the perceptual system through experience in relevant environments.
          The nervous system physically changes.
        </P>
        <P>
          Neural pathways that are used repeatedly become more efficient. Pathways that respond
          to irrelevant information become inhibited. The perceptual system, over time, becomes
          a precision instrument tuned to the specific information that matters in the specific
          environment where it has been developed.
        </P>
        <P>
          This is why you cannot shortcut attunement through instruction. You can tell a novice
          where to look. You cannot transfer the perceptual-motor experience of having been in
          the environment enough times to let their nervous system calibrate to what&apos;s there.
          That calibration is the work. And it only happens through time in the right environment.
        </P>
      </Reveal>

      <Visual label="Perceptual development — four stages of attunement">
        <AttunementTimeline />
      </Visual>

      <Reveal>
        <P>
          Work through all four stages above. Notice what changes: not the environment, but
          the organism&apos;s relationship to it. The same practice session that overwhelms
          a Stage 01 organism is legible — almost slow — to a Stage 04 organism. The information
          was always there. The perceptual system available to read it was not.
        </P>
        <P>
          This has a concrete implication for how you design practice. A beginner placed in a
          Stage 04 environment — high information density, full complexity, multiple simultaneous
          signals — will not attune faster. They will be overwhelmed and default to attending to
          whatever is loudest and most obvious. You&apos;ve created noise, not signal.
        </P>
        <P>
          Attunement development requires environments calibrated to the current edge of the
          organism&apos;s perceptual capacity. Not too simple — no new information to attune to.
          Not too complex — too much information to differentiate. The productive zone is the
          one just beyond what they can currently read with ease.
        </P>
      </Reveal>

      <KeyInsight label="The perceptual sweet spot">
        Attunement develops in environments that are just beyond the organism&apos;s current
        perceptual comfort zone. Too simple and there&apos;s nothing new to calibrate to. Too
        complex and the system is overwhelmed and falls back on the most obvious signals. The
        practitioner&apos;s job is to find and maintain this edge — which means tracking not
        just what athletes can do, but what they can currently perceive.
      </KeyInsight>

      <Divider />

      {/* ── Section 3: The three blockers ────────────────────── */}
      <Reveal>
        <Label>What blocks attunement — the three silent killers</Label>
        <P>
          If attunement is the mechanism through which expertise develops, then blocking
          attunement is — functionally — blocking development. The practice continues. The
          repetitions accumulate. And the perceptual system doesn&apos;t change the way
          it should.
        </P>
        <P>
          There are three patterns that reliably produce this outcome. They&apos;re common.
          They feel like coaching. They are the opposite.
        </P>
      </Reveal>

      <Visual label="The three attunement blockers — click each to expand">
        <AttunementBlockers />
      </Visual>

      <Reveal>
        <P>
          Read through all three. Be honest about which one shows up most in your practice.
          For most practitioners, it&apos;s the first one — premature instruction — because
          it&apos;s the hardest to resist. The athlete is struggling. You can see exactly what
          they need to do differently. Saying it takes ten seconds.
        </P>
        <P>
          But that ten seconds comes at a cost. You solved the problem before they had to
          solve it. Their perceptual system never had to grapple with the situation. The
          answer arrived from outside before the internal search began. And the internal
          search — the struggle to read the environment and generate a solution — is exactly
          where attunement develops.
        </P>
        <P>
          The instruction gave them the answer. The silence would have given them the capacity
          to find it themselves next time.
        </P>
      </Reveal>

      <ThinkAboutIt>
        When was the last time you let an athlete or student sit with a problem long enough
        that their own perceptual system had to engage with it — without you resolving it for
        them? How long can you hold the silence before the pull to intervene becomes
        overwhelming? That discomfort is the signal. The tolerance for it is the practice.
      </ThinkAboutIt>

      <Divider />

      {/* ── Section 4: Signal and noise ──────────────────────── */}
      <Reveal>
        <Label>Signal and noise — the perceptual discrimination problem</Label>
        <P>
          Every environment contains more information than any organism can process. The field
          has twelve players, a ball, a referee, a crowd, weather, previous play residue, social
          dynamics, team communication. All of it is information. Most of it is irrelevant to
          what needs to happen next.
        </P>
        <P>
          Attunement is not just learning to perceive more. It is learning to perceive
          selectively — to amplify what matters and suppress what doesn&apos;t. The expert
          performer isn&apos;t processing everything in the environment more efficiently.
          They&apos;ve stopped processing most of it. Their perceptual system filters
          automatically, based on what has proven relevant through experience.
        </P>
        <P>
          The novice doesn&apos;t have that filter yet. Everything in the environment carries
          roughly equal weight. The crowd noise, the coach&apos;s voice, the score, the position
          of a player on the far side of the pitch — all of it competes for attention at roughly
          the same volume.
        </P>
        <P>
          This is why high-pressure environments overwhelm beginners in ways they don&apos;t
          overwhelm experts. More signals. More noise. A perceptual system that hasn&apos;t yet
          developed the filter to separate them.
        </P>
      </Reveal>

      <Visual label="Signal vs. noise — attunement develops perceptual discrimination">
        <SignalNoiseSplit />
      </Visual>

      <Reveal>
        <P>
          The third blocker — noise from the practitioner — is particularly interesting here.
          Because the coach&apos;s voice is information. It occupies attention. When you speak
          during activity, you are one of the signals in the environment. And you are competing
          with the environmental signals the athlete needs to attune to.
        </P>
        <P>
          The athlete who learns to read your voice learns nothing about reading the game.
          The athlete who learns to read the game develops a perceptual skill that exists
          independent of you — and survives the removal of your presence. Which is, after all,
          the point. You want to coach them toward the ability to not need you.
        </P>
        <P>
          That goal requires you to be less present during activity than your instincts will
          want you to be. It requires trusting the environment to do the work that you
          habitually reach for the voice to do.
        </P>
      </Reveal>

      <BigQuote>
        The coach who talks constantly during practice is the loudest source of noise in
        the room. Their athletes learn to read them. They never learn to read the game.
      </BigQuote>

      <Divider />

      {/* ── Section 5: Attunement from the inside ────────────── */}
      <Reveal>
        <Label>What attunement feels like — from the inside</Label>
        <P>
          This section is for you — the practitioner — not just your athletes. Because you
          are also an organism coupling with an environment. You develop perceptual attunement
          to your practice environment, to your athletes, to the sessions you run.
        </P>
        <P>
          And it&apos;s useful to understand what that development feels like, so you can
          recognize it when it&apos;s happening — and notice when it stalls.
        </P>
        <P>
          Early in your practice, you watched sessions and saw a lot of problems. You
          catalogued errors. Technique deviations. Missed assignments. The session felt
          busy — so much happening, and you were trying to see all of it.
        </P>
        <P>
          At some point — if you were in environments where observation mattered and had
          consequences — the session started to organize itself differently in your perception.
          Patterns became visible. You stopped seeing isolated errors and started seeing
          systemic causes. The player who missed the assignment wasn&apos;t a correction
          problem; they were a symptom of an environmental design problem you could see
          in the structure of the activity.
        </P>
        <P>
          The session got slower. Not literally — but perceptually. Because you were
          picking up the information earlier, and more of it was now meaningful rather
          than random.
        </P>
        <P>
          That is what developing attunement to your own practice environment feels like.
          And most practitioners have experienced some version of it — without ever naming
          it, or deliberately trying to accelerate it.
        </P>
      </Reveal>

      <Analogy>
        <p>
          A new hospital nurse sees a patient as a collection of vital signs and test results.
          The experienced attending physician sees the same patient and immediately perceives
          the story behind the numbers — what the pattern means, which way it&apos;s moving,
          what&apos;s driving it.
        </p>
        <br />
        <p>
          They&apos;re reading the same chart. The attending&apos;s perceptual system has
          been calibrated through thousands of hours in that environment to extract the
          pattern from the data rather than just read the data.
        </p>
        <br />
        <p>
          The new nurse can learn to read the pattern — not through more chart-reading
          instruction, but through more time at the bedside where the distinction between
          stable and deteriorating has real consequences for real people.
        </p>
      </Analogy>

      <Divider />

      {/* ── Section 6: Two kinds of observation ──────────────── */}
      <Reveal>
        <Label>Two kinds of observation — and why one builds attunement</Label>
        <P>
          There is a way of watching a practice session that looks like attunement development
          but isn&apos;t. It&apos;s called error-scanning. And it&apos;s what most practitioners
          default to because it&apos;s what they were trained — implicitly or explicitly — to do.
        </P>
        <P>
          Error-scanning means watching for deviations from a correct template. The focus is on
          the individual, the movement, the output. The question running in the background is:
          what went wrong, and what should I say about it?
        </P>
        <P>
          This is not useless. Identifying errors is part of the job. But error-scanning keeps
          your attention at the surface — at outputs — rather than at the environmental conditions
          that produced those outputs. It generates a list of corrections. It doesn&apos;t generate
          understanding of why the session is producing what it&apos;s producing.
        </P>
        <P>
          Pattern-reading is different. The attention is on the system — the interaction between
          organism, task, and environment. The question running in the background is: what is
          the environment producing, and why? The individual error is data, not the object of
          analysis. The structure of the activity that generated it is what you&apos;re trying
          to see.
        </P>
        <P>
          Pattern-reading is harder. It requires holding a wider attentional aperture. It
          produces less immediate satisfaction — you don&apos;t end the observation with a
          list of corrections. But it builds the practitioner&apos;s attunement to their
          practice environment in a way that error-scanning never does.
        </P>
      </Reveal>

      <Visual label="Same session — error-scanning vs. pattern-reading">
        <ObservationLens />
      </Visual>

      <Reveal>
        <P>
          The error-scanning lens produces interventions. The pattern-reading lens produces
          design changes. Both have their place. But if error-scanning is your default —
          if you end every session with a list of things to correct and no understanding
          of the environmental conditions that produced them — you are not developing your
          attunement to the practice environment. You are developing a list of corrections.
        </P>
        <P>
          The practitioner who develops genuine attunement to their environment can walk into
          a session five minutes in and already know what constraints need adjusting. Not from
          a checklist. From perceiving what the environment is producing and understanding why.
        </P>
        <P>
          Not magic. Not intuition. A nervous system calibrated to the information that matters,
          through years of pattern-reading in environments where getting it right mattered. That&apos;s
          what genuine attunement to a practice environment looks like. And it only develops through
          pattern-reading — not error-scanning.
        </P>
      </Reveal>

      <KeyInsight>
        Attunement as a practitioner means shifting from &ldquo;what corrections do I need
        to make?&rdquo; to &ldquo;what is the environment producing, and why?&rdquo; The first
        question is about individual outputs. The second is about system dynamics. You can answer
        the first after one session. The second takes years — and builds the kind of perceptual
        expertise that makes experienced practitioners seem to see things nobody else can see.
      </KeyInsight>

      <Divider />

      {/* ── Section 7: Attunement cannot be transferred ──────── */}
      <Reveal>
        <Label>The one thing you cannot give someone</Label>
        <P>
          Everything else in this course is about designing environments that produce learning.
          This section is about the one thing no environment design can shortcut.
        </P>
        <P>
          Attunement cannot be transferred. It cannot be given. It cannot be installed through
          instruction, demonstration, or explanation. It develops through presence — through
          being in environments where the relevant information is present and where reading it
          correctly has real consequences.
        </P>
        <P>
          This is one of the most important sentences in the course. Read it again.
        </P>
        <P>
          You can describe attunement. You can show examples of it. You can design environments
          where it can develop. But you cannot transfer your perceptual attunement to your
          athletes any more than the sommelier can transfer their wine perception to a student
          through a lecture.
        </P>
        <P>
          The student has to taste. In the environments where the distinction matters. Over
          time. That&apos;s the work.
        </P>
        <P>
          What this means for your practice design: the most valuable thing you can do is not
          find better ways to explain what you perceive. It&apos;s design environments where
          the athletes have to perceive it themselves — where the consequences of missing the
          information are built into the activity, not narrated by you afterward.
        </P>
      </Reveal>

      <NumList
        items={[
          "Design activities where missing the relevant information has a direct, immediate consequence — not a correction afterward.",
          "Vary the environment enough that the organism cannot rely on a pre-set response. Make reading required.",
          "Let errors run their consequence before intervening. The consequence is the instruction.",
          "Observe with a pattern-reading lens, not an error-scanning lens. Build your own attunement to the environment.",
          "Measure your practice not by corrections given, but by perceptual challenges created.",
        ]}
      />

      <Reveal>
        <P>
          These are not abstract principles. They are the specific design choices that create
          the conditions for attunement to develop — in your athletes and in yourself. They
          require patience. They require the ability to watch struggle without resolving it.
          They require a trust in the environment as the teacher that most practitioners never
          fully develop.
        </P>
        <P>
          Module 04 is where we take this into the design itself: how to build practice
          environments that systematically create perceptual challenges rather than reducing
          them. The attunement framework sits beneath all of it.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 8: The silence experiment ────────────────── */}
      <Reveal>
        <Label>The silence experiment — what happens when you stop</Label>
        <P>
          The move below asks you to run a session in silence. Not completely — you can set
          up the activity, you can debrief after, you can answer direct questions. But during
          the activity itself: no instruction, no cues, no corrections.
        </P>
        <P>
          Most practitioners who try this for the first time report the same experience: profound
          discomfort in the first ten minutes, followed by something unexpected. The athletes
          start talking to each other. They start reading the environment. The decisions that
          you were narrating start to emerge — imperfectly, slowly at first — from the athletes
          themselves.
        </P>
        <P>
          The second thing practitioners report: they notice things they&apos;ve never noticed
          before. Because they weren&apos;t watching to find what to say next, they were actually
          watching. The observation quality changes when the observation isn&apos;t in service of
          immediate instruction.
        </P>
        <P>
          This is the experiment that Module 04 begins to systematize. But it starts here, in
          the practice of choosing silence — once, deliberately, to see what the environment
          teaches when you stop competing with it.
        </P>
      </Reveal>

      <ThinkAboutIt>
        What would happen in your next session if you said nothing during the activity for
        the entire session? What do you fear would fall apart? What you fear is almost certainly
        the thing that has been running on your voice rather than on the environment you&apos;ve
        designed. That fear is the diagnostic.
      </ThinkAboutIt>

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
              Run your next practice session with one deliberate constraint on yourself:
              no verbal instruction during the activity itself. You can explain the setup
              before it starts. You can ask questions and facilitate a debrief after. But while
              the activity is running — stay quiet. Arms crossed. Watching.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              While you watch, use the pattern-reading lens. Don&apos;t scan for errors.
              Ask: what is the environment producing? When the wrong decision gets made,
              ask: what information was absent, or present but not perceived? What was
              the environment offering that they couldn&apos;t yet read?
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              At the end of the session, write down two things: what the athletes naturally
              attended to without your guidance, and what they consistently missed. The first
              tells you what the environment is currently offering loudly enough to perceive.
              The second tells you what needs to be redesigned — or what needs more time.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              That gap between what they saw and what they missed is the attunement edge.
              Module 04 is about building practice environments that work precisely at that edge.
            </p>
          </div>
        </div>
      </Reveal>

    </div>
  );
}
