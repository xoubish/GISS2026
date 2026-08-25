# Sisyphus, Optimizing in a Dynamic Universe — final deck

The talk being built scene by scene, slowly, with every decision made on
screen with the speaker. Open `final/index.html` in a browser — no build
step, no server, no network.

The machinery (`js/terrain.js`, `js/art.js`, `js/engine.js`, `css/deck.css`)
is copied unchanged from the previous prototype, now retired to
`../old/spatial/`; see `../old/spatial/README.md` for how it works — keys,
cameras, layers, text placement, plates. `js/scenes.js` is the script and
the only file that matters here.

## The spine (revised 2026-08-23 — ten scenes)

The original twelve-scene spine lost two: the "bad vs good answer" scene
(absorbed into scene 4's branch bullets — 42 survives only as the small
"(42)" there) and the separate big-table scene (scene 5 *is* the big
table now).

| | scene | carries |
|---|---|---|
| 1 | Opening | Sisyphus drawing, GIPS framing, the AI/philosophy line |
| 2 | Myth | the boulder, retold in one breath |
| 3 | Why we are Sisyphus | inference & optimization, p(world \| data), the mini table |
| 4 | The loop | the full cycle + the two branches (not good enough → debug; good enough → stop or next question) |
| 5 | Three systems | THE BIG TABLE: brain · model · science, walked row by row |
| 6 | Information theory | distance, sampling, entropy/surprise/KL/Fisher, which observation teaches most |
| 7 | Example — a person | someone you just met, walking the table |
| 8 | Example — JAISP | enhancement family → foundation bet → astrometry → the field had moved |
| 9 | Philosophy | three pages: the same picture at three scales; the rulers we carry; the top of the hill |
| 10 | Return | Sisyphus takes a break, the ball comes back, one must imagine the optimizer happy |

## Short route (12 + 3 minutes — 30 beats)

Open `short.html` or `index.html?route=short`. The short route is a curated
path through the same scene graph: arrow/space follows the short path, while
the full deck remains available by opening `index.html` without the route.

The selected beats are:

| scene | beats kept |
|---|---|
| Opening | 1 |
| Myth | all 3 |
| Why we are Sisyphus | drink/inference; mini-table |
| The loop | question/ruler; full loop; two branches |
| Three systems | full table; loss; learning signal; audit; topology close |
| Information theory | all four beats: entropy + mutual info; Fisher; sampling; the close (update, checks, next observation) |
| Example — a person | prior + stream; distance/resolution; surprise; good enough |
| Example — JAISP | bridge; architecture (drawn); ten pushes; astrometry proof; field moved |
| Philosophy | all three pages, each fully revealed |
| Return | the one beat (drawing + final line) |

## Decisions on record

- **Palette: navy & porcelain** (2026-08-24; supersedes dawn moss, which
  was brightened and then retired the same day) — classic white paper
  (`#f5f6f2`), Prussian-navy ink (`#152a42`), light-blue hills and sky in
  the engraving / ukiyo-e register, white and cream clouds, a soft warm
  glow kept in the sky's top-left corner, terracotta (`--human: #c2562f`)
  kept as the warm accent against the blue. Lives in `css/deck.css`
  (variables + stroke classes + rules/frames), `js/art.js` (hill wash, far
  ridges, clouds, tablebg), and the `#inkify` matrix in `index.html` (the
  scanned drawings now render in navy).
- **Case rule:** anything the *pen* writes into the drawing (terrain
  labels, the loop's nodes) is lowercase italic, like annotations on a
  sketch; anything typeset in HTML (headers, definitions, bullets) is
  sentence case. Diagram lettering that takes center stage uses full-ink
  fill (`text.glab.loop`) for projector contrast.
- **Scene headers use the `.scenehead` pattern** (deck.css): a small
  letter-spaced kicker naming the station of the talk over a big word
  naming the subject — the title slide's grammar at scene scale. First
  used in scene 2 ("THE MYTH" / Sisyphus). On-screen scene text keeps one
  uniform size (`aside lead`); no extra emphasis on single terms.
- **Altitude = abstraction.** Concrete things happen on the ground; abstract
  things happen in the sky with the ridgeline as a low horizon. Camera
  height means something.
- **Register is decided scene by scene.** Some formulas earn the screen;
  nothing is assumed either way.
- **Ellipticity result: out of the deck entirely.** Back pocket for Q&A only.
- **No 6×7 reveal anywhere.** 42 stands on its own meaning.
- **The fork lives inside scene 6** as "the bug can be at any station of the
  pipeline."
- **Experimental design lives inside scene 8.**
- **Joint processing and the enhancement receipts live inside scene 10**,
  which may split in two when built.
- **The table's third column has no worked example** — asymmetry accepted
  for now.
- Scene 10 concordance beat: the question was answered, then new better
  data arrived and the field had moved.

## The PowerPoint is a build artifact

`../Presentation.pptx` is generated, never edited by hand:

```
final/tools/venv/bin/python final/tools/export_pptx.py
```

It drives headless Chrome through every scene and beat (`&bare=1` hides
the hud), captures at 3200×1800, converts to JPEG q90, and writes one
slide per beat with the presenter notes from scenes.js in the speaker-notes
field. The deck is the source of truth; re-run after any change. Present
from the browser when the venue allows (the animations live there), from
the pptx as the bulletproof fallback.

`../Presentation_editable.pptx` is the second build artifact
(`final/tools/venv/bin/python final/tools/export_editable_pptx.py`): the
same talk as fully native PowerPoint — real text boxes, native tables, a
shape-drawn loop, the dawn-moss palette as plain RGB fills — for editing
text/colors by hand. Content is transcribed from scenes.js by hand inside
the script, so it does NOT pick up scene edits automatically the way the
screenshot export does.

## Status

Built so far:

- **Scene 1 (Opening)** — title block + drawing only, one beat, all talking
  points spoken (decided: nothing written on screen).
- **Scene 2 (Myth)** — the animated myth: a slope-scale pen Sisyphus climbs
  in real time (~15 s, holds near the crest if the speaker runs long), the
  fall is triggered by keypress, the boulder settles in the bowl below.
  Three bullets appear left, one per beat. Machinery: `mythfig` layer +
  `S.setMyth(t)` driver in `js/art.js`, `myth` state key hooked in
  `js/engine.js` — the one scene so far that touches the engine.

- **Scene 3 (Why we are Sisyphus)** — Sisyphus seated on the summit (new
  static `sitfig` layer: cup, bottle), header "Why We Are Sisyphus".
  Five beats: the lead claim, the three-column seed table (brain / ML &
  astro / science itself), then inference and optimization definitions
  appearing beneath it, then the closing line moved here from scene 2
  (2026-08-25): "In a constant optimization loop" — the cue for scene 4.
  The drink example comes first in the brain column to connect the table
  to the drawing.

- **Scene 4 (The loop)** — the handwritten cycle (4.png) drawn in the sky:
  question → what matters → the ruler → data → compression → inference →
  answer → good enough?, dashed return. The full loop is visible from the
  start, then two branch bullets appear: not good enough (42 ...) → debug
  the pipeline; good enough → stop or ask the next question. Sisyphus
  (`leaner` layer) leans in the corner, watching.

- **Scene 5 (Three systems)** — the big seven-row table from talk/5.docx
  (brain / model / science as community), world-anchored in the sky west of
  the loop. Wide view → per-beat camera visits to each row (z 1.8, whole
  row in frame) → quiet pull-back. A hazy backdrop range (`tablebg` layer)
  runs along the bottom with a sharp spike right of the table — Sisyphus
  hangs off it one-handed, because this scene is difficult. 12-minute cut:
  walk rows 1, 5, 7 only.

- **Scene 6 (Information theory)** — four beats, one thesis (revised
  2026-08-24): everything in the loop is measurable, and there is a right
  way to ask the next question — conveyed, not taught as a stats class.
  Every beat is a full-page spread written in full sentences the speaker
  reads from the screen — notes are backup, never the only home of a
  line. The beats: (1) entropy + mutual information — H(X) with its
  formula on the left, I(X;θ) = H(X) − H(X|θ) on the right, the camera
  dropped so the rims clear both columns; (2) Fisher — I(θ) with its
  definition, "the ruler is p(x|θ) itself", and the zero-Fisher warning
  with Cramér–Rao on the right; (3) the compression — even vs well-placed
  sampling on one page, the miss faint, the recovery bold, each column
  naming its curve, Shannon's source-coding floor on the left and the
  data-processing inequality I(θ;T(D)) ≤ I(θ;D) on the right; (4) the
  close, at the pulled-back climber camera — "all of it is measurable"
  with D_KL, the three checks cheapest first ("more data" is the third,
  not the first — its trail rises over the crest), and the EIG formula as
  the right way to ask. The surprise beat was cut; its datum ghosts on
  the closing page and "still surprised after convergence" survives as
  the first check. Boltzmann, Jaynes, and the MacKay caveats live in the
  closing beat's notes for Q&A. The two entropy groups (`entropy` layer)
  are soundings like any other here — readings of the ground at a place;
  the contrast is in **y**: at one place the readings land on top of each
  other, at the other they scatter. Spread in x would read as "we sampled
  many θ". Both places are flat ground, so the slope is not doing the
  scattering. The `mi` layer adds one solid column marking the part of
  that spread which moves with θ — capacity against relevance, drawn
  rather than asserted. Shannon's framing is the `comm` layer, drawn
  whole: two figures on the two rims, a cone each, the message crossing
  the valley between them — arcs leave the speaker's tip, a dashed
  channel bows over the entropy labels, Sisyphus takes it at his ear;
  the mark carries no words of its own. Slow descent from scene 5's sky
  on entry. The scene is already its own 12-minute cut — four beats, all
  kept.

- **Scene 7 (Example — a person)** — "do I like this new person?" walked
  through the same drawings scene 6 used, now with human captions (plain
  ink — rust accent was tried and removed). Two pen figures (`meetfig`
  layer, `meet` driver) meet across the basin: the observer waves from one
  rim, the stranger stands on the other, and they walk closer beat by
  beat — deliberately NOT moving on the learn-nothing beat. Five beats
  (tightened 2026-08-24, from eight — repeats of scene 6 removed):
  the prior + the stream, one page; **distance is resolution** (coarse and
  fine comb together, faint and bold); **two ways to learn nothing**
  (zero-Fisher small talk + the tenth coffee, merged — irrelevance and
  repetition, one lesson); surprise (sometimes the person moved — kept
  alone: scene 6 no longer has a surprise beat, and it is the title's
  idea); good enough? → which encounter teaches most is experimental
  design about a person. 12-minute cut: beats 1, 3, 4.

- **Scene 8 (Example — JAISP)** — "One foundation, many rulers." Seven
  beats (2026-08-25: rebuilt learning from the Roman-conference deck,
  `talk/SHemmati_roman2026.pdf`): one sky (the person lesson pointed
  upward) → the three pairwise receipts (one teacher, one student, one
  loss per question; the receipts now show on this beat only) → the
  scaling problem and the foundation move, priced (≈2.5 GPU-hours, no
  labels/catalogues/simulations; train once · encode once · measure many
  times) → JAISP with the numbers (≈9M params, 93/94%, 0.45 mag deeper)
  and the architecture drawn in the deck's own pen (`jarch` layer: ten
  band strokes in two instrument stacks → one shared latent, frozen →
  five head routes, each its own loss; the colored paper figure is
  retired to Q&A) → **ten pushes to the design** (`iters` layer: the
  v1–v10 ladder walked up the real flank toward the summit — contrastive,
  object pairs, JEPA each roll back; v6 "predict the pixels" is the loud
  ring, the turn; v9–10 production at the crest, "pixels won" — the
  loop's not-good-enough branch, lived) → the astrometry proof on the θ
  axis, now drawn as the collapse itself (open raw cloud over the ≈50 mas
  bracket → tight solid cluster over 14–17 mas, labels hung to the side;
  the paper figure shrunk to a small corner receipt) plus the transfer
  line (second field, nothing retrained, same numbers) → the concordance
  field (dashed displaced ridgeline + coherent arrows, 9–10 mas): the
  title of the talk, measured; notes carry the 7 mas ten-band share, the
  two-methods check, the 1.5 mas per-source absorption, and Roman as the
  natural next question. 12-minute cut: receipts get ~20 s; beats 4–7
  keep.

- **Scene 9 (Philosophy)** — the deck's highest camera, almost pure sky,
  Sisyphus brooding on his summit boulder at the frame's lower right —
  hat on, head bowed, elbows toward the knees (`hatfig` layer, scale 550,
  about seven times the scene-3 sitter), the same pose through all pages
  (2026-08-25; a reading pose was tried for page one and cut the same
  day — the camera moved from x 2450 to 2200 to push him toward the
  edge, clear of the text). **Three pages, sixteen beats** (settled
  2026-08-25: "three philosophy slides before the ending is exactly
  right — more risks a detour, fewer and the ending has not earned its
  weight"), every point on its own keypress. The arc: who optimizes →
  by what ruler → do we even want the optimum. Page one, the bridge
  from the technical talk — the same picture at three scales: a brain
  (loss is relative — history, reference points, habit, attachment), an
  AI (can optimize a different loss, but we chose it), science (does
  both collectively); then the two hinges: a different optimizer is not
  necessarily a different scientist if it carries our ruler, and
  sometimes a good model is one you trust enough to use. Page two, the
  five rulers: nature gives observations, not the ruler — empiricist,
  rationalist, pragmatist, existentialist, absurdist; the close: today
  we oscillate. Page three, sparse — "The top of the hill": we optimize
  because we want to get somewhere; but what if we arrive?; Weinberg's
  "a final theory: half in longing, half in mourning"; then one quiet
  line, small and unbolded (2026-08-25): "The ending: die on the summit
  or die pushing" — and the notes say resist explaining, let it sit. Metamodernism stays in Q&A. The short route
  lands on each page fully revealed (beats 5, 12 and 16, 0-indexed 4,
  11, 15).

- **Scene 10 (Return)** — scene 1's exact camera, one beat (2026-08-25;
  was two). The pinball drawing on the left (Sisyphus takes a break; the
  ball comes back, and he paid for that) and the line at lower right,
  there from the start — no click: "One must imagine **the optimizer**
  happy" (revised 2026-08-25 from "Sisyphus" — after a whole talk about
  optimization, he takes a break: happiness is neither failure nor
  convergence). Nothing more — decided.

**All ten scenes are built.** The deck is complete; edits from here are
polish passes.
