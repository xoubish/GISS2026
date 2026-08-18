# Sisyphus, Optimizing in a Dynamic Universe — spatial deck

Open `spatial/index.html` in a browser. No build step, no server, no network.
Everything (fonts, figures, texture) is local; the paper grain and every line of
the landscape are generated in the browser at load.

## Keys

| | |
|---|---|
| `→` `space` | next beat, then next scene |
| `←` | back |
| `1`…`9`, or two digits | jump to a scene (`1` `4` → 14; a single digit is instant) |
| `g` `esc` | scene list |
| `n` | presenter notes |
| `f` | fullscreen |
| `a` | animation on/off — instant navigation, the projector fallback |
| `h` | hide the counter and progress marks |
| `?` | key list |

Deep links work: `index.html#ruler/1` or `index.html?scene=ruler&step=1`.
Add `&instant=1` to land with no camera move. The URL updates as you present,
so a reload puts you back where you were.

## The one idea in the code

There are no slides. There is **one landscape**, defined once in
`js/terrain.js`, and a camera that moves through it. The loss landscape of
scenes 5–11 is not a diagram drawn beside the mountain — it *is* a 90-metre
stretch of the mountain in scene 1, at 20× magnification. The mountain is
~9 km wide with ~2.1 km of relief; the basin the optimizer settles into is
~26 m across. That ratio is the argument, and it is literal rather than
illustrated: scene 16 pulls back and the basin really is a speck, because it
always was.

Every station in the middle of the talk is drawn *on that ground*, not beside
it. The loop of scene 3 — data → model → objective → update — is pinned to the
hillside, not boxed above it. The soundings in scene 8 are soundings of this
hillside. The compressions in scene 9 are re-drawings of this curve, and the
residual hairlines are exactly what each summary threw away. The four rulers in
scene 10 are four readings of this one basin — entropy is the width of the
bracket, Fisher is the curvature that decides how fast it closes. The fork in
scene 11 is three directions you could actually walk. And the astrometry
numbers in the appendix are real widths on the same θ axis that scene 5 set
up: **1 world unit = 2 mas** (`S.MAS` in `art.js`), so 50 mas and 14–17 mas
are drawn to scale against each other.

## The science goes first

The opening no longer runs myth → landscape → philosophy. By scene 3 the
audience has the whole recurring structure — **data → model → objective →
update**, drawn on the ground itself: a handful of soundings where the label
*data* stands, the boulder as the current state, *better* literally downhill,
and a dashed return arc that closes the loop on *new data*. The fourth
ingredient — update, **or stop?** — is named there too, because it is the one
with no axis of its own and it is what the second half of the talk is about.

Scene 4 runs that loop at two scales side by side: a brain (*another drink?*,
set as the human marginalia) and a model — not one model but the year's family
of them, each verified against its manuscript: NISP Y_E imaging sharpened with
JWST/NIRCam F115W at 5× finer sampling (Everetts, Hemmati, et al.), WISE W1
with Spitzer IRAC Ch1 at 4.6× (Rezaee, Hemmati, et al.), and JWST/NIRSpec
prism spectra sharpened from R ∼ 100 to R ∼ 1000 against grating references
(Haghjoo, Hemmati, et al. — the path to Euclid and Roman grism). **The
receipts are on screen**: the three title pages appear as small framed plates
on the beat where the family is named (`assets/paper_nisp.png`, `_wise.png`,
`_spectra.png`) — evidence, not content; the captions carry one number each
and the notes say to gesture and move on. Ten seconds on the drink, a spoken
disclaimer that nobody is claiming the brain minimizes a loss, and then the
beat that sets the stage for everything after: **many instruments, one sky**.
Every instrument is a lossy projection of the same reality, and enhancement is
inference on the shared sky — information moved from where it was measured to
where it is needed. The opening scenes stay deliberately light on marks — a
few soundings as a hint, the words doing the work; data-as-points gets its
full treatment at scene 8. The ruler scene (6) then makes the family's core
choice concrete:
pixel similarity, flux conservation, morphology, astrometry, weak-lensing
shape — five defensible losses, one basin, and the argmin moves when the ruler
changes. That is where "the loss is a ruler we chose" stops being poetry.

The compression scene (9) closes the argument with a fourth beat: **enhancement
is compression run backwards**. Five coarse numbers in hand, a full curve
delivered — and the basin in the output was never in those data. It came from a
prior trained on other sky. The ledger must balance: data + prior in, structure
out, and validation is auditing which is which. That beat is what separates
recovery from hallucination, and it gives the information-theory scenes that
follow their reason to exist.

The NISP paper also hands the ruler scene (6) its measured instance: a
diffusion model that ties the residual network on per-pixel error while
pushing ellipticity below even bilinear interpolation — superb under one
ruler, destructive under another — and the honest stopping fact that neither
model meets the 10⁻³ lensing bar. Both live in the on-screen aside and the
notes of scene 6.

## The weather

The world is an Atlantic hillside — Ireland or the west of Scotland in the
rain. The palette lives in `deck.css`: a stormy sky gradient on the stage,
peat-dark ink instead of soot, moss and slate for every stroke class. The
ground itself is filled — `hillgrad` in `art.js`, a moss wash that deepens
downhill and rides the `rock` state like the hatching — the far ridges carry
a blue-grey haze fill (real wet-air distance), and `cloud()` strings
flat-bottomed storm masses along the range, living in the `far` layer so the
close-up scenes get plain rain-light sky. The Sisyphus drawings are untouched;
the `#inkify` tint just cooled to match the new ink. The human thread's
sanguine now reads as heather against the moss, which is better than it read
against the old paper.

## Register: claims, not lessons

The deck asserts; it does not instruct. Terms are named on the terrain (the
loop labels, the ruler names), the on-screen sentences are first-person
claims from someone who has done the work — "downhill is a choice; nothing in
nature says what the height means; I do" — and **formulas live in the
presenter notes**, not on screen (surprise, KL, Fisher, EIG: all in the notes
of scenes 10 and 12, ready if someone asks). When editing, resist the
definitional reflex: if a sentence would fit a lecture handout, rewrite it as
something the speaker learned the hard way.

And when a scene's content is verbal — the fork's three ways of not
converging — the hill drops to the bottom of the frame and the words take the
stage in lead type. The stations stay for the scenes that measure things; the
scenes that *say* things get paper.

## Sisyphus stays on stage

The middle of the talk is not allowed to decay into points and lines: a small
pen-scribble Sisyphus (drawn in `pusherFigure()` in `art.js`, stroke widths
compensated so the pen stays a pen at any scale) keeps the work visible. One
dynamic figure trails the boulder — `setRoll` keeps his hands on it, so in
scene 7 he wrestles it into the minimum and stands there when 42 appears — and
he stays faintly present through data, compression, the four rulers, and the
fork (layer `pusher`). Two static figures mark the myth's moments: pushing his
rock up the slope toward the crest in scene 12 (`climber`), and starting again
at the *new* lowest place when the terrain changes in scene 16 (`climber2`) —
which is the Sisyphus thesis drawn rather than said. The deck should feel like
the whole thing is hard, because it is.

Detail is built at five levels over progressively narrower strips of ground and
crossfaded by zoom, so the hillside is drawn with a finer pen the closer you
get. It never looks like a picture being scaled.

## The route

| | scene | where the camera is |
|---|---|---|
| 1 | Sisyphus | the flank, z 0.6 — beat 2 states the thesis in one line |
| 2 | Enter the slope | into the hillside, z 1.5 |
| 3 | The loop | the ledge before any axes: data → model → objective → update |
| 4 | Two systems | pulled back, z 2.1: a brain, the enhancement family, one sky |
| 5 | Loss landscape | the ledge, framed with axes |
| 6 | The ruler | inside the basin — five super-resolution losses, then the human one |
| 7 | Apparent solution | the boulder settles · **42**, played straight |
| 8 | Data | the same ledge: soundings, not a curve |
| 9 | Compression | 15 → 5 (basin lost) → 7 placed (basin back) → run backwards |
| 10 | Four rulers | entropy · surprise · KL · Fisher, on one basin |
| 11 | The fork | wrong ruler / bad compression / missing information |
| 12 | Experimental design | up to the crest, where you can see further |
| 13 | Two instruments | Rubin and *Euclid* VIS sampling the same ground |
| 14 | One representation | ten bands → one frozen latent → five heads |
| 15 | JAISP | the architecture plate and the numbers |
| 16 | Zoom out | the speck, then the new terrain |
| 17 | Two endings | on the hill · on the slope |
| 18 | Return | scene 1's camera exactly, and the pinball machine |
| A1 | Appendix — Astrometry | back to the same basin: 50 → 14–17 mas |
| A2 | Appendix — The field moves | the concordance field, 9–10 mas, coherent |

The two appendix scenes sit after the return, out of the spoken route. They
are there for Q&A — jump with `1` `9` and `2` `0` — because someone will ask
about the coherent 9–10 mas field, and the measured answer deserves better
than a verbal description.

Roughly 45 beats in the spoken route — comfortable at 15–18 minutes. At 12,
run **the 12-minute cut** below; the content stays in the deck for questions
and longer venues.

## The 12-minute cut

The default drops, also flagged in each scene's presenter notes:

- **Scene 4** — advance straight to the receipts beat: brain and papers get
  ~20 seconds together, skip the "same questions" beat, land on *one sky*.
- **Scene 6** — drop the human-ruler beat (Kahneman–Tversky).
- **Scene 10** — narrate entropy and Fisher only; step through surprise and
  KL silently — they stay on screen for anyone reading.
- **Scene 12** — a transit: one sentence while the camera climbs, then on to
  the instruments.
- **Marginalia** — voice only the three load-bearing glosses (scenes 8, 14,
  16); the rest are for the eye.

That is roughly a third fewer narrated beats, and every camera move survives —
the cut trims words, not geography.

## The bridge

The talk has one seam: the opening anchors on the enhancement family
(pairwise, one teacher per student), the program half anchors on JAISP. The
seam is closed in scene 14, on screen and in the notes: each enhancement was
*a new model for one task* — its own pair of instruments, its own choice of
what to keep. The general answer is to learn everything together, once: one
foundation, **less lossy than any single-task compression** because every band
and both instruments constrain it — and then every task, enhancement included,
is a small head on top. Say it there and the receipts become the special
cases of scenes 14–15 rather than a separate act.

## Files

| file | what it is | edit it when |
|---|---|---|
| `js/scenes.js` | **the script** — camera, beats, words, plates | almost always |
| `js/terrain.js` | the shape of the landscape, the rulers | to move a mountain or a minimum |
| `js/art.js` | the pen: hatching, stations, boulder, axes | to change how something is *drawn* |
| `js/engine.js` | camera, zoom interpolation, level of detail, keys | rarely |
| `css/deck.css` | paper, ink, type scale | for typography |

### Editing the script

A scene in `js/scenes.js`:

```js
{
  id: 'landscape',
  name: 'Loss landscape',
  camera() { const z = 4.57; return { x: 2210, y: S.anchorY(-1777, 0.5, z), z }; },
  enter: { dur: 1700 },
  set: { rock: 0.55, axes: 1, curmark: 1 },     // which layers are lit, 0..1
  steps: [ {}, { set: { … }, anim: { … }, notes: '…' } ],
  text: [
    { id: 'better', at: [0.10, 0.09], w: 560, cls: 'phrase',
      html: '<p>What does <em>better</em> mean?</p>' },
  ],
  plates: [
    { src: 'assets/x.png', ar: 550/1109, frame: 1, at: [0.34, 0.42], w: 830,
      cap: '…' },
  ],
  notes: '…',
}
```

- `camera.z` is the zoom: `z = 1` shows 1600 world units across the frame.
  `S.anchorY(y, f, z)` puts world height `y` at fraction `f` down the frame.
- `text[].at` and `plates[].at` are **frame fractions** — `[0.06, 0.12]` is 6%
  across, 12% down — and `w` plus the font sizes in `deck.css` are in stage
  pixels on a 1600×900 stage. So things are positioned by eye, not by world
  coordinates, and they scale with the projector.
- `set` keys are layer opacities; `m` is the ruler morph (0 = the ruler we
  chose, 1 = the other one); `roll` drives the boulder (0 = rim, 1 = settled).
  `S.DEFAULT_SET` at the bottom of the file lists them all.
- `steps` gives a scene beats, each with its own `set`, `anim` (per-key
  durations, ms) and `notes`. Text and plates take `from` / `to` to appear on
  particular beats.
- `plates` are rasters living in the world. `frame: 1` lays a figure on the page
  with a hairline rule and a caption; `mask: 1` or `blend: 1` runs a drawing
  through the `#inkify` filter in `index.html`, which turns scanned paper into
  ink on transparent — that is why the pinball drawing and the title drawing sit
  *in* the landscape instead of on a white rectangle.

### Adding a station

Add a layer name to `S.LAYERS` in `art.js`, draw into `L.<name>` inside
`buildStations()`, add it to `S.DEFAULT_SET` in `scenes.js` and to the `PLAIN`
list in `engine.js`. That is the whole contract.

## The human thread

The old deck read every node twice — person just met / Rubin–Euclid — in
side-by-side boxes. Boxes are the one thing this deck cannot have, so the second
reading is set as **marginalia** instead: a gloss in the margin of the same
picture, in italic, behind a hairline rule, in the one accent colour the deck
allows itself (`--human`, a desaturated sanguine — the way a second hand shows up
in an old drawing). It runs through scenes 4 (the brain, deciding on a drink),
5, 6, 8–14, 16 and appendix A1, always as `cls: 'aside human'`.

Because it is subordinate rather than parallel, the picture stays dominant and
nothing turns into a two-column slide. To make it grey instead of sanguine, set
`--human: var(--muted)` in `deck.css` and drop the `border-left` — one edit,
everything follows.

**The geometry is a rule**: wherever both voices appear, science and its
language — terms, losses, the statistics — sit on the **left**; the human,
simple example sits on the **right**, in the sanguine. The audience learns
once where to look and never re-orients. (Scene 15's numbers sit right of the
JAISP plate because there is no human column there; that is the one layout the
rule does not govern.)

The three glosses that carry the most weight: scene 8 (probing changes the thing
being probed), scene 14 (nobody keeps separate mental files), and scene 16 —
a source's position is a stable latent parameter and a person is not, which is
where the title finally earns itself.

## Decided

- **GIPS is deliberate** — Greater IPAC *Philosophy* Symposium. Scene 1's notes
  remind you to land it out loud before anyone reads it as a typo.
- **Weinberg is in**, scene 17: the reference is to *Dreams of a Final Theory*,
  and "half in longing, half in mourning" is presented as your phrase about
  reading him, not as a quotation from him. The notes say so, so it stays honest
  if anyone asks.

## Notes

- Measured on a software rasteriser with no GPU, the scene 7 → 16 pull-back runs
  at a median 11 ms per frame, worst frame 27 ms. `a` is there if a venue's
  machine disagrees.
- Nothing uses `Math.random`, so the drawing is byte-identical on every machine
  and every reload.
- The v7 information-theory deck is untouched at `../slides/`.
