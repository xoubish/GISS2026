/* ============================================================================
   scenes.js — THE SCRIPT
   ----------------------------------------------------------------------------
   This is the file to edit. Everything else is machinery.

   Each scene has separable parts:

     camera  — where the eye goes, and how long it takes to get there
     set     — which layers of the world are lit (0..1), each animated
     text    — the words, placed in FRAME FRACTIONS so they are easy to move:
               at:[0.06, 0.12] means 6% across, 12% down the 16:9 frame,
               and w / font sizes are in "stage pixels" on a 1600x900 stage
     plates  — rasters placed in the world the same way
     steps   — beats. Right arrow advances the beat; at the last one it moves on.

   The route follows the handwritten notes (talk/1–8.png): the GIPS opening
   and the myth (1–2); the loop — question → ruler → data → compression →
   inference → answer → good enough? — and three systems that run it (3–4);
   down into the basin (5–6); apart what the answer is made of (7–10); east
   over the crest to the program (11–14); then the endings (15–16).
   Two appendix scenes — astrometry and the moving field — sit after the
   return, out of the spoken route, jumpable by number for Q&A.
   ========================================================================= */
(function () {
  const S = (window.SIS = window.SIS || {});

  /* Put a world y at a given height in the frame (0 = top, 1 = bottom). */
  S.anchorY = (y, frac, z) => y - ((frac - 0.5) * 900) / z;
  S.anchorX = (x, frac, z) => x - ((frac - 0.5) * 1600) / z;

  const NOTCH = 2202;   // x of the apparent solution
  const G = (x) => S.ground(x);

  S.SCENES = [
    /* ====================================================== 1 · SISYPHUS == */
    {
      id: 'sisyphus',
      name: 'Sisyphus',
      camera: { x: 1760, y: -1560, z: 0.60 },
      enter: { dur: 1600 },
      set: { far: 1, rock: 1 },
      plates: [{
        src: 'assets/opening.png', ar: 1666 / 1200, mask: 1,
        at: [0.655, 0.46], w: 1180,
        alt: 'Sisyphus pushing the boulder up the slope',
      }],
      steps: [
        {},
        {
          notes:
            'The GIPS framing — land the acronym out loud before anyone ' +
            'reads it as a typo.',
        },
        {
          notes:
            'The AI-and-philosophy line, then the promise: Sisyphus, and ' +
            'all I do (maybe you too) is his story.',
        },
      ],
      text: [
        {
          id: 'title', at: [0.055, 0.115], w: 640, cls: 'titleblock',
          html:
            '<p class="kicker">GIPS 2026</p>' +
            '<h1>Sisyphus,<br>Optimizing in a<br>Dynamic Universe</h1>' +
            '<p class="byline">Shoubaneh Hemmati — Caltech/IPAC</p>',
        },
        {
          id: 'openline', at: [0.055, 0.56], w: 660, cls: 'aside lead', from: 1,
          html: '<p>Another <em>Greater IPAC Philosophy Symposium</em> talk — ' +
            'a reflection, not a science talk.</p>',
        },
        {
          id: 'openline2', at: [0.055, 0.685], w: 660, cls: 'aside lead', from: 2,
          html: '<p>With AI taking more of the technical work, philosophy is ' +
            'heading back to its prime days.</p>',
        },
      ],
      notes:
        'Open on the drawing. Say nothing about optimization yet. Let them ' +
        'assume this is the myth: the same rock, the same hill, forever.',
    },

    /* ================================================ 2 · ENTER THE SLOPE == */
    {
      id: 'slope',
      name: 'Enter the slope',
      camera: { x: 2130, y: -1830, z: 1.5 },
      enter: { dur: 2100 },
      set: { far: 1, rock: 1 },
      steps: [
        { notes: 'The myth, one breath.' },
        { notes: 'The observation the room already senses — let it land.' },
        { notes: 'The thesis, one line, then move.' },
      ],
      text: [
        {
          id: 'slope-myth', at: [0.055, 0.11], w: 680, cls: 'aside lead', to: 0,
          html: '<p>Push the boulder up; near the top, it rolls back. ' +
            'Repeat, for eternity.</p>',
        },
        {
          id: 'slope-phrase', at: [0.055, 0.11], w: 720, cls: 'phrase sm', from: 1,
          html: '<p>Moving on a hill toward an optimum — that is an ' +
            'optimization. Ascent or descent.</p>',
        },
        {
          id: 'slope-thesis', at: [0.055, 0.62], w: 680, cls: 'aside lead', from: 2,
          html: '<p>Data arrive. We build a model of reality from incomplete, ' +
            'noisy observations. Then we must decide what <em>better</em> ' +
            'means.</p>',
        },
      ],
      notes:
        'One slow move into the hillside beside him. The drawing dissolves; the ' +
        'ground stays. Three beats: the myth, the optimization reading of it, ' +
        'the thesis. Everything after is the machinery of taking the thesis ' +
        'seriously. Note the ledge halfway up — we are going to live there.',
    },

    /* ====================================================== 3 · THE LOOP == */
    {
      id: 'cycle',
      name: 'The loop',
      camera() { const z = 3.8; return { x: 2185, y: S.anchorY(-1782, 0.55, z), z }; },
      enter: { dur: 1900 },
      set: { far: 0.5, rock: 0.85, ball: 0, roll: 0 },
      steps: [
        {
          set: { cyc1: 1 }, anim: { roll: 0 },
          notes:
            'No axes, no equations — still a hillside, now with the lap ' +
            'marked on it. Say the loop once, plainly: a question, a choice ' +
            'of what matters — the ruler — then data, compression, ' +
            'inference, an answer, and the judgment: good enough? Everything ' +
            'in this talk is one lap of it.',
        },
        {
          set: { cyc2: 1 },
          notes:
            'The ruler decides what gets measured at all; the data are ' +
            'whatever it let through — incomplete and noisy.',
        },
        {
          set: { cyc3: 1, ball: 0.92, pusher: 0.92 },
          notes:
            'The boulder is the current belief — of a fit, of a network, of ' +
            'a person. Compression and inference put it where it rests: ' +
            'p(world | data), maintained against incomplete, noisy ' +
            'observations. Wherever it rests is what we currently think the ' +
            'world is.',
        },
        {
          set: { cyc4: 1 },
          notes:
            'An answer comes back — and then the one judgment with no axis ' +
            'of its own: good enough? If not, the lap begins again. That is ' +
            'the rock coming back, said without the myth.',
        },
      ],
      text: [
        {
          id: 'cyc-a', at: [0.055, 0.10], w: 470, cls: 'aside lead', to: 0,
          html: '<p>Every lap starts with a question — and a choice of what ' +
            'matters. That choice is the ruler.</p>',
        },
        {
          id: 'cyc-b', at: [0.055, 0.10], w: 470, cls: 'aside lead', from: 1, to: 1,
          html: '<p>Through the ruler, data: I never see the thing itself — ' +
            'only a handful of measurements of it.</p>',
        },
        {
          id: 'cyc-c', at: [0.055, 0.10], w: 480, cls: 'aside lead', from: 2, to: 2,
          html: '<p>Too much to carry, so: compress, infer. A model is my ' +
            'current guess at what made them — p(world&thinsp;|&thinsp;data).</p>',
        },
        {
          id: 'cyc-d', at: [0.055, 0.10], w: 480, cls: 'aside lead', from: 3,
          html: '<p>An answer. Then the judgment with no axis of its own: ' +
            '<em>good enough?</em> — and the lap begins again.</p>',
        },
      ],
      notes:
        'The recurring structure, drawn on the ground rather than boxed above ' +
        'it: question → what matters (the ruler) → data → compression → ' +
        'inference → answer → good enough?, and the dashed return to a new ' +
        'question. Eight stations, four marks; the last one has no axis of ' +
        'its own, which is why it will take the rest of the talk.',
    },

    /* ================================================= 4 · THREE SYSTEMS == */
    {
      id: 'systems',
      name: 'Three systems',
      camera() { const z = 2.1; return { x: 2200, y: S.anchorY(-1790, 0.62, z), z }; },
      enter: { dur: 1800 },
      set: {
        far: 0.6, rock: 0.75, ball: 0.5, pusher: 0.5, roll: 0,
        cyc1: 0.22, cyc2: 0.22, cyc3: 0.22, cyc4: 0.22,
      },
      /* The receipts. Title pages, not content: they are on screen so the
         family reads as real manuscripts, and the captions carry the one
         number each that matters. Nobody walks through them. */
      plates: [
        {
          src: 'assets/paper_nisp.png', ar: 728 / 1198, frame: 1, from: 1, to: 1,
          at: [0.175, 0.76], w: 340,
          alt: 'Title page: Euclid deep-learning super-resolution of NISP imaging',
          cap: 'Everetts, Hemmati, et al. — NISP → NIRCam, five times finer sampling.',
        },
        {
          src: 'assets/paper_wise.png', ar: 1272 / 1608, frame: 1, from: 1, to: 1,
          at: [0.475, 0.73], w: 300,
          alt: 'Title page: enhancing WISE infrared imaging to Spitzer resolution',
          cap: 'Rezaee, Hemmati, et al. — WISE → Spitzer, 4.6× finer.',
        },
        {
          src: 'assets/paper_spectra.png', ar: 1226 / 1546, frame: 1, from: 1, to: 1,
          at: [0.765, 0.73], w: 300,
          alt: 'Title page: physics-informed super-resolution of galaxy spectra',
          cap: 'Haghjoo, Hemmati, et al. — prism → grating, R 100 → 1000.',
        },
      ],
      steps: [
        {},
        {
          notes:
            'Ten seconds on the drink, no more. It is here so the abstraction ' +
            'has a human anchor, not because a brain is a neural network. The ' +
            'receipts appear below: Everetts+ (NISP YE → NIRCam F115W, 5×, ' +
            'shape fidelity), Rezaee+ (WISE W1 → Spitzer IRAC Ch1, 4.6×, flux ' +
            'and deblending), Haghjoo+ (NIRSpec prism → grating, R 100 → 1000, ' +
            'JADES — the path to Euclid and Roman grism). One line each, ' +
            'gesture and move on — they are here to be real, not to be read.',
        },
        {
          notes:
            'The third runner: science itself, as a community. Paradigm ' +
            'shifts — Newtonian gravity → general relativity → … — are its ' +
            'model updates; the next survey is its next observation; ' +
            'cosmology systematics are its noisy ruler.',
        },
        {
          notes:
            'Say the disclaimer out loud: no claim that the brain minimizes a ' +
            'loss. The claim is that all three face the same questions. The ' +
            'table, spoken, if it helps: the loss is loss-averse biology / a ' +
            'handcrafted objective / consensus and Occam. The ruler is senses ' +
            'and attention / sensors and tokenizers / telescopes and ' +
            'bandpasses. The data are an irreversible sensory stream / ' +
            're-shuffled batches / archived surveys of a non-re-runnable ' +
            'universe. The compression is synaptic weights / latent ' +
            'embeddings / physical laws and cosmological parameters. The ' +
            'learning signal is dopaminergic prediction error / gradients / ' +
            'empirical anomalies. Restart? no / yes / partially — paradigm ' +
            'shifts are slow and expensive. Who audits? evolution / we do, ' +
            'with our proxy blind spots / peer review, slow and noisy. Same ' +
            'optimization topology at every scale — and the moment you ' +
            'answer, the landscape shifts and Sisyphus walks back down.',
        },
        {
          set: { cyc1: 0.12, cyc2: 0.12, cyc3: 0.12, cyc4: 0.12 },
          notes:
            'The stage for everything that follows: NISP, WISE, grism, VIS are ' +
            'lossy projections of one sky. A model that holds the shared ' +
            'reality can move information between them — which is exactly what ' +
            'the joint-representation scenes will build.',
        },
      ],
      text: [
        {
          id: 'sysh', at: [0.055, 0.075], w: 700, cls: 'phrase sm', to: 2,
          html: '<p>The same loop, at very different scales.</p>',
        },
        {
          id: 'sys-brain', at: [0.60, 0.21], w: 430, cls: 'aside human', to: 1,
          html: '<p><b>A brain.</b> Another drink?</p>' +
            '<p>Data: how you feel, how many you have had, what tomorrow asks, ' +
            'every previous time, the company.</p>' +
            '<p>Objectives, plural and competing: pleasure now, health, the ' +
            'morning, the evening itself. Some information weighted, some ' +
            'ignored — then a decision.</p>',
        },
        {
          id: 'sys-model', at: [0.055, 0.17], w: 450, cls: 'aside', from: 1,
          html: '<p><b>A model.</b> Recover what an instrument did not ' +
            'resolve, using what a sharper one taught it.</p>' +
            '<p><em>Euclid</em> NISP imaging, with JWST-resolution sky. WISE ' +
            'imaging, with Spitzer. JWST prism spectra, sharpened tenfold in ' +
            'resolving power.</p>' +
            '<p>Each time: data, a representation, a loss, a decision that ' +
            'training is done — and the doubt: was all the information ' +
            'used?</p>',
        },
        {
          id: 'sys-sci', at: [0.60, 0.21], w: 440, cls: 'aside', from: 2, to: 2,
          html: '<p><b>A community.</b> Science runs the same lap at the ' +
            'scale of centuries.</p>' +
            '<p>Paradigm shifts — Newtonian gravity → general relativity → … ' +
            '— are its model updates; the next survey is its next ' +
            'observation.</p>' +
            '<p>Its ruler: telescopes, bandpasses, spectrographs. Its audit: ' +
            'peer review and replication — slow, and noisy.</p>',
        },
        {
          id: 'sysh2', at: [0.055, 0.075], w: 960, cls: 'phrase sm', from: 3, to: 3,
          html: '<p>Not the same algorithm. The same questions.</p>',
        },
        {
          id: 'sys-qs', at: [0.055, 0.53], w: 520, cls: 'aside', from: 3, to: 3,
          html: '<p>What data do I have — through what ruler? What do I keep ' +
            '— the compression? What counts as better — the loss? What tells ' +
            'me I am wrong — the surprise? Can I restart? And who audits the ' +
            'loop?</p>',
        },
        {
          id: 'sysh3', at: [0.055, 0.075], w: 660, cls: 'phrase sm', from: 4,
          html: '<p>Many instruments, one sky.</p>',
        },
        {
          id: 'sys-sky', at: [0.055, 0.53], w: 470, cls: 'aside lead', from: 4,
          html: '<p>Every instrument is a lossy projection of the same ' +
            'reality. Enhancement is inference on the shared sky: information ' +
            'moved from where it was measured to where it is needed.</p>',
        },
      ],
      notes:
        'One loop, three runners — a brain, a model, and science itself — ' +
        'then the stage. The brain example makes the abstraction intuitive; ' +
        'the receipts are the year of work: one family of enhancements, ' +
        'imaging and spectral, each an instance of the same loop; the ' +
        'community column is the biggest lap of all. The final beat states ' +
        'the frame the rest of the talk stands on: many instruments, one ' +
        'sky. 12-minute cut: advance straight to the receipts beat, give ' +
        'brain and papers twenty seconds together, skip the community and ' +
        '"same questions" beats, land on one sky.',
    },

    /* ========================================================= 5 · RULER == */
    {
      id: 'ruler',
      name: 'The ruler',
      camera() { const z = 13; return { x: NOTCH, y: S.anchorY(G(NOTCH), 0.80, z), z }; },
      enter: { dur: 2300 },
      set: { rock: 0.35, axes: 0.10, curve: 1, ruler: 1, cands: 1 },
      steps: [
        {},
        {
          set: { rock: 0.12, line: 0.22, m: 1 },
          anim: { m: 1400, rock: 900, line: 900 },
          notes:
            'Same data, same landscape — and this is measured, not ' +
            'hypothetical. In Everetts+, the diffusion model ties the residual ' +
            'network on per-pixel error yet pushes ellipticity below even ' +
            'bilinear interpolation, while the residual network holds shape ' +
            'slopes of 0.64–0.74. Superb under one ruler, destructive under ' +
            'another. Neither ruler is wrong; the choice is scientific, not ' +
            'technical. And neither model meets the 10⁻³ lensing bar — that ' +
            'honesty is the stopping question, and it returns at the fork.',
        },
        {
          /* pull back a little to make room for the second ruler underneath */
          camera() { const z = 11; return { x: NOTCH, y: S.anchorY(G(NOTCH), 0.55, z), z }; },
          set: { rock: 0.12, line: 0.22, m: 0, humanrule: 1 },
          anim: { m: 1200 },
          notes:
            'Kahneman and Tversky measured the ruler people carry and found it ' +
            'bent three ways: reference-dependent, loss-averse by about a factor ' +
            'of two, and diminishing in sensitivity. Descriptive, not normative — ' +
            'the optimizer converged; the ruler was the problem. Cut this beat ' +
            'first if the clock is tight.',
        },
      ],
      text: [
        {
          id: 'rulerphrase', at: [0.055, 0.09], w: 620, cls: 'phrase', to: 1,
          html: '<p>The loss is a ruler we chose.</p>',
        },
        {
          id: 'rulerphrase2', at: [0.055, 0.09], w: 620, cls: 'phrase', from: 2,
          html: '<p>The loss is a ruler we chose.</p>',
        },
        {
          id: 'rul-sr', at: [0.055, 0.30], w: 470, cls: 'aside', to: 0,
          html: '<p>Super-resolve <em>Euclid</em> NISP with what ' +
            'JWST-resolution sky taught the model. What is <b>success</b>?</p>' +
            '<p>pixel similarity · flux conservation · morphology · astrometry ' +
            '· weak-lensing shape — five defensible rulers, one basin.</p>',
        },
        { id: 'rul-a', at: [0.055, 0.21], w: 340, cls: 'aside', to: 0, html: '<p>ruler A — pixel-by-pixel similarity</p>' },
        { id: 'rul-b', at: [0.055, 0.21], w: 380, cls: 'aside', from: 1, to: 1, html: '<p>ruler B — weighted by the downstream measurement: flux, shape, position</p>' },
        {
          id: 'rul-real', at: [0.055, 0.33], w: 470, cls: 'aside', from: 1, to: 1,
          html: '<p>Measured: a diffusion model ties on per-pixel error yet ' +
            'pushes ellipticity below bilinear interpolation. Superb under one ' +
            'ruler, destructive under another.</p>',
        },
        {
          id: 'rul-h', at: [0.60, 0.10], w: 400, cls: 'aside human', from: 2,
          html: '<p>and the ruler people actually carry: read from a reference ' +
            'point, losses spaced twice as far as equal gains</p>',
        },
      ],
      notes:
        'Inside the minimum. The strip along the bottom is the ruler; A and B ' +
        'are two reconstructions about a metre apart on a nine-kilometre ' +
        'mountain. The super-resolution question makes the choice concrete: ' +
        'what should the loss reward? This is where the line stops being ' +
        'poetry. NISP stands in for the whole family here — the same question ' +
        'repeats for WISE, for the grism, for every enhancement: each needs ' +
        'its own definition of success.',
    },

    /* ============================================ 6 · APPARENT SOLUTION == */
    {
      id: 'solution',
      name: 'Apparent solution',
      camera() { const z = 11; return { x: NOTCH + 2, y: S.anchorY(G(NOTCH), 0.72, z), z }; },
      enter: { dur: 1400 },
      set: { rock: 0.55, ruler: 0.85, ball: 1, pusher: 1, roll: 0 },
      steps: [
        { set: { roll: 0 } },
        { set: { roll: 1 }, anim: { roll: 2900 }, notes: 'Let it settle. Do not talk over it.' },
        {
          notes:
            'Forty-two. Correct, reproducible. Say nothing else — play it ' +
            'completely straight, as if the talk could end here. The zoom-out ' +
            'reveals the question was 6 × 7, and the joke only lands if this ' +
            'moment never winks.',
        },
      ],
      text: [
        { id: 'answer', at: [0.395, 0.10], w: 460, cls: 'answer', from: 2, html: '<p>42</p>' },
      ],
      notes:
        'The optimizer arrives. Converged, well-conditioned, defensible. Give it ' +
        'a beat of silence before the number appears.',
    },

    /* =========================================================== 7 · DATA == */
    {
      id: 'data',
      name: 'Data',
      camera() { const z = 5.6; return { x: 2185, y: S.anchorY(-1780, 0.58, z), z }; },
      enter: { dur: 1600 },
      set: { rock: 0.18, line: 0.16, sound: 1, ball: 0.45, pusher: 0.45 },
      steps: [
        {},
        {
          set: { line: 1, rock: 0.35 },
          notes:
            'Now put the curve back. It was never observed — it is what we ' +
            'inferred, and every later scene is drawn on top of that inference.',
        },
      ],
      text: [
        {
          id: 'datap', at: [0.075, 0.08], w: 620, cls: 'phrase',
          html: '<p>We never see <em>θ</em>. We see what it generates.</p>',
        },
        {
          id: 'datalist', at: [0.075, 0.235], w: 440, cls: 'aside', to: 0,
          html: '<p>pixels · ten bands · PSFs · noise maps · sampling · WCS</p>',
        },
        {
          id: 'nuis', at: [0.075, 0.235], w: 480, cls: 'aside', from: 1,
          html: '<p>Between θ and me: the instrument, the epoch, the calibration —<br>' +
            'photon noise · blending · chromatic morphology · resampling</p>',
        },
        {
          id: 'h6', at: [0.62, 0.085], w: 440, cls: 'aside human', to: 0,
          html: '<p>The same question, about a person you have just met: who ' +
            'they are — reached only through words, tone, promises, behaviour ' +
            'under stress.</p>' +
            '<p>And you never walk in blank: a prior over who they are, set ' +
            'by context and your own history.</p>',
        },
        {
          id: 'h6b', at: [0.62, 0.085], w: 450, cls: 'aside human', from: 1,
          html: '<p>And the nuisances are worse: mood, setting, self-presentation, ' +
            'strategy, stereotype, your own memory and projection.</p>' +
            '<p>Probing changes the thing being probed — and θ may be θ(t, context, ' +
            'relationship).</p>',
        },
      ],
      notes:
        'Same ledge, one zoom closer, and the smooth curve is gone: what we ' +
        'actually hold is soundings with widths. The landscape of the last three ' +
        'scenes was a model all along.',
    },

    /* ==================================================== 8 · COMPRESSION == */
    {
      id: 'compression',
      name: 'Compression',
      camera() { const z = 4.0; return { x: 2212, y: S.anchorY(-1780, 0.5, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.15, line: 0.30, approx1: 1, ball: 0.4, pusher: 0.4 },
      steps: [
        {},
        {
          set: { approx1: 0, approx2: 1 },
          notes:
            'Five numbers, evenly spaced — a perfectly reasonable summary, and ' +
            'the basin is simply not in it. The recovered minimum is in the wrong ' +
            'place. Nothing was wrong with the data.',
        },
        {
          set: { approx2: 0, approx3: 1 },
          notes:
            'Seven numbers, placed where the curvature is. Same count, same ' +
            'data, no new observation — and the answer comes back. This is the ' +
            'branch foundation models live on.',
        },
        {
          set: { approx3: 0, approx2: 1, line: 1, rock: 0.3 },
          notes:
            'Super-resolving NISP, WISE, or a grism spectrum is this picture ' +
            'run backwards: sparse measurements, a dense answer, and the ' +
            'difference supplied by a prior learned on other data. That is not ' +
            'cheating — it is how inference works — but the imported structure ' +
            'must be audited against the downstream question, or the basin in ' +
            'your output is the prior talking. Everetts+ frames its own ' +
            'architecture comparison exactly this way: a generative prior ' +
            'versus a direct mapping — two answers to where super-resolved ' +
            'information should come from.',
        },
      ],
      text: [
        {
          id: 'compp', at: [0.13, 0.08], w: 640, cls: 'phrase', to: 2,
          html: '<p>We cannot carry everything forward.</p>',
        },
        {
          id: 'compp2', at: [0.13, 0.08], w: 700, cls: 'phrase sm', from: 3,
          html: '<p>Enhancement is compression run backwards.</p>',
        },
        {
          id: 'c1', at: [0.13, 0.215], w: 460, cls: 'aside', to: 0,
          html: '<p>D → T(D). Fifteen numbers: the texture is gone, the answer survives.</p>',
        },
        {
          id: 'c2', at: [0.13, 0.215], w: 460, cls: 'aside', from: 1, to: 1,
          html: '<p>Five numbers, evenly spaced. The data had it. The representation hid it.</p>',
        },
        {
          id: 'c3', at: [0.13, 0.215], w: 480, cls: 'aside', from: 2, to: 2,
          html: '<p>Seven, placed where the curvature is. A different compression ' +
            'of the same data — lossy for the data, lossless for the question.</p>',
        },
        {
          id: 'c4', at: [0.13, 0.215], w: 490, cls: 'aside', from: 3,
          html: '<p>Five numbers in hand, a full curve delivered. The basin in ' +
            'the output was never in these data — it came from a prior trained ' +
            'on other sky.</p>' +
            '<p>The ledger must balance: data + prior in, structure out. ' +
            'Validation is auditing which is which.</p>',
        },
        {
          id: 'h7', at: [0.62, 0.09], w: 440, cls: 'aside human', to: 2,
          html: '<p>Hundreds of observations collapse to <em>nice</em>. Enough for ' +
            'another coffee. Hopeless for whether to trust them with something ' +
            'that matters.</p>',
        },
        {
          id: 'h7b', at: [0.62, 0.34], w: 440, cls: 'aside human', from: 2, to: 2,
          html: '<p>The clues may already be in memory. Rebuild the summary — ' +
            'no new data required.</p>',
        },
        {
          id: 'h7c', at: [0.62, 0.09], w: 440, cls: 'aside human', from: 3,
          html: '<p>Memory runs backwards too: the gaps in what you know about ' +
            'a person get filled with what people like them are usually like. ' +
            'Sometimes right. Always imported.</p>',
        },
      ],
      notes:
        'The vertical hairlines are the residual: exactly what each summary threw ' +
        'away. Ring marks where that representation thinks the minimum is.',
    },

    /* =================================================== 9 · FOUR RULERS == */
    {
      id: 'rulers',
      name: 'Four rulers',
      camera() { const z = 4.4; return { x: 2202, y: S.anchorY(-1782, 0.5, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.18, line: 1, ball: 0.4, pusher: 0.4 },
      steps: [
        { set: { entropy: 1 } },
        { set: { entropy: 1, surprise: 1 } },
        { set: { entropy: 1, surprise: 1, kl: 1 } },
        { set: { entropy: 1, surprise: 1, kl: 1, fisher: 1 } },
      ],
      text: [
        {
          id: 'r4h', at: [0.115, 0.055], w: 620, cls: 'phrase sm',
          html: '<p>Four rulers, one basin.</p>',
        },
        { id: 'r4a', at: [0.115, 0.155], w: 740, cls: 'aside', html: '<p><b>Entropy</b> — the data: how much the raw stream even carries.</p>' },
        { id: 'r4b', at: [0.115, 0.225], w: 740, cls: 'aside', from: 1, html: '<p><b>Surprise</b> — the learning signal: how unexpected was this datum?</p>' },
        { id: 'r4c', at: [0.115, 0.295], w: 740, cls: 'aside', from: 2, html: '<p><b>Information gain</b> — how much did the bracket close?</p>' },
        { id: 'r4d', at: [0.115, 0.365], w: 740, cls: 'aside', from: 3, html: '<p><b>Fisher</b> — the ruler: how much of what I measure is about θ.</p>' },
        {
          id: 'h8', at: [0.60, 0.055], w: 420, cls: 'aside human', from: 1,
          html: '<p>A confident first impression can be flatly wrong: low entropy ' +
            'is not truth.</p>' +
            '<p>And the encounter worth having is the one that is <em>diagnostic</em> ' +
            'for the trait you actually care about. That is Fisher, about a person.</p>',
        },
      ],
      notes:
        'The loop stations, made measurable — say the mapping: entropy ' +
        'H(X) belongs to the data (raw capacity, mostly noise and ' +
        'background); Fisher I(θ) belongs to the ruler (how much the chosen ' +
        'instrument carries about the parameter — and if Fisher is zero in a ' +
        'wavelength, or a conversational cue, no downstream network or brain ' +
        'can ever infer it: the ruler was blind); surprise −log p(x) is the ' +
        'learning signal — prediction error in a brain, loss gradient in a ' +
        'model, empirical anomaly in a field. Entropy is the width of the ' +
        'bracket; information gain is the bracket closing; Fisher is the ' +
        'curvature that decides how fast. Two cautions to say out loud: low ' +
        'entropy is not truth, and surprise is not gain. The formulas stay ' +
        'off screen; if asked: s(D) = −log p(D), gain is D_KL[p(θ|D) ‖ ' +
        'p(θ)], and F ∝ 1/σ². 12-minute cut: narrate entropy and Fisher ' +
        'only; step through surprise and KL without commentary — they stay ' +
        'on screen for anyone reading.',
    },

    /* ===================================================== 10 · THE FORK == */
    {
      id: 'fork',
      name: 'The fork',
      camera() { const z = 1.7; return { x: 2210, y: S.anchorY(-1790, 0.82, z), z }; },
      enter: { dur: 1500 },
      set: { rock: 0.35, line: 1, axes: 0, curmark: 0.35, ball: 0.5, pusher: 0.5 },
      steps: [
        { set: { fork1: 1 } },
        { set: { fork2: 1 } },
        { set: { fork3: 1 } },
      ],
      text: [
        {
          id: 'forkh', at: [0.055, 0.07], w: 980, cls: 'phrase sm',
          html: '<p>Not good enough. Debug — three places to look.</p>',
        },
        {
          id: 'f1', at: [0.055, 0.20], w: 470, cls: 'aside lead',
          html: '<p><b>Wrong ruler.</b> The question or the loss is inadequate — ' +
            'I am not moving on the landscape, I am exchanging it.</p>',
        },
        {
          id: 'f2', at: [0.055, 0.36], w: 470, cls: 'aside lead', from: 1,
          html: '<p><b>Bad compression.</b> The data had it; my representation ' +
            'hid it. No new observation required.</p>',
        },
        {
          id: 'f3', at: [0.055, 0.52], w: 470, cls: 'aside lead', from: 2,
          html: '<p><b>Missing information.</b> The data never contained it. ' +
            'Depth, resolution, wavelength, epoch — go and get more.</p>',
        },
        {
          id: 'h9', at: [0.60, 0.20], w: 420, cls: 'aside human',
          html: '<p>You have made all three mistakes about a person: judged them by ' +
            'the wrong thing, summarised them badly, or never seen them in the one ' +
            'situation that would have told you.</p>',
        },
      ],
      notes:
        'This is the 42 branch of the loop: the answer came back and it was ' +
        'not good enough — so debug the pipeline: the loss, the instrument, ' +
        'the data, the compression. Every item on that list is one of these ' +
        'three trails. The hill is scenery here — deliberately: the content ' +
        'is verbal, so the words take the stage and the fork trails stay ' +
        'small at the bottom. The three stay side by side because they are ' +
        'alternatives, not stages. Each trail points where we would actually ' +
        'have to go — and we are about to take the third one, over the crest.',
    },

    /* ========================================== 11 · EXPERIMENTAL DESIGN == */
    {
      id: 'design',
      name: 'Experimental design',
      camera: { x: 2860, y: -2200, z: 0.9 },
      enter: { dur: 2400 },
      set: { far: 1, rock: 1, here: 1, climber: 1 },
      text: [
        {
          id: 'dh', at: [0.055, 0.10], w: 620, cls: 'phrase',
          html: '<p>Which observation teaches me the most?</p>',
        },
        {
          id: 'd2', at: [0.055, 0.28], w: 520, cls: 'aside',
          html: '<p>Rank the observations you could take by how much you ' +
            'expect to learn from each — then buy that one.</p>',
        },
        {
          id: 'd3', at: [0.055, 0.42], w: 480, cls: 'aside',
          html: '<p>Sharper PSF, better sampling, another epoch.<br>' +
            'A little resolution can beat a great many photons.</p>',
        },
        {
          id: 'h10', at: [0.575, 0.075], w: 400, cls: 'aside human',
          html: '<p>Small talk teaches almost nothing. Responsibility, disagreement, ' +
            'stress, cooperation teach a great deal.</p>' +
            '<p>And ethics bind the probe: there are experiments you may not run on ' +
            'a person to find out who they are.</p>',
        },
      ],
      notes:
        'We have left the ledge and climbed to where you can see further — which ' +
        'is what experimental design is. If asked for the formal version: expected ' +
        'information gain, EIG(d) = E_y D_KL[p(θ|y,d) ‖ p(θ)], a Fisher criterion ' +
        'in the Gaussian limit. The basin we spent five scenes in is the ' +
        'small step down at the lower left. 12-minute cut: this scene is a ' +
        'transit — one sentence while the camera climbs ("which observation ' +
        'teaches the most is itself a Fisher question"), then on to the ' +
        'instruments.',
    },

    /* ================================================ 12 · TWO INSTRUMENTS == */
    {
      id: 'joint',
      name: 'Two instruments',
      camera() { const z = 4.6; return { x: 2205, y: S.anchorY(-1780, 0.55, z), z }; },
      enter: { dur: 2300 },
      set: { rock: 0.55, line: 1 },
      steps: [
        { set: { combR: 1 } },
        { set: { combR: 0.5, combE: 1 } },
        { set: { combR: 0.35, combE: 0.35, combJ: 1 } },
      ],
      text: [
        {
          id: 'jh', at: [0.12, 0.07], w: 660, cls: 'phrase sm',
          html: '<p>Two instruments, one patch of sky.</p>',
        },
        { id: 'j1', at: [0.12, 0.185], w: 420, cls: 'aside', to: 0, html: '<p>Rubin: six bands, depth, area — and coarser sampling.</p>' },
        { id: 'j2', at: [0.12, 0.185], w: 420, cls: 'aside', from: 1, to: 1, html: '<p><em>Euclid</em> VIS: sharp, well sampled, one band.</p>' },
        {
          id: 'j3', at: [0.12, 0.185], w: 460, cls: 'aside', from: 2,
          html: '<p>Together they know more than either alone — if we ' +
            'compress the shared reality, not each instrument separately.</p>',
        },
        {
          id: 'h11', at: [0.62, 0.09], w: 440, cls: 'aside human',
          html: '<p>Work, friendship, stress, conflict, play: one person, different ' +
            'noise and different selection.</p>' +
            '<p>Not five labels to be averaged — one shared latent, read five ways.</p>',
        },
      ],
      notes:
        'Same ground, two combs. Three flavours of joint, in one picture: joint ' +
        'inference (the Fishers add), information transfer (VIS sharpness improves ' +
        'what is tied to Rubin bands), and information completion (masked-band ' +
        'reconstruction fills in what one instrument barely saw). The catalogue ' +
        'route — compress each survey, then compare — throws the overlap away ' +
        'before anyone can use it.',
    },

    /* ================================================== 13 · FOUNDATION == */
    {
      id: 'foundation',
      name: 'One representation',
      camera: { x: 2210, y: -1983, z: 3.0 },
      enter: { dur: 1700 },
      set: { rock: 0.25, line: 0.3, latent: 1 },
      text: [
        {
          id: 'fh', at: [0.055, 0.20], w: 560, cls: 'phrase sm',
          html: '<p>Learn the compression once.<br>Ask different questions of it later.</p>',
        },
        {
          id: 'fbridge', at: [0.66, 0.10], w: 470, cls: 'aside',
          html: '<p>Each enhancement was a new model for one task: its own ' +
            'pair of instruments, its own choice of what to keep.</p>' +
            '<p>The general answer: learn everything together, once. One ' +
            'foundation, less lossy than any single-task compression — and ' +
            'every task a small head on top.</p>',
        },
        {
          id: 'fbands', at: [0.3375, 0.028], w: 520, cls: 'callout mid',
          html: '<p>Rubin <em>u g r i z y</em> &nbsp;·&nbsp; <em>Euclid</em> VIS <em>Y J H</em></p>',
        },
        {
          id: 'fz', at: [0.055, 0.415], w: 400, cls: 'aside',
          html: '<p>one shared representation,<br>then frozen</p>',
        },
        {
          id: 'fheads', at: [0.172, 0.805], w: 1052, cls: 'callout heads',
          html: '<p><span>detection</span><span>astrometry</span><span>photometry</span>' +
            '<span>shape</span><span>redshift</span></p>',
        },
        {
          id: 'h12', at: [0.66, 0.60], w: 430, cls: 'aside human',
          html: '<p>Nobody keeps separate mental files for “person for football”, ' +
            '“person for advice”, “person to trust”. One representation, ' +
            'interrogated differently per question.</p>',
        },
      ],
      notes:
        'The bridge, said out loud: the three receipts were each a new model ' +
        'for one task — one teacher, one student, one choice of what to keep. ' +
        'Learn everything together instead and the representation is less ' +
        'lossy than any single-task compression, because every band and both ' +
        'instruments constrain it. If every question starts again from raw ' +
        'pixels the cost is enormous; ask instead for a compression that ' +
        'survives a change of question — not lossless, but broadly reusable ' +
        'for questions not yet asked. Then every measurement, enhancement ' +
        'included, is a small head reading the same frozen features.',
    },

    /* ======================================================= 14 · JAISP == */
    {
      id: 'jaisp',
      name: 'JAISP',
      camera: { x: 2350, y: -2400, z: 1.0 },
      enter: { dur: 2200 },
      set: { far: 1, rock: 1 },
      plates: [{
        src: 'assets/jaisp_architecture_crop.png', ar: 550 / 1109, frame: 1,
        at: [0.335, 0.42], w: 830,
        alt: 'JAISP architecture: masked-band pretraining and downstream heads',
        cap: 'Ten bands → two-stream stems → one shared latent → detection · ' +
          'astrometry · photometry · shape · redshift.',
      }],
      text: [
        {
          id: 'jah', at: [0.055, 0.075], w: 620, cls: 'phrase sm',
          html: '<p>This is what we built.</p>',
        },
        {
          id: 'janum', at: [0.68, 0.055], w: 460, cls: 'aside',
          html: '<p>≈9 M parameters. Self-supervised: each band predicted from the ' +
            'other nine, each instrument encoded at its delivered sampling.</p>' +
            '<p style="margin-top:22px">Detection, on held-out sky: <b>93% complete, ' +
            '94% pure</b> against the published VIS-detected catalogue — and ' +
            '<b>0.45 VIS mag deeper</b> than one band supports.</p>' +
            '<p style="margin-top:22px">A second deep field, no retraining: the ' +
            'whole stack reproduces it.</p>',
        },
      ],
      notes:
        'The one slide that is a figure. Say the numbers, not the architecture — ' +
        'the picture is there so nobody has to take the numbers on faith.',
    },

    /* =================================================== 15 · TWO ENDINGS == */
    {
      id: 'endings',
      name: 'Two endings',
      camera: { x: 2760, y: -2150, z: 0.85 },
      enter: { dur: 2200 },
      set: { far: 1, rock: 1, ends: 1 },
      text: [
        {
          id: 'eh', at: [0.055, 0.075], w: 620, cls: 'phrase sm',
          html: '<p>Two ways for a question to end.</p>',
        },
        {
          id: 'e1', at: [0.62, 0.045], w: 420, cls: 'aside',
          html: '<p><b>Die on that hilltop.</b> The answer sufficed for the ' +
            'question — stop there, content. Or let the summit give you a ' +
            'view of the next mountain. Higher.</p>',
        },
        {
          id: 'e2', at: [0.115, 0.42], w: 430, cls: 'aside',
          html: '<p><b>On the slope.</b> The answer keeps improving, the theory ' +
            'stays incomplete, and the experiment outlives you. Weinberg’s ' +
            '<em>Dreams of a Final Theory</em>, read half in longing and half in ' +
            'mourning.</p>',
        },
        {
          id: 'e3', at: [0.115, 0.60], w: 400, cls: 'aside',
          html: '<p>Finite observers, inside open-ended inquiry.</p>',
        },
      ],
      notes:
        'The upper ring is the crest, the lower one is the slope below it. The ' +
        'longing/mourning phrase is ours, not a quotation — the reference is to ' +
        'Dreams of a Final Theory, so say it as a reference, not as his words.',
    },

    /* ======================================================== 16 · RETURN == */
    {
      id: 'return',
      name: 'Return',
      camera: { x: 1760, y: -1560, z: 0.60 },
      enter: { dur: 3000, ease: 'slow' },
      set: { far: 1, rock: 1 },
      plates: [{
        src: 'assets/closing.png', ar: 1470 / 1524, blend: 1,
        at: [0.66, 0.52], w: 920,
        alt: 'Sisyphus takes a break — playing pinball beside the boulder',
      }],
      steps: [
        {},
        { notes: 'Then the last line, and stop talking.' },
      ],
      text: [
        {
          id: 'fin1', at: [0.055, 0.20], w: 560, cls: 'aside lead',
          html: '<p>Maybe the rock comes back because we keep finding better questions.</p>',
        },
        {
          id: 'fin42', at: [0.055, 0.345], w: 560, cls: 'aside',
          html: '<p>Forty-two was right, by the way. The question was 6 × 7.</p>',
        },
        {
          id: 'fin2', at: [0.055, 0.50], w: 620, cls: 'phrase', from: 1,
          html: '<p>One must imagine the optimizer happy.</p>',
        },
      ],
      notes:
        'Exactly the opening camera — same hill, same scale, and by now it means ' +
        'something else. Land 6 × 7 as a throwaway, not a reveal. If it needs a ' +
        'chaser: the system is non-stationary — people adapt, contexts shift, ' +
        'the universe keeps arriving. Six months later a surprising behaviour ' +
        'spikes the prediction error, the loss surface warps, and the model ' +
        'goes back up the mountain. There is no universal loss, no compression ' +
        'sufficient for every question, and no observer with all the ' +
        'information. The purpose was never to stop pushing.',
    },
    /* ======================================= A1 · APPENDIX — ASTROMETRY == */
    {
      id: 'astrometry',
      name: 'Appendix — Astrometry',
      camera() { const z = 8.5; return { x: 2202, y: S.anchorY(G(2199.3), 0.42, z), z }; },
      enter: { dur: 2500 },
      set: { rock: 0.35, line: 1, axes: 1, astro1: 1 },
      steps: [
        { set: { astro1: 1 } },
        { set: { astro1: 1, astro2: 1 }, notes: 'The head does not add information. It stops throwing it away.' },
        {
          set: { rock: 0.12, line: 0.3, axes: 0.15, astro1: 0, astro2: 0 },
          notes: 'And here is the same statement as the paper makes it.',
        },
      ],
      text: [
        {
          id: 'ah', at: [0.055, 0.06], w: 520, cls: 'phrase sm',
          html: '<p>Where is the source — and how wide is the answer?</p>',
        },
        {
          id: 'a1', at: [0.055, 0.19], w: 420, cls: 'aside', to: 0,
          html: '<p>Raw cross-survey scatter, Rubin against <em>Euclid</em> VIS: ' +
            'about 50 mas.</p>',
        },
        {
          id: 'a2', at: [0.055, 0.19], w: 360, cls: 'aside', from: 1,
          html: '<p>A position head reading the frozen features: <b>14–17 mas</b>. ' +
            'Injected sources recovered to <b>19 mas at S/N = 5</b> — near the ' +
            'floor the VIS labels themselves set.</p>',
        },
        {
          id: 'h14', at: [0.60, 0.10], w: 420, cls: 'aside human', to: 1,
          html: '<p>A number without its width is not an answer. That is as true of ' +
            'a first impression as it is of a centroid.</p>',
        },
      ],
      plates: [{
        src: 'assets/astrometry_fig8_crop.png', ar: 525 / 1135, frame: 1, from: 2,
        at: [0.63, 0.46], w: 940,
        alt: 'Cross-survey offset clouds collapsing from 50 mas to 14-17 mas',
        cap: 'All 790 ECDFS tiles. Dashed: raw classical centroids. Solid: ' +
          'head-corrected — the clouds collapse and re-centre on the origin. ' +
          'Right: median per-source offset against S/N.',
      }],
      notes:
        'This is the θ axis the talk has been walking, now calibrated in ' +
        'milliarcseconds. The bracket is the answer\'s width, and it is her own ' +
        'measurement, not an illustration.',
    },

    /* ================================= A2 · APPENDIX — THE FIELD MOVES == */
    {
      id: 'concordance',
      name: 'Appendix — The field moves',
      camera() { const z = 6.5; return { x: 2205, y: S.anchorY(-1780, 0.72, z), z }; },
      enter: { dur: 1800 },
      set: { rock: 0.45, line: 1, axes: 0.5 },
      steps: [
        { set: { shift: 1 }, anim: { shift: 1600 } },
        { notes: 'Say it plainly: this is not scatter. The ground was in a different place.' },
      ],
      text: [
        {
          id: 'ch', at: [0.055, 0.07], w: 700, cls: 'phrase sm',
          html: '<p>Beneath the per-source scatter, the field itself is displaced.</p>',
        },
        {
          id: 'c1b', at: [0.055, 0.20], w: 460, cls: 'aside', to: 0,
          html: '<p>A coherent <b>9–10 mas</b> pattern between two independently ' +
            'Gaia-anchored solutions — mostly a single shift, common to every band.</p>',
        },
        {
          id: 'c2b', at: [0.055, 0.20], w: 460, cls: 'aside', from: 1,
          html: '<p>Every arrow points the same way. That is not noise: the ' +
            'landscape had moved, and the scatter was hiding it.</p>',
        },
      ],
      notes:
        'The quiet centre of the talk. A systematic looks like noise until you ' +
        'plot it as a field; then it is a displacement. Both solutions are ' +
        'defensible. Nobody made a mistake.',
    },

  ];

  /* Fallback values for every animatable layer, so a scene only has to name
     what it changes.                                                        */
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
