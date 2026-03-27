"use client";

import {
  Label, P, BigQuote, KeyInsight, Analogy, ThinkAboutIt, Divider, Reveal, NumList, Visual,
} from "./shared";
import {
  PerceptionActionLoop, CoupledVsDecoupled, UncertaintySpectrum, PerceptionFirstExamples,
} from "./visuals-05";

export default function Module05() {
  return (
    <div className="space-y-2">

      {/* ── Section 1: The thrower ───────────────────────────── */}
      <Reveal>
        <Label>The thrower who couldn&apos;t throw in meets</Label>
        <P>
          This is a story about me.
        </P>
        <P>
          Technically, on paper, I was one of the better throwers in the region. My mechanics
          were clean. My coach had worked with me for years on every detail — the grip, the wind,
          the footwork in the ring, the release angle. In practice, I threw consistently. You could
          watch me for an hour and find almost nothing to correct.
        </P>
        <P>
          Then a meet. And something fell apart that nobody could explain.
        </P>
        <P>
          The throws weren&apos;t terrible. But they weren&apos;t mine. The mechanics everyone
          had spent years building disappeared under conditions none of us had built them for.
          I&apos;d stand in the ring — same ring, same implement, same movements I&apos;d made
          ten thousand times — and produce something categorically different from practice.
        </P>
        <P>
          My coach called it nerves. I called it nerves too. For two years we worked on mental
          skills, visualization, breathing routines. Nothing changed.
        </P>
        <P>
          What nobody asked: what was different about the meet environment? Not psychologically.
          Informationally. What did the meet contain that practice didn&apos;t? What was I being
          asked to perceive and respond to that I had never practiced perceiving and responding to?
        </P>
        <P>
          That question — the one nobody asked — is the subject of this module.
        </P>
      </Reveal>

      <BigQuote>
        The mechanics weren&apos;t the problem. They never were. The perception-action
        coupling was. I had a technique for a practice environment. I had no technique for
        what a meet actually demands.
      </BigQuote>

      <Divider />

      {/* ── Section 2: Action is last ────────────────────────── */}
      <Reveal>
        <Label>Action is the last thing that happens</Label>
        <P>
          Here is a fact that sounds obvious when you say it plainly and is somehow almost
          never applied in practice design: every movement you have ever made was preceded
          by a perception.
        </P>
        <P>
          Every single one.
        </P>
        <P>
          The hand that catches the ball was tracking its trajectory before the fingers closed.
          The foot that plants in exactly the right place was guided by an eye that read the
          surface. The tackle that arrives at exactly the right angle was directed by a
          perception of where the runner was going, not where they were.
        </P>
        <P>
          Action is the last thing in the chain. Perception is first. Decision is in between.
          The chain looks like this: perceive the environment → form a response → execute.
          And then the execution changes the environment, which generates new perceptual
          information, which guides the next action. It&apos;s not a chain. It&apos;s a loop.
          It&apos;s always running.
        </P>
        <P>
          We train the last step. We assume the first. We spend almost all of our time building
          motor patterns — getting the execution clean, consistent, automatic — and we assume
          that the perception and decision stages will take care of themselves when the
          performance environment arrives.
        </P>
        <P>
          They don&apos;t.
        </P>
        <P>
          They were never trained. They were never asked to perform. They were assumed to be
          there and then discovered, under pressure, to be absent.
        </P>
      </Reveal>

      <Analogy>
        <p>
          Imagine training a musician to play a piece by working exclusively on finger
          positioning and key pressure — the physical execution — with no music playing.
          They develop perfect finger mechanics in silence.
        </p>
        <br />
        <p>
          Then they sit in front of an orchestra and are asked to play. Their fingers
          know the keys. But the perception of what they&apos;re supposed to play in response
          to the conductor, the other players, the phrase of the piece — that was never built.
        </p>
        <br />
        <p>
          The hand was trained. The ear was assumed. And the ear is the thing that makes
          the hand musical rather than mechanical.
        </p>
      </Analogy>

      <Divider />

      {/* ── Section 3: The loop ──────────────────────────────── */}
      <Reveal>
        <Label>The loop — and what breaks when you sever it</Label>
        <P>
          Gibson described perception and action not as a sequence with a starting point
          and an endpoint, but as a loop. Continuous. Bidirectional. Each stage dependent
          on all the others.
        </P>
        <P>
          You perceive something in the environment. That perception informs an action.
          The action changes the environment — your position changes, the ball moves,
          the opponent responds. The changed environment generates new perceptual information.
          That information informs the next action. And on. Without stop. Without a moment
          where perception is finished and action begins. They&apos;re simultaneous, ongoing,
          inseparable.
        </P>
        <P>
          This is not a philosophical claim. It&apos;s a description of how the nervous
          system works. Motor systems and perceptual systems are not independent departments
          that hand off a baton. They&apos;re entangled — continuous mutual influence, constantly
          updating, never fully sequential.
        </P>
        <P>
          When you train action divorced from perception — when you drill a movement in an
          environment that contains none of the perceptual information the movement needs
          to respond to — you build half a loop. The action half. The other half, the half
          that tells the action what to do and when, is never built. And when the performance
          environment arrives and the full loop is required, the untrained half doesn&apos;t
          appear. You have a motor pattern with no compass.
        </P>
      </Reveal>

      <Visual label="The perception-action loop — coupled vs. broken">
        <PerceptionActionLoop />
      </Visual>

      <Reveal>
        <P>
          Switch between coupled and broken above. In the broken loop, the perception and
          decision nodes don&apos;t disappear — they just stop being trained. The motor pattern
          still executes. But it executes without orientation. It has learned to run without
          the environmental input that tells it which direction to run.
        </P>
        <P>
          This is the thrower in the ring. The mechanics were intact. The coupling between
          the mechanics and the perceptual information in the meet environment — the judges,
          the other competitors, the crowd, the consequence structure, the unfamiliar energy
          of the space — was never developed. Because it was never practiced.
        </P>
        <P>
          The mental skills work didn&apos;t help because it was addressing the wrong problem.
          The problem wasn&apos;t anxiety. It was an untrained coupling. And that can only
          be built through time in environments that contain the perceptual information
          competition actually produces.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 4: What training perception looks like ───── */}
      <Reveal>
        <Label>Training the eye — what it actually looks like</Label>
        <P>
          Once you understand that action is the last step, the question becomes: what
          does training the first step look like?
        </P>
        <P>
          It looks like environments where movement is determined by information the organism
          must read — not by a prescribed sequence, not by a cue from the coach, not by a
          rehearsed pattern that pre-empts the need to perceive anything.
        </P>
        <P>
          The operative word is &ldquo;determined.&rdquo; Not informed. Not aided. Determined.
          The organism cannot produce the correct action without reading the environment first.
          If they can — if a pre-set movement would work regardless of what the environment
          offers — the activity is not training perception. It&apos;s training execution.
        </P>
        <P>
          Here is how to test any practice activity for perceptual demand: can the athlete
          produce the successful response before the relevant information arrives? If yes,
          the activity has low perceptual demand, regardless of how physically challenging it is.
          If no — if success requires reading something in the environment before knowing what
          to do — the activity has perceptual demand. That demand is what builds the coupling.
        </P>
      </Reveal>

      <Visual label="Training the eye — four perception-first activity designs">
        <PerceptionFirstExamples />
      </Visual>

      <Reveal>
        <P>
          Work through all four examples above. Notice the pattern: in each case, the
          movement is prepared but the execution is gated by perceptual information. The
          athlete cannot choose what to do before reading the environment. The environment
          determines the action.
        </P>
        <P>
          This is not a constraint on the athlete. It&apos;s the actual structure of
          performance. In competition, the environment always determines the action. The
          question is whether you&apos;ve built the perceptual coupling that allows the
          correct action to emerge when the environment demands it.
        </P>
        <P>
          The non-sport example — the information-gated presentation — is deliberate. The
          perception-action loop runs in every domain where performance requires reading
          an environment and responding to what it offers. A teacher reading a classroom.
          A surgeon reading tissue. A negotiator reading a counterpart. The eye must be
          trained before the hand can follow it into a novel environment.
        </P>
      </Reveal>

      <KeyInsight label="The perceptual demand test">
        Before including any activity in a practice session, ask: can the athlete produce
        the desired response before the relevant environmental information arrives? If yes,
        the activity has zero perceptual demand. It trains execution. It does not train
        perception. Reintroduce the perceptual gate — make reading required for success —
        and you change what the activity builds.
      </KeyInsight>

      <Divider />

      {/* ── Section 5: Decoupled vs. coupled ────────────────── */}
      <Reveal>
        <Label>What you&apos;re actually building — and what you&apos;re not</Label>
        <P>
          Let&apos;s make the difference between decoupled and coupled training explicit.
          Because both feel like training. Both produce visible improvement. The difference
          only becomes apparent when the performance environment arrives.
        </P>
        <P>
          Decoupled training builds real things. Motor pattern consistency, physical
          conditioning, technique under controlled conditions — these are genuine
          adaptations. They&apos;re not useless. But they are adaptations for a context
          that doesn&apos;t exist in performance. The context that removes perceptual
          demand, removes environmental uncertainty, removes the need to read anything
          before acting.
        </P>
        <P>
          Coupled training builds the same physical adaptations — with the addition of
          the perceptual-motor coupling that makes them functional in unpredictable
          environments. It costs something: the technique will look less clean under
          perceptual load, especially early. But the adaptation is to the real system.
          The full loop. The one that performance requires.
        </P>
      </Reveal>

      <Visual label="Decoupled vs. coupled — what each approach actually trains">
        <CoupledVsDecoupled />
      </Visual>

      <Reveal>
        <P>
          The item that appears in the coupled column but not the decoupled column is
          &ldquo;technique under no load.&rdquo; Read that carefully.
        </P>
        <P>
          Coupled training doesn&apos;t optimize for technique under no perceptual load.
          It doesn&apos;t need to. Performance environments always carry perceptual load.
          The goal is technique under load — which requires building the coupling first
          and letting the technique adapt to the load rather than building the technique
          in isolation and hoping it survives the load it was never tested against.
        </P>
        <P>
          This is the counterintuitive trade the ecological framework asks you to make.
          Messier practice. Cleaner performance. Less visible short-term progress. More
          durable long-term transfer.
        </P>
      </Reveal>

      <ThinkAboutIt>
        Think about the last time you watched a session — yours or someone else&apos;s —
        and thought &ldquo;the technique looks really clean.&rdquo; Now ask: was perceptual
        demand present? Was the organism being asked to read anything before acting? Or
        was the cleanness a product of a decontextualized environment that removed
        the conditions under which the technique will actually need to function?
        Clean technique in a vacuum is an appearance of progress, not the thing itself.
      </ThinkAboutIt>

      <Divider />

      {/* ── Section 6: Uncertainty as the variable ───────────── */}
      <Reveal>
        <Label>Uncertainty is not the enemy — it&apos;s the training variable</Label>
        <P>
          The reason most practice environments have low perceptual demand is that uncertainty
          feels like a problem to be solved rather than a resource to be used.
        </P>
        <P>
          Coaches reduce uncertainty to make practice controllable. They block the drill.
          They pre-set the starting conditions. They remove the elements that would make
          the outcome unpredictable. This feels like good design — repeatable, measurable,
          improvable. The athlete gets better at the controllable version. And then discovers,
          in the performance environment, that the controllable version never existed.
        </P>
        <P>
          Uncertainty is not the enemy. It is the raw material of perceptual training. When
          the outcome is uncertain, the organism must read the environment to determine what
          to do. That reading is the perceptual work. The reading is what builds the coupling.
          Remove the uncertainty and you remove the work.
        </P>
        <P>
          This doesn&apos;t mean maximizing uncertainty at all times. It means calibrating it
          to the perceptual capacity of the organism at their current stage of development.
          Too little uncertainty: no perceptual work happens. Too much: the organism is
          overwhelmed and defaults to attending to whatever is most salient, which is usually
          not the relevant information.
        </P>
        <P>
          The productive zone is uncertainty at the edge of current perceptual capacity.
          Just beyond what can be read automatically. That edge is where attunement develops.
          And it moves as the organism develops.
        </P>
      </Reveal>

      <Visual label="The uncertainty spectrum — calibrating perceptual demand">
        <UncertaintySpectrum />
      </Visual>

      <Reveal>
        <P>
          Work across the spectrum. Notice that both ends carry risk. Maximum predictability
          produces an athlete who learns to act before the information arrives — a habit
          that becomes a liability in genuinely uncertain environments. Maximum uncertainty
          produces overwhelm and regression to the most obvious cues.
        </P>
        <P>
          The practitioner&apos;s skill is finding and maintaining the productive middle —
          and recognizing that where that middle sits changes as the organism develops.
          What was appropriately uncertain six months ago is now predictable. You have
          to keep raising the perceptual stakes.
        </P>
        <P>
          This is why expertise development never stops feeling challenging from the inside.
          Because if it stops feeling challenging, the perceptual demand has dropped below
          the edge. The organism is operating in its comfort zone, and the comfort zone
          is the shore. The development is in the water.
        </P>
      </Reveal>

      <BigQuote>
        If practice ever feels entirely comfortable — if the athlete always knows what
        they&apos;re going to do before the information arrives — the perceptual demand
        has dropped to zero. Comfort in practice is the warning sign, not the goal.
      </BigQuote>

      <Divider />

      {/* ── Section 7: The eye in every domain ──────────────── */}
      <Reveal>
        <Label>The eye is not only an eye</Label>
        <P>
          One more thing before the move, because it matters for how you apply this beyond sport.
        </P>
        <P>
          When we talk about &ldquo;training the eye,&rdquo; we&apos;re using vision as a
          shorthand. The perceptual system that guides action is not only visual. It includes
          proprioception — the body&apos;s sense of its own position and movement. It includes
          sound, touch, the feeling of the ground through the foot, the vibration of the implement
          in the hand, the energy in a room that isn&apos;t visible but is absolutely perceivable.
        </P>
        <P>
          The discus thrower who competes in a different stadium perceives different things through
          the ground, through the wind, through the ambient sound — and all of that is perceptual
          information their coupling must accommodate. The surgeon who operates with a different
          instrument perceives different tactile feedback — and must read that feedback to maintain
          the coupling that makes the technique functional.
        </P>
        <P>
          Training the eye means training the full perceptual system — every channel of information
          the organism uses to orient action in its environment. This is why simply visualizing
          the performance environment doesn&apos;t replace being in it. Visualization trains
          the visual channel only, and a pale version of it. The proprioceptive, kinesthetic,
          auditory, and social channels can only be trained by being in environments that actually
          produce that information.
        </P>
        <P>
          You cannot visualize the crowd. You cannot imagine your way to an attuned nervous system.
          You have to be there. That&apos;s the argument for representative practice, arriving again
          from a different angle. Be there. In the environments that produce the information you
          need to learn to read.
        </P>
      </Reveal>

      <KeyInsight label="Modules 04 and 05 are one argument">
        Representative design (Module 04) is the precondition for training perception (Module 05).
        You cannot train the eye in an environment that removes the information the eye needs
        to read. These modules are not two separate ideas — they&apos;re two sides of the same
        claim: that practice environments must preserve the perceptual structure of performance
        environments if the learning that happens in them is to survive contact with the real thing.
      </KeyInsight>

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
              Design one activity this week — five minutes is enough — where the athlete&apos;s
              movement is determined entirely by perceptual information. Not by a pre-set sequence,
              not by a cue, not by a demonstration, not by knowing in advance what the correct
              response will be.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Apply the perceptual demand test before you run it: can the athlete produce the
              correct response before the relevant information arrives? If yes, redesign until
              the answer is no. The movement must require reading. If reading isn&apos;t required,
              perception isn&apos;t being trained.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Run it. Observe carefully: where do athletes struggle? Is the struggle in the
              movement — they can read the situation but their body can&apos;t yet execute the
              response? Or is the struggle in the reading — they can execute the movement but
              don&apos;t yet know what to read to know which movement to use?
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              That distinction tells you everything. If the struggle is in movement: build the
              motor capacity. If the struggle is in reading: build the perceptual environment.
              Don&apos;t confuse the two. One is an execution problem. The other is a coupling
              problem. Module 05 has given you the diagnostic. Use it.
            </p>
          </div>
        </div>
      </Reveal>

    </div>
  );
}
