# The science spine — two acts on your own papers (v5 candidate) — **absorbed into v6**

> ⚠️ The two-act science content below survives, but re-founded on a new thesis: the proxy–target gap ("the loss you can write is never the thing you want"). See [gap_thesis.md](gap_thesis.md). The v5 framing kept the circular "never converge → more gradient" core, which is what was making the talk feel empty.

Companion to [talk_flow.md](talk_flow.md), [papers.md](papers.md), [distance_resolution_sampling.md](distance_resolution_sampling.md).

**The diagnosis:** in the current deck the papers are decoration on a philosophical armature — two science touchpoints in 16 slides, the SR trilogy demoted to one montage, JAISP to one stat slide. Every *twist* in the talk is philosophical (Tantalus, the turn, the ghazal); the science only ever *illustrates*. That's the flatness you're feeling.

**The fix:** rebuild the middle so the papers *carry* the twists. Two acts:

- **Act 1 — Distance & resolution**, anchored on the SR trilogy (stages ①/②).
- **Act 2 — Representation, modeling & compression**, anchored on JAISP (stage ④).

The **hinge between the acts is the talk's new scientific twist** (see below). The loop spine, the Sisyphus engine, the turn, Tantalus, and the close are all conserved — philosophy stays at the bookends where it's earned; the middle becomes science.

---

## Act 1 — Rungs for free (the SR trilogy) · ~3 min

**Setup (inherited, tightened):** distance ladder → resolution ladder; redshift picks your rung; pc vs kpc is different physics. You don't get to choose your rung.

**The escape attempt:** *unless you climb with a model instead of a mirror.* Two ways to get closer to anything: gather more photons, or fill the gaps from priors. Super-resolution is the second, industrialized — the promise of **rungs for free**. Show the seduction first: one gorgeous super-resolved galaxy, full screen. Let the room want it.

**[PAPER — the triptych]** Then the betrayal, with receipts. Three papers, one controlled experiment across three modalities:

| modality | paper | the seduction | the measured lie |
|---|---|---|---|
| **shape** | Everetts+ (NISP→JWST) | 3× finer, looks like JWST | diffusion model **suppresses shape info below bilinear interpolation**; best (residual) net still shrinks ellipticity 25–35% — lensing needs 10⁻³ |
| **spectra** | Haghjoo+ (*"Sharper at What Cost?"*) | 30% lower MAE, best FWHM, beautiful Hα | recovered Hα is **26% of true**; inter-line ratios — the actual physics — *corrupted* |
| **photometry** | Rezaee+ (WISE→Spitzer) | deblends 3–5″ pairs: **35% vs 9%** peak recovery | oversmoothing biases flux **up** — a named, directional bias |

Levity survives intact: *"We built a generative AI to sharpen galaxies — it did worse than blurring them."* And: *"It recovered 26% of the signal and looked great doing it."*

**The law (Act 1 lands here — this is a scientific claim, not a moral):**

1. **Sharpness is cheap; information is not.** The missing high-frequency modes were never measured — the model fills them from *other galaxies* (the training ensemble). The output is a population-average detail pasted onto your object.
2. **The danger is the costume.** Every model makes things up — that's what modeling *is*. The sin is making things up **in the data's costume**: SR ships pixels, and pixels get treated as measurements by everything downstream.
3. **The pattern in where it works:** the one clean win is *deblending/detection* — a **decision** you can audit (completeness and purity are measurable against truth). The failures are *silent measurements* (a shape entering cosmology at 10⁻³, a line ratio entering chemistry) where no per-object truth exists to catch the lie. → **Learned models are safest where their claims are checkable.** That's the methodological identity of all three papers, stated as a law instead of a disclaimer.

D1's hanging question now has a quantitative answer: does resolution define your physics? *Yes — unless you can prove what you added. Three papers tried to prove it. Here's the bill.*

---

## The hinge — where does the missing information come from?

The mid-talk twist, one slide or even one spoken beat:

> Super-resolution fills the gaps from **other galaxies**.
> There is a second place to fill them from: **other measurements of the same sky.**

Same fill-in-the-blank objective, opposite epistemic status. One imports the population's prejudices; the other transports *real photons* the source itself emitted into a different camera. Act 1 → Act 2 in one move, and the "photons vs priors" dichotomy from the old outline gets its missing third option: **more telescopes, jointly.** (This is literally the IPAC joint-survey-processing thesis — the talk finally says out loud what your day job is.)

---

## Act 2 — The representation (JAISP) · ~3 min

**Setup:** ten bands, two observatories, one sky. Rubin sees *ugrizy* deep and often; Euclid sees *VIS, Y, J, H* sharp. Nobody sees everything. JAISP's pretext task: mask one band, predict it from the other nine — **at each band's own delivered sampling** (no fake common grid; the mismatch is the point).

**Beat 1 — the ML twist: reconstruction that is secretly alignment.**
The field is having a genuine fight about this. Reconstruction objectives (masked autoencoders) say: predict the pixels. Alignment objectives (CLIP, JEPA — LeCun's whole crusade) say: pixel reconstruction wastes capacity on unpredictable detail; predict in *representation* space. JAISP dissolves the dichotomy: when the thing you reconstruct is **another instrument's view of the same sky**, reconstruction *is* alignment. You cannot predict VIS from *ugrizy*+YJH without factoring the latent variable they share — the sky — away from what each instrument does to it (PSF, sampling, passband, noise). The reconstruction is the scaffold; the factorization is the product.

Evidence the factorization actually happened (the numbers *are* the argument):
- encoder **frozen**, transferred to a new field, **zero retraining**;
- detection 93% complete / 94% pure **0.45 mag past** the VIS catalog — nine bands of real photons, pooled;
- astrometric scatter **50 → 14–17 mas**.

*Optional garnish (decide):* the Platonic Representation Hypothesis (Huh et al. 2024) — models trained on different data converge toward aligned representations *because reality is the common cause*. JAISP is the astronomical instance, and the line writes itself: **the sky is the only thing all ten bands agree on.**

**Beat 2 — the honest-band payoff (pays Act 1's costume line):**
SR ships pixels that pose as data. JAISP ships a representation that *admits it's a model* — nobody mistakes an embedding for photons — and every head built on it is validated per task against truth (completeness, purity, astrometric scatter). Same "make things up" machinery; opposite costume; that's the whole honest band, now with two of your own papers as the two poles.

**Beat 3 — the compression confession (your own doubt becomes the beat):**
Say it from the stage: *"I've been calling this lossy compression. Then I checked whether it compresses anything."* Three answers, in order of increasing honesty:

1. **Bytes: maybe not.** The classical pipeline is the real compressor — petabytes of pixels → kilobytes of catalog per source. It achieves that ratio by *committing*: it decides today which questions will ever be asked. The foundation-model embedding may be no smaller than the cutouts it came from *(fact-check: pull embedding dim vs cutout size from the draft before putting on a slide)*.
2. **Rate–distortion: the question is ill-posed.** "Lossy compression" is undefined until you name the distortion metric — i.e., *which future questions you're willing to lose*. The catalog named them; that's why it's small and why it can't answer new ones. JAISP refuses to name them. **Hedging costs bits.** ("Forgetting with a hedge" — the old line, now with an information-theory floor under it.)
3. **Shannon's consolation: prediction *is* compression.** A model that predicts any band from the other nine is, literally, a codec (send residuals; the better the prediction, the fewer the bits). The 9M parameters are the compressed statistics of the sky-through-ten-instruments. **JAISP doesn't compress the source — it compresses the survey.**

One spoken person-line to keep the weave alive (no slide): *your memory doesn't store pixels either — it stores a model and re-renders on demand. That's why the brain question later isn't "memory or recording" but "memory or reconstruction."*

Then the existing flow resumes and everything already built slots in: **the turn** (freeze the encoder = go to lunch — now motivated by Act 2 instead of asserted), Tantalus/Goodhart at ⑤, valley-splits, thesis band, close.

---

## What's conserved, absorbed, cut

| | fate |
|---|---|
| Camus open, "oldest idea in your skull," loop slide | **conserved** |
| Heavy ball / mass is memory / gravity switches sides | **conserved, one slide, fast** (③ is a transition now, not an act) |
| The turn (coast; triggers; exploding↔anxiety) | **conserved** — and now *earned* by JAISP's frozen encoder |
| Tantalus/Goodhart, valley splits, podium resolution, thesis band, close/ghazal | **conserved** |
| Abstract rigor slide (sampling→resolution→distance, Nyquist) | **absorbed** — one spoken line over the triptych; Nyquist survives where it pays (intimacy limit) |
| Loss/recursion slide ("choosing the distance was itself an optimization") | **absorbed into the opening** (already in the spoken draft: "loops inside loops") |
| "1 pillar + 1 montage" decision in papers.md | **superseded** — trilogy and JAISP each get a full act |
| Person weave in the middle stages | **slimmed to spoken one-liners**; person still owns the close |

## Slide map (v5, 16 slides)

1. Title
2. Camus hook (direction · oldest idea in your skull)
3. The loop (unchanged)
4. ① Ladder: distance → resolution; redshift picks your rung *(painting one-liner spoken)*
5. The escape attempt: rungs for free — one gorgeous SR galaxy (the seduction)
6. **[PAPER]** the triptych: shape / spectra / photometry, three measured lies (*"Sharper at What Cost?"* as the header — your student handed you the thesis)
7. The law: filled from other galaxies · the data's costume · safe only where auditable
8. ③ Heavy ball (kept, brisk)
9. ④ The hinge → JAISP setup: ten bands, one sky, mask one, predict it at delivered sampling
10. **[PAPER]** the twist: reconstruction is secretly alignment · frozen/zero-retrain/0.45 mag/50→14 mas *(optional PRH garnish)*
11. The compression confession: catalog commits, the hedge costs bits, prediction = compression → *compresses the survey, not the source*
12. The turn: coasting, triggers, freeze = go to lunch · paper = photograph mid-slope (merge of old 11+12)
13. ⑤ Tantalus · Goodhart · alignment problem
14. Valley splits (H₀) · podium resolution
15. Thesis band — unchanged text, but now *every line has a paper behind it*: PSF? (clumps) · prior? (triptych) · reconstruction? (JAISP/brain) · projection? (person)
16. Close: coming home · فراق · **The Glorious Gradient**

**Timing:** open 1.5 · loop 0.75 · Act 1 ≈ 3 · ③ 0.5 · Act 2 ≈ 3 · turn 0.75 · ⑤ 1.25 · close 1.75 ≈ **12.5 min** — tight against 12; the buffer lives in slides 13–14 (Tantalus and valley-splits can each shed 20s without structural damage).

## Q&A landmines (armed in advance)

- *"Doesn't JAISP also lean on population priors?"* — Yes; anything trained on a survey does. The defensible distinction is **(a)** where the bulk of the constraint comes from (nine bands of the same object vs an ensemble of other objects) and **(b)** what you ship and how it's validated (task-validated representation vs pixels in data's costume). Don't claim purity; claim auditability.
- *"Is diffusion-worse-than-bilinear fair?"* — Scope it: on *structural/shape-fidelity metrics*, for this task. It wins beauty contests; that's the point.
- *"So it's not compression at all?"* — The rate–distortion answer (2) is the serious one; Shannon (3) is the elegant one. Lead with 2 if the asker is an information theorist.
- *"Why not just wait for better telescopes?"* — The ladder answers: some rungs the universe removes (redshift, expansion); joint analysis is the only new-physics-free way up.

## Fact checks before slide-making

- [ ] JAISP: per-source embedding size vs input cutout size (the byte answer in beat 3 — get the real numbers from the draft)
- [ ] JAISP: astrometry baseline for 50 mas (what exactly is the "before"?)
- [ ] Everetts: confirm "diffusion < bilinear" is on structural similarity/shape metrics, and the 25–35% ellipticity shrinkage scope
- [ ] Haghjoo: 26% = *median recovered Hα amplitude*; confirm phrasing "denoising, not amplitude"
- [ ] Rezaee: 35% vs 9% at 3–5″ separations; flux to 11% (2× better than interpolation)
- [ ] Refs if named on-slide: MAE (He+ 2022) · I-JEPA (LeCun/Assran+ 2023) · Platonic Representation Hypothesis (Huh+ 2024) · "Language Modeling Is Compression" (Delétang+ 2023) · rate–distortion (Shannon 1959) · information bottleneck (Tishby+ 1999)

## Open questions

- [ ] PRH: named on-slide, spoken garnish, or cut? (It's fashionable — which cuts both ways.)
- [ ] Slide 5+6: keep the seduction/betrayal as two slides (recommended — the reveal needs a beat of belief first) or compress to one?
- [ ] Does the hinge get its own slide or live as the spoken bridge over slide 9's opening?
- [ ] "Compresses the survey, not the source" vs "compresses future work, not present bytes" (frozen encoder + small heads = each new question costs a head, not a pipeline) — both true; which lands better spoken?
- [ ] How much brain/person survives in the middle: current proposal is *zero slides, two spoken lines* (painting at ①, memory-renders at Act 2). Enough to keep the close from arriving cold?
