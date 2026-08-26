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
     9  philosophy     three pages: the same picture at three scales;
                       the rulers we carry (five); the top of the hill
     10 return         Sisyphus takes a break, the ball comes back,
                       one must imagine the optimizer happy

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
        {
          notes:
            'The cap, and the cue for the next scene: all of it running ' +
            'in a constant optimization loop.',
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
        {
          id: 'why-loop', at: [0.05, 0.88], w: 760, cls: 'aside lead', from: 4,
          html: '<p>In a constant optimization loop</p>',
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
      camera() { const z = 4.4; return { x: NOTCH, y: S.anchorY(-1782, 0.70, z), z }; },
      enter: { dur: 2800, ease: 'slow' },
      set: { far: 0.5, rock: 0.35, line: 0.35, roll: 1 },
      steps: [
        {
          set: { entropy: 1, entlbl: 1, mi: 1, comm: 1 },
          notes:
            'Start with Shannon\'s practical question: if observations ' +
            'arrive as a stream, how unpredictable is the next one? X is ' +
            'the next observation; p(X) is what your current model expects ' +
            'to see; entropy H(X) is average surprise. Same family as stat ' +
            'mech entropy, but this is the message/observation version. ' +
            'Low entropy means a dimension is almost constant, so it cannot ' +
            'carry much. High entropy means more possible variation, but ' +
            'that variation could still be noise — unpredictable is not ' +
            'the same as useful, which is the hinge into the right side. ' +
            'Then, on the same picture, the bridge statistic: mutual ' +
            'information. If entropy asks how ' +
            'much a data dimension can vary, mutual information asks how ' +
            'much of that variation is about the thing I care about. ' +
            'I(X;θ) is relevance: how much observing X reduces uncertainty ' +
            'about θ. A high-entropy channel can be pure noise; a quieter ' +
            'channel can be decisive if it tracks θ. Worth knowing, and ' +
            'worth saying if the room is technical: this is the SAME ' +
            'quantity as the experimental-design criterion at the end of ' +
            'the scene — expected information gain about θ from an ' +
            'observation IS I(θ;Y). The bridge statistic here and the ' +
            'buying rule there are one thing seen twice. Do not call H ' +
            '"capacity" out loud — in Shannon\'s own vocabulary channel ' +
            'capacity is a MAXIMISED mutual information, not an entropy, ' +
            'and an information theorist will say so. The screen no longer ' +
            'uses the word; say instead that entropy is how much the ' +
            'reading can vary and mutual information is how much of that ' +
            'variation is about θ.',
        },
        {
          set: { entropy: 0.35, entlbl: 0, mi: 0, fisher: 1, comm: 0 },
          notes:
            'THE RULER. Fisher is about θ, not about volume: the same basin ' +
            'is flat under one ruler and steep under another. And the hard ' +
            'sentence: where Fisher is zero — a wavelength, a conversational ' +
            'cue — no network and no brain downstream can ever recover it. ' +
            'If pressed, be precise about which zero is meant: the claim is ' +
            'airtight for a direction the likelihood does not depend on at ' +
            'all (the band you never observed), which is the case the ' +
            'examples are. It is not a claim about Fisher vanishing at one ' +
            'point of an otherwise informative curve. Cramér–Rao is off ' +
            'the screen on purpose — if someone asks for the bound it is ' +
            'Var(θ̂) ≥ 1/I(θ) FOR UNBIASED ESTIMATORS, and that caveat is ' +
            'the reason it is not up there: biased estimators can and do ' +
            'beat it — shrinkage is the everyday example, and the ' +
            'enhancement networks are exactly that case. ' +
            'If asked whether Fisher is sensitivity or curvature: both — ' +
            'the score-squared form on the screen equals the expected ' +
            'curvature of the log-likelihood, −E[∂² log p/∂θ²], under the ' +
            'usual regularity conditions; the curvature reading is the one ' +
            'the basin picture draws. If someone conflates the two I\'s: ' +
            'mutual ' +
            'information I(X;θ) takes two arguments and a semicolon — bits ' +
            'shared between variables; Fisher I(θ) takes one — curvature ' +
            'of the log-likelihood in θ. Related through the ruler, not ' +
            'the same quantity.',
        },
        {
          set: { fisher: 0.3, approx2: 0.45, approx3: 1, line: 0.15, sound: 0.55 },
          notes:
            'THE COMPRESSION, both lessons on one page. Five numbers, ' +
            'evenly spaced — a perfectly reasonable summary, and the basin ' +
            'is simply not in it: the faint curve, its ring where that ' +
            'summary thinks the minimum is. Nothing was wrong with the ' +
            'data. Then the same budget, placed where the curvature lives ' +
            '— the bold curve — and the basin comes back. No new ' +
            'observation. The compression is a ruler too: what you keep ' +
            'decides what exists. Two things that are no longer printed: ' +
            '(1) name the two curves out loud — faint is the even ' +
            'sampling that missed, with its ring where that summary ' +
            'thinks the minimum is; bold is the recovery. (2) This is NOT ' +
            'Shannon\'s compression. His source-coding theorem is a floor ' +
            'on LOSSLESS codes — no code averages below H(X) — while this ' +
            'is lossy: which numbers you keep. Say it if the room is ' +
            'technical, since "compression" two beats after entropy ' +
            'invites the confusion.',
        },
        {
          camera() { const z = 1.9; return { x: 2300, y: S.anchorY(-1906, 0.5, z), z }; },
          set: {
            fisher: 0, approx2: 0, approx3: 0.2, entropy: 0.25,
            kl: 1, surprise: 0.35, sound: 0.6, line: 0.3,
            fork1: 0.35, fork2: 0.5, fork3: 0.75, climber: 1, here: 1,
          },
          notes:
            'THE CLOSE — one page: the update, the checks, the next ' +
            'question. The point to land, and the point of the scene: ' +
            'everything in this loop is measurable — capacity, relevance, ' +
            'resolution, what a summary kept, how much the posterior ' +
            'moved — and there is a right way to ask the next question. ' +
            'Name the idea and move; do not teach the class. The update: ' +
            'D_KL(posterior ‖ prior), the bracket closing; measurement is ' +
            'entropy reduction. Cautions: surprise is not gain; low ' +
            'entropy is not truth — it is a model making many assertions ' +
            '(Boltzmann: entropy is the log count of micro-states behind ' +
            'a macro-state; Jaynes: this is inference under constraint — ' +
            'the update reweights possibilities). The checks, cheapest ' +
            'first: the loss or model (left trail — still surprised after ' +
            'convergence), the ruler (did it resolve θ at all — this one ' +
            'has NO trail in the drawing, it is the screen text only), ' +
            'the compression (along the surface — raw beats the summary), ' +
            'the data (over the crest — and the reflex is always "more ' +
            'data"; it is the last check, not the first). Experimental ' +
            'design: EIG(d) = ' +
            'E_y D_KL[p(θ|y,d) ‖ p(θ)] — rank the observations you could ' +
            'buy, buy the best; a little resolution can beat a great many ' +
            'photons. MacKay 1992 (Neural Computation 4:590) if pressed: ' +
            'there are three criteria (all parameters / a named region / ' +
            'model comparison), and choosing the criterion is another ' +
            'ruler choice; the naive criterion sends you to the edges of ' +
            'the input space, so name the region of interest first; and ' +
            'all of it assumes the model is correct — "the search for ' +
            'ideal measures of data utility is still open," which is the ' +
            'loss/model check again.',
        },
      ],
      text: [
        {
          id: 'in-head', at: [0.05, 0.055], w: 720, cls: 'scenehead', to: 2,
          html: '<p class="kicker">Information theory</p>' +
            '<p class="scenetitle">Statistics of the Loop</p>',
        },
        {
          /* the close moves the camera, and text is world-anchored at the
             beat it first appears (engine.js placeText), so the header is
             re-issued here to sit correctly under the new camera. */
          id: 'in-head2', at: [0.05, 0.055], w: 720, cls: 'scenehead', from: 3,
          html: '<p class="kicker">Information theory</p>' +
            '<p class="scenetitle">Statistics of the Loop</p>',
        },
        {
          id: 'in-1', at: [0.05, 0.21], w: 540, cls: 'aside lead', to: 0,
          html: '<p><b>Shannon’s question: how unpredictable is the next ' +
            'observation?</b></p>' +
            '<p>X is the next observation; p(X) is what we expect. ' +
            'Entropy, H(X), is the average surprise:</p>' +
            '<p>H(X) = E[−log p(X)] = −Σ p(x) log p(x).</p>' +
            '<p>Low H: predictable. High H: more uncertainty.</p>',
        },
        {
          id: 'in-mi', at: [0.60, 0.13], w: 560, cls: 'aside lead', to: 0,
          html: '<p><b>But unpredictable is not necessarily useful.</b></p>' +
            '<p>Mutual information, I(X;θ): how much does X tell us ' +
            'about θ, the thing we care about?</p>' +
            '<p>I(X;θ) = H(X) − H(X|θ).</p>' +
            '<p>Entropy is surprise. Mutual information is relevant ' +
            'surprise.</p>',
        },
        {
          id: 'in-2', at: [0.05, 0.21], w: 540, cls: 'aside lead', from: 1, to: 1,
          html: '<p><b>The ruler — Fisher information, I(θ).</b> How ' +
            'sensitive are the measurements to a change in θ?</p>' +
            '<p>I(θ) = E[(∂ log p(x|θ)/∂θ)²]</p>' +
            '<p>Large I: a small change in θ is visible. Small I: ' +
            'different values of θ look nearly the same.</p>',
        },
        {
          id: 'in-2r', at: [0.60, 0.13], w: 560, cls: 'aside lead', from: 1, to: 1,
          html: '<p><b>Where Fisher is zero, nothing downstream can ' +
            'recover the information</b> — no model, no brain, no ' +
            'pipeline. What the ruler cannot see does not exist for ' +
            'anything after it.</p>' +
            '<p>Change what the instrument records, and you change the ' +
            'ruler.</p>' +
            '<p>Fisher tells us the finest distinction this ruler can ' +
            'make.</p>',
        },
        {
          id: 'in-3', at: [0.05, 0.21], w: 540, cls: 'aside lead', from: 2, to: 2,
          html: '<p><b>The compression — what you keep.</b></p>' +
            '<p>Five evenly spaced samples can be a perfectly reasonable ' +
            'summary — and still miss the basin entirely.</p>' +
            '<p>Nothing was wrong with the data. The information was lost ' +
            'in the summary.</p>',
        },
        {
          id: 'in-4', at: [0.60, 0.11], w: 560, cls: 'aside lead', from: 2, to: 2,
          html: '<p><b>Put the same budget where the curvature is, and ' +
            'the basin comes back.</b></p>' +
            '<p>Compression is a ruler too: what you keep determines what ' +
            'can still be seen.</p>' +
            '<p>I(θ;&thinsp;T(D)) ≤ I(θ;&thinsp;D)</p>' +
            '<p>Processing cannot create information about θ.</p>' +
            '<p>The test of a summary is simple: did it keep what the data ' +
            'knew?</p>',
        },
        {
          id: 'in-close-l', at: [0.05, 0.21], w: 560, cls: 'aside lead', from: 3,
          html: '<p><b>Every part of the loop can be tested.</b></p>' +
            '<p>Did the ruler resolve it? Did the compression keep it? ' +
            'Did the posterior actually move?</p>' +
            '<p>D<sub>KL</sub>(posterior&thinsp;‖&thinsp;prior)</p>' +
            '<p>measures how much our beliefs changed — not whether they ' +
            'changed in the right direction.</p>',
        },
        {
          id: 'in-close-m', at: [0.685, 0.60], w: 460, cls: 'aside lead', from: 3,
          html: '<p><b>Not good enough? Debug the loop before asking for ' +
            'more data.</b></p>' +
            '<p>Check:<br>loss / model → ruler → compression → data</p>' +
            '<p>“More data” is the last check, not the first.</p>',
        },
        {
          id: 'in-close-b', at: [0.545, 0.155], w: 460, cls: 'aside lead', from: 3,
          html: '<p><b>The next question should maximize expected ' +
            'information gain.</b></p>' +
            '<p>EIG(d) = E<sub>y</sub>&thinsp;[&thinsp;D<sub>KL</sub>' +
            '(&thinsp;p(θ&thinsp;|&thinsp;y, d) ‖ p(θ)&thinsp;)&thinsp;]</p>' +
            '<p>Choose the observation expected to change what we know ' +
            'most.</p>',
        },
      ],
      notes:
        'Four pages, one thesis: everything in the loop is measurable, ' +
        'and there is a right way to ask the next question — conveyed, ' +
        'not taught as a stats class. Soundings are the data, clustered ' +
        'versus scattered points are entropy, parabolas are Fisher, knots ' +
        'are the compression, and the pull-back to the climber is the ' +
        'close: update, checks, next observation, one page. Mutual ' +
        'information shares the entropy page: entropy on the left, ' +
        'relevance on the right. The scene is already its own 12-minute ' +
        'cut — four beats, all kept.',
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
          set: { sound: 1, rock: 0.45, meet: 0.2 }, anim: { meet: 1600 },
          notes:
            'The same ground, retold as a person. The question: do I like ' +
            'them? Gesture at the resting boulder — the model you arrive ' +
            'with. Nobody walks in blank: a prior built from every person ' +
            'before them, context, and yes, stereotype — that is what a ' +
            'prior is. Then the stream arrives: words, tone, timing, what ' +
            'they laugh at, how they treat the waiter. Enormous entropy — ' +
            'and most of it noise.',
        },
        {
          set: { combR: 0.45, combE: 1, sound: 0.25, meet: 0.62 }, anim: { meet: 3200 },
          notes:
            'Distance is resolution — both combs on one page. Across a ' +
            'dinner table you sample coarsely (the faint comb): job, ' +
            'manners, small talk; "they seem nice" is one blurred pixel. ' +
            'Move closer and the sampling gets finer (the bold comb): ' +
            'shared work, a hard week, a long trip — kindness separates ' +
            'from politeness, two sources that were one blur. The ' +
            'optimization is constant: every encounter re-fits the model. ' +
            'Liking changes with distance because the data does.',
        },
        {
          set: { fisher: 0.8, entropy: 1, entlbl: 1, kl: 1, combE: 0.25, combR: 0.1 },
          notes:
            'Two ways to learn nothing — and the figures deliberately do ' +
            'not move here. Zero-Fisher data: an hour of small talk is ' +
            'pleasant and carries nothing about the trait you care about; ' +
            'the flat parabola; no volume of it will measure reliability. ' +
            'And duplicate data: the tenth coffee repeats the ninth — ' +
            'plenty of observations, no new information, the bracket ' +
            'stops closing. More data is not more information.',
        },
        {
          set: { entropy: 0.9, entlbl: 0.9, surprise: 0.3, kl: 0.25, fisher: 0.15, meet: 0.95 },
          anim: { meet: 2800 },
          notes:
            'Good enough? For "another coffee?" — converged long ago. For ' +
            '"trust them with passing the ball near the goal" — that is a ' +
            'different loss, ' +
            'and the same person ranks differently under it; no number ' +
            'of coffees helps; ' +
            'it needs a different observation entirely: responsibility, ' +
            'disagreement, stress. Choosing that encounter is experimental ' +
            'design, about a person — and ethics bound which experiments ' +
            'you may run. One aside if it lands: at some point the coffees ' +
            'stop being measurements — you keep them because they are ' +
            'easy, and that is fine as long as you do not call it ' +
            'learning. The field-scale version waits in the philosophy ' +
            'scene.',
        },
      ],
      text: [
        {
          id: 'ep-head', at: [0.05, 0.055], w: 720, cls: 'scenehead',
          html: '<p class="kicker">Example one</p>' +
            '<p class="scenetitle">A person you just met</p>',
        },
        {
          id: 'ep-0', at: [0.05, 0.17], w: 540, cls: 'aside lead', to: 0,
          html: '<p><b>Do I like this new person?</b> Nobody walks in ' +
            'blank: you arrive with a prior built from every person ' +
            'before them.</p>',
        },
        {
          id: 'ep-0b', at: [0.61, 0.17], w: 540, cls: 'aside lead', to: 0,
          html: '<p><b>Then the stream:</b> words, tone, timing, what they ' +
            'laugh at — enormous entropy, most of it noise.</p>',
        },
        {
          id: 'ep-1', at: [0.05, 0.17], w: 540, cls: 'aside lead', from: 1, to: 1,
          html: '<p><b>Distance is resolution.</b> Across a table you ' +
            'sample coarsely — “they seem nice” is one blurred pixel.</p>',
        },
        {
          id: 'ep-1b', at: [0.61, 0.17], w: 540, cls: 'aside lead', from: 1, to: 1,
          html: '<p>Closer, kindness separates from politeness. Liking ' +
            'changes with distance because the data does.</p>',
        },
        {
          id: 'ep-2', at: [0.05, 0.17], w: 540, cls: 'aside lead', from: 2, to: 2,
          html: '<p><b>Two ways to learn nothing.</b> Small talk is ' +
            'pleasant — and Fisher-blind: no amount of it measures ' +
            'reliability.</p>',
        },
        {
          id: 'ep-2b', at: [0.61, 0.17], w: 540, cls: 'aside lead', from: 2, to: 2,
          html: '<p>And the tenth coffee repeats the ninth: no new ' +
            'information — the bracket stops closing.</p>',
        },
        {
          id: 'ep-4', at: [0.05, 0.17], w: 540, cls: 'aside lead', from: 3,
          html: '<p><b>Good enough?</b> For “another coffee?” — converged ' +
            'long ago. For “trust them with passing the ball near the goal” ' +
            '— a different ' +
            'loss entirely, and no number of coffees helps.</p>',
        },
        {
          id: 'ep-4b', at: [0.575, 0.17], w: 540, cls: 'aside lead', from: 3,
          html: '<p>It needs a different observation: which encounter ' +
            'teaches the most is experimental design, about a person.</p>',
        },
      ],
      notes:
        'The clearest scene by design: the audience has already seen every ' +
        'one of these drawings with statistics captions in scene 6 — now ' +
        'the same pictures get human captions. That rhyme is the thesis, ' +
        'so no station is re-explained — named and moved past. Four ' +
        'beats (2026-08-25: the surprise beat was cut for time — its ' +
        'idea returns at field scale in scene 8, where the concordance ' +
        'moved). 12-minute cut: beats 1, 2, 4.',
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
            'loss. And it is cheap enough to say out loud: about 2.5 ' +
            'GPU-hours, no labels, no catalogues, no simulations. Train ' +
            'once, encode each field once, measure many times.',
        },
        {
          set: { jarch: 1 },
          notes:
            'JAISP, drawn in this pen. Ten bands, Rubin and Euclid ' +
            'together, each instrument at its delivered sampling, one ' +
            'shared latent — self-supervised, each band predicted from ' +
            'the other nine. Freeze it; every measurement is a small head ' +
            'with its own loss. About nine million parameters. Detection ' +
            'on held-out sky: 93% complete, 94% pure against the published ' +
            'VIS catalogue — and 0.45 mag deeper than one band supports.',
        },
        {
          camera: { x: 2620, y: -2114, z: 1.6 },
          set: { jarch: 0, iters: 1, line: 0.8 },
          notes:
            'Ten designs to get here — walk the ladder up the flank. ' +
            'v1–v2 contrastive matching: the features matched the sky, ' +
            'not the sources. v3 object pairs: no precision. v4–v5 JEPA: ' +
            'beaten by a simple CNN. Each one is the loop\'s ' +
            'not-good-enough branch — the boulder rolling back, debug the ' +
            'ruler, the data, the compression. v6 is the turn: predict ' +
            'the actual pixels, no shortcut that discards position. ' +
            'v7–v8 mixed resolution works; v9–v10 is production. We ' +
            'walked the road, and pixels won.',
        },
        {
          camera() { const z = 8.5; return { x: 2202, y: S.anchorY(G(2199.3), 0.42, z), z }; },
          set: { astro1: 1, astro2: 1, axes: 0.5, line: 1, rock: 0.35, iters: 0 },
          notes:
            'The proof, on the θ axis the talk has been walking — drawn to ' +
            'scale, 1 unit = 2 mas. Raw cross-survey scatter, Rubin against ' +
            'VIS: about 50 mas — the loose open readings. A position head ' +
            'reading the frozen latent: 14–17 mas — the tight cluster; ' +
            'injected sources recovered to 19 mas at S/N = 5, near the ' +
            'floor the VIS labels themselves set. And the whole stack, on ' +
            'a second deep field it had never seen, nothing retrained: ' +
            '93.4/93.1 against 93.3/94.5, positions on the same 12–18 mas ' +
            'floor. The compression generalizes.',
        },
        {
          camera() { const z = 6.5; return { x: 2205, y: S.anchorY(-1780, 0.72, z), z }; },
          set: { shift: 1, astro1: 0, astro2: 0, axes: 0.2 },
          anim: { shift: 1600 },
          notes:
            'And then better data arrived. Two independently Gaia-anchored ' +
            'solutions disagree by a coherent 9–10 mas — every arrow points ' +
            'the same way; about 7 mas of it is shared by all ten bands, ' +
            'two entirely different fitting methods recover the same ' +
            'pattern, and a per-source correction absorbs it to about ' +
            '1.5 mas. That is not scatter; the landscape itself had moved. ' +
            'Nobody made a mistake. Say it plainly — this is the title of ' +
            'the talk, measured. (If asked what the next observation ' +
            'should be: Roman is the natural third stream — one more ' +
            'encoder branch, three-way agreement maps.)',
        },
      ],
      plates: [
        {
          src: 'assets/paper_nisp.png', ar: 728 / 1198, frame: 1, from: 1, to: 1,
          at: [0.16, 0.46], w: 300,
          alt: 'Title page: Euclid deep-learning super-resolution of NISP imaging',
          cap: 'Everetts, Hemmati, et al. — NISP → NIRCam, 5× finer.',
        },
        {
          src: 'assets/paper_wise.png', ar: 1272 / 1608, frame: 1, from: 1, to: 1,
          at: [0.44, 0.445], w: 280,
          alt: 'Title page: enhancing WISE infrared imaging to Spitzer resolution',
          cap: 'Rezaee, Hemmati, et al. — WISE → Spitzer, 4.6× finer.',
        },
        {
          src: 'assets/paper_spectra.png', ar: 1226 / 1546, frame: 1, from: 1, to: 1,
          at: [0.71, 0.46], w: 285,
          alt: 'Title page: physics-informed super-resolution of galaxy spectra',
          cap: 'Haghjoo, Hemmati, et al. — prism → grating, R 100 → 1000.',
        },
        {
          src: 'assets/astrometry_fig8_crop.png', ar: 525 / 1135, frame: 1,
          from: 5, to: 5,
          at: [0.80, 0.20], w: 420,
          alt: 'Cross-survey offset clouds collapsing from 50 mas to 14-17 mas',
          cap: 'All 790 ECDFS tiles — the measured collapse.',
        },
      ],
      text: [
        {
          id: 'ej-head', at: [0.05, 0.055], w: 760, cls: 'scenehead', to: 3,
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
            'every task a small head with its own loss.</p>' +
            '<p>Priced: <b>≈2.5 GPU-hours</b>, no labels, no catalogues, ' +
            'no simulations. Train once · encode once · measure many ' +
            'times.</p>',
        },
        {
          id: 'ej-3', at: [0.05, 0.30], w: 480, cls: 'aside lead', from: 3, to: 3,
          html: '<p><b>JAISP.</b> Ten bands, one shared latent — ' +
            'self-supervised, ≈9M parameters.</p>' +
            '<p>Detection on held-out sky: <b>93% complete, 94% pure</b> — ' +
            'and <b>0.45 mag deeper</b> than one band supports.</p>',
        },
        {
          id: 'ej-3i', at: [0.05, 0.10], w: 500, cls: 'aside lead', from: 4, to: 4,
          html: '<p><b>Ten designs to get here — the loop, lived.</b></p>' +
            '<p>Contrastive matching drowned in sky. Object pairing gave ' +
            'no precision. JEPA lost to a simple CNN.</p>' +
            '<p>The turn, v6: <b>predict the actual pixels.</b> Features ' +
            'that look similar aren\'t features that know <em>where</em>.</p>',
        },
        {
          id: 'ej-4', at: [0.05, 0.10], w: 460, cls: 'aside lead', from: 5, to: 5,
          html: '<p><b>One head, its own loss: astrometry.</b> Raw ' +
            'cross-survey scatter ≈ 50 mas. The head, reading the frozen ' +
            'latent: <b>14–17 mas</b>.</p>' +
            '<p>The latent carried VIS sharpness to everything tied to it.</p>' +
            '<p>And on a second field the model never saw — <b>nothing ' +
            'retrained</b> — the same numbers, the same floor.</p>',
        },
        {
          id: 'ej-5', at: [0.05, 0.10], w: 500, cls: 'aside lead', from: 6,
          html: '<p><b>Then better data arrived.</b> Two Gaia-anchored ' +
            'solutions disagree by a coherent <b>9–10 mas</b> — every arrow ' +
            'the same way.</p>' +
            '<p>Not scatter. The landscape itself had moved.</p>',
        },
      ],
      notes:
        'The science payoff: pairwise receipts → the foundation bet, ' +
        'priced → the architecture in this pen → ten pushes to the design ' +
        '(the loop, lived) → the measured astrometry proof with the ' +
        'transfer → the concordance field, which is the title of the talk ' +
        'measured, and the hinge into the philosophy. 12-minute cut: ' +
        'receipts get twenty seconds together; beats 4–7 are the spine.',
    },

    /* ==================================================== 9 · PHILOSOPHY == */
    {
      id: 'philosophy',
      name: 'Philosophy',
      camera: { x: 2200, y: -2860, z: 0.85 },
      enter: { dur: 3000, ease: 'slow' },
      set: { far: 0.25, rock: 1, line: 0.8, hatfig: 1 },
      steps: [
        {
          notes:
            'The long ascent — highest camera of the talk, almost all sky, ' +
            'him on his summit at the edge of the frame, hat on, head ' +
            'bowed. Page one is the bridge from the technical talk: the ' +
            'same picture at three scales, one line per press. A brain ' +
            'updates a world model — but its loss is relative: history, ' +
            'reference points, habit, attachment. (Scene 5\'s bent ruler ' +
            'was the measurement of this.)',
        },
        {
          notes: 'An AI can optimize a different loss — perhaps free of ' +
            'the human asymmetries — but the loss was still chosen by us.',
        },
        {
          notes: 'Science does both, collectively: it builds models, uses ' +
            'them as instruments, and decides when new evidence is worth ' +
            'changing them.',
        },
        {
          notes:
            'The first hinge, plainly: a different optimizer is not ' +
            'necessarily a different scientist — if it carries our ruler.',
        },
        {
          notes:
            'The second hinge: sometimes a good model is not one you keep ' +
            'updating; it is one you trust enough to use. This page has ' +
            'now raised the two questions the rest of the ending answers: ' +
            'who defines better? and must we optimize forever?',
        },
        {
          notes:
            'Page two answers the first question, historically. He broods ' +
            'on. Nature hands you observations; the ruler you must choose.',
        },
        {
          notes: 'Empiricist: when observation itself tells you what is — ' +
            'read the data and believe your eyes.',
        },
        {
          notes: 'Rationalist: when consistency constrains the answer ' +
            'before any new datum arrives.',
        },
        {
          notes: 'Pragmatist: when the ruler depends on what you are ' +
            'trying to do — the loss follows the goal.',
        },
        {
          notes: 'Existentialist: where deduction runs out and you must ' +
            'own the choice.',
        },
        {
          notes: 'Absurdist: when neither resolves — and the pushing ' +
            'continues anyway.',
        },
        {
          notes:
            'The close: today we oscillate — not inconsistency, a ' +
            'different loss for a different question, and the swing ' +
            'between them is what a healthy updating system looks like. ' +
            '(If asked about the modern/postmodern oscillation by name: ' +
            'metamodernism, Vermeulen & van den Akker — keep it for Q&A, ' +
            'not the slide.)',
        },
        {
          notes:
            'Page three answers the second question. Keep it sparse and ' +
            'slow down: we optimize because we want to get somewhere.',
        },
        {
          notes: 'But what if we arrive? Let the question hang before the ' +
            'next press.',
        },
        {
          notes: 'Weinberg, Dreams of a Final Theory: a final theory — ' +
            'half in longing, half in mourning.',
        },
        {
          notes:
            'The ending: die on the summit or die pushing. RESIST ' +
            'EXPLAINING — the whole talk has taught the room what pushing ' +
            'and summit mean. Let it sit. Then the final click.',
        },
      ],
      text: [
        {
          id: 'ph-0a', at: [0.05, 0.055], w: 900, cls: 'scenehead', to: 4,
          html: '<p class="kicker">Philosophy</p>' +
            '<p class="scenetitle">The same picture, at three scales</p>',
        },
        {
          id: 'ph-0b1', at: [0.14, 0.30], w: 980, cls: 'aside lead branch-list', to: 4,
          html: '<ul><li><b>A brain:</b> updates a world model, but its ' +
            'loss is relative — shaped by history, reference points, ' +
            'habit, attachment.</li></ul>',
        },
        {
          id: 'ph-0b2', at: [0.14, 0.415], w: 980, cls: 'aside lead branch-list',
          from: 1, to: 4,
          html: '<ul><li><b>An AI:</b> can optimize a different loss, ' +
            'perhaps without those human asymmetries — but the loss was ' +
            'still chosen by us.</li></ul>',
        },
        {
          id: 'ph-0b3', at: [0.14, 0.53], w: 980, cls: 'aside lead branch-list',
          from: 2, to: 4,
          html: '<ul><li><b>Science:</b> does both collectively: it ' +
            'builds models, uses them as instruments, and decides when ' +
            'new evidence is worth changing them.</li></ul>',
        },
        {
          id: 'ph-0b4', at: [0.14, 0.66], w: 980, cls: 'aside lead',
          from: 3, to: 4,
          html: '<p>A different optimizer is not necessarily a different ' +
            'scientist if it carries our ruler.</p>',
        },
        {
          id: 'ph-0b5', at: [0.14, 0.76], w: 980, cls: 'aside lead',
          from: 4, to: 4,
          html: '<p><b>Sometimes a good model is not one you keep ' +
            'updating. It is one you trust enough to use.</b></p>',
        },
        {
          id: 'ph-1a', at: [0.05, 0.055], w: 900, cls: 'scenehead',
          from: 5, to: 11,
          html: '<p class="kicker">Philosophy</p>' +
            '<p class="scenetitle">The rulers we carry</p>',
        },
        {
          id: 'ph-1b1', at: [0.14, 0.30], w: 980, cls: 'aside lead',
          from: 5, to: 11,
          html: '<p>Nature gives observations; it does not give the ' +
            'ruler.</p>',
        },
        {
          id: 'ph-1b2', at: [0.14, 0.40], w: 980, cls: 'aside lead branch-list',
          from: 6, to: 11,
          html: '<ul><li><b>Empiricist:</b> when observation tells us ' +
            'what is.</li></ul>',
        },
        {
          id: 'ph-1b3', at: [0.14, 0.48], w: 980, cls: 'aside lead branch-list',
          from: 7, to: 11,
          html: '<ul><li><b>Rationalist:</b> when consistency constrains ' +
            'the answer.</li></ul>',
        },
        {
          id: 'ph-1b4', at: [0.14, 0.56], w: 980, cls: 'aside lead branch-list',
          from: 8, to: 11,
          html: '<ul><li><b>Pragmatist:</b> when the ruler depends on ' +
            'what we are trying to do.</li></ul>',
        },
        {
          id: 'ph-1b5', at: [0.14, 0.64], w: 980, cls: 'aside lead branch-list',
          from: 9, to: 11,
          html: '<ul><li><b>Existentialist:</b> when deduction runs out ' +
            'and the choice is ours.</li></ul>',
        },
        {
          id: 'ph-1b6', at: [0.14, 0.72], w: 980, cls: 'aside lead branch-list',
          from: 10, to: 11,
          html: '<ul><li><b>Absurdist:</b> when neither resolves, but the ' +
            'pushing continues.</li></ul>',
        },
        {
          id: 'ph-1b7', at: [0.14, 0.82], w: 980, cls: 'aside lead',
          from: 11, to: 11,
          html: '<p><b>Today: we oscillate. Different questions, ' +
            'different rulers.</b></p>',
        },
        {
          id: 'ph-2a', at: [0.05, 0.055], w: 900, cls: 'scenehead', from: 12,
          html: '<p class="kicker">Philosophy</p>' +
            '<p class="scenetitle">The top of the hill</p>',
        },
        {
          id: 'ph-2b1', at: [0.14, 0.30], w: 980, cls: 'aside lead', from: 12,
          html: '<p>We optimize because we want to get somewhere.</p>',
        },
        {
          id: 'ph-2b2', at: [0.14, 0.40], w: 980, cls: 'aside lead', from: 13,
          html: '<p><b>But what if we arrive?</b></p>',
        },
        {
          id: 'ph-2b3', at: [0.14, 0.52], w: 980, cls: 'aside lead', from: 14,
          html: '<p>A final theory: half in longing, half in mourning.</p>' +
            '<p>— Steven Weinberg</p>',
        },
        {
          id: 'ph-2b4', at: [0.14, 0.70], w: 980, cls: 'aside lead', from: 15,
          html: '<p>The ending: die on the summit or die pushing</p>',
        },
      ],
      notes:
        'The highest camera of the deck: sky, clouds, one summit at the ' +
        'bottom edge, him brooding on it — hat on, head bowed — through ' +
        'all three pages. Every point on its own press. The arc: who ' +
        'optimizes (the same picture at three scales) → by what ruler ' +
        '(the rulers we carry) → do we even want the optimum (the top of ' +
        'the hill). Then the final slide answers: maybe happiness is ' +
        'neither failure nor convergence.',
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
        at: [0.34, 0.52], w: 920,
        alt: 'Sisyphus takes a break — playing pinball beside the boulder',
      }],
      steps: [
        {
          notes:
            'Exactly the opening camera — same hill, same scale, and by now ' +
            'it means something else. Sisyphus on his break, playing ' +
            'pinball: the ball comes back, and he paid for that. The last ' +
            'line is already on the page — the optimizer, not Sisyphus: ' +
            'after an entire talk about optimization, he takes a break. ' +
            'Happiness is neither failure nor convergence. Let the drawing ' +
            'sit in silence for a moment, then read the line. Then stop ' +
            'talking.',
        },
      ],
      text: [
        {
          id: 'fin', at: [0.59, 0.70], w: 640, cls: 'phrase',
          html: '<p>One must imagine the optimizer happy.</p>',
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
      ['info', 2],
      ['info', 3],

      ['example-person', 0],
      ['example-person', 1],
      ['example-person', 3],

      ['example-jaisp', 0],
      ['example-jaisp', 3],
      ['example-jaisp', 4],
      ['example-jaisp', 5],
      ['example-jaisp', 6],

      ['philosophy', 4],
      ['philosophy', 11],
      ['philosophy', 15],

      ['return', 0],
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
    entropy: 0, entlbl: 0, mi: 0, comm: 0, surprise: 0, kl: 0, fisher: 0,
    fork1: 0, fork2: 0, fork3: 0,
    combR: 0, combE: 0, combJ: 0, latent: 0,
    astro1: 0, astro2: 0, jarch: 0, iters: 0, shift: 0, here: 0, ends: 0,
    mythfig: 0, myth: 0, sitfig: 0, hatfig: 0, meetfig: 0, meet: 0,
    loop1: 0, loop2: 0, loop3: 0, leaner: 0, tablebg: 0,
    pusher: 0, climber: 0, climber2: 0,
  };
})();
