# The Connective Map

## How the pieces of *Sisyphus, Optimizing in a Dynamic Universe* actually connect

> This is not a replacement for `Sisyphus_Dynamic_Universe_Detailed_Notes.md`.
> That file is an inventory: thirty sections, each correct, each standing alone.
> This file is the **spine** — the order the pieces have to come in, and the
> load each one bears. Where a section here supersedes or reframes something
> there, it says so.

---

## 0. The single organizing claim

Everything below hangs off one sentence:

> **The loop is circular in structure and directional in fact.**

The structure is a cycle: question → ruler → data → compression → inference →
answer → question. Drawn on a page it closes.

It does not close. Three independent mechanisms — one thermodynamic, one
dynamical, one epistemic — guarantee that the point you return to is not the
point you left. The circle is the *diagram*; the arrow is the *fact*.

That gap is the whole talk. Sisyphus is not the image of a circle. He is the
image of the difference between the diagram and the fact.

Big picture → detail runs: **axiom → circle → ruler → instruments → arrow →
who turns it → the outside → the ending.** Seven parts. Each depends only on
the parts above it.

---

## 0.1 The shape on one page

```text
                     ┌────────────────────────────────────┐
        THE AXIOM    │ information is always information  │
                     │           about a question         │
                     └─────────────────┬──────────────────┘
                                       │
        ╭──────────────────────────────┴──────────────────────────────╮
        │                        THE CIRCLE                           │
        │                                                             │
        │    QUESTION ────────> what matters ────────> RULER          │
        │       ^                                        │            │
        │       │                                        v            │
        │   good enough?                                DATA          │
        │       ^                                        │            │
        │       │                                        v            │
        │    ANSWER <──────── INFERENCE <──────── COMPRESSION         │
        │                                                             │
        ╰──────────────────────────────┬──────────────────────────────╯
                                       │
                    why the circle does not close
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            v                          v                          v
     THERMODYNAMIC               DYNAMIC                   EPISTEMIC
     every turn costs work;      the landscape moves       the answer makes
     only bits informative       while you climb           the next question
     about the question
     pay it back
            │                          │                          │
            └──────────────────────────┼──────────────────────────┘
                                       v
                              THE ARROW — a spiral,
                            not a circle: same shape,
                              different altitude
                                       │
                                       v
                   ┌───────────────────┴───────────────────┐
                   │   three systems run this loop         │
                   │   brain · model · science             │
                   │   they differ in what they may change │
                   └───────────────────┬───────────────────┘
                                       │
                                       v
                   ┌───────────────────┴───────────────────┐
                   │   THE PROGRAM — one of them, traced   │
                   │   enhancement → wrong ruler →         │
                   │   will not scale → JAISP → Fisher     │
                   └───────────────────┬───────────────────┘
                                       │
                                       v
                        you cannot judge a loss with
                        that loss. the only signal that
                        crosses out of the loop is SURPRISE
                                       │
                                       v
                       a system that extracts work from a
                       gradient must maintain a gradient
                                       │
                                       v
                          one must imagine Sisyphus happy
```

---

## 0.2 Where every concept lives

| concept | part | status | old § | on stage? |
|---|---|---|---|---|
| information is about a question | I | kept | §1 | yes — beat 2 |
| the loop | I | kept | §2 | yes — scene 3 |
| optimization vs inference | I | **new** | — | one line, scene 6 |
| feedback | I | **new** | implicit | notes only |
| loss / metric / distance | II | kept | §3 | yes — scene 5 |
| distance as sampling rate | II | **new** | — | **yes** — scene 5, science-carried |
| rate–distortion | II | **new** (Shannon) | — | notes; one line on stage |
| prospect theory | II | **new** | — | yes — human thread |
| Jaynes / chosen priors | II | **new**, via prospect theory | §28 warns | notes only |
| entropy · surprise · KL · Fisher | III | kept | §8–11 | yes — scene 9 |
| surprise is the only exit | III | **new** — hinge | §9 partial | yes — scene 10 |
| dopamine / RPE | III | **new** | — | one line, human thread |
| the three reasons | IV | **new** framing | scattered | notes; structures the deck |
| mutual info = extractable work | IV | **new** (Landauer/Szilard) | — | notes; one line if asked |
| the landscape moves | IV | kept | §21 | yes — title, appendix A2 |
| the answer makes the question | IV | kept | §13.1 | yes — scene 16 |
| brain · model · science | V | **new** framing | §18 partial | yes — scene 4 |
| foundation representation | V | kept | §17–20 | yes — scenes 13–14 |
| **the enhancement family** | **VI** | **new — positioned** | absent | **yes** — scene 4, receipts |
| **what each result proves** | **VI** | **new** | absent | **yes** — scenes 5, 8 |
| **JAISP as the bet** | **VI** | reframed | §17–20 | **yes** — scenes 13–14 |
| judging the loss from outside | VII | **new** — load-bearing | §13.2A partial | **yes** — scene 16 |
| the fork, re-read | VII | reframed | §13.2 | yes — scene 10 |
| nonzero gradient | VIII | **new** | — | yes — scene 15/16 |
| die on the hill / slope | VIII | kept | §22 | yes — scene 15 |
| Sisyphus happy | VIII | kept | §23–24 | yes — scene 16 |

---
---

# PART I — THE CIRCLE

*The timeless structure. Nothing here has a direction yet.*

## 1. The axiom

> **Information is always information about a question.**

Unchanged from the old notes' §1, but note what it is doing structurally: it is the only
statement in the talk that is *prior to the loop*. Everything else is a station
on the circle or a fact about the circle. This one licenses the circle to exist.

It also has a consequence nobody expects at this point in the talk, delivered
in Part IV: this sentence is a thermodynamic statement, not only an epistemic
one. Bits that carry no information about the question are not merely useless.
They are expensive. Hold that.

## 2. The loop

Question → what matters → ruler → data → compression → inference → answer →
good enough? → question.

Unchanged from the old notes' §2. Two notes on how it should be *drawn*:

- It must be drawn once, early, and completely. The deck does this at scene 3.
  Everything after is a zoom into one station.
- It must be drawn as a circle even though the rest of the talk is about why it
  is not one. The audience needs the wrong picture first, or the correction
  lands on nothing.

## 3. Optimization is a lossy compression of inference

**This resolves "optimization, or just inference?" — they are not alternatives.**

- **Inference** takes a model and data and returns a *distribution*. It
  presupposes a model class and a prior. Uncertainty is the output.
- **Optimization** takes a loss and data and returns a *point*. It presupposes
  the loss. It has no notion of how sure it is.

The relation:

> **Optimization is inference with the uncertainty discarded.**

A MAP estimate is a posterior with one number kept. Which means optimization is
subject to §6's own rule about compression: it is lossy with respect to the full
posterior, and it may or may not be sufficient for the question. Sometimes the
point is all you need. Sometimes discarding the width is the error that ends the
project.

This is not a digression — it is the same claim as the compression scene,
applied one level up, and it means the talk's central idea is self-similar. The
loop compresses data into a representation, and *then compresses inference into
an answer*. Both compressions are chosen. Both can be wrong in the same way.

**The image this licenses, and it is the deck's best one:** gradient descent
sees only the local slope. Fisher is the curvature — the second-order fact.
Entropy is the width. An optimizer standing on the hill can feel which way is
down and *nothing else*. Sisyphus knows the slope under his feet. He cannot see
the shape of the mountain. That is not a metaphor; it is a literal statement
about first-order methods.

→ connects forward to **§11** (why surprise is the only signal that escapes) and
**§23** (why the optimizer cannot audit its own loss).

## 4. Feedback is what makes it a loop

The arrow from *answer* back to *question* is doing more work than the diagram
admits. Four regimes, and the talk touches all four without naming them:

| regime | behaviour | where it shows up |
|---|---|---|
| **open loop** — no feedback | you never learn the ruler was wrong | the failure mode of a fixed benchmark |
| **negative feedback** | error shrinks, system converges | die on the hill (§27) |
| **positive feedback** | the reference moves with you; no convergence | prospect theory (§8), the moving landscape (§15) |
| **measurement feedback** | probing changes the probed | scene 7's marginalia; the human example |

Naming these is what lets Part VII be mechanical rather than poetic. "The rock
comes back" is a statement about which feedback regime the system is in.

The key asymmetry, which pays off at §12: **a feedback signal that is an error
goes silent when the system is right.** Any loop driven by error is a loop that
has no signal at its own optimum. Remember that sentence.

---
---

# PART II — THE RULER

*The circle's geometry. This is where the talk stops being generic.*

## 5. Distance is a choice

Unchanged from the old notes' §3. **Change the ruler, change the landscape.** The argmin moves
when the metric moves; nothing in the data says which metric is right.

Scene 5 already carries this with five super-resolution losses on one basin.
What follows are three upgrades that make it a claim about physics and about
brains rather than a slogan.

## 6. Distance is a sampling rate

**New. The strongest of the additions, because the science carries it.**

The claim:

> **A metric does not only rank answers. It decides how many objects exist.**

Two sources separated by less than the sampling scale are one source *under that
ruler*. Change the sampling, and the number of things in the field changes. This
is not an approximation error — it is a statement that the ontology of the
catalogue is set by the metric, before any inference runs.

The instances are hers, all three verified against manuscript:

| pair | the distance that changes | factor |
|---|---|---|
| NISP Y_E → JWST/NIRCam F115W | spatial sampling | 5× |
| WISE W1 → Spitzer IRAC Ch1 | spatial sampling | 4.6× |
| NIRSpec prism R∼100 → R∼1000 | spectral sampling | 10× |

In each, "enhancement" is the claim that the threshold at which two things count
as distinct can be moved *using a prior* rather than using new photons. Which is
exactly scene 8's fourth beat — compression run backwards — now stated as a
change of metric rather than a change of resolution.

**Why this belongs on stage:** it converts "the loss is a ruler we chose" from
philosophy into a measurement. Nyquist is a ruler. It is also a fact.

**Caution:** do not say the prior creates information. It moves information from
where it was measured (the training sky) to where it is needed. The ledger must
balance, and validation is the audit. This is already the deck's line; keep it
attached here.

→ connects to **§7** (the formal version) and **§14** (why a finite rate is not
optional).

## 7. Rate–distortion: the ruler decides what gets discarded

**New. This is where Shannon belongs — not at entropy, where he is currently
implied and unnamed, but here.**

Rate–distortion theory says: given a budget of R bits, the best achievable
distortion D depends on *the distortion measure you chose*. Fix the rate, change
the measure, and the optimal thing to throw away changes completely.

That is scene 5, stated formally. Same network capacity, five different losses,
five different survivals. The deck already *shows* this. Shannon says it was
guaranteed in advance.

It also gives the old notes' §6 (compression) its missing spine. Its §6.1 currently distinguishes
lossless from lossy and then, correctly, says the useful distinction is
*sufficiency for a question*: I(T(D);θ) = I(D;θ). Rate–distortion is the same
statement with a budget attached — sufficiency is the D = 0 corner of a curve
that is otherwise all trade-off. Real representations live on the curve, never
at the corner.

**On stage:** one line at most. The idea is load-bearing; the name is not. Say
"there is a theorem that says which information you lose is set by the ruler,
not by the compression algorithm" and move.

## 8. Prospect theory: the ruler brains actually have

**New. This is the human thread's missing content.**

Everything in the deck's human column so far describes a person *running* the
loop. Prospect theory describes the *loss function they run it with*, measured,
with numbers. Three findings, each of which maps onto something already in the
talk:

| prospect theory | maps onto |
|---|---|
| **reference dependence** — value is measured from where you stand, not in absolute terms | the origin of the metric is chosen (§5) |
| **loss aversion** — losses hurt roughly 2× the symmetric gain | the landscape is *kinked* at your current position |
| **probability weighting** — small probabilities overweighted, moderate ones underweighted | the probabilities you compute with are chosen, not found (§9) |

The second is the interesting one and it is not decoration:

> **The kink follows the optimizer.** Under reference-dependent value, the
> landscape is not a fixed surface being climbed. It is regenerated around
> wherever the climber is standing.

That is the *dynamic universe of the title, derived from the inside* — not the
field moving because the sky moves (appendix A2), but the landscape moving
because the observer moved. It is a positive-feedback loop in the sense of §4,
and it is a reason a system can fail to converge that has nothing to do with
noise, bad data, or a wrong model.

**Caution, and it matters:** prospect theory is a descriptive model of choice
under risk, fit to behavioural data. It is not a claim about neural
implementation and it is not universal across cultures or framings. Use it as
"here is a measured loss function that is not the one physicists assume," which
is true, and not as "here is how the brain works," which overreaches in exactly
the way the old notes' §28 already warns about for Bayes.

## 9. Jaynes and prospect theory make the same claim

**New — and this is what rescues the Jaynes thread, which does not survive on
its own.**

Jaynes: the prior is not discovered in the data. You choose it, and maximum
entropy is a *principle for choosing* — the distribution that commits to nothing
beyond your stated constraints.

Prospect theory: brains also reweight probabilities before computing with them.
Not by maximum entropy. By some other rule, one that overweights the rare.

Put side by side, the shared claim is:

> **The probabilities you compute with are chosen. The only question is whether
> you chose them by a stated principle or by an unstated one.**

That is a genuinely useful sentence and it belongs in the notes, because it is
the honest bridge between the human column and the statistical one. Both systems
reweight. One of them writes the rule down.

**Conflict to resolve, flagged honestly:** the old notes' §28 says "do not say *maximize
entropy* for experimental design." That caution is correct and must stay —
design targets expected information gain, not entropy. But it currently reads as
a blanket warning off MaxEnt. Amend it to distinguish the two uses: MaxEnt is a
principle for *setting a prior*; EIG is the criterion for *choosing an
experiment*. Conflating them is the error; naming both is not.

**On stage:** no. This is a notes-only idea that makes the human column
defensible if someone pushes.

---
---

# PART III — THE INSTRUMENTS

*What you can measure while standing on the circle — and the one thing that
tells you to leave it.*

## 10. The four rulers

Unchanged from the old notes' §8–11 and scene 9:

> **Entropy:** how uncertain am I?
> **Surprise:** how unexpected was this observation?
> **KL:** how much did I learn?
> **Fisher:** where is the hill steep?

Keep the existing cautions verbatim: low entropy is not truth; surprise is not
information gain; Fisher is local.

What the next two sections add is a claim about *which of these four can do
something the others cannot*.

## 11. Surprise is the only signal that leaves the loop

**New. This is the hinge of the whole document.**

Consider what each instrument can tell you:

- **Entropy** measures your uncertainty *given* your model. If the model is
  wrong, entropy is confidently wrong with it. (the old notes' §8 already says this.)
- **Fisher** measures local sensitivity *given* your model and your
  parametrisation. Wrong model, wrong curvature.
- **KL** measures belief change *within* a fixed hypothesis space.
- **Surprise** — −log p(D) — measures how badly reality violated the model.

Three of the four are computed inside the model's own frame and therefore cannot
detect that the frame is wrong. Surprise is the only one that can, because it is
the only one whose reference is the *observation* rather than the belief.

> **The optimizer cannot audit itself. Prediction error is the only signal that
> crosses out of the loop.**

This is why §9 currently feels thin — it is written as one of four instruments,
when it is structurally different from the other three. And it is why the fork
(the old notes' §13.2, scene 10) exists at all: the fork is *what you do after a surprise*.
Without surprise there is no fork, because nothing would ever tell you the
answer was not good enough.

It is also the honest limit: surprise tells you *that* something is wrong. It
does not tell you *which* of the three things is wrong. That diagnosis is not
available from inside. See §23.

**Retain the existing caution and sharpen it:** surprise is not information
gain. A weird datum can be maximally surprising and tell you nothing about θ.
The upgrade: surprise is not information *about the parameter*, but it is the
only available information *about the model*. Those are different targets, and
that is precisely why the two quantities come apart.

## 12. Dopamine: the brain's implementation of §11

**New. One line on stage, a paragraph in the notes.**

The reward prediction error account: dopaminergic firing tracks the *difference*
between received and predicted reward, not reward itself. A fully predicted
reward produces no signal.

Three reasons this earns its place, in order of importance:

1. **It is §11, implemented in wetware.** The brain's learning signal is
   prediction error — the same quantity that is the only exit from the loop.
   The human column and the statistical column converge on one variable.
2. **It is safer ground than the Bayesian-brain claim the old notes' §28 forbids.** RPE is a
   well-supported empirical account of a specific signal, not a claim that
   cognition is Bayesian inference. Say the narrow thing.
3. **It sets up Part VII.** Recall §4's asymmetry: *a feedback signal that is an
   error goes silent when the system is right.* A brain that learns from
   prediction error has no signal at its own optimum. Not a low signal — none.
   That is the mechanism behind everything in §26, and it arrives here without
   any Sisyphus talk attached, which is why it is credible when it returns.

**Caution:** RPE is a model of a dopaminergic signal, not a theory of motivation,
pleasure, or scientific curiosity. Do not narrate scientists as dopamine-seeking.
The structural point — error-driven systems are quiet at their optimum — stands
on its own and does not need the neuroscience to be load-bearing.

---
---

# PART IV — THE ARROW

*Why the circle does not close. Three mechanisms, independent, any one of them
sufficient.*

## 13. The three reasons

This section is new as a *framing*, though its parts are scattered through the
old notes. Stating them as three independent mechanisms is what converts a
collection of observations into an argument.

> The circle does not close because: **it costs something to go around**
> (thermodynamic); **the ground moves while you go around** (dynamic); and
> **arriving changes where you wanted to go** (epistemic).

Independence matters. Remove any two and the third still breaks the circle. That
is why the ending is not sentimental — it is overdetermined.

## 14. Thermodynamic: mutual information with the question is extractable work

**New. The most surprising connection in the document, and it is an identity,
not an analogy.**

The chain:

- **Landauer:** erasing one bit of information costs at least *kT* ln 2 of work.
- **Szilard / Sagawa–Ueda:** the work you can extract from a system using a
  measurement is bounded by *kT* × the **mutual information** between your
  representation and the system.

Now put that next to the old notes' §6.1, which is already there. The condition for
a compression to be sufficient for a question is:

    I(T(D); θ) = I(D; θ)

The *same functional* — mutual information between your representation and the
thing you care about — is simultaneously:

- the epistemic figure of merit (how much of the answer survived compression),
- and the thermodynamic one (how much work that representation can buy you).

Which yields the claim in its precise form:

> **Bits in your representation that carry no mutual information with the
> question yield no extractable work — and still cost to store, move, and
> erase. Useless retained bits are not merely inelegant. They are dissipative.**

And therefore, closing the loop back to the axiom of §1:

> *Information is always information about a question* is not only a statement
> about meaning. It is a statement about energy. A bit that is not about your
> question does not do work.

This also gives compression (old notes §6) a second, independent justification. It says we
compress because we cannot carry everything into every decision — a practical
argument. §14 here says the universe charges for the alternative — a physical one.
Two independent reasons for the same station on the circle.

**Cautions, and these are not optional — a physicist in that room will check:**

1. *kT* ln 2 at room temperature is ≈ 3 × 10⁻²¹ J. Real compute is many orders
   of magnitude above the Landauer bound, dominated by data movement, not
   erasure. **Do not claim datacenters are near the thermodynamic limit.** They
   are not, and saying so would be the one wrong sentence in the talk.
2. The honest claim is *structural*: the same functional governs both, and real
   cost also scales with bits carried — just far above the bound. Say "the same
   quantity appears in both ledgers," not "we are paying the Landauer price."
3. Sagawa–Ueda requires care about what the demon knows and when. Do not derive
   anything quantitative on stage. This is a notes-level connection with a
   one-sentence stage version if someone asks.

## 15. Dynamic: the landscape moves

Unchanged from the old notes' §21, and now with a second source. There are two distinct ways
the ground moves, and the talk has only been telling one:

- **Exogenous** — the system itself changes while you measure it. A person
  changes; the field moves (appendix A2's coherent 9–10 mas); the sky is not
  static. This is the version the old notes have.
- **Endogenous** — the landscape is regenerated around the optimizer's own
  position, because value is reference-dependent (§8). Nothing external changed.
  You moved, so the hill did.

The second is new and it is the more unsettling one, because it cannot be fixed
by better data. It also connects the human column to the title in a way the
astrometry column cannot: the source's position sits still while you measure it,
a person does not — and, per §8, *neither does the person doing the measuring.*

## 16. Epistemic: the answer makes the question

Unchanged from the old notes' §13.1. Good enough → ask a new question → new loss → new
landscape. **New question does not imply new data.**

The addition is only to place it correctly: this is the *third* independent
reason the circle fails, and it is the one the audience will find least
threatening, which is why it should come last of the three. The first two say
the loop is expensive and unstable. This one says it is generative. Order them
that way.

---
---

# PART V — WHO TURNS THE CRANK

*Three systems run this loop. The payload is where they differ.*

## 17. Brain, model, institution

The old notes run the human example and the astrometry example in parallel
(the old notes' §25 table), which is correct and should stay. But two columns is one too few
and the wrong framing. There are three systems running this loop, and the
interesting content is not where they match — it is **where they differ in what
they are permitted to change.**

| | **brain** | **model / AI** | **science as institution** |
|---|---|---|---|
| the loss is | mostly not choosable; reference-dependent (§8) | chosen by us, explicitly | negotiated socially, over decades |
| data is | serial, irreversible, one pass | fixed, re-readable, shuffleable | archived; re-analysable; the universe is not re-runnable |
| can it restart? | no | yes — retrain from scratch | partially; paradigm shifts are expensive |
| the learning signal | prediction error (§12) | gradient of the chosen loss | anomaly, disagreement, failed replication |
| who audits the loss? | nobody, from inside | **we do — and that is the danger** | peer review, slowly, and badly |
| probing changes the probed? | yes, always | no | sometimes (funding shapes what is measured) |

**The line this table exists to deliver:** the reason an explicitly chosen loss
is more dangerous than an implicit one is that it is *optimizable*. A brain with
a muddled objective fails gently. A model with a crisp wrong objective converges,
efficiently, on the wrong thing — and reports low uncertainty while doing it
(§8's "confidently wrong," now with a mechanism).

**Caution, extending the old notes' §28:** the claim is not that the brain is a model or a model
is a brain. It is that all three are instances of one abstract loop, and the
scientific content is in the differences. If the analogy is stated as similarity,
it is decoration. Stated as *a controlled comparison*, it is an argument.

## 18. Where the foundation representation sits

The old notes' §17–20 are correct and need no rewriting. What the connective
map adds is *why the foundation idea is forced rather than fashionable*:

- §16 says new questions arrive continuously and do not require new data.
- §6/§7 say every compression is sufficient for some questions and not others.
- §14 says rebuilding a compression per question has a real cost.

Together those three make foundation representations the *only* structurally
available answer, not a choice of architecture:

> **If questions keep arriving, and every compression is question-specific, and
> compression is expensive, then you must either recompress forever or learn a
> representation before you know the question.**

JAISP is that second option, in astronomy. And the Fisher test of the old notes' §20 —
how much information about (x,y) survives at each level of the representation —
is the honest audit, because it is the one number that can say *no*.

**The bet, stated plainly:** a foundation representation is a wager about
questions you have not asked yet. §14 says you cannot keep everything. §7 says
what you keep is set by a distortion measure. So pretraining is the act of
choosing a distortion measure for questions that do not exist yet. That is the
real intellectual content of the program, and it is not usually said out loud.

---
---

# PART VI — THE PROGRAM

*Where the work sits. Not as illustration — as the instance that the rest of
the map predicts.*

## 19. The arc, as a walk around the loop

The claim of this part:

> **The research program went around this loop in the canonical order, and each
> project moved to the next through a specific one of the three exits.**

That is the reason to be the one giving this talk. Not that the philosophy
explains the work — that the work traversed the structure, in sequence, and
the failures were the named failures.

| # | stage | where it sits on the map | which exit moved it on |
|---|---|---|---|
| 1 | **pairwise enhancement** — NISP←NIRCam, WISE←IRAC, prism←grating | §6 distance is a sampling rate; §7 the ruler decides what survives | — |
| 2 | **the ellipticity result** — per-pixel optimal, shape-destructive | §23 you cannot judge a loss with that loss | **wrong ruler** (fork A) |
| 3 | **compression run backwards** — the prior supplies the basin | §14 the ledger; §6 the threshold moved without new photons | — |
| 4 | **one model per task does not scale** | §16 questions keep arriving; §18 recompress forever, or learn first | **inadequate compression** (fork B) |
| 5 | **JAISP** — Rubin + Euclid pixels → one latent → many heads | §18 the foundation bet | — |
| 6 | **astrometry as the first audit** — 50 → 14–17 mas | §10 Fisher; old notes §20 | the test that can say *no* |

Read down the last column: **wrong ruler, then inadequate compression.** Two of
the fork's three branches, in the order the fork lists them, discovered by
doing the work rather than by reasoning about it. The third branch — genuinely
missing information — is what experimental design and the joint Rubin–Euclid
case are about, and it is the one still open.

That is the connective claim, and it is worth stating on stage in one sentence:
*I did not arrive at this structure by thinking about it. I arrived at it by
running out of road twice, in two different ways, and the two ways had names.*

## 20. What each result proves

Each project is doing a specific job in the argument. If a result is on screen
without a job, cut it.

| result | the claim it carries | where in the map | scene |
|---|---|---|---|
| **NISP Y_E ← JWST/NIRCam F115W, 5×** (Everetts, Hemmati, et al.) | a metric sets what counts as resolved; a prior can move that threshold | §6 | 4 (receipt), 5 |
| **— its ellipticity finding** | superb under one ruler, destructive under another, **and no internal metric flagged it** | **§23** | 5 |
| **— neither model meets 10⁻³** | the honest stopping fact; a bar set from outside the optimization | §23, §27 | 5 |
| **WISE W1 ← Spitzer IRAC Ch1, 4.6×** (Rezaee, Hemmati, et al.) | the same claim at a different wavelength and a different sampling — it is not a one-instrument trick | §6 | 4 (receipt) |
| **NIRSpec prism R∼100 → R∼1000** (Haghjoo, Hemmati, et al.) | the resolved/unresolved threshold is **not only spatial** — spectral sampling is a distance too; and the path to Euclid and Roman grism | §6 | 4 (receipt) |
| **enhancement = compression run backwards** | data + prior in, structure out; validation is auditing which is which | §14 | 8, beat 4 |
| **JAISP: 10 bands → one frozen latent → 5 heads** | one compression, less lossy than any single-task one, because every band and both instruments constrain it | §18, §21 | 13, 14 |
| **astrometry: 50 → 14–17 mas** | the shared latent actually transferred the sharper localization — measured, not asserted | §10, §18 | A1 |
| **the concordance field: coherent 9–10 mas** | the landscape moves — a *measured* instance of §15, not a metaphor | §15 | A2 |

Two things this table makes visible.

**The ellipticity result is doing the heaviest lifting in the whole talk**, and
it is currently on screen as a caveat in an aside. It is the only place where
the central philosophical claim — that a loss cannot audit itself — is
demonstrated with a number, in her own data, with a consequence. It should be
promoted accordingly. See §23.

**The concordance field is the only measured instance of the dynamic universe.**
Everything else about the moving landscape is argued (§15) or borrowed from the
human column (§8). The 9–10 mas coherent field is the title, measured. It is
currently in an appendix, out of the spoken route. That may be right for time,
but it should be a deliberate choice rather than an accident of ordering.

## 21. What JAISP is a bet on

The deck has one seam, already named in the README: the opening anchors on the
enhancement family, the program half anchors on JAISP. Scene 13 closes it. In
the map's terms the seam closes like this:

- Every enhancement was **a distortion measure hand-chosen for a known
  question** — one teacher, one student, one loss, one thing worth preserving.
  §7 says that choice determines what survives. §20's ellipticity row says the
  choice can be wrong in a way the optimization cannot see.
- **JAISP is the attempt to choose a distortion measure for questions that do
  not exist yet.** §16 says the questions keep coming. §14 says you cannot keep
  everything. §18 says those two together leave exactly one move.

So, stated as a bet rather than as an architecture:

> **A foundation representation is a wager that information useful for the
> questions you have asked is also useful for the questions you have not.**

That is a real claim, and it can fail. The failure mode is specific and worth
naming out loud: pretraining objectives are themselves losses, so §23 applies
to them too — a latent can be confidently, efficiently wrong about what was
worth keeping, and nothing inside the pretraining will report it.

Which is why the Fisher audit is not a nice-to-have. It is the only part of the
program that can return *no*:

> **How much information about (x,y) survives at each level of the
> representation?** — Rubin alone, VIS alone, the stems, the fused latent, the
> readout.

The expected ordering (old notes §20) is a hypothesis until measured. Say it as
a hypothesis. A talk that presents a foundation model as self-evidently better,
in a room full of people who have watched foundation models be oversold, loses
the room. A talk that presents it as a falsifiable bet with the falsification
test already specified does not.

**The guard, and it matters:** this part must not read as *my work is the answer
to the philosophy.* The honest and more interesting relation is the reverse —
the structure predicted where the program would run aground, and it ran aground
there. The work is evidence that the map is real, not the other way round.

---
---

# PART VII — THE OUTSIDE

*The turn. Everything up to here happens inside the loop.*

## 22. What Part VII is for

Parts I–VI describe a system that works, and a program that ran it. Part VII
asks the question the system cannot ask about itself. The deck's scene 16 is
where this lands.

## 23. You cannot judge a loss with that loss

**New, and load-bearing. The old notes have the branch (§13.2A, "maybe the ruler
is wrong") but never the claim.**

The argument, in three steps:

1. Every quantity the optimizer computes is defined relative to the loss.
   Convergence, residual, "improvement," even the uncertainty — all of them
   presuppose the ruler.
2. Therefore no internal quantity can be evidence that the ruler is wrong. A
   converged optimizer under a wrong loss looks exactly like a converged
   optimizer under a right one. (§3: the optimizer only ever sees the slope.)
3. The only signal not defined relative to the loss is prediction error (§11) —
   and it tells you *that* something is wrong, never *which* thing.

> **Convergence of the optimizer is not convergence of inquiry.** (Old notes §3
> — this section is what earns it.)
>
> **The judgment that a loss was the wrong loss is not available from inside
> the optimization. It is always made from somewhere else — a new question, a
> different observer, a later decade.**

This is the sentence the whole talk has been walking toward, and note what it
is *not*: it is not a claim that objectives are arbitrary, or that science is
subjective. Losses can be better or worse. They just cannot be graded by the
process that uses them. Somebody has to stand outside and say *that is the wrong
thing to be minimizing* — and that person is not doing optimization. They are
doing inference about the loss. Which is Part I's distinction (§3), returning at
one level up.

**The demonstration is hers, and it should be named as such** (§20, row 2): the
NISP diffusion model ties the residual network on per-pixel error while pushing
ellipticity *below even bilinear interpolation*. Superb under one ruler,
destructive under another. **No internal metric flagged it.** It took a second
ruler, brought from outside, chosen by someone who knew what weak lensing needs
— and neither model meets the 10⁻³ bar, which is the honest stopping fact.

That is not an anecdote supporting a philosophical point. It is the point,
measured, with a number, in her own data. There is no better instance available
and the talk should spend its time here rather than arguing the claim in the
abstract.

## 24. The fork, re-read from outside

Old notes §13.2's three branches — wrong ruler / bad compression / missing
information — are correct and stay. What changes is the reading:

The fork is not three diagnoses the system chooses between. It is **three
things surprise cannot distinguish.** Prediction error fires identically in all
three cases. Choosing among them requires exactly the outside judgment of §23.

That reframes scene 10 from a decision tree into the moment the talk admits the
loop is not self-sufficient. Same three branches. Different meaning.

Note also the ordering — wrong ruler, bad compression, missing data — runs from
cheapest to most expensive, and from *least* to *most* likely to be the answer
the field reaches for. The reflex is always "more data." It is the third branch,
listed third for a reason. And per §19, the program hit the first two in that
order.

---
---

# PART VIII — THE ENDING

*Mechanism first. The myth last, and only once it has been earned.*

## 25. What this part must not do

The endings in old notes §22–24 are good and stay. What they lack is a
*mechanism* — a reason the rock returns that does not depend on the myth being
apt. Section 26 supplies it. The myth should arrive after, as a description of
a thing already established, not as the establishing move.

## 26. A system that extracts work from a gradient must maintain a gradient

**New. This is the mechanical ending.**

The pattern, in four systems that have nothing else in common:

| system | extracts work from | goes dead when |
|---|---|---|
| heat engine | a temperature difference | thermal equilibrium |
| any error-driven learner | prediction error (§12) | prediction is perfect |
| gradient descent | the slope | the gradient vanishes |
| science as an activity | an open question | the question is answered |

Every one of them is a device for converting a difference into work. And every
one of them has the same property: **it produces nothing at its own optimum.**

Which gives the deadpan version of the myth:

> **A converged optimizer is an idle one. Any system built to run on gradients
> is a system that must keep finding gradients — not as a pathology, but as a
> condition of operating at all.**

The rock does not come back because Sisyphus is cursed, or because science is
tragic, or because we are restless. It comes back because a flat landscape is a
stopped machine. That is a statement about thermodynamics and control, and it
happens to describe a working life.

**Caution:** state this as structure, not as consolation. It is not "the journey
is the reward" — that is the sentimental reading and it is worse than the plain
one. The plain one is: **error-driven systems are quiet when they are right, so
a system that wants to keep running must keep being wrong about something.**
Deliver it flat and let the room do the rest.

**Also do not overclaim the parallel to funding or incentives.** The four rows
above are structurally analogous; they are not the same mechanism, and the
science row is the loosest of the four. One sentence, no elaboration.

## 27. Die on the hill, die on the slope — re-derived

Unchanged from old notes §22, but now these are not two moods. They are the two
ways a gradient-driven system terminates:

- **Die on the hill** — the gradient vanished. Negative feedback did its job.
  The question is answered *relative to its ruler* (§23's caveat applies: it may
  be the wrong ruler, and you will not find out from here). The 10⁻³ lensing bar
  is the concrete version: a stopping condition set from outside.
- **Die on the slope** — the gradient did not vanish; the observer did. Finite
  observers inside open-ended inquiry (§13's three reasons guarantee the
  inquiry is open-ended).

Weinberg stays exactly where the old notes put him, with the existing honesty
note: *half in longing, half in mourning* is her phrase about reading him, not a
quotation.

## 28. Sisyphus, mechanically

Old notes §23–24 stay. The connective map's contribution is only to fix what
the final image is *doing*:

By this point the audience has been given, in order: a loop (I), a ruler that
was chosen (II), an instrument that can only tell you *that* you are wrong
(III), three independent reasons the loop cannot close (IV), three systems that
all run it (V), a program that ran it and ran aground twice in named ways (VI),
and the fact that no one inside can grade the objective (VII).

The myth then has nothing left to prove. It only has to name the shape.

> Maybe the problem was never that the rock comes back.
> Maybe the rock comes back because we keep finding better questions.

> **One must imagine Sisyphus happy.**

The claim of this document is that if Parts I–VII have done their work, the last
line is a *summary*, not a flourish. If it still feels like a flourish, something
above it is underbuilt.

---
---

# APPENDIX A — Dependency order

Read as: X requires Y. Nothing here should be presented before its dependencies.

```text
  §1 axiom
   └─ §2 loop
       ├─ §3 optimization ⊂ inference ────────────┐
       ├─ §4 feedback regimes ──────────┐         │
       │                                │         │
       ├─ §5 ruler is chosen            │         │
       │   ├─ §6 ruler = sampling rate  │         │
       │   ├─ §7 rate–distortion        │         │
       │   └─ §8 prospect theory ───────┤         │
       │       └─ §9 chosen priors      │         │
       │                                │         │
       ├─ §10 four instruments          │         │
       │   └─ §11 surprise is the exit <┘         │
       │       └─ §12 dopamine = §11 in wetware   │
       │                                          │
       ├─ §13 three reasons                       │
       │   ├─ §14 thermodynamic  (needs §1, old §6.1) │
       │   ├─ §15 dynamic        (needs §8)       │
       │   └─ §16 epistemic                       │
       │                                          │
       ├─ §17 three systems     (needs §8, §12)   │
       │   └─ §18 foundation rep (needs §7,§14,§16)
       │                                          │
       ├─ §19 the arc           (needs §6,§16,§18, and §23 for row 2)
       │   ├─ §20 what each result proves
       │   └─ §21 the JAISP bet (needs §7, §18)
       │                                          │
       ├─ §23 outside the loop  <─────────────────┘  (needs §3, §11)
       │   └─ §24 the fork re-read
       │
       └─ §26 nonzero gradient  (needs §4, §12)
           └─ §27 two endings
               └─ §28 Sisyphus
```

Two nodes carry unusual load. **§11** (surprise is the only exit) is required by
§12, §23 and §24. **§3** (optimization is compressed inference) is required by
§23 and supplies the deck's central image. If either is cut, three later
sections lose their support.

**One forward reference is unavoidable and should be handled deliberately.**
§19's arc needs §23 to explain why the ellipticity result mattered, but §19
comes first in the reading order. Two options: state row 2 of §19 as a puzzle
("the metric said it improved; it had not") and resolve it at §23; or move the
ellipticity demonstration wholly into §23 and leave §19 pointing forward. The
first is better on stage — it plants a question the audience carries.

---

# APPENDIX B — What changes in the existing material

| file / section | change |
|---|---|
| `Detailed_Notes.md` §9 Surprise | promote — it is not one of four instruments, it is the only exit (§11 here) |
| `Detailed_Notes.md` §13.2A | currently a branch; add the claim behind it (§23 here) |
| `Detailed_Notes.md` §28 MaxEnt caution | amend to distinguish MaxEnt-as-prior from EIG-as-design-criterion (§9 here) |
| `Detailed_Notes.md` §25 two-column table | add a third column: institution (§17 here) |
| `Detailed_Notes.md` §6 | add the second, thermodynamic justification (§14 here) |
| `Detailed_Notes.md` §17–20 | JAISP is present but not positioned as a *bet with a falsification test* (§21 here) |
| `Detailed_Notes.md` — the whole enhancement family | **absent entirely.** NISP, WISE, NIRSpec, the ellipticity result, compression-run-backwards: none of it is in the old notes. This is the largest single gap (Part VI here) |
| `Detailed_Notes.md` §27 path | superseded — it predates the spatial deck's 16-scene route entirely |
| `Detailed_Notes.md` overall | it predates the enhancement family, "compression run backwards," the five-losses ruler scene, and the JAISP bridge. It has drifted from the deck and should be reconciled or explicitly demoted to archive |
| `spatial/js/scenes.js` scene 5 | candidate: distance-as-sampling-rate, science-carried (§6 here); **promote the ellipticity result from aside to claim** (§20, §23 here) |
| `spatial/js/scenes.js` scene 9 | candidate: one line that surprise is different in kind (§11 here) |
| `spatial/js/scenes.js` scene 13 | state the JAISP bet as falsifiable, with the Fisher test named (§21 here) |
| `spatial/js/scenes.js` scene 16 | candidate: the outside-the-loop claim (§23 here) and the gradient claim (§26 here) |
| `spatial/js/scenes.js` appendix A2 | the concordance field is the only *measured* instance of the moving landscape — decide deliberately whether it stays out of the spoken route (§20 here) |

---

# APPENDIX C — Open questions

Things this map does not settle, listed so they are not mistaken for settled.

1. **Does Part VII fit in the time?** The outside-the-loop claim needs about
   ninety seconds to land and the current route is already 14–16 minutes. It may
   have to displace something in Part V.
2. **Is prospect theory stage-worthy or notes-only?** It is the human column's
   only piece of *measured* content, which argues for stage. It is also the
   furthest from her own work, which argues against. Unresolved.
3. **How much of §14 survives contact with a physicist?** The identity is real;
   the temptation to overclaim is large. Current recommendation: notes only,
   with a prepared one-sentence answer.
4. **Does the three-systems table (§17) replace the two-column table (old notes
   §25), or sit beside it?** Replacing is cleaner. Beside is safer.
5. **Where does the enhancement family enter?** §19 says the arc is the spine of
   Part VI, but the deck currently introduces the papers at scene 4 — before §6
   (sampling rate) or §23 (the loss problem) exist. Either the receipts move
   later, or scene 4 plants them explicitly as a promise to be cashed.
6. **Does the ellipticity result carry the weight §23 puts on it?** It is the
   best available demonstration, but it is one result, in one paper, on one
   instrument pair. If someone asks whether the general claim rests on a single
   ellipticity number, the answer should be prepared: the claim is structural,
   the result is an instance, and the WISE and prism pairs are where a second
   instance would come from if anyone has looked.
7. **Is the concordance field in or out of the spoken route?** It is the title,
   measured. It is currently in an appendix.
