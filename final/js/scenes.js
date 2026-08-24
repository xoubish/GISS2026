/* ============================================================================
   scenes.js — THE SCRIPT (final deck)
   ----------------------------------------------------------------------------
   This is the file to edit. Everything else is machinery (copied unchanged
   from the retired prototype; see ../old/spatial/README.md for how it works).

   THE SPINE — revised 2026-08-23 (was twelve; the bad/good-answer scene
   and the separate table scene were absorbed by scenes 3–5):

     1  opening        Sisyphus drawing, GIPS framing, AI/philosophy line
     2  myth           the boulder, retold in one breath
     3  why-sisyphus   inference & optimization, p(world | data), mini table
     4  loop           question → ruler → data → compression → inference
                       → answer → good enough? — plus the two branches
     5  three-systems  THE BIG TABLE: brain · model · science, row by row
     6  info           distance, sampling, entropy/surprise/KL/Fisher,
                       which observation teaches most
     7  example-person a person you just met, walking the table
     8  example-jaisp  enhancement family → foundation bet → JAISP
                       astrometry → the field had moved
     9  philosophy     existential/rational/absurd as rulers you carry;
                       die on the hill, die on the slope
     10 return         Sisyphus takes a break, the ball comes back,
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
      plates: [{
        src: 'assets/opening.png', ar: 1666 / 1200, mask: 1,
        at: [0.655, 0.46], w: 1180,
        alt: 'Sisyphus pushing the boulder up the slope',
      }],
      text: [
        {
          id: 'title', at: [0.055, 0.115], w: 640, cls: 'titleblock',
          html:
            '<p class="kicker">GIPS 2026</p>' +
            '<h1>Sisyphus,<br>Optimizing in a<br>Dynamic Universe</h1>' +
            '<p class="byline">Shoubaneh Hemmati (Caltech/IPAC)</p>',
        },
      ],
      notes:
        'GIPS framing · AI/philosophy line · promise: Sisyphus, and all I ' +
        'do is his story.',
    },

    /* ========================================================= 2 · MYTH == */
    {
      id: 'myth',
      name: 'Myth',
      camera: { x: 2410, y: -2100, z: 1.3 },
      enter: { dur: 2100 },
      set: { far: 1, rock: 1, mythfig: 1 },
      steps: [
        {
          set: { myth: 0.78 }, anim: { myth: 15000 },
          notes:
            'He climbs while you retell the myth — about fifteen seconds of ' +
            'push. If you talk longer he holds near the crest; he never ' +
            'reaches it. Press → when you say the boulder rolls back.',
        },
        {
          set: { myth: 1 }, anim: { myth: 3800 },
          notes: 'The fall. Let it land before speaking again.',
        },
        {
          notes: 'The bridge to the whole talk: pushing toward an optimum ' +
            'is an optimization. Gradient ascent, if you may.',
        },
      ],
      text: [
        {
          id: 'myth-title', at: [0.05, 0.075], w: 640, cls: 'scenehead',
          html: '<p class="kicker">The myth</p><p class="scenetitle">Sisyphus</p>',
        },
        {
          id: 'myth-1', at: [0.05, 0.21], w: 560, cls: 'aside lead',
          html: '<p>Condemned by the gods to push a boulder up a hill ' +
            'for eternity.</p>',
        },
        {
          id: 'myth-2', at: [0.05, 0.35], w: 560, cls: 'aside lead', from: 1,
          html: '<p>— only for it to roll back, each time, as he nears ' +
            'the top.</p>',
        },
        {
          id: 'myth-3', at: [0.05, 0.54], w: 560, cls: 'aside lead', from: 2,
          html: '<p><b>Sisyphus is solving an optimization problem.</b></p>' +
            '<p>(Gradient ascent — or descent, if you flip the landscape.)</p>',
        },
      ],
      notes:
        'The living pen Sisyphus takes over from the title drawing: the ' +
        'climb runs in real time, the fall is on your keypress, the boulder ' +
        'settles in the bowl below and stays there.',
    },

    /* ================================================ 3 · WHY SISYPHUS == */
    {
      id: 'why-sisyphus',
      name: 'Why we are Sisyphus',
      camera() { const z = 4.2; return { x: 2788, y: S.anchorY(-2360, 0.55, z), z }; },
      enter: { dur: 2000 },
      set: { far: 1, rock: 1, sitfig: 1 },
      steps: [
        {
          notes:
            'He sits on the summit he never reached, cup in hand. Speak ' +
            'the drink hook — even on a break, the loop runs — the words ' +
            'stay off screen; the table carries "another drink?" later.',
        },
        {
          notes:
            'Optimization is the mechanical half: align the model with ' +
            'the data, descend the error surface.',
        },
        {
          notes:
            'The seed of the big table: the same pair runs in a brain, in ' +
            'ML and astronomy, and in science as a community. Gesture at ' +
            'each column and move — the full table comes later.',
        },
      ],
      text: [
        {
          id: 'why-head', at: [0.05, 0.07], w: 720, cls: 'scenehead',
          html: '<p class="kicker">Why we are Sisyphus</p>' +
            '<p class="scenetitle">Inference &amp; optimization</p>',
        },
        {
          id: 'why-lead', at: [0.05, 0.24], w: 580, cls: 'aside lead',
          html: '<p>Almost every decision we make has his shape: a guess at ' +
            'the world, then a push toward better.</p>',
        },
        {
          id: 'why-inf', at: [0.05, 0.37], w: 560, cls: 'aside lead',
          html: '<p><b>Inference</b> — maintaining a model of reality from ' +
            'incomplete, noisy observations: p(world&thinsp;|&thinsp;data).</p>',
        },
        {
          id: 'why-opt', at: [0.05, 0.51], w: 560, cls: 'aside lead', from: 1,
          html: '<p><b>Optimization</b> — the mechanical part: align the ' +
            'model with the data. Descend the error surface.</p>',
        },
        {
          id: 'why-table', at: [0.05, 0.66], w: 760, cls: 'mini-table', from: 2,
          html: '<div class="cols">' +
            '<div><h5>a brain</h5><p>Do I like this person?</p>' +
            '<p>Should I have another drink?</p></div>' +
            '<div><h5>an AI / model</h5><p>Is this a cat or a dog?</p>' +
            '<p>What is the redshift of this galaxy?</p></div>' +
            '<div><h5>science / astro</h5><p>Reionization — by AGNs or ' +
            'stars?</p><p>General Relativity, or modified gravity?</p></div>' +
            '</div>',
        },
      ],
      notes:
        'Sisyphus on his break, and the two words of the talk defined. The ' +
        'table is the seed the big table (scene 7) grows out of.',
    },

    /* ========================================================= 4 · LOOP == */
    {
      id: 'loop',
      name: 'The loop',
      camera: { x: 2400, y: -2698, z: 1.0 },
      enter: { dur: 2200 },
      set: { far: 0.15, rock: 0.45, line: 0.5, leaner: 1 },
      steps: [
        {
          set: { loop1: 1 },
          notes:
            'Every lap starts with a question; the question decides what ' +
            'matters — and that choice is the ruler.',
        },
        {
          set: { loop2: 1 },
          notes:
            'Through the ruler, data. Too much to carry, so compress — ' +
            'then infer.',
        },
        {
          set: { loop3: 1 },
          notes:
            'An answer comes back, and the one judgment with no arrow of ' +
            'its own: good enough? The dashed line is the lap renewing.',
        },
        {
          notes:
            'Branch one. The 42 stays small on screen — it pays off later.',
        },
        {
          notes:
            'Branch two: die on that hilltop, or ask the next question.',
        },
      ],
      text: [
        {
          id: 'loop-head', at: [0.055, 0.07], w: 500, cls: 'scenehead',
          html: '<p class="kicker">The loop</p>',
        },
        {
          id: 'loop-b1', at: [0.25, 0.78], w: 880, cls: 'aside lead', from: 3,
          html: '<p><b>Not good enough?</b> <span style="font-size:17px;' +
            'color:var(--muted)">(42)</span> — debug the pipeline: the ' +
            'ruler, the data, the compression, the model.</p>',
        },
        {
          id: 'loop-b2', at: [0.25, 0.87], w: 880, cls: 'aside lead', from: 4,
          html: '<p><b>Good enough?</b> Stop — die on that hilltop. Or ask ' +
            'the next question.</p>',
        },
      ],
      notes:
        'The whole talk on one screen: the cycle from the handwritten notes, ' +
        'drawn in the sky, with Sisyphus leaning on the edge of the slide ' +
        'watching it. Everything after this scene is a zoom into one of ' +
        'these stations.',
    },

    /* ============================== 5 · THREE SYSTEMS — THE BIG TABLE == */
    {
      id: 'three-systems',
      name: 'Three systems',
      camera: { x: 800, y: -2698, z: 1.0 },
      enter: { dur: 2300 },
      set: { far: 0.12, rock: 0.35, line: 0.4, tablebg: 1 },
      steps: [
        {
          notes:
            'The whole table at once — name the three columns, promise the ' +
            'walk down the rows, do not read anything yet.',
        },
        {
          camera: { x: 758, y: -2895, z: 1.8 },
          notes:
            'The loss. Biology and loss aversion — prospect theory — for ' +
            'the brain; a handcrafted mathematical loss for the model; ' +
            'community consensus and Occam’s razor for science.',
        },
        {
          camera: { x: 758, y: -2807, z: 1.8 },
          notes:
            'The ruler — biased and bandwidth-limited everywhere. Senses ' +
            'and attention; sensors, pixel grids, tokenizers; telescopes, ' +
            'bandpasses, spectrographs.',
        },
        {
          camera: { x: 758, y: -2719, z: 1.8 },
          notes:
            'The data. A serial, irreversible sensory stream; fixed, ' +
            're-shuffled batches in memory; archived surveys of a ' +
            'non-re-runnable universe.',
        },
        {
          camera: { x: 758, y: -2631, z: 1.8 },
          notes:
            'The compression. Synaptic weights and cortical latent spaces; ' +
            'latent embeddings and bottlenecks; physical laws and ' +
            'cosmological parameters.',
        },
        {
          camera: { x: 758, y: -2543, z: 1.8 },
          notes:
            'The learning signal. Prediction error — dopaminergic RPE, ' +
            'surprise; analytical gradients via backprop; empirical ' +
            'anomalies and measurement tension.',
        },
        {
          camera: { x: 758, y: -2455, z: 1.8 },
          notes:
            'Can it restart? The brain cannot — synaptic history is ' +
            'irreversible. The model can — re-seed, wipe, retrain. Science ' +
            'partially — paradigm shifts are slow and expensive.',
        },
        {
          camera: { x: 758, y: -2366, z: 1.8 },
          notes:
            'Who audits the loop? Evolution; we do, with all our proxy ' +
            'blind spots; peer review and replication — slow, and noisy.',
        },
        {
          camera: { x: 800, y: -2680, z: 0.90 },
          notes:
            'Pull back. The implementations look completely different, but ' +
            'every one requires an objective, a bandwidth-limited ruler, a ' +
            'compressed representation, and a surprise signal when reality ' +
            'does not match the model. The moment you answer, the landscape ' +
            'shifts — and Sisyphus walks back down the hill.',
        },
      ],
      text: [
        {
          id: 'ts-head', at: [0.055, 0.055], w: 500, cls: 'scenehead',
          html: '<p class="kicker">Three systems, one loop</p>',
        },
        {
          id: 'ts-cols', at: [0.205, 0.150], w: 860, cls: 'bigtable head',
          html: '<h6>dimension</h6><h6>brain</h6><h6>model / AI</h6>' +
            '<h6>science as community</h6>',
        },
        {
          id: 'ts-r1', at: [0.205, 0.245], w: 860, cls: 'bigtable row',
          html: '<h6>The loss</h6><p>Biology &amp; loss aversion (prospect ' +
            'theory)</p><p>Handcrafted mathematical loss</p><p>Community ' +
            'consensus &amp; Occam’s razor</p>',
        },
        {
          id: 'ts-r2', at: [0.205, 0.343], w: 860, cls: 'bigtable row',
          html: '<h6>The ruler</h6><p>Senses &amp; attention mechanisms</p>' +
            '<p>Sensors, pixel grids &amp; tokenizers</p><p>Telescopes, ' +
            'bandpasses, spectrographs…</p>',
        },
        {
          id: 'ts-r3', at: [0.205, 0.441], w: 860, cls: 'bigtable row',
          html: '<h6>The data</h6><p>Serial, irreversible sensory stream</p>' +
            '<p>Fixed, re-shuffled batches in memory</p><p>Archived surveys; ' +
            'a non-re-runnable universe</p>',
        },
        {
          id: 'ts-r4', at: [0.205, 0.539], w: 860, cls: 'bigtable row',
          html: '<h6>The compression</h6><p>Synaptic weights &amp; cortical ' +
            'latent spaces</p><p>Latent embeddings &amp; bottlenecks</p>' +
            '<p>Physical laws &amp; cosmological parameters</p>',
        },
        {
          id: 'ts-r5', at: [0.205, 0.637], w: 860, cls: 'bigtable row',
          html: '<h6>The learning signal</h6><p>Prediction error ' +
            '(dopaminergic RPE, surprise)</p><p>Analytical gradients via ' +
            'backpropagation</p><p>Empirical anomalies &amp; measurement ' +
            'tension</p>',
        },
        {
          id: 'ts-r6', at: [0.205, 0.735], w: 860, cls: 'bigtable row',
          html: '<h6>Can it restart?</h6><p>No — irreversible synaptic ' +
            'history</p><p>Yes — re-seed, wipe weights, retrain</p>' +
            '<p>Partially — paradigm shifts are slow &amp; expensive</p>',
        },
        {
          id: 'ts-r7', at: [0.205, 0.833], w: 860, cls: 'bigtable row',
          html: '<h6>Who audits the loop?</h6><p>Evolution; hardwired ' +
            'biology</p><p>We do — with all our proxy blind spots</p>' +
            '<p>Peer review &amp; replication (slow and noisy)</p>',
        },
        {
          id: 'ts-close', at: [0.14, 0.875], w: 1200, cls: 'aside lead', from: 8,
          html: '<p>Different implementations — the same optimization ' +
            'topology. The moment you answer, the landscape shifts, and ' +
            'Sisyphus walks back down.</p>',
        },
      ],
      notes:
        'The heart of the comparison: the whole table, then a camera visit ' +
        'to each row, then the pull-back. 12-minute cut: walk rows 1, 5 and ' +
        '7 only — the rest stay readable on the wide view.',
    },

    /* ========================================================= 6 · INFO == */
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

    /* =============================================== 7 · EXAMPLE — PERSON == */
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

    /* ================================================ 8 · EXAMPLE — JAISP == */
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

    /* ==================================================== 9 · PHILOSOPHY == */
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

    /* ======================================================= 10 · RETURN == */
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
    mythfig: 0, myth: 0, sitfig: 0,
    loop1: 0, loop2: 0, loop3: 0, leaner: 0, tablebg: 0,
    pusher: 0, climber: 0, climber2: 0,
  };
})();
