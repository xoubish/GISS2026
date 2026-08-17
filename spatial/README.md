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
scenes 3–9 is not a diagram drawn beside the mountain — it *is* a 90-metre
stretch of the mountain in scene 1, at 20× magnification. The mountain is
~9 km wide with ~2.1 km of relief; the basin the optimizer settles into is
~26 m across. That ratio is the argument, and it is literal rather than
illustrated: scene 16 pulls back and the basin really is a speck, because it
always was.

Every station in the middle of the talk is drawn *on that ground*, not beside
it. The soundings in scene 6 are soundings of this hillside. The compressions in
scene 7 are re-drawings of this curve, and the residual hairlines are exactly
what each summary threw away. The four rulers in scene 8 are four readings of
this one basin — entropy is the width of the bracket, Fisher is the curvature
that decides how fast it closes. The fork in scene 9 is three directions you
could actually walk. And the astrometry numbers in scene 14 are real widths on
the same θ axis that scene 3 set up: **1 world unit = 2 mas** (`S.MAS` in
`art.js`), so 50 mas and 14–17 mas are drawn to scale against each other.

Detail is built at five levels over progressively narrower strips of ground and
crossfaded by zoom, so the hillside is drawn with a finer pen the closer you
get. It never looks like a picture being scaled.

## The route

| | scene | where the camera is |
|---|---|---|
| 1 | Sisyphus | the flank, z 0.6 |
| 2 | Enter the slope | into the hillside, z 1.5 |
| 3 | Loss landscape | the ledge, framed with axes |
| 4 | The ruler | inside the basin — two rulers, then the human one |
| 5 | Apparent solution | the boulder settles · **42** |
| 6 | Data | the same ledge: soundings, not a curve |
| 7 | Compression | 15 numbers → 5 (basin lost) → 7 placed (basin back) |
| 8 | Four rulers | entropy · surprise · KL · Fisher, on one basin |
| 9 | The fork | wrong ruler / bad compression / missing information |
| 10 | Experimental design | up to the crest, where you can see further |
| 11 | Two instruments | Rubin and *Euclid* VIS sampling the same ground |
| 12 | One representation | ten bands → one frozen latent → five heads |
| 13 | JAISP | the architecture plate and the numbers |
| 14 | Astrometry | back to the same basin: 50 → 14–17 mas |
| 15 | The field moves | the concordance field, 9–10 mas, coherent |
| 16 | Zoom out | the speck, then the new terrain |
| 17 | Two endings | on the hill · on the slope |
| 18 | Return | scene 1's camera exactly, and the pinball machine |

Roughly 40 beats. At 12 minutes that is fast; the notes flag which beats to drop
first (scene 4's human ruler, two of scene 8's four).

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
in an old drawing). It runs through scenes 3, 4, 6, 7, 8, 9, 10, 11, 12, 14
and 16, always as `cls: 'aside human'`.

Because it is subordinate rather than parallel, the picture stays dominant and
nothing turns into a two-column slide. To make it grey instead of sanguine, set
`--human: var(--muted)` in `deck.css` and drop the `border-left` — one edit,
everything follows.

The three glosses that carry the most weight: scene 6 (probing changes the thing
being probed), scene 12 (nobody keeps separate mental files), and scene 16 —
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

- Measured on a software rasteriser with no GPU, the scene 5 → 16 pull-back runs
  at a median 11 ms per frame, worst frame 27 ms. `a` is there if a venue's
  machine disagrees.
- Nothing uses `Math.random`, so the drawing is byte-identical on every machine
  and every reload.
- The v7 information-theory deck is untouched at `../slides/`.
