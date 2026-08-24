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
          html: '<p class="scenetitle">The Myth</p>',
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
          html: '<p>Gradient ascent, or descent with a flipped hill: ' +
            '<b>Sisyphus is solving an optimization problem.</b></p>',
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
            'the claim plainly: almost every decision has his shape — a ' +
            'guess at the world, then a push toward better.',
        },
        {
          notes:
            'The seed of the big table: start with the drink because it is ' +
            'in the drawing, then the person. The same pair runs in a ' +
            'brain, in ML and astronomy, and in science as a community.',
        },
        {
          notes:
            'Inference: maintaining a model of reality from incomplete, ' +
            'noisy observations. This is the guess-at-the-world half.',
        },
        {
          notes:
            'Optimization is the mechanical half: align the model with ' +
            'the data, descend the error surface. This is the push toward ' +
            'better.',
        },
      ],
      text: [
        {
          id: 'why-head', at: [0.05, 0.07], w: 720, cls: 'scenehead',
          html: '<p class="kicker">Inference &amp; optimization</p>' +
            '<p class="scenetitle">Why We Are Sisyphus</p>',
        },
        {
          id: 'why-lead', at: [0.05, 0.24], w: 580, cls: 'aside lead',
          html: '<p>Almost every decision we make has his shape: a guess at ' +
            'the world, then a push toward better.</p>',
        },
        {
          id: 'why-table', at: [0.05, 0.42], w: 760, cls: 'mini-table', from: 1,
          html: '<div class="cols">' +
            '<div><h5>a brain</h5><p>Should I have another drink?</p>' +
            '<p>Do I like this person?</p></div>' +
            '<div><h5>an AI / model</h5><p>Is this a cat or a dog?</p>' +
            '<p>What is the redshift of this galaxy?</p></div>' +
            '<div><h5>science / astro</h5><p>Reionization — by AGNs or ' +
            'stars?</p><p>General Relativity, or modified gravity?</p></div>' +
            '</div>',
        },
        {
          id: 'why-inf', at: [0.05, 0.67], w: 760, cls: 'aside compact', from: 2,
          html: '<p><b>Inference</b> — maintaining a model of reality from ' +
            'incomplete, noisy observations: p(world&thinsp;|&thinsp;data).</p>',
        },
        {
          id: 'why-opt', at: [0.05, 0.78], w: 760, cls: 'aside compact', from: 3,
          html: '<p><b>Optimization</b> — the mechanical part: align the ' +
            'model with the data. Descend the error surface.</p>',
        },
      ],
      notes:
        'Sisyphus on his break, and the two words of the talk defined. The ' +
        'table is the seed the big table (scene 5) grows out of.',
    },

    /* ========================================================= 4 · LOOP == */
    {
      id: 'loop',
      name: 'The loop',
      camera: { x: 2400, y: -2698, z: 1.0 },
      enter: { dur: 2200 },
      set: {
        far: 0.15, rock: 0.45, line: 0.5, leaner: 1,
        loop1: 1, loop2: 1, loop3: 1,
      },
      steps: [
        {
          notes:
            'The full loop is already on screen. Walk it once: question, ' +
            'what matters, ruler, data, compression, inference, answer, ' +
            'good enough?',
        },
        {
          notes:
            'Branch one. Not good enough? The absurd answer, 42, means the ' +
            'pipeline failed somewhere; debug the ruler, the data, the ' +
            'compression, the model.',
        },
        {
          notes:
            'Branch two. Good enough? Stop, or ask the next question. This ' +
            'is the whole talk: failure sends you inside the pipeline; ' +
            'success ends locally or restarts the loop.',
        },
      ],
      text: [
        {
          id: 'loop-head', at: [0.055, 0.07], w: 500, cls: 'scenehead',
          html: '<p class="kicker">The loop</p>',
        },
        {
          id: 'loop-b1', at: [0.24, 0.70], w: 900, cls: 'aside lead branch-list', from: 1,
          html: '<ul><li><b>Not good enough?</b> 42 ...' +
            '<ul><li>debug the pipeline: the ruler, the data, the ' +
            'compression, ...</li></ul></li></ul>',
        },
        {
          id: 'loop-b2', at: [0.24, 0.80], w: 900, cls: 'aside lead branch-list', from: 2,
          html: '<ul><li><b>Good Enough?</b>' +
            '<ul><li>Stop</li><li>or ask the next question</li></ul></li></ul>',
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
            'The loss. Biology, culture and loss aversion for the brain; ' +
            'a handcrafted mathematical loss for the model; community ' +
            'consensus and Occam’s razor for science.',
        },
        {
          camera: { x: 758, y: -2807, z: 1.8 },
          notes:
            'The ruler — biased and bandwidth-limited everywhere. Senses ' +
            'and attention extended by instruments; sensors, pixel grids, ' +
            'tokenizers; telescopes, bandpasses, spectrographs. Gamma rays ' +
            'become visible to the brain through tools, screens and ' +
            'conventions.',
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
            'Pull back. Let the table sit as the whole comparison. The ' +
            'implementations look different; the loop is recognizably the ' +
            'same.',
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
          html: '<h6>The loss</h6><p>Biology, culture &amp; loss aversion</p>' +
            '<p>Handcrafted mathematical loss</p><p>Community ' +
            'consensus &amp; Occam’s razor</p>',
        },
        {
          id: 'ts-r2', at: [0.205, 0.343], w: 860, cls: 'bigtable row',
          html: '<h6>The ruler</h6><p>Senses, attention &amp; instruments</p>' +
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
      camera() { const z = 4.4; return { x: NOTCH, y: S.anchorY(-1782, 0.62, z), z }; },
      enter: { dur: 2800, ease: 'slow' },
      set: { far: 0.5, rock: 0.35, line: 0.35, roll: 1 },
      steps: [
        {
          set: { entropy: 1 },
          notes:
            'Start with Shannon\'s practical question: if observations ' +
            'arrive as a stream, how unpredictable is the next one? X is ' +
            'the next observation; p(X) is what your current model expects ' +
            'to see; entropy H(X) is average surprise. Same family as stat ' +
            'mech entropy, but this is the message/observation version. ' +
            'Low entropy means a dimension is almost constant, so it cannot ' +
            'carry much. High entropy means more possible variation, but ' +
            'that variation could still be noise. Entropy tells capacity, ' +
            'not usefulness.',
        },
        {
          set: { entropy: 0.35, fisher: 1 },
          notes:
            'THE RULER. Fisher is about θ, not about volume: the same basin ' +
            'is flat under one ruler and steep under another. And the hard ' +
            'sentence: where Fisher is zero — a wavelength, a conversational ' +
            'cue — no network and no brain downstream can ever recover it.',
        },
        {
          set: { fisher: 0.3, approx2: 1, line: 0.15, sound: 0.55 },
          notes:
            'THE COMPRESSION, first lesson. Five numbers, evenly spaced — a ' +
            'perfectly reasonable summary, and the basin is simply not in ' +
            'it. The ring is where this summary thinks the minimum is. ' +
            'Nothing was wrong with the data.',
        },
        {
          set: { approx2: 0, approx3: 1 },
          notes:
            'Same budget, placed where the curvature lives — and the basin ' +
            'comes back. No new observation. Sampling is a ruler too: what ' +
            'you keep decides what exists.',
        },
        {
          set: { approx3: 0.25, surprise: 1, line: 0.35, sound: 1 },
          notes:
            'THE LEARNING SIGNAL. One datum, far from anything the model ' +
            'predicts: −log p(x). Prediction error in a brain, the gradient ' +
            'in a model, the anomaly in a field — the same engine, across ' +
            'all three columns of the table.',
        },
        {
          set: { surprise: 0.35, kl: 1, entropy: 0.85 },
          notes:
            'THE UPDATE. Information gain is the bracket closing: ' +
            'D_KL(posterior ‖ prior). Two cautions, out loud: low entropy ' +
            'is not truth, and surprise is not gain — a bizarre datum can ' +
            'teach you nothing about θ.',
        },
        {
          camera: { x: 2255, y: -1839, z: 2.6 },
          set: {
            fork1: 1, fork2: 1, fork3: 1,
            kl: 0.25, entropy: 0.2, surprise: 0.25, sound: 0.5, line: 0.3,
          },
          notes:
            'FINDING THE BOTTLENECK — the three trails out of the basin. ' +
            'Check in order of cost. Still surprised after convergence → ' +
            'the loss or model: exchange the landscape (left trail). Raw ' +
            'beats the summary → the compression: re-read the same data ' +
            '(the trail along the surface). The Cramér–Rao bound itself too ' +
            'wide → the data: over the crest for more (right trail). Say ' +
            'the sting: the reflex is always "more data" — it is the third ' +
            'check, not the first.',
        },
        {
          camera() { const z = 1.9; return { x: 2300, y: S.anchorY(-1906, 0.5, z), z }; },
          set: {
            climber: 1, here: 1,
            fork1: 0.3, fork2: 0.3, fork3: 0.45, kl: 0, surprise: 0, sound: 0.6,
          },
          notes:
            'THE NEXT QUESTION. And if it truly is the data — experimental ' +
            'design: which observation do I expect to teach me the most? ' +
            'Rank them, buy that one. A little resolution can beat a great ' +
            'many photons. If asked: EIG(d) = E_y D_KL[p(θ|y,d) ‖ p(θ)].',
        },
      ],
      text: [
        {
          id: 'in-head', at: [0.05, 0.055], w: 720, cls: 'scenehead', to: 5,
          html: '<p class="kicker">Information theory</p>' +
            '<p class="scenetitle">Statistics of the Loop</p>',
        },
        {
          id: 'in-1', at: [0.05, 0.24], w: 540, cls: 'aside lead', to: 0,
          html: '<p><b>Shannon’s question: how unpredictable is the next ' +
            'observation?</b></p>' +
            '<p>X is the stream of observations. p(X) is what we expect to ' +
            'see. Entropy, H(X), is average surprise:</p>' +
            '<p>H(X) = E[−log p(X)] = −Σ p(x) log p(x).</p>' +
            '<p>Low H: almost constant. High H: more possible variation. ' +
            'But entropy tells capacity, not usefulness.</p>',
        },
        {
          id: 'in-2', at: [0.05, 0.24], w: 540, cls: 'aside lead', from: 1, to: 1,
          html: '<p><b>The ruler — Fisher information, I(θ).</b> How much ' +
            'of what I measure is about θ: the same basin, flat under one ' +
            'ruler, steep under another. Where Fisher is zero, nothing ' +
            'downstream can ever recover it.</p>' +
            '<p>Its test: the Cramér–Rao bound, 1/I(θ) — the best any ' +
            'estimator can ever do through this instrument.</p>',
        },
        {
          id: 'in-3', at: [0.05, 0.24], w: 540, cls: 'aside lead', from: 2, to: 2,
          html: '<p><b>The compression — sampling.</b> Five numbers, evenly ' +
            'spaced: the basin is simply not in them.</p>' +
            '<p>Nothing was wrong with the data.</p>',
        },
        {
          id: 'in-4', at: [0.05, 0.24], w: 540, cls: 'aside lead', from: 3, to: 3,
          html: '<p><b>The same budget, placed where the curvature lives</b> ' +
            '— and the basin comes back. Sampling is a ruler too.</p>' +
            '<p>Its test: does T(D) keep what D knew about θ — ' +
            'I(T(D);&thinsp;θ) against I(D;&thinsp;θ)?</p>',
        },
        {
          id: 'in-5', at: [0.05, 0.24], w: 540, cls: 'aside lead', from: 4, to: 4,
          html: '<p><b>The learning signal — surprise, −log p(x).</b> The ' +
            'datum nothing predicted. Prediction error, gradient, anomaly: ' +
            'the same engine in all three columns.</p>' +
            '<p>Its test: converged, yet still surprised — residuals with ' +
            'structure the fit cannot explain. The optimizer is done, and ' +
            'wrong.</p>',
        },
        {
          id: 'in-6', at: [0.05, 0.24], w: 540, cls: 'aside lead', from: 5, to: 5,
          html: '<p><b>The update — information gain, D<sub>KL</sub>.</b> ' +
            'How much did the bracket close?</p>' +
            '<p>Surprise is not gain — and when each new datum barely moves ' +
            'the posterior, this data, under this compression, is spent.</p>',
        },
        {
          id: 'in-diag', at: [0.05, 0.10], w: 620, cls: 'aside lead', from: 6, to: 6,
          html: '<p><b>Finding the bottleneck.</b> Three checks, cheapest ' +
            'first:</p>' +
            '<p><b>Converged but still surprised?</b> The loss or the model. ' +
            'Change the ruler.</p>' +
            '<p><b>Raw data beats your summary?</b> The compression. ' +
            'Recompress — no new observation needed.</p>' +
            '<p><b>The Cramér–Rao bound itself too wide?</b> The data. Only ' +
            'then go buy more.</p>',
        },
        {
          id: 'in-7', at: [0.05, 0.24], w: 560, cls: 'aside lead', from: 7,
          html: '<p><b>The next observation — expected information gain.</b> ' +
            'Rank the observations you could take by what you expect to ' +
            'learn. Buy that one.</p>' +
            '<p>A little resolution can beat a great many photons.</p>',
        },
      ],
      notes:
        'The meat, drawn on the hill instead of written: soundings are the ' +
        'data, clustered versus scattered points are entropy, parabolas ' +
        'are Fisher, knots are the compression, the loud datum is surprise, ' +
        'the closing arrows are gain, and the pull-back to the climber is ' +
        'experimental design. ' +
        '12-minute cut: narrate entropy, Fisher and surprise; step through ' +
        'the two compression beats and the update quickly; give the final ' +
        'two beats one sentence each.',
    },

    /* =============================================== 7 · EXAMPLE — PERSON == */
    {
      id: 'example-person',
      name: 'Example — a person',
      camera() { const z = 5.0; return { x: 2210, y: S.anchorY(-1782, 0.55, z), z }; },
      enter: { dur: 1900 },
      set: { far: 0.6, rock: 0.5, line: 0.35, meetfig: 1, meet: 0.12 },
      steps: [
        {
          notes:
            'The same ground, retold as a person. The question: do I like ' +
            'them? Gesture at the resting boulder — the model you arrive ' +
            'with. Nobody walks in blank: a prior built from every person ' +
            'before them, context, and yes, stereotype — that is what a ' +
            'prior is.',
        },
        {
          set: { sound: 1, rock: 0.35, meet: 0.2 }, anim: { meet: 1600 },
          notes:
            'The stream: words, tone, timing, what they laugh at, how they ' +
            'treat the waiter. Enormous entropy — and most of it noise.',
        },
        {
          set: { combR: 1, sound: 0.25, meet: 0.3 }, anim: { meet: 2600 },
          notes:
            'Distance is resolution. Across a dinner table you sample ' +
            'coarsely — job, manners, small talk. "They seem nice" is one ' +
            'blurred pixel.',
        },
        {
          set: { combE: 1, combR: 0.35, meet: 0.62 }, anim: { meet: 3200 },
          notes:
            'Move closer and the sampling gets finer: shared work, a hard ' +
            'week, a long trip. Kindness separates from politeness — two ' +
            'sources that were one blur. And the optimization is ' +
            'constant: every encounter re-fits the model toward the ' +
            'data. Liking changes with distance because the data does.',
        },
        {
          set: { fisher: 1, combE: 0.3, combR: 0.15 },
          notes:
            'Zero-Fisher data: an hour of small talk is pleasant and ' +
            'carries nothing about the trait you care about. The flat ' +
            'parabola. No volume of it will measure reliability.',
        },
        {
          set: { entropy: 1, kl: 1, fisher: 0.25 },
          notes:
            'Duplicate data: the tenth coffee repeats the ninth. Plenty of ' +
            'observations, no new information — the bracket stops closing. ' +
            'More data is not more information.',
        },
        {
          set: { surprise: 1, entropy: 0.3, kl: 0.25, meet: 0.8 }, anim: { meet: 1800 },
          notes:
            'Then surprise: something the model never predicted. −log p ' +
            'spikes and the picture reorganizes. And sometimes it was not ' +
            'noise — the person moved. People are not stationary; the ' +
            'landscape shifts while you climb it.',
        },
        {
          set: { entropy: 0.9, surprise: 0.3, meet: 0.95 }, anim: { meet: 2800 },
          notes:
            'Good enough? For "another coffee?" — converged long ago. For ' +
            '"trust them with what matters" — that is a different loss, ' +
            'and the same person ranks differently under it; no number ' +
            'of coffees helps; ' +
            'it needs a different observation entirely: responsibility, ' +
            'disagreement, stress. Choosing that encounter is experimental ' +
            'design, about a person — and ethics bound which experiments ' +
            'you may run.',
        },
      ],
      text: [
        {
          id: 'ep-head', at: [0.05, 0.055], w: 720, cls: 'scenehead',
          html: '<p class="kicker">Example one</p>' +
            '<p class="scenetitle">A person you just met</p>',
        },
        {
          id: 'ep-0', at: [0.05, 0.195], w: 540, cls: 'aside lead', to: 0,
          html: '<p><b>Do I like this new person?</b> Nobody walks in ' +
            'blank: you arrive with a model — a prior built from every ' +
            'person before them.</p>',
        },
        {
          id: 'ep-1', at: [0.05, 0.195], w: 540, cls: 'aside lead', from: 1, to: 1,
          html: '<p><b>The data.</b> Words, tone, timing, what they laugh ' +
            'at — an enormous stream, and most of its entropy is noise.</p>',
        },
        {
          id: 'ep-2', at: [0.05, 0.195], w: 540, cls: 'aside lead', from: 2, to: 2,
          html: '<p><b>Distance is resolution.</b> At first you sample ' +
            'coarsely: job, manners, small talk.</p>' +
            '<p>“They seem nice” — one blurred pixel.</p>',
        },
        {
          id: 'ep-3', at: [0.05, 0.195], w: 540, cls: 'aside lead', from: 3, to: 3,
          html: '<p><b>Closer, the picture resolves.</b> Finer sampling ' +
            'separates kindness from politeness — two sources that were ' +
            'one blur.</p>' +
            '<p>Liking changes with distance because the data does — and the ' +
            'fit never stops: every encounter is another step of the ' +
            'optimization.</p>',
        },
        {
          id: 'ep-4', at: [0.05, 0.195], w: 540, cls: 'aside lead', from: 4, to: 4,
          html: '<p><b>Some data carry nothing.</b> An hour of small talk ' +
            'is pleasant — and Fisher-blind to what you care about.</p>' +
            '<p>No amount of it will measure reliability.</p>',
        },
        {
          id: 'ep-5', at: [0.05, 0.195], w: 540, cls: 'aside lead', from: 5, to: 5,
          html: '<p><b>And some data are the same datum again.</b> The ' +
            'tenth coffee repeats the ninth: plenty of observations, no ' +
            'new information.</p>' +
            '<p>The bracket stops closing.</p>',
        },
        {
          id: 'ep-6', at: [0.05, 0.195], w: 540, cls: 'aside lead', from: 6, to: 6,
          html: '<p><b>Then — surprise.</b> Something the model never ' +
            'predicted: −log p spikes, and the picture reorganizes.</p>' +
            '<p>Sometimes it wasn’t noise. The person moved.</p>',
        },
        {
          id: 'ep-7', at: [0.05, 0.195], w: 540, cls: 'aside lead', from: 7,
          html: '<p><b>Good enough?</b> For “another coffee?” — converged ' +
            'long ago. For “trust them with what matters” — a different ' +
            'loss entirely, and no number of coffees helps.</p>' +
            '<p>It needs a different observation: which encounter teaches ' +
            'the most is experimental design, about a person.</p>',
        },
      ],
      notes:
        'The clearest scene by design: the audience has already seen every ' +
        'one of these drawings with statistics captions in scene 6 — now ' +
        'the same pictures get human captions, in the human accent. That ' +
        'rhyme is the thesis. 12-minute cut: beats 2, 3, 6, 7.',
    },

    /* ================================================ 8 · EXAMPLE — JAISP == */
    {
      id: 'example-jaisp',
      name: 'Example — JAISP',
      camera() { const z = 2.3; return { x: 2210, y: S.anchorY(-1790, 0.80, z), z }; },
      enter: { dur: 2200 },
      set: { far: 0.7, rock: 0.6, line: 0.4 },
      steps: [
        {
          notes:
            'The bridge, in one breath: the person resolved because ' +
            'different data saw them differently. Point it at the sky — ' +
            'Rubin, Euclid, WISE, JWST are each a lossy projection of the ' +
            'same reality, at their own distance and resolution.',
        },
        {
          notes:
            'The receipts — say one line each, gesture, move on. Everetts+: ' +
            'Euclid NISP sharpened with what JWST/NIRCam taught, 5× finer ' +
            'sampling. Rezaee+: WISE with Spitzer, 4.6×. Haghjoo+: JWST ' +
            'prism spectra to grating resolution, R 100 → 1000. Each one: ' +
            'one teacher, one student, one loss, one question.',
        },
        {
          notes:
            'The honest problem: it works, and it does not scale. Every ' +
            'new question starts again from raw pixels — the compression ' +
            'cost multiplies with the questions. The general answer: learn ' +
            'the compression once, before you know the question — a ' +
            'foundation — and make every task a small head with its own ' +
            'loss.',
        },
        {
          notes:
            'JAISP. Ten bands, Rubin and Euclid together, one shared ' +
            'latent — self-supervised, each band predicted from the other ' +
            'nine, each instrument at its delivered sampling. About nine ' +
            'million parameters. Detection on held-out sky: 93% complete, ' +
            '94% pure against the published VIS catalogue — and 0.45 mag ' +
            'deeper than one band supports. Say the numbers, not the ' +
            'architecture; the picture is there so nobody takes them on ' +
            'faith.',
        },
        {
          camera() { const z = 8.5; return { x: 2202, y: S.anchorY(G(2199.3), 0.42, z), z }; },
          set: { astro1: 1, astro2: 1, axes: 0.5, line: 1, rock: 0.35 },
          notes:
            'The proof, on the θ axis the talk has been walking — drawn to ' +
            'scale, 1 unit = 2 mas. Raw cross-survey scatter, Rubin against ' +
            'VIS: about 50 mas. A position head reading the frozen latent: ' +
            '14–17 mas; injected sources recovered to 19 mas at S/N = 5 — ' +
            'near the floor the VIS labels themselves set. The latent ' +
            'carried VIS sharpness to everything tied to it.',
        },
        {
          camera() { const z = 6.5; return { x: 2205, y: S.anchorY(-1780, 0.72, z), z }; },
          set: { shift: 1, astro1: 0, astro2: 0, axes: 0.2 },
          anim: { shift: 1600 },
          notes:
            'And then better data arrived. Two independently Gaia-anchored ' +
            'solutions disagree by a coherent 9–10 mas — every arrow points ' +
            'the same way. That is not scatter; the landscape itself had ' +
            'moved. Nobody made a mistake. Say it plainly — this is the ' +
            'title of the talk, measured.',
        },
      ],
      plates: [
        {
          src: 'assets/paper_nisp.png', ar: 728 / 1198, frame: 1, from: 1, to: 2,
          at: [0.16, 0.46], w: 300,
          alt: 'Title page: Euclid deep-learning super-resolution of NISP imaging',
          cap: 'Everetts, Hemmati, et al. — NISP → NIRCam, 5× finer.',
        },
        {
          src: 'assets/paper_wise.png', ar: 1272 / 1608, frame: 1, from: 1, to: 2,
          at: [0.44, 0.445], w: 280,
          alt: 'Title page: enhancing WISE infrared imaging to Spitzer resolution',
          cap: 'Rezaee, Hemmati, et al. — WISE → Spitzer, 4.6× finer.',
        },
        {
          src: 'assets/paper_spectra.png', ar: 1226 / 1546, frame: 1, from: 1, to: 2,
          at: [0.71, 0.46], w: 285,
          alt: 'Title page: physics-informed super-resolution of galaxy spectra',
          cap: 'Haghjoo, Hemmati, et al. — prism → grating, R 100 → 1000.',
        },
        {
          src: 'assets/jaisp_architecture_crop.png', ar: 550 / 1109, frame: 1,
          from: 3, to: 3,
          at: [0.615, 0.42], w: 680,
          alt: 'JAISP architecture: masked-band pretraining and downstream heads',
          cap: 'Ten bands → two-stream stems → one shared latent → detection · ' +
            'astrometry · photometry · shape · redshift — each head its own loss.',
        },
        {
          src: 'assets/astrometry_fig8_crop.png', ar: 525 / 1135, frame: 1,
          from: 4, to: 4,
          at: [0.63, 0.46], w: 860,
          alt: 'Cross-survey offset clouds collapsing from 50 mas to 14-17 mas',
          cap: 'All 790 ECDFS tiles. Dashed: raw classical centroids. Solid: ' +
            'head-corrected — the clouds collapse and re-centre. Right: median ' +
            'offset against S/N.',
        },
      ],
      text: [
        {
          id: 'ej-head', at: [0.05, 0.055], w: 760, cls: 'scenehead',
          html: '<p class="kicker">Example two — JAISP</p>' +
            '<p class="scenetitle">One foundation, many rulers</p>',
        },
        {
          id: 'ej-0', at: [0.05, 0.24], w: 560, cls: 'aside lead', to: 0,
          html: '<p><b>The same lesson, pointed at the sky.</b> Rubin, ' +
            '<em>Euclid</em>, WISE, JWST — every instrument is a lossy ' +
            'projection of one sky, at its own distance and resolution.</p>',
        },
        {
          id: 'ej-1', at: [0.05, 0.19], w: 540, cls: 'aside lead', from: 1, to: 1,
          html: '<p><b>We did it pairwise first.</b> One teacher, one ' +
            'student, one loss per question.</p>',
        },
        {
          id: 'ej-2', at: [0.05, 0.24], w: 560, cls: 'aside lead', from: 2, to: 2,
          html: '<p><b>It works — and it does not scale.</b> Every new ' +
            'question recompresses the sky from scratch.</p>' +
            '<p>So learn the compression <b>once</b>: a foundation — and ' +
            'every task a small head with its own loss.</p>',
        },
        {
          id: 'ej-3', at: [0.05, 0.30], w: 480, cls: 'aside lead', from: 3, to: 3,
          html: '<p><b>JAISP.</b> Ten bands, one shared latent — ' +
            'self-supervised, ≈9M parameters.</p>' +
            '<p>Detection on held-out sky: <b>93% complete, 94% pure</b> — ' +
            'and <b>0.45 mag deeper</b> than one band supports.</p>',
        },
        {
          id: 'ej-4', at: [0.05, 0.10], w: 460, cls: 'aside lead', from: 4, to: 4,
          html: '<p><b>One head, its own loss: astrometry.</b> Raw ' +
            'cross-survey scatter ≈ 50 mas. The head, reading the frozen ' +
            'latent: <b>14–17 mas</b>.</p>' +
            '<p>The latent carried VIS sharpness to everything tied to it.</p>',
        },
        {
          id: 'ej-5', at: [0.05, 0.10], w: 500, cls: 'aside lead', from: 5,
          html: '<p><b>Then better data arrived.</b> Two Gaia-anchored ' +
            'solutions disagree by a coherent <b>9–10 mas</b> — every arrow ' +
            'the same way.</p>' +
            '<p>Not scatter. The landscape itself had moved.</p>',
        },
      ],
      notes:
        'The science payoff: pairwise receipts → the foundation bet → the ' +
        'measured astrometry proof → the concordance field, which is the ' +
        'title of the talk measured, and the hinge into the philosophy. ' +
        '12-minute cut: receipts get twenty seconds together; beats 3–5 are ' +
        'the spine, keep all three.',
    },

    /* ==================================================== 9 · PHILOSOPHY == */
    {
      id: 'philosophy',
      name: 'Philosophy',
      camera: { x: 2450, y: -2860, z: 0.85 },
      enter: { dur: 3000, ease: 'slow' },
      set: { far: 0.25, rock: 1, line: 0.8, sitfig: 1 },
      steps: [
        {
          notes:
            'The long ascent — highest camera of the talk, almost all sky, ' +
            'the summit a speck at the bottom with him still sitting on ' +
            'it. Land the claim: every station of the loop was a choice, ' +
            'and choosing with reasons is philosophy. This is why a ' +
            'philosophy symposium at IPAC is not a joke.',
        },
        {
          notes:
            'The loss is relative — negotiated in committee, encoded in ' +
            'proposals and review panels. Reward a different better and ' +
            'different missions fly, different papers count: science ' +
            'climbs a different mountain. The direction of the field is ' +
            'loss-dependent.',
        },
        {
          notes:
            'The AI scientist, read off the table\'s rows: it restarts; ' +
            'its data re-shuffle; its loss is explicit and optimizable. It ' +
            'will converge, efficiently, on exactly what we asked for — ' +
            'which is the danger. A brain with a muddled objective fails ' +
            'gently; a model with a crisp wrong objective converges ' +
            'precisely. The audit is ours.',
        },
        {
          notes:
            'One grammar: priors, likelihoods, information, surprise — a ' +
            'first impression and a cosmology conjugate the same verbs. ' +
            'Measuring a person is not a metaphor for science; it is the ' +
            'same inference with different nouns.',
        },
        {
          notes:
            'The sting — deliver it dry: after ten meetings we hold a ' +
            'serviceable model of a person and stop. Yet we observe the ' +
            'same galaxy a thousand times, and write the same paper nine ' +
            'hundred. When the posterior stops moving and we keep ' +
            'observing anyway, the loss is speaking — citations, careers, ' +
            'committees — not the data.',
        },
        {
          notes:
            'The rulers you carry: rationalist on questions of consistency, ' +
            'existentialist where deduction runs out and you must own the ' +
            'choice, absurdist when neither resolves. Not inconsistency — ' +
            'a different loss for a different question, and the swing ' +
            'between them is what a healthy updating system looks like. ' +
            '(If asked about the modern/postmodern oscillation by name: ' +
            'metamodernism, Vermeulen & van den Akker — keep it for Q&A, ' +
            'not the slide.)',
        },
        {
          notes:
            'Two ways for a question to end. Die on the hilltop: the ' +
            'answer sufficed; the summit was always local to the question. ' +
            'Die on the slope: the answer keeps improving, the theory ' +
            'stays incomplete, the experiment outlives you. Weinberg\'s ' +
            'Dreams of a Final Theory — say "half in longing, half in ' +
            'mourning" as your phrase about reading him, not as his words.',
        },
      ],
      text: [
        {
          id: 'ph-head', at: [0.05, 0.055], w: 760, cls: 'scenehead',
          html: '<p class="kicker">Philosophy</p>' +
            '<p class="scenetitle">The view from here</p>',
        },
        {
          id: 'ph-0a', at: [0.14, 0.28], w: 1080, cls: 'phrase sm', to: 0,
          html: '<p>Every station of the loop was a choice.</p>',
        },
        {
          id: 'ph-0b', at: [0.14, 0.42], w: 980, cls: 'aside lead', to: 0,
          html: '<p>The data we keep, the ruler we trust, the moment we ' +
            'stop — none of it is given by nature. Choosing with reasons ' +
            'is philosophy, and science runs on it quietly.</p>',
        },
        {
          id: 'ph-1a', at: [0.14, 0.28], w: 1080, cls: 'phrase sm', from: 1, to: 1,
          html: '<p>A relative loss steers an absolute science.</p>',
        },
        {
          id: 'ph-1b', at: [0.14, 0.42], w: 980, cls: 'aside lead', from: 1, to: 1,
          html: '<p><em>Better</em> is negotiated — in panels, proposals, ' +
            'citations. Reward a different better, and different missions ' +
            'fly, different papers count: the field climbs a different ' +
            'mountain.</p>',
        },
        {
          id: 'ph-2a', at: [0.14, 0.28], w: 1080, cls: 'phrase sm', from: 2, to: 2,
          html: '<p>An AI will be a different kind of scientist.</p>',
        },
        {
          id: 'ph-2b', at: [0.14, 0.42], w: 980, cls: 'aside lead', from: 2, to: 2,
          html: '<p>It restarts; its data re-shuffle; its loss is explicit ' +
            '— it will converge, efficiently, on exactly what we asked ' +
            'for.</p>' +
            '<p>A brain fails gently. A model fails precisely. The audit ' +
            'is ours.</p>',
        },
        {
          id: 'ph-3a', at: [0.14, 0.28], w: 1080, cls: 'phrase sm', from: 3, to: 3,
          html: '<p>One grammar, different nouns.</p>',
        },
        {
          id: 'ph-3b', at: [0.14, 0.42], w: 980, cls: 'aside lead', from: 3, to: 3,
          html: '<p>Priors, likelihoods, information, surprise: a first ' +
            'impression and a cosmology conjugate the same verbs. ' +
            'Measuring a person is not a metaphor for science — it is the ' +
            'same inference.</p>',
        },
        {
          id: 'ph-4a', at: [0.14, 0.28], w: 1080, cls: 'phrase sm', from: 4, to: 4,
          html: '<p>The tenth coffee, at field scale.</p>',
        },
        {
          id: 'ph-4b', at: [0.14, 0.42], w: 980, cls: 'aside lead', from: 4, to: 4,
          html: '<p>Ten meetings, and we hold a serviceable model of a ' +
            'person. Yet we observe the same galaxy a thousand times — and ' +
            'write the same paper nine hundred.</p>' +
            '<p>When the posterior stops moving and we keep observing, the ' +
            'loss is speaking, not the data.</p>',
        },
        {
          id: 'ph-5a', at: [0.14, 0.28], w: 1080, cls: 'phrase sm', from: 5, to: 5,
          html: '<p>You carry rulers too.</p>',
        },
        {
          id: 'ph-5b', at: [0.14, 0.42], w: 980, cls: 'aside lead', from: 5, to: 5,
          html: '<p>Rationalist on some questions, existentialist where ' +
            'deduction runs out, absurdist when neither resolves.</p>' +
            '<p>Not inconsistency: a different loss for a different ' +
            'question — and the oscillation is what an updating system ' +
            'looks like.</p>',
        },
        {
          id: 'ph-6a', at: [0.14, 0.28], w: 1080, cls: 'phrase sm', from: 6,
          html: '<p>Two ways for a question to end.</p>',
        },
        {
          id: 'ph-6b', at: [0.14, 0.42], w: 980, cls: 'aside lead', from: 6,
          html: '<p><b>Die on the hilltop</b> — the answer sufficed; the ' +
            'summit was always local to the question.</p>' +
            '<p><b>Die on the slope</b> — the answer keeps improving, the ' +
            'theory stays incomplete, and the experiment outlives you. ' +
            'Weinberg’s <em>Dreams of a Final Theory</em>, read half in ' +
            'longing and half in mourning.</p>',
        },
      ],
      notes:
        'The highest camera of the deck: sky, clouds, one summit tip at the ' +
        'bottom edge with the sitter still on it. One thought per beat, big ' +
        'type, nothing drawn — the words take the paper. 12-minute cut: ' +
        'beats 1, 5, 6 and 7 (choice, the sting, the rulers, the endings).',
    },

    /* ======================================================= 10 · RETURN == */
    {
      id: 'return',
      name: 'Return',
      camera: { x: 1760, y: -1560, z: 0.60 },
      enter: { dur: 3200, ease: 'slow' },
      set: { far: 1, rock: 1 },
      plates: [{
        src: 'assets/closing.png', ar: 1470 / 1524, blend: 1,
        at: [0.66, 0.52], w: 920,
        alt: 'Sisyphus takes a break — playing pinball beside the boulder',
      }],
      steps: [
        {
          notes:
            'Exactly the opening camera — same hill, same scale, and by now ' +
            'it means something else. Sisyphus on his break, playing ' +
            'pinball: the ball comes back, and he paid for that. Let the ' +
            'drawing sit in silence for a moment.',
        },
        {
          notes: 'The last line. Then stop talking.',
        },
      ],
      text: [
        {
          id: 'fin', at: [0.055, 0.46], w: 640, cls: 'phrase', from: 1,
          html: '<p>One must imagine Sisyphus happy.</p>',
        },
      ],
      notes:
        'The bookend: scene 1\'s exact camera, the pinball drawing, one ' +
        'line. Nothing more.',
    },
  ];

  /* A 12-minute route through the strongest beats. The full deck remains
     available; open index.html?route=short or short.html to follow this path. */
  S.ROUTES = {
    short: [
      ['opening', 0],

      ['myth', 0],
      ['myth', 1],
      ['myth', 2],

      ['why-sisyphus', 0],
      ['why-sisyphus', 1],

      ['loop', 0],
      ['loop', 1],
      ['loop', 2],

      ['three-systems', 0],
      ['three-systems', 1],
      ['three-systems', 5],
      ['three-systems', 7],

      ['info', 0],
      ['info', 1],
      ['info', 3],
      ['info', 6],
      ['info', 7],

      ['example-person', 0],
      ['example-person', 2],
      ['example-person', 6],
      ['example-person', 7],

      ['example-jaisp', 0],
      ['example-jaisp', 3],
      ['example-jaisp', 4],
      ['example-jaisp', 5],

      ['philosophy', 6],

      ['return', 0],
      ['return', 1],
    ],
  };

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
    mythfig: 0, myth: 0, sitfig: 0, meetfig: 0, meet: 0,
    loop1: 0, loop2: 0, loop3: 0, leaner: 0, tablebg: 0,
    pusher: 0, climber: 0, climber2: 0,
  };
})();
