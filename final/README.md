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

## Decisions on record

- **Palette: alpine slate blue** (chosen 2026-08-23 from five rendered
  candidates) — blue-grey mountains in snow-light, cool paper, dark
  blue-black ink, rust (`--human: #a05a3c`) as the one warm accent. Lives in
  `css/deck.css` (variables + stroke classes), `js/art.js` (hill wash, far
  ridges, clouds), and the `#inkify` matrix in `index.html`.
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
  static `sitfig` layer: cup, bottle), header "Inference & optimization".
  Three beats: the drink question + inference (p(world | data) on screen —
  decided), optimization, then the three-column seed table (brain / ML &
  astro / science itself) in the `.mini-table` style — the seed the big
  table of scene 7 grows from.

- **Scene 4 (The loop)** — the handwritten cycle (4.png) drawn in the sky:
  question → what matters → the ruler → data → compression → inference →
  answer → good enough?, dashed return. Reveals over three beats
  (`loop1/2/3` layers), then two branch bullets: not good enough (small
  "(42)") → debug the pipeline; good enough → die on that hilltop or ask
  the next question. Sisyphus (`leaner` layer) leans on the frame's right
  edge, watching.

- **Scene 5 (Three systems)** — the big seven-row table from talk/5.docx
  (brain / model / science as community), world-anchored in the sky west of
  the loop. Wide view → per-beat camera visits to each row (z 1.8, whole
  row in frame) → pull-back with the "same optimization topology" closing
  line. A hazy backdrop range (`tablebg` layer) runs along the bottom with
  a sharp spike right of the table — Sisyphus hangs off it one-handed,
  because this scene is difficult. 12-minute cut: walk rows 1, 5, 7 only.

- **Scene 6 (Information theory)** — terrain-first: the loop's stations
  measured on the basin itself, using the engine's station layers
  (soundings → H(X); Fisher parabolas → I(θ) with the zero-Fisher warning;
  5-knot vs 7-knot sampling; the surprise datum → −log p(x); KL closing
  arrows; pull-back to the climber → expected information gain). Slow
  descent from scene 5's sky on entry. Formulas inline and small on
  screen; EIG formula in notes only. 12-minute cut: narrate beats 1, 2, 5.

Scenes 7–10 (the two examples, philosophy, return) are stubs.
