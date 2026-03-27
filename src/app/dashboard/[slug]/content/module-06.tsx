"use client";

import {
  Label, P, BigQuote, KeyInsight, Analogy, ThinkAboutIt, Divider, Reveal, NumList, Visual,
} from "./shared";
import {
  ShoreVsStream, KnowledgeTypes, ApplicationGap, ImperfectApplicationCurve,
} from "./visuals-06";

export default function Module06() {
  return (
    <div className="space-y-2">

      {/* ── Section 1: When I knew everything and changed nothing ─── */}
      <Reveal>
        <Label>When I knew everything and changed nothing</Label>
        <P>
          For a long time I knew a lot about ecological dynamics and changed nothing.
        </P>
        <P>
          I had read Gibson. I had read Bernstein. I had read the coaching literature, the skill
          acquisition research, the applied work coming out of Davids and his colleagues. I could
          explain affordances to a room of coaches without notes, and I did it well.
        </P>
        <P>
          My sessions looked almost identical to how they&apos;d looked before I encountered any of it.
        </P>
        <P>
          Not because I didn&apos;t believe the framework. I believed it completely. The gap was not
          intellectual. It was the distance between understanding a framework and operating through it.
          And the thing that closes that distance — the only thing — is not more understanding.
          It&apos;s application. Repeated, imperfect, in the relevant environment.
        </P>
        <P>
          The library grew. The practice didn&apos;t. There is a word for this gap, and it&apos;s
          not incompetence. It&apos;s the shore.
        </P>
      </Reveal>

      <BigQuote>
        The shore is comfortable. You can see the stream from there. You know what the
        stream is. I knew what the stream was for years. And every season, the gap between
        my knowledge about the work and the work itself didn&apos;t close the way I expected.
      </BigQuote>

      <Divider />

      {/* ── Section 2: Two modes of professional development ─── */}
      <Reveal>
        <Label>Two modes — and the one that doesn&apos;t work</Label>
        <P>
          There are two fundamentally different modes of professional development.
          Most practitioners spend almost all their time in one of them and call it growth.
        </P>
        <P>
          The first mode is collection. You gather frameworks, methodologies, research findings,
          principles. You understand them. You can explain them. You hold them in your head
          as a growing library of things you know. The collection is real. The knowledge is
          real. And it is almost entirely inert.
        </P>
        <P>
          The second mode is application. You take something you understand and you put it into
          the environment where it needs to work. Imperfectly. Before you feel ready. You watch
          what happens. You adjust. You apply again.
        </P>
        <P>
          The first mode feels like growth because the collection is growing. Your library is
          larger than it was. You can explain things you couldn&apos;t explain before. Progress
          is legible.
        </P>
        <P>
          The second mode feels like risk. The first application will be wrong in ways you
          didn&apos;t anticipate. The session won&apos;t go as planned. The athletes will
          respond to the constraint in ways your model didn&apos;t account for. Nothing
          about it is comfortable.
        </P>
        <P>
          And it is the only one that builds anything durable.
        </P>
      </Reveal>

      <Visual label="The shore vs. the stream — what each produces">
        <ShoreVsStream />
      </Visual>

      <Reveal>
        <P>
          Look at the five-year outcome on the stream side. &ldquo;The framework has
          disappeared into the work. You don&apos;t apply ecological dynamics — you coach
          through it.&rdquo; That is the destination. The framework becomes invisible because
          it has been fully integrated. It no longer requires conscious retrieval. It&apos;s
          the lens, not the object being examined through the lens.
        </P>
        <P>
          That destination is not reachable through the shore. No amount of additional study
          closes the gap between knowing about the framework and knowing through it. The
          only path is the one that passes through imperfect, messy, uncomfortable application.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 3: Gibson's two kinds of knowledge ──────── */}
      <Reveal>
        <Label>The distinction Gibson made that nobody talks about</Label>
        <P>
          Gibson was primarily known for affordance theory, the perception-action loop, ecological
          optics. But tucked inside his broader work was a distinction about knowledge that
          has enormous implications for how practitioners develop.
        </P>
        <P>
          He drew a line between knowing about and knowing of.
        </P>
        <P>
          Knowing about is propositional. It lives in language. You can articulate it, transmit it,
          store it in a book, teach it to someone who has never been near the relevant environment.
          It is knowledge as description. Accurate, transmissible, and fundamentally incomplete.
        </P>
        <P>
          Knowing of is something else entirely. It&apos;s what the navigator has when they
          feel the ship&apos;s drift through the deck before checking any instrument. It&apos;s
          what the surgeon has when their hands know the tissue is right before their conscious
          mind has formed the thought. It&apos;s what the experienced coach has when they walk
          into a session and perceive within minutes what the environment is producing — not
          from analysis but from direct attunement to what&apos;s happening.
        </P>
        <P>
          Knowing of cannot be transmitted. It can only be developed. And it can only be
          developed through presence in the relevant environment — through time in the place
          where the information that matters is actually present and where getting it wrong
          has real consequences.
        </P>
        <P>
          The field of professional development — conferences, certifications, books, courses —
          is almost entirely optimized for knowing about. It produces people who can explain
          the framework beautifully and have never changed a session because of it.
        </P>
      </Reveal>

      <Visual label="Knowing about vs. knowing of — across five domains">
        <KnowledgeTypes />
      </Visual>

      <Reveal>
        <P>
          Work through each domain above. The pattern is identical in every case. Knowing
          about is the starting point — necessary, but not sufficient. Knowing of is what
          actually makes you functional in the environment you&apos;re trying
          to influence. And the path from one to the other is always the same: time in the
          relevant environment, with consequences.
        </P>
        <P>
          Note what &ldquo;built through&rdquo; says for knowing of in every domain.
          It&apos;s not more study. It&apos;s not better conceptual understanding. It&apos;s
          presence in environments where the distinction between correct and incorrect has
          real stakes. Where being wrong costs something.
        </P>
        <P>
          The cost is what makes the learning stick. Without consequence, the environment
          has no particular reason to reshape your nervous system. With consequence, it does.
        </P>
      </Reveal>

      <KeyInsight label="The irony of this course">
        This course is knowledge about. Everything you&apos;ve read across the first five
        modules — the constraints, the affordances, the attunement, the representative design,
        the perception-action loop — is knowing about. It is necessary. It has given you
        vocabulary, framework, diagnostic tools. But if you finish this course without
        applying any of it in an actual session with actual consequences, you will end up
        exactly where you started: a practitioner who knows the framework and hasn&apos;t
        changed their practice. The knowing of is waiting on the other side of the first
        imperfect application.
      </KeyInsight>

      <Divider />

      {/* ── Section 4: The stream ────────────────────────────── */}
      <Reveal>
        <Label>The stream — what getting in actually means</Label>
        <P>
          The metaphor of the stream is not motivational decoration. It&apos;s a precise
          description of something real.
        </P>
        <P>
          You don&apos;t push water. You don&apos;t manufacture flow through effort or willpower
          or accumulated knowledge. You get in, and the current does something to you that
          standing on the shore cannot. The stream — the environment you&apos;re trying
          to influence — changes you through the act of being in it in a way that studying
          it from the shore never does.
        </P>
        <P>
          Getting in the stream means running the session where you try
          the constraint change before you feel fully confident about it. It means watching
          what happens and adjusting rather than consulting the notes. It means making
          decisions from what you observe rather than from what you read.
        </P>
        <P>
          The test Gibson offers is simple: when was the last time you changed something in
          your practice based on what you observed — not what you read? That&apos;s the stream.
          When was the last time your session design came from watching rather than planning?
          That&apos;s the stream. Everything else — the reading, the annotating, the reference
          building — is the shore.
        </P>
        <P>
          The shore is not useless. The shore is where you build the vocabulary that lets you
          understand what the stream is teaching. But it cannot substitute for the stream.
          And most practitioners mistake extended shore time for development.
        </P>
      </Reveal>

      <BigQuote>
        Currency from the Latin &ldquo;currere&rdquo; — to run. Current-cy. Money is a current.
        Skill is a current. You&apos;re either in it or you&apos;re standing on the shore
        describing the water.
      </BigQuote>

      <Analogy>
        <p>
          Jack Moses makes this point about money: most people stand on the shore and watch it
          run past. They study it. They plan when they&apos;ll get in. They wait until
          the conditions are perfect.
        </p>
        <br />
        <p>
          The conditions are never perfect. The current doesn&apos;t wait. And the people
          who are in the stream — moving, participating, building, adjusting — are not there
          because they were more prepared. They got in before they were ready.
        </p>
        <br />
        <p>
          Skill development is the same current. You either get in or you stand on the shore
          describing the water.
        </p>
      </Analogy>

      <Divider />

      {/* ── Section 5: The application gap ──────────────────── */}
      <Reveal>
        <Label>What closes the gap — and what doesn&apos;t</Label>
        <P>
          There is a specific thing that practitioners do when they want to close the gap
          between understanding and practice. They study more. They get deeper into the
          framework. They read more papers, watch more talks, build more nuanced conceptual
          maps of the ideas.
        </P>
        <P>
          This does not close the gap.
        </P>
        <P>
          The gap between knowing about and knowing of is not a knowledge gap. It&apos;s a
          participation gap. More knowledge doesn&apos;t fill it. Application does.
          Even imperfect application. Especially imperfect application — because imperfect
          application exposes where the model you hold is incomplete, and that exposure is
          itself the learning.
        </P>
        <P>
          The first time you apply a constraint-led approach in a session and it doesn&apos;t
          work as expected, you learn something no amount of additional reading could have
          taught you: specifically where the gap between the framework and the actual behavior
          of your athletes lies. That specificity is the beginning of knowing of.
        </P>
      </Reveal>

      <Visual label="The application gap — what actually closes it">
        <ApplicationGap />
      </Visual>

      <Reveal>
        <P>
          Notice in the &ldquo;More study&rdquo; path: understanding grows, but the application
          gap barely moves. You know the idea more deeply. You still don&apos;t use it.
        </P>
        <P>
          Notice in the &ldquo;Imperfect application&rdquo; path: understanding actually
          drops initially. Because the first application reveals that the model you held
          was simpler than the reality. That drop is not failure. It&apos;s accuracy. Your
          understanding is now more calibrated to what the framework actually produces in
          practice — not what you imagined it would produce from the shore.
        </P>
        <P>
          The iterated application path shows understanding and competence converging at
          a level that no shore time produces. The knowing of has emerged because the
          framework has been tested against reality and reshaped by what reality returned.
        </P>
      </Reveal>

      <ThinkAboutIt>
        Identify the idea from this course that you understand most clearly — the one you
        could explain right now to someone who&apos;d never heard of ecological dynamics.
        Now ask: how many times have you actually applied it in a session? If the answer
        is zero, you have knowing about and no knowing of. The gap is exactly as wide as
        it was before you understood the concept. What would it cost to apply it once,
        imperfectly, this week?
      </ThinkAboutIt>

      <Divider />

      {/* ── Section 6: Imperfect application is the method ──── */}
      <Reveal>
        <Label>Imperfect application is not a compromise — it&apos;s the method</Label>
        <P>
          There is a version of this module that could sound like: lower your standards
          and just try things. That&apos;s not what this is.
        </P>
        <P>
          Imperfect application is not a compromise on quality. It is the actual method
          through which quality develops. The first attempt is not supposed to be clean.
          The first attempt is supposed to expose the gap between the model and the reality —
          to generate the feedback that refines the model and builds the competence.
        </P>
        <P>
          The practitioner who waits until they have the framework perfectly understood before
          applying it will wait forever. Because the framework doesn&apos;t reach its final
          form through study. It reaches its final form through repeated contact with the
          environments it&apos;s trying to describe. The understanding and the practice have
          to develop together. Neither can finish without the other.
        </P>
        <P>
          What imperfect application requires is something different from lowered standards.
          It requires the willingness to be seen not knowing — by yourself, by your athletes,
          by whoever is in the room. It requires the tolerance for sessions that don&apos;t
          go as planned. It requires the ability to treat failure as information rather than
          verdict.
        </P>
        <P>
          These are harder to develop than technical knowledge. But they&apos;re what separates
          practitioners who grow from practitioners who collect.
        </P>
      </Reveal>

      <Visual label="What happens across the first attempts — the trajectory of imperfect application">
        <ImperfectApplicationCurve />
      </Visual>

      <Reveal>
        <P>
          Work through all four stages in the visual above. The &ldquo;No attempt&rdquo;
          stage is recognizable — high understanding, real-world competence at zero. The
          flatline of the shore.
        </P>
        <P>
          The jump in competence from no attempt to first attempt is enormous — even though
          the first attempt is messy and the understanding temporarily drops. One imperfect
          session produces more knowing of than any amount of additional shore time.
        </P>
        <P>
          By the third to fifth attempt, something has shifted at the level of identity.
          You&apos;re not applying the framework. You&apos;re a practitioner who works this
          way. The distinction has disappeared because the practice has absorbed it.
        </P>
      </Reveal>

      <BigQuote>
        The shore will always give you a reason to wait. The framework isn&apos;t quite clear
        enough. The session isn&apos;t quite designed yet. You want to be more confident first.
        The shore is an infinite generator of reasons to stay on it. The stream requires exactly
        one thing: you step in.
      </BigQuote>

      <Divider />

      {/* ── Section 7: What this means for the course ──────── */}
      <Reveal>
        <Label>What this means for the rest of this course</Label>
        <P>
          Module 07 is going to ask you to apply the framework to your own domain — whatever
          that domain is. It will ask you to see the same problem you&apos;ve been seeing in
          sport and skill acquisition appearing in the field you actually work in every day.
        </P>
        <P>
          Module 08 closes the course by asking you to design something from scratch using
          only what you&apos;ve built here. Not consult the framework. Design from it.
        </P>
        <P>
          Neither of those modules will produce knowing of. They will give you another set
          of frameworks for thinking about where to apply it. The knowing of still only comes
          from one place: the session where you actually tried it.
        </P>
        <P>
          If you haven&apos;t done The Move yet from any of the previous modules — if you&apos;ve
          read five modules without running a single session shaped by what you&apos;ve read —
          this is the moment to stop and do that before continuing. Not because the remaining
          modules aren&apos;t worth reading. Because they will mean more after you&apos;ve
          tested the ideas against reality than before.
        </P>
        <P>
          The course is the shore. Your practice is the stream. You know which one builds
          the thing.
        </P>
      </Reveal>

      <NumList
        items={[
          "Identify the idea from this course you understand most clearly — the one you could explain right now.",
          "Apply it in your next session. Not a perfect version. The version you can run this week.",
          "Observe what happens. Not whether it worked — what the environment produced.",
          "Adjust one thing based on what you observed. Not based on what you read.",
          "Run it again. The second attempt is where the knowing of begins.",
        ]}
      />

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
              Identify one idea from this course that you have understood but not yet applied.
              Not something you&apos;re still working out conceptually — something you could
              explain clearly to someone else right now.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Apply it in your next session. Imperfectly. Without waiting until the design is
              clean or your confidence is high. The session where you try it wrong and learn
              from it is more valuable than another month of reading about it correctly.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              After the session, write down one thing: what did you observe that your model
              didn&apos;t predict? That gap — between what you expected and what actually
              happened — is the beginning of knowing of. That&apos;s the stream. Everything
              before it was the shore.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              The shore will tell you to keep reading first. Do not listen to the shore.
            </p>
          </div>
        </div>
      </Reveal>

    </div>
  );
}
