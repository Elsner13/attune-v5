"use client";

import {
  Label, P, BigQuote, KeyInsight, Analogy, ThinkAboutIt, Divider, Reveal, NumList, Visual,
} from "./shared";
import {
  AffordanceRelation, ConstraintLevers, EnvironmentTeaching, InformationLandscape,
} from "./visuals-02";

export default function Module02() {
  return (
    <div className="space-y-2">

      {/* ── Section 1: Opening story ─────────────────────────── */}
      <Reveal>
        <Label>The coach who stopped talking</Label>
        <P>
          The first time I ran a practice without talking, I lasted fourteen minutes.
        </P>
        <P>
          I had set up the activity. Explained the objectives. Then stepped back, crossed my arms,
          and decided to stay quiet.
        </P>
        <P>
          For the first twelve minutes, they kept glancing at me. Waiting. I felt the pull — the
          urge to say the thing I always said, the cue that arrived before I&apos;d consciously
          chosen it. I held it.
        </P>
        <P>
          At minute fourteen I said something. I don&apos;t remember what. Something that felt
          urgent in the moment and, in retrospect, wasn&apos;t.
        </P>
        <P>
          But I noticed what happened in those fourteen minutes before I spoke. The athletes stopped
          looking at me. They started looking at each other. At the space. At the problem. Decisions
          I had been narrating started emerging from the environment itself. Imperfectly, slowly —
          but from the right source.
        </P>
        <P>
          At the end of that session, one of them said: &ldquo;I actually had to think today.&rdquo;
        </P>
        <P>
          I had been training them not to.
        </P>
      </Reveal>

      <BigQuote>
        The environment was always the teacher. The coach was just talking over it.
      </BigQuote>

      <Divider />

      {/* ── Section 2: What Gibson actually claimed ──────────── */}
      <Reveal>
        <Label>Gibson&apos;s radical claim</Label>
        <P>
          Module 01 introduced Gibson&apos;s core bet: that the information organisms need to
          act in the world is in the world itself, not constructed inside the head. Perception
          is not computation. There is no internal representation built in between.
        </P>
        <P>
          That claim has one implication that everything else in this module rests on. If the
          information is already in the environment, then the practitioner&apos;s job is not to
          transmit information to the learner. It&apos;s to design the environment so the right
          information is present for the learner to pick up.
        </P>
        <P>
          Those are not the same job. And most practitioners have been trained to do the first
          one almost exclusively.
        </P>
      </Reveal>

      <Analogy>
        <p>
          Think of a bat navigating at night. The bat doesn&apos;t build a mental map of
          the cave and then consult it. It emits sound, receives the echo, and acts. The
          information is in the world. The bat picks it up and moves. There&apos;s no internal
          representation stage — perception and action are one continuous loop.
        </p>
        <br />
        <p>
          The information you need is in the environment. The question is whether you&apos;ve
          developed the ability to perceive it — and whether you&apos;ve designed the conditions
          for the people you work with to develop that ability too.
        </p>
      </Analogy>

      <Reveal>
        <P>
          The key concept Gibson left behind is one of the most important ideas in this course.
          It&apos;s called the affordance.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 3: Affordances explained ────────────────── */}
      <Reveal>
        <Label>What an affordance actually is</Label>
        <P>
          An affordance is not a feature of the object. It&apos;s not a feature of the
          organism. It&apos;s a feature of the relationship between them.
        </P>
        <P>
          A doorknob affords gripping — if you have a functional hand. It does not afford
          gripping if your hands are full, if you&apos;re wearing thick gloves, or if you&apos;ve
          just had surgery on your wrist. The doorknob is the same. What changes is the
          organism, and therefore what the relationship makes available.
        </P>
        <P>
          A ninety-kilogram barbell affords lifting for an experienced powerlifter. It does not
          afford lifting for someone who has never trained. The bar exists. The affordance — the
          possibility of lifting it — does not exist independently of who is approaching it.
        </P>
        <P>
          A fast break in basketball affords a scoring opportunity for a player who can read
          the defensive rotation, sees the teammate trailing, and has the quickness to hit
          the leading pass before the defense recovers. For a player who can&apos;t read those
          signals yet, the fast break doesn&apos;t afford that opportunity. The situation is
          identical. What the two players see in it is not.
        </P>
        <P>
          This is why expert performers seem to have more time. They&apos;re not operating faster.
          They&apos;re perceiving more affordances — more action possibilities — in the same
          environment that the novice finds overwhelming.
        </P>
      </Reveal>

      <ThinkAboutIt>
        Think of something you&apos;re genuinely expert at — a skill, a craft, a domain you&apos;ve
        spent years developing. Now think about what you see in that environment today versus what you
        saw when you started. What became visible? What used to be invisible? That expansion is
        the growth of your affordance perception. You didn&apos;t change the environment. You
        changed your ability to see what it offers.
      </ThinkAboutIt>

      <Visual label="Same environment — different organisms, different affordances">
        <AffordanceRelation />
      </Visual>

      <Reveal>
        <P>
          Here&apos;s what this means for practitioners: your job is not to tell the athlete or
          student what to see. You cannot install perception through instruction. What you can
          do is design environments that make the right affordances available at the right moment
          of their development, and then create the conditions for them to discover those affordances
          through action.
        </P>
        <P>
          This is a fundamentally different role from what most practitioners have been trained to
          perform. It requires less talking and more designing. Less correction and more constraint
          manipulation. Less focus on the output and more attention to what the environment is
          offering — or failing to offer — the people in it.
        </P>
      </Reveal>

      <KeyInsight>
        Affordances cannot be transmitted verbally. A coach can say &ldquo;look at the
        space behind the defender&rdquo; — but the player cannot perceive that space as an
        actionable affordance until they have the perceptual-motor experience of acting on it
        successfully. Instruction describes. Experience develops. The environment is the medium
        through which development actually happens.
      </KeyInsight>

      <Divider />

      {/* ── Section 4: The practitioner's paradigm shift ─────── */}
      <Reveal>
        <Label>The role shift nobody warned you about</Label>
        <P>
          There is a version of the traditional coach, teacher, or trainer that looks like this:
          an authority who holds the correct model of the skill, transmits that model through
          instruction and demonstration, corrects deviations from it, and measures success by
          how closely the learner&apos;s output matches the template.
        </P>
        <P>
          That role is built on a specific assumption: that the expert&apos;s knowledge can be
          transferred directly from their mind to the learner&apos;s mind. Say the right thing,
          at the right time, with enough repetition, and the skill transfers.
        </P>
        <P>
          This assumption is not completely wrong. Some things do transfer through instruction.
          But it dramatically overstates the role of verbal transmission in skill development,
          and it dramatically understates the role of the environment.
        </P>
        <P>
          Gibson&apos;s framework demands a different role entirely. Not the authority who holds
          the model. The designer who engineers the environment. Not the voice that corrects.
          The architect who ensures the right information is present for the organism to discover.
        </P>
        <P>
          This role shift is harder than it sounds. Because the instruction role is visible and
          legible — you&apos;re doing something. The design role can feel like you&apos;re
          doing nothing, especially when you&apos;re deliberately staying quiet while players
          work through a problem you could solve in thirty seconds by telling them the answer.
        </P>
        <P>
          But that discomfort is the signal. The silence isn&apos;t absence. It&apos;s the
          environment being allowed to teach.
        </P>
      </Reveal>

      <Visual label="Instruction-led vs. environment-led — where does information flow?">
        <EnvironmentTeaching />
      </Visual>

      <Reveal>
        <P>
          The left column — instruction-led — isn&apos;t wrong in every situation. There are moments
          where explicit instruction is the right tool: safety information, rules clarification,
          debriefing after an activity, establishing a shared vocabulary. These are real uses of
          verbal instruction.
        </P>
        <P>
          But if instruction is the primary mechanism — if the coach is the main information source
          during skill development — then the environment isn&apos;t teaching. And the athlete
          never learns to read it.
        </P>
        <P>
          When that athlete steps into the performance environment and the coach isn&apos;t there
          to narrate it, they find themselves in a world full of signals they&apos;ve never been
          asked to perceive. The skill that was built through instruction doesn&apos;t transfer to
          an environment where instruction is absent. Because the instruction was the environment.
        </P>
      </Reveal>

      <Analogy>
        <p>
          A musician who can only play when they can see the sheet music has not truly learned
          the music. They&apos;ve learned the notation. The music — the ability to hear and
          respond to the piece as a living, shifting thing — hasn&apos;t developed yet.
        </p>
        <br />
        <p>
          Removing the sheet music feels brutal. But it&apos;s the only way to force the ear
          to develop. The notation was a scaffold. At some point, the scaffold has to come down
          or the musician never learns to play without it.
        </p>
        <br />
        <p>
          The coach&apos;s voice is the sheet music.
        </p>
      </Analogy>

      <Divider />

      {/* ── Section 5: The three constraint levers ───────────── */}
      <Reveal>
        <Label>The three levers you actually control</Label>
        <P>
          If the environment is the teacher, then your job is to design the lesson. And the
          design medium — the actual tool you have — is constraint manipulation.
        </P>
        <P>
          Recall from Module 01: Newell identified three categories of constraints that shape
          every behavior. Organism, task, and environment. Here&apos;s the key implication that
          goes deeper in this module:
        </P>
        <P>
          You cannot change the organism directly. You cannot reach into someone&apos;s nervous
          system and upgrade it. You cannot install perception through instruction alone. The
          organism changes through experience — through perceiving and acting in environments
          that require it to adapt.
        </P>
        <P>
          But you can change the task. And you can change the environment. These are your levers.
          And when you adjust them — even slightly — you change what the organism is exposed to,
          what it has to perceive, what it has to adapt to. The organism changes as a byproduct.
        </P>
      </Reveal>

      <Visual label="The practitioner&apos;s three levers — adjust task and environment, watch behavior change">
        <ConstraintLevers />
      </Visual>

      <Reveal>
        <P>
          Notice what happens in the interactive above when you move both task and environment
          toward &ldquo;high&rdquo;. The behavioral description approaches competition-level:
          high stress, high representativeness, high transfer. This is not a drill. This is
          practice that feels like the real thing because the constraints are representative
          of the real thing.
        </P>
        <P>
          Notice also what happens when task is high but environment is low: complexity without
          context. You&apos;ve made the task difficult, but you&apos;ve stripped the environment
          of the information the organism needs to solve it. This produces confusion, not
          development.
        </P>
        <P>
          And the reverse — rich environment, minimal task structure — tends to produce low
          intensity and unfocused exploration. The environment is informative, but there&apos;s
          no pressure to actually read it.
        </P>
        <P>
          The skill of practice design is knowing which lever to move, in which direction,
          for which organism, at which moment in their development. That&apos;s the whole job.
          And it starts with understanding what constraints are actually present in your practice
          environment right now.
        </P>
      </Reveal>

      <KeyInsight label="The practitioner&apos;s diagnostic">
        Before every session, ask three questions. What organismic state are these people in
        right now — fresh or fatigued, confident or anxious, early in development or late?
        What task constraints will shape what they have to do? And what environmental information
        will be present for them to read? The answer to those three questions determines what
        behavior will emerge. Design from there.
      </KeyInsight>

      <Divider />

      {/* ── Section 6: What information is in your environment ── */}
      <Reveal>
        <Label>The information landscape — what&apos;s actually there</Label>
        <P>
          One of the most useful reframes in ecological dynamics is this: the performance
          environment is already full of information. It always was. The question is never
          &ldquo;how do we add information?&rdquo; — the question is &ldquo;can the organism
          perceive what&apos;s already there?&rdquo;
        </P>
        <P>
          Experts don&apos;t live in information-rich environments that novices can&apos;t access.
          They share the same environments. The expert sees more because they have developed the
          perceptual attunement to pick up signals that the novice&apos;s perceptual system
          hasn&apos;t yet been calibrated to register.
        </P>
        <P>
          A chess grandmaster doesn&apos;t see more squares on the board. They see meaningful
          patterns — threats, opportunities, weaknesses — that look like random arrangements of
          pieces to the beginner. The board is the same. The perceptual system reading it is not.
        </P>
        <P>
          A seasoned emergency room physician doesn&apos;t have access to patient information
          that the resident doesn&apos;t. They process the same vital signs, the same chart,
          the same patient in front of them. The attending sees urgency in a combination of
          signals that haven&apos;t yet been assembled into a pattern for the resident. Same
          information. Vastly different perception.
        </P>
        <P>
          For practitioners: what this means is that you do not need to make environments louder
          or more explicit to help learners progress. You need to design environments that give
          them opportunities to develop their perceptual systems — to gradually attune to signals
          that are already there but not yet visible to them.
        </P>
      </Reveal>

      <Visual label="The information landscape — attunement makes signals visible">
        <InformationLandscape />
      </Visual>

      <Reveal>
        <P>
          Toggle through the attunement levels above. The environment doesn&apos;t change.
          The number of signals visible does. This is a model of skill development that doesn&apos;t
          require adding anything to the learner — it requires giving them enough time in the
          right environment to gradually perceive what&apos;s already present.
        </P>
        <P>
          The practical implication: the richest thing you can do as a practitioner is ensure
          that the relevant signals are actually present in your practice environment. Not
          artificially inserted. Not verbally described. Present — the way they&apos;re present
          in the performance environment where they actually matter.
        </P>
        <P>
          Because if the signals aren&apos;t there, the organism cannot attune to them. No
          amount of instruction about what to look for replaces the experience of being in
          an environment where those things are actually present to be perceived.
        </P>
      </Reveal>

      <BigQuote>
        Developing an eye for something means developing a nervous system that can perceive
        it. That development only happens in the environment where the thing is present.
        You cannot develop an eye for game situations in a gym with no game situations.
      </BigQuote>

      <Divider />

      {/* ── Section 7: Why this is hard ──────────────────────── */}
      <Reveal>
        <Label>Why this is genuinely hard to do</Label>
        <P>
          Understanding ecological dynamics intellectually is one thing. Applying it in practice
          is another. Because the pull toward instruction doesn&apos;t go away just because you
          know it isn&apos;t the primary vehicle for skill transfer.
        </P>
        <P>
          The pull exists for several reasons.
        </P>
        <P>
          First: instruction is legible. When you give a cue and the athlete corrects, you can
          see the cause-effect chain. It feels like teaching. Letting the environment do the work
          is slower, messier, and produces outcomes you didn&apos;t directly engineer. That ambiguity
          is uncomfortable for practitioners who have been trained to associate activity with progress.
        </P>
        <P>
          Second: instruction is fast. The athlete is doing something wrong. You can see exactly
          what needs to change. Saying it takes ten seconds. Designing a constraint that produces
          the same change through environmental pressure takes longer, requires more creativity,
          and carries more uncertainty.
        </P>
        <P>
          Third: instruction is what you were taught. Most practitioners learned their craft in
          instruction-heavy environments. The model they absorbed showed them that good practitioners
          talk a lot, demonstrate often, and correct constantly. Departing from that model requires
          actively working against the habits formed by years of imitation.
        </P>
        <P>
          None of this means instruction is never the right tool. It means that when you default
          to instruction without designing the environment, you&apos;re choosing the tool that
          feels comfortable over the tool that builds durable skill.
        </P>
        <P>
          The question to ask before you open your mouth during an activity: could the environment
          produce this correction if I designed it differently? If the answer is yes — design
          differently. Save the voice for when it genuinely can&apos;t be replaced.
        </P>
      </Reveal>

      <ThinkAboutIt>
        Think of the last three times you gave verbal instruction during an activity — not before,
        not after, but during. For each one: could a different constraint have produced the same
        behavioral outcome without the instruction? Be honest. This isn&apos;t about eliminating
        coaching. It&apos;s about understanding when the environment could have done the work
        you were doing with words.
      </ThinkAboutIt>

      <Divider />

      {/* ── Section 8: The environment you can&apos;t see ──────────── */}
      <Reveal>
        <Label>The environment you&apos;ve been building without knowing it</Label>
        <P>
          Here&apos;s something that lands differently once you have the ecological lens: you
          have always been designing an environment. Every session you&apos;ve run, every drill
          you&apos;ve structured, every space you&apos;ve set up — these were environments. They
          contained information, or failed to. They afforded behaviors, or prevented them. They
          matched the performance environment, or they didn&apos;t.
        </P>
        <P>
          You just weren&apos;t designing them consciously with these questions in mind.
        </P>
        <P>
          The shift from Module 01 to Module 02 is this: Module 01 introduced the mismatch problem
          as a diagnostic. This module asks you to think about the environment as a design problem.
          Not what went wrong. What can be built differently.
        </P>
        <P>
          The practitioner who understands this stops asking &ldquo;what should I tell them?&rdquo;
          first. They ask &ldquo;what should be in this environment?&rdquo; That question leads to
          a different kind of practice session. A different kind of development. A different kind
          of transfer.
        </P>
      </Reveal>

      <NumList
        items={[
          "What information is present in the performance environment that my athletes need to perceive?",
          "Is that information present — in some representative form — in my practice environment?",
          "What constraints can I adjust to bring more of that information into the practice?",
          "Where am I using instruction to paper over an environment design problem?",
          "What would happen if I stayed silent for the first twenty minutes and let the environment teach?",
        ]}
      />

      <Reveal>
        <P>
          These five questions are not a checklist to complete before every session. They&apos;re
          a lens to wear while you design. Let them run in the background. Over time, they change
          what you see when you walk into a practice space. They change what you notice. They change
          what you adjust.
        </P>
        <P>
          That&apos;s the attunement developing. Not to the game itself — to the practice of designing
          environments that teach it.
        </P>
      </Reveal>

      <KeyInsight label="The shift in one sentence">
        The traditional practitioner asks: &ldquo;What do I need to teach?&rdquo; The ecological
        practitioner asks: &ldquo;What does the environment need to contain?&rdquo; These two questions
        produce entirely different sessions. The first produces instruction. The second produces learning.
      </KeyInsight>

      <Divider />

      {/* ── Section 9: What this builds toward ──────────────── */}
      <Reveal>
        <Label>What Module 03 is going to demand of you</Label>
        <P>
          Module 03 is called &ldquo;How to See What You&apos;ve Been Missing.&rdquo; It&apos;s
          about attunement — the process by which perception becomes calibrated to the information
          in an environment over time. And it&apos;s going to ask you to look at your practice
          environment with a specific kind of attention you may not have applied before.
        </P>
        <P>
          But before you can apply that attention to your athletes&apos; attunement, you need to
          apply it to your own. You are also an organism coupling with an environment.
          You attune to your practice environment. You develop perceptual habits about
          what to look for, what to correct, what to ignore.
        </P>
        <P>
          Some of those habits serve you. Some of them are built on the old model — filtering for
          technical errors to correct rather than environmental mismatches to redesign.
        </P>
        <P>
          The work of Module 03 begins now, before you read it. By watching your next session the
          way the coach in the opening story watched his. Arms crossed. Quiet. Looking at what the
          environment is producing — not at what you&apos;re going to say about it.
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
              Take one drill, exercise, or practice activity you use regularly — something you
              run almost on autopilot. Map it against the three constraints: what are the
              organismic demands, the task structure, and the environmental conditions right now?
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Then map the same three constraints for the actual performance environment this
              activity is meant to prepare for. Be specific. Not &ldquo;it&apos;s more intense&rdquo; —
              what specific information is present in performance that is absent in this drill?
              What affordances does the performance environment offer that your practice
              environment doesn&apos;t?
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Identify one constraint you could modify — in the task structure or the environment —
              that would bring the drill closer to the performance context without fundamentally
              changing the activity. Don&apos;t implement it yet. Just identify it.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Write down: what information would become present if you made this change? What
              would the athlete need to perceive — and act on — that they currently don&apos;t?
              That&apos;s the affordance you&apos;re designing toward. Bring this into Module 03.
            </p>
          </div>
        </div>
      </Reveal>

    </div>
  );
}
