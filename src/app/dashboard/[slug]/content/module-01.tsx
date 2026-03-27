"use client";

import {
  Label, P, BigQuote, KeyInsight, Analogy, ThinkAboutIt, Divider, Reveal, NumList, Visual,
} from "./shared";
import {
  ContainerVsCoupling, ThreeVariables, PracticeVsPerformance, MismatchMeter, CouplingLoop,
} from "./visuals-01";

export default function Module01() {
  return (
    <div className="space-y-2">

      {/* ── Section 1: The story ─────────────────────────────── */}
      <Reveal>
        <Label>The problem isn&apos;t effort</Label>
        <P>
          Junior year. I was throwing well in practice. Consistently. The mechanics had settled
          into something that felt almost automatic — the wind, the footwork in the ring, the
          release angle. My coach was pleased. I was pleased.
        </P>
        <P>
          Then a meet. And something changed that neither of us could explain.
        </P>
        <P>
          The throws weren&apos;t terrible. They were just not mine. Something in the movement
          that had felt settled in practice became unfamiliar under competition conditions. Same
          ring. Same implement. Same sequence of movements I had made several thousand times.
          Different result.
        </P>
        <P>
          We called it nerves. We worked on visualization. I learned breathing patterns. I got
          good at telling myself things would go well. The gap didn&apos;t close.
        </P>
        <P>
          It took years before I understood what nobody asked at the time: what was actually
          different about the meet environment? Not psychologically. Informationally. What did
          competition contain that practice didn&apos;t?
        </P>
        <P>
          Different sight lines. Unfamiliar ground texture underfoot. Competitors in my peripheral
          vision during warm-up. A consequence structure — real, once, today — that practice had
          never had and never tried to simulate. I wasn&apos;t mentally weak. I had built a skill
          for one specific environment and then tried to produce it in an environment that was
          different in exactly the ways I&apos;d never been trained to navigate.
        </P>
        <P>
          The skill did what skills always do in that situation. It degraded precisely where the
          environment was unfamiliar. It held precisely where it wasn&apos;t.
        </P>
        <P>
          I am not alone in this. You have been here too.
        </P>
      </Reveal>

      <BigQuote>
        The gap doesn&apos;t close because the skill was built for the practice environment.
        That&apos;s all. Not a ceiling. A mismatch.
      </BigQuote>

      <Divider />

      {/* ── Section 2: You've been here ─────────────────────── */}
      <Reveal>
        <Label>You&apos;ve been here before</Label>
        <P>
          Take a moment and think about a skill you&apos;ve worked on seriously. Not casually —
          seriously. Where you put in consistent time, sought feedback, studied the craft. A sport,
          a professional skill, a creative practice. Whatever comes to mind first.
        </P>
        <P>
          Now think about a moment when that skill was supposed to show up and didn&apos;t. The high-stakes
          performance that felt completely different from practice. The pitch you&apos;d rehearsed perfectly
          that fell apart in the room. The race where your mechanics dissolved under the gun.
        </P>
        <P>
          That gap has a name. It&apos;s called the transfer problem — the gap between what you can do
          in the practice environment and what actually shows up when the stakes are real.
        </P>
        <P>
          For decades, the standard explanation was mental. You got nervous. You weren&apos;t tough enough.
          You choked. And those explanations carried a hidden implication: the problem was you — your
          character, your willpower, your ability to handle pressure.
        </P>
        <P>
          This module is here to offer a different explanation. One that doesn&apos;t let you off the hook,
          but does redirect where the hook should actually land.
        </P>
      </Reveal>

      <ThinkAboutIt>
        Think of one specific moment — a performance, a meeting, a game, a presentation — where
        your skill didn&apos;t show up the way you expected. Hold that moment. We&apos;ll come back
        to it throughout this module.
      </ThinkAboutIt>

      <Divider />

      {/* ── Section 3: The inherited model ──────────────────── */}
      <Reveal>
        <Label>The model you didn&apos;t choose</Label>
        <P>
          Every practitioner — every coach, every teacher, every developer, every creator — operates
          from a model of how skill works. Most of them inherited that model before they were old
          enough to question it.
        </P>
        <P>
          The model goes something like this: skill is a thing you acquire through practice, store in
          your body and mind, and then retrieve when needed. You learn a technique. You drill it until
          it&apos;s automatic. You carry it with you, ready to deploy.
        </P>
        <P>
          More practice → more stored skill → better performance. Simple. Logical. And — in important
          ways — completely wrong.
        </P>
        <P>
          Not wrong about practice being important. It is. Not wrong about repetition being necessary.
          It is. Wrong about what practice actually does. Wrong about where skill lives. Wrong about why
          it sometimes travels and sometimes doesn&apos;t.
        </P>
      </Reveal>

      <Analogy>
        <p>
          Think of a fish that&apos;s been raised in a tank. It becomes expert at navigating that
          exact tank — the corners, the depth, the filtered current. It&apos;s skilled for that environment.
        </p>
        <br />
        <p>
          Now put it in a river. Same fish. Same motor patterns. Completely different result. We wouldn&apos;t
          say the fish &ldquo;got nervous.&rdquo; We&apos;d say the skill that developed in the tank was built
          for the tank.
        </p>
        <br />
        <p>
          Athletes are not fish. But the principle holds.
        </p>
      </Analogy>

      <Reveal>
        <P>
          The model you inherited — the one almost everyone in sport, education, and professional
          development uses — is called the cognitivist or information-processing model. It treats
          the human like a computer: information goes in, the brain processes it, movement comes out.
        </P>
        <P>
          This model emerged from behaviorism in the mid-20th century, matured through cognitive
          psychology in the 1960s and 70s, and became the backbone of how most people still think
          about skill and learning today. It&apos;s everywhere — in coaching manuals, in corporate training
          programs, in fitness apps, in how schools design curriculum.
        </P>
        <P>
          And it has a fatal flaw.
        </P>
      </Reveal>

      <KeyInsight>
        The cognitivist model treats the environment as a stage — a neutral backdrop against which
        performance happens. Ecological dynamics treats the environment as an active ingredient —
        something that literally determines what behaviors are possible and what behaviors emerge.
        The difference between these two positions is the difference between two entirely different
        sciences of skill.
      </KeyInsight>

      <Divider />

      {/* ── Section 4: Two models side by side ──────────────── */}
      <Reveal>
        <Label>Two ways of seeing skill</Label>
        <P>
          Before we go further, let&apos;s make the difference between these two models concrete. This
          is the most important distinction in the entire course. Everything else builds on this.
        </P>
      </Reveal>

      <Visual label="The two models — interact to compare">
        <ContainerVsCoupling />
      </Visual>

      <Reveal>
        <P>
          When you hold the container model, here&apos;s what it makes you do: you try to fill the container.
          More repetitions. More volume. More information delivered to the learner. The teacher&apos;s job
          is to transmit. The learner&apos;s job is to receive and store.
        </P>
        <P>
          When something doesn&apos;t work, you add more input. When the skill doesn&apos;t transfer, you assume
          something is wrong with how it was stored — so you store it again, differently. More drilling.
          More reinforcement. More explicit instruction.
        </P>
        <P>
          The container model has a useful consequence: it makes skill feel improvable through more effort.
          And that&apos;s true — effort matters. But it leads practitioners to invest everything in the
          repetition and almost nothing in the environment the repetition happens in.
        </P>
        <P>
          That&apos;s the mistake.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 5: Gibson ────────────────────────────────── */}
      <Reveal>
        <Label>A psychologist makes a bet</Label>
        <P>
          In the 1950s, a perceptual psychologist named James Gibson was studying how pilots
          perceived depth and distance when landing aircraft. The standard explanation at the time
          was that the brain received visual signals, computed distances through internal models,
          and then generated the appropriate motor response.
        </P>
        <P>
          Gibson didn&apos;t think that was right.
        </P>
        <P>
          He noticed that the environment itself contained the information pilots needed — in the
          texture of the runway, the rate at which the ground seemed to expand as the plane descended,
          the flow of the visual field. The pilot didn&apos;t need to compute this information. They
          needed to perceive it directly.
        </P>
        <P>
          Gibson spent the next thirty years developing this idea into a full theory of perception —
          one that argued, at its core, that the animal and the environment are a system. You cannot
          understand one without the other. Perception doesn&apos;t happen inside the brain. It happens
          in the relationship between the organism and the world.
        </P>
        <P>
          He died in 1979. Most cognitive psychologists disagreed with him. But in the following
          decades, the field of ecological psychology — built on his work — would gradually and
          decisively prove him right.
        </P>
      </Reveal>

      <BigQuote>
        You don&apos;t see the world as it is. You see the world as it affords — as it offers or
        withholds possibilities for action based on what you can do.
      </BigQuote>

      <Reveal>
        <P>
          Gibson&apos;s key concept was the affordance. An affordance is not a property of the object.
          It&apos;s not a property of you. It&apos;s a property of the relationship between the two.
        </P>
        <P>
          A staircase affords climbing — if you have the leg length and strength to climb it. The
          same staircase doesn&apos;t afford climbing for a two-year-old or someone in a wheelchair.
          The staircase is the same. What changed is the organism.
        </P>
        <P>
          A fifty-kilogram barbell affords lifting for an experienced powerlifter. It doesn&apos;t afford
          lifting for someone who has never trained. Same object. Different affordance. Because the
          affordance lives in the relationship.
        </P>
        <P>
          For practitioners, this reframes the entire job. Your goal isn&apos;t to fill athletes or
          students with information. Your goal is to design environments where the right affordances
          are available to the right organism at the right moment of their development.
        </P>
      </Reveal>

      <Analogy>
        <p>
          Imagine you&apos;re learning to drive in an empty parking lot. You get very good at the
          parking lot. You know exactly where the curb is. You know the exact distance to the
          concrete barriers. You know the turning radius in this specific space.
        </p>
        <br />
        <p>
          Then you drive on a real highway for the first time and everything falls apart. Not because
          you forgot how to turn the wheel. Because every affordance you learned to read — every
          signal that told you what action to take — was a parking lot affordance. The highway
          doesn&apos;t offer any of those signals. It offers entirely different ones you&apos;ve never
          had to read before.
        </p>
        <br />
        <p>
          The skill built in the parking lot was real. It was just real for the parking lot.
        </p>
      </Analogy>

      <Divider />

      {/* ── Section 6: The coupling loop ─────────────────────── */}
      <Reveal>
        <Label>The loop that makes you</Label>
        <P>
          Here&apos;s the deepest idea in ecological dynamics, and it&apos;s one that tends to rearrange
          things once it lands properly.
        </P>
        <P>
          Perception and action are not a sequence. They&apos;re a loop.
        </P>
        <P>
          You perceive something in the environment. That perception informs an action. The action
          changes the environment. The changed environment generates new perceptual information.
          That new information informs the next action. And on. Without stop.
        </P>
        <P>
          You are not a processor sitting behind your eyes, receiving data and issuing commands.
          You are a continuous, dynamic system that is always already coupled to the world around you.
          The world is partly made by you as you move through it.
        </P>
      </Reveal>

      <Visual label="The perception-action loop — always running">
        <CouplingLoop />
      </Visual>

      <Reveal>
        <P>
          What does this mean for skill? It means skill is never stored in you and then retrieved.
          It&apos;s continuously assembled, on the fly, from the coupling between you and the environment
          you&apos;re in. Every time.
        </P>
        <P>
          The basketball player who makes a perfect pass in practice isn&apos;t retrieving a stored movement
          pattern. They&apos;re perceiving the positions of their teammates, the defender&apos;s weight shift,
          the angle of the basket — and generating an action that fits those perceptions. In practice,
          those perceptions are familiar. In the game, they&apos;re different. So the action is different.
        </P>
        <P>
          This doesn&apos;t mean the practice was useless. It means the practice built a version of the
          skill. Whether that version transfers depends entirely on how similar the practice environment&apos;s
          perceptual landscape is to the performance environment&apos;s perceptual landscape.
        </P>
        <P>
          That&apos;s the whole game.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 7: Three variables ───────────────────────── */}
      <Reveal>
        <Label>The three things that shape every behavior</Label>
        <P>
          In the 1980s, a researcher named Karl Newell formalized what Gibson&apos;s ecological approach
          implied for skill and movement. He identified three categories of constraints — three forces —
          that shape what any organism does in any given moment.
        </P>
        <P>
          He called them organism constraints, task constraints, and environmental constraints. And the
          key insight is that behavior — any behavior — is the product of all three interacting simultaneously.
          You can&apos;t predict what someone will do by looking at only one of them.
        </P>
      </Reveal>

      <Visual label="The three constraints — click to explore each one">
        <ThreeVariables />
      </Visual>

      <Reveal>
        <P>
          What Newell gave practitioners was a design framework. You cannot change the organism directly.
          You cannot rewire someone&apos;s biology or instantly upgrade their experience. But you can change
          the task and the environment — and when you do, you change what behaviors are available, what
          the organism perceives as possible, and therefore what they do.
        </P>
        <P>
          This is why constraints-led coaching — designing environments and task conditions that guide
          behavior rather than instructing it — produces more durable learning than traditional
          explicit instruction. The environment becomes the coach. The task becomes the teacher.
        </P>
        <P>
          And this is why the soccer player we opened with — practicing footwork against stationary cones
          in an empty facility — was building skill shaped by a very specific set of organism, task, and
          environmental constraints. Constraints that bore almost no resemblance to the ones she&apos;d
          encounter on Saturday.
        </P>
      </Reveal>

      <KeyInsight label="The practitioner&apos;s leverage">
        You cannot change the organism directly. But you can change the environment it&apos;s practicing in.
        Change the environment, and you change what the organism perceives. Change what it perceives, and
        you change what it does. Constraints are the design medium. This is the practitioner&apos;s real job.
      </KeyInsight>

      <Divider />

      {/* ── Section 8: The mismatch ──────────────────────────── */}
      <Reveal>
        <Label>The mismatch — not a ceiling, a design problem</Label>
        <P>
          Let&apos;s go back to your moment. The high-stakes performance that didn&apos;t go as expected.
          The pitch that fell apart. The game where your mechanics vanished.
        </P>
        <P>
          Now let&apos;s map it against the three constraints.
        </P>
        <P>
          In your practice environment, what were the organismic constraints? How were you feeling?
          What was your anxiety level? What was your energy state?
        </P>
        <P>
          In your performance environment, how did those change? What happened to your heart rate,
          your cortisol, your attentional bandwidth? Even if you&apos;d prepared perfectly, your organism
          walked into a different state.
        </P>
        <P>
          What about the task constraints? Were the rules of the game or conversation the same in
          practice as in performance? Was there a consequence structure — a referee, a judge, a client
          who could say no — that changed what the task demanded?
        </P>
        <P>
          And the environment? The space, the people, the noise, the social stakes, the thing on the
          line. Were those present in your practice?
        </P>
        <P>
          Almost certainly, some or all of these were different. Not slightly different. Categorically different.
          And the skill that emerged in practice was built precisely for the practice versions of each of these.
        </P>
      </Reveal>

      <Visual label="Practice vs. performance — the environmental gap">
        <PracticeVsPerformance />
      </Visual>

      <Reveal>
        <P>
          The technical term for the degree to which a practice environment matches the perceptual and
          action demands of the performance environment is representativeness.
        </P>
        <P>
          A representative practice environment is one that contains the essential informational structure
          of the performance environment. Not necessarily all the chaos and complexity — you can simplify.
          But the kinds of information the organism will need to read in performance must be present, at
          some level, in practice. Otherwise the skill that develops in practice is not the skill that
          gets called upon.
        </P>
      </Reveal>

      <Visual label="Representativeness across contexts">
        <MismatchMeter />
      </Visual>

      <Reveal>
        <P>
          When you see it through this lens, the transfer problem stops being a mystery. It becomes
          predictable. Of course the free throws don&apos;t land in the fourth quarter — the free throw practice
          contained almost none of the perceptual information present in a fourth-quarter foul shot. Crowd.
          Stakes. Fatigue. Opponents standing in your visual field. None of that was in the gym at 7am.
        </P>
        <P>
          Of course the pitch fell apart in the investor meeting — you rehearsed it alone, in your own space,
          with no adversarial questions, no social pressure, no stakes riding on the next minute. Your voice,
          your body, your thinking were shaped by a set of constraints completely unlike the ones you walked
          into.
        </P>
      </Reveal>

      <Divider />

      {/* ── Section 9: Why this is good news ────────────────── */}
      <Reveal>
        <Label>This is good news — and here&apos;s why</Label>
        <P>
          There&apos;s a version of this module where everything above feels like bad news. The transfer problem
          is bigger than you thought. The environments are more different than you realized. The skill you
          built is less portable than you assumed.
        </P>
        <P>
          But flip it. Here&apos;s what the ecological perspective actually gives you.
        </P>
        <P>
          First: it&apos;s not a talent problem. The soccer player isn&apos;t mentally weak. The pitcher
          isn&apos;t a choker. The entrepreneur isn&apos;t bad under pressure. They built a skill that&apos;s
          shaped by the wrong environment. That&apos;s a design problem — and design problems can be fixed.
        </P>
        <P>
          Second: the fix is concrete. You don&apos;t need to change the person. You need to change the
          environment they&apos;re building skill in. Make the practice environment more representative.
          Bring in the perceptual information that exists in performance. Design constraints that produce
          the kinds of decision-making, the kinds of actions, the kinds of perception that will be needed
          when it counts.
        </P>
        <P>
          Third: this gives you a diagnostic. When skill doesn&apos;t transfer, you now have a question to
          ask that isn&apos;t &ldquo;what&apos;s wrong with this person?&rdquo; The question is: &ldquo;what was
          different between the practice environment and the performance environment?&rdquo; That question has
          a concrete answer. And a concrete answer can lead to a concrete fix.
        </P>
      </Reveal>

      <BigQuote>
        It&apos;s not a ceiling. It&apos;s a mismatch. And mismatches can be closed.
      </BigQuote>

      <Divider />

      {/* ── Section 10: What this changes for you ───────────── */}
      <Reveal>
        <Label>What changes first</Label>
        <P>
          Understanding ecological dynamics doesn&apos;t immediately change what you do. It changes what
          you see.
        </P>
        <P>
          The next time you watch an athlete in practice, you&apos;ll start to notice things you weren&apos;t
          noticing before. How much of the performance environment is present in this drill? What
          perceptual information is available here that won&apos;t be available in competition? What
          information is absent here that will be critical there?
        </P>
        <P>
          The next time you sit through a training session at work — a simulation, a role-play, a
          presentation rehearsal — you&apos;ll start asking: what are the actual constraints of the real
          environment? Are any of them present here? If a colleague is simulating the tough client,
          are they being genuinely adversarial, or just playing at it?
        </P>
        <P>
          The lens doesn&apos;t install through understanding. It installs through looking. Looking with the
          framework active.
        </P>
        <P>
          That&apos;s what The Move is for.
        </P>
      </Reveal>

      <KeyInsight label="Before you move to Module 02">
        The next seven modules are each one idea from this framework, applied and deepened. But they
        all rest on what we covered here. The coupling. The constraints. The representativeness.
        The environment as an active ingredient, not a passive backdrop. If anything here didn&apos;t fully
        land, read this module again before you proceed. Everything else builds on it.
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
              Before your next session — whether you coach, teach, train, or create — watch for ten
              minutes without intervening. No instruction. No correction. No cues. Just observation.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              While you watch, ask one question: &ldquo;How representative is what&apos;s happening here
              of what needs to happen in the actual performance environment?&rdquo; Map the constraints.
              What&apos;s present here that won&apos;t be there? What&apos;s absent here that will be there?
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              Write down one specific gap you notice. One place where the practice environment
              diverges from the performance environment in a way that could explain a transfer
              problem you&apos;ve been living with.
            </p>
            <p className="text-[16px] text-white/85 leading-[1.9]">
              That gap is your entry point. We&apos;ll work with it in Module 02.
            </p>
          </div>
        </div>
      </Reveal>

    </div>
  );
}
