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
| 9 | Philosophy | existential/rational/absurd as rulers you carry; die on the hill / on the slope |
| 10 | Return | Sisyphus takes a break, the ball comes back, one must imagine Sisyphus happy |

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
| Information theory | soundings; Fisher/ruler; sampling; bottleneck; expected information gain |
| Example — a person | prior; distance/resolution; surprise; good enough |
| Example — JAISP | bridge; architecture; astrometry proof; field moved |
| Philosophy | two endings |
| Return | drawing; final line |

## Decisions on record

- **Palette: dawn moss** (revised 2026-08-24) — warm paper, green hills,
  teal sky-light, dark pine ink, terracotta (`--human: #d06c4a`) as the
  human accent. Lives in `css/deck.css` (variables + stroke classes),
  `js/art.js` (hill wash, far ridges, clouds), and the `#inkify` matrix in
  `index.html`.
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
  Four beats: the lead claim, the three-column seed table (brain / ML &
  astro / science itself), then inference and optimization definitions
  appearing beneath it. The drink example comes first in the brain column
  to connect the table to the drawing.

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

- **Scene 6 (Information theory)** — terrain-first: statistics of the
  loop drawn on the basin itself, using the engine's station layers
  (soundings → H(X) as a first lossy statistic; Fisher parabolas → I(θ)
  with the zero-Fisher warning;
  5-knot vs 7-knot sampling; the surprise datum → −log p(x); KL closing
  arrows; pull-back to the climber → expected information gain). Slow
  descent from scene 5's sky on entry. Each station carries its
  diagnostic test (Cramér–Rao for the ruler, I(T(D);θ) vs I(D;θ) for the
  compression, converged-but-still-surprised for the loss), and a
  dedicated "finding the bottleneck" beat lights the three fork trails —
  three checks, cheapest first; "more data" is deliberately the third.
  Formulas inline and small on screen; EIG formula in notes only. The old
  orientation beat was removed, so the scene opens directly on entropy.
  12-minute cut: narrate entropy, Fisher, surprise and the bottleneck beat.

- **Scene 7 (Example — a person)** — "do I like this new person?" walked
  through the same drawings scene 6 used, now with human captions (plain
  ink — rust accent was tried and removed). Two pen figures (`meetfig`
  layer, `meet` driver) meet across the basin: the observer waves from one
  rim, the stranger stands on the other, and they walk closer beat by
  beat — deliberately NOT moving on the duplicate-coffee beat. Stations:
  the prior you arrive with; the stream's entropy; **distance is
  resolution** (coarse comb → fine comb); zero-Fisher small talk; the
  tenth coffee (gain stalls); surprise (sometimes the person moved); good
  enough? → which encounter teaches most is experimental design about a
  person. 12-minute cut: beats 2, 3, 6, 7.

- **Scene 8 (Example — JAISP)** — "One foundation, many rulers." Six
  beats: one sky (the person lesson pointed upward) → the three pairwise
  receipts (one teacher, one student, one loss per question) → the scaling
  problem and the foundation move (learn the compression once; every task
  a small head with its own loss) → the JAISP architecture plate with the
  numbers (≈9M params, 93/94%, 0.45 mag deeper) → the astrometry proof
  (50 → 14–17 mas, camera on the basin's θ axis) → the concordance field
  (dashed displaced ridgeline + coherent arrows, 9–10 mas): the title of
  the talk, measured. 12-minute cut: receipts get ~20 s; beats 3–5 keep.

- **Scene 9 (Philosophy)** — "The view from here": the deck's highest
  camera, almost pure sky, the sitter tiny on his summit at the frame's
  bottom edge. Seven beats, one thought each in large type: every station
  was a choice (why philosophy) → a relative loss steers an absolute
  science → the AI as a different kind of scientist ("a brain fails
  gently; a model fails precisely") → one grammar, different nouns → the
  tenth coffee at field scale (the same galaxy a thousand times, the same
  paper nine hundred) → the rulers you carry (rationalist / existentialist
  / absurdist; oscillation is healthy updating; metamodernism stays in
  Q&A) → two ways for a question to end (hilltop / slope, Weinberg).
  12-minute cut: beats 1, 5, 6, 7.

- **Scene 10 (Return)** — scene 1's exact camera, the pinball drawing
  (Sisyphus takes a break; the ball comes back, and he paid for that),
  and one line on the second beat: "One must imagine Sisyphus happy."
  Nothing more — decided.

**All ten scenes are built.** The deck is complete; edits from here are
polish passes.
