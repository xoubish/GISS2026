# v7 — Photons or Priors: the information-theory spine

**Supersedes the metaphor layer of v6.** Her call (Aug 2026): *remove all philosophy; make it an interesting information-theory / AI science talk.*

Conserved from v6: every paper, every number, the second-instrument law, the decisions-vs-measurements rule, the compression confession, the H₀ beat, the dry voice.
Cut: Tantalus, the person slide, فراق / Hafez, the projection line, "loss = grief," the Sisyphus residue (already dead — see the direction ruling).

## Why the talk still has an engine after the myth is gone

v6's engine was a *stance* (the loss you can write is never the thing you want). v7's engine is a **theorem with receipts**, which is strictly better for this room: it makes her results **predictable in advance** instead of anecdotal in retrospect.

**Thesis:** *An enhanced image contains no more information about the sky than the raw one. Every pixel that looks new came from a photon or from a prior — and the two behave differently, measurably, in a direction you can predict before you run anything.*

Three results carry it, in order:

1. **Data processing inequality.** For Sky → Data → f(Data): `I(Sky ; f(Data)) ≤ I(Sky ; Data)`. No architecture, no amount of compute, adds information about the sky. Sharpening is redistribution, not acquisition.
   - *The honest refinement (say it before someone else does):* a learned prior does carry real sky information — but **population** information, not **this-source** information. It is a statement about galaxies in general, applied to your galaxy. That's exactly why it helps where you're asking a population-level question and hurts where you're asking a per-source one.
2. **MMSE ⇒ shrinkage.** A network trained on pixel-wise error returns (an approximation of) the posterior mean. Posterior means are **under-dispersed**: they shrink toward the prior. So the *prediction*, made before opening any of the three papers: **any per-source amplitude that goes through an MSE-trained network comes back too small, in a direction set by the training distribution.**
3. **Perception–distortion tradeoff** (Blau & Michaeli, CVPR 2018). Realism and accuracy are provably in tension: past a bound you buy perceptual quality only by paying distortion. So the prettiest reconstruction is the *least* faithful one — not sometimes, structurally.

Then the trilogy pays all three, in her own numbers. This is the reframe's whole value: *"we built a generative AI to sharpen galaxies and it did worse than blurring them"* stops being a funny anecdote and becomes **a theorem with a receipt**.

## The predictions, and the receipts

| predicted, from theory | measured, in our papers |
|---|---|
| MSE nets shrink per-source amplitudes | ellipticity shrunk **25–35%** (Everetts); median Hα recovered **26% of true** (Haghjoo); flux biased **up** by oversmoothing — shrinkage toward a smoother prior mean (Rezaee) |
| generative priors trade accuracy for realism | the diffusion model suppresses shape information **below bilinear interpolation** (Everetts) |
| priors help decisions, hurt measurements | the one clean win is **deblending: 35% vs 9%** peak recovery at 3–5″ (Rezaee) — a decision, auditable against truth |
| the gap is not visible in-house | every gap above was measured against a **second instrument**: JWST, Spitzer, the grating, truth catalogs |

**The rule that falls out (the Monday-morning tool):** a learned prior is safe where its claim is a **decision** — few bits, checkable against truth (completeness, purity). It is unsafe where its claim is a **measurement** — a continuous number that propagates silently into cosmology or chemistry with no per-object truth to catch it. *Never measure on enhanced pixels; detect on them if you like.*

## Act II, re-founded — the survey as a codec

Unchanged in content, sharpened in vocabulary (this act was already information-theoretic in v6; it just wasn't allowed to say so):

- **A catalog is a lossy codec with the distortion measure chosen in advance.** Petabytes → kilobytes. The columns *are* the distortion measure: you decide which questions stay answerable before you know what will be asked.
- **JAISP hedges.** Masked-band prediction across ten bands at delivered sampling is, in information terms, an estimate of what the instruments **share** — and the only thing ten instruments share is the sky. So the factorization sky × instrument isn't a bonus; it's forced. That's the "reconstruction is secretly alignment" twist, stated as a mechanism rather than a slogan.
- **Prediction is compression** (Shannon). A model that predicts any band from the other nine is a codec. But **hedging costs bits**: refusing to name the distortion measure means you can't claim the catalog's ratio. *It compresses the survey, not the source.*
- Three kinds of missing information: **never observed · observed and discarded · retained but inaccessible to the model you chose.**

## Slide map (15) — built

1. Title — *Photons or Priors*
2. Cold open: the super-resolved galaxy, full bleed *(placeholder — real figure needed)*
3. The question: same photons, more detail. Where did the information come from?
4. **The theorem + the band limit** (MTF figure): past the cutoff the data carry nothing; whatever the output shows there, the network wrote
5. **What a prior does to a number** (shrinkage schematic): MMSE = posterior mean = under-dispersed → the falsifiable prediction
6. **[PAPER]** the trilogy — three tests, three confirmations
7. **The perception–distortion tradeoff** (figure): why the prettiest one scored below blurring
8. **The rule**: decisions vs measurements — bits and auditability
9. **The audit needs a second channel**: you cannot estimate the gap from inside; currency question
10. **H₀**: two converged losses, one universe — the field's answer is more independent channels
11. Act II: the survey as a lossy codec — the columns are the distortion measure
12. Masked-band prediction = what ten instruments share = the sky
13. **[PAPER]** JAISP: 0.45 mag · 93/94 · 50→14–17 mas · zero retraining · three-layer audit
14. Hedging costs bits (rate ladder figure) + the three kinds of missing information
15. Close: the four audit rules — *photon or prior; say which*

Cut to make room, in priority order for restoring: **the quiet-gradient diagnostic table** (Done/Stuck/Drift/Wrong-proxy — still good, but it's an optimization diagnostic, not an information one; first thing back if a slide dies), the perception–distortion slide (fold into 6 as one spoken line), slide 12 (fold into 13).

## Framing claims that are MINE, not the papers' — verify before podium

The fabrication watchlist applies to interpretation too. These are defensible standard statistics, but **no paper in the set states them**, so don't attribute them:

- [ ] "The 25–35% ellipticity shrinkage *is* MMSE shrinkage toward the prior" — the mechanism is textbook, but confirm the Everetts net is trained on a pixel-wise error (L1/L2) and not an adversarial/perceptual objective. If it's adversarial, the shrinkage story needs restating.
- [ ] "26% Hα is the same effect in spectra" — plausible and consistent, but Haghjoo frames it as *denoising, not amplitude*. Say "consistent with," not "because of."
- [ ] "Oversmoothing biasing flux up is prior-mean pull" — directionally sensible; confirm against Rezaee's own explanation before claiming it.
- [ ] Blau & Michaeli is about perceptual quality metrics vs distortion; applying it to *shape-information* metrics is a short, fair extension — but scope it aloud ("on structural metrics, for this task").
- [ ] `50 → 14–17 mas` — the v6 deck said "14"; the source note says 14–17. Deck now says 14–17. Confirm from the JAISP draft.
- [ ] Inherited and still open: embedding vs cutout bytes; the astrometry baseline; exact metric scopes.

## Refs, if any are named on-slide

Shannon (1948, 1959 rate–distortion) · data processing inequality (Cover & Thomas) · Blau & Michaeli 2018 (perception–distortion) · MAE (He+ 2022) · I-JEPA (Assran+ 2023) · Platonic Representation Hypothesis (Huh+ 2024) · "Language Modeling Is Compression" (Delétang+ 2023).

## Q&A landmines (updated for v7)

- *"The prior is information about the sky too — your DPI argument is sloppy."* Agreed, and it's on the slide: population information, not per-source. That distinction is the whole talk; it's why detection gains and shapes shrink.
- *"Super-resolution beyond the diffraction limit is provably possible (compressed sensing)."* Yes — **under a sparsity assumption**. The recovery is only as good as the assumption, and the assumption is a prior. Same accounting, stated in a different theorem.
- *"Isn't this just the deconvolution lesson from 1990 (CLEAN)?"* The moral is old; the exposure is new. The seduction is now photorealistic, pip-installable, and adopted by people who never saw a CLEAN artifact. And we put numbers on it.
- *"Val split catches this."* Val is denominated in the same currency as train. The shape bias survived every split and died at JWST.
- *"JAISP's pretext loss is also a proxy."* It isn't exempt; it's confessed, and paid for with per-task audits against truth.
- *"Tractor does joint photometry without 9M parameters."* The claim isn't "deeper" — it's one frozen representation, many tasks, new fields, no retraining, at delivered sampling.

## Voice

Unchanged and now easier to hold: dry, precise, numbers early, laugh lines flat. With the myth gone there is no register to protect — the only rule left is that **every claim on a slide is either a theorem or a measurement**.
