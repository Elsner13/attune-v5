// src/lib/modules.ts

export type ModuleSection = {
  heading: string;
  body: string[];
};

export type Module = {
  slug: string;       // "01" .. "08"
  title: string;
  duration: string;
  sections: ModuleSection[];
};

export const modules: Module[] = [
  {
    slug: "01",
    title: "Why the Reps Aren't Working",
    duration: "~40 min read",
    sections: [
      {
        heading: "The problem isn't effort",
        body: [
          "You've put the time in. You've done the reps, followed the programs, consumed the research. And somewhere in year three or five or ten, you started noticing something that didn't add up: the gap isn't closing the way it should.",
          "More hours. Same ceiling. You know this feeling. It's the one that made you click on something like this.",
          "Here's what I want to tell you up front: the effort wasn't wasted. But it was aimed at the wrong thing. You've been solving a discipline problem that was never a discipline problem to begin with.",
        ],
      },
      {
        heading: "The model you inherited",
        body: [
          "Every practitioner starts with a model they didn't choose. It arrived fully assembled through coaches, textbooks, certifications, and mentors who all received it the same way. You absorbed it before you had the language to question it.",
          "The model says: skill is acquired. You learn it, you drill it, you repeat it until it sticks. Add reps. Add volume. Add variety. The gap will close if you just stay consistent.",
          "That model isn't wrong. It's just built for a world that doesn't exist. It describes a learner as a container to be filled. It treats skill like a file to be downloaded. And it ignores the one variable that determines whether any of it transfers: the environment.",
        ],
      },
      {
        heading: "What ecological dynamics actually says",
        body: [
          "Ecological dynamics is not a coaching methodology. It's a description of how living systems actually work.",
          "The core claim: skill is not stored in the athlete and retrieved on demand. Skill is the emergent product of a specific organism interacting with a specific environment on a specific task. Change any one of those three things and you get a different behavior.",
          "This isn't a philosophy. It's observable. The athlete who performs brilliantly in practice and disappears in competition isn't weak-minded. Their skill emerged in the wrong environment. Of course it doesn't transfer. It was never built for the environment it needed to operate in.",
          "When you understand this, the ceiling you've been bumping against starts to look different. It's not a ceiling. It's a mismatch.",
        ],
      },
      {
        heading: "The Move",
        body: [
          "Before the next session you coach, teach, or practice: watch without intervening for the first ten minutes. Don't cue. Don't correct. Just observe.",
          "Ask one question while you watch: is what's happening in this environment representative of what needs to happen in the performance environment?",
          "Write down one word that describes what you notice. Bring it to Module 02.",
        ],
      },
    ],
  },
  {
    slug: "02",
    title: "The Environment Is the Teacher",
    duration: "~45 min read",
    sections: [
      {
        heading: "Gibson's bet",
        body: [
          "James Gibson was a perceptual psychologist who made a career-defining bet in the 1950s. He bet that perception didn't happen inside the head. It happened between the organism and the world.",
          "Everyone disagreed with him. Cognitive psychology was ascendant. The brain was the computer. Input, process, output. Information came in, the mind made sense of it, behavior came out.",
          "Gibson said: no. The animal and the environment are a system. You cannot understand behavior by studying one without the other. He spent the rest of his career proving it, and he won.",
        ],
      },
      {
        heading: "What affordances are and why they matter",
        body: [
          "Gibson's central concept was the affordance. An affordance is not a property of the object or the animal alone. It's a property of their relationship.",
          "A step is an affordance for climbing if you can climb it. The same step is not an affordance for a two-year-old or a person in a wheelchair. The step didn't change. The organism did. Affordances are relational.",
          "This is the move that changes everything for practitioners. Your job is not to install behaviors. Your job is to design environments that make the right affordances available to the right organism at the right time. The environment teaches. You arrange the lesson.",
        ],
      },
      {
        heading: "The three constraints",
        body: [
          "Newell's model identified three categories of constraints that shape every behavior you'll ever see: the organism, the task, and the environment.",
          "Organismic constraints: the physical and psychological properties of the person. Height, strength, fatigue, anxiety, skill level, emotional state.",
          "Task constraints: the rules and objectives. Scoring, timing, equipment specifications, the goal of the movement.",
          "Environmental constraints: the physical and social context. Surface, lighting, crowd, opponent, altitude, temperature.",
          "Skill emerges from the interaction of all three. The practitioner's tool is constraint manipulation. You cannot change the organism directly. But you can change the task and the environment, and watch new behaviors emerge.",
        ],
      },
      {
        heading: "The Move",
        body: [
          "Take one drill, exercise, or practice activity you use regularly. Map it against the three constraints: organism, task, environment.",
          "Then map the same three constraints against the actual performance context it's meant to prepare for.",
          "Where do they match? Where do they diverge? The divergences are the gaps in transfer. You'll come back to this in Module 04.",
        ],
      },
    ],
  },
  {
    slug: "03",
    title: "How to See What You've Been Missing",
    duration: "~45 min read",
    sections: [
      {
        heading: "The expert's advantage isn't technique",
        body: [
          "Watch a master at work in any domain and you'll notice something hard to name at first. They seem to have more time. They arrive early. They respond before the situation is obvious to anyone else.",
          "The standard interpretation: superior technique. Better motor patterns. More experience in the database.",
          "That's not wrong. But it misses the deeper mechanism. The master doesn't have better technique. They have better perception. They see the affordance before it closes. They feel the constraint before it bites. The technique is downstream of that.",
        ],
      },
      {
        heading: "Attunement is a process, not a trait",
        body: [
          "Attunement is the progressive calibration of perception to the information that matters in your environment. You become more attuned when you spend time in the environment where the relevant information lives.",
          "This is why you cannot develop attunement by reading about it. Description is not attunement. I can describe the smell of rain on dry earth with perfect accuracy and it will tell you nothing about the experience. Attunement requires presence in the relevant environment.",
          "The implication for practitioners: you cannot transfer attunement through instruction. You can only design environments where it can develop. This is one of the most important sentences in this course. Let it settle.",
        ],
      },
      {
        heading: "What blocks attunement",
        body: [
          "The most common blocker is premature instruction. When you tell an athlete what to attend to before they've had the chance to discover it, you interrupt the attunement process. You're solving a problem they haven't yet had the chance to encounter.",
          "The second blocker is decontextualized repetition. When the practice environment strips out the perceptual information that exists in the performance environment, the athlete gets very good at performing in the absence of that information. They don't attune to it. It was never there.",
          "The third blocker is noise. Coaches who talk constantly during practice are competing with the environment for the athlete's attention. Most of the time, the environment has more useful information to offer.",
        ],
      },
      {
        heading: "The Move",
        body: [
          "Run your next practice session with one deliberate constraint on yourself: no verbal instruction during the activity. You can set it up. You can debrief after. But while it's happening, stay quiet.",
          "Observe what the athletes attend to without your guidance. What do they naturally pick up on? What do they miss?",
          "This single constraint will tell you more about your practice environment's informational richness than any planning session could.",
        ],
      },
    ],
  },
  {
    slug: "04",
    title: "Stop Teaching. Start Designing.",
    duration: "~50 min read",
    sections: [
      {
        heading: "The cue is the last resort",
        body: [
          "The moment you resort to a verbal cue, you've admitted something: the environment you designed wasn't rich enough to produce the behavior on its own.",
          "That's not always avoidable. Sometimes the cue is the right tool. But most practitioners reach for it first, not last. The cue becomes a shortcut that bypasses the deeper work of environment design.",
          "Here's the test: if you removed every cue you give in a typical session, would the behaviors you want still emerge? If the answer is no, the environment isn't doing its job. The cue is papering over a design problem.",
        ],
      },
      {
        heading: "Constraints are the design medium",
        body: [
          "The constraints-led approach doesn't mean removing all guidance. It means using constraints as the primary design medium instead of instruction.",
          "A constraint is anything that shapes what behaviors are available. Modify the space. Change the ratio. Alter the equipment. Adjust the scoring. Introduce or remove a defender. Each change shifts what the organism perceives as possible, and therefore what it does.",
          "The beauty of constraint-led design is that it produces behavior without the organism feeling told. The behavior feels chosen because the environment made it the most available option. That's not manipulation. That's good teaching.",
        ],
      },
      {
        heading: "The representative design principle",
        body: [
          "The single most important question in practice design: does this environment contain the same informational structure as the performance environment?",
          "If the game contains defenders who apply pressure based on where the ball is, but your drill removes the defenders to let athletes focus on technique, you've removed the information the technique needs to respond to. The technique will look clean in the drill. It will dissolve under pressure.",
          "Representative design means your practice environments must preserve the perception-action coupling of the real thing. You can simplify. You can isolate. But you cannot remove the essential informational structure and expect transfer.",
        ],
      },
      {
        heading: "The Move",
        body: [
          "Take the constraint map you built in Module 02. Pick the largest gap between your practice environment and your performance environment.",
          "Design one modification to your next session that closes that gap without changing the fundamental activity. You're not redesigning the whole thing. One constraint. One change.",
          "Run it. Observe what changes in the behavior without changing the instruction. Write down what you see.",
        ],
      },
    ],
  },
  {
    slug: "05",
    title: "Train the Eye Before the Hand",
    duration: "~45 min read",
    sections: [
      {
        heading: "Action is the last thing that happens",
        body: [
          "Every movement you've ever made was preceded by a perception. The foot that lands in the right place was guided by an eye that read the ground. The hand that catches the ball was tracking its trajectory before the arm moved.",
          "We train the hand. The eye is assumed.",
          "This is the gap. And it explains why so many athletes can perform a movement in isolation and lose it the moment the environment becomes complex. The movement was trained. The perception that guides it in a real environment was not.",
        ],
      },
      {
        heading: "The perception-action loop",
        body: [
          "Gibson described perception and action not as a sequence but as a loop. Perception guides action. Action changes the environment. The changed environment generates new perceptual information. That information guides the next action.",
          "You cannot break this loop and expect the pieces to reassemble under pressure. When you train movement divorced from its perceptual context, you're building half a loop. The other half — the part that matters in competition — has never been practiced.",
          "This is why a sprinter who runs perfect times in training can tighten under the gun and lose a race to someone with objectively worse mechanics. The mechanics aren't the variable. The perception-action coupling is.",
        ],
      },
      {
        heading: "What training perception actually looks like",
        body: [
          "It looks like putting athletes in environments where they have to read information and respond. Not drills that pre-script the response. Situations where the information determines the action.",
          "It looks like small-sided games where decisions must be made at speed. It looks like varying the context so the athlete cannot rely on a rehearsed motor pattern. It looks like introducing uncertainty — the same uncertainty that exists in the performance environment.",
          "It looks, in short, like representative practice. Which is why Modules 04 and 05 are the same argument from two angles. You design representative environments so that athletes can attune to the information within them. The curriculum is one idea.",
        ],
      },
      {
        heading: "The Move",
        body: [
          "Design one activity this week where the athlete's movement is determined entirely by perceptual information — not by a pre-set sequence, not by a cue, not by a demonstration.",
          "The activity should be simple enough to run in five minutes and complex enough that the athlete cannot predict what response will be required before the information arrives.",
          "Observe whether athletes who struggle in this context are weak in perception or weak in movement. The answer tells you where the real work is.",
        ],
      },
    ],
  },
  {
    slug: "06",
    title: "The Difference Between Collecting and Building",
    duration: "~40 min read",
    sections: [
      {
        heading: "The shore is comfortable",
        body: [
          "There's a version of professional development that feels productive but produces nothing. You collect frameworks. You attend seminars. You fill notebooks with ideas you mean to implement. You save articles, annotate books, build reference libraries.",
          "The shore is comfortable. You can see the stream from there. You know what the stream is. You've read extensively about what it's like to be in it.",
          "And every year, the gap between your knowledge about coaching and your actual coaching doesn't close the way you expected it to. Because knowledge about a place is not the same thing as knowledge of it.",
        ],
      },
      {
        heading: "Two kinds of knowledge",
        body: [
          "Gibson drew a distinction that should change how you think about your own professional development: knowing about versus knowing of.",
          "Knowing about is propositional. You can articulate it. You can teach it to someone who's never been there. It lives in language.",
          "Knowing of is something else. It's the navigator who can feel a ship's course in the movement of the water. The surgeon who knows by touch when the tissue is right. The coach who reads a practice session the way a musician reads a room. It cannot be fully described. It can only be developed through presence in the relevant environment.",
          "Most professional development optimizes for knowing about. The field is full of people who can explain ecological dynamics beautifully and haven't changed a single practice session because of it.",
        ],
      },
      {
        heading: "Getting in the stream",
        body: [
          "The stream metaphor is this: you don't push water. You don't manufacture flow by effort alone. You get in, and the current does something to you that standing on the shore cannot.",
          "For practitioners: getting in the stream means applying one idea in one session before you're confident about it. It means designing and observing and adjusting in real time. It means accumulating the kind of knowledge that only comes from being in the environment you're trying to influence.",
          "The test is simple: when was the last time you changed something in your practice based on what you observed, not what you read? That's the stream. Everything else is the shore.",
        ],
      },
      {
        heading: "The Move",
        body: [
          "Identify one idea from this course that you have understood but not yet applied. Not a concept you're still figuring out. One you could explain right now to someone else.",
          "Apply it in your next session. Imperfectly. Without waiting until you have it right.",
          "The shore will tell you to wait. The stream requires you to step in.",
        ],
      },
    ],
  },
  {
    slug: "07",
    title: "The Same Problem, Your Domain",
    duration: "~50 min read",
    sections: [
      {
        heading: "The framework travels",
        body: [
          "Ecological dynamics was formalized in sport science, but it describes a principle that operates everywhere living systems interact with environments. The organism, task, and environment framework doesn't care what domain you work in.",
          "A surgeon developing tactile sensitivity to tissue resistance is attuning. A musician learning to read the energy in a room before adjusting dynamics is coupling perception to action. A teacher who notices a classroom's energy shift before the disruption arrives is reading affordances.",
          "These are not metaphors. They're instances of the same underlying process. The vocabulary transfers because the phenomenon is the same.",
        ],
      },
      {
        heading: "Applying it to your specific context",
        body: [
          "The question that matters is not how ecological dynamics applies in general. That's the shore. The question is: what are the specific affordances that matter in my performance environment, and am I designing conditions where the people I work with can attune to them?",
          "For the strength coach: is your training environment creating the perception-action couplings your athletes need in competition, or are you building strength in the absence of the perceptual context where it needs to operate?",
          "For the content creator: are you producing in conditions representative of how your audience actually consumes and applies your work, or are you optimizing for how content looks rather than what it does?",
          "For the teacher: are your students practicing in environments where the relevant information is present, or have you simplified to the point where the real problem has been removed from the practice?",
        ],
      },
      {
        heading: "The domain crossing is the point",
        body: [
          "The reason this framework has staying power across domains is not that it's versatile. It's that it's accurate. Living systems really do couple with their environments to generate behavior. That's not a coaching philosophy. That's how organisms work.",
          "When you see it operating in your domain, you stop needing to translate it. It becomes the lens. And once you have the lens, the applications are not something you figure out. They're something you see.",
        ],
      },
      {
        heading: "The Move",
        body: [
          "Write down three decisions you made in your practice or work this week. For each one, identify: what information from the environment triggered that decision?",
          "If you can't identify the information, the decision came from a rule you brought in from the outside — not from reading the environment you were actually in.",
          "This is the diagnostic. Do it once. Then do it every week. The pattern will tell you exactly where you're operating from the shore.",
        ],
      },
    ],
  },
  {
    slug: "08",
    title: "Run It. Don't Study It.",
    duration: "~40 min read",
    sections: [
      {
        heading: "The OS is already running",
        body: [
          "You've been through seven sessions. You've encountered affordances, constraints, attunement, representative design, the perception-action loop, the shore and the stream.",
          "Here's what I want to tell you now: you already understand enough to change how you work. The question is whether you'll use it or keep studying it.",
          "There's a version of this course where you finish the eight modules, feel satisfied with the learning, and return to the same sessions you were running before. That version is the shore. You collected the framework. You didn't get in.",
        ],
      },
      {
        heading: "How the lens actually installs",
        body: [
          "The lens doesn't install through comprehension. It installs through application observed carefully over time. You apply a constraint you wouldn't have thought of before. You watch what changes. You adjust. You apply again.",
          "After enough iterations, you stop translating the framework consciously and start seeing through it. The three constraints become invisible scaffolding. You notice a mismatch between practice and performance environment before you finish the sentence explaining it to yourself.",
          "That's attunement to the framework. And it develops the same way attunement to anything develops: through repeated, deliberate exposure in the relevant environment.",
        ],
      },
      {
        heading: "What comes after this",
        body: [
          "Foundations is the beginning. The OS runs in the background while you continue building everything else. Your domain knowledge. Your relationships. Your practice.",
          "Signal/Noise exists to keep you coupled to the lens after the course ends. Each issue takes one concept from this framework and shows you where it's alive in the world right now. Not to add to what you know. To keep the lens clean.",
          "The work is ongoing. The environment keeps changing. Your attunement to it is a practice, not a destination.",
        ],
      },
      {
        heading: "The Move",
        body: [
          "One session. This week. Design it from scratch using only what you learned in this course.",
          "No borrowed frameworks. No habitual drills. Start with the performance environment and work backward. What affordances need to be present? What constraints will produce the behaviors you want without forcing them? What perceptual information must be in the room?",
          "Run it. Write down what surprised you. That surprise is the gap between your model and reality. That gap is where the real work begins.",
        ],
      },
    ],
  },
];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getNextModule(slug: string): Module | undefined {
  const idx = modules.findIndex((m) => m.slug === slug);
  return idx >= 0 && idx < modules.length - 1 ? modules[idx + 1] : undefined;
}
