# Papers — relevance to the loop

Companion to [talk_flow.md](talk_flow.md) and [distance_resolution_sampling.md](distance_resolution_sampling.md).
Test for relevance: **does it live in the honest band** (telling measurement from invention)? All four do.

## The four

### ★ JAISP — *yours*, to be submitted (Hemmati et al.)
*A Joint Rubin–Euclid Foundation Model for Cross-Instrument Source Detection and Astrometry.* IPAC/JPL (Helou, Lin, Akeson, Dowell, Faisst, Greene, Shupe).
- ~9M-param foundation model, self-supervised masked-band reconstruction across 10 bands (Rubin *ugrizy* + Euclid *VIS,Y,J,H*), each band predicted from the other nine **at its delivered sampling**. Encoder **frozen**; small heads do detection + astrometry.
- Detection matches the VIS catalog at 93% completeness / 94% purity and pushes **0.45 mag deeper**; astrometric scatter falls **50 → 14–17 mas**. Transfers to a new field **with no retraining**.
- Its own intro states the talk's frame: *"hardest questions limited by systematics rather than by statistics"* (Hubble tension named), and *"the understanding encoded in the classical solution is precisely what tells us how to design, constrain, and validate its learned replacement."*

| loop stage | domain | honest band? | role |
|---|---|---|---|
| ④ model = forget (the hedge: keep what *future* questions need — frozen features feed photometry/shape/redshift heads "in preparation"). Also touches ① distance (shared representation = learned metric), sampling (mismatched resolutions), and ⑤ question moves (systematics/Hubble framing). | 🔭 + 🤖 | yes — explicitly | **PILLAR** |

### Euclid NISP super-resolution (Everetts, Hemmati, Finner, Haghjoo, Huff, Scognamiglio) — A&A
*Deep-learning super-resolution of NISP imaging and its fidelity for galaxy shape measurement.* (The outline's "Ramey" hero figure.)
- VIS gives shapes at 0.1″; NISP is 0.3″ — too coarse. Super-resolve NISP (→ JWST F115W truth, 5× finer) to extend weak lensing into the near-IR.
- **Two architectures = the two ends of the honest band, head to head:** a **diffusion model** (generative *prior* — synthesizes structure absent from the input = hallucination) vs a **residual network** (direct mapping — only what data supports).
- Result (the punchline): the residual net wins on **every** structural metric; the **diffusion model suppresses shape info below even bilinear interpolation.** Neither meets lensing's 10⁻³ requirement (best ≈ 25–35% ellipticity shrinkage).

| loop stage | domain | honest band? | role |
|---|---|---|---|
| ④ resolution knob — literal hallucinate ↔ data-supported showdown | 🔭 + 🤖 | **the sharpest one** | montage / could be hero |

### WISE → Spitzer super-resolution (Rezaee, Hemmati, Mobasher, Reddy, Fetherolf, de la Vega, Miri) — student (UCR)
- 4.6× super-resolution WISE W1 → Spitzer IRAC Ch1. ~390k paired cutouts. Enhanced RCAN.
- Recovers total flux to 11% (2× better than interpolation); at 3–5″ blends recovers **35% of source peaks vs 9%** for interpolation. **Failure mode: oversmoothing biases flux upward.**

| loop stage | domain | honest band? | role |
|---|---|---|---|
| ④ resolution knob — deblending works, but a named bias | 🔭 + 🤖 | yes | montage |

### "Sharper at What Cost?" — spectral SR (Haghjoo, Hemmati, Mobasher) — student (UCR), to ApJ
- 7 classical deconvolution methods vs the SR2 deep pipeline on 1,187 JADES prism↔grating pairs.
- ML wins global fidelity (30% lower MAE, best FWHM). **But:** the Hα S/N gain is **denoising, not amplitude** — median recovered Hα is only **25.8% of true**, and it **degrades inter-line flux ratios** (the actual physics).
- The **title alone is the talk's thesis.**

| loop stage | domain | honest band? | role |
|---|---|---|---|
| ④ resolution knob — looks sharper, physics corrupted | 🔭 + 🤖 | yes — in the name | montage |

## The pattern (this is the useful finding)

- **All four concentrate on stage ④ (model = forget) and its resolution/sampling knobs.** That's not a bug — ④ is the heart of the talk (where hallucination ↔ amnesia lives). But it means we can't treat them as four separate slides; they'd be redundant.
- **The three student/postdoc SR papers are the *same experiment in three modalities*:** image **shape** (Everetts), image **photometry** (Rezaee), **spectra** (Haghjoo). Each says: *sharper globally, but it lies in a specific, measured way.*

## Decision — 1 pillar + 1 montage — **superseded (Jul 2026)**

> ⚠️ Revisited: the talk felt science-thin with the trilogy at one montage slide. New plan: the SR trilogy anchors **Act 1** (distance/resolution) and JAISP anchors **Act 2** (representation/compression) — see [science_spine.md](science_spine.md). Original reasoning kept below for history.

JAISP is the pillar because it **models more things together and earlier in the pipeline** (joint cross-instrument representation, frozen for many future heads) — it reaches across stages ①/④/⑤. The other three are **more focused** (each a single-modality resolution study) → they collapse into one montage.

1. **JAISP = the pillar** (stage ④, and it bridges to ① distance and ⑤ question-moves). It's *yours*, it's fresh, and "foundation model = forgetting with a hedge" is the richest single beat in the talk. Hero figure: the 10-band postage stamps (one source, ten views → one frozen representation), or the 50→14 mas astrometry gain.

2. **The three SR papers = ONE "Sharper — but real?" montage slide.** Three strips (shape / photometry / spectra), each *blurry → super-res → truth*, one line each. This does triple duty:
   - "I publish, and so do my people" (names: **Everetts, Rezaee, Haghjoo**) — the GISS "who are these people" brief, answered.
   - the empirical proof of the hallucinate ↔ amnesia drama.
   - your own student's title — *"Sharper at What Cost?"* — is the thesis, handed to you.

## Bonus: built-in levity (GISS-appropriate, and honest)
- *"We built a generative AI to sharpen galaxies — it did worse than blurring them."* (Everetts diffusion < bilinear.) Dry laugh **and** the deepest honest-band point: the prior hallucinated shape it couldn't know.
- *"It recovered 26% of the actual signal and looked great doing it."* (Haghjoo Hα amplitude.) The seduction of sharpness.
