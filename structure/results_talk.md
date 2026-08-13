# v8 — the results talk (no frame)

Built from the four papers only. No metaphor, no theory spine, no philosophy. The argument is the work: **two routes to combining Rubin and Euclid, and what we measured about each.**

## The question the talk answers

One sky, two observatories, ten bands — mismatched PSF, sampling, depth, wavelength. Rubin *ugrizy*: deep and repeated, ~0.7″ seeing. Euclid: VIS sharp at 0.1″, NISP at 0.3″. Nothing sees everything, and nothing is on the same grid.

**So: how do we measure sources jointly — and can learned models do the joining?**

Two routes were tried. The talk reports both.

- **Route A — make one instrument look like another** (super-resolution). Three studies, three modalities.
- **Route B — don't resample at all; learn a joint representation at each band's delivered sampling** (JAISP).

## Route A — three super-resolution studies (~4 min)

Same experiment in three modalities, each against a real second instrument, so each has ground truth.

| | setup | what improved | what it cost |
|---|---|---|---|
| **shape** — Everetts+, A&A | NISP 0.3″ → JWST F115W truth (5× finer); diffusion vs residual net, head to head | residual net wins every structural metric | ellipticity shrunk **25–35%** (lensing needs 10⁻³); the **diffusion model falls below bilinear** on shape information |
| **photometry** — Rezaee+ | WISE W1 → IRAC Ch1, 4.6×, ~390k paired cutouts, enhanced RCAN | total flux to **11%**, 2× better than interpolation; blends at 3–5″: **35% vs 9%** peak recovery | oversmoothing biases flux **upward** — a named, directional bias |
| **spectra** — Haghjoo+ | 1,187 JADES prism↔grating pairs; 7 classical deconvolutions vs the SR2 pipeline | **30% lower MAE**, best FWHM — wins global fidelity outright | median recovered Hα is **26% of true**; inter-line ratios degraded |

**What the three agree on — the finding, stated as a finding:**
1. Every one improves the metric it was trained on.
2. The gains that survive are **decisions** — is there a source, is this one object or two — where completeness and purity are checkable against truth.
3. The losses are **measurements** — a shape, a flux, a line ratio — and each is biased in a specific, reproducible direction.
4. None of it was visible without a second instrument. Held-out validation from the same data looked fine in every case.

Recommendation, plainly: detect on enhanced images if you like; don't measure on them, and if you must, carry the measured bias.

## Route B — JAISP (~4 min)

Don't upsample anything. ~9M parameters, self-supervised: **mask one band, predict it from the other nine, each at its own delivered sampling** — no common grid, no resampling. Encoder frozen; small heads do the tasks.

- detection matches the VIS catalog at **93% complete / 94% pure**, and reaches **0.45 mag deeper**
- astrometric scatter **50 → 14–17 mas**
- transfers to a new field with **zero retraining**

Why it works at all: no band is predictable from the other nine unless the model separates the source from what each instrument does to it. The alignment isn't an add-on; it's the only way to score on the task.

Audited in three layers so the claim is checkable: the **output** (can it reconstruct the withheld band), the **frozen representation** (is the information in the latent, or hiding in the decoder — the heads only ever see the frozen encoder), and **reuse** (can a small new head get at it for a task it was never trained on).

## Close (~1.5 min)

What's next, concretely: heads in preparation for photometry, shapes, photo-z; joint Rubin–Euclid processing at IPAC; the open question of how far a frozen representation transfers across depth and field.

Three sentences to leave them with, all earned above:
1. Learned models bought us real gains where the claim could be audited.
2. Where they cost us, they cost us in a measurable and reproducible direction — we have the numbers.
3. Neither would be known without a second instrument, which is an argument for joint processing rather than better single-survey pipelines.

## Slide map (12)

1. Title
2. The problem: one sky, ten bands, no common grid (figure: PSF/depth/sampling comparison)
3. Route A: make NISP look like VIS — why it's the obvious thing to try
4. **[PAPER]** Everetts — shapes, and the diffusion-vs-residual head-to-head
5. **[PAPER]** Rezaee — photometry, the deblending win and the flux bias
6. **[PAPER]** Haghjoo — spectra, 26% Hα, the ratios
7. The three together: what gained, what cost, what only truth could reveal
8. Route B: JAISP — mask a band, predict from nine, at delivered sampling
9. **[PAPER]** JAISP results (the three numbers)
10. The three-layer audit — why the representation claim is checkable
11. What's next: heads, joint processing, transfer
12. Three sentences

Timing ≈ 12 min: setup 1.5 · route A 4 · synthesis 1 · route B 4 · close 1.5.

## Open — needed before the deck is right

- [ ] **Did the SR results actually motivate JAISP?** If yes, the talk has a causal spine for free (we tried making one instrument imitate another; here's the bill; so we stopped resampling). If not, they're presented as two parallel routes — which is the current default, and the safe one. *Do not invent the causal story.*
- [ ] Which is the centerpiece: JAISP (yours, unsubmitted — is it citable at GISS?) or the trilogy (students', published/in press)?
- [ ] Figures needed: PSF/sampling comparison (slide 2), one before/after/truth strip per SR paper (4–6), JAISP hero (9). The three SR strips are the talk's best visual asset and there's no substitute for the real ones.
- [ ] Title, plain-science options: *"What Learned Models Can and Cannot Measure"* · *"Super-Resolution and Joint Representations for Rubin + Euclid"* · *"Sharper, and What It Costs"* (quotes your student's title without taking it)
