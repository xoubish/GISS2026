/* ============================================================================
   scenes.js — THE SCRIPT (final deck)
   ----------------------------------------------------------------------------
   This is the file to edit. Everything else is machinery (copied unchanged
   from the retired prototype; see ../old/spatial/README.md for how it works).

   THE FROZEN SPINE — twelve scenes, decided 2026-08-23:

     1  opening        Sisyphus drawing, GIPS framing, AI/philosophy line
     2  myth           the boulder, retold in one breath
     3  why-sisyphus   optimization & inference, p(world | data)
     4  loop           question → ruler → data → compression → inference
                       → answer → good enough?
     5  three-systems  brain · model · science community
     6  answer         42; bad → the bug can be anywhere in the pipeline;
                       good → stop, or next mountain
     7  table          sky scene: three columns × the loop's rows
     8  info           distance, sampling, entropy/surprise/KL/Fisher,
                       which observation teaches most
     9  example-person a person you just met, walking the table
     10 example-jaisp  enhancement family → foundation bet → JAISP
                       astrometry → the field had moved
     11 philosophy     existential/rational/absurd as rulers you carry;
                       die on the hill, die on the slope
     12 return         Sisyphus takes a break, the ball comes back,
                       one must imagine Sisyphus happy

   THE GRAMMAR — altitude = abstraction. Concrete things happen on the
   ground (the boulder, 42 settling, soundings, the examples). Abstract
   things happen in the sky with the ridgeline as a low horizon (the table,
   the philosophy). The camera height means something.

   REGISTER — decided scene by scene, on screen, with the speaker. Some
   formulas earn a place; nothing is assumed.

   Every scene below is a STUB: a name, a provisional camera, a one-line
   note. Cameras get tuned when each scene is built. Decisions already
   taken for a scene are recorded in its notes as they are made.
   ========================================================================= */
(function () {
  const S = (window.SIS = window.SIS || {});

  /* Put a world y at a given height in the frame (0 = top, 1 = bottom). */
  S.anchorY = (y, frac, z) => y - ((frac - 0.5) * 900) / z;
  S.anchorX = (x, frac, z) => x - ((frac - 0.5) * 1600) / z;

  const NOTCH = 2202;   // x of the basin the optimizer settles into
  const G = (x) => S.ground(x);

  S.SCENES = [
    /* ====================================================== 1 · OPENING == */
    {
      id: 'opening',
      name: 'Opening',
      camera: { x: 1760, y: -1560, z: 0.60 },
      enter: { dur: 1600 },
      set: { far: 1, rock: 1 },
      notes:
        'STUB. Sisyphus drawing, title, GIPS framing, the AI-and-philosophy ' +
        'line. Not built yet.',
    },

    /* ========================================================= 2 · MYTH == */
    {
      id: 'myth',
      name: 'Myth',
      camera: { x: 2130, y: -1830, z: 1.5 },
      enter: { dur: 2100 },
      set: { far: 1, rock: 1 },
      notes:
        'STUB. The boulder retold in one breath — up the hill, rolls back ' +
        'near the top, for eternity. Not built yet.',
    },

    /* ================================================ 3 · WHY SISYPHUS == */
    {
      id: 'why-sisyphus',
      name: 'Why we are Sisyphus',
      camera() { const z = 2.6; return { x: 2170, y: S.anchorY(-1800, 0.66, z), z }; },
      enter: { dur: 1800 },
      set: { far: 1, rock: 1 },
      notes:
        'STUB. Moving on a hill toward an optimum is optimization; ' +
        'maintaining a model of reality from incomplete, noisy observations ' +
        'is inference — p(world | data). Not built yet.',
    },

    /* ========================================================= 4 · LOOP == */
    {
      id: 'loop',
      name: 'The loop',
      camera() { const z = 3.8; return { x: 2185, y: S.anchorY(-1782, 0.55, z), z }; },
      enter: { dur: 1900 },
      set: { far: 0.5, rock: 0.85 },
      notes:
        'STUB. Question → what matters (the ruler) → data → compression → ' +
        'inference → answer → good enough? Drawn on the ground. Not built yet.',
    },

    /* ================================================ 5 · THREE SYSTEMS == */
    {
      id: 'three-systems',
      name: 'Three systems',
      camera() { const z = 2.1; return { x: 2200, y: S.anchorY(-1790, 0.62, z), z }; },
      enter: { dur: 1800 },
      set: { far: 0.6, rock: 0.75 },
      notes:
        'STUB. Brain, model, science community — the same loop at three ' +
        'scales. Not built yet.',
    },

    /* ======================================================= 6 · ANSWER == */
    {
      id: 'answer',
      name: 'Bad vs good answer',
      camera() { const z = 11; return { x: NOTCH + 2, y: S.anchorY(G(NOTCH), 0.72, z), z }; },
      enter: { dur: 1400 },
      set: { rock: 0.55 },
      notes:
        'STUB. 42, played straight (no 6×7 reveal anywhere — decided). Bad ' +
        'answer → the bug can be at any station of the pipeline (the fork ' +
        'lives here). Good answer → stop, or the summit shows the next ' +
        'mountain. Not built yet.',
    },

    /* ======================================================== 7 · TABLE == */
    {
      id: 'table',
      name: 'The big table',
      camera() { const z = 0.8; return { x: 2450, y: S.anchorY(G(2450), 0.88, z), z }; },
      enter: { dur: 2200 },
      set: { far: 1, rock: 1 },
      notes:
        'STUB. Sky scene — ridgeline as a low horizon, the three-system ' +
        'table above it: the loop\'s rows × brain / model / science. ' +
        'Not built yet.',
    },

    /* ========================================================= 8 · INFO == */
    {
      id: 'info',
      name: 'Information theory',
      camera() { const z = 4.4; return { x: NOTCH, y: S.anchorY(-1782, 0.5, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.18 },
      notes:
        'STUB. Distance and sampling; entropy, surprise, KL, Fisher; which ' +
        'observation teaches the most (experimental design lives here — ' +
        'decided). Not built yet.',
    },

    /* =============================================== 9 · EXAMPLE — PERSON == */
    {
      id: 'example-person',
      name: 'Example — a person',
      camera() { const z = 5.0; return { x: 2185, y: S.anchorY(-1780, 0.58, z), z }; },
      enter: { dur: 1600 },
      set: { rock: 0.25 },
      notes:
        'STUB. Getting to know someone new, walking the table\'s rows. ' +
        'Not built yet.',
    },

    /* ================================================ 10 · EXAMPLE — JAISP == */
    {
      id: 'example-jaisp',
      name: 'Example — JAISP',
      camera: { x: 2350, y: -2400, z: 1.0 },
      enter: { dur: 2200 },
      set: { far: 1, rock: 1 },
      notes:
        'STUB. Walking the same rows: the enhancement family (one loss per ' +
        'question) → cut the compression cost with a foundation → JAISP ' +
        'astrometry, 50 → 14–17 mas → and the concordance field: new, ' +
        'better data, and the field had moved. May split into two scenes ' +
        'when built — flagged. Not built yet.',
    },

    /* =================================================== 11 · PHILOSOPHY == */
    {
      id: 'philosophy',
      name: 'Philosophy',
      camera: { x: 2760, y: -2150, z: 0.85 },
      enter: { dur: 2200 },
      set: { far: 1, rock: 1 },
      notes:
        'STUB. Existential, rational, absurd — rulers you carry; a ' +
        'different objective for a different question. Die on the hill, ' +
        'die on the slope. Not built yet.',
    },

    /* ======================================================= 12 · RETURN == */
    {
      id: 'return',
      name: 'Return',
      camera: { x: 1760, y: -1560, z: 0.60 },
      enter: { dur: 3000, ease: 'slow' },
      set: { far: 1, rock: 1 },
      notes:
        'STUB. The opening camera again. Sisyphus takes a break, the ball ' +
        'comes back — one must imagine Sisyphus happy. Not built yet.',
    },
  ];

  /* Fallback values for every animatable layer, so a scene only has to name
     what it changes. (Layer list inherited from the spatial engine; unused
     layers stay dark until a scene lights them.)                            */
  S.DEFAULT_SET = {
    far: 1, rock: 1, line: 1, axes: 0, curmark: 0, curve: 0, ruler: 0,
    humanrule: 0, cands: 0, ball: 0, newland: 0, marks: 0, m: 0, roll: 1,
    sound: 0, cyc1: 0, cyc2: 0, cyc3: 0, cyc4: 0,
    approx1: 0, approx2: 0, approx3: 0,
    entropy: 0, surprise: 0, kl: 0, fisher: 0,
    fork1: 0, fork2: 0, fork3: 0,
    combR: 0, combE: 0, combJ: 0, latent: 0,
    astro1: 0, astro2: 0, shift: 0, here: 0, ends: 0,
    pusher: 0, climber: 0, climber2: 0,
  };
})();
