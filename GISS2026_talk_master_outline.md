# GISS 2026 — Master Talk Outline (v4: Three Descents, with the Boulder)

*Venue: GISS, August 2026. ~15 min. Follows "The Black Boxes" (GRITS 2024) and "Love the Embedding" (GISS 2025).*
*Status: structure locked, ~1 month out. Supersedes v3.*

---

## Title

**"Sisyphus Optimizing in a Dynamic Universe"**

Now earned three ways — "dynamic universe" has three registers:
1. Cosmologists hear: expanding, evolving universe
2. ML people hear: non-stationary loss landscape
3. Everyone hears: *the questions themselves keep moving*

Possible early dry line: *"Camus got one thing wrong about Sisyphus — the direction."*

## The twist on the myth (the talk's engine)

Sisyphus pushes **up**; the optimizer goes **down** — and goes down **with the boulder**.

- Camus's happy descent was empty-handed: the boulder rolled ahead, the walk down was rest. Our descent carries the load, so there is no rest interval built into the loop.
- Downhill, gravity switches sides: it becomes the boulder's ally against you. The labor inverts from *pushing* to *restraining*. You cannot let go — released downhill, the boulder doesn't rest, it accelerates (divergence, exploding gradients). The curse restated: not endless effort, but **never being allowed to be careless** — even, especially, when the direction looks easy.
- The steepest slope is where you must move slowest (learning rate vs. overshoot). The easy-looking downhill stretches are where you lose control.
- And the boulder must go *somewhere* — but that somewhere is the dynamic universe: a destination that migrates as you descend.

## One-line thesis

You never converge — the landscape moves — so the skill is not descending forever; it's **steering the boulder: knowing what to add, what to forget, when to declare a checkpoint, and when your sampling is enough.**

---

## Design rule (applies to every descent)

**The arc is philosophical, but each descent touches ground twice: once on a paper, once on a person.**

- *Paper slide:* a real result with a real figure — proof the philosophy is earned.
- *Human beat:* one line/image connecting the descent to lived experience.
- Philosophy: max 1–2 spoken lines per descent; it lives in the structure, not the sentences.

(~80% science / 20% philosophy — the "Love the Embedding" recipe, made explicit.)

## The refrain (structural spine)

**Define a loss → steer the boulder down → approach the valley → *the landscape shifts* → descend again.**

Runs three times; **breaks in descent 3** (Nyquist). Anticipate-then-subvert.

Open design question: refrain implicit + one wink ("you may have noticed we've descended this before") vs explicit visual motif. Instinct: implicit + wink. Decide at slide design.

---

## Arc at a glance

| | Descent | Loss minimized | Landscape shift | Paper slide | Human beat |
|---|---|---|---|---|---|
| 1 | The sky | distance uncertainty → resolution | H0 valley splits; redshift assigns your rung | clumps kpc vs pc | the painting (too close/too far) |
| 2 | The model | reconstruction error / what to keep | non-stationary target; questions outgrow models | super-res hero figure + JAISP v1–v10 | "model-enhance and call it showing up" (seed) |
| 3 | The person | distance to another person | — **loop breaks (Nyquist)** | callback only, no new science | the full ending |
| — | Close | — | the universe raises the landscape | horizon | checkpoint authority + paid by the slope |

Budget: D1 ≈ 3 min, D2 ≈ 5 min, D3 ≈ 3 min, close ≈ 2 min, buffer ≈ 2 min.

---

## Descent 1 — The Sky (~3 min)

- Open with the canon: the **distance ladder** — parallax → Cepheids → SNe Ia. Every astronomer's first religion. Framed as astronomy's loss function: minimize distance uncertainty, rung by rung. A century of descent.
- We reached the bottom — H0 — **and the valley split in two.** The Hubble tension as the landscape shifting under a century of work. (Refrain, first occurrence. Also seeds "every one of those papers was a checkpoint" for the close.)
- The new loss: not *how far is it* but *how far should it be* — the **resolution ladder**: pc → tens of pc → kpc → point source. Each rung a different physics regime.
- **[PAPER]** Star-forming clumps at kpc vs pc: giant clumps fragment; different mass functions, different inferred efficiencies. Same galaxy, different rung, different physics.
- The uncomfortable question, stated plainly: **should your resolution define your physics?** Observationally it does — redshift assigns your rung whether you like it or not.
- **[HUMAN, one line]** Too close to a painting → brushstrokes; too far → smudge. There's a distance at which it *becomes* the painting. Beauty has a preferred scale. (Plant only — pays off in D3.)
- Optional inversion (test aloud, cut if too cute): distance ladder — distance is what you measure; resolution ladder — distance is what measures *you*.

## Descent 2 — The Model (~5 min)

**2a. The heavy-ball reveal.**
- Momentum methods in gradient descent are *literally named the "heavy ball method"* (Polyak 1964): the formal model is a massive ball rolling down the loss landscape. The field reinvented Sisyphus's boulder and gave it an equation. (One slide; the moment myth and math visibly fuse.)
- What mass does: smooths over potholes (good — doesn't trap in every local dip) but can't turn when the valley curves (bad — plows past the minimum). **Mass is memory.**

**2b. The boulder is everything you've refused to forget.**
- Trained weights, priors, history — the heavier the boulder, the more it carries you through noise, and the less you can steer when the landscape shifts. **Forgetting isn't dropping the boulder; it's chipping it lighter so you can still find direction.** (Regularization as deliberate lightening; friction as the only reason anything is controllable.)
- The survey enterprise as a forgetting machine by design: petabytes of pixels → kilobytes per source. The pipeline IS the decision about what to forget, made in advance, for every galaxy, forever (OU-NIR/OU-SIR — one line, my actual job).
- Symmetric dangers: hallucination (keeping features never in the data — super-res adding from priors) vs amnesia (the catastrophic outlier — throwing away the wrong thing). Same audit both directions: *which pixels are physics, which are the model's decision?*
- **[PAPER]** Super-res hero figure: NISP→JWST shape fidelity for weak lensing (Ramey), with WISE→Spitzer (Saeed) and spectral SR vs classical deconvolution (Aryana) as one-line mentions. Methodological identity in one sentence: benchmark against classical baselines, quantify biases, *before science use*.
- Two ways to climb a rung: better telescope (slow, expensive, real photons) or learned priors (fast, hallucinates). This answers D1's hanging question honestly: resolution does define your physics — unless you can prove what you added.

**2c. Checkpoints — JAISP and publishing midway.**
- Foundation models renegotiate the forgetting decision: learn a representation that compresses while keeping what *future* questions might need — forgetting with a hedge. But you can't know today what tomorrow's loss penalizes: what you dare to forget is a bet on which way the landscape shifts.
- **[PAPER]** JAISP v1–v10 failure-history slide (reuse; it landed at the conference). Final recast: **ten checkpoints of one continuous descent** — the numbering itself admits it; nobody names something v10 believing there's no v11.
- **A paper is a photograph of the boulder mid-slope.** Position, velocity, the line chosen through the last curve — timestamped, then the descent resumes. "Really done" is not a state that exists on a moving landscape; **midway is the only place a paper can ever be written.** (Kind to the room: the guilt of publishing "before it's done" evaporates. Callback: a century of distance-ladder papers, every one a checkpoint, and the answer split into two valleys anyway — nobody was wrong to publish midway; midway was all there ever was.)
- One philosophical line (refrain, second occurrence): *the reward lives in the gradient — the only thing that persists across landscape shifts.* (Quietly literal; detonates in the close.)

**2d. The permission slip — Nyquist (bridge to D3).**
- If the features are **sparse**, forgetting is lossless: you don't need all the data, you need sufficient sampling. Total retention was never the goal.
- **[HUMAN, one line — seeds the ending]** Two ways to get closer to anything: gather more photons, or fill the gaps from your priors. *Most of us do the second and call it the first.*

## Descent 3 — The Person (~3 min)

The inward turn. No new machinery — everything was built with science and is now handed over. **The refrain breaks here.**

1. **People live on the resolution ladder too.** Too far — a smudge, a name on a paper, an unresolved point source. Too close — brushstrokes, noise, failure modes. *You might not like me if you're too far; you might not like me if you're too close.* (Laugh line — deliver dry. Painting callback lands.)
2. **Two ways to descend toward a person:** model-enhance (complete them from your priors — everyone who ever resembled them; fast; hallucinates; audit 2b: what did I project? — hallucination as being *dragged by your own boulder*, the momentum that makes you see the new person as the old one) vs better telescope (show up, spend time, gather photons; slow; real).
3. **The loop breaks — Nyquist.** Everyone's features are sparse at some scale. Past sufficient sampling, more pixels buy nothing — you're not learning them, you're staring. **Intimacy has a Nyquist limit:** knowing a person isn't infinite resolution; it's sufficient sampling plus the honesty about which pixels are data and which are your model.
4. **The only descent in the talk that terminates — and it terminates by choice**, not by the landscape's permission.
5. Optional twist: *I don't get to pick the rung* — you choose the distance you see me from, the way redshift chooses for the galaxy. / Mischievous variant: everyone here sees me at podium resolution, which I've selected carefully.

## Close (~2 min) — two landing beats, order/weight is a rehearsal decision

**Beat A — the authority to declare a checkpoint (resolves D3; release ending).**
- Everything "finished" on a moving landscape is finished *by declaration*, not by convergence. Submitting the paper, ending the project, deciding you know someone well enough — the same act: **drawing a line on a moving landscape and saying: here, enough, for now.**
- Sisyphus's tragedy, final restatement: the gods withheld not rest, but **the authority to say "done for now."** We have that authority. Most of us forget to use it.

**Beat B — paid by the slope (resolves the universe; thermodynamic ending).**
- The setup joke (dry): if everything converged — no slope anywhere — Sisyphus isn't liberated, he's **laid off**. Every grant proposal is a formal declaration that the slope still exists; "future work" sections are gradient certifications; nobody funds a solved field. The Hubble tension is also a jobs program. (This room is funded by exactly this — biggest laugh of the talk if delivered flat.)
- Then the real floor under the joke: **zero gradient means zero work is *possible*** — not "no work required." The flat plateau is where learning dies; heat death is where everything does. Life runs on the gradient between a 6000 K sun and 3 K space. *We are all, in the strictest thermodynamic sense, paid by the slope.*
- The fear ordering flips: the naive horror is that the task never ends; the thermodynamic horror is that it would. **The moving landscape isn't the punishment — it's the payroll.** The universe raising the landscape (expansion, receding rungs, questions outrunning answers) isn't cruelty; it's the slope being continuously renewed so there is a gradient to live on. (The receding frontier as structural engine — now with a thermodynamic floor.)
- Horizon beat folds in here: the universe removing rungs — sliding objects to distances where no question can be asked of them — while simultaneously being the reason there are questions at all.

**Beat B enrichment — we don't just run on gradients, we *feel* in gradients** (the emotional proof of the thermodynamic claim; pick 1–2 of these, not all):
- *The silver medalist:* Olympic study (Medvec, Madey & Gilovich 1995) — bronze medalists are visibly happier than silver on the podium. Silver runs the counterfactual upward (almost gold); bronze runs it downward (almost nothing). The pain isn't position on the landscape — it's **the gradient you can still feel.** Silver is the steepest point: maximum pull of the minimum, without landing in it. Winning flattens the gradient; the final whistle of a won final is a tiny local heat death.
- *Tantalus parenthetical (one wink):* Sisyphus's neighbor in Tartarus — water receding from his lips, fruit lifting from his hand. The two flavors of non-convergence: effort that never completes, proximity that never closes. "Tantalizing" is literally this. The dynamic universe runs both punishments.
- *Glorious failure canon:* Netherlands '74, Hungary '54, Brazil '82 — beautiful losers remembered beyond the winners. The near-miss preserves the story mid-gradient, forever almost; winning resolves the narrative and thereby ends it.
- *"It's coming home":* Three Lions is not a victory chant — the verses are a catalog of losses ("thirty years of hurt," now sixty) with the turn anyway: *never stopped me dreaming*. An anthem about the gradient, sung by forty thousand people in full knowledge of the counterfactual. The trophy would end the song; sixty years of not-coming-home is what makes it singable. The unclosed distance as communal ritual.
- *The Farsi beat (strongest candidate — my voice, my language):* Persian poetry has known this for seven hundred years. The ghazal is **structurally built on the unclosed distance**: the beloved never attained, فراق (separation) as the engine, union as the thing that would end the poem. Hafez doesn't want the distance closed; the ghazal runs on it. **The bite is the genre.** — This is the stadium chant and the silver medal and the receding horizon, formalized into a literary architecture centuries ago. If only one enrichment survives, it's this one; it's also the natural home for the talk's Farsi moment.
- One-sentence version if time is brutal: *the sweetest and sharpest experiences of a life are all located mid-slope — never at the minimum.*

**Candidate final lines (pick one in rehearsal):**
- **"Glorious gradient."** — two words, coined at the end of the brainstorm. Relocates the glory from the failure to the gradient itself: the near-miss, the payroll, the ghazal, the slope life runs on — compressed to minimum. Candidate for: final spoken words, final slide title, or close section header. Pairs with the Sisyphus title (title sets up, this pays off).
  - Companion phrase: **"No gradient, no glory."** Same thesis as warning instead of benediction — what the flat place costs (no gradient → no work → no glory → no anybody). Option: deliver early as a dry gym-poster joke near the heavy-ball slide, then "glorious gradient" as the final words — the joke returning transfigured. Anticipate-then-payoff in miniature.
- *Camus said we must imagine Sisyphus happy. We can do better than imagine — nothing about him runs without the hill. One must imagine Sisyphus **paid**.*
- Gentler: *Happiness was never waiting at the bottom of the valley — the bottom is the one place nothing can move. Whatever we get, we get on the slope.*
- Warmest (ends on Beat A instead): *...the authority to say "done for now." We have it. Use it.*

**Compression warning:** two endings in ~2 min is tight. Likely resolution: one beat becomes the ending, the other becomes a single line inside it. Natural order if both survive: A then B (person → cosmos). Rehearsal decides.

---

## Slide-rhythm map (~15–16 slides)

1. Title
2. Distance ladder (canon, hijacked)
3. Refrain: H0 / the valley splits
4. Resolution ladder
5. **[PAPER]** clumps kpc vs pc + "should resolution define physics?"
6. *(human line: the painting — spoken over 5 or minimal own slide)*
7. Heavy ball reveal (Polyak) — myth meets math
8. Mass is memory / forgetting lightens the boulder (petabytes→kilobytes folded in)
9. **[PAPER]** super-res hero figure (shape fidelity)
10. **[PAPER]** JAISP v1–v10 as ten checkpoints / paper = photograph mid-slope
11. Nyquist / sparse features — permission slip *(human seed line)*
12. **[HUMAN]** people on the ladder (laugh line)
13. **[HUMAN]** two ways to descend toward a person / intimacy's Nyquist limit
14. Close A: checkpoint authority
15. Close B: paid by the slope (horizon folded in)

Rhythm check: papers at 5, 9, 10; human beats at 6, 11, 12–13, accelerating toward the end; philosophy never gets its own slide until 14–15.

## Open questions

- [ ] Beat B enrichment: which 1–2 survive? (Farsi/ghazal beat is the strongest and most *mine*; silver medalist is the most universal; "coming home" is the most fun — but timing may allow only one)
- [ ] Endings: A then B, B then A, or one demoted to a single line — rehearsal
- [ ] Final line: "imagine Sisyphus paid" vs gentler vs warmest
- [ ] Refrain: implicit + wink vs explicit motif
- [ ] "Distance is what measures you" — test aloud
- [ ] "Camus got the direction wrong" early line — in/out
- [ ] Slide 12/13: one slide or two
- [ ] Does the heavy-ball slide show the actual Polyak update equation? (One equation max in the whole talk; this is the candidate.)

## Figure shopping list

- Distance ladder schematic (textbook — hijack, then redraw as resolution ladder)
- Clumpy galaxy kpc vs pc (lensed system or sim comparison)
- Heavy-ball / momentum illustration (ball on loss landscape — simple new graphic or classic figure)
- Super-res shape-fidelity figure (Ramey; Saeed/Aryana as alternates)
- JAISP v1–v10 failure-history slide (reuse from conference deck)
- Petabytes→kilobytes compression graphic (simple new one)
- Horizon / comoving volume illustration (close)

New assets needed: heavy-ball graphic + compression graphic. Everything else reuse.

## Provenance

- Sisyphus + dynamic universe → engine; up/down inversion + boulder-on-descent as the new twist; "dynamic" now triple-register
- "Reward lives in the gradient" → refrain line, now literally true (payroll) — detonates in Close B
- Regularization as discipline of forgetting → mass-is-memory, D2b
- Memory as lossy codec → absorbed into D3 (projection/hallucination)
- Strange loop → the three-descent structure performs it
- Release ending → Close A: checkpoint authority ("done for now")
- Receding frontier as structural engine → Close B, with thermodynamic floor
