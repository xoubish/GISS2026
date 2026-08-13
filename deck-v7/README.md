# v7 — "Photons or Priors"

Built from [`../structure/information_spine.md`](../structure/information_spine.md). 15 slides,
12:00 budget. The v6 Sisyphus deck is untouched in [`../slides/`](../slides/).

## Running it

    ./serve.sh          # http://localhost:8000 — needed for the presenter view
    ./export.sh         # out/deck.pdf (15 pages) + out/frames/ (31 PNGs)

Keys in the deck: `→ ←` advance · `N` notes on the projector · `P` presenter window ·
`T` on-stage timer · digits then `Enter` jump to a slide. Deep links are `#/6` and `#/6.3`
(slide 6, third build).

The presenter window reads `index.html` over `fetch`, which browsers block on `file://` —
hence `serve.sh`. Everything else, including both exports, works straight off the filesystem.

## Layout

One design stage of 1280×720, scaled to fit whatever the room's projector is. Layout is
therefore identical everywhere; only the scale factor changes. Slide content is plain HTML in
`index.html` — reordering slides means moving a `<section>`, nothing else. Per-slide timing
lives in `data-mins` and drives the presenter's pacing readout.

Anything with `class="build"` is revealed on a later advance, cumulatively. Put
`data-builds="one"` on a slide to reveal them one at a time with the others dimmed instead.

## Before the podium

**Figures still needed**

- [ ] Slide 2, the cold open — the super-resolved galaxy, full bleed. Ideally the paired strip:
      input · model output · second-instrument truth. Currently a dashed placeholder.
- [ ] Optional: a before/after/truth strip per SR paper on slide 6. `results_talk.md` calls these
      the talk's best visual asset, and the receipts table is carrying that weight alone right now.

**Claims that are framing, not findings** — flagged in the spine doc's watchlist, repeated in the
speaker notes where they occur so the presenter view surfaces them:

- [ ] Slide 5 — confirm the Everetts net trains on a pixel-wise loss, not an adversarial one.
      If adversarial, the MMSE-shrinkage mechanism needs restating.
- [ ] Slide 6 — "26% Hα is the same effect": say *consistent with*, not *because of*. Haghjoo
      frames it as denoising, not amplitude. Same hedge for Rezaee's flux bias as prior-mean pull.
- [ ] Slide 13 — confirm `50 → 14–17 mas` against the JAISP draft; the v6 deck said 14.
- [ ] Slide 14 — the rate ladder is deliberately unnumbered. Embedding-vs-cutout bytes is still
      open; do not quote a ratio.
- [ ] Slide 15 — the four rules are assembled from claims made earlier in the talk rather than
      lifted from the doc as a set. Check all four were actually said.
